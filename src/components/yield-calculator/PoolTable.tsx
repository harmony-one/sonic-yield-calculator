// 📁 components/SonicYieldCalculator/PoolTable.tsx
import React from 'react';
import { ChevronUp, ChevronDown, Loader } from 'lucide-react';
import { PoolData } from '../../types';
import PoolTableRow from './PoolTableRow'

interface PoolTableProps {
  pools: PoolData[];
  isLoading: boolean;
  error: Error | null;
  statusMessage: string;
  sortBy: keyof PoolData;
  sortDirection: 'asc' | 'desc';
  handleSort: (column: keyof PoolData) => void;
  expandedPoolId: string | null;
  togglePoolExpanded: (poolId: string) => void;
  favorites: string[];
  toggleFavorite: (poolAddress: string, event: React.MouseEvent) => void;
}

const PoolTable: React.FC<PoolTableProps> = ({
  pools,
  isLoading,
  error,
  statusMessage,
  sortBy,
  sortDirection,
  handleSort,
  expandedPoolId,
  togglePoolExpanded,
  favorites,
  toggleFavorite
}) => {
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

  return (
    <div className="table-wrapper">
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
          {error && !isLoading ? (
            <tr>
              <td colSpan={6} className="error">
                {error.message || "An error occurred"}
              </td>
            </tr>
          ) : isLoading && pools.length === 0 ? (
            <tr>
              <td colSpan={6} className="loading">
                <div className="spinner">
                  <Loader size={24} className="animate-spin" />
                </div>
                {statusMessage}
              </td>
            </tr>
          ) : pools.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-pools">
                No pools found matching criteria
              </td>
            </tr>
          ) : (
            pools.map((pool) => (
              <PoolTableRow
                key={pool.poolAddress}
                pool={pool}
                isExpanded={expandedPoolId === pool.poolAddress}
                toggleExpanded={() => togglePoolExpanded(pool.poolAddress)}
                isFavorite={favorites.includes(pool.poolAddress)}
                toggleFavorite={(e) => toggleFavorite(pool.poolAddress, e)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PoolTable;