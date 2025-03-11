// src/hooks/useSonicPools.ts
import { useState, useEffect, useCallback } from 'react';
import sonicApi from '../web3/api/sonicApi';
import { PoolData, Protocol } from '../types'

interface UseSonicPoolsProps {
  protocol: Protocol;
  autoFetch?: boolean;
}

interface UseSonicPoolsResult {
  pools: PoolData[];
  isLoading: boolean;
  error: Error | null;
  fetchPools: () => Promise<void>;
}

const api = sonicApi();

/**
 * Hook to fetch and manage Sonic pool data
 * @param {Protocol} protocol - 'equalizer' or 'shadow'
 * @param {boolean} autoFetch - Whether to fetch data automatically on mount
 */
export function useSonicPools({ 
  protocol, 
  autoFetch = true 
}: UseSonicPoolsProps): UseSonicPoolsResult {
  const [pools, setPools] = useState<PoolData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPools = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedPools = await api.getCLPools(protocol);
      setPools(fetchedPools);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [protocol]);

  useEffect(() => {
    if (autoFetch) {
      fetchPools();
    }
  }, [fetchPools, autoFetch]);

  return {
    pools,
    isLoading,
    error,
    fetchPools,
  };
}

export default useSonicPools;