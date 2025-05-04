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
}: ConfigOptions) {
  const configuredEndpoints =
    network === "devnet" ? endpoints.devnet : endpoints.mainnet;

  if (!configuredEndpoints) {
    throw new Error("No Endpoints Configured!");
  }

  const balancer = createBalancer(balancingMethod, configuredEndpoints);
  const cache = createCache(cachingMethod);

  if (transport === "http") await initHTTPServer({ balancer, cache, port });
  //   else if (transport === "ws") await initWebSocketServer();
  //   else {
  //     await initHttpServer();
  //     await initWebSocketServer();
  //   }
}
