// types.ts

// Available protocols
export type Protocol = 'equalizer' | 'shadow';

// Sorting options
export type SortOption = 'symbol' | 'tvl' | 'weeklyAPR' | 'yearlyAPR';

// Sort direction
export type SortDirection = 'asc' | 'desc';

// Pool data structure
export interface PoolData {
  index?: number; // Optional index for internal tracking
  poolAddress: string;
  gaugeAddress: string;
  symbol: string;
  token0: string;
  token1: string;
  tvl: number;
  weeklyAPR: number;
  yearlyAPR: number;
  rewardRate: string;
  periodFinish: string;
  rewardTokenPrice?: number; // Optional for calculations
  raw?: {
    reserve0: string;
    reserve1: string;
    token0Price: number;
    token1Price: number;
    rewardRateRaw: string;
    periodFinishRaw: string;
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