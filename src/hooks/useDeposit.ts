import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { DepositData, PoolData } from '../types';
import { depositToPool, getTokenBalance } from '../web3/api/depositApi';
import { getPoolCurrentPrice } from '../web3/api/poolHelper';

interface UseDepositReturn {
  isLoading: boolean;
  error: string | null;
  currentPrice: number | undefined;
  currentTick: number | undefined;
  priceView: 'token0' | 'token1';
  togglePriceView: () => void;
  getDisplayPrice: (pool: PoolData) => number;
  calculatePriceRange: (percentage?: number) => {
    minPrice: number;
    maxPrice: number;
    width: number;
  };
  fetchPoolPrice: (poolAddress: string) => Promise<void>;
  deposit: (pool: PoolData, depositData: DepositData) => Promise<{
    success: boolean;
    txHash?: string;
    nftId?: number;
  } | undefined>;
}

export function useDeposit(): UseDepositReturn {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | undefined>(undefined);
  const [currentTick, setCurrentTick] = useState<number | undefined>(undefined);
  const [priceView, setPriceView] = useState<'token0' | 'token1'>('token0');
  
  const fetchPoolPrice = async (poolAddress: string): Promise<void> => {
    try {
      const { currentPrice, currentTick } = await getPoolCurrentPrice(poolAddress);
      setCurrentPrice(currentPrice);
      setCurrentTick(currentTick);
    } catch (err) {
      console.error('Error fetching pool price:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch pool price');
    }
  };
  
  // Toggle between token0 and token1 price view
  const togglePriceView = () => {
    setPriceView(prev => prev === 'token0' ? 'token1' : 'token0');
  };
  
  // Calculate price range based on current price and percentage
  const calculatePriceRange = (percentage?: number): { minPrice: number; maxPrice: number; width: number } => {
    // Default to 12.4% if percentage is not provided
    const rangePercent = percentage !== undefined ? percentage : 12.4;
    
    if (!currentPrice) return { minPrice: 0, maxPrice: 0, width: 0 };
    
    const minPercent = 1 - (rangePercent / 100);
    const maxPercent = 1 + (rangePercent / 100);
    
    return {
      minPrice: currentPrice * minPercent,
      maxPrice: currentPrice * maxPercent,
      width: rangePercent * 2
    };
  };
  
  // Get price in the correct format based on current view
  const getDisplayPrice = (pool: PoolData): number => {
    if (!currentPrice) return 0;
    
    // If viewing from token1 perspective, invert the price
    return priceView === 'token0' ? currentPrice : (1 / currentPrice);
  };
  
  const deposit = async (pool: PoolData, depositData: DepositData) => {
    if (!isConnected || !address) {
      setError('Wallet not connected');
      return { success: false };
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First ensure we have current price
      if (!currentPrice || !currentTick) {
        await fetchPoolPrice(pool.poolAddress);
      }
      
      const result = await depositToPool(pool, depositData, address);
      
      if (!result.success) {
        throw new Error(result.error || 'Deposit failed');
      }
      
      setIsLoading(false);
      return {
        success: true,
        txHash: result.txHash,
        nftId: result.nftId
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false };
    }
  };
  
  return { 
    isLoading, 
    error, 
    currentPrice, 
    currentTick,
    priceView,
    togglePriceView,
    getDisplayPrice,
    calculatePriceRange,
    fetchPoolPrice,
    deposit 
  };
}