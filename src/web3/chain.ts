// src/config/chains.ts
import { defineChain } from 'viem';

export const sonic = defineChain({
  id: 146,
  name: 'Sonic',
  network: 'sonic',
  nativeCurrency: {
    decimals: 18,
    name: 'SONIC',
    symbol: 'SONIC'
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sonic.io'],
      webSocket: ['wss://ws.sonic.io'],
    },
    public: {
      http: ['https://rpc.sonic.io'],
      webSocket: ['wss://ws.sonic.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.sonic.io' },
  },
});

export const chainId = sonic.id;