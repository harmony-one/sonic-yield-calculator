import React, { useState, useEffect } from 'react';
import { RefreshCw, Download, UploadCloud, ChevronUp, ChevronDown, FilePlus } from 'lucide-react';
import { PoolData } from '../../types';
import './SonicYieldCalculator.styles.scss';

const SonicYieldCalculator = () => {
  const [activeProtocol, setActiveProtocol] = useState<'equalizer' | 'shadow'>('equalizer');
  const [pools, setPools] = useState<PoolData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [minTVL, setMinTVL] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>('apr');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState<string | null>(null);
  
  // Mock data
  const mockPools: PoolData[] = [
    { poolAddress: '0x123...1', gaugeAddress: '0xg123...1', symbol: 'ONE-USDC', token0: 'ONE', token1: 'USDC', tvl: 125000, weeklyAPR: 2.5, yearlyAPR: 130, rewardRate: '100 EQUAL/day', periodFinish: '2025-04-01' },
    { poolAddress: '0x123...2', gaugeAddress: '0xg123...2', symbol: 'ETH-ONE', token0: 'ETH', token1: 'ONE', tvl: 85000, weeklyAPR: 1.8, yearlyAPR: 93.6, rewardRate: '75 EQUAL/day', periodFinish: '2025-03-28' },
    { poolAddress: '0x123...3', gaugeAddress: '0xg123...3', symbol: 'USDC-USDT', token0: 'USDC', token1: 'USDT', tvl: 250000, weeklyAPR: 1.2, yearlyAPR: 62.4, rewardRate: '150 EQUAL/day', periodFinish: '2025-04-15' },
    { poolAddress: '0x123...4', gaugeAddress: '0xg123...4', symbol: 'WBTC-ETH', token0: 'WBTC', token1: 'ETH', tvl: 180000, weeklyAPR: 1.9, yearlyAPR: 98.8, rewardRate: '90 EQUAL/day', periodFinish: '2025-04-10' },
    { poolAddress: '0x123...5', gaugeAddress: '0xg123...5', symbol: 'ONE-BUSD', token0: 'ONE', token1: 'BUSD', tvl: 45000, weeklyAPR: 3.2, yearlyAPR: 166.4, rewardRate: '50 EQUAL/day', periodFinish: '2025-03-25' }
  ];

  // Simulating data loading when protocol changes
  useEffect(() => {
    const loadPools = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for demonstration
        if (activeProtocol === 'equalizer') {
          setPools(mockPools);
        } else {
          const shadowPools: PoolData[] = mockPools.map(pool => ({
            ...pool,
            rewardRate: pool.rewardRate.replace('EQUAL', 'SHADOW'),
            yearlyAPR: pool.yearlyAPR * 0.9,
            weeklyAPR: pool.weeklyAPR * 0.9
          }));
          setPools(shadowPools);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load pools. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPools();
  }, [activeProtocol]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new column
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Filter and sort pools
  const filteredAndSortedPools = [...pools]
    .filter(pool => pool.tvl >= minTVL)
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'symbol':
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case 'tvl':
          comparison = a.tvl - b.tvl;
          break;
        case 'weeklyAPR':
          comparison = a.weeklyAPR - b.weeklyAPR;
          break;
        case 'yearlyAPR':
          comparison = a.yearlyAPR - b.yearlyAPR;
          break;
        default:
          comparison = a.yearlyAPR - b.yearlyAPR;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleImport = (): void => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Data imported successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = (): void => {
    alert('Data would be exported as CSV here');
  };

  const handleNewEntry = (): void => {
    alert('New entry form would open here');
  };

  return (
    <div className="sonic-yield-calculator">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="protocol-selector">
          <button 
            className={activeProtocol === 'equalizer' ? 'active' : ''} 
            onClick={() => setActiveProtocol('equalizer')}
          >
            Equalizer
          </button>
          <button 
            className={activeProtocol === 'shadow' ? 'active' : ''} 
            onClick={() => setActiveProtocol('shadow')}
          >
            Shadow
          </button>
        </div>
        
        <div className="toolbar-actions">
          <button 
            title="Import Data"
            onClick={handleImport}
          >
            <UploadCloud size={18} />
          </button>
          <button 
            title="Export Data"
            onClick={handleExport}
          >
            <Download size={18} />
          </button>
          <button 
            title="New Entry"
            onClick={handleNewEntry}
          >
            <FilePlus size={18} />
          </button>
          <button 
            className={isLoading ? 'animate-spin' : ''} 
            title="Refresh Data"
            onClick={() => window.location.reload()}
            disabled={isLoading}
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        <div className="filters">
          <label>
            Min TVL:
            <input 
              type="number" 
              value={minTVL} 
              onChange={(e) => setMinTVL(Number(e.target.value))} 
            />
          </label>
        </div>
      </div>
      
      {/* Spreadsheet */}
      <div className="spreadsheet-container">
        <table>
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('symbol')}
              >
                <div className="th-content">
                  Pool
                  {sortBy === 'symbol' && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('tvl')}
                className="number"
              >
                <div className="th-content">
                  TVL
                  {sortBy === 'tvl' && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('weeklyAPR')}
                className="number"
              >
                <div className="th-content">
                  Weekly APR
                  {sortBy === 'weeklyAPR' && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('yearlyAPR')}
                className="number"
              >
                <div className="th-content">
                  Yearly APR
                  {sortBy === 'yearlyAPR' && (
                    <span className="sort-indicator">
                      {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </th>
              <th>Reward Rate</th>
              <th>Period Finish</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="loading">
                  Loading pool data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="error">
                  {error}
                </td>
              </tr>
            ) : filteredAndSortedPools.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-pools">
                  No pools found matching criteria
                </td>
              </tr>
            ) : (
              filteredAndSortedPools.map((pool, index) => (
                <tr 
                  key={pool.poolAddress || `${pool.symbol}-${index}`}
                >
                  <td>{pool.symbol}</td>
                  <td className="number">${pool.tvl.toLocaleString()}</td>
                  <td className="number">{pool.weeklyAPR.toFixed(2)}%</td>
                  <td className="number">{pool.yearlyAPR.toFixed(2)}%</td>
                  <td>{pool.rewardRate}</td>
                  <td>{pool.periodFinish}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Status bar */}
      <div className="status-bar">
        <div>
          {filteredAndSortedPools.length} pools • {activeProtocol.charAt(0).toUpperCase() + activeProtocol.slice(1)} protocol
        </div>
        <div>
          Min TVL: ${minTVL.toLocaleString()} • Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
        </div>
      </div>
    </div>
  );
};

export default SonicYieldCalculator;