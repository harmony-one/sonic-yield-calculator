// 📁 components/SonicYieldCalculator/DepositForm.tsx
import React, { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw, Zap } from 'lucide-react';
import { PoolData } from '../../types';
import { useDeposit } from '../../hooks/useDeposit';

interface DepositFormProps {
  pool: PoolData;
  onDeposit: (depositData: DepositData) => Promise<void>;
}

export interface DepositData {
  token: string;
  amount: string;
  minPrice: number;
  maxPrice: number;
  slippage: number;
  autoRebalance: boolean;
  autoRewards: boolean;
}

const DepositForm: React.FC<DepositFormProps> = ({ pool, onDeposit }) => {
  // Form state
  const [selectedToken, setSelectedToken] = useState<string>(pool.token0);
  const [amount, setAmount] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [autoRebalance, setAutoRebalance] = useState<boolean>(false);
  const [autoRewards, setAutoRewards] = useState<boolean>(false);
  const [displayPrice, setDisplayPrice] = useState(0)
  
  const { isLoading, error, currentPrice, currentTick, fetchPoolPrice } = useDeposit();
  
  useEffect(() => {
    fetchPoolPrice(pool.poolAddress);
  }, [pool.poolAddress]);

  // Mock balances for demo
  const balances = {
    [pool.token0]: 1.5,
    [pool.token1]: 2000,
  };
  

  // Set default price range based on current price
  useEffect(() => {
    const price = currentPrice || pool.currentPrice || 0
    setDisplayPrice(price)
    setMinPrice((price * 0.8).toFixed(2));
    setMaxPrice((price * 1.2).toFixed(2));
  }, [currentPrice, pool.currentPrice]);
  
  // Calculate price range width as percentage
  const calculateWidth = (): number => {
    if (!minPrice || !maxPrice) return 0;
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0) return 0;
    
    return (max - min) / min * 100;
  };
  
  // Mock APR calculation based on position width
  const calculateAPR = (): string => {
    const width = calculateWidth();
    if (width <= 0) return "0";
    // Simplified mock calculation
    return Math.max(0, pool.apr * (100 / width)).toFixed(0);
  };
  
  // Handle deposit submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeposit({
      token: selectedToken,
      amount,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      slippage,
      autoRebalance,
      autoRewards
    });
  };
  
  // Set max amount based on selected token
  const handleSetMax = () => {
    setAmount(balances[selectedToken].toString());
  };

  return (
    <div className="deposit-form-container">
      <h3 className="deposit-form-title">Deposit Position</h3>
      
      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="form-section">
          <label className="form-label">Token to deposit</label>
          <div className="token-selector">
            <button
              type="button"
              className={`token-button ${selectedToken === pool.token0 ? 'active' : ''}`}
              onClick={() => setSelectedToken(pool.token0)}
            >
              {pool.token0}
            </button>
            <button
              type="button"
              className={`token-button ${selectedToken === pool.token1 ? 'active' : ''}`}
              onClick={() => setSelectedToken(pool.token1)}
            >
              {pool.token1}
            </button>
          </div>
        </div>
        
        <div className="form-section">
          <label className="form-label">Amount</label>
          <div className="balance-label">Balance: {balances[selectedToken]} {selectedToken}</div>
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
        
        <div className="form-section">
          <label className="form-label">Price Range</label>
          <div className="price-inputs">
            <div className="price-input-group">
              <label className="sub-label">Min Price</label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="price-input-group">
              <label className="sub-label">Max Price</label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>
        
        <div className="current-price">{displayPrice}</div>
        
        <div className="position-stats">
          <div>Width: {calculateWidth().toFixed(2)}%</div>
          <div>Estimated APR: {calculateAPR()}%</div>
        </div>
        
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
        <button
          type="submit"
          className="deposit-button"
          disabled={isLoading || !amount || !minPrice || !maxPrice}
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <ArrowDown size={16} />
              Deposit
            </>
          )}
        </button>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default DepositForm;