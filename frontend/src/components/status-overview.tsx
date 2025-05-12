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

export function StatusOverview() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">System Status</h2>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-black border border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-base">Load Balancing</CardTitle>
            <CardDescription>
              Current algorithm: Least Response Time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Round-Robin</span>
                </div>
                <Badge variant="outline">Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Least Connections</span>
                </div>
                <Badge variant="outline">Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Least Response Time</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Weighted</span>
                </div>
                <Badge variant="outline">Available</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-base">Caching Status</CardTitle>
            <CardDescription>Current method: In-Memory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>In-Memory</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Redis</span>
                </div>
                <Badge variant="outline" className="text-white">
                  Not Configured
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>Memcached</span>
                </div>
                <Badge variant="outline" className="text-white">
                  Disabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
