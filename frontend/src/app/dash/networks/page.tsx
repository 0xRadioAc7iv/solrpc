"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, ChevronRight, Globe, Network, Plus, RefreshCw, Search, Settings } from "lucide-react"
import SearchBar from "@/components/SearchBar"

export default function Networks() {
  return (
    <div className="space-y-4 sm:space-y-6 text-white pt-6 sm:pt-16 bg-[#050816] px-3 sm:px-6 border-black">
      <div className="w-full">
        <SearchBar />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal tracking-tight inter mt-2 sm:mt-3">Networks</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-5">
            Manage blockchain networks and their configurations
          </p>
        </div>
        <Button className="w-full sm:w-auto sm:ml-auto custom-get-started-button">
          <Plus className="mr-2 h-4 w-4" />
          Add Network
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search networks..." className="pl-8" />
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <Button variant="outline" size="icon" className="custom-get-started-button">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="custom-get-started-button">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="active" className="flex-1 sm:flex-initial">
              Active Networks
            </TabsTrigger>
            <TabsTrigger value="testnet" className="flex-1 sm:flex-initial">
              Testnets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="space-y-4">
          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Network className="mr-2 h-5 w-5" />
                Solana Mainnet
              </CardTitle>
              <CardDescription className="text-sm">Production Solana blockchain network</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Status</Label>
                    <div className="flex items-center">
                      <Badge className="active text-xs" variant="secondary">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Active Endpoints</Label>
                    <div className="font-medium text-sm">5 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Current Slot</Label>
                    <div className="font-medium text-sm">234,567,890</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Average Response Time</Label>
                    <div className="font-medium text-sm">54ms</div>
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
                    <Button variant="outline" size="sm" className="custom-get-started-button w-full sm:w-auto">
                      Manage Endpoints
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Network className="mr-2 h-5 w-5" />
                Solana Devnet
              </CardTitle>
              <CardDescription className="text-sm">Development Solana blockchain network</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Status</Label>
                    <div className="flex items-center">
                      <Badge className="available text-xs" variant="secondary">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Degraded
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Active Endpoints</Label>
                    <div className="font-medium text-sm">3 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Current Slot</Label>
                    <div className="font-medium text-sm">123,456,789</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Average Response Time</Label>
                    <div className="font-medium text-sm">87ms</div>
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
                    <Button variant="outline" size="sm" className="custom-get-started-button w-full sm:w-auto">
                      Manage Endpoints
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testnet" className="space-y-4">
          <Card className="bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20 text-white">
            <CardHeader className="pb-3 px-4 sm:px-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Globe className="mr-2 h-5 w-5" />
                Solana Testnet
              </CardTitle>
              <CardDescription className="text-sm">Testing Solana blockchain network</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Status</Label>
                    <div className="flex items-center">
                      <Badge className="text-xs active">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Operational
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Active Endpoints</Label>
                    <div className="font-medium text-sm">2 endpoints</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Current Slot</Label>
                    <div className="font-medium text-sm">98,765,432</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-normal text-muted-foreground">Average Response Time</Label>
                    <div className="font-medium text-sm">42ms</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <Button className="bg-slate-900 font-normal border border-slate-700/40 shadow-lg cursor-pointer w-full sm:w-auto" size="sm">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="custom-get-started-button w-full sm:w-auto">
                      Manage Endpoints
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
