import { Address, getContract } from 'viem';
import { publicClient } from '../client';
import CL_TOKEN_ABI from '../abis/clTokenAbi';
import V2_TOKEN_ABI from '../abis/v2TokenAbi';
import ERC20_ABI from '../abis/erc20Abi';

export const tickToPrice = (tick: number, token0Decimals: number, token1Decimals: number): number => {
  // Formula: price = 1.0001^tick
  const rawPrice = Math.pow(1.0001, tick);
  
  // Adjust for token decimals
  const decimalAdjustment = 10 ** (token1Decimals - token0Decimals);
  return rawPrice * decimalAdjustment;
};

// V3 pools/CL pools - Convert price to tick
export const priceToTick = (price: number, token0Decimals: number, token1Decimals: number): number => {
  // Adjust for token decimals
  const decimalAdjustment = 10 ** (token1Decimals - token0Decimals);
  const adjustedPrice = price / decimalAdjustment;
  
  // Formula: tick = log base 1.0001 of price
  return Math.floor(Math.log(adjustedPrice) / Math.log(1.0001));
};

// Get the current price from a Concentrated Liquidity pool
export const getClPoolCurrentPrice = async (poolAddress: string): Promise<{
  currentPrice: number | undefined;
  currentTick: number | undefined;
  token0Decimals: number;
  token1Decimals: number;
  tickSpacing: number;
}> => {
  try {
    // Get pool contract with the appropriate ABI
    const poolContract = getContract({
      address: poolAddress as Address,
      abi: CL_TOKEN_ABI,
      client: publicClient,
    });

    // Get token addresses
    const token0Address = await poolContract.read.token0() as Address;
    const token1Address = await poolContract.read.token1() as Address;

    // Get tick spacing (important for position creation)
    const tickSpacing = Number(await poolContract.read.tickSpacing());

    // Instead of relying on slot0(), try to get price data with alternative methods
    let sqrtPriceX96: bigint;
    let tick: number;
    
    try {
      // Method 1: Try using direct sqrtPrice and tick functions if available
      try {
        // Some pools expose these directly
        sqrtPriceX96 = await poolContract.read.sqrtPriceX96() as bigint;
        tick = Number(await poolContract.read.tick());
        console.log('Got price data using direct methods');
      } catch (directError) {
        // Method 2: If direct methods fail, try accessing slot0 without type casting
        console.log('Direct methods failed, trying slot0 without casting');
        const rawSlot0Data = await publicClient.readContract({
          address: poolAddress as Address,
          abi: [{ 
            inputs: [], 
            name: 'slot0', 
            outputs: [
              { type: 'uint160' }, // sqrtPriceX96
              { type: 'int24' },   // tick
              { type: 'uint16' },  // observationIndex
              { type: 'uint16' },  // observationCardinality
              { type: 'uint16' },  // observationCardinalityNext
              { type: 'uint8' },   // feeProtocol
              { type: 'bool' }     // unlocked
            ],
            stateMutability: 'view',
            type: 'function'
          }],
          functionName: 'slot0',
        });
        
        console.log('Raw slot0 data:', rawSlot0Data);
        
        // Extract values from the raw result
        if (Array.isArray(rawSlot0Data) && rawSlot0Data.length >= 2) {
          sqrtPriceX96 = BigInt(rawSlot0Data[0].toString());
          tick = Number(rawSlot0Data[1]);
        } else {
          throw new Error('Unexpected slot0 data format');
        }
      }
    } catch (priceError) {
      console.error('All price data methods failed:', priceError);
      // Fallback to default values
      sqrtPriceX96 = BigInt('1');
      tick = 0;
    }

    // Get token contracts to get decimals
    const token0Contract = getContract({
      address: token0Address,
      abi: ERC20_ABI,
      client: publicClient,
    });

    const token1Contract = getContract({
      address: token1Address,
      abi: ERC20_ABI,
      client: publicClient,
    });

    // Get token decimals
    const token0Decimals = Number(await token0Contract.read.decimals());
    const token1Decimals = Number(await token1Contract.read.decimals());

    // Calculate price from sqrtPriceX96
    const sqrtPrice = Number(sqrtPriceX96) / (2 ** 96);
    const decimalAdjustment = 10 ** (token1Decimals - token0Decimals);
    const price = sqrtPrice ** 2 * decimalAdjustment;

    return {
      currentPrice: price,
      currentTick: tick,
      token0Decimals,
      token1Decimals,
      tickSpacing
    };
  } catch (error) {
    console.error('Error getting CL pool current price:', error);
    // Return fallback values with a price of 1 for UI testing
    return {
      currentPrice: 1, // Use a sensible default
      currentTick: 0,
      token0Decimals: 18,
      token1Decimals: 18,
      tickSpacing: 60 // Default tick spacing
    };
  }
};


export const getPoolCurrentPrice = async (poolAddress: string): Promise<{
  currentPrice: number | undefined;
  currentTick: number | undefined;
  token0Decimals: number;
  token1Decimals: number;
  isV2Pool: boolean;
  tickSpacing?: number;
}> => {
  try {
    const clData = await getClPoolCurrentPrice(poolAddress);
    return {
      ...clData,
      isV2Pool: false
    }; 
  } catch (error) {
    console.error('Error determining pool type or getting price:', error);
    // Return fallback values
    return {
      currentPrice: 1, // Fallback to 1:1 price
      currentTick: undefined,
      token0Decimals: 18,
      token1Decimals: 18,
      isV2Pool: false
    };
  }
};