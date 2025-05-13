import { FastifyReply, FastifyRequest } from "fastify";
import { HttpServerOptions, ValidRequestBody } from "../types";
import { getCachePolicyForMethod } from "./cachePolicy";
import { requestsWithRetry } from "../utils/requestRetry";

export async function handleRequest({
  balancer,
  cache,
  maxRetries,
  engine,
}: HttpServerOptions) {
  const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = Date.now();
    let method = "unknown";
    let requestId: number | undefined = undefined;

    try {
      const body = request.body as ValidRequestBody;
      const paramKey = body.params ? JSON.stringify(body.params) : "";

      engine.updateRpcMethodCount(body.method);

      method = body.method;
      requestId = body.id;

      engine.addRequest(requestId);
      engine.addLog({
        type: "debug",
        timestamp: Date.now(),
        entry: {
          type: "incoming-request",
          requestId,
          ip: request.ip,
          method,
        },
      });

      const policy = getCachePolicyForMethod(method);

      if (policy.cacheable) {
        const cached = await cache.get(method, paramKey);
        if (cached) {
          engine.addLog({
            type: "debug",
            timestamp: Date.now(),
            entry: {
              type: "cache-hit",
              requestId,
              method,
            },
          });
          engine.addResponseLatency(Date.now() - startTime, true, true);
          reply.code(200).send(JSON.parse(cached));
          return;
        } else {
          engine.addLog({
            type: "debug",
            timestamp: Date.now(),
            entry: {
              type: "cache-miss",
              requestId,
              method,
            },
          });
        }
      }

      const { response, error } = await requestsWithRetry({
        balancer,
        body,
        maxRetries,
      });

      if (response) {
        reply.code(200).send(response);

        engine.addResponseLatency(Date.now() - startTime, false, true);
        engine.addLog({
          type: "debug",
          timestamp: Date.now(),
          entry: {
            type: "request-success",
            requestId,
            method,
          },
        });

        if (policy.cacheable) {
          await cache.set(
            method,
            paramKey,
            JSON.stringify(response),
            policy.ttlMs
          );
        }
      } else {
        engine.incrementUnsuccessfullRequests();
        engine.addLog({
          type: "error",
          timestamp: Date.now(),
          entry: {
            type: "rpc-multiple-attempt-failure",
            requestId,
            method,
          },
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
      engine.addResponseLatency(Date.now() - startTime, false, false);
      engine.incrementUnsuccessfullRequests();
      engine.addLog({
        type: "error",
        timestamp: Date.now(),
        entry: {
          type: "rpc-unhandled",
          requestId: requestId || 0,
          method,
          err,
        },
      });

      reply.code(500).send({
        jsonrpc: "2.0",
        id: requestId,
        error: {
          code: -32603,
          message: "Internal Server Error",
        },
      });
    }
  };

  return handler;
}
