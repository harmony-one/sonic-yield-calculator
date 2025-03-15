// 📁 api/depositApi.ts
import { 
  createWalletClient,
  getContract,
  type Address,
  type WalletClient,
  custom,
  maxUint256,
  type Hash
} from 'viem';
import { getContractAddresses } from './helper';
import { PoolData, DepositData } from '../../types';

import NFT_MANAGER_SHADOW_ABI from '../abis/nftManagerShadowAbi';
import NFT_FARM_STRATEGY_ABI from '../abis/nftFarmStrategyAbi';
import ERC_20_ABI from '../abis/erc20Abi';
import { publicClient } from '../client';
import { sonic } from '../chains';
import { getPoolCurrentPrice, priceToTick } from './poolHelper';

const shadowContractAddresses = getContractAddresses('shadow');

// Tick boundaries for Uniswap V3-style pools
const MIN_TICK = -887272;
const MAX_TICK = 887272;

// Convert string to bytes32
const stringToBytes32 = (text: string): string => {
  // Convert string to bytes
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  
  // Create a 32-byte buffer (filled with zeros)
  const result = new Uint8Array(32);
  
  // Copy input bytes to the result (up to 32 bytes)
  const bytesToCopy = Math.min(bytes.length, 32);
  result.set(bytes.slice(0, bytesToCopy));
  
  // Convert to hex string
  return '0x' + Array.from(result)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};


// Calculate tick from price
const getTickFromPrice = (
  price: number,
  tickSpacing: number,
  token0Decimals: number,
  token1Decimals: number
): number => {
  if (price <= 0) {
    throw new Error("Invalid price: must be greater than 0");
  }
  
  // Use the helper function to convert price to tick
  const rawTick = priceToTick(price, token0Decimals, token1Decimals);
  
  // Round to nearest valid tick based on tickSpacing
  const spacedTick = Math.round(rawTick / tickSpacing) * tickSpacing;
  
  // Use buffer to avoid boundary issues
  const safeMinTick = MIN_TICK + tickSpacing;
  const safeMaxTick = MAX_TICK - tickSpacing;
  
  return Math.max(safeMinTick, Math.min(safeMaxTick, spacedTick));
};

