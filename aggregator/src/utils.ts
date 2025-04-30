import { DEVNET_RPC_URLS, MAINNET_RPC_URLS } from "./config";
import { SOLANA_NETWORK_TYPE } from "./types";

export const setActiveRPCEndpoints = (network: SOLANA_NETWORK_TYPE) => {
  if (network === "devnet") return DEVNET_RPC_URLS;

  return MAINNET_RPC_URLS;
};
