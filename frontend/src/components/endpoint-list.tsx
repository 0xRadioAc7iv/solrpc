"use client";

import { useState, useEffect } from "react";
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
import { Endpoint } from "@/types/dashboard";

interface EndpointListProps {
  endpoints: Endpoint[];
}

export function EndpointList({ endpoints }: EndpointListProps) {
  const [localEndpoints, setLocalEndpoints] = useState<Endpoint[]>(endpoints);

  useEffect(() => {
    setLocalEndpoints(endpoints);
  }, [endpoints]);

  const toggleEndpoint = (id: string) => {
    setLocalEndpoints(
      localEndpoints.map((endpoint) =>
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
            {localEndpoints.map((endpoint) => (
              <TableRow key={endpoint.id}>
                <TableCell className="font-mono text-xs">
                  {endpoint.url}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-white">
                    {endpoint.type}
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
