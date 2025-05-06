import { bootstrapServer } from "./core/bootstrap";

bootstrapServer({
  transport: "http",
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
});
