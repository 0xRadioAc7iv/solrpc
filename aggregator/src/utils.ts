import { DEVNET_RPC_URLS, MAINNET_RPC_URLS } from "./config";
import { SOLANA_NETWORK_TYPE } from "./types";

export const JSON_RPC_REQUEST_BODY_SCHEMA = {
  type: "object",
  properties: {
    jsonrpc: {
      type: "string",
      const: "2.0",
    },
    id: {
      type: "number",
    },
    method: {
      type: "string",
    },
  },
  required: ["jsonrpc", "id", "method"],
};

export const setActiveRPCEndpoints = (network: SOLANA_NETWORK_TYPE) => {
  if (network === "devnet") return DEVNET_RPC_URLS;

  return MAINNET_RPC_URLS;
};
