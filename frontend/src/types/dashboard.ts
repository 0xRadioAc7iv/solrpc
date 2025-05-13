// types/dashboard.ts

export type EndpointType = "Public" | "Private" | "Hosted";
export type NetworkType = "Mainnet-Beta" | "Devnet";

export interface Endpoint {
  id: string;
  url: string;
  type: EndpointType;
  network: NetworkType;
  status: "Online" | "Offline" | "Degraded";
  latency: number;
  weight: number;
  enabled: boolean;
}
