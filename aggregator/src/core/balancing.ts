import { LoadBalancingOptions } from "../../types";
import { Balancer } from "../lib/interfaces";

export function createBalancer(
  balancingMethod: LoadBalancingOptions,
  endpoints: string[]
) {
  if (balancingMethod === "round-robin") {
    return new RoundRobinBalancer(endpoints);
  } else {
    return new LeastConnectionsBalancer(endpoints);
  }
}

export class RoundRobinBalancer implements Balancer {
  private targets: string[];
  private index: number = 0;

  constructor(urls: string[]) {
    this.targets = urls;
  }

  getEndpoint(): string {
    const target = this.targets[this.index];
    this.index = (this.index + 1) % this.targets.length;
    return target;
  }
}

export class LeastConnectionsBalancer implements Balancer {
  private connections: Map<string, number>;

  constructor(private targets: string[]) {
    this.connections = new Map();

    for (const target of targets) {
      this.connections.set(target, 0);
    }
  }

  getEndpoint(): string {
    let selected = this.targets[0];
    let minConnections = this.connections.get(selected) ?? 0;

    for (const target of this.targets) {
      const current = this.connections.get(target) ?? 0;
      if (current < minConnections) {
        selected = target;
        minConnections = current;
      }
    }

    this.connections.set(selected, minConnections + 1);
    return selected;
  }

  releaseEndpoint(endpoint: string): void {
    const current = this.connections.get(endpoint) ?? 0;
    this.connections.set(endpoint, Math.max(0, current - 1));
  }
}
