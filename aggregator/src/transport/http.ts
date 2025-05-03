import Fastify from "fastify";
import { ServerOptions, ValidRequestBody } from "../../types";
import { validateRequestBody } from "../utils/validate";
import { LeastConnectionsBalancer } from "../core/balancing";
import { handleRequest } from "../utils/requestHandler";
import { getCachePolicyForMethod } from "../utils/cachePolicy";

const httpServer = Fastify({ logger: true });

export async function initHTTPServer({ balancer, cache }: ServerOptions) {
  httpServer.register((fastify, _, done) => {
    fastify.post("/", {
      preHandler: validateRequestBody,
      handler: async (request, reply) => {
        try {
          const requestBody = request.body as ValidRequestBody;
          const body = { jsonrpc: "2.0", ...requestBody };

          const policy = getCachePolicyForMethod(body.method);

          // ✅ Try to serve from cache
          if (policy.cacheable) {
            const cached = cache.get(body.method, body.params);
            if (cached) {
              reply.code(200).send(JSON.parse(cached));
              return;
            }
          }

          const nextEndpoint = balancer.getEndpoint();
          const jsonResponse = await handleRequest(nextEndpoint, body);
          reply.code(200).send(jsonResponse);

          if (policy.cacheable) {
            cache.set(
              body.method,
              body.params,
              JSON.stringify(jsonResponse),
              policy.ttlMs
            );
          }

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
