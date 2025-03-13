import { getContract, formatEther } from 'viem';
import { publicClient } from '../client';
import { Protocol, PoolData, PoolBasicInfo } from '../../types';
import { 
  getContractAddresses, 
  getFlowVoterContract, 
  getTokenContract,
} from './helper';
import CL_TOKEN_ABI from '../abis/clTokenAbi';
import CL_GAUGE_ABI from '../abis/clGaugeAbi';

const sonicApi = () => {
  /**
   * Discover all CL pools in the protocol without processing full details
   * @param protocol The protocol to query (shadow or equalizer)
   * @returns Array of basic pool info objects with addresses
   */
  const discoverCLPools = async (protocol: Protocol): Promise<PoolBasicInfo[]> => {
    try {
      const flowVoterContract = getFlowVoterContract(protocol);
      
      // Get all gauges first
      console.log("Getting all gauges...");
      let allGauges: any[] = [];
      
      try {
        const gaugesResponse = await flowVoterContract.read.getAllGauges() as any[];
        console.log('FCO::::::::::::: gaugesResponse', gaugesResponse)
        allGauges = gaugesResponse.flat();
        console.log(`Found ${allGauges.length} gauges total`);
      } catch (error) {
        console.error("Failed to get gauges:", error);
        return []; // Return empty array if we can't get gauges
      }
      
      // Use a Map to track unique pool addresses and avoid duplicates
      const uniquePoolsMap = new Map<string, PoolBasicInfo>();
      
      // Filter for CL gauges - limiting to at most 100 for performance
      console.log("Filtering for CL gauges...");
      const maxGaugesToCheck = Math.min(allGauges.length, 100);
      
      // Process gauges sequentially to avoid overwhelming the RPC
      for (let i = 0; i < maxGaugesToCheck; i++) {
        const gauge = allGauges[i];
        
        try {
          // Check if it's a CL gauge
          let isClGauge = false;
          try {
            isClGauge = await flowVoterContract.read.isClGauge([gauge]) as boolean;
            // console.log('FCO:::::::::::::::::: isClGauge', gauge, isClGauge)
          } catch (e) {
            console.warn(`Error checking if gauge ${gauge} is a CL gauge: ${e}`);
            // Skip this gauge and continue with the next one
            continue;
          }
          
          if (isClGauge) {
            let poolAddress = '';
            
            try {
              poolAddress = await flowVoterContract.read.poolForGauge([gauge]) as string;
            } catch (e) {
              console.warn(`Error getting pool for gauge ${gauge}: ${e}`);
              continue;
            }
            
            if (poolAddress && 
                poolAddress !== '0x0000000000000000000000000000000000000000' && 
                !uniquePoolsMap.has(poolAddress)) {
              
              uniquePoolsMap.set(poolAddress, { 
                poolAddress, 
                gaugeAddress: gauge 
              });
              
              // Add a small delay to avoid RPC rate limits
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }
        } catch (gaugeError) {
          console.warn(`Skipping gauge ${gauge} due to error:`, gaugeError);
          continue; // Continue to next gauge
        }
      }
      
      const result = Array.from(uniquePoolsMap.values());
      console.log(`Found ${result.length} unique CL pools with gauges`);
      console.log('FCO::::::::::::::::: result', result)
      return result;
    } catch (error) {
      console.error("Error discovering CL pools:", error);
      return []; // Return empty array on error
    }
  };

  /**
   * Process full details for a specific pool
   * @param poolInfo Basic pool info with addresses
   * @param protocol The protocol being queried
   * @returns Fully processed pool data or null if processing fails
   */
  const getPoolDetails = async (
    poolInfo: PoolBasicInfo,
    protocol: Protocol
  ): Promise<PoolData | null> => {
    const addresses = getContractAddresses(protocol);
    const rewardToken = addresses.REWARD_TOKEN;
    
    try {
      return await processClPool(poolInfo.poolAddress, poolInfo.gaugeAddress, rewardToken, protocol);
    } catch (error) {
      console.error(`Error getting pool details for ${poolInfo.poolAddress}:`, error);
      return null;
    }
  };

  // Process CL pool details
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
      
      // Get token addresses with error handling
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
          // Fallback if the first method fails
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
        weeklyRewardsUsd,
        apr
      };
    } catch (error) {
      console.error(`Error processing CL pool ${poolAddress}:`, error);
      return null;
    }
  };

  const getClIdentifier = (tickSpacing: number, token0: string, token1: string): string => {
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
  
  // Method that processes all pools at once
  const getCLPools = async (protocol: Protocol): Promise<PoolData[]> => {
    try {
      const basicPools = await discoverCLPools(protocol);
      
      if (basicPools.length === 0) {
        console.log("No pools discovered, returning empty array");
        return [];
      }
      
      // Process pools sequentially to avoid overwhelming the RPC
      const validPools: PoolData[] = [];
      
      for (const poolInfo of basicPools) {
        try {
          const poolData = await getPoolDetails(poolInfo, protocol);
          if (poolData) {
            validPools.push(poolData);
          }
          
          // Add a small delay between pool processing
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Error processing pool ${poolInfo.poolAddress}:`, error);
          // Continue with next pool
        }
      }
      
      // Sort by TVL
      return validPools.sort((a, b) => b.tvl - a.tvl);
    } catch (error) {
      console.error("Error fetching CL pools:", error);
      return [];
    }
  };
  
  return {
    discoverCLPools,
    getPoolDetails,
    getCLPools,
  };
};

export default sonicApi;
export type SonicClient = ReturnType<typeof sonicApi>;
