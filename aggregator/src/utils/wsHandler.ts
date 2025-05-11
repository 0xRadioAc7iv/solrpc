import { WebsocketHandler } from "@fastify/websocket";
import { tryCatch } from "./tryCatch";
import { ValidRequestBody } from "../types";
import { validateWebsocketMessageData } from "./validate";

export const websocketEventHandler: WebsocketHandler = (socket, request) => {
  // @ts-ignore
  // Accessing the object 'endpoints' attached using the decorate method provided by fastify
  const endpoints = request.server.endpoints as string[];

  socket.on("message", async (message: Buffer) => {
    const messageString = message.toString();

    const { data, error: parseError } = await tryCatch<ValidRequestBody>(
      JSON.parse(messageString)
    );

    if (parseError || !data) {
      socket.send(`Error parsing data`);
      socket.close();
      return;
    }

    const { error: validatonError } = validateWebsocketMessageData(data);

    if (validatonError) {
      socket.send(validatonError);
      socket.close();
      return;
    }
  });
};
