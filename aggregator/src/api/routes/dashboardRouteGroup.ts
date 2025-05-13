import { FastifyPluginCallback } from "fastify";
import { ConfigOptions } from "../../types";
import { config, engine, server } from "../..";

export const apiRouteGroup: FastifyPluginCallback = (fastify) => {
  fastify.post<{ Body: ConfigOptions }>("/config", async (request, reply) => {
    const newConfig = request.body;

    config.updateConfig(newConfig);
    server.restart(config.getConfig());

    reply.code(200).send({ message: "Config updated and server restarted" });
  });

  fastify.get("/top-methods", async (request, reply) => {
    const queryParams = request.query;
    const limit = (queryParams as any).limit as number;

    if (limit) return reply.code(200).send(engine.getTopRpcMethods(limit));

    reply.code(200).send(engine.getTopRpcMethods());
  });

  fastify.get("/endpoints", async (request, reply) => {
    const endpointsData = engine.getAllEndpointsData();
    reply.code(200).send(endpointsData);
  });

  fastify.get("/endpoints/all", async (_, reply) => {
    const endpoints = config.getConfig().balancingOptions.http.endpoints;
    reply.code(200).send(endpoints);
  });

  fastify.get("/logs", async (_, reply) => {
    const logs = engine.getLogs();
    reply.code(200).send(logs);
  });

  fastify.get("/requests", async (request, reply) => {
    const queryParams = request.query;
    const limit = (queryParams as any).limit as number;

    const requests = limit ? engine.getRequests(limit) : engine.getRequests();
    reply.code(200).send({ requests: requests, length: requests.length });
  });

  fastify.get("/request-rates", async (request, reply) => {
    const totalRequests = engine.getRequests().length;
    const erroredReq = engine.getUnsuccessfullRequestCount();
    const successfullReq = totalRequests - erroredReq;

    const successRate = ((successfullReq / totalRequests) * 100).toFixed(2);
    const errorRate = ((erroredReq / totalRequests) * 100).toFixed(2);

    reply.code(200).send({ successRate, errorRate });
  });

  fastify.get("/response-latency", async (request, reply) => {
    const responseLatencies = engine.getResponseLatencies();
    reply.code(200).send(responseLatencies);
  });
};
