"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  CheckCircle,
  Info,
  RefreshCw,
  Save,
  Server,
} from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function LoadBalancing() {
  const [loadBalancingEnabled, setLoadBalancingEnabled] = useState(true);
  const [healthCheckInterval, setHealthCheckInterval] = useState(30);
  const [algorithm, setAlgorithm] = useState("round-robin");

  return (
    <div className="space-y-6 text-white bg-[#050816] px-6 pt-16">
      <SearchBar />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight instrument-serif-regular-italic mt-3">
            Load Balancing
          </h1>
          <p className="text-muted-foreground">
            Configure how requests are distributed across RPC endpoints
          </p>
        </div>
        <Button className="custom-get-started-button">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      <Tabs
        defaultValue="settings"
        className="space-y-4 bg-slate-950 text-white"
      >
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="health">Health Checks</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-black text-white border border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Load Balancing Configuration
              </CardTitle>
              <CardDescription>
                Configure how requests are distributed across multiple RPC
                endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Enable Load Balancing</h3>
                  <p className="text-sm text-muted-foreground">
                    Distribute requests across multiple endpoints
                  </p>
                </div>
                <Switch
                  checked={loadBalancingEnabled}
                  onCheckedChange={setLoadBalancingEnabled}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Load Balancing Algorithm</h3>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round-robin">Round Robin</SelectItem>
                    <SelectItem value="weighted">Weighted</SelectItem>
                    <SelectItem value="least-connections">
                      Least Connections
                    </SelectItem>
                    <SelectItem value="response-time">Response Time</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {algorithm === "round-robin" &&
                    "Distributes requests sequentially across all endpoints"}
                  {algorithm === "weighted" &&
                    "Distributes requests based on endpoint capacity weights"}
                  {algorithm === "least-connections" &&
                    "Routes to endpoint with fewest active connections"}
                  {algorithm === "response-time" &&
                    "Routes to endpoint with fastest recent response times"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Failover Threshold</h3>
                  <Badge variant="outline">3 failures</Badge>
                </div>
                <Slider defaultValue={[3]} max={10} step={1} className="py-4" />
                <p className="text-sm text-muted-foreground">
                  Number of failures before an endpoint is marked as down
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Auto Recovery</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically recover endpoints after they become healthy
                  again
                </p>
              </div>

              <Button className="w-full custom-get-started-button h-10">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-gray-800">
            <CardHeader>
              <CardTitle>Active Endpoints</CardTitle>
              <CardDescription>
                Endpoints currently included in the load balancing pool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Mainnet RPC 1",
                    status: "healthy",
                    latency: "45ms",
                    weight: 10,
                  },
                  {
                    name: "Mainnet RPC 2",
                    status: "healthy",
                    latency: "62ms",
                    weight: 8,
                  },
                  {
                    name: "Mainnet RPC 3",
                    status: "degraded",
                    latency: "128ms",
                    weight: 5,
                  },
                ].map((endpoint, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{endpoint.name}</h4>
                        {endpoint.status === "healthy" ? (
                          <Badge
                            className="ml-2 bg-green-500"
                            variant="secondary"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Healthy
                          </Badge>
                        ) : (
                          <Badge
                            className="ml-2 bg-yellow-500"
                            variant="secondary"
                          >
                            <Info className="mr-1 h-3 w-3" />
                            Degraded
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Latency: {endpoint.latency} • Weight: {endpoint.weight}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-black text-white">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Check Configuration</CardTitle>
              <CardDescription>
                Configure how endpoint health is monitored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Health Check Interval</h3>
                  <Badge variant="outline">{healthCheckInterval} seconds</Badge>
                </div>
                <Slider
                  value={[healthCheckInterval]}
                  onValueChange={(value) => setHealthCheckInterval(value[0])}
                  min={5}
                  max={120}
                  step={5}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  How frequently to check endpoint health
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Health Check Method</h3>
                <Select defaultValue="getHealth">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getHealth">
                      getHealth RPC Method
                    </SelectItem>
                    <SelectItem value="getVersion">
                      getVersion RPC Method
                    </SelectItem>
                    <SelectItem value="custom">Custom RPC Method</SelectItem>
                    <SelectItem value="http">HTTP Status Check</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Method used to determine if an endpoint is healthy
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Timeout Threshold</h3>
                  <Badge variant="outline">2000ms</Badge>
                </div>
                <Slider
                  defaultValue={[2000]}
                  min={500}
                  max={10000}
                  step={500}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time to wait for health check response
                </p>
              </div>

              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Health Check Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Load Distribution Metrics
              </CardTitle>
              <CardDescription>
                View how requests are being distributed across endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Load distribution chart will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
