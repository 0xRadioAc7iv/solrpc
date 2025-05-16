"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStatsStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StatusOverview() {
  const { config } = useStatsStore();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-normal text-slate-300 inter">
          System Status
        </h2>
        <Select defaultValue="mainnet">
          <SelectTrigger className="w-[180px] custom-get-started-button">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent className="custom-get-started-button">
            <SelectItem value="mainnet">Mainnet-Beta</SelectItem>
            <SelectItem value="devnet">Devnet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="bg-purple-600/2 backdrop-blur-lg shadow-xl border border-purple-800/20 text-white">
          <CardHeader>
            <CardTitle className="text-base">Load Balancing</CardTitle>
            <CardDescription>
              Current algorithm:{" "}
              {config?.balancingOptions.http.method.replace("-", " ")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className={"h-5 w-5 text-green-500"} />
                  <span>Round-Robin</span>
                </div>
                <Badge
                  className={cn(
                    `${
                      config?.balancingOptions.http.method === "round-robin"
                        ? "active"
                        : "available"
                    } font-normal inter`
                  )}
                >
                  {config?.balancingOptions.http.method === "round-robin"
                    ? "Active"
                    : "Available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Least Connections</span>
                </div>
                <Badge
                  className={cn(
                    `${
                      config?.balancingOptions.http.method ===
                      "least-connections"
                        ? "active"
                        : "available"
                    } font-normal inter`
                  )}
                >
                  {config?.balancingOptions.http.method === "least-connections"
                    ? "Active"
                    : "Available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Least Response Time</span>
                </div>
                <Badge
                  className={cn(
                    `${
                      config?.balancingOptions.http.method === "least-latency"
                        ? "active"
                        : "available"
                    } font-normal inter`
                  )}
                >
                  {config?.balancingOptions.http.method === "least-latency"
                    ? "Active"
                    : "Available"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Weighted</span>
                </div>
                <Badge
                  className={cn(
                    `${
                      config?.balancingOptions.http.method === "weighted"
                        ? "active"
                        : "available"
                    } font-normal inter`
                  )}
                >
                  {config?.balancingOptions.http.method === "weighted"
                    ? "Active"
                    : "Available"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20  text-white">
          <CardHeader>
            <CardTitle className="text-base">Caching Status</CardTitle>
            <CardDescription>
              Current method: {config?.cachingMethod.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>In-Memory</span>
                </div>
                <Badge
                  className={
                    config?.cachingMethod.type === "memory"
                      ? "active"
                      : "memcached"
                  }
                >
                  {config?.cachingMethod.type === "memory"
                    ? "Active"
                    : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Redis</span>
                </div>
                <Badge
                  className={
                    config?.cachingMethod.type === "redis"
                      ? "active"
                      : "memcached"
                  }
                >
                  {config?.cachingMethod.type === "redis"
                    ? "Active"
                    : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Memcached</span>
                </div>
                <Badge
                  className={
                    config?.cachingMethod.type === "memcached"
                      ? "active"
                      : "memcached"
                  }
                >
                  {config?.cachingMethod.type === "memcached"
                    ? "Active"
                    : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
