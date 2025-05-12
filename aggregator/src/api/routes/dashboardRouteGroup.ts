import { FastifyPluginCallback } from "fastify";
import { ConfigOptions } from "../../types";
import { config, server } from "../..";

export const apiRouteGroup: FastifyPluginCallback = (fastify, opts) => {
  fastify.post<{ Body: ConfigOptions }>("/config", async (request, reply) => {
    const newConfig = request.body;

    config.updateConfig(newConfig);
    server.restart(config.getConfig());

    reply.code(200).send({ message: "Config updated and server restarted" });
  });
};
