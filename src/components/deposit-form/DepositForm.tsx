import React, { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw, Zap, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { DepositData, PoolData } from '../../types';
import { useDeposit } from '../../hooks/useDeposit';
import { useTokens, TokenInfo } from '../../hooks/useTokens';
import './DepositForm.styles.scss'

interface DepositFormProps {
pool: PoolData;
onSuccess?: (txHash: string, nftId?: number) => void;
}

const DepositForm: React.FC<DepositFormProps> = ({ pool, onSuccess }) => {
// Form state
const [selectedToken, setSelectedToken] = useState<string>(pool.token0);
const [amount, setAmount] = useState<string>('');
const [minPrice, setMinPrice] = useState<string>('');
const [maxPrice, setMaxPrice] = useState<string>('');
const [rangePercentage, setRangePercentage] = useState<number>(12.4);
const [slippage, setSlippage] = useState<number>(0.5);
const [autoRebalance, setAutoRebalance] = useState<boolean>(false);
const [autoRewards, setAutoRewards] = useState<boolean>(false);

const { 
  isLoading: depositLoading, 
  error: depositError, 
  currentPrice,
  currentTick,
  priceView, 
  togglePriceView,
  getDisplayPrice,
  calculatePriceRange,
  fetchPoolPrice,
  deposit 
} = useDeposit();

// Get the selected token balance from the tokens hook
const getSelectedTokenBalance = (): string => {
  return tokenBalances[selectedToken] || '0';
};

// Use the new tokens hook for wallet token balances
const {
  tokenBalances,
  isLoading: tokensLoading,
  error: tokensError,
  getSupportedTokensWithBalances
} = useTokens();

// Fetch current price when component mounts or pool changes
useEffect(() => {
  fetchPoolPrice(pool.poolAddress);
}, [pool.poolAddress]);

// Update price range when current price, view or range percentage changes
useEffect(() => {
  if (!currentPrice) return;
  
  const displayPrice = getDisplayPrice(pool);
  const { minPrice: min, maxPrice: max } = calculatePriceRange(rangePercentage);
  
  // Apply price view perspective
  const displayMin = priceView === 'token0' ? min : (1 / max);
  const displayMax = priceView === 'token0' ? max : (1 / min);
  
  // Format to 6 decimal places for display
  setMinPrice(displayMin.toFixed(6));
  setMaxPrice(displayMax.toFixed(6));
}, [currentPrice, priceView, rangePercentage]);

// Calculate price range width as percentage
const calculateWidth = (): number => {
  if (!minPrice || !maxPrice) return 0;
  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);
  if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0 || min >= max) return 0;
  
  // Calculate width as percentage difference between max and min
  return ((max - min) / min) * 100;
};

// Calculate APR based on position width
const calculateAPR = (): string => {
  const width = calculateWidth();
  if (width <= 0) return "0";
  // Base APR is assumed to be around 30% (typical for CL pools)
  // As width decreases, APR increases proportionally
  const baseAPR = 30;
  return Math.max(0, (baseAPR * (100 / width))).toFixed(2);
};

// Handle price range adjustments
const adjustPriceRange = (type: 'min' | 'max', action: 'increase' | 'decrease') => {
  if (!currentPrice) return;
  
  setRangePercentage(prev => {
    // For min price adjustment, we're changing the negative percentage
    if (type === 'min') {
      // Decrease means wider range (more negative)
      if (action === 'decrease') {
        return prev + 0.2; // Make range wider by 0.2%
      } else {
        // Increase means narrower range (less negative)
        return Math.max(0.4, prev - 0.2); // Make range narrower, min 0.4% to keep prices different
      }
    } else {
      // For max price adjustment, we're changing the positive percentage
      if (action === 'increase') {
        return prev + 0.2; // Make range wider by 0.2%
      } else {
        // Decrease means narrower range
        return Math.max(0.4, prev - 0.2); // Make range narrower, min 0.4% to keep prices different
      }
    }
  });
};

