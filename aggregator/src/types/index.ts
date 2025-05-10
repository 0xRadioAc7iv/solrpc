import { MemcachedCache, MemoryCache, RedisCache } from "../core/caching";
import { Balancer } from "../lib/interfaces";

export type NetworkOptions = "devnet" | "mainnet";

type CacheMemory = { type: "memory" };

type CacheRedis = { type: "redis"; url: string };

type CacheMemcached = { type: "memcached"; url: string };

export type CachingMethods = CacheMemory | CacheRedis | CacheMemcached;

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

type LoadBalancingMethods =
  | "round-robin"
  | "least-connections"
  | "least-latency"
  | "weighted";

type Cache = MemoryCache | RedisCache | MemcachedCache;

type BaseServerOptions = {
  cache: Cache;
  port?: number;
  maxRetries: number;
};

export type HttpServerOptions = BaseServerOptions & {
  balancer: Balancer;
};

export type WebsocketServerOptions = BaseServerOptions & {
  endpoints: SimpleEndpoint[];
};

export type ValidRequestBody = {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params: any;
};

export type WeightedEndpoint = { url: string; weight: number };

type SimpleEndpoint = string;

export type HttpConfig =
  | {
      method: "weighted";
      endpoints: Record<NetworkOptions, WeightedEndpoint[]>;
    }
  | {
      method: Exclude<LoadBalancingMethods, "weighted">;
      endpoints: Record<NetworkOptions, SimpleEndpoint[]>;
    };

export type WsConfig = {
  endpoints: Record<NetworkOptions, SimpleEndpoint[]>;
};

export type BalancingOptions = { http?: HttpConfig; ws?: WsConfig };

export type ConfigOptions = {
  network: NetworkOptions;
  balancingOptions: BalancingOptions;
  cachingMethod: CachingMethods;
  port?: number;
  maxRetries?: number;
};
