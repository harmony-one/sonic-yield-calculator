import { sonic } from './chains'
import { http, createConfig } from 'wagmi'
import { getDefaultConfig } from "connectkit";
import { Chain } from 'viem';
import config from '../config';

export const metadata = {
  name: 'Sonic Yield Calculator',
  description: 'Sonic Yield Calculator',
  url: window.location.origin,
  icons: [`${window.location.origin}/logo192.png`]
}

const chains: readonly [Chain, ...Chain[]]= [sonic]

export const SUPPORTED_CHAINS = {
  DEFAULT: sonic.id,
  CHAINS: chains
}


export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: chains,
    transports: {
      [sonic.id]: http()
    },
    walletConnectProjectId: config.WALLET_CONNECT,
    appName: metadata.name,
    appDescription: metadata.description,
    appUrl: metadata.url,
    appIcon: metadata.icons[0]
  })
)
