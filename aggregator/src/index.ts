import Fastify from "fastify";
import { validateRequestBody } from "./middlewares/validation";
import { requestHandler } from "./handler";

const app = Fastify({ logger: false });

app.register((fastify, opts, done) => {
  fastify.post("/", {
    preHandler: validateRequestBody,
    handler: requestHandler,
  });

  fastify.get("/check", (_, reply) => {
    reply.code(200).send({ status: "ok" });
  });

  done();
});

app.listen({ port: (process.argv[2] as unknown as number) || 9000 }, () => {
  console.log("Server is listening...");
});
