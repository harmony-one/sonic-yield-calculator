// 📁 components/SonicYieldCalculator/index.tsx
// Main component that orchestrates everything

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PoolData, Protocol } from '../../types';
import sonicApi from '../../web3/api/sonicApi';

import Toolbar from './Toolbar'
import PoolTable from './PoolTable'
// import StatusBar from './StatusBar';

import './SonicYieldCalculator.styles.scss';
import { AlertTriangle, Loader } from 'lucide-react';

// Small batch size to prevent RPC overload
const BATCH_SIZE = 3;
// Delay between processing batches to avoid overwhelming the RPC
const BATCH_DELAY = 1000;

const SonicYieldCalculator: React.FC = () => {
  // State management
  const [activeProtocol, setActiveProtocol] = useState<Protocol>('shadow');
  const [minTVL, setMinTVL] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<keyof PoolData>('apr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedPoolId, setExpandedPoolId] = useState<string | null>(null);
  
  // State for progressive loading
  const [isLoading, setIsLoading] = useState(true);
  const [poolsMap, setPoolsMap] = useState<Map<string, PoolData>>(new Map());
  const [processedCount, setProcessedCount] = useState(0);
  const [totalPools, setTotalPools] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  
  // Refs to track the API instance and current state
  const apiRef = useRef(sonicApi());
  const isMounted = useRef(true);
  const isLoadingRef = useRef(false);

  // Convert Map to array only when needed for rendering
  const pools = Array.from(poolsMap.values());
  
  // Load data with a controlled approach
  const loadData = useCallback(async () => {
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      setPoolsMap(new Map());
      setProcessedCount(0);
      setTotalPools(0);
      setStatusMessage("Discovering pools...");
      
      // Step 1: Discover pools
      const basicPools = await apiRef.current.discoverCLPools(activeProtocol);
      if (!isMounted.current) return;
      
      setTotalPools(basicPools.length);
      
      if (basicPools.length === 0) {
        setStatusMessage("No pools found. There might be an issue with the RPC connection.");
        setIsLoading(false);
        isLoadingRef.current = false;
        return;
      }
      
      setStatusMessage(`Found ${basicPools.length} pools. Loading details...`);
      
      // Step 2: Process pools in small batches
      const totalBatches = Math.ceil(basicPools.length / BATCH_SIZE);
      
      for (let batch = 0; batch < totalBatches; batch++) {
        if (!isMounted.current) break;
        
        const start = batch * BATCH_SIZE;
        const end = Math.min(start + BATCH_SIZE, basicPools.length);
        const currentBatch = basicPools.slice(start, end);
        
        setStatusMessage(`Loading pools ${start + 1} to ${end} of ${basicPools.length}...`);
        
        // Process each pool in the batch
        for (const poolInfo of currentBatch) {
          try {
            if (!isMounted.current) break;
            
            const poolData = await apiRef.current.getPoolDetails(poolInfo, activeProtocol);
            
            if (poolData) {
              setPoolsMap(prev => {
                const newMap = new Map(prev);
                newMap.set(poolData.poolAddress, poolData);
                return newMap;
              });
            }
            
            setProcessedCount(prevCount => prevCount + 1);
          } catch (e) {
            console.error(`Error processing pool ${poolInfo.poolAddress}:`, e);
          }
          
          // Small delay between pools to avoid overwhelming the RPC
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Delay between batches
        if (batch < totalBatches - 1) {
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
      }
      
      setStatusMessage("Finished loading pool details.");
    } catch (e) {
      if (isMounted.current) {
        console.error("Error loading data:", e);
        setError(e instanceof Error ? e : new Error('Unknown error occurred'));
        setStatusMessage("Error loading data. Please try again.");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }
  }, [activeProtocol]);

  // Filter and sort pools
  const filteredAndSortedPools = React.useMemo(() => {
    return [...pools]
      .filter(pool => pool.tvl >= minTVL)
      .filter(pool => !showOnlyFavorites || favorites.includes(pool.poolAddress))
      .filter(pool => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          pool.symbol.toLowerCase().includes(searchLower) ||
          pool.token0.toLowerCase().includes(searchLower) ||
          pool.token1.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'symbol':
            comparison = a.symbol.localeCompare(b.symbol);
            break;
          case 'tvl':
            comparison = a.tvl - b.tvl;
            break;
          case 'apr':
            comparison = a.apr - b.apr;
            break;
          case 'weeklyRewardsUsd':
            comparison = a.weeklyRewardsUsd - b.weeklyRewardsUsd;
            break;
          default:
            comparison = a.apr - b.apr;
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [pools, minTVL, showOnlyFavorites, favorites, sortBy, sortDirection, searchTerm]);

  // Component mount/unmount
  useEffect(() => {
    isMounted.current = true;
    loadData();
    
    return () => {
      isMounted.current = false;
    };
  }, [loadData]);

  // Handle sort
  const handleSort = (column: keyof PoolData) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Toggle favorite
  const toggleFavorite = (poolAddress: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (favorites.includes(poolAddress)) {
      setFavorites(favorites.filter(addr => addr !== poolAddress));
    } else {
      setFavorites([...favorites, poolAddress]);
    }
  };
  
  // Toggle expanded row
  const togglePoolExpanded = (poolId: string) => {
    if (expandedPoolId === poolId) {
      setExpandedPoolId(null);
    } else {
      setExpandedPoolId(poolId);
    }
  };

  // Handle export
  const handleExport = () => {
    const headers = ['Pool', 'TVL', 'Weekly Rewards', 'APR', 'Fee'];
    const rows = filteredAndSortedPools.map(pool => [
      pool.symbol,
      pool.tvl.toString(),
      pool.weeklyRewardsUsd.toString(),
      pool.apr.toString(),
      pool.fee
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProtocol}-pools-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sonic-yield-calculator">
      <Toolbar 
        activeProtocol={activeProtocol}
        setActiveProtocol={setActiveProtocol}
        minTVL={minTVL}
        setMinTVL={setMinTVL}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        handleRefresh={loadData}
        handleExport={handleExport}
        pools={pools}
      />
      
      {isLoading && (
        <div className="loading-status">
        <div className="spinner">
          <Loader size={20} className="animate-spin" />
        </div>
        <span>{statusMessage}</span>
        {totalPools > 0 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(processedCount / totalPools) * 100}%` }}
              />
            </div>
            <div className="progress-text">
              {processedCount} of {totalPools} pools processed
            </div>
          </div>
        )}
      </div>
      )}
      
      {error && !isLoading && (
          <div className="error-message">
            <AlertTriangle size={18} />
            <span>{error.message}</span>
            <button onClick={loadData}>Try Again</button>
          </div>
      )}
      
      <div className="spreadsheet-container">
        <PoolTable 
          pools={filteredAndSortedPools}
          isLoading={isLoading}
          error={error}
          statusMessage={statusMessage}
          sortBy={sortBy}
          sortDirection={sortDirection}
          handleSort={handleSort}
          expandedPoolId={expandedPoolId}
          togglePoolExpanded={togglePoolExpanded}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
      <div className="status-bar">
      <div>
        Showing {filteredAndSortedPools.length} of {pools.length} pools • 
        {activeProtocol.charAt(0).toUpperCase() + activeProtocol.slice(1)} protocol
        {totalPools > 0 && ` • ${processedCount} of ${totalPools} pools processed`}
      </div>
      <div>
        Min TVL: ${minTVL.toLocaleString()} 
        {searchTerm && ` • Search: "${searchTerm}"`} 
        • Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
      </div>
    </div>
    </div>
  );
};

export default SonicYieldCalculator;