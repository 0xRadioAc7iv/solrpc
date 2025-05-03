import { FastifyReply, FastifyRequest } from "fastify";

const JSON_RPC_REQUEST_BODY_SCHEMA = {
  type: "object",
  properties: {
    jsonrpc: {
      type: "string",
      const: "2.0",
    },
    id: {
      type: "number",
    },
    method: {
      type: "string",
    },
  },
  required: ["jsonrpc", "id", "method"],
};

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
