import { ConfigOptions } from "../types";
import { initHTTPServer } from "../transport/http";
import { createBalancers } from "./balancing";
import { createCache } from "./caching";

export async function bootstrapServer({
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const cache = createCache(cachingMethod);
  const { httpBalancer, wsBalancer } = createBalancers(
    balancingOptions,
    network
  );

  if (httpBalancer) {
    await initHTTPServer({ balancer: httpBalancer, cache, port, maxRetries });
  }

  // if (ws) {
  //   await initWebsocketServer({ balancer: wsBalancer, cache, port, maxRetries });
  // }
}
