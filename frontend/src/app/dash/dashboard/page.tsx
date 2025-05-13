"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Database, Shield } from "lucide-react";
import { EndpointList } from "@/components/endpoint-list";
import { StatusOverview } from "@/components/status-overview";
import { RequestMetrics } from "@/components/request-metrics";
import SearchBar from "@/components/SearchBar";
import { Endpoint } from "@/types/dashboard";

import {
  getEndpoints,
  getRequestRates,
  getResponseLatency,
} from "@/lib/dashboard";

export default function Home() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [successRate, setSuccessRate] = useState("0%");
  const [responseLatency, setResponseLatency] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [endpointsRes, ratesRes, latencyRes] = await Promise.all([
          getEndpoints(),
          getRequestRates(),
          getResponseLatency(),
        ]);

        const transformedEndpoints: Endpoint[] = endpointsRes.data.map(
          (ep: { url: string; status?: string; latency?: number; weight?: number; active?: boolean }, idx: number) => ({
            id: `${idx}`,
            url: ep.url,
            type: "Public", 
            network: "Mainnet-Beta", 
            status: ep.status || "Online", 
            latency: ep.latency || 0,
            weight: ep.weight || 1,
            enabled: ep.active ?? true, 
          })
        );

        setEndpoints(transformedEndpoints);

        const active = transformedEndpoints.filter((ep) => ep.enabled).length;
        const inactive = transformedEndpoints.length - active;
        setActiveCount(active);
        setInactiveCount(inactive);

        const rawSuccessRate = Number(ratesRes.data.successRate);
        setSuccessRate(isNaN(rawSuccessRate) ? "0%" : `${rawSuccessRate}%`);

        const latencies = latencyRes.data;
        if (Array.isArray(latencies) && latencies.length > 0) {
          const avgLatency = (
            latencies.reduce((a: number, b: number) => a + b, 0) /
            latencies.length
          ).toFixed(2);
          setResponseLatency(Number(avgLatency));
        } else {
          setResponseLatency(0);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#050816] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="border border-black text-white pt-16 bg-[#050816] px-6">
      <SearchBar />
      <div>
        <h1 className="text-4xl font-normal tracking-tight inter mt-3 ">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-5">
          Monitor and manage your Solana RPC aggregator
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-3">
        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Endpoints
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{endpoints.length}</div>
            <p className="text-sm">
              {activeCount} active, {inactiveCount} inactive
            </p>
          </CardContent>
        </Card>

        <Card className="custom-glow bg-[#050816] text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{successRate}</div>
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
            <div className="text-lg font-bold">{responseLatency}ms</div>
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="mt-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatusOverview />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <EndpointList endpoints={endpoints} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <RequestMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
