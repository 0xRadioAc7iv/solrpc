import { Server } from "./core/server";
import { Config } from "./core/config";

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

async function main() {
  server = await Server.init(config.getConfig());
}

main();

export { config, server };
