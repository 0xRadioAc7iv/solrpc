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

      log.info({
        type: "rpc-forward",
        attempt,
        to: endpoint,
        method: body.method,
        status: json?.result ? "success" : "error",
      });

      return { response: json, error: null };
    } catch (err: any) {
      lastError = err.message;
      log.warn({
        type: "rpc-retry-error",
        attempt,
        endpoint,
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
