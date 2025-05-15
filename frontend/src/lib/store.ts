import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StatsStore } from "@/types/store";

export const useStatsStore = create<StatsStore>()(
  persist(
    (set, get) => ({
      serverURL: "",
      config: null,

      topRpcMethods: [],
      endpointsData: [],
      endpoints: null,
      logs: [],
      requestData: null,
      requestSuccessRate: 0,
      requestErrorRate: 0,
      responseLatencies: [],

      setServerURL: (url) => set({ serverURL: url }),

      getConfig: async () => {
        const { serverURL } = get();
        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/config`
        );

        if (response.ok) {
          const { config } = await response.json();
          set({ config });
        }
      },
      getTopRpcMethods: async (limit) => {
        const { serverURL } = get();
        const fetchUrl = `${serverURL.replace(
          /\/$/,
          ""
        )}/api/dashboard/top-methods`;

        if (limit) fetchUrl.concat(`?limit=${limit}`);

        const response = await fetch(fetchUrl);

        if (response.ok) {
          const { methods } = await response.json();
          set({ topRpcMethods: methods });
        }
      },
      getEndpointsData: async () => {
        const { serverURL } = get();
        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/endpoints`
        );

        if (response.ok) {
          const { endpointsData } = await response.json();
          set({ endpointsData: endpointsData });
        }
      },
      getEndpointsList: async () => {
        const { serverURL } = get();
        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/endpoints/all`
        );

        if (response.ok) {
          const { endpoints } = await response.json();
          set({ endpoints });
        }
      },
      getLogs: async () => {
        const { serverURL } = get();
        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/logs`
        );

        if (response.ok) {
          const { logs } = await response.json();
          set({ logs });
        }
      },
      getRequestData: async (limit) => {
        const { serverURL } = get();
        const fetchUrl = `${serverURL.replace(
          /\/$/,
          ""
        )}/api/dashboard/requests`;

        if (limit) fetchUrl.concat(`?limit=${limit}`);

        const response = await fetch(fetchUrl);

        if (response.ok) {
          const { requests, length } = await response.json();
          set({ requestData: { requests, length } });
        }
      },
      getRequestRates: async () => {
        const { serverURL } = get();

        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/request-rates`
        );

        if (response.ok) {
          const { successRate, errorRate } = await response.json();
          set({ requestSuccessRate: successRate, requestErrorRate: errorRate });
        }
      },
      getResponseLatencies: async () => {
        const { serverURL } = get();

        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/response-latencies`
        );

        if (response.ok) {
          const { responseLatencies } = await response.json();
          set({ responseLatencies });
        }
      },

      updateConfig: async (config) => {
        const { serverURL } = get();

        const response = await fetch(
          `${serverURL.replace(/\/$/, "")}/api/dashboard/config`,
          {
            method: "POST",
            body: JSON.stringify(config),
          }
        );

        if (response.ok) {
          const { config } = await response.json();
          set({ config });
        }
      },

      fetchAll: async () => {
        const {
          getConfig,
          getTopRpcMethods,
          getEndpointsData,
          getEndpointsList,
          getLogs,
          getRequestData,
          getRequestRates,
          getResponseLatencies,
        } = get();

        try {
          await Promise.allSettled([
            getConfig(),
            getTopRpcMethods(),
            getEndpointsData(),
            getEndpointsList(),
            getLogs(),
            getRequestData(),
            getRequestRates(),
            getResponseLatencies(),
          ]);
        } catch (error) {
          console.error("Failed to fetch stats:", error);
        }
      },
    }),
    {
      name: "serverUrl",
      partialize: (state) => ({
        serverURL: state.serverURL,
      }),
    }
  )
);
