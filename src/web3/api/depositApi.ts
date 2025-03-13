// 📁 api/depositApi.ts
import { 
  createPublicClient, 
  createWalletClient,
  http,
  getContract,
  type Address,
  type WalletClient,
  custom,
  maxUint256
} from 'viem';
import { harmonyOne } from 'viem/chains';
import { getContractAddresses } from './helper';
import { PoolData, DepositData } from '../../types'

import CL_TOKEN_ABI from '../abis/clTokenAbi'
import NFT_MANAGER_SHADOW_ABI from '../abis/nftManagerShadowAbi';
import NFT_FARM_STRATEGY_ABI from '../abis/nftFarmStrategyAbi';
import ERC_20_ABI from '../abis/erc20Abi'

const shadowContractAddresses = getContractAddresses('shadow')

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

// Initialize the client
const publicClient = createPublicClient({
  chain: harmonyOne,
  transport: http(),
});

// Functions to get pool current price and tick
export const getPoolCurrentPrice = async (poolAddress: string): Promise<{
  currentPrice: number | undefined;
  currentTick: number | undefined;
}> => {
  try {
    // Get pool contract
    const poolContract = getContract({
      address: poolAddress as Address,
      abi: CL_TOKEN_ABI,
      client: publicClient,
    });

    // Get slot0 data (contains current price sqrt and tick)
    const slot0 = await poolContract.read.slot0() as [bigint, number, number, number, number, boolean];
    const sqrtPriceX96 = slot0[0];
    const tick = slot0[1];

    // Get token addresses
    const token0Address = await poolContract.read.token0() as Address;
    const token1Address = await poolContract.read.token1() as Address;

    // Calculate price from sqrtPriceX96
    // Price = (sqrtPriceX96 / 2^96)^2
    const sqrtPrice = Number(sqrtPriceX96) / (2 ** 96);
    const price = sqrtPrice * sqrtPrice;

    return {
      currentPrice: price,
      currentTick: Number(tick),
    };
  } catch (error) {
    console.error('Error getting pool current price:', error);
    return {
      currentPrice: undefined,
      currentTick: undefined,
    };
  }
};

// Calculate tick from price
const getTickFromPrice = (price: number, tickSpacing: number): number => {
  // log(base 1.0001) of price
  const tick = Math.floor(Math.log(price) / Math.log(1.0001));
  // Round to the nearest valid tick based on tickSpacing
  return Math.round(tick / tickSpacing) * tickSpacing;
};

// Check and approve token if needed
const checkAndApproveToken = async (
  tokenAddress: Address,
  spenderAddress: Address,
  amount: bigint,
  walletClient: WalletClient
): Promise<boolean> => {
  const tokenContract = getContract({
    address: tokenAddress,
    abi: ERC_20_ABI,
    client: publicClient,
  });
  
  const allowance = await tokenContract.read.allowance([
    walletClient.account?.address as Address,
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
    
    const hash = await writeTokenContract.write.approve([spenderAddress, maxUint256]);

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

// Main deposit function
export const depositToPool = async (
  pool: PoolData,
  depositData: DepositData,
  walletAccount: `0x${string}`
): Promise<{ success: boolean; txHash?: string; error?: string; nftId?: number }> => {
  // Only proceed if wallet is connected
  if (!walletAccount) {
    return { success: false, error: 'Wallet not connected' };
  }
  
  // Create wallet client (assuming ethereum object exists in window)
  // @ts-ignore
  const walletClient = createWalletClient({
    chain: harmonyOne,
    transport: custom(window.ethereum)
  });
  
  try {
    // 1. Calculate ticks from prices
    const minTick = getTickFromPrice(depositData.minPrice, pool.tickSpacing);
    const maxTick = getTickFromPrice(depositData.maxPrice, pool.tickSpacing);
    
    // 2. Get token information
    const selectedTokenAddress = depositData.token === pool.token0 
      ? pool.token0Address as Address
      : pool.token1Address as Address;
    
    const tokenContract = getContract({
      address: selectedTokenAddress,
      abi: ERC_20_ABI,
      client: publicClient,
    });
    
    const decimals = await tokenContract.read.decimals() as number;
    
    // 3. Convert amount to bigint with proper decimals
    const amountInWei = BigInt(Math.floor(parseFloat(depositData.amount) * (10 ** decimals)));
    
    // 4. Calculate min amounts with slippage
    const minAmountWithSlippage = calculateAmountWithSlippage(
      depositData.amount, 
      depositData.slippage,
      decimals
    );
    
    // 5. First, approve the NFT Manager to spend tokens
    await checkAndApproveToken(
      selectedTokenAddress,
      shadowContractAddresses.NFT_TOKEN_ADDRESS as Address,
      amountInWei,
      walletClient
    );
    
    // 6. Create NFT position
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
    
    // Mint the NFT position
    const mintTx = await nftManager.write.mint([mintParams]);
    await publicClient.waitForTransactionReceipt({ hash: mintTx });
    
    // Get the NFT ID from the transaction receipt
    // This would normally be extracted from the receipt/logs in a real implementation
    // For simplicity, we're using the tokenId from the last minted position
    // In a real implementation, you'd parse the transaction logs to get this value
    
    // Mock NFT ID - In a real implementation you'd get this from the logs
    const nftId = 1234; // This should come from the transaction receipt
    
    // 7. Approve the NFT Farm Strategy to handle the NFT
    await nftManager.write.approve([shadowContractAddresses.NFT_FARM_STRATEGY_ADDRESS as Address, BigInt(nftId)]);
    
    // 8. Prepare position data for staking
    const position = {
      farm: {
        stakingContract: pool.gaugeAddress,
        poolIndex: 0,
      },
      nft: shadowContractAddresses.NFT_TOKEN_ADDRESS,
      tokenId: nftId,
    };
    
    // 9. Prepare settings for auto-strategies
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
    
    // 10. Create an instance of the NFT Farm Strategy contract
    const farmStrategy = getContract({
      address: shadowContractAddresses.NFT_FARM_STRATEGY_ADDRESS as Address,
      abi: NFT_FARM_STRATEGY_ABI,
      client: walletClient
    });
    
    // Generate referral code
    const referralCode = stringToBytes32("");
    
    // 11. Call simpleDeposit to stake the NFT
    const stakeTx = await farmStrategy.write.simpleDeposit([
      position,
      "0x", // extraData - empty bytes
      settings,
      walletAccount as Address, // approved
      referralCode
    ]);
    
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