"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";

type EndpointType = "Public" | "Private" | "Hosted";
type NetworkType = "Mainnet-Beta" | "Devnet";

interface Endpoint {
  id: string;
  url: string;
  type: EndpointType;
  network: NetworkType;
  status: "Online" | "Offline" | "Degraded";
  latency: number;
  weight: number;
  enabled: boolean;
}

export function EndpointList() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      id: "1",
      url: "https://api.mainnet-beta.solana.com",
      type: "Public",
      network: "Mainnet-Beta",
      status: "Online",
      latency: 132,
      weight: 1,
      enabled: true,
    },
    {
      id: "2",
      url: "https://solana-api.projectserum.com",
      type: "Public",
      network: "Mainnet-Beta",
      status: "Online",
      latency: 145,
      weight: 1,
      enabled: true,
    },
    {
      id: "3",
      url: "https://rpc.ankr.com/solana",
      type: "Public",
      network: "Mainnet-Beta",
      status: "Degraded",
      latency: 210,
      weight: 0.5,
      enabled: true,
    },
    {
      id: "4",
      url: "https://api.devnet.solana.com",
      type: "Public",
      network: "Devnet",
      status: "Online",
      latency: 118,
      weight: 1,
      enabled: true,
    },
    {
      id: "5",
      url: "https://my-private-rpc.example.com",
      type: "Private",
      network: "Mainnet-Beta",
      status: "Offline",
      latency: 0,
      weight: 2,
      enabled: false,
    },
  ]);

  const toggleEndpoint = (id: string) => {
    setEndpoints(
      endpoints.map((endpoint) =>
        endpoint.id === id
          ? { ...endpoint, enabled: !endpoint.enabled }
          : endpoint
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">RPC Endpoints</h2>
        <Button size="lg" className="custom-get-started-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Endpoint
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latency</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Enabled</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpoints.map((endpoint) => (
              <TableRow key={endpoint.id}>
                <TableCell className="font-mono text-xs">
                  {endpoint.url}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-white">
                    {endpoint.type}{" "}
                  </Badge>
                </TableCell>
                <TableCell>{endpoint.network}</TableCell>
                <TableCell>
                  <Badge
                    className="text-white"
                    variant={
                      endpoint.status === "Online"
                        ? "outline"
                        : endpoint.status === "Degraded"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {endpoint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {endpoint.status === "Offline"
                    ? "-"
                    : `${endpoint.latency}ms`}
                </TableCell>
                <TableCell>{endpoint.weight}</TableCell>
                <TableCell>
                  <Switch
                    checked={endpoint.enabled}
                    onCheckedChange={() => toggleEndpoint(endpoint.id)}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Test Connection</DropdownMenuItem>
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
