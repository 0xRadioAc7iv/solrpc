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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Globe,
  Network,
  Plus,
  RefreshCw,
  Search,
  Settings,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function Networks() {
  return (
    <div className="space-y-6 text-white pt-16 bg-[#050816] px-6 border-black">
      <SearchBar />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight instrument-serif-regular-italic mt-3">
            Networks
          </h1>
          <p className="text-muted-foreground">
            Manage blockchain networks and their configurations
          </p>
        </div>
        <Button className="ml-auto custom-get-started-button">
          <Plus className="mr-2 h-4 w-4" />
          Add Network
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search networks..."
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="custom-get-started-button"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="custom-get-started-button"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Networks</TabsTrigger>
          <TabsTrigger value="testnet">Testnets</TabsTrigger>
          <TabsTrigger value="custom">Custom Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card className="bg-black text-white border border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Solana Mainnet
              </CardTitle>
              <CardDescription>
                Production Solana blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Status
                    </Label>
                    <div className="flex items-center">
                      <Badge className="bg-green-500" variant="secondary">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Active Endpoints
                    </Label>
                    <div className="font-medium">5 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Current Slot
                    </Label>
                    <div className="font-medium">234,567,890</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Average Response Time
                    </Label>
                    <div className="font-medium">54ms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="custom-get-started-button"
                    >
                      Manage Endpoints
                    </Button>
                    <Button size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5" />
                Solana Devnet
              </CardTitle>
              <CardDescription>
                Development Solana blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Status
                    </Label>
                    <div className="flex items-center">
                      <Badge className="bg-yellow-500" variant="secondary">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Degraded
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Active Endpoints
                    </Label>
                    <div className="font-medium">3 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Current Slot
                    </Label>
                    <div className="font-medium">123,456,789</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Average Response Time
                    </Label>
                    <div className="font-medium">87ms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="custom-get-started-button"
                    >
                      Manage Endpoints
                    </Button>
                    <Button size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testnet" className="space-y-4">
          <Card className="bg-black text-white border border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Solana Testnet
              </CardTitle>
              <CardDescription>
                Testing Solana blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Status
                    </Label>
                    <div className="flex items-center">
                      <Badge className="bg-green-500" variant="secondary">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Active Endpoints
                    </Label>
                    <div className="font-medium">2 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Current Slot
                    </Label>
                    <div className="font-medium">98,765,432</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Average Response Time
                    </Label>
                    <div className="font-medium">42ms</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Manage Endpoints
                    </Button>
                    <Button size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="bg-black text-white border border-gray-800">
            <CardHeader>
              <CardTitle>Custom Networks</CardTitle>
              <CardDescription>
                Add and manage your custom blockchain networks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-dashed p-8 text-center">
                <h3 className="font-medium mb-2">No Custom Networks</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You have not added any custom networks yet
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Network
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-gray-800">
            <CardHeader>
              <CardTitle>Add Custom Network</CardTitle>
              <CardDescription>
                Configure a new blockchain network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="network-name">Network Name</Label>
                  <Input
                    id="network-name"
                    placeholder="e.g., My Custom Network"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="network-id">Network ID</Label>
                  <Input id="network-id" placeholder="e.g., custom-mainnet" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="chain-id">Chain ID</Label>
                  <Input id="chain-id" placeholder="e.g., 1" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="rpc-url">Default RPC URL</Label>
                  <Input id="rpc-url" placeholder="https://..." />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="network-enabled" />
                  <Label htmlFor="network-enabled">Enable Network</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Network</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
