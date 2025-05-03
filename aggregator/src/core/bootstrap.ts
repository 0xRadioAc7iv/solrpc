import { ConfigOptions } from "../../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";

export async function bootstrapServer({
  transport,
  network,
  balancingMethod,
  endpoints,
}: ConfigOptions) {
  const configuredEndpoints =
    network === "devnet" ? endpoints.devnet : endpoints.mainnet;

  if (!configuredEndpoints) {
    throw new Error("No Endpoints Configured!");
  }

  const balancer = createBalancer(balancingMethod, configuredEndpoints);

  if (transport === "http") await initHTTPServer({ balancer });
  //   else if (transport === "ws") await initWebSocketServer();
  //   else {
  //     await initHttpServer();
  //     await initWebSocketServer();
  //   }
}
