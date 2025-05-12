import { ConfigOptions } from "../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";
import { FastifyInstance } from "fastify";

export class Server {
  private httpServer: FastifyInstance;

  private constructor(httpServer: FastifyInstance) {
    this.httpServer = httpServer;
  }

  static async init(config: ConfigOptions): Promise<Server> {
    const httpServer = await Server.bootstrapServer(config);
    return new Server(httpServer);
  }

  private static async bootstrapServer({
    network,
    balancingOptions,
    cachingMethod,
    maxRetries = 3,
  }: ConfigOptions): Promise<FastifyInstance> {
    const { http } = balancingOptions;

    if (!http) {
      throw new Error("http  must be configured!");
    }

    return await initHTTPServer({
      balancer: createBalancer(http, network),
      cache: createCache(cachingMethod),
      maxRetries,
    });
  }

  async restart(config: ConfigOptions): Promise<void> {
    await this.httpServer.close();
    console.log("Server gracefully shut down.");

    this.httpServer = await Server.bootstrapServer(config);
    console.log("Server restarted with updated configuration.");
  }

  async close(): Promise<void> {
    await this.httpServer.close();
  }

  get instance(): FastifyInstance {
    return this.httpServer;
  }
}
