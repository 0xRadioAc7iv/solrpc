import crypto from "crypto";
import { CacheEntry, CachingMethods } from "../../types";
import { Cache } from "../lib/interfaces";

export function createCache(cacheMethod: CachingMethods) {
  //   if (cacheMethod === "memory") return new MemoryCache();
  return new MemoryCache();
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
