// Merged final SettingsPage including Load Balancing tabs
// Combines General, Advanced, and Load Balancing configurations

"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Database,
  Info,
  Save,
  Server,
  SettingsIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SettingsPage() {
  const [loadBalancingEnabled, setLoadBalancingEnabled] = useState(true);
  const [healthCheckInterval, setHealthCheckInterval] = useState(30);
  const [algorithm, setAlgorithm] = useState("round-robin");

  return (
    <div className="space-y-6 text-white bg-[#050816] px-6 pt-16">
      <SearchBar />
      <div>
        <h1 className="text-2xl font-normal tracking-tight inter mt-3">
          Settings
        </h1>
        <p className="text-muted-foreground mt-5">
          Manage your RPC aggregator settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-3">
        <TabsList className="grid grid-cols-3 max-w-3xl md:w-auto bg-[#202020]">
          <TabsTrigger
            value="general"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Advanced
          </TabsTrigger>
          <TabsTrigger
            value="load-balancing"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Load Balancing
          </TabsTrigger>
        </TabsList>

        {/* GENERAL SETTINGS */}
        <TabsContent value="general" className="space-y-4">
          {/* General Settings Card */}
          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic settings for your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="instance-name">Instance Name</Label>
                  <Input
                    id="instance-name"
                    className="border border-gray-200"
                    defaultValue="SolRPC Aggregator"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="default-network">Default Network</Label>
                  <Select defaultValue="mainnet">
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* Cache Settings Card */}
          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle>Cache Settings</CardTitle>
              <CardDescription>
                Configure caching behavior for RPC responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-cache">Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">
                    Cache RPC responses to improve performance
                  </p>
                </div>
                <Switch id="enable-cache" defaultChecked />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cache-ttl">Cache TTL</Label>
                  <span className="text-sm">30 seconds</span>
                </div>
                <Slider
                  id="cache-ttl"
                  defaultValue={[30]}
                  max={300}
                  step={5}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Time to live for cached responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cacheable-methods">Cacheable Methods</Label>
                <Select defaultValue="read-only">
                  <SelectTrigger>
                    <SelectValue placeholder="Select methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read-only">Read-only Methods</SelectItem>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="custom">Custom Selection</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Which RPC methods should be cached
                </p>
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Cache Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {/* Advanced Settings Card */}
          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure advanced settings for your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">5000ms</span>
                </div>
                <Slider
                  id="timeout"
                  defaultValue={[5000]}
                  min={1000}
                  max={30000}
                  step={500}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time to wait for RPC responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concurrency">Max Concurrency</Label>
                <Select defaultValue="100">
                  <SelectTrigger>
                    <SelectValue placeholder="Select concurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 requests</SelectItem>
                    <SelectItem value="100">100 requests</SelectItem>
                    <SelectItem value="250">250 requests</SelectItem>
                    <SelectItem value="500">500 requests</SelectItem>
                    <SelectItem value="1000">1000 requests</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Maximum concurrent requests to process
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="websocket-support">WebSocket Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable WebSocket connections for subscriptions
                  </p>
                </div>
                <Switch id="websocket-support" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging for debugging
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-retention">Log Retention</Label>
                <Select defaultValue="7d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="365d">1 Year</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How long to retain system logs
                </p>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>

          {/* Database Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription>
                Configure database connection and storage settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <Select defaultValue="postgres">
                    <SelectTrigger>
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-port">Database Port</Label>
                  <Input id="db-port" defaultValue="5432" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" defaultValue="solrpc" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-user">Database User</Label>
                  <Input id="db-user" defaultValue="solrpc_user" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="db-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic database backups
                  </p>
                </div>
                <Switch id="db-backup" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How often to create database backups
                </p>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Database Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOAD BALANCING */}
        <TabsContent value="load-balancing" className="space-y-2">
          <Tabs
            defaultValue="settings"
            className=" bg-slate-950 text-white rounded-lg pt-1"
          >
            <TabsList className="max-w-sm sm:w-auto mb-3 custom-get-started-button">
              <TabsTrigger value="settings" className="flex-1 ">
                Settings
              </TabsTrigger>
              <TabsTrigger value="health" className="flex-1">
                Health Checks
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex-1 ">
                Metrics
              </TabsTrigger>
            </TabsList>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Server className="mr-2 h-5 w-5" />
                    Load Balancing Configuration
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Configure how requests are distributed across multiple RPC
                    endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Enable Load Balancing</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
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
                        <SelectItem value="response-time">
                          Response Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs sm:text-sm text-muted-foreground">
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
                      <Badge className="memcached text-xs">3 failures</Badge>
                    </div>
                    <Slider
                      defaultValue={[3]}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Number of failures before an endpoint is marked as down
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Auto Recovery</h3>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
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

              <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">
                    Active Endpoints
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Endpoints currently included in the load balancing pool
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
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
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-medium">{endpoint.name}</h4>
                            {endpoint.status === "healthy" ? (
                              <Badge
                                className="active text-xs"
                                variant="secondary"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Healthy
                              </Badge>
                            ) : (
                              <Badge
                                className="available text-xs"
                                variant="secondary"
                              >
                                <Info className="mr-1 h-3 w-3" />
                                Degraded
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Latency: {endpoint.latency} • Weight:{" "}
                            {endpoint.weight}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-900 text-white border border-gray-700 cursor-pointer hover:bg-gray-600 hover:text-slate-500 font-normal text-xs h-8"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive bg-red-200 cursor-pointer font-sans text-xs h-8"
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

            {/* Health Checks Tab */}
            <TabsContent value="health" className="space-y-4">
              <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">
                    Health Check Configuration
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Configure how endpoint health is monitored
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-4 sm:px-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Health Check Interval</h3>
                      <Badge variant="outline" className="text-xs">
                        {healthCheckInterval} seconds
                      </Badge>
                    </div>
                    <Slider
                      value={[healthCheckInterval]}
                      onValueChange={(value) =>
                        setHealthCheckInterval(value[0])
                      }
                      min={5}
                      max={120}
                      step={5}
                      className="py-4"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
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
                        <SelectItem value="custom">
                          Custom RPC Method
                        </SelectItem>
                        <SelectItem value="http">HTTP Status Check</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Method used to determine if an endpoint is healthy
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Timeout Threshold</h3>
                      <Badge variant="outline" className="text-xs">
                        2000ms
                      </Badge>
                    </div>
                    <Slider
                      defaultValue={[2000]}
                      min={500}
                      max={10000}
                      step={500}
                      className="py-4"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Maximum time to wait for health check response
                    </p>
                  </div>

                  <Button className="w-full custom-get-started-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Health Check Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-4">
              <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <BarChart className="mr-2 h-5 w-5" />
                    Load Distribution Metrics
                  </CardTitle>
                  <CardDescription className="text-sm">
                    View how requests are being distributed across endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="h-[200px] sm:h-[300px] rounded-md border border-gray-800 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "RPC 1", requests: 400 },
                          { name: "RPC 2", requests: 300 },
                          { name: "RPC 3", requests: 200 },
                          { name: "RPC 4", requests: 278 },
                          { name: "RPC 5", requests: 189 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPurple"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#a855f7"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#6b21a8"
                              stopOpacity={0.6}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#c084fc" />
                        <YAxis stroke="#c084fc" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e1b4b",
                            borderColor: "#7c3aed",
                            color: "#fff",
                          }}
                        />
                        <Bar
                          dataKey="requests"
                          fill="url(#colorPurple)"
                          animationDuration={800}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
