// 📁 components/SonicYieldCalculator/Toolbar.tsx
import React from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { Protocol, PoolData } from '../../types';

interface ToolbarProps {
  activeProtocol: Protocol;
  setActiveProtocol: (protocol: Protocol) => void;
  minTVL: number;
  setMinTVL: (value: number) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
  handleRefresh: () => void;
  handleExport: () => void;
  pools: PoolData[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeProtocol,
  setActiveProtocol,
  minTVL,
  setMinTVL,
  showOnlyFavorites,
  setShowOnlyFavorites,
  searchTerm,
  setSearchTerm,
  isLoading,
  handleRefresh,
  handleExport,
  pools
}) => {
  return (
    <div className="toolbar">
      <div className="protocol-selector">
        <button 
          className={activeProtocol === 'shadow' ? 'active' : ''} 
          onClick={() => setActiveProtocol('shadow')}
          disabled={isLoading}
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
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search pools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="toolbar-actions">
        <button 
          title="Export Data"
          onClick={handleExport}
          disabled={isLoading || pools.length === 0}
        >
          <Download size={18} />
        </button>
        
        <button 
          title="Refresh Data"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;