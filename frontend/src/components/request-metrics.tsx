"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStatsStore } from "@/lib/store";
import { format } from "date-fns";

export function RequestMetrics() {
  const { topRpcMethods, requestData, responseLatencies } = useStatsStore();

  const requestsPerHour = requestData?.requests.reduce((acc, { timestamp }) => {
    const hour = format(new Date(timestamp), "yyyy-MM-dd HH:00");
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const requestChartData =
    requestsPerHour &&
    Object.entries(requestsPerHour as Record<string, number>)
      .map(([time, count]) => ({ time, requests: count }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const latencyDataPerMinute = responseLatencies.reduce(
    (acc, { timestamp, latency }) => {
      const bucket = format(new Date(timestamp), "yyyy-MM-dd HH:mm");

      if (!acc[bucket]) {
        acc[bucket] = { totalLatency: 0, count: 0 };
      }

      acc[bucket].totalLatency += latency;
      acc[bucket].count += 1;

      return acc;
    },
    {} as Record<string, { totalLatency: number; count: number }>
  );

  const responseChartData =
    latencyDataPerMinute &&
    Object.entries(latencyDataPerMinute)
      .map(([time, { totalLatency, count }]) => ({
        time,
        latency: parseFloat((totalLatency / count).toFixed(2)), // average latency
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="space-y-4 text-white bg-[#050816]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Request Metrics</h2>
        <Select defaultValue="24h">
          <SelectTrigger className="w-[130px] custom-get-started-button">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent className="custom-get-started-button">
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="6h">Last 6 hours</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Request Volume Chart */}
        <Card className="text-white bg-[#050816]">
          <CardHeader>
            <CardTitle className="text-base">Request Volume</CardTitle>
            <CardDescription>Total requests over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{ requests: { color: "#431e6b", label: "Requests" } }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={requestChartData}>
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#8884d8"
                    fill="#431e6b"
                    fillOpacity={0.2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Latency Chart */}
        <Card className="text-white bg-[#050816]">
          <CardHeader>
            <CardTitle className="text-base">Response Latency</CardTitle>
            <CardDescription>
              Average response time in milliseconds
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{ latency: { color: "#431e6b", label: "Latency (ms)" } }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseChartData}>
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}ms`}
                  />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="#431e6b"
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top RPC Methods */}
      <Card className="text-white bg-[#050816] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">Top RPC Methods</CardTitle>
          <CardDescription>Most frequently requested methods</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            config={{ count: { color: "#541e6b99", label: "Request Count" } }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRpcMethods}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="count" fill="#431e6b" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
