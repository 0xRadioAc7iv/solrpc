import { ConfigOptions, WeightedEndpointArray } from "../../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";

export async function bootstrapServer({
  transport,
  network,
  balancingOptions,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const balancer = createBalancer(balancingOptions, network);
  const cache = createCache(cachingMethod);

  if (transport === "http") {
    await initHTTPServer({ balancer, cache, port, maxRetries });
  }
  //   else if (transport === "ws") await initWebSocketServer();
  //   else {
  //     await initHttpServer();
  //     await initWebSocketServer();
  //   }
}
