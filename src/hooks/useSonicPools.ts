import { useState, useEffect, useCallback } from 'react';
import sonicApi from '../web3/api/sonicApi';
import { PoolData, PoolBasicInfo, Protocol } from '../types';

interface UseSonicPoolsProps {
  protocol: Protocol;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UseSonicPoolsResult {
  pools: PoolData[];
  basicPoolsInfo: PoolBasicInfo[];
  isLoading: boolean;
  isLoadingDetails: boolean;
  error: Error | null;
  fetchPools: () => Promise<void>;
  loadPoolDetails: (poolIndex: number) => Promise<void>;
  loadNextBatch: (count?: number) => Promise<void>;
}

const api = sonicApi();

export function useSonicPools({ 
  protocol, 
  pageSize = 10,
  autoFetch = true 
}: UseSonicPoolsProps): UseSonicPoolsResult {
  const [basicPoolsInfo, setBasicPoolsInfo] = useState<PoolBasicInfo[]>([]);
  const [pools, setPools] = useState<PoolData[]>([]);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
  const [processedAddresses, setProcessedAddresses] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Step 1: Fetch basic pool info
  const fetchPools = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setProcessedAddresses(new Set()); // Reset processed addresses
    
    try {
      const basicInfo = await api.discoverCLPools(protocol);
      
      // Deduplicate basic pool info by poolAddress
      const uniquePoolsMap = new Map<string, PoolBasicInfo>();
      basicInfo.forEach(pool => {
        if (!uniquePoolsMap.has(pool.poolAddress)) {
          uniquePoolsMap.set(pool.poolAddress, pool);
        }
      });
      
      const dedupedBasicInfo = Array.from(uniquePoolsMap.values());
      setBasicPoolsInfo(dedupedBasicInfo);
      
      // Auto-load first batch if specified
      if (dedupedBasicInfo.length > 0) {
        const initialBatch = dedupedBasicInfo.slice(0, pageSize);
        await loadBatch(initialBatch, 0);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [protocol, pageSize]);

  // Step 2: Load a batch of pool details
  const loadBatch = async (batchInfo: PoolBasicInfo[], startIndex: number) => {
    setIsLoadingDetails(true);
    
    try {
      // Filter out pools we've already processed
      const unprocessedBatch = batchInfo.filter(
        pool => !processedAddresses.has(pool.poolAddress)
      );
      
      if (unprocessedBatch.length === 0) {
        setIsLoadingDetails(false);
        return;
      }
      
      const batchPromises = unprocessedBatch.map((poolInfo, i) => {
        const index = startIndex + batchInfo.findIndex(p => p.poolAddress === poolInfo.poolAddress);
        return api.getPoolDetails(poolInfo, protocol).then(poolData => ({
          index,
          poolData,
          poolAddress: poolInfo.poolAddress
        }));
      });
      
      const results = await Promise.all(batchPromises);
      
      // Update the pools array with new data
      setPools(prevPools => {
        const newPools = [...prevPools];
        const newProcessed = new Set(processedAddresses);
        
        results.forEach(({ index, poolData, poolAddress }) => {
          if (poolData) {
            // Only add the pool if it's not already in our list
            if (!newProcessed.has(poolAddress)) {
              newPools[index] = poolData;
              setLoadedIndices(prev => new Set(prev).add(index));
              newProcessed.add(poolAddress);
            }
          }
        });
        
        setProcessedAddresses(newProcessed);
        return newPools;
      });
    } catch (e) {
      console.error("Error loading pool details batch:", e);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Load a specific pool's details
  const loadPoolDetails = async (poolIndex: number) => {
    if (poolIndex >= basicPoolsInfo.length || loadedIndices.has(poolIndex)) {
      return;
    }
    
    setIsLoadingDetails(true);
    
    try {
      const poolInfo = basicPoolsInfo[poolIndex];
      
      // Check if we've already processed this pool
      if (processedAddresses.has(poolInfo.poolAddress)) {
        setLoadedIndices(prev => new Set(prev).add(poolIndex));
        setIsLoadingDetails(false);
        return;
      }
      
      const poolData = await api.getPoolDetails(poolInfo, protocol);
      
      if (poolData) {
        setPools(prevPools => {
          const newPools = [...prevPools];
          newPools[poolIndex] = poolData;
          return newPools;
        });
        
        setLoadedIndices(prev => new Set(prev).add(poolIndex));
        setProcessedAddresses(prev => {
          const newSet = new Set(prev);
          newSet.add(poolInfo.poolAddress);
          return newSet;
        });
      }
    } catch (e) {
      console.error(`Error loading pool details for index ${poolIndex}:`, e);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Load the next batch of pool details
  const loadNextBatch = async (count = pageSize) => {
    const loadedCount = processedAddresses.size;
    if (loadedCount >= basicPoolsInfo.length) {
      return; // All pools already loaded
    }
    
    // Find the next unprocessed pools
    const remainingPools = basicPoolsInfo.filter(
      pool => !processedAddresses.has(pool.poolAddress)
    );
    
    const remainingCount = Math.min(count, remainingPools.length);
    const nextBatch = remainingPools.slice(0, remainingCount);
    
    // Find the starting index for each pool
    const startIndices = nextBatch.map(pool => 
      basicPoolsInfo.findIndex(p => p.poolAddress === pool.poolAddress)
    );
    
    if (nextBatch.length > 0) {
      await loadBatch(nextBatch, Math.min(...startIndices));
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPools();
    }
  }, [fetchPools, autoFetch]);

  return {
    pools: pools.filter(Boolean), // Filter out any undefined entries
    basicPoolsInfo,
    isLoading,
    isLoadingDetails,
    error,
    fetchPools,
    loadPoolDetails,
    loadNextBatch
  };
}

export default useSonicPools;

// // src/hooks/useSonicPools.ts (revised)
// import { useState, useEffect, useCallback } from 'react';
// import sonicApi from '../web3/api/sonicApi';
// import { PoolData, PoolBasicInfo, Protocol } from '../types';

// interface UseSonicPoolsProps {
//   protocol: Protocol;
//   pageSize?: number;
//   autoFetch?: boolean;
// }

// interface UseSonicPoolsResult {
//   pools: PoolData[];
//   basicPoolsInfo: PoolBasicInfo[];
//   isLoading: boolean;
//   isLoadingDetails: boolean;
//   error: Error | null;
//   fetchPools: () => Promise<void>;
//   loadPoolDetails: (poolIndex: number) => Promise<void>;
//   loadNextBatch: (count?: number) => Promise<void>;
// }

// const api = sonicApi();

// export function useSonicPools({ 
//   protocol, 
//   pageSize = 10,
//   autoFetch = true 
// }: UseSonicPoolsProps): UseSonicPoolsResult {
//   const [basicPoolsInfo, setBasicPoolsInfo] = useState<PoolBasicInfo[]>([]);
//   const [pools, setPools] = useState<PoolData[]>([]);
//   const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

//   // Step 1: Fetch basic pool info
//   const fetchPools = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const basicInfo = await api.discoverCLPools(protocol);
//       setBasicPoolsInfo(basicInfo);
      
//       // Auto-load first batch if specified
//       if (basicInfo.length > 0) {
//         const initialBatch = basicInfo.slice(0, pageSize);
//         await loadBatch(initialBatch, 0);
//       }
//     } catch (e) {
//       setError(e instanceof Error ? e : new Error('Unknown error occurred'));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [protocol, pageSize]);

//   // Step 2: Load a batch of pool details
//   const loadBatch = async (batchInfo: PoolBasicInfo[], startIndex: number) => {
//     setIsLoadingDetails(true);
    
//     try {
//       const batchPromises = batchInfo.map((poolInfo, i) => {
//         const index = startIndex + i;
//         return api.getPoolDetails(poolInfo, protocol).then(poolData => ({
//           index,
//           poolData
//         }));
//       });
      
//       const results = await Promise.all(batchPromises);
      
//       // Update the pools array with new data
//       setPools(prevPools => {
//         const newPools = [...prevPools];
        
//         results.forEach(({ index, poolData }) => {
//           if (poolData) {
//             newPools[index] = poolData;
//             setLoadedIndices(prev => new Set(prev).add(index));
//           }
//         });
        
//         return newPools;
//       });
//     } catch (e) {
//       console.error("Error loading pool details batch:", e);
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   // Load a specific pool's details
//   const loadPoolDetails = async (poolIndex: number) => {
//     if (poolIndex >= basicPoolsInfo.length || loadedIndices.has(poolIndex)) {
//       return;
//     }
    
//     setIsLoadingDetails(true);
    
//     try {
//       const poolInfo = basicPoolsInfo[poolIndex];
//       const poolData = await api.getPoolDetails(poolInfo, protocol);
      
//       if (poolData) {
//         setPools(prevPools => {
//           const newPools = [...prevPools];
//           newPools[poolIndex] = poolData;
//           return newPools;
//         });
        
//         setLoadedIndices(prev => new Set(prev).add(poolIndex));
//       }
//     } catch (e) {
//       console.error(`Error loading pool details for index ${poolIndex}:`, e);
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   // Load the next batch of pool details
//   const loadNextBatch = async (count = pageSize) => {
//     const nextIndex = pools.filter(Boolean).length;
//     if (nextIndex >= basicPoolsInfo.length) {
//       return; // All pools already loaded
//     }
    
//     const remainingCount = Math.min(count, basicPoolsInfo.length - nextIndex);
//     const nextBatch = basicPoolsInfo.slice(nextIndex, nextIndex + remainingCount);
    
//     await loadBatch(nextBatch, nextIndex);
//   };

//   useEffect(() => {
//     if (autoFetch) {
//       fetchPools();
//     }
//   }, [fetchPools, autoFetch]);

//   return {
//     pools: pools.filter(Boolean), // Filter out any undefined entries
//     basicPoolsInfo,
//     isLoading,
//     isLoadingDetails,
//     error,
//     fetchPools,
//     loadPoolDetails,
//     loadNextBatch
//   };
// }

// export default useSonicPools;

// src/hooks/useSonicPools.ts
// import { useState, useEffect, useCallback } from 'react';
// import sonicApi from '../web3/api/sonicApi';
// import { PoolData, Protocol } from '../types'

// interface UseSonicPoolsProps {
//   protocol: Protocol;
//   autoFetch?: boolean;
// }

// interface UseSonicPoolsResult {
//   pools: PoolData[];
//   isLoading: boolean;
//   error: Error | null;
//   fetchPools: () => Promise<void>;
// }

// const api = sonicApi();

// /**
//  * Hook to fetch and manage Sonic pool data
//  * @param {Protocol} protocol - 'equalizer' or 'shadow'
//  * @param {boolean} autoFetch - Whether to fetch data automatically on mount
//  */
// export function useSonicPools({ 
//   protocol, 
//   autoFetch = true 
// }: UseSonicPoolsProps): UseSonicPoolsResult {
//   const [pools, setPools] = useState<PoolData[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchPools = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const fetchedPools = await api.getCLPools(protocol);
//       setPools(fetchedPools);
//     } catch (e) {
//       setError(e instanceof Error ? e : new Error('Unknown error occurred'));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [protocol]);

//   useEffect(() => {
//     if (autoFetch) {
//       fetchPools();
//     }
//   }, [fetchPools, autoFetch]);

//   return {
//     pools,
//     isLoading,
//     error,
//     fetchPools,
//   };
// }

// export default useSonicPools;