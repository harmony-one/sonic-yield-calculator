import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getTokenBalance } from '../web3/api/depositApi';
import { getNativeBalance } from '../web3/api/helper';

// Define supported tokens for Sonic Labs mainnet
export const SUPPORTED_TOKENS = {
  S: {
    symbol: 'S',
    name: 'Sonic Token',
    address: '0x70709614bf9ad5bbab18e2244046d48f234a1583',
    isNative: true,
    decimals: 18
  },
  USDC_E: {
    symbol: 'USDC.e',
    name: 'USD Coin',
    address: '0x29219dd400f2Bf60E5a23d13Be72B486D4038894',
    isNative: false,
    decimals: 6
  }
};

export type TokenInfo = {
  symbol: string;
  name: string;
  address: string;
  isNative: boolean;
  decimals: number;
  balance?: string;
};

export type TokenBalances = {
  [symbol: string]: string;
};

export function useTokens() {
  const { address, isConnected } = useAccount();
  const [tokenBalances, setTokenBalances] = useState<TokenBalances>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all supported token balances
  const fetchAllTokenBalances = async () => {
    if (!isConnected || !address) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const balancePromises = Object.values(SUPPORTED_TOKENS).map(async (token) => {
        try {
          let balance;
          if (token.isNative) {
            balance = await getNativeBalance(address);
          } else {
            balance = await getTokenBalance(token.address, address);
          }
          return { symbol: token.symbol, balance };
        } catch (err) {
          console.error(`Error fetching balance for ${token.symbol}:`, err);
          return { symbol: token.symbol, balance: '0' };
        }
      });
      
      const balances = await Promise.all(balancePromises);
      
      const newBalances = balances.reduce((acc, { symbol, balance }) => {
        acc[symbol] = balance;
        return acc;
      }, {} as TokenBalances);
      
      setTokenBalances(newBalances);
    } catch (err) {
      console.error('Error fetching token balances:', err);
      setError('Failed to fetch token balances');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a specific token balance
  const fetchTokenBalance = async (symbol: string) => {
    if (!isConnected || !address) {
      return '0';
    }
    
    const token = SUPPORTED_TOKENS[symbol as keyof typeof SUPPORTED_TOKENS];
    if (!token) {
      console.error(`Token ${symbol} not supported`);
      return '0';
    }
    
    try {
      let balance: string;
      if (token.isNative) {
        balance = await getNativeBalance(address);
      } else {
        balance = await getTokenBalance(token.address, address);
      }
      
      setTokenBalances(prev => ({
        ...prev,
        [symbol]: balance
      }));
      
      return balance;
    } catch (err) {
      console.error(`Error fetching balance for ${symbol}:`, err);
      return '0';
    }
  };

  // Get supported tokens with balances
  const getSupportedTokensWithBalances = (): TokenInfo[] => {
    return Object.values(SUPPORTED_TOKENS).map(token => ({
      ...token,
      balance: tokenBalances[token.symbol] || '0'
    }));
  };

  // Fetch balances initially on connection
  useEffect(() => {
    if (isConnected) {
      fetchAllTokenBalances();
    }
  }, [isConnected, address]);

  return {
    tokenBalances,
    isLoading,
    error,
    fetchAllTokenBalances,
    fetchTokenBalance,
    getSupportedTokensWithBalances,
    supportedTokens: SUPPORTED_TOKENS
  };
}