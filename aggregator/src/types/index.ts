import { MemcachedCache, MemoryCache, RedisCache } from "../core/caching";
import { Balancer } from "../lib/interfaces";

export const WebsocketMethods = [
  "accountSubscribe",
  "accountUnsubscribe",
  "blockSubscribe",
  "blockUnsubscribe",
  "logsSubscribe",
  "logsUnsubscribe",
  "programSubscribe",
  "programUnsubscribe",
  "rootSubscribe",
  "rootUnsubscribe",
  "signatureSubscribe",
  "signatureUnsubscribe",
  "slotSubscribe",
  "slotsUpdatesSubscribe",
  "slotsUpdatesUnsubscribe",
  "slotUnsubscribe",
  "voteSubscribe",
  "voteUnsubscribe",
] as const;

export type ValidWsMethod = (typeof WebsocketMethods)[number];

export type Success<T> = {
  data: T;
  error: null;
};

export type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

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

export type HttpServerOptions = {
  cache: Cache;
  port?: number;
  maxRetries: number;
  balancer: Balancer;
};

export type WebsocketServerOptions = {
  port?: number;
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
