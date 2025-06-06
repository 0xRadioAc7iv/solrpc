"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, ChevronRight, Network } from "lucide-react";
import { useStatsStore } from "@/lib/store";
import Link from "next/link";

export default function Networks() {
  const { config, endpoints, responseLatencies } = useStatsStore();

  return (
    <div className="space-y-4 sm:space-y-6 text-white pt-4 bg-[#050816] px-3 sm:px-6 border-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal tracking-tight inter mt-2 sm:mt-3">
            Active Networks
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-5">
            Manage the current blockchain network and its configuration
          </p>
        </div>
      </div>

      {config?.network === "mainnet" ? (
        <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Network className="mr-2 h-5 w-5" />
              Solana Mainnet
            </CardTitle>
            <CardDescription className="text-sm">
              Production Solana blockchain network
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Status
                  </Label>
                  <div className="flex items-center">
                    <Badge className="active text-xs" variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Operational
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Active Endpoints
                  </Label>
                  <div className="font-medium text-sm">
                    {(endpoints?.mainnet.length as number) > 0
                      ? endpoints?.mainnet.length
                      : 0}{" "}
                    endpoints
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Current Slot
                  </Label>
                  <div className="font-medium text-sm">234,567,890</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Average Response Time
                  </Label>
                  <div className="font-medium text-sm">
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
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <Button
                  className="bg-slate-900 font-normal border border-slate-700/40 shadow-lg cursor-pointer w-full sm:w-auto"
                  size="sm"
                >
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                  <Link href="/dash/endpoints">
                    <Button
                      variant="outline"
                      size="sm"
                      className="custom-get-started-button w-full sm:w-auto"
                    >
                      Manage Endpoints
                    </Button>
                  </Link>
                  <Button size="sm" className="w-full sm:w-auto">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Network className="mr-2 h-5 w-5" />
              Solana Devnet
            </CardTitle>
            <CardDescription className="text-sm">
              Development Solana blockchain network
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Status
                  </Label>
                  <div className="flex items-center">
                    <Badge className="active text-xs" variant="secondary">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Operational
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Active Endpoints
                  </Label>
                  <div className="font-medium text-sm">
                    {(endpoints?.devnet.length as number) > 0
                      ? endpoints?.devnet.length
                      : 0}{" "}
                    endpoints
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Current Slot
                  </Label>
                  <div className="font-medium text-sm">123,456,789</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal text-muted-foreground">
                    Average Response Time
                  </Label>
                  <div className="font-medium text-sm">
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
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <Button
                  className="bg-slate-900 font-normal border border-slate-700/40 shadow-lg cursor-pointer w-full sm:w-auto"
                  size="sm"
                >
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                  <Link href="/dash/endpoints">
                    <Button
                      variant="outline"
                      size="sm"
                      className="custom-get-started-button w-full sm:w-auto"
                    >
                      Manage Endpoints
                    </Button>
                  </Link>
                  <Button size="sm" className="w-full sm:w-auto">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
