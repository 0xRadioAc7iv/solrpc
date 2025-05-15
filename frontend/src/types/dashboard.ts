export enum EndpointType {
  RPC = "RPC",
  WS = "WS",
  REST = "REST",
  GRPC = "GRPC"
}

export enum NetworkType {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet"
}

export enum StatusType {
  ONLINE = "Online",
  OFFLINE = "Offline",
  DEGRADED = "Degraded"
}

export interface Endpoint {
  id: string;
  url: string;
  type: EndpointType;
  network: NetworkType;
  status: StatusType;  // Use enum here, not string union
  latency: number;
  weight: number;
  enabled: boolean;
}
