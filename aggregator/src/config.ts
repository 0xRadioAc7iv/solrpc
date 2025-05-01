import { CONFIG } from "./types";

export const DEVNET_RPC_URLS = ["https://api.devnet.solana.com"] as const;

export const MAINNET_RPC_URLS = [
  "https://api.mainnet-beta.solana.com",
] as const;

export const config: CONFIG = {
  network: "devnet",
  balancingMethod: "round-robin",
};
