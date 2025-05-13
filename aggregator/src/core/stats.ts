import { HttpMethods, LogEntry } from "../types";
import { LogBuffer } from "./logger";

export class StatEngine {
  private rpcMethodCounter: Map<HttpMethods, number>;
  private logs: LogBuffer;

  constructor() {
    this.rpcMethodCounter = new Map();
    this.logs = new LogBuffer(1000);
  }

  updateRpcMethodCount(method: HttpMethods) {
    const current = this.rpcMethodCounter.get(method) || 0;
    this.rpcMethodCounter.set(method, current + 1);
  }

  getTopRpcMethods(limit = 10): { method: HttpMethods; count: number }[] {
    return Array.from(this.rpcMethodCounter.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([method, count]) => ({ method, count }));
  }

  getRpcMethodCount() {
    return this.rpcMethodCounter;
  }

  addLog(entry: LogEntry) {
    this.logs.add(entry);
  }

  getLogs(): LogEntry[] {
    return this.logs.getLogs();
  }
}
