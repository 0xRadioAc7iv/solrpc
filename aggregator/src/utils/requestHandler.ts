import { FastifyReply, FastifyRequest } from "fastify";
import { ServerOptions, ValidRequestBody } from "../../types";
import { getCachePolicyForMethod } from "./cachePolicy";
import { requestsWithRetry } from "../utils/requestRetry";

export async function handleRequest({
  balancer,
  cache,
  maxRetries,
}: ServerOptions) {
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = Date.now();
    let method = "unknown";
    let requestId: number | undefined = undefined;

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

      const policy = getCachePolicyForMethod(method);

      if (policy.cacheable) {
        const cached = await cache.get(method, paramKey);
        if (cached) {
          request.log.info({ type: "cache-hit", method, id: requestId });
          reply.code(200).send(JSON.parse(cached));
          return;
        } else {
          request.log.info({ type: "cache-miss", method, id: requestId });
        }
      }

      const { response, error } = await requestsWithRetry({
        balancer,
        body,
        log: request.log,
        maxRetries,
      });

      if (response) {
        reply.code(200).send(response);

        if (policy.cacheable) {
          await cache.set(
            method,
            paramKey,
            JSON.stringify(response),
            policy.ttlMs
          );
        }
      } else {
        request.log.error({
          type: "rpc-failure",
          id: requestId,
          method,
          error,
        });

        reply.code(502).send({
          jsonrpc: "2.0",
          id: requestId,
          error: {
            code: -32000,
            message: "Request failed after multiple attempts",
            data: error,
          },
        });
      }
    } catch (err: any) {
      request.log.error({
        type: "rpc-unhandled-error",
        id: requestId,
        method,
        message: err.message,
        stack: err.stack,
      });

      reply.code(500).send({
        jsonrpc: "2.0",
        id: requestId,
        error: {
          code: -32603,
          message: "Internal Server Error",
        },
      });
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
