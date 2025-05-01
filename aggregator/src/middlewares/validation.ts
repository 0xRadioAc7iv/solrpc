import { FastifyReply, FastifyRequest } from "fastify";
import { JSON_RPC_REQUEST_BODY_SCHEMA } from "../utils";

export const validateRequestBody = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body;
  const isRequestBodyValid = request.validateInput(
    requestBody,
    JSON_RPC_REQUEST_BODY_SCHEMA,
    "body"
  );

  if (!isRequestBodyValid) {
    reply.code(400).send({ error: "Invalid request body" });
  }
};
