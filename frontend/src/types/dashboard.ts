export enum NetworkType {
  MAINNET = "mainnet",
  DEVNET = "devnet",
}

export enum StatusType {
  ONLINE = "Online",
  OFFLINE = "Offline",
  DEGRADED = "Degraded",
}

export interface Endpoint {
  id: string;
  url: string;
  network: NetworkType;
  status: StatusType;
  latency: number;
  weight: number;
}
