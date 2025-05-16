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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  ExternalLink,
  MoreVertical,
  Plus,
} from "lucide-react";
import { useStatsStore } from "@/lib/store";
import Link from "next/link";
import { useState } from "react";
import {
  ConfigOptions,
  SimpleEndpoint,
  SimpleEndpointRecord,
  WeightedEndpoint,
  WeightedEndpointRecord,
} from "@/types/store";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NetworkType } from "@/types/dashboard";

export default function Endpoints() {
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

  const allEndpoints = endpointsData.map((endpoint, i) => (
    <TableRow key={i}>
      <TableCell className="max-w-[200px] truncate">
        <div className="flex items-center">
          <span className="truncate">{endpoint.key}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
            <Link href={endpoint.key} target="_blank">
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </TableCell>
      <TableCell>{endpoint.value.network}</TableCell>
      <TableCell>
        {endpoint.value.isActive && (
          <Badge className="active" variant="secondary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )}
        {!endpoint.value.isActive && (
          <Badge className="memcached" variant="outline">
            Inactive
          </Badge>
        )}
      </TableCell>
      <TableCell>{endpoint.value.latency} ms</TableCell>
    </TableRow>
  ));

  const activeEndpoints = endpointsData.map(
    (endpoint, i) =>
      endpoint.value.isActive && (
        <TableRow key={i}>
          <TableCell className="max-w-[200px] truncate">
            <div className="flex items-center">
              <span className="truncate">{endpoint.key}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                <Link href={endpoint.key} target="_blank">
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </TableCell>
          <TableCell>{endpoint.value.network}</TableCell>
          <TableCell>
            <Badge className="active" variant="secondary">
              <CheckCircle className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </TableCell>
          <TableCell>{endpoint.value.latency} ms</TableCell>
        </TableRow>
      )
  );

  const inActiveEndpoints = endpointsData.map(
    (endpoint, i) =>
      !endpoint.value.isActive && (
        <TableRow key={i}>
          <TableCell className="max-w-[200px] truncate">
            <div className="flex items-center">
              <span className="truncate">{endpoint.key}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                <Link href={endpoint.key} target="_blank">
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </TableCell>
          <TableCell>{endpoint.value.network}</TableCell>
          <TableCell>
            <Badge className="memcached" variant="outline">
              Inactive
            </Badge>
          </TableCell>
          <TableCell>{endpoint.value.latency} ms</TableCell>
        </TableRow>
      )
  );

  return (
    <div className="space-y-6 text-white pt-4 bg-[#050816] px-6 border-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal tracking-tight inter mt-3 ">
            Endpoints
          </h1>
          <p className="text-muted-foreground mt-5">
            Manage RPC endpoints for your blockchain networks
          </p>
        </div>
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

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-[#202020]">
          <TabsTrigger
            value="all"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            All Endpoints
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="inactive"
            className="text-white data-[state=active]:text-black data-[state=active]:bg-white"
          >
            Inactive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                RPC Endpoints
              </CardTitle>
              <CardDescription>
                Manage and monitor your RPC endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">URL</TableHead>
                    <TableHead className="text-white">Network</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{allEndpoints}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 ">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">URL</TableHead>
                    <TableHead className="text-white">Network</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{activeEndpoints}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4  ">
          <Card className=" text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 ">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">URL</TableHead>
                    <TableHead className="text-white">Network</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{inActiveEndpoints}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="degraded" className="space-y-4 text-white">
          <Card className=" text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 ">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="text-white">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Network</TableHead>
                    <TableHead className="text-white">URL</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Latency</TableHead>
                    <TableHead className="text-white">Last Check</TableHead>
                    <TableHead className="text-right text-white">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mainnet RPC 3</TableCell>
                    <TableCell>Mainnet</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <div className="flex items-center">
                        <span className="truncate">
                          https://rpc.ankr.com/solana
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="available" variant="secondary">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Degraded
                      </Badge>
                    </TableCell>
                    <TableCell>128ms</TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />1 min ago
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
