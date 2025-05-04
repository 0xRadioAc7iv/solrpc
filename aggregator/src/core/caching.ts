import crypto from "crypto";
import { CacheEntry, CachingMethods } from "../../types";
import Redis from "ioredis";

export function createCache(cacheMethod: CachingMethods) {
  if (cacheMethod.type === "memory") return new MemoryCache();
  else return new RedisCache(cacheMethod.url);
}

export class MemoryCache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map();
  }

  private generateKey(method: string, params: string): string {
    const rawKey = `${method}:${params}`;
    return crypto.createHash("sha256").update(rawKey).digest("hex");
  }

  get(method: string, params: string): string | undefined {
    const key = this.generateKey(method, params);
    const entry = this.cache.get(key);

    if (!entry) return undefined;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(method: string, params: string, response: string, ttlMs: number): void {
    const key = this.generateKey(method, params);
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { value: response, expiresAt });
  }
}

export class RedisCache {
  private redis: Redis;

  constructor(url: string) {
    this.redis = new Redis(url);
  }

  private generateKey(method: string, params: string): string {
    const rawKey = `${method}:${params}`;
    return crypto.createHash("sha256").update(rawKey).digest("hex");
  }

  async get(method: string, params: string): Promise<string | undefined> {
    const key = this.generateKey(method, params);
    const value = await this.redis.get(key);
    return value ?? undefined;
  }

  async set(
    method: string,
    params: string,
    response: string,
    ttlMs: number
  ): Promise<void> {
    const key = this.generateKey(method, params);
    await this.redis.set(key, response, "PX", ttlMs);
  }
}