// Check and approve token if needed
const checkAndApproveToken = async (
  tokenAddress: Address,
  spenderAddress: Address,
  amount: bigint,
  walletClient: WalletClient,
  unlimitedApproval: boolean = true
): Promise<boolean> => {
  if (!walletClient.account) {
    throw new Error('Wallet account not connected');
  }

  const tokenContract = getContract({
    address: tokenAddress,
    abi: ERC_20_ABI,
    client: publicClient,
  });
  
  const allowance = await tokenContract.read.allowance([
    walletClient.account.address as Address,
    spenderAddress
  ]) as bigint;
  
  if (allowance >= amount) {
    return true; // Already approved
  }
  
  // Need to approve
  try {
    const writeTokenContract = getContract({
      address: tokenAddress,
      abi: ERC_20_ABI,
      client: walletClient
    });
    
    // Use either unlimited approval or exact amount
    const approvalAmount = unlimitedApproval ? maxUint256 : amount;
    
    const hash = await writeTokenContract.write.approve([spenderAddress, approvalAmount]);

    // Wait for transaction confirmation
    await publicClient.waitForTransactionReceipt({ hash });
    
    return true;
  } catch (error) {
    console.error('Error approving token:', error);
    throw new Error(`Failed to approve ${tokenAddress}: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Calculate amount with slippage
const calculateAmountWithSlippage = (amount: string, slippage: number, decimals: number): bigint => {
  const amountFloat = parseFloat(amount);
  const slippageMultiplier = 1 - (slippage / 100);
  const amountWithSlippage = amountFloat * slippageMultiplier;
  
  // Convert to correct decimals and return as bigint
  return BigInt(Math.floor(amountWithSlippage * (10 ** decimals)));
};

// Extract NFT ID from transaction receipt
const extractNftIdFromLogs = async (txHash: Hash): Promise<number | null> => {
  try {
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    
    // The first topic (index 0) would be the event signature
    // The second topic (index 1) in many NFT mint events is the token ID (encoded as uint256)
    for (const log of receipt.logs) {
      // Looking for events with at least 2 topics, where the second might be the token ID
      if (log.topics.length >= 2) {
        try {
          // Try to parse the second topic as a uint256
          
          const tokenIdHex = log.topics[1];
          if (tokenIdHex) {
            // Remove 0x prefix and convert from hex to decimal
            const tokenId = parseInt(tokenIdHex.slice(2), 16);
            return tokenId;
          }
        } catch (e) {
          // If parsing fails, continue to the next log
          continue;
        }
      }
    }
    
    // If no token ID could be found in the logs
    return null;
  } catch (error) {
    console.error('Error extracting NFT ID from logs:', error);
    return null;
  }
};

// Main deposit function
export const depositToPool = async (
  pool: PoolData,
  depositData: DepositData,
  walletAccount: `0x${string}`,
  unlimitedApproval: boolean = true
): Promise<{ success: boolean; txHash?: string; error?: string; nftId?: number }> => {
  // Only proceed if wallet is connected
  if (!walletAccount) {
    return { success: false, error: 'Wallet not connected' };
  }
  
  // Create wallet client (assuming ethereum object exists in window)
  // @ts-ignore
  const walletClient = createWalletClient({
    chain: sonic,
    transport: custom(window.ethereum),
    account: walletAccount as Address
  });
  
  try {
    const poolInfo = await getPoolCurrentPrice(pool.poolAddress);
  
    if (!poolInfo.currentPrice || 
        poolInfo.token0Decimals === undefined || 
        poolInfo.token1Decimals === undefined) {
      throw new Error("Failed to get pool information required for price calculation");
    }
    
    // Ensure min price is less than max price
    if (depositData.minPrice >= depositData.maxPrice) {
      throw new Error("Min price must be less than max price");
    }
    
    // 2. Calculate ticks from prices with proper decimal handling
    const minTick = getTickFromPrice(
      depositData.minPrice, 
      pool.tickSpacing, 
      poolInfo.token0Decimals, 
      poolInfo.token1Decimals
    );
    
    const maxTick = getTickFromPrice(
      depositData.maxPrice, 
      pool.tickSpacing, 
      poolInfo.token0Decimals, 
      poolInfo.token1Decimals
    );
    
    // Ensure ticks are properly ordered and spaced
    if (minTick >= maxTick) {
      throw new Error("Invalid tick range: minimum tick must be less than maximum tick");
    }
    
    if (maxTick - minTick < pool.tickSpacing) {
      throw new Error(`Tick range too narrow: must be at least ${pool.tickSpacing} ticks wide`);
    }
    
    
    // 3. Get token information
    const selectedTokenAddress = depositData.token === pool.token0 
      ? pool.token0Address as Address
      : pool.token1Address as Address;
    
    const tokenContract = getContract({
      address: selectedTokenAddress,
      abi: ERC_20_ABI,
      client: publicClient,
    });
    
    const decimals = await tokenContract.read.decimals() as number;
    
    // 4. Convert amount to bigint with proper decimals
    const amountInWei = BigInt(Math.floor(parseFloat(depositData.amount) * (10 ** decimals)));
    
    // 5. Calculate min amounts with slippage
    const minAmountWithSlippage = calculateAmountWithSlippage(
      depositData.amount, 
      depositData.slippage,
      decimals
    );
    
    // 6. First, approve the NFT Manager to spend tokens
    await checkAndApproveToken(
      selectedTokenAddress,
      shadowContractAddresses.NFT_TOKEN_ADDRESS as Address,
      amountInWei,
      walletClient,
      unlimitedApproval
    );
    
    // 7. Create NFT position
    const nftManager = getContract({
      address: shadowContractAddresses.NFT_TOKEN_ADDRESS as Address,
      abi: NFT_MANAGER_SHADOW_ABI,
      client: walletClient
    });
    
    // Prepare mint parameters
    const mintParams = {
      token0: pool.token0Address as Address,
      token1: pool.token1Address as Address, 
      tickSpacing: pool.tickSpacing,
      tickLower: minTick,
      tickUpper: maxTick,
      amount0Desired: depositData.token === pool.token0 ? amountInWei : 0n,
      amount1Desired: depositData.token === pool.token1 ? amountInWei : 0n,
      amount0Min: depositData.token === pool.token0 ? minAmountWithSlippage : 0n,
      amount1Min: depositData.token === pool.token1 ? minAmountWithSlippage : 0n,
      recipient: walletAccount as Address,
      deadline: BigInt(Math.floor(Date.now() / 1000) + 3600) // 1 hour
    };
    
    // Estimate gas for mint operation (handle with try/catch as it may fail)
    let gasLimit: bigint;
    try {
      // @ts-ignore - handle potential typing issues with estimateGas
      const mintGasEstimate = await nftManager.estimateGas.mint([mintParams], {
        account: walletAccount as Address
      });
      // Add 20% buffer to gas estimate
      gasLimit = (mintGasEstimate * 120n) / 100n;
    } catch (error) {
      console.warn('Failed to estimate gas, using default:', error);
      gasLimit = 500000n; // Default gas limit as fallback
    }
    
    // Mint the NFT position
    const mintTx = await nftManager.write.mint([mintParams], {
      gasLimit
    });
    
    // Wait for transaction confirmation and extract NFT ID from logs
    const nftId = await extractNftIdFromLogs(mintTx);
    
    if (!nftId) {
      throw new Error('Failed to extract NFT ID from transaction logs');
    }
    
    // 8. Approve the NFT Farm Strategy to handle the NFT
    await nftManager.write.approve([
      shadowContractAddresses.NFT_FARM_STRATEGY_ADDRESS as Address, 
      BigInt(nftId)
    ]);
    
    // 9. Prepare position data for staking
    const position = {
      farm: {
        stakingContract: pool.gaugeAddress,
        poolIndex: 0,
      },
      nft: shadowContractAddresses.NFT_TOKEN_ADDRESS,
      tokenId: nftId,
    };
    
    // 10. Prepare settings for auto-strategies
    const settings = {
      pool: pool.poolAddress,
      autoRebalance: depositData.autoRebalance,
      rebalanceConfig: {
        tickSpacesBelow: 10,
        tickSpacesAbove: 10,
        bufferTicksBelow: 2,
        bufferTicksAbove: 2,
        dustBP: 100, // 1%
        priceImpactBP: 50, // 0.5%
        slippageBP: Math.floor(depositData.slippage * 100), // Convert to basis points
        cutoffTickLow: minTick - 5000,
        cutoffTickHigh: maxTick + 5000,
        delayMin: 60, // 1 hour
        rewardConfig: {
          rewardBehavior: 0, // compound
          harvestTokenOut: shadowContractAddresses.REWARD_TOKEN,
        },
      },
      automateRewards: depositData.autoRewards,
      rewardConfig: {
        rewardBehavior: 0, // compound
        harvestTokenOut: shadowContractAddresses.REWARD_TOKEN,
      },
      autoExit: false,
      exitConfig: {
        triggerTickLow: minTick - 10000,
        triggerTickHigh: maxTick + 10000,
        exitTokenOutLow: pool.token0Address,
        exitTokenOutHigh: pool.token1Address,
        priceImpactBP: 50, // 0.5%
        slippageBP: Math.floor(depositData.slippage * 100), // Convert to basis points
      },
    };
    
    // 11. Create an instance of the NFT Farm Strategy contract
    const farmStrategy = getContract({
      address: shadowContractAddresses.NFT_FARM_STRATEGY_ADDRESS as Address,
      abi: NFT_FARM_STRATEGY_ABI,
      client: walletClient
    });
    
    // Generate referral code
    const referralCode = stringToBytes32("");
    
    // Estimate gas for stake operation
    let stakeGasLimit: bigint;
    try {
      // @ts-ignore - handle potential typing issues with estimateGas
      const stakeGasEstimate = await farmStrategy.estimateGas.simpleDeposit([
        position,
        "0x", // extraData - empty bytes
        settings,
        walletAccount as Address, // approved
        referralCode
      ], {
        account: walletAccount as Address
      });
      // Add 20% buffer to gas estimate
      stakeGasLimit = (stakeGasEstimate * 120n) / 100n;
    } catch (error) {
      console.warn('Failed to estimate gas for staking, using default:', error);
      stakeGasLimit = 800000n; // Default gas limit as fallback
    }
    
    // 12. Call simpleDeposit to stake the NFT
    const stakeTx = await farmStrategy.write.simpleDeposit([
      position,
      "0x", // extraData - empty bytes
      settings,
      walletAccount as Address, // approved
      referralCode
    ], {
      gasLimit: stakeGasLimit
    });
    
    await publicClient.waitForTransactionReceipt({ hash: stakeTx });
    
    return {
      success: true,
      txHash: stakeTx,
      nftId: nftId
    };
    
  } catch (error) {
    console.error('Error depositing to pool:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Get token balance
export const getTokenBalance = async (
  tokenAddress: string,
  walletAddress: string
): Promise<string> => {
  try {
    const tokenContract = getContract({
      address: tokenAddress as Address,
      abi: ERC_20_ABI,
      client: publicClient,
    });
    
    const [balance, decimals] = await Promise.all([
      tokenContract.read.balanceOf([walletAddress as Address]),
      tokenContract.read.decimals()
    ]);
    // Convert to human-readable format
    return (Number(balance) / (10 ** (decimals as number))).toString();
  } catch (error) {
    console.error('Error getting token balance:', error);
    return '0';
  }
};

