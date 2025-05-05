import { FastifyBaseLogger } from "fastify";
import { ValidRequestBody } from "../../types";

export interface Balancer {
  getEndpoint(): string;
}

export interface Cache {
  get(method: string, params: string): string | undefined;

  set(method: string, params: string, response: string): void;
}

export interface RequestsWithRetryOptions {
  balancer: Balancer;
  body: ValidRequestBody;
  log: FastifyBaseLogger;
  maxRetries: number;
}
