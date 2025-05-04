import { LoadBalancingOptions } from "../../types";
import { Balancer } from "../lib/interfaces";

export function createBalancer(
  balancingMethod: LoadBalancingOptions,
  endpoints: string[]
) {
  if (balancingMethod === "round-robin") {
    return new RoundRobinBalancer(endpoints);
  } else if (balancingMethod === "least-latency") {
    return new LeastLatencyBalancer(endpoints);
  } else {
    return new LeastConnectionsBalancer(endpoints);
  }
}

abstract class BaseBalancer implements Balancer {
  protected targets: string[];
  protected healthCheckInterval: number;
  protected healthyTargets: Set<string> = new Set();

  constructor(targets: string[], intervalMs = 5000) {
    this.targets = targets;
    this.healthCheckInterval = intervalMs;
    this.startHealthCheck();
  }

  private startHealthCheck() {
    this.targets.forEach((target) => this.healthyTargets.add(target));
    setInterval(async () => {
      for (const target of this.targets) {
        try {
          const res = await fetch(target, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "getHealth",
            }),
          });
          const data = await res.json();
          if (data?.result === "ok") {
            this.healthyTargets.add(target);
          } else {
            this.healthyTargets.delete(target);
          }
        } catch {
          this.healthyTargets.delete(target);
        }
      }
    }, this.healthCheckInterval);
  }

  protected getHealthyTargets(): string[] {
    return [...this.healthyTargets];
  }

  abstract getEndpoint(): string;
  releaseEndpoint?(endpoint: string): void;
}

export class RoundRobinBalancer extends BaseBalancer {
  private index = 0;

  constructor(targets: string[]) {
    super(targets);
  }

  getEndpoint(): string {
    const healthy = this.getHealthyTargets();
    if (healthy.length === 0)
      throw new Error("No healthy RPC endpoints available");

    const endpoint = healthy[this.index % healthy.length];
    this.index = (this.index + 1) % healthy.length;
    return endpoint;
  }
}

export class LeastConnectionsBalancer extends BaseBalancer {
  private connections: Map<string, number> = new Map();

  constructor(targets: string[]) {
    super(targets);
    targets.forEach((target) => this.connections.set(target, 0));
  }

  getEndpoint(): string {
    const healthy = this.getHealthyTargets();
    if (healthy.length === 0)
      throw new Error("No healthy RPC endpoints available");

    let selected = healthy[0];
    let min = this.connections.get(selected) || 0;

    for (const target of healthy) {
      const current = this.connections.get(target) || 0;
      if (current < min) {
        selected = target;
        min = current;
      }
    }

    this.connections.set(selected, min + 1);
    return selected;
  }

  releaseEndpoint(endpoint: string): void {
    const count = this.connections.get(endpoint) ?? 0;
    this.connections.set(endpoint, Math.max(0, count - 1));
  }
}

export class LeastLatencyBalancer extends BaseBalancer {
  private latencies: Map<string, number> = new Map();

  constructor(targets: string[]) {
    super(targets);
    this.measureLatencies();
    setInterval(() => this.measureLatencies(), 5000);
  }

  private async measureLatencies() {
    const promises = this.targets.map(async (target) => {
      const start = Date.now();
      try {
        const res = await fetch(target, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getHealth",
          }),
        });
        const json = await res.json();
        const latency = Date.now() - start;
        if (json?.result === "ok") {
          this.latencies.set(target, latency);
          this.healthyTargets.add(target);
        } else {
          this.latencies.delete(target);
          this.healthyTargets.delete(target);
        }
      } catch {
        this.latencies.delete(target);
        this.healthyTargets.delete(target);
      }
    });

    await Promise.all(promises);
  }

  getEndpoint(): string {
    const healthy = this.getHealthyTargets();
    if (healthy.length === 0)
      throw new Error("No healthy RPC endpoints available");

    let best = healthy[0];
    let lowest = this.latencies.get(best) ?? Infinity;

    for (const target of healthy) {
      const latency = this.latencies.get(target) ?? Infinity;
      if (latency < lowest) {
        best = target;
        lowest = latency;
      }
    }

    return best;
  }
}
