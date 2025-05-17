# SolRPC

SolRPC is a local-first, intelligent RPC aggregator for Solana that provides load balancing, caching, failover, and real-time analytics.

It helps developers build faster and more reliable dApps by turning any set of RPC endpoints into a resilient, observable network — without vendor lock-in or custom infra. Think of it as the reliability layer Solana developers have been missing.

## Features

- **Latency Optimization**
  Route requests through the lowest-latency RPC nodes based on real-time benchmarking — critical for games, high-frequency trading, and real-time apps.

- **Failover Protection**
  If one RPC endpoint goes down, SolRPC seamlessly switches to another — ensuring your app stays online 24/7 without manual intervention.

- **Multiple Load Balancing Options**
  It provides multiple load balancing options depending on your dApp usage and traffic. Currently there are 4 options - Round-Robin, Least Connections, Least Latency and Weighted.

- **Analytics Dashboard**
  Gain insights into request volume, latency, and provider health from one dashboard — perfect for monitoring and debugging.

- **Caching**
  Responses are automatically cached based on their nature. There are multiple caching methods - In-Memory, Redis and Memcached.

## Local Setup

### Server

1. Go to aggregator directory

```bash
cd aggregator
```

2. Install dependencies

```
npm i
```

3. Run the server

```
npm start
```

### Frontend (Dashboard)

1. Go to frontend directory

```bash
cd frontend
```

2. Install dependencies

```
npm i
```

3. Run the server

```
npm run dev
```
