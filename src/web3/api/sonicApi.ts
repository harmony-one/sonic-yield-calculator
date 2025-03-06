// src/services/sonic.ts
import { getContract, formatEther } from 'viem';
import { publicClient } from '../client';
import config from '../../config';
import { Protocol, PoolData } from '../../types';

// Import ABIs - use only what's available
import FLOW_VOTER_ABI from '../abis/flowVoterAbi';
import FLOW_GAUGE_ABI from '../abis/flowGaugeAbi';
import CL_TOKEN_ABI from '../abis/clTokenAbi';

export interface GetPoolsParams {
  protocol: Protocol;
  onFailed?: (error: Error) => void;
}

const sonicApi = () => {
  const getContractAddresses = (protocol: Protocol) => {
    return protocol === 'equalizer' 
      ? config.equalizer 
      : config.shadow;
  };

  const getFlowVoterContract = (protocol: Protocol) => {
    const addresses = getContractAddresses(protocol);
    
    return getContract({
      address: addresses.FLOW_VOTER_ADDR as `0x${string}`,
      abi: FLOW_VOTER_ABI,
      client: publicClient,
    });
  };

  const getPools = async ({ protocol, onFailed }: GetPoolsParams): Promise<PoolData[]> => {
    try {
      const flowVoterContract = getFlowVoterContract(protocol);
      
      // Get total number of pools
      const poolLengthResult = await flowVoterContract.read.length();
      const poolLength = poolLengthResult;
      console.log(`Found ${Number(poolLength)} pools for ${protocol}`);
      
      const fetchedPools: PoolData[] = [];
      
      // Process pools in batches to avoid overwhelming the RPC
      const batchSize = 10;
      for (let i = 0; i < Number(poolLength); i += batchSize) {
        const batch: Promise<PoolData | null>[] = [];
        for (let j = i; j < Math.min(i + batchSize, Number(poolLength)); j++) {
          batch.push(processSinglePool({ 
            protocol,
            index: j,
          }));
        }
        
        const results = await Promise.all(batch);
        fetchedPools.push(...results.filter((pool): pool is PoolData => pool !== null));
      }
      
      return fetchedPools;
    } catch (error) {
      console.error('Error fetching pools:', error);
      onFailed && onFailed(error as Error);
      return [];
    }
  };

  const processSinglePool = async ({ 
    protocol, 
    index,
  }: {
    protocol: Protocol;
    index: number;
  }): Promise<PoolData | null> => {
    try {
      const addresses = getContractAddresses(protocol);
      const flowVoterContract = getFlowVoterContract(protocol);
      
      // Get pool address
      const poolAddressResult = await flowVoterContract.read.pools([BigInt(index)]);
      const poolAddress = poolAddressResult as `0x${string}`;
      
      // Get gauge for this pool
      const gaugeAddressResult = await flowVoterContract.read.gauges([poolAddress]);
      const gaugeAddress = gaugeAddressResult as `0x${string}`;
      
      // Skip pools without gauges
      if (gaugeAddress === '0x0000000000000000000000000000000000000000') {
        return null;
      }
      
      // token contract using CL_TOKEN_ABI
      const tokenContract = getContract({
        address: poolAddress,
        abi: CL_TOKEN_ABI,
        client: publicClient,
      });
      
      // Get basic token info
      let symbol = 'Pool-' + index;
      let totalSupply = 0n;
      
      try {
        // Try to get the symbol
        const symbolResult = await tokenContract.read.symbol();
        // Explicitly cast the result to string
        symbol = String(symbolResult);
      } catch (e) {
        console.warn('Failed to get symbol, using default');
      }
      
      try {
        // Try to get the total supply
        const totalSupplyResult = await tokenContract.read.totalSupply();
        totalSupply = totalSupplyResult as bigint;
      } catch (e) {
        console.warn('Failed to get totalSupply, using 0');
      }
      
      // gauge contract
      const gaugeContract = getContract({
        address: gaugeAddress,
        abi: FLOW_GAUGE_ABI,
        client: publicClient,
      });
      
      // Get reward data
      let rewardRate = 0n;
      let periodFinish = 0n;
      
      try {
        const rewardRateResult = await gaugeContract.read.rewardRate([addresses.REWARD_TOKEN as `0x${string}`]);
        rewardRate = rewardRateResult as bigint;;
        
        const periodFinishResult = await gaugeContract.read.periodFinish([addresses.REWARD_TOKEN as `0x${string}`]);
        periodFinish = periodFinishResult as bigint;
      } catch (e) {
        console.warn('Error fetching reward data:', e);
      }
      
      // Placeholder values for now
      const tvl = parseFloat(formatEther(totalSupply)) * 2; // Simple estimate
      const rewardTokenPrice = 1.0; // Placeholder
      
      // Calculate APR (simplified)
      const weeklyRewards = parseFloat(formatEther(rewardRate)) * 604800; // seconds in a week
      const usdPerWeek = weeklyRewards * rewardTokenPrice;
      const weeklyAPR = (usdPerWeek / (tvl > 0 ? tvl : 1)) * 100;
      const yearlyAPR = weeklyAPR * 52;
      
      return {
        poolAddress,
        gaugeAddress,
        symbol,
        token0: '', // Empty string instead of null
        token1: '', // Empty string instead of null
        tvl,
        weeklyAPR,
        yearlyAPR,
        rewardRate: formatEther(rewardRate),
        periodFinish: new Date(Number(periodFinish) * 1000).toLocaleDateString(),
        rewardTokenPrice
      };
    } catch (err) {
      console.error(`Error processing pool at index ${index}:`, err);
      return null;
    }
  };

  return {
    getPools,
  };
};

export default sonicApi;
export type SonicClient = ReturnType<typeof sonicApi>;