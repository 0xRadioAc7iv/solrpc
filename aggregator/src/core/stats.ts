import { ConfigOptions } from "../types";

export class StatsEngine {
  private config: ConfigOptions;

  constructor(config: ConfigOptions) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}
