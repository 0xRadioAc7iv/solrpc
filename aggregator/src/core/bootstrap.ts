import { ConfigOptions } from "../../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";

export async function bootstrapServer({
  transport,
  network,
  balancingMethod,
  endpoints,
  cachingMethod,
  port,
  maxRetries = 3,
}: ConfigOptions) {
  const configuredEndpoints =
    network === "devnet" ? endpoints.devnet : endpoints.mainnet;

  if (!configuredEndpoints) {
    throw new Error("No Endpoints Configured!");
  }

  const balancer = createBalancer(balancingMethod, configuredEndpoints);
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
