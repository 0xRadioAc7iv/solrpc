import { Server } from "./core/server";
import { Config } from "./core/config";
import { StatEngine } from "./core/stats";

let server: Server;

const config = new Config({
  network: "devnet",
  balancingOptions: {
    http: {
      method: "round-robin",
      endpoints: {
        devnet: ["https://api.devnet.solana.com"],
        mainnet: ["https://api.mainnet-beta.solana.com"],
      },
    },
  },
  cachingMethod: { type: "memory" },
  maxRetries: 5,
});

const engine = new StatEngine();

async function main() {
  server = await Server.init(config.getConfig(), engine);
}

main();

export { config, server, engine };
