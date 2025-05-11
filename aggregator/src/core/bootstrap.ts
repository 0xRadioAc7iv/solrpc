import { ConfigOptions } from "../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";
import { initWebsocketServer } from "../transport/websocket";

export async function bootstrapServer({
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const { http, ws } = balancingOptions;

  if (!http && !ws) {
    throw new Error("At least one of 'http' or 'ws' must be configured!");
  }

  if (http) {
    await initHTTPServer({
      balancer: createBalancer(http, network),
      cache: createCache(cachingMethod),
      port,
      maxRetries,
    });
  }

  if (ws) {
    await initWebsocketServer({
      port,
      endpoints:
        network === "devnet" ? ws.endpoints.devnet : ws.endpoints.mainnet,
    });
  }
}
