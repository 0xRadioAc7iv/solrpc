export interface Balancer {
  getEndpoint(): string;
}

export interface Cache {
  get(method: string, params: string): string | undefined;

  set(method: string, params: string, response: string): void;
}
