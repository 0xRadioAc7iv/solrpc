import { HttpConfig, NetworkOptions, WeightedEndpoint } from "../types";
import { Balancer } from "../lib/interfaces";
import { config, engine } from "..";

const cf = config.getConfig();

export function createBalancer(
  httpConfig: HttpConfig,
  network: NetworkOptions
): Balancer {
  const { method, endpoints } = httpConfig;

  if (method === "weighted") {
    const weightedEndpoints = endpoints[network];
    return new WeightedBalancer(weightedEndpoints);
  } else {
    const unweightedEndpoints = endpoints[network];
    switch (method) {
      case "round-robin":
        return new RoundRobinBalancer(unweightedEndpoints);
      case "least-connections":
        return new LeastConnectionsBalancer(unweightedEndpoints);
      case "least-latency":
        return new LeastLatencyBalancer(unweightedEndpoints);
      default:
        throw new Error(`Unsupported load balancing method: ${method}`);
    }
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
      engine.addLog({
        type: "info",
        entry: "Starting health check...",
        timestamp: Date.now(),
      });
      for (const target of this.targets) {
        const startTime = Date.now();
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
          if (res.ok) {
            this.healthyTargets.add(target);
            engine.updateEndpointsData(target, {
              network: cf.network,
              isActive: true,
              latency: Date.now() - startTime,
              weight: this.getWeightForEndpoint(target),
            });
          } else {
            this.healthyTargets.delete(target);
            engine.updateEndpointsData(target, {
              network: cf.network,
              isActive: false,
              latency: Date.now() - startTime,
              weight: this.getWeightForEndpoint(target),
            });
            engine.addLog({
              type: "error",
              timestamp: Date.now(),
              entry: {
                type: "rpc-unhealthy",
                endpoint: target,
              },
            });
          }
        } catch {
          this.healthyTargets.delete(target);
          engine.updateEndpointsData(target, {
            network: cf.network,
            isActive: false,
            latency: Date.now() - startTime,
            weight: this.getWeightForEndpoint(target),
          });
          engine.addLog({
            type: "error",
            timestamp: Date.now(),
            entry: {
              type: "rpc-unhealthy",
              endpoint: target,
            },
          });
        }
      }
    }, this.healthCheckInterval);
  }

  protected getWeightForEndpoint(endpoint: string): number | undefined {
    return undefined;
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
    engine.addLog({
      type: "info",
      entry: "Measuring endpoint latencies...",
      timestamp: Date.now(),
    });
    const promises = this.targets.map(async (target) => {
      const startTime = Date.now();
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
        const latency = Date.now() - startTime;
        if (res.ok) {
          this.latencies.set(target, latency);
          this.healthyTargets.add(target);
          engine.updateEndpointsData(target, {
            network: cf.network,
            isActive: true,
            latency: Date.now() - startTime,
          });
        } else {
          this.latencies.delete(target);
          this.healthyTargets.delete(target);
          engine.updateEndpointsData(target, {
            network: cf.network,
            isActive: false,
            latency: Date.now() - startTime,
          });
          engine.addLog({
            type: "error",
            timestamp: Date.now(),
            entry: {
              type: "rpc-unhealthy",
              endpoint: target,
            },
          });
        }
      } catch {
        this.latencies.delete(target);
        this.healthyTargets.delete(target);
        engine.updateEndpointsData(target, {
          network: cf.network,
          isActive: false,
          latency: Date.now() - startTime,
        });
        engine.addLog({
          type: "error",
          timestamp: Date.now(),
          entry: {
            type: "rpc-unhealthy",
            endpoint: target,
          },
        });
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

export class WeightedBalancer extends BaseBalancer {
  private weights: Map<string, number> = new Map();
  private healthyWeights: Map<string, number> = new Map();
  private totalWeight: number = 0;

  constructor(targets: WeightedEndpoint[]) {
    const urls = targets.map((t) => t.url);
    super(urls);

    for (const { url, weight } of targets) {
      this.weights.set(url, weight);
    }

    this.recalculateHealthyWeights();
    setInterval(
      () => this.recalculateHealthyWeights(),
      this.healthCheckInterval
    );
  }

  private recalculateHealthyWeights() {
    this.healthyWeights.clear();
    this.totalWeight = 0;

    for (const url of this.getHealthyTargets()) {
      const weight = this.weights.get(url) ?? 1;
      this.healthyWeights.set(url, weight);
      this.totalWeight += weight;
    }
  }

  getEndpoint(): string {
    if (this.healthyWeights.size === 0)
      throw new Error("No healthy RPC endpoints available");

    const random = Math.random() * this.totalWeight;
    let cumulative = 0;

    for (const [url, weight] of this.healthyWeights.entries()) {
      cumulative += weight;
      if (random <= cumulative) {
        return url;
      }
    }

    return Array.from(this.healthyWeights.keys())[0];
  }

  protected override getWeightForEndpoint(endpoint: string) {
    return this.weights.get(endpoint);
  }
}
