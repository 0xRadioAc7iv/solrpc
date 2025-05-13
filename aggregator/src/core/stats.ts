import {
  HttpMethods,
  LogEntry,
  StatEndpointsData,
  StatRequestData,
  StatResponseLatency,
} from "../types";
import { LogBuffer } from "./logger";

export class StatEngine {
  private rpcMethodCounter: Map<HttpMethods, number>;
  private logs: LogBuffer;
  private unSuccessfullRequests: number;
  private requests: StatRequestData[];
  private responseLatencies: StatResponseLatency[];
  private endpointsData: Map<string, StatEndpointsData>;

  constructor() {
    this.rpcMethodCounter = new Map();
    this.endpointsData = new Map();
    this.logs = new LogBuffer(1000);
    this.unSuccessfullRequests = 0;
    this.requests = [];
    this.responseLatencies = [];
  }

  updateEndpointsData(endpoint: string, data: StatEndpointsData) {
    this.endpointsData.set(endpoint, data);
  }

  addLog(entry: LogEntry) {
    this.logs.add(entry);
  }

  addRequest(requestId: number) {
    this.requests.push({ requestId: requestId, timestamp: Date.now() });
  }

  addResponseLatency(latency: number, isCached: boolean, isSuccess: boolean) {
    this.responseLatencies.push({
      latency: latency,
      timestamp: Date.now(),
      cachedResponse: isCached,
      success: isSuccess,
    });
  }

  incrementUnsuccessfullRequests() {
    this.unSuccessfullRequests++;
  }

  updateRpcMethodCount(method: HttpMethods) {
    const current = this.rpcMethodCounter.get(method) || 0;
    this.rpcMethodCounter.set(method, current + 1);
  }

  getEndpointsData(endpoint: string) {
    return this.endpointsData.get(endpoint);
  }

  getAllEndpointsData() {
    const endPointsDataArray = Array.from(this.endpointsData.entries()).map(
      ([key, value]) => ({ key, value })
    );
    return endPointsDataArray;
  }

  getRequests(limit?: number) {
    return this.requests.slice(0, limit);
  }

  getResponseLatencies() {
    return this.responseLatencies;
  }

  getUnsuccessfullRequestCount() {
    return this.unSuccessfullRequests;
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

  getLogs(): LogEntry[] {
    return this.logs.getLogs();
  }
}
