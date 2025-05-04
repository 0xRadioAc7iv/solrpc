import { FastifyReply, FastifyRequest } from "fastify";
import { ServerOptions, ValidRequestBody } from "../../types";
import { getCachePolicyForMethod } from "./cachePolicy";
import { LeastConnectionsBalancer } from "../core/balancing";

export async function handleRequest({ balancer, cache }: ServerOptions) {
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = Date.now();
    let method = "unknown";
    let requestId: string | number | undefined = undefined;

    try {
      const body = request.body as ValidRequestBody;
      const paramKey = body.params ? JSON.stringify(body.params) : "";

      method = body.method;
      requestId = body.id;

      request.log.info({
        type: "incoming-request",
        id: requestId,
        ip: request.ip,
        method,
        timestamp: new Date().toISOString(),
      });

      const policy = getCachePolicyForMethod(body.method);

      if (policy.cacheable) {
        const cached = await cache.get(body.method, paramKey);
        if (cached) {
          request.log.info({ type: "cache-hit", method, id: requestId });
          reply.code(200).send(JSON.parse(cached));
          return;
        } else {
          request.log.info({ type: "cache-miss", method, id: requestId });
        }
      }

      const nextEndpoint = balancer.getEndpoint();
      const response = await fetch(nextEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`RPC server responded with ${response.status}`);
      }

      const jsonResponse = await response.json();

      request.log.info({
        type: "rpc-forward",
        id: requestId,
        to: nextEndpoint,
        method,
        status: jsonResponse?.result ? "success" : "error",
      });

      reply.code(200).send(jsonResponse);

      if (policy.cacheable) {
        await cache.set(
          method,
          paramKey,
          JSON.stringify(jsonResponse),
          policy.ttlMs
        );
      }

      if (balancer instanceof LeastConnectionsBalancer) {
        balancer.releaseEndpoint(nextEndpoint);
      }
    } catch (error) {
      request.log.error({
        type: "rpc-error",
        id: requestId,
        method,
        message: (error as Error)?.message,
        stack: (error as Error)?.stack,
      });
      reply.code(500).send({ error: "Internal Server Error" });
    } finally {
      const duration = Date.now() - startTime;
      request.log.info({
        type: "request-duration",
        id: requestId,
        method,
        durationMs: duration,
      });
    }
  };

  return handler;
}
