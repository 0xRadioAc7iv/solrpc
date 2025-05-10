import Fastify from "fastify";
import { HttpServerOptions } from "../types";
import { validateRequestBody } from "../utils/validate";
import { handleRequest } from "../utils/requestHandler";

const httpServer = Fastify({ logger: true });

export async function initHTTPServer(options: HttpServerOptions) {
  const handler = await handleRequest(options);

  httpServer.register((fastify, _, done) => {
    fastify.post("/", {
      preHandler: validateRequestBody,
      handler,
    });

    fastify.get("/health", (_, reply) => {
      reply.code(200).send();
    });

    done();
  });

  httpServer.listen({ port: options.port || 9000 });
}
