import { ConfigOptions } from "../types";

export class Config {
  private config: ConfigOptions;

  constructor(config: ConfigOptions) {
    this.config = config;
  }

  updateConfig(newConfig: ConfigOptions) {
    this.config = newConfig;
  }

  getConfig() {
    return this.config;
  }
}
