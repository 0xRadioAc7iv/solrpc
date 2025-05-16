"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useStatsStore } from "@/lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const requestVolumeData = [
  { date: "Mon", requests: 120 },
  { date: "Tue", requests: 200 },
  { date: "Wed", requests: 150 },
  { date: "Thu", requests: 300 },
  { date: "Fri", requests: 280 },
  { date: "Sat", requests: 180 },
  { date: "Sun", requests: 220 },
];

const rpcMethodsData = [
  { method: "getBalance", count: 400 },
  { method: "getTransaction", count: 300 },
  { method: "getAccountInfo", count: 200 },
  { method: "getSlot", count: 150 },
];

const endpointPerformanceData = [
  { endpoint: "RPC 1", latency: 45 },
  { endpoint: "RPC 2", latency: 70 },
  { endpoint: "RPC 3", latency: 32 },
];

export default function Analytics() {
  const { requestData, requestErrorRate, responseLatencies, logs, clearLogs } =
    useStatsStore();

  return (
    <div className="space-y-6 text-white bg-[#050816] px-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal tracking-tight inter mt-3 ">
            Analytics & Logs
          </h1>
          <p className="text-muted-foreground mt-5">
            Monitor RPC usage and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-black text-white custom-get-started-button"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Last 7 Days
          </Button>
          <Button
            variant="outline"
            className="bg-black text-white custom-get-started-button"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-black text-white custom-get-started-button"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requestData?.length}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {responseLatencies.length > 0
                ? (
                    responseLatencies.reduce(
                      (sum, item) => sum + item.latency,
                      0
                    ) / responseLatencies.length
                  ).toFixed(2)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              -8.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requestErrorRate > 0 ? requestErrorRate : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +0.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="custom-glow text-white rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blocked Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,841</div>
            <p className="text-xs text-muted-foreground">
              +24.5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#202020]">
          <TabsTrigger
            value="overview"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Requests
          </TabsTrigger>
          <TabsTrigger
            value="errors"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Errors
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className=" text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle>Request Volume</CardTitle>
              <CardDescription>
                Total requests over time across all endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border border-slate-800 p-4 bg-[#1d0e2e7c]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={requestVolumeData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRequests"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                    <XAxis dataKey="date" stroke="#a3a3c2" />
                    <YAxis stroke="#a3a3c2" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f1f3a",
                        borderColor: "#8b5cf6",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#c7d2fe" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="requests"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      dot={{ stroke: "#1f1f3a", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
              <CardHeader>
                <CardTitle>Top RPC Methods</CardTitle>
                <CardDescription>
                  Most frequently used RPC methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border border-slate-800 p-4 bg-[#1d0e2e7c]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rpcMethodsData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRPC"
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
                            stopColor="#a855f7"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                      <XAxis dataKey="method" stroke="#a3a3c2" />
                      <YAxis stroke="#a3a3c2" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1f3a",
                          borderColor: "#a855f7",
                          color: "#fff",
                        }}
                        labelStyle={{ color: "#e9d5ff" }}
                      />
                      <Bar
                        dataKey="count"
                        fill="url(#colorRPC)"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
              <CardHeader>
                <CardTitle>Endpoint Performance</CardTitle>
                <CardDescription>
                  Response time comparison across endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border border-slate-800 bg-[#1d0e2e7c]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={endpointPerformanceData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorLatency"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="5%"
                            stopColor="#a855f7"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#a855f7"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                      <XAxis type="number" stroke="#a3a3c2" />
                      <YAxis
                        dataKey="endpoint"
                        type="category"
                        stroke="#a3a3c2"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1f3a",
                          borderColor: "#a855f7",
                          color: "#fff",
                        }}
                        labelStyle={{ color: "#e9d5ff" }}
                      />
                      <Bar
                        dataKey="latency"
                        fill="url(#colorLatency)"
                        barSize={50}
                        radius={[0, 6, 6, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>
                Latest RPC requests processed by your aggregator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Time</TableHead>
                    <TableHead className="text-white">Method</TableHead>
                    <TableHead className="text-white">Endpoint</TableHead>
                    <TableHead className="text-white">Response Time</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      time: "2023-09-15 14:32:45",
                      method: "getBalance",
                      endpoint: "Mainnet RPC 1",
                      responseTime: "42ms",
                      status: "success",
                      ip: "192.168.1.105",
                    },
                    {
                      time: "2023-09-15 14:32:42",
                      method: "getTransaction",
                      endpoint: "Mainnet RPC 2",
                      responseTime: "78ms",
                      status: "success",
                      ip: "192.168.1.106",
                    },
                    {
                      time: "2023-09-15 14:32:40",
                      method: "getAccountInfo",
                      endpoint: "Mainnet RPC 1",
                      responseTime: "35ms",
                      status: "success",
                      ip: "192.168.1.107",
                    },
                    {
                      time: "2023-09-15 14:32:38",
                      method: "getRecentBlockhash",
                      endpoint: "Mainnet RPC 3",
                      responseTime: "145ms",
                      status: "error",
                      ip: "192.168.1.108",
                    },
                    {
                      time: "2023-09-15 14:32:35",
                      method: "getSlot",
                      endpoint: "Mainnet RPC 1",
                      responseTime: "28ms",
                      status: "success",
                      ip: "192.168.1.109",
                    },
                  ].map((request, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-muted-foreground text-xs">
                        {request.time}
                      </TableCell>
                      <TableCell className="font-medium">
                        {request.method}
                      </TableCell>
                      <TableCell>{request.endpoint}</TableCell>
                      <TableCell>{request.responseTime}</TableCell>
                      <TableCell>
                        {request.status === "success" ? (
                          <Badge className="active" variant="secondary">
                            Success
                          </Badge>
                        ) : (
                          <Badge className="memcached" variant="secondary">
                            Error
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {request.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4 text-white">
          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader>
              <CardTitle>Error Log</CardTitle>
              <CardDescription>Recent errors and exceptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      time: "2023-09-15 14:32:38",
                      type: "Timeout",
                      method: "getRecentBlockhash",
                      endpoint: "Mainnet RPC 3",
                      message: "Request timed out after 5000ms",
                    },
                    {
                      time: "2023-09-15 14:30:12",
                      type: "RPC Error",
                      method: "getAccountInfo",
                      endpoint: "Mainnet RPC 2",
                      message: "Invalid parameter: missing account key",
                    },
                    {
                      time: "2023-09-15 14:28:45",
                      type: "Connection Error",
                      method: "getBalance",
                      endpoint: "Mainnet RPC 3",
                      message: "Connection refused",
                    },
                  ].map((error, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-muted-foreground text-xs">
                        {error.time}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="memcached">
                          {error.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{error.method}</TableCell>
                      <TableCell>{error.endpoint}</TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {error.message}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] custom-get-started-button">
                <SelectValue placeholder="Log level" />
              </SelectTrigger>
              <SelectContent className="custom-get-started-button">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="text-red-600 bg-red-200 border border-red-900"
              onClick={clearLogs}
            >
              Clear Logs
              <Trash2 className="mr-2 h-4 w-4" />
            </Button>
          </div>

          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                Detailed system and application logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md bg-black p-4 font-mono text-xs text-green-400 overflow-auto">
                {logs.map((log, index) => {
                  return (
                    <div key={index} id={index.toString()}>
                      <div>
                        [{new Date(log.timestamp).toISOString().toString()}] [
                        {log.type}]{" "}
                        {typeof log.entry === "object"
                          ? log.entry.type
                          : log.entry}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
