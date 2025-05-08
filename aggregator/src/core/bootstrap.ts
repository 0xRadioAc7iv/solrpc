import { ConfigOptions } from "../../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";

export async function startHTTPServer({
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const balancer = createBalancer(balancingOptions, network);
  const cache = createCache(cachingMethod);

  await initHTTPServer({ balancer, cache, port, maxRetries });
}

export async function startWebsocketServer({
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const balancer = createBalancer(balancingOptions, network);
  const cache = createCache(cachingMethod);

  // await initWebSocketServer({ balancer, cache, port, maxRetries });
}
