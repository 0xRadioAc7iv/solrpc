import { FastifyPluginCallback } from "fastify";
import { ConfigOptions } from "../../types";
import { config, engine, server } from "../..";

export const apiRouteGroup: FastifyPluginCallback = (fastify, opts) => {
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

  fastify.get("/endpoints/all", async (request, reply) => {
    const endpoints = config.getConfig().balancingOptions.http.endpoints;
    reply.code(200).send(endpoints);
  });

  fastify.get("/logs", async (request, reply) => {
    const logs = engine.getLogs();
    reply.code(200).send(logs);
  });
};
