export type SOLANA_NETWORK_TYPE = "mainnet-beta" | "devnet";

type BALANCING_METHOD_TYPE = "round-robin";
//   | "least-conn"
//   | "lowest-latency"
//   | "weighted";

export type CONFIG = {
  network: SOLANA_NETWORK_TYPE;
  balancingMethod: BALANCING_METHOD_TYPE;
};

export type ValidRequestBody = {
  id: number;
  method: string;
  params: any;
};
