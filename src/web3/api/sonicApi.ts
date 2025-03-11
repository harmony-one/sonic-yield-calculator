// src/services/sonic.ts
import { getContract, formatEther } from 'viem';
import { publicClient } from '../client';
import { Protocol, PoolData } from '../../types';
import { 
  getContractAddresses, 
  getFlowVoterContract, 
  getTokenContract,
} from './helper';
import CL_TOKEN_ABI from '../abis/clTokenAbi';
import CL_GAUGE_ABI from '../abis/clGaugeAbi';

export interface GetPoolsParams {
  protocol: Protocol;
  onFailed?: (error: Error) => void;
}

const sonicApi = () => {
  const getCLPools = async (protocol: Protocol): Promise<PoolData[]> => {
    try {
      const addresses = getContractAddresses(protocol);
      const flowVoterContract = getFlowVoterContract(protocol);
      const rewardToken = addresses.REWARD_TOKEN;
      
      // Get all gauges first
      console.log("Getting all gauges...");
      const gaugesResponse = await flowVoterContract.read.getAllGauges() as any[];
      const allGauges = gaugesResponse.flat();
      console.log(`Found ${allGauges.length} gauges total`);
      
      // Filter for CL gauges
      console.log("Filtering for CL gauges...");
      const clGauges: { gauge: string, pool: string }[] = [];
      
      for (const gauge of allGauges) {
        try {
          const isClGauge = await flowVoterContract.read.isClGauge([gauge]) as boolean;
          if (isClGauge) {
            // Get pool address for the gauge
            const poolAddress = await flowVoterContract.read.poolForGauge([gauge]) as string;
            if (poolAddress && poolAddress !== '0x0000000000000000000000000000000000000000') {
              clGauges.push({ gauge, pool: poolAddress });
            }
          }
        } catch (e) {
          console.warn(`Error checking gauge ${gauge}:`, e);
        }
      }
      
      console.log(`Found ${clGauges.length} CL pools with gauges`);
      
      // Process each CL pool
      const clPools: PoolData[] = [];
      
      for (const { gauge, pool } of clGauges) {
        try {
          const poolData = await processClPool(pool, gauge, rewardToken, protocol);
          if (poolData) {
            clPools.push(poolData);
          }
        } catch (error) {
          console.warn(`Error processing CL pool ${pool}:`, error);
        }
      }
      
      // Sort by TVL (highest first) like in the vfat.tools interface
      return clPools.sort((a, b) => b.tvl - a.tvl);
    } catch (error) {
      console.error("Error fetching CL pools:", error);
      return [];
    }
  };

  const processClPool = async (
    poolAddress: string, 
    gaugeAddress: string, 
    rewardToken: string,
    protocol: Protocol
  ): Promise<PoolData | null> => {
    try {
      console.log(`Processing CL pool ${poolAddress}`);
      
      // Create contract instances
      const gaugeContract = getContract({
        address: gaugeAddress as `0x${string}`,
        abi: CL_GAUGE_ABI,
        client: publicClient
      });
      
      const poolContract = getContract({
        address: poolAddress as `0x${string}`,
        abi: CL_TOKEN_ABI,
        client: publicClient
      });
      
      // Get token addresses
      let token0Address = '';
      let token1Address = '';
      let token0Symbol = '';
      let token1Symbol = '';
      
      try {
        token0Address = await poolContract.read.token0() as string;
        token1Address = await poolContract.read.token1() as string;
        
        // Get token details
        const token0Contract = getTokenContract(token0Address);
        const token1Contract = getTokenContract(token1Address);
        
        token0Symbol = await token0Contract.read.symbol() as string;
        token1Symbol = await token1Contract.read.symbol() as string;
      } catch (error) {
        console.warn(`Error getting token info for pool ${poolAddress}:`, error);
        return null;
      }
      
      // Get tickSpacing (for CL identifier)
      let tickSpacing = 0;
      try {
        tickSpacing = await poolContract.read.tickSpacing() as number;
      } catch (error) {
        console.warn(`Error getting tickSpacing for pool ${poolAddress}:`, error);
      }
      
      // Format CL identifier like "CL1-WETH/superOETHb" (from image)
      // The number after CL seems to be related to tickSpacing
      const clIdentifier = getClIdentifier(tickSpacing, token0Symbol, token1Symbol);
      
      // Get liquidity data
      let liquidity = BigInt(0);
      try {
        liquidity = await poolContract.read.liquidity() as bigint;
      } catch (error) {
        console.warn(`Error getting liquidity for pool ${poolAddress}:`, error);
      }
      
      // Get token prices and calculate TVL
      const token0Price = 1000; // Placeholder - replace with actual price fetch
      const token1Price = 1000; // Placeholder - replace with actual price fetch
      
      // Simplistic TVL calculation - in production, would need more complex formula
      // based on token reserves and price ranges
      const tvl = parseFloat(formatEther(liquidity)) * (token0Price + token1Price) / 2;
      
      // Get reward rate for APR calculation
      let rewardRate = BigInt(0);
      try {
        try {
          rewardRate = await gaugeContract.read.rewardRate([rewardToken]) as bigint;
        } catch (e) {
          rewardRate = await gaugeContract.read.rewardRate() as bigint;
        }
      } catch (error) {
        console.warn(`Error getting reward rate for gauge ${gaugeAddress}:`, error);
      }
      
      // Calculate APR
      const rewardTokenPrice = 1.0; // Placeholder - replace with actual price
      const weeklyRewards = parseFloat(formatEther(rewardRate)) * 604800; // seconds in a week
      const weeklyRewardsUsd = weeklyRewards * rewardTokenPrice;
      
      // Calculate APR
      const weeklyApr = tvl > 0 ? (weeklyRewardsUsd / tvl) * 100 : 0;
      const apr = weeklyApr * 52; // Annual APR
      
      // Get fee
      let fee = 0;
      try {
        fee = await poolContract.read.fee() as number;
        fee = fee / 10000; // Convert from basis points to percentage
      } catch (error) {
        console.warn(`Error getting fee for pool ${poolAddress}:`, error);
      }
      
      // Skip slot0 since it's causing issues
      // Instead, just provide the basic pool information without current tick/price
      
      return {
        id: poolAddress,
        poolAddress,
        gaugeAddress,
        symbol: clIdentifier,
        token0: token0Symbol,
        token1: token1Symbol,
        token0Address,
        token1Address,
        fee: `${fee}%`,
        tickSpacing,
        liquidity: formatEther(liquidity),
        tvl,
        weeklyRewardsUsd: weeklyRewardsUsd,
        apr
        // We're not including currentTick and currentPrice due to slot0 issues
      };
    } catch (error) {
      console.error(`Error processing CL pool ${poolAddress}:`, error);
      return null;
    }
  };

  const getClIdentifier = (tickSpacing: number, token0: string, token1: string): string => {
    // This is a simplification - the actual mapping might be different
    // Based on your screenshot, it seems like:
    // - CL1: Small tickSpacing
    // - CL5: Medium tickSpacing
    // - CL10: Larger tickSpacing
    // - CL100: Much larger tickSpacing
    
    let clPrefix = "CL";
    
    if (tickSpacing <= 10) {
      clPrefix = "CL1";
    } else if (tickSpacing <= 60) {
      clPrefix = "CL5";
    } else if (tickSpacing <= 200) {
      clPrefix = "CL10";
    } else {
      clPrefix = "CL100";
    }
    
    return `${clPrefix}-${token0}/${token1}`;
  };
  
  return {
    getCLPools,
  };
};

export default sonicApi;
export type SonicClient = ReturnType<typeof sonicApi>;
