import Fastify from "fastify";
import { ServerOptions, ValidRequestBody } from "../../types";
import { validateRequestBody } from "../utils/validate";
import { LeastConnectionsBalancer } from "../core/balancing";

const httpServer = Fastify({ logger: true });

export async function initHTTPServer({ balancer }: ServerOptions) {
  httpServer.register((fastify, opts, done) => {
    fastify.post("/", {
      preHandler: validateRequestBody,
      handler: async (request, reply) => {
        try {
          const requestBody = request.body as ValidRequestBody;
          const body = { jsonrpc: "2.0", ...requestBody };

          const nextEndpoint = balancer.getEndpoint();

          const response = await fetch(nextEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const jsonResponse = await response.json();
          reply.code(200).send(jsonResponse);

          if (balancer instanceof LeastConnectionsBalancer) {
            balancer.releaseEndpoint(nextEndpoint);
          }
        } catch (error) {
          reply.code(500).send({ error: "Internal Server Error" });
        }
      },
    });

    fastify.get("/health", (_, reply) => {
      reply.code(200).send();
    });

    done();
  });

  httpServer.listen({ port: 9000 });
}
