import { BALANCING_METHOD_TYPE, SOLANA_NETWORK_TYPE } from "./types";

export const BALANCING_METHODS: BALANCING_METHOD_TYPE = "round-robin";

export const ACTIVE_NETWORK: SOLANA_NETWORK_TYPE = "devnet";

export const DEVNET_RPC_URLS = ["https://api.devnet.solana.com"] as const;

export const MAINNET_RPC_URLS = [
  "https://api.mainnet-beta.solana.com",
] as const;
