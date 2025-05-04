import { MemoryCache, RedisCache } from "../src/core/caching";
import { Balancer } from "../src/lib/interfaces";

type TransportOptions = "http" | "ws" | "both";

type NetworkOptions = "devnet" | "mainnet-beta";

type CacheMemory = { type: "memory" };

type CacheRedis = { type: "redis"; url: string };

export type CachingMethods = CacheMemory | CacheRedis;

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

export type Cache = MemoryCache | RedisCache;

export type ServerOptions = {
  balancer: Balancer;
  cache: Cache;
  port: number | undefined;
};

export type ValidRequestBody = {
  jsonrpc: "2.0";
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
  port?: number;
};
