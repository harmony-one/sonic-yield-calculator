// 📁 components/SonicYieldCalculator/PoolDetails.tsx
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PoolData } from '../../types';
import DepositForm from '../deposit-form/DepositForm';
import { sonic } from '../../web3/chains';
interface PoolDetailsProps {
  pool: PoolData;
}

const blockExplorer = sonic.blockExplorers.default.url

const PoolDetails: React.FC<PoolDetailsProps> = ({ pool }) => {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [nftId, setNftId] = useState<number | null>(null);

  const handleSuccess = (hash: string, id?: number) => {
    setTxHash(hash);
    if (id) setNftId(id);
  };

  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (!address) return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="pool-details">
      {txHash && (
        <div className="success-message">
          <p>Deposit successful!</p>
          <p>Transaction: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</p>
          {nftId && <p>NFT ID: {nftId}</p>}
        </div>
      )}
      <div className="pool-details-layout">
        {/* Left section - Pool details (2 columns) */}
        <div className="pool-info-section">
          <div className="pool-info-grid">
            {/* Column 1 */}
            <div className="pool-info-column">
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
                  <div className="address-with-link">
                    <a href={`${blockExplorer}address/${pool.token0Address}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <div className="detail-item">
                  <span>Token1 Address:</span>
                  <span>{truncateAddress(pool.token1Address)}</span>
                  <div className="address-with-link">
                    <a href={`${blockExplorer}address/${pool.token1Address}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="pool-info-column">
              <div className="detail-group">
                <h4>Contract Info</h4>
                <div className="detail-item">
                  <span>Pool Address:</span>
                  <div className="address-with-link">
                    <span>{truncateAddress(pool.poolAddress)}</span>
                    <a href={`${blockExplorer}address/${pool.poolAddress}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <div className="detail-item">
                  <span>Gauge Address:</span>
                  <div className="address-with-link">
                    <span>{truncateAddress(pool.gaugeAddress)}</span>
                    <a href={`${blockExplorer}address/${pool.gaugeAddress}`} target="_blank" rel="noopener noreferrer">
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
                      <span>{pool.currentPrice}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right section - Deposit form */}
        <div className="deposit-form-section">
          <DepositForm 
            pool={pool} 
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;