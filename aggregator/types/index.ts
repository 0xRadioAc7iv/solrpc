import { Balancer } from "../src/lib/interfaces";

type TransportOptions = "http" | "ws" | "both";

type NetworkOptions = "devnet" | "mainnet-beta";

export type LoadBalancingOptions = "round-robin" | "least-connections";

export type ServerOptions = {
  balancer: Balancer;
};

export type ValidRequestBody = {
  id: number;
  method: string;
  params: any;
};

export type ConfigOptions = {
  transport: TransportOptions;
  network: NetworkOptions;
  balancingMethod: LoadBalancingOptions;
  endpoints: {
    devnet: string[];
    mainnet: string[];
  };
};
