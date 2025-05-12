import { ConfigOptions } from "../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";

export async function bootstrapServer({
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const { http } = balancingOptions;

  if (!http) {
    throw new Error("http  must be configured!");
  }

  await initHTTPServer({
    balancer: createBalancer(http, network),
    cache: createCache(cachingMethod),
    port,
    maxRetries,
  });
}
