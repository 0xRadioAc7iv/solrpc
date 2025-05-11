import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import { WebsocketServerOptions } from "../types";
import { websocketEventHandler } from "../utils/wsHandler";

const wsServer = Fastify();

wsServer.register(fastifyWebsocket);

wsServer.setErrorHandler((error, request, reply) => {
  console.error("Fastify Error Handler:", error);
  reply
    .status(500)
    .send({ error: "Internal Server Error", detail: error.message });
});

export async function initWebsocketServer(options: WebsocketServerOptions) {
  let { port, endpoints } = options;

  // Set default port
  if (!port) port = 9595;

  wsServer.register(async function (fastify) {
    fastify.decorate("endpoints", endpoints);
    fastify.get("/", { websocket: true }, websocketEventHandler);
  });

  try {
    wsServer.listen({ port });
    console.log(`Websocket Server listening at: ws://localhost:${port}`);
  } catch (error) {
    wsServer.log.error(error);
    process.exit(1);
  }
}
