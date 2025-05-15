import Fastify, { FastifyInstance } from "fastify";
import { HttpServerOptions } from "../types";
import { validateRequestBody } from "../utils/validate";
import { handleRequest } from "../utils/requestHandler";
import { apiRouteGroup } from "../api/routes/dashboardRouteGroup";
import { engine } from "..";
import cors from "@fastify/cors";

export async function initHTTPServer(
  options: HttpServerOptions
): Promise<FastifyInstance> {
  const httpServer = Fastify({ logger: true });

  const handler = await handleRequest(options);

  await httpServer.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  });

  httpServer.register((fastify, _, done) => {
    fastify.post("/", {
      preHandler: validateRequestBody,
      handler,
    });

    fastify.get("/health", (_, reply) => {
      reply.code(200).send();
    });

    fastify.register(apiRouteGroup, { prefix: "/api/dashboard" });

    done();
  });

  httpServer.listen({ port: 8585 });
  engine.addLog({
    type: "info",
    entry: "HTTP Server started at port 8585",
    timestamp: Date.now(),
  });
  console.log(`HTTP Server listening at: http://localhost:8585`);

  return httpServer;
}
