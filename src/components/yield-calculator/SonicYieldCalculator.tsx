import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useSonicPools } from '../../hooks/useSonicPools';
import { PoolData, Protocol } from '../../types';
import "./SonicYieldCalculator.styles.scss";

const POOLS_PER_PAGE = 10; // Number of pools to display per page

const SonicYieldCalculator: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<Protocol>('shadow');
  const [minTVL, setMinTVL] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<keyof PoolData>('apr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedPoolId, setExpandedPoolId] = useState<string | null>(null);
  
  // Using the hook with auto-fetch set to true
  const { pools, isLoading, error, fetchPools } = useSonicPools({ 
    protocol: activeProtocol,
    autoFetch: true 
  });

  const handleSort = (column: keyof PoolData) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
    setCurrentPage(1); // Reset to first page on sort change
  };

  const toggleFavorite = (poolAddress: string, event: React.MouseEvent) => {
    // Prevent clicking the star from also toggling row expansion
    event.stopPropagation();
    
    if (favorites.includes(poolAddress)) {
      setFavorites(favorites.filter(addr => addr !== poolAddress));
    } else {
      setFavorites([...favorites, poolAddress]);
    }
  };
  
  const togglePoolExpanded = (poolId: string) => {
    if (expandedPoolId === poolId) {
      setExpandedPoolId(null);
    } else {
      setExpandedPoolId(poolId);
    }
  };

  // Filter and sort pools
  const getFilteredAndSortedPools = useCallback(() => {
    return [...pools]
      .filter(pool => pool.tvl >= minTVL)
      .filter(pool => !showOnlyFavorites || favorites.includes(pool.poolAddress))
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
  }, [pools, minTVL, showOnlyFavorites, favorites, sortBy, sortDirection]);

  const filteredAndSortedPools = getFilteredAndSortedPools();
  
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredAndSortedPools.length / POOLS_PER_PAGE);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minTVL, showOnlyFavorites, activeProtocol]);
  
  // Get current page's pools
  const getCurrentPagePools = () => {
    const startIndex = (currentPage - 1) * POOLS_PER_PAGE;
    const endIndex = startIndex + POOLS_PER_PAGE;
    return filteredAndSortedPools.slice(startIndex, endIndex);
  };

  const currentPools = getCurrentPagePools();
  
  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  // Render column header with sort indicator
  const renderColumnHeader = (label: string, column: keyof PoolData, className: string = '') => {
    return (
      <th 
        className={className}
        onClick={() => handleSort(column)}
      >
        <div className="th-content">
          {label}
          {sortBy === column && (
            <span className="sort-indicator">
              {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          )}
        </div>
      </th>
    );
  };

  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (!address) return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format a value for display
  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') {
      if (value > 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      return value.toString();
    }
    return value.toString();
  };

  return (
    <div className="sonic-yield-calculator">
      {/* Simple toolbar */}
      <div className="toolbar">
        <div className="protocol-selector">
          <button 
            className={activeProtocol === 'shadow' ? 'active' : ''} 
            onClick={() => setActiveProtocol('shadow')}
          >
            Shadow
          </button>
          <button 
            className={activeProtocol === 'equalizer' ? 'active' : ''} 
            disabled={true}
            onClick={() => setActiveProtocol('equalizer')}
          >
            Equalizer
          </button>
        </div>
        
        <div className="filters">
          <label>
            Min TVL: $
            <input 
              type="number" 
              value={minTVL} 
              onChange={(e) => setMinTVL(Number(e.target.value))} 
            />
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={showOnlyFavorites}
              onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
            Favorites Only
          </label>
        </div>
        
        <div className="toolbar-actions">
          <button 
            title="Export Data"
            onClick={handleExport}
          >
            <Download size={18} />
          </button>
          
          <button 
            title="Refresh Data"
            onClick={() => fetchPools()}
            className={isLoading ? 'animate-spin' : ''}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="status-indicator">
          Loading pool data... {pools.length > 0 ? `(${pools.length} pools loaded so far)` : ''}
        </div>
      )}
      
      {/* Spreadsheet */}
      <div className="spreadsheet-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}></th>
              {renderColumnHeader('Asset', 'symbol')}
              {renderColumnHeader('TVL', 'tvl', 'number')}
              {renderColumnHeader('Weekly Rewards', 'weeklyRewardsUsd', 'number')}
              {renderColumnHeader('APR', 'apr', 'number')}
              <th className="number">Fee</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={6} className="error">
                  {error.message || "An error occurred"}
                </td>
              </tr>
            ) : pools.length === 0 && isLoading ? (
              <tr>
                <td colSpan={6} className="loading">
                  Fetching initial pool data...
                </td>
              </tr>
            ) : filteredAndSortedPools.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-pools">
                  No pools found matching criteria
                </td>
              </tr>
            ) : (
              currentPools.map((pool) => (
                <React.Fragment key={pool.poolAddress}>
                  <tr 
                    onClick={() => togglePoolExpanded(pool.poolAddress)}
                    className={`clickable-row ${expandedPoolId === pool.poolAddress ? 'expanded' : ''}`}
                  >
                    <td>
                      <button 
                        onClick={(e) => toggleFavorite(pool.poolAddress, e)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          fontSize: '18px'
                        }}
                      >
                        {favorites.includes(pool.poolAddress) ? '★' : '☆'}
                      </button>
                    </td>
                    <td>{pool.symbol}</td>
                    <td className="number">${pool.tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="number">${pool.weeklyRewardsUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td className="number">{(pool.apr || 0).toFixed(2)}%</td>
                    <td className="number">{pool.fee}</td>
                  </tr>
                  {expandedPoolId === pool.poolAddress && (
                    <tr className="pool-details-row">
                      <td colSpan={6}>
                        <div className="pool-details">
                          <div className="pool-details-grid">
                            <div className="detail-group">
                              <h4>Pool</h4>
                              <div className="detail-item">
                                <span>In Range TVL:</span>
                                <span>${pool.tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                              </div>
                              <div className="detail-item">
                                <span>Weekly Rewards:</span>
                                <span>${pool.weeklyRewardsUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                              </div>
                              <div className="detail-item">
                                <span>APR:</span>
                                <span>{(pool.apr || 0).toFixed(2)}%</span>
                              </div>
                              <div className="detail-item">
                                <span>Fee:</span>
                                <span>{pool.fee}</span>
                              </div>
                            </div>
                            
                            <div className="detail-group">
                              <h4>Token Info</h4>
                              <div className="detail-item">
                                <span>Token0:</span>
                                <span>{pool.token0}</span>
                              </div>
                              <div className="detail-item">
                                <span>Token1:</span>
                                <span>{pool.token1}</span>
                              </div>
                              <div className="detail-item">
                                <span>Token0 Address:</span>
                                <span>{truncateAddress(pool.token0Address)}</span>
                              </div>
                              <div className="detail-item">
                                <span>Token1 Address:</span>
                                <span>{truncateAddress(pool.token1Address)}</span>
                              </div>
                            </div>
                            
                            <div className="detail-group">
                              <h4>Contract Info</h4>
                              <div className="detail-item">
                                <span>Pool Address:</span>
                                <div className="address-with-link">
                                  <span>{truncateAddress(pool.poolAddress)}</span>
                                  <a href={`https://explorer.sonic.com/address/${pool.poolAddress}`} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={14} />
                                  </a>
                                </div>
                              </div>
                              <div className="detail-item">
                                <span>Gauge Address:</span>
                                <div className="address-with-link">
                                  <span>{truncateAddress(pool.gaugeAddress)}</span>
                                  <a href={`https://explorer.sonic.com/address/${pool.gaugeAddress}`} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink size={14} />
                                  </a>
                                </div>
                              </div>
                              <div className="detail-item">
                                <span>Tick Spacing:</span>
                                <span>{pool.tickSpacing}</span>
                              </div>
                              <div className="detail-item">
                                <span>Liquidity:</span>
                                <span>{parseFloat(pool.liquidity).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                              </div>
                            </div>
                            
                            {(pool.currentTick !== undefined || pool.currentPrice !== undefined) && (
                              <div className="detail-group">
                                <h4>Current State</h4>
                                {pool.currentTick !== undefined && (
                                  <div className="detail-item">
                                    <span>Current Tick:</span>
                                    <span>{pool.currentTick}</span>
                                  </div>
                                )}
                                {pool.currentPrice !== undefined && (
                                  <div className="detail-item">
                                    <span>Current Price:</span>
                                    <span>{formatValue(pool.currentPrice)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination controls */}
      {filteredAndSortedPools.length > 0 && (
        <div className="pagination-controls">
          <button 
            onClick={goToPrevPage} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      
      {/* Status bar */}
      <div className="status-bar">
        <div>
          Showing {currentPools.length} of {filteredAndSortedPools.length} pools • {activeProtocol.charAt(0).toUpperCase() + activeProtocol.slice(1)} protocol
        </div>
        <div>
          Min TVL: ${minTVL.toLocaleString()} • Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
        </div>
      </div>
    </div>
  );
};

export default SonicYieldCalculator;