// Token dropdown component using the tokens hook
const TokenDropdown = ({ 
  selectedToken, 
  onSelectToken
}: { 
  selectedToken: string, 
  onSelectToken: (token: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get supported tokens with balances
  const supportedTokens = getSupportedTokensWithBalances();
  
  // Filter tokens based on search query
  const filteredTokens = supportedTokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectToken = (token: string) => {
    onSelectToken(token);
    setIsOpen(false);
  };
  
  // Get token icon letter (first letter of symbol)
  const getTokenIconLetter = (symbol: string) => {
    return symbol.charAt(0);
  };
  
  // Get selected token info
  const selectedTokenInfo = supportedTokens.find(t => t.symbol === selectedToken) || supportedTokens[0];
  
  return (
    <div className="token-dropdown">
      <button 
        type="button" 
        className={`token-dropdown-button ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="token-button-content">
          <span className="token-icon">{getTokenIconLetter(selectedTokenInfo.symbol)}</span>
          <span>{selectedTokenInfo.symbol}</span>
        </div>
        {isOpen ? <ChevronUp size={16} className="dropdown-arrow" /> : <ChevronDown size={16} className="dropdown-arrow" />}
      </button>
      
      {isOpen && (
        <div className="token-dropdown-menu">
          <div className="search-input">
            <div className="search-input-wrapper">
              <Search size={14} />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search tokens..." 
              />
            </div>
          </div>
          <div className="token-list">
            {filteredTokens.map(token => (
              <div 
                key={token.symbol} 
                className="token-item" 
                onClick={() => handleSelectToken(token.symbol)}
              >
                <span className="token-icon">{getTokenIconLetter(token.symbol)}</span>
                <span className="token-name">{token.symbol}</span>
                <span className="token-balance">{token.balance} {token.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Format the current price display
const formatCurrentPrice = (): string => {
  if (!currentPrice) return "0.000000";
  
  const displayPrice = getDisplayPrice(pool);
  return displayPrice.toFixed(6);
};

// Handle deposit submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const depositData: DepositData = {
    token: selectedToken,
    amount,
    minPrice: parseFloat(minPrice),
    maxPrice: parseFloat(maxPrice),
    slippage,
    autoRebalance,
    autoRewards
  };
  
  console.log(':::::::: depositData', { depositData })
  console.log(':::::::: depositData pool', { pool })
  const result = await deposit(pool, depositData);
  
  if (result?.success) {
    // Call onSuccess callback if provided
    if (onSuccess && result.txHash) {
      onSuccess(result.txHash, result.nftId);
    }
  }
};

// Set max amount based on selected token balance
const handleSetMax = () => {
  setAmount(getSelectedTokenBalance());
};

return (
  <div className="deposit-form-container">
    <h3 className="deposit-form-title">Deposit Position</h3>
    
    <form onSubmit={handleSubmit} className="deposit-form">
      {/* Price View Selector */}
      <div className="form-section">
        <label className="form-label">Price View</label>
        <div className="token-selector price-view-selector">
          <button
            type="button"
            className={`token-button ${priceView === 'token0' ? 'active' : ''}`}
            onClick={() => togglePriceView()}
          >
            Price in {pool.token0}
          </button>
          <button
            type="button"
            className={`token-button ${priceView === 'token1' ? 'active' : ''}`}
            onClick={() => togglePriceView()}
          >
            Price in {pool.token1}
          </button>
        </div>
      </div>
      
      {/* Token Selection - Dropdown with Sonic tokens */}
      <div className="form-section">
        <label className="form-label">Token to deposit</label>
        <TokenDropdown 
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
        />
      </div>
      
      {/* Amount Input */}
      <div className="form-section">
        <label className="form-label">Amount</label>
        <div className="balance-label">Balance: {getSelectedTokenBalance()} {selectedToken}</div>
        <div className="input-with-button">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="form-input"
          />
          <button type="button" onClick={handleSetMax} className="max-button">MAX</button>
        </div>
      </div>
      
      {/* Current Price Display */}
      <div className="current-price">
        Current Price: {formatCurrentPrice()} {priceView === 'token0' ? pool.token1 : pool.token0} per {priceView === 'token0' ? pool.token0 : pool.token1}
      </div>
      
      {/* Price Range */}
      <div className="form-section">
        <label className="form-label">Price Range</label>
        <div className="price-inputs">
          <div className="price-input-group">
            <label className="sub-label">Min Price ({-rangePercentage.toFixed(1)}%)</label>
            <input
              type="text"
              value={minPrice}
              onChange={(e) => {
                const value = e.target.value;
                // Ensure min is always less than max
                if (value && (!maxPrice || parseFloat(value) < parseFloat(maxPrice))) {
                  setMinPrice(value);
                }
              }}
              className="form-input"
            />
            <div className="price-adjust-buttons">
              <button type="button" onClick={() => adjustPriceRange('min', 'decrease')} className="adjust-button">−</button>
              <button type="button" onClick={() => adjustPriceRange('min', 'increase')} className="adjust-button">+</button>
            </div>
          </div>
          <div className="price-input-group">
            <label className="sub-label">Max Price (+{rangePercentage.toFixed(1)}%)</label>
            <input
              type="text"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                // Ensure max is always greater than min
                if (value && (!minPrice || parseFloat(value) > parseFloat(minPrice))) {
                  setMaxPrice(value);
                }
              }}
              className="form-input"
            />
            <div className="price-adjust-buttons">
              <button type="button" onClick={() => adjustPriceRange('max', 'decrease')} className="adjust-button">−</button>
              <button type="button" onClick={() => adjustPriceRange('max', 'increase')} className="adjust-button">+</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Position Stats */}
      <div className="position-stats">
        <div>Width: {calculateWidth().toFixed(2)}%</div>
        <div>Estimated APR: {calculateAPR()}%</div>
      </div>
      
      {/* Automation Options */}
      <div className="form-section">
        <div className="toggle-option">
          <label className="toggle-label">
            <RefreshCw size={16} className="icon" />
            <span>Automate Rebalancing</span>
          </label>
          <input
            type="checkbox"
            checked={autoRebalance}
            onChange={() => setAutoRebalance(!autoRebalance)}
          />
        </div>
        
        <div className="toggle-option">
          <label className="toggle-label">
            <Zap size={16} className="icon" />
            <span>Automate Rewards</span>
          </label>
          <input
            type="checkbox"
            checked={autoRewards}
            onChange={() => setAutoRewards(!autoRewards)}
          />
        </div>
      </div>
      
      {/* Slippage */}
      <div className="form-section">
        <div className="slippage-header">
          <label className="form-label">Slippage (%)</label>
          <span className="help-link">What is this?</span>
        </div>
        <input
          type="text"
          value={slippage.toString().replace('.', ',')}
          onChange={(e) => setSlippage(Number(e.target.value.replace(',', '.')))}
          className="form-input"
        />
        <div className="slippage-presets">
          <button 
            type="button" 
            className={`preset-button ${slippage === 0.1 ? 'active' : ''}`}
            onClick={() => setSlippage(0.1)}
          >
            0.1%
          </button>
          <button 
            type="button" 
            className={`preset-button ${slippage === 0.5 ? 'active' : ''}`}
            onClick={() => setSlippage(0.5)}
          >
            0.5%
          </button>
          <button 
            type="button" 
            className={`preset-button ${slippage === 1 ? 'active' : ''}`}
            onClick={() => setSlippage(1)}
          >
            1%
          </button>
        </div>
      </div>
      
      {/* Deposit Button */}
      <button
        type="submit"
        className="deposit-button"
        disabled={depositLoading || tokensLoading || !amount || !minPrice || !maxPrice}
      >
        {depositLoading ? (
          'Processing...'
        ) : (
          <>
            <ArrowDown size={16} />
            Deposit
          </>
        )}
      </button>      
      {/* Error Messages */}
      {(depositError || tokensError) && (
        <div className="error-message">
          {depositError || tokensError}
        </div>
      )}
    </form>
  </div>
);
};

export default DepositForm;