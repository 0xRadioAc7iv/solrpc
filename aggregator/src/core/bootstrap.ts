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

  const cache = createCache(cachingMethod);

  if (http) {
    const balancer = createBalancer(http, network);
    await initHTTPServer({ balancer, cache, port, maxRetries });
    console.log(`HTTP Server listening at: http://localhost:${port}`);
  }

  if (ws) {
    await initWebsocketServer({
      cache,
      port,
      maxRetries,
      endpoints:
        network === "devnet" ? ws.endpoints.devnet : ws.endpoints.mainnet,
    });
    console.log(`Websocket Server listening at: ws://localhost:${port}`);
  }
}
