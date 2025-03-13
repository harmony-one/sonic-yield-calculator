// 📁 components/SonicYieldCalculator/PoolTableRow.tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PoolData } from '../../types';
import PoolDetails from './PoolDetails'

interface PoolTableRowProps {
  pool: PoolData;
  isExpanded: boolean;
  toggleExpanded: () => void;
  isFavorite: boolean;
  toggleFavorite: (event: React.MouseEvent) => void;
}

const PoolTableRow: React.FC<PoolTableRowProps> = ({
  pool,
  isExpanded,
  toggleExpanded,
  isFavorite,
  toggleFavorite
}) => {
  return (
    <React.Fragment>
      <tr 
        onClick={toggleExpanded}
        className={`clickable-row ${isExpanded ? 'expanded' : ''}`}
      >
        <td>
          <button 
            onClick={toggleFavorite}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </td>
        <td>{pool.symbol}</td>
        <td className="number">${pool.tvl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td className="number">${pool.weeklyRewardsUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td className="number">{(pool.apr || 0).toFixed(2)}%</td>
        <td className="number">{pool.fee}</td>
      </tr>
      {isExpanded && (
        <tr className="pool-details-row">
          <td colSpan={6}>
            <PoolDetails pool={pool} />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default PoolTableRow;