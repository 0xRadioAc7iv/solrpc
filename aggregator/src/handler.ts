import { FastifyReply, FastifyRequest } from "fastify";
import { config, DEVNET_RPC_URLS, MAINNET_RPC_URLS } from "./config";
import { roundRobinBalancing } from "./balancing";
import { ValidRequestBody } from "./types";

const ACTIVE_URLS =
  config.network === "devnet" ? DEVNET_RPC_URLS : MAINNET_RPC_URLS;

const balancingMethod =
  config.balancingMethod === "round-robin"
    ? roundRobinBalancing
    : roundRobinBalancing; // This will be replaced with other methods as they are implemented

export const requestHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id, method, params } = request.body as ValidRequestBody;
  const targetUrl = balancingMethod(ACTIVE_URLS);

  //   sendRequestToRpcServer()

  reply.code(200).send();
};
