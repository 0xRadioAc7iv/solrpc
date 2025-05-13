import { engine } from "..";
import { LeastConnectionsBalancer } from "../core/balancing";
import { RequestsWithRetryOptions } from "../lib/interfaces";

export async function requestsWithRetry({
  balancer,
  body,
  log,
  maxRetries,
}: RequestsWithRetryOptions): Promise<{
  response: any | null;
  error: string | null;
}> {
  let lastError: string | null = null;
  let endpointUsed: string | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const endpoint = balancer.getEndpoint();
    endpointUsed = endpoint;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        lastError = `RPC server responded with status ${res.status}`;
        continue;
      }

      const json = await res.json();

      engine.addLog({
        type: "debug",
        timestamp: Date.now(),
        entry: {
          type: "rpc-forward",
          attemptNumber: attempt,
          endpoint: endpoint,
          method: body.method,
          status: res.status < 400 ? "success" : "error",
        },
      });

      return { response: json, error: null };
    } catch (err: any) {
      lastError = err.message;
      engine.addLog({
        type: "rpc-retry-error",
        timestamp: Date.now(),
        attemptNumber: attempt,
        endpoint: endpoint,
        message: err.message,
      });
    } finally {
      if (balancer instanceof LeastConnectionsBalancer && endpointUsed) {
        balancer.releaseEndpoint(endpointUsed);
      }
    }
  }

  return { response: null, error: lastError };
}
