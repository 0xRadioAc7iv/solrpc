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
import { MoreHorizontal, Plus } from "lucide-react";
import {
  Endpoint,
  EndpointType,
  NetworkType,
  StatusType,
} from "@/types/dashboard";
import { v4 as uuidv4 } from "uuid";

interface EndpointListProps {
  endpoints: Endpoint[];
}

type EndpointFormState = Omit<Endpoint, "id">;

const stringFields: (keyof Pick<EndpointFormState, "url">)[] = ["url"];

export function EndpointList({ endpoints }: EndpointListProps) {
  const [localEndpoints, setLocalEndpoints] = useState<Endpoint[]>(endpoints);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState<EndpointFormState>({
    url: "",
    type: EndpointType.RPC,
    network: NetworkType.MAINNET,
    status: StatusType.ONLINE,
    latency: 0,
    weight: 1,
    enabled: true,
  });

  useEffect(() => {
    setLocalEndpoints(endpoints);
  }, [endpoints]);

  const toggleEndpoint = (id: string) => {
    setLocalEndpoints((prev) =>
      prev.map((endpoint) =>
        endpoint.id === id
          ? { ...endpoint, enabled: !endpoint.enabled }
          : endpoint
      )
    );
  };

  const openAddDialog = () => {
    setEditingId(null);
    setFormState({
      url: "",
      type: EndpointType.RPC,
      network: NetworkType.MAINNET,
      status: StatusType.ONLINE,
      latency: 0,
      weight: 1,
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (endpoint: Endpoint) => {
    setEditingId(endpoint.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = endpoint;
    setFormState({ ...rest });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setLocalEndpoints((prev) =>
        prev.map((endpoint) =>
          endpoint.id === editingId
            ? { ...endpoint, ...formState, id: editingId }
            : endpoint
        )
      );
    } else {
      const newEndpoint: Endpoint = {
        id: uuidv4(),
        ...formState,
      };
      setLocalEndpoints((prev) => [...prev, newEndpoint]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setLocalEndpoints((prev) => prev.filter((ep) => ep.id !== id));
  };

  const handleTestConnection = async (id: string) => {
    const endpoint = localEndpoints.find((ep) => ep.id === id);
    if (!endpoint) return;

    const start = performance.now();
    try {
      await fetch(endpoint.url, { method: "HEAD", mode: "no-cors" });
      const latency = Math.round(performance.now() - start);
      setLocalEndpoints((prev) =>
        prev.map((ep) =>
          ep.id === id ? { ...ep, status: StatusType.ONLINE, latency } : ep
        )
      );
    } catch {
      setLocalEndpoints((prev) =>
        prev.map((ep) =>
          ep.id === id ? { ...ep, status: StatusType.OFFLINE, latency: 0 } : ep
        )
      );
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
              {stringFields.map((key) => (
                <div key={key} className="flex flex-col gap-2 font-light">
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    value={formState[key]}
                    onChange={(e) =>
                      setFormState({ ...formState, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2 font-light">
                <Label>Type</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formState.type}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      type: e.target.value as EndpointType,
                    })
                  }
                >
                  {Object.values(EndpointType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
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
              <div className="flex flex-col gap-2 font-light">
                <Label>Status</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formState.status}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      status: e.target.value as StatusType,
                    })
                  }
                >
                  {Object.values(StatusType).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 font-light">
                <Label>Latency (ms)</Label>
                <Input
                  type="number"
                  value={formState.latency}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      latency: Number(e.target.value),
                    })
                  }
                />
              </div>
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
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Network</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Latency</TableHead>
              <TableHead className="text-white">Weight</TableHead>
              <TableHead className="text-white">Enabled</TableHead>
              <TableHead className="w-[50px] text-white"></TableHead>
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
                    className={`
                      ${endpoint.status === StatusType.ONLINE ? "active" : ""}
                      ${
                        endpoint.status === StatusType.DEGRADED
                          ? "memcached"
                          : ""
                      }
                    `}
                  >
                    {endpoint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {endpoint.status === StatusType.OFFLINE
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
                      <DropdownMenuItem
                        onClick={() => openEditDialog(endpoint)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTestConnection(endpoint.id)}
                      >
                        Test Connection
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(endpoint.id)}
                        className="text-destructive"
                      >
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
