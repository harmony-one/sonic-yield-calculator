// 📁 hooks/useDeposit.ts
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { DepositData, PoolData } from '../types';
import { depositToPool, getPoolCurrentPrice, getTokenBalance } from '../web3/api/depositApi';

interface UseDepositReturn {
  isLoading: boolean;
  error: string | null;
  currentPrice: number | undefined;
  currentTick: number | undefined;
  tokenBalance: string;
  fetchPoolPrice: (poolAddress: string) => Promise<void>;
  fetchTokenBalance: (tokenAddress: string) => Promise<void>;
  deposit: (pool: PoolData, depositData: DepositData) => Promise<{
    success: boolean;
    txHash?: string;
    nftId?: number;
  }>;
}

export function useDeposit(): UseDepositReturn {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | undefined>(undefined);
  const [currentTick, setCurrentTick] = useState<number | undefined>(undefined);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  
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
  
  const fetchTokenBalance = async (tokenAddress: string): Promise<void> => {
    if (!isConnected || !address) {
      setTokenBalance('0');
      return;
    }
    
    try {
      const balance = await getTokenBalance(tokenAddress, address);
      setTokenBalance(balance);
    } catch (err) {
      console.error('Error fetching token balance:', err);
      setTokenBalance('0');
    }
  };
  
  const deposit = async (pool: PoolData, depositData: DepositData): Promise<{
    success: boolean;
    txHash?: string;
    nftId?: number;
  }> => {
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
    tokenBalance,
    fetchPoolPrice,
    fetchTokenBalance,
    deposit 
  };
}