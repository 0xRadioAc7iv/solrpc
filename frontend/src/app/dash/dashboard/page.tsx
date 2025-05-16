"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Database, Shield } from "lucide-react";
import { EndpointList } from "@/components/endpoint-list";
import { StatusOverview } from "@/components/status-overview";
import { RequestMetrics } from "@/components/request-metrics";
import SearchBar from "@/components/SearchBar";
import { useStatsStore } from "@/lib/store";
import { Endpoint } from "@/types/dashboard";

export default function Home() {
  const {
    config,
    endpoints,
    requestSuccessRate,
    responseLatencies,
    endpointsData,
  } = useStatsStore();

  return (
    <div className="border border-black text-white pt-16 bg-[#050816] px-6">
      <SearchBar />
      <div>
        <h1 className="text-2xl font-normal tracking-tight inter mt-3 ">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-5">
          Monitor and manage your Solana RPC aggregator
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 py-3">
        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Endpoints
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {config?.network === "devnet"
                ? endpoints?.devnet.length
                : endpoints?.mainnet.length}
            </div>
            <p className="text-sm">
              {endpointsData.reduce(
                (sum, endpoint) => (endpoint.value.isActive ? sum + 1 : sum),
                0
              )}
              active,{" "}
              {endpointsData.reduce(
                (sum, endpoint) => (!endpoint.value.isActive ? sum + 1 : sum),
                0
              )}{" "}
              inactive
            </p>
          </CardContent>
        </Card>

        <Card className="custom-glow bg-[#050816] text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {requestSuccessRate > 0 ? requestSuccessRate : 0}
            </div>
            <p className="text-sm">Latest aggregated rate</p>
          </CardContent>
        </Card>

        <Card className="bg-[#050816] custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Avg. Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {responseLatencies.length > 0
                ? (
                    responseLatencies.reduce(
                      (sum, item) => sum + item.latency,
                      0
                    ) / responseLatencies.length
                  ).toFixed(2)
                : 0}
              ms
            </div>
            <p className="text-sm">Based on recent data</p>
          </CardContent>
        </Card>

        <Card className="bg-[#050816] text-white custom-glow rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Blocked Requests
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">—</div>
            <p className="text-sm">Not available yet</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 text-white">
        <TabsList className="mt-8 bg-[#202020] ">
          <TabsTrigger
            value="overview"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white cursor-pointer"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="endpoints"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white cursor-pointer"
          >
            Endpoints
          </TabsTrigger>
          <TabsTrigger
            value="metrics"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white cursor-pointer"
          >
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatusOverview />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <EndpointList />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <RequestMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
