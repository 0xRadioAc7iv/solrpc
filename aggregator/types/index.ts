import { MemoryCache } from "../src/core/caching";
import { Balancer } from "../src/lib/interfaces";

type TransportOptions = "http" | "ws" | "both";

type NetworkOptions = "devnet" | "mainnet-beta";

export type CachingMethods = "memory";

export type CacheEntry = {
  value: string;
  expiresAt: number;
};

export type CachePolicy =
  | {
      cacheable: true;
      ttlMs: number;
      finalizedOnly?: boolean;
    }
  | {
      cacheable: false;
    };

export type LoadBalancingOptions = "round-robin" | "least-connections";

export type ServerOptions = {
  balancer: Balancer;
  cache: MemoryCache;
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
  cachingMethod: CachingMethods;
};
