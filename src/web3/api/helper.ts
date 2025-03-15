import { Address, formatUnits, getContract } from "viem";
import config from "../../config";
import { Protocol } from "../../types";
import FLOW_VOTER_ABI from "../abis/flowVoterAbi";
import { publicClient } from "../client";
import V2_FACTORY_ABI from "../abis/v2FactoryAby";
import CL_TOKEN_ABI from "../abis/clTokenAbi";
import FLOW_GAUGE_ABI from "../abis/flowGaugeAbi";
import ERC20_ABI from "../abis/erc20Abi"
import CL_GAUGE_ABI from "../abis/clGaugeAbi";
import V2_TOKEN_ABI from "../abis/v2TokenAbi";
import ERC_20_ABI from "../abis/erc20Abi";

/**
 * Get native token (S) balance
 */
export const getNativeBalance = async (userAddress: string): Promise<string> => {
  try {
    const balance = await publicClient.getBalance({
      address: userAddress as `0x${string}`,
    });
    
    // Native token uses 18 decimals
    return formatUnits(balance, 18);
  } catch (error) {
    console.error('Error fetching native balance:', error);
    return '0';
  }
};

export const getContractAddresses = (protocol: Protocol) => {
    return protocol === 'equalizer' 
      ? {
        FLOW_VOTER_ADDR: config.equalizer.FLOW_VOTER_ADDR,
        V2_FACTORY_ADDRESS: config.equalizer.V2_FACTORY_ADDRESS,
        REWARD_TOKEN: config.equalizer.REWARD_TOKEN
      }
      : {
        FLOW_VOTER_ADDR: config.shadow.FLOW_VOTER_ADDR,
        V2_FACTORY_ADDRESS: config.shadow.V2_FACTORY_ADDRESS,
        CL_FACTORY_ADDRESS: config.shadow.CL_FACTORY_ADDRESS,
        REWARD_TOKEN: config.shadow.REWARD_TOKEN, 
        REWARD_TOKEN_2: config.shadow.REWARD_TOKEN_2,
        NFT_TOKEN_ADDRESS: config.shadow.NFT_TOKEN_ADDRESS,
        NFT_FARM_STRATEGY_ADDRESS: config.shadow.NFT_FARM_STRATEGY_ADDRESS,
      };
  };

export const getFlowVoterContract = (protocol: Protocol) => {
  const addresses = getContractAddresses(protocol);
  
  return getContract({
    address: addresses.FLOW_VOTER_ADDR as `0x${string}`,
    abi: FLOW_VOTER_ABI,
    client: publicClient,
  });
};

export const getV2FactoryContract = (protocol: Protocol) => {
  const addresses = getContractAddresses(protocol);
  
  return getContract({
    address: addresses.V2_FACTORY_ADDRESS as `0x${string}`,
    abi: V2_FACTORY_ABI,
    client: publicClient,
  });
};

export const getCLGaugeContract = (gaugeAddress: string) => {
  return getContract({
    address: gaugeAddress as `0x${string}`,
    abi: CL_GAUGE_ABI,
    client: publicClient,
  });
};

export const getFlowGaugeContract = (gaugeAddress: string) => {
  return getContract({
    address: gaugeAddress as `0x${string}`,
    abi: FLOW_GAUGE_ABI,
    client: publicClient,
  });
};

export const getTokenContract = (tokenAddress: string) => {
  return getContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    client: publicClient,
  });
};

export const getPoolContract = (poolAddress: string) => {
  return getContract({
    address: poolAddress as `0x${string}`,
    abi: CL_TOKEN_ABI,
    client: publicClient,
  });
};

export const getV2PoolContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: V2_TOKEN_ABI, // Use V2 pool ABI from sonic_shadow.js
    client: publicClient
  });
};

export const getCLPoolContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: CL_TOKEN_ABI, // Use CL pool ABI from sonic_shadow.js
    client: publicClient
  });
};

// export const getPoolCurrentPrice = async (poolAddress: string): Promise<{
//   currentPrice: number | undefined;
//   currentTick: number | undefined;
//   token0Decimals: number;
//   token1Decimals: number;
// }> => {
//   try {
//     // Get pool contract
//     const poolContract = getContract({
//       address: poolAddress as Address,
//       abi: CL_TOKEN_ABI,
//       client: publicClient,
//     });

//     // Try to get slot0 data, but handle it carefully
//     let sqrtPriceX96: bigint;
//     let tick: number;
    
//     try {
//       // Try getting data using the regular method first
//       const slot0Result = await poolContract.read.slot0() as [bigint, number, number, number, number, boolean];;
//       sqrtPriceX96 = slot0Result[0] as bigint;
//       tick = Number(slot0Result[1]);

//       // Extract values directly by position rather than destructuring
//     } catch (slotError) {
//       console.warn("Error reading slot0 with standard method:", slotError);
      
//       // Fallback: Try alternative read methods
//       // Method 1: Try calling functions directly to get just what we need
//       try {
//         sqrtPriceX96 = await poolContract.read.sqrtPriceX96?.() as bigint;
//         tick = Number(await poolContract.read.tick?.());
//       } catch (fallbackError) {
//         console.error("Fallback methods also failed:", fallbackError);
//         throw new Error("Could not read price data from pool contract");
//       }
//     }

//     // Get token addresses
//     const token0Address = await poolContract.read.token0() as Address;
//     const token1Address = await poolContract.read.token1() as Address;

//     // Get token contracts
//     const token0Contract = getContract({
//       address: token0Address,
//       abi: ERC_20_ABI,
//       client: publicClient,
//     });

//     const token1Contract = getContract({
//       address: token1Address,
//       abi: ERC_20_ABI,
//       client: publicClient,
//     });

//     // Get token decimals with error handling
//     let token0Decimals = 18;
//     let token1Decimals = 18;
    
//     try {
//       token0Decimals = await token0Contract.read.decimals() as number;
//     } catch (error) {
//       console.warn("Could not read token0 decimals, using default 18:", error);
//     }
    
//     try {
//       token1Decimals = await token1Contract.read.decimals() as number;
//     } catch (error) {
//       console.warn("Could not read token1 decimals, using default 18:", error);
//     }

//     // Calculate price from sqrtPriceX96 with decimal adjustment
//     const sqrtPrice = Number(sqrtPriceX96) / (2 ** 96);
//     const decimalAdjustment = 10 ** (token1Decimals - token0Decimals);
//     const price = sqrtPrice * sqrtPrice * decimalAdjustment;

//     return {
//       currentPrice: price,
//       currentTick: tick,
//       token0Decimals,
//       token1Decimals
//     };
//   } catch (error) {
//     console.error('Error getting pool current price:', error);
//     return {
//       currentPrice: undefined,
//       currentTick: undefined,
//       token0Decimals: 18,
//       token1Decimals: 18
//     };
//   }
// };