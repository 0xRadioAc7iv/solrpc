import { ConfigOptions } from "./types";
import { startHTTPServer, startWebsocketServer } from "./core/bootstrap";

const CONFIG: ConfigOptions = {
  network: "devnet",
  balancingOptions: {
    method: "least-connections",
    endpoints: {
      devnet: ["https://api.devnet.solana.com/"],
      mainnet: ["https://api.mainnet-beta.solana.com"],
    },
  },
  cachingMethod: { type: "memory" },
  maxRetries: 5,
};

startHTTPServer(CONFIG);
// startWebsocketServer(CONFIG)
