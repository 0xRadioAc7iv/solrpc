import { FastifyReply, FastifyRequest } from "fastify";
import { ValidRequestBody, ValidWsMethod, WebsocketMethods } from "../types";

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

const validMethods: Record<ValidWsMethod, true> = Object.fromEntries(
  WebsocketMethods.map((m) => [m, true])
) as Record<ValidWsMethod, true>;

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

export const validateWebsocketMessageData = (
  data: ValidRequestBody
): { error: string | null } => {
  const { jsonrpc, id, method } = data;

  if (jsonrpc !== "2.0") {
    return {
      error: `VersionError - Invalid JSON-RPC Version: ${jsonrpc}. Required: "2.0"`,
    };
  }

  if (typeof id !== "number") {
    return {
      error: `TypeError - Invalid Data type: ${id}. Required Type: number`,
    };
  }

  if (!isValidWebsocketMethod(method)) {
    return { error: `MethodError - Invalid Method: ${method}.` };
  }

  return { error: null };
};

function isValidWebsocketMethod(method: string): method is ValidWsMethod {
  return !!validMethods[method as ValidWsMethod];
}
