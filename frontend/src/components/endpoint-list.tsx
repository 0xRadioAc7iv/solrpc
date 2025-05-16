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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { NetworkType } from "@/types/dashboard";
import { useStatsStore } from "@/lib/store";
import {
  ConfigOptions,
  SimpleEndpoint,
  SimpleEndpointRecord,
  WeightedEndpoint,
  WeightedEndpointRecord,
} from "@/types/store";

export function EndpointList() {
  const { config, endpointsData, updateConfig } = useStatsStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<{
    url: string;
    network: "devnet" | "mainnet";
    weight: number;
  }>({
    url: "",
    network: "devnet",
    weight: 0,
  });

  const openAddDialog = () => {
    setEditingId(null);
    setFormState({
      url: "",
      network: "devnet",
      weight: 0,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (config) {
      const isDevnet = config.network === "devnet";
      const isWeighted = config.balancingOptions.http.method === "weighted";

      const newBalancingOptions = structuredClone(config.balancingOptions);

      const networkKey = isDevnet ? "devnet" : "mainnet";

      if (isWeighted) {
        const endpoints = newBalancingOptions.http
          .endpoints as WeightedEndpointRecord;
        const newEndpoint: WeightedEndpoint = {
          url: formState.url,
          weight: formState.weight,
        };
        endpoints[networkKey].push(newEndpoint);
      } else {
        const endpoints = newBalancingOptions.http
          .endpoints as SimpleEndpointRecord;
        const newEndpoint: SimpleEndpoint = formState.url;
        endpoints[networkKey].push(newEndpoint);
      }

      const newConfig: ConfigOptions = {
        network: config.network,
        balancingOptions: newBalancingOptions,
        cachingMethod: config.cachingMethod,
        maxRetries: config.maxRetries,
      };

      await updateConfig(newConfig);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">RPC Endpoints</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openAddDialog}
              size="lg"
              className="custom-get-started-button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#050816] text-white rounded-lg border border-slate-800">
            <DialogHeader>
              <DialogTitle className="inter tracking-tight">
                {editingId ? "Edit Endpoint" : "Add New Endpoint"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 font-light">
                <Label>URL</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formState.url}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      url: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="flex flex-col gap-2 font-light">
                <Label>Network</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formState.network}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      network: e.target.value as NetworkType,
                    })
                  }
                >
                  {Object.values(NetworkType).map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>
              </div>
              {config?.balancingOptions.http.method === "weighted" && (
                <div className="flex flex-col gap-2 font-light">
                  <Label>Weight</Label>
                  <Input
                    type="number"
                    value={formState.weight}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        weight: Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={handleSave}
                className="custom-get-started-button px-12"
              >
                {editingId ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-slate-900 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">URL</TableHead>
              <TableHead className="text-white">Network</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Latency</TableHead>
              <TableHead className="text-white">Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpointsData.map((endpoint) => (
              <TableRow key={endpoint.key}>
                <TableCell className="font-mono text-sm">
                  {endpoint.key}
                </TableCell>
                <TableCell>{endpoint.value.network}</TableCell>
                <TableCell>
                  <Badge
                    className={`
                      ${endpoint.value.isActive ? "active" : ""}
                      ${!endpoint.value.isActive ? "memcached" : ""}
                    `}
                  >
                    {endpoint.value.isActive ? "Enabled" : "Disabled"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {endpoint.value.isActive
                    ? `${endpoint.value.latency} ms`
                    : "-"}
                </TableCell>
                <TableCell>
                  {(endpoint.value.weight as number) > 0
                    ? endpoint.value.weight
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
