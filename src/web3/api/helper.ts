import { getContract } from "viem";
import config from "../../config";
import { Protocol } from "../../types";
import FLOW_VOTER_ABI from "../abis/flowVoterAbi";
import { publicClient } from "../client";
import V2_FACTORY_ABI from "../abis/v2FactoryAby";
import CL_TOKEN_ABI from "../abis/clTokenAbi";
import FLOW_GAUGE_ABI from "../abis/flowGaugeAbi";
import ERC20_ABI from "../abis/erc20Abi"
import CL_GAUGE_ABI from "../abis/clGaugeAbi";
import V2_TOKEN_ABI from "../abis/v2TokenAbi";

export const getContractAddresses = (protocol: Protocol) => {
    return protocol === 'equalizer' 
      ? {
        FLOW_VOTER_ADDR: config.equalizer.FLOW_VOTER_ADDR,
        V2_FACTORY_ADDRESS: config.equalizer.V2_FACTORY_ADDRESS,
        REWARD_TOKEN: config.equalizer.REWARD_TOKEN
      }
      : {
        FLOW_VOTER_ADDR: config.shadow.FLOW_VOTER_ADDR,
        V2_FACTORY_ADDRESS: config.shadow.V2_FACTORY_ADDRESS,
        CL_FACTORY_ADDRESS: config.shadow.CL_FACTORY_ADDRESS,
        REWARD_TOKEN: config.shadow.REWARD_TOKEN, 
        REWARD_TOKEN_2: config.shadow.REWARD_TOKEN_2
      };
  };

export const getFlowVoterContract = (protocol: Protocol) => {
  const addresses = getContractAddresses(protocol);
  
  return getContract({
    address: addresses.FLOW_VOTER_ADDR as `0x${string}`,
    abi: FLOW_VOTER_ABI,
    client: publicClient,
  });
};

export const getV2FactoryContract = (protocol: Protocol) => {
  const addresses = getContractAddresses(protocol);
  
  return getContract({
    address: addresses.V2_FACTORY_ADDRESS as `0x${string}`,
    abi: V2_FACTORY_ABI,
    client: publicClient,
  });
};

export const getCLGaugeContract = (gaugeAddress: string) => {
  return getContract({
    address: gaugeAddress as `0x${string}`,
    abi: CL_GAUGE_ABI,
    client: publicClient,
  });
};

export const getFlowGaugeContract = (gaugeAddress: string) => {
  return getContract({
    address: gaugeAddress as `0x${string}`,
    abi: FLOW_GAUGE_ABI,
    client: publicClient,
  });
};

export const getTokenContract = (tokenAddress: string) => {
  return getContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    client: publicClient,
  });
};

export const getPoolContract = (poolAddress: string) => {
  return getContract({
    address: poolAddress as `0x${string}`,
    abi: CL_TOKEN_ABI,
    client: publicClient,
  });
};

export const getV2PoolContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: V2_TOKEN_ABI, // Use V2 pool ABI from sonic_shadow.js
    client: publicClient
  });
};

export const getCLPoolContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: CL_TOKEN_ABI, // Use CL pool ABI from sonic_shadow.js
    client: publicClient
  });
};
