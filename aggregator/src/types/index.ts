import { MemcachedCache, MemoryCache, RedisCache } from "../core/caching";
import { StatEngine } from "../core/stats";
import { Balancer } from "../lib/interfaces";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HTTP_METHODS = [
  "getBlock",
  "getTransaction",
  "getEpochSchedule",
  "getGenesisHash",
  "getVersion",
  "getMinimumBalanceForRentExemption",
  "getStakeMinimumDelegation",
  "minimumLedgerSlot",
  "getIdentity",
  "getInflationGovernor",
  "getLargestAccounts",
  "getInflationRate",
  "getVoteAccounts",
  "getRecentPerformanceSamples",
  "getRecentPrioritizationFees",
  "getSupply",
  "getAccountInfo",
  "getMultipleAccounts",
  "getBalance",
  "getProgramAccounts",
  "getTokenAccountsByOwner",
  "getTokenAccountBalance",
  "getSlot",
  "getSlotLeader",
  "getSlotLeaders",
  "getBlockCommitment",
  "getBlockProduction",
  "getEpochInfo",
  "getLeaderSchedule",
  "getBlocks",
  "getBlocksWithLimit",
  "getBlockTime",
  "getClusterNodes",
  "getFirstAvailableBlock",
  "getInflationReward",
  "getMaxRetransmitSlot",
  "getMaxShredInsertSlot",
  "getTokenLargestAccounts",
  "getTokenSupply",
  "getTransactionCount",
  "getSignaturesForAddress",
  "getTokenAccountsByDelegate",
  "isBlockhashValid",
  "getBlockHeight",
  "getHighestSnapshotSlot",
  "sendTransaction",
  "simulateTransaction",
  "requestAirdrop",
  "getLatestBlockhash",
  "getFeeForMessage",
  "getSignatureStatuses",
  "getHealth",
] as const;

export type HttpMethods = (typeof HTTP_METHODS)[number];

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
  maxRetries: number;
  balancer: Balancer;
  engine: StatEngine;
};

export type ValidRequestBody = {
  jsonrpc: "2.0";
  id: number;
  method: HttpMethods;
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

export type BalancingOptions = { http: HttpConfig };

export type ConfigOptions = {
  network: NetworkOptions;
  balancingOptions: BalancingOptions;
  cachingMethod: CachingMethods;
  maxRetries?: number;
};

type LogEntryInfo = {
  type: "info";
  timestamp: number;
  entry: string;
};

type LogEntryErrorRpcUnhealthy = {
  type: "rpc-unhealthy";
  endpoint: string;
};

type LogEntryErrorRpcRetry = {
  type: "rpc-retry-error";
  attemptNumber: number;
  endpoint: string;
  message: string;
};

type LogEntryErrorRpcFailure = {
  type: "rpc-multiple-attempt-failure";
  requestId: number;
  method: string;
  error?: string;
};

type LogEntryErrorRpcUnhandled = {
  type: "rpc-unhandled";
  requestId: number;
  method: string;
  err: any;
};

type LogEntryError = {
  type: "error";
  timestamp: number;
  entry:
    | LogEntryErrorRpcRetry
    | LogEntryErrorRpcFailure
    | LogEntryErrorRpcUnhandled
    | LogEntryErrorRpcUnhealthy;
};

type LogEntryDebugEntryIncomingRequest = {
  type: "incoming-request";
  requestId: number;
  ip: string;
  method: string;
};

type LogEntryDebugEntryForwardRequest = {
  type: "rpc-forward";
  attemptNumber: number;
  endpoint: string;
  method: string;
  status: "success" | "error";
};

type LogEntryDebugEntryCacheHit = {
  type: "cache-hit";
  requestId: number;
  method: string;
};

type LogEntryDebugEntryCacheMiss = {
  type: "cache-miss";
  requestId: number;
  method: string;
};

type LogEntryDebugRequestSuccessfull = {
  type: "request-success";
  requestId: number;
  method: string;
};

type LogEntryDebug = {
  type: "debug";
  timestamp: number;
  entry:
    | LogEntryDebugEntryIncomingRequest
    | LogEntryDebugEntryForwardRequest
    | LogEntryDebugEntryCacheHit
    | LogEntryDebugEntryCacheMiss
    | LogEntryDebugRequestSuccessfull;
};

export type LogEntry = LogEntryInfo | LogEntryError | LogEntryDebug;

export type StatRequestData = {
  requestId: number;
  timestamp: number;
};

export type StatResponseLatency = {
  latency: number;
  timestamp: number;
  cachedResponse: boolean;
  success: boolean;
};

export type StatEndpointsData = {
  network: NetworkOptions;
  latency: number;
  weight?: number;
  isActive: boolean;
};
