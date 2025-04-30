import Fastify from "fastify";
import { setActiveRPCEndpoints } from "./utils";
import { ACTIVE_NETWORK } from "./config";

const app = Fastify({ logger: true });

const ACTIVE_ENDPOINTS = setActiveRPCEndpoints(ACTIVE_NETWORK);

app.get("/", (request, reply) => {
  reply.code(200).send();
});

app.get("/check", (_, reply) => {
  reply.code(200).send();
});

app.listen({ port: (process.argv[2] as unknown as number) || 9000 }, () => {
  console.log("Server is listening...");
});
