import { ConfigOptions } from "../types";
import { initHTTPServer } from "../transport/http";
import { createBalancer } from "./balancing";
import { createCache } from "./caching";
import { FastifyInstance } from "fastify";
import { StatEngine } from "./stats";

export class Server {
  private httpServer: FastifyInstance;
  private engine: StatEngine;

  private constructor(httpServer: FastifyInstance, engine: StatEngine) {
    this.httpServer = httpServer;
    this.engine = engine;
  }

  static async init(
    config: ConfigOptions,
    engine: StatEngine
  ): Promise<Server> {
    const httpServer = await Server.bootstrapServer(config, engine);
    return new Server(httpServer, engine);
  }

  private static async bootstrapServer(
    { network, balancingOptions, cachingMethod, maxRetries = 3 }: ConfigOptions,
    engine: StatEngine
  ): Promise<FastifyInstance> {
    const { http } = balancingOptions;

    if (!http) {
      throw new Error("http  must be configured!");
    }

    return await initHTTPServer({
      balancer: createBalancer(http, network),
      cache: createCache(cachingMethod),
      maxRetries,
      engine,
    });
  }

  async restart(config: ConfigOptions): Promise<void> {
    await this.httpServer.close();
    this.engine.addLog({
      type: "info",
      entry: "Server gracefully shut down.",
      timestamp: Date.now(),
    });

    this.httpServer = await Server.bootstrapServer(config, this.engine);
    this.engine.addLog({
      type: "info",
      entry: "Server restarted with updated configuration.",
      timestamp: Date.now(),
    });
  }

  async close(): Promise<void> {
    await this.httpServer.close();
  }

  get instance(): FastifyInstance {
    return this.httpServer;
  }
}
