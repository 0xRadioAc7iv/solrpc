import { ConfigOptions } from "./types";
import { bootstrapServer } from "./core/bootstrap";

const CONFIG: ConfigOptions = {
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
};

bootstrapServer(CONFIG);
