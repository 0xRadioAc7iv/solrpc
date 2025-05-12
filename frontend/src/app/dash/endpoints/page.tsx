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
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Edit,
  ExternalLink,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/components/SearchBar";

export default function Endpoints() {
  return (
    <div className="space-y-6 text-white pt-16 bg-[#050816] px-6 border-black">
      <SearchBar />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight instrument-serif-regular-italic mt-3">
            Endpoints
          </h1>
          <p className="text-muted-foreground">
            Manage RPC endpoints for your blockchain networks
          </p>
        </div>
        <Button className="ml-auto custom-get-started-button">
          <Plus className="mr-2 h-4 w-4" />
          Add Endpoint
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search endpoints..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Networks</SelectItem>
            <SelectItem value="mainnet">Mainnet</SelectItem>
            <SelectItem value="devnet">Devnet</SelectItem>
            <SelectItem value="testnet">Testnet</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          className="custom-get-started-button"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Endpoints</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="degraded">Degraded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-black text-white border border-gray-800">
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
                    <TableHead>Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Mainnet RPC 1",
                      network: "Mainnet",
                      url: "https://api.mainnet-beta.solana.com",
                      status: "active",
                      latency: "45ms",
                      lastCheck: "2 min ago",
                    },
                    {
                      name: "Mainnet RPC 2",
                      network: "Mainnet",
                      url: "https://solana-api.projectserum.com",
                      status: "active",
                      latency: "62ms",
                      lastCheck: "3 min ago",
                    },
                    {
                      name: "Mainnet RPC 3",
                      network: "Mainnet",
                      url: "https://rpc.ankr.com/solana",
                      status: "degraded",
                      latency: "128ms",
                      lastCheck: "1 min ago",
                    },
                    {
                      name: "Devnet RPC 1",
                      network: "Devnet",
                      url: "https://api.devnet.solana.com",
                      status: "active",
                      latency: "38ms",
                      lastCheck: "5 min ago",
                    },
                    {
                      name: "Testnet RPC 1",
                      network: "Testnet",
                      url: "https://api.testnet.solana.com",
                      status: "inactive",
                      latency: "—",
                      lastCheck: "10 min ago",
                    },
                  ].map((endpoint, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {endpoint.name}
                      </TableCell>
                      <TableCell>{endpoint.network}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center">
                          <span className="truncate">{endpoint.url}</span>
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
                        {endpoint.status === "active" && (
                          <Badge className="bg-green-500" variant="secondary">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        )}
                        {endpoint.status === "degraded" && (
                          <Badge className="bg-yellow-500" variant="secondary">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Degraded
                          </Badge>
                        )}
                        {endpoint.status === "inactive" && (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>{endpoint.latency}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {endpoint.lastCheck}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Test Connection
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Endpoint
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Endpoint
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4 bg-black text-white">
          <Card className="bg-black text-white">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Mainnet RPC 1",
                      network: "Mainnet",
                      url: "https://api.mainnet-beta.solana.com",
                      status: "active",
                      latency: "45ms",
                      lastCheck: "2 min ago",
                    },
                    {
                      name: "Mainnet RPC 2",
                      network: "Mainnet",
                      url: "https://solana-api.projectserum.com",
                      status: "active",
                      latency: "62ms",
                      lastCheck: "3 min ago",
                    },
                    {
                      name: "Devnet RPC 1",
                      network: "Devnet",
                      url: "https://api.devnet.solana.com",
                      status: "active",
                      latency: "38ms",
                      lastCheck: "5 min ago",
                    },
                  ].map((endpoint, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {endpoint.name}
                      </TableCell>
                      <TableCell>{endpoint.network}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <div className="flex items-center">
                          <span className="truncate">{endpoint.url}</span>
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
                        <Badge className="bg-green-500" variant="secondary">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>{endpoint.latency}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {endpoint.lastCheck}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4 bg-black text-white">
          <Card className="bg-black text-white">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Testnet RPC 1</TableCell>
                    <TableCell>Testnet</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <div className="flex items-center">
                        <span className="truncate">
                          https://api.testnet.solana.com
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
                      <Badge variant="outline">Inactive</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        10 min ago
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

        <TabsContent value="degraded" className="space-y-4 bg-black text-white">
          <Card className="bg-black text-white">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                      <Badge className="bg-yellow-500" variant="secondary">
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
