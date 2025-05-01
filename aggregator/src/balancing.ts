import { SolRPCError } from "./errors";

let currentServer = 0;

export const roundRobinBalancing = (urls: readonly string[]) => {
  if (urls.length === 0) {
    throw new SolRPCError("No URLs Configured!");
  }

  const targetUrl = urls[currentServer];
  currentServer = (currentServer + 1) % urls.length;

  return targetUrl;
};
