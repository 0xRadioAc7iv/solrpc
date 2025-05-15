"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  Bell,
  Database,
  Key,
  Lock,
  Save,
  SettingsIcon,
  Shield,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function SettingsPage() {
  return (
    <div className="space-y-6 text-white bg-[#050816] px-6 pt-16">
      <SearchBar />
      <div>
        <h1 className="text-2xl font-normal tracking-tight inter mt-3 ">
          Settings
        </h1>
        <p className="text-muted-foreground mt-5">
          Manage your RPC aggregator settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-3">
        <TabsList className="grid grid-cols-5 max-w-2xl md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic settings for your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="instance-name">Instance Name</Label>
                  <Input id="instance-name" className="border border-gray-200" defaultValue="SolRPC Aggregator" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="default-network">Default Network</Label>
                  <Select defaultValue="mainnet">
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                      <SelectItem value="testnet">Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Collect anonymous usage data to improve the service
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="text-white bg-purple-600/2 backdrop-blur-lg shadow-lg border border-purple-800/20">
            <CardHeader>
              <CardTitle>Cache Settings</CardTitle>
              <CardDescription>
                Configure caching behavior for RPC responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-cache">Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">
                    Cache RPC responses to improve performance
                  </p>
                </div>
                <Switch id="enable-cache" defaultChecked />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cache-ttl">Cache TTL</Label>
                  <span className="text-sm">30 seconds</span>
                </div>
                <Slider
                  id="cache-ttl"
                  defaultValue={[30]}
                  max={300}
                  step={5}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Time to live for cached responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cacheable-methods">Cacheable Methods</Label>
                <Select defaultValue="read-only">
                  <SelectTrigger>
                    <SelectValue placeholder="Select methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read-only">Read-only Methods</SelectItem>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="custom">Custom Selection</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Which RPC methods should be cached
                </p>
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Cache Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-black text-white border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security settings for your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rate-limiting">Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit requests per IP address
                  </p>
                </div>
                <Switch id="rate-limiting" defaultChecked />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate-limit">Rate Limit</Label>
                  <span className="text-sm">100 requests/minute</span>
                </div>
                <Slider
                  id="rate-limit"
                  defaultValue={[100]}
                  max={500}
                  step={10}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum requests per minute per IP
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict access to specific IP addresses
                  </p>
                </div>
                <Switch id="ip-whitelist" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ddos-protection">DDoS Protection</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable advanced DDoS protection
                  </p>
                </div>
                <Switch id="ddos-protection" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="request-validation">Request Validation</Label>
                  <p className="text-sm text-muted-foreground">
                    Validate all incoming RPC requests
                  </p>
                </div>
                <Switch id="request-validation" defaultChecked />
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Access Control
              </CardTitle>
              <CardDescription>
                Manage authentication and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-auth">Require Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require API key for all requests
                  </p>
                </div>
                <Switch id="require-auth" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="jwt-auth">JWT Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable JWT-based authentication
                  </p>
                </div>
                <Switch id="jwt-auth" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jwt-expiry">JWT Expiry</Label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="never">Never Expire</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How long JWT tokens are valid
                </p>
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save Access Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage API keys for accessing your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Production API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Created on 2023-05-15
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      value="sol_rpc_prod_a1b2c3d4e5f6g7h8i9j0"
                      readOnly
                      className="font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Development API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Created on 2023-06-22
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      value="sol_rpc_dev_z9y8x7w6v5u4t3s2r1q0"
                      readOnly
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <Button className="custom-get-started-button">
                <Key className="mr-2 h-4 w-4" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Usage Limits</CardTitle>
              <CardDescription>
                Configure usage limits for your API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-limit">Daily Request Limit</Label>
                  <span className="text-sm">100,000 requests</span>
                </div>
                <Slider
                  id="daily-limit"
                  defaultValue={[100000]}
                  max={1000000}
                  step={10000}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum requests per day across all API keys
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="limit-per-key">Per-Key Limits</Label>
                  <p className="text-sm text-muted-foreground">
                    Set individual limits for each API key
                  </p>
                </div>
                <Switch id="limit-per-key" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="overage-alerts">Overage Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send alerts when approaching usage limits
                  </p>
                </div>
                <Switch id="overage-alerts" defaultChecked />
              </div>

              <Button className="custom-get-started-button">
                <Save className="mr-2 h-4 w-4" />
                Save API Limits
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Endpoint Status Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when endpoints go down or recover
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Error Rates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when error rates exceed thresholds
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Usage Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when approaching API usage limits
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Incidents</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify about potential security issues
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify about system updates and maintenance
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-channels">
                  Notification Channels
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="channel-email" defaultChecked />
                    <Label htmlFor="channel-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="channel-slack" defaultChecked />
                    <Label htmlFor="channel-slack">Slack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="channel-webhook" />
                    <Label htmlFor="channel-webhook">Webhook</Label>
                  </div>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure advanced settings for your RPC aggregator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">5000ms</span>
                </div>
                <Slider
                  id="timeout"
                  defaultValue={[5000]}
                  min={1000}
                  max={30000}
                  step={500}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time to wait for RPC responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concurrency">Max Concurrency</Label>
                <Select defaultValue="100">
                  <SelectTrigger>
                    <SelectValue placeholder="Select concurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 requests</SelectItem>
                    <SelectItem value="100">100 requests</SelectItem>
                    <SelectItem value="250">250 requests</SelectItem>
                    <SelectItem value="500">500 requests</SelectItem>
                    <SelectItem value="1000">1000 requests</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Maximum concurrent requests to process
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="websocket-support">WebSocket Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable WebSocket connections for subscriptions
                  </p>
                </div>
                <Switch id="websocket-support" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging for debugging
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-retention">Log Retention</Label>
                <Select defaultValue="7d">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="365d">1 Year</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How long to retain system logs
                </p>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Settings
              </CardTitle>
              <CardDescription>
                Configure database connection and storage settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <Select defaultValue="postgres">
                    <SelectTrigger>
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-port">Database Port</Label>
                  <Input id="db-port" defaultValue="5432" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" defaultValue="solrpc" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="db-user">Database User</Label>
                  <Input id="db-user" defaultValue="solrpc_user" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="db-backup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic database backups
                  </p>
                </div>
                <Switch id="db-backup" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How often to create database backups
                </p>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Database Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
