"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Database, Shield } from "lucide-react";
import { EndpointList } from "@/components/endpoint-list";
import { StatusOverview } from "@/components/status-overview";
import { RequestMetrics } from "@/components/request-metrics";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="border border-black text-white pt-16 bg-[#050816] px-6">
      <SearchBar />
      <div>
        <h1 className="text-4xl font-black tracking-tight instrument-serif-regular-italic mt-3 ">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-5">
          Monitor and manage your Solana RPC aggregator
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-3">
        <Card className=" card-glow-bg text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Endpoints 
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">12</div>
            <p className="text-sm">8 active, 4 inactive</p>
          </CardContent>
        </Card>
        <Card className="bg-[#050816] text-white  rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">99.8%</div>
            <p className="text-sm">+0.2% from last hour</p>
          </CardContent>
        </Card>
        <Card className="bg-[#050816] text-white  rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Avg. Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">124ms</div>
            <p className="text-sm">-18ms from last hour</p>
          </CardContent>
        </Card>
        <Card className="bg-[#050816] text-white  rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Blocked Requests
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">24</div>
            <p className="text-sm">Last 24 hours</p>
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
          <EndpointList />
        </TabsContent>
        <TabsContent value="metrics" className="space-y-4">
          <RequestMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
