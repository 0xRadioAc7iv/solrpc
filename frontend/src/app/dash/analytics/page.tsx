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
  LineChart,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useStatsStore } from "@/lib/store";

export default function Analytics() {
  const { requestData, requestErrorRate, responseLatencies, logs } =
    useStatsStore();

  return (
    <div className="space-y-6 text-white bg-[#050816] px-6 pt-16">
      <SearchBar />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight instrument-serif-regular-italic mt-3">
            Analytics & Logs
          </h1>
          <p className="text-muted-foreground">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black text-white">
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
        <Card className="bg-black text-white">
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

        <Card className="bg-black text-white">
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

        <Card className="bg-black text-white">
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
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Request Volume</CardTitle>
              <CardDescription>
                Total requests over time across all endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Request volume chart will appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle>Top RPC Methods</CardTitle>
                <CardDescription>
                  Most frequently used RPC methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    RPC methods chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black text-white">
              <CardHeader>
                <CardTitle>Endpoint Performance</CardTitle>
                <CardDescription>
                  Response time comparison across endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Endpoint performance chart will appear here
                  </p>
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

          <Card>
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
                    <TableHead>Time</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
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
                          <Badge className="bg-green-500" variant="secondary">
                            Success
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500" variant="secondary">
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

        <TabsContent value="errors" className="space-y-4">
          <Card>
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
                        <Badge
                          variant="outline"
                          className="text-red-500 border-red-500"
                        >
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Log level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Logs
            </Button>
          </div>

          <Card>
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
                    <div id={index.toString()}>
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
