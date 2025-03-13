// types.ts

// Available protocols
export type Protocol = 'equalizer' | 'shadow';

// Sorting options
export type SortOption = 'symbol' | 'tvl' | 'weeklyAPR' | 'yearlyAPR';

// Sort direction
export type SortDirection = 'asc' | 'desc';

export interface PoolBasicInfo {
  poolAddress: string;
  gaugeAddress: string;
}

// Pool data structure
export interface PoolData {
  id: string;
  poolAddress: string;
  gaugeAddress: string;
  symbol: string;
  token0: string;
  token1: string;
  token0Address: string;
  token1Address: string;
  isV2?: boolean;
  fee: string;
  tvl: number;
  tickSpacing: number;
  liquidity: string;
  activeTvl?: number;
  weeklyRewardsUsd: number;
  apr: number;
  currentTick?: number;
  currentPrice?: number;
}

export interface TokenPriceData {
  [tokenAddress: string]: {
    usd: number;
  };
}

// API options for fetching pools
export interface GetPoolsOptions {
  protocol: Protocol;
  onFailed?: (error: Error) => void;
}

// Sonic API interface
export interface SonicApi {
  getPools: (options: GetPoolsOptions) => Promise<PoolData[]>;
}

export interface DepositData {
  token: string;
  amount: string;
  minPrice: number;
  maxPrice: number;
  slippage: number;
  autoRebalance: boolean;
  autoRewards: boolean;
}