import axios from "axios";

const API_BASE = "http://localhost:8585/api/dashboard";

export const getRequestRates = () => axios.get(`${API_BASE}/request-rates`);
export const getResponseLatency = () =>
  axios.get(`${API_BASE}/response-latency`);
export const getLogs = () => axios.get(`${API_BASE}/logs`);
export const getEndpoints = () => axios.get(`${API_BASE}/endpoints`);
