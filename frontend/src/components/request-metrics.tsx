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
import { useEffect } from "react";

const requestData = [
  { time: "00:00", requests: 120, errors: 2, latency: 145 },
  { time: "01:00", requests: 90, errors: 1, latency: 138 },
  { time: "02:00", requests: 70, errors: 0, latency: 132 },
  { time: "03:00", requests: 60, errors: 0, latency: 128 },
  { time: "04:00", requests: 80, errors: 1, latency: 135 },
  { time: "05:00", requests: 110, errors: 2, latency: 142 },
  { time: "06:00", requests: 150, errors: 3, latency: 148 },
  { time: "07:00", requests: 180, errors: 2, latency: 152 },
  { time: "08:00", requests: 220, errors: 4, latency: 158 },
  { time: "09:00", requests: 270, errors: 5, latency: 165 },
  { time: "10:00", requests: 310, errors: 6, latency: 172 },
  { time: "11:00", requests: 290, errors: 5, latency: 168 },
  { time: "12:00", requests: 310, errors: 4, latency: 170 },
  { time: "13:00", requests: 350, errors: 7, latency: 175 },
  { time: "14:00", requests: 380, errors: 8, latency: 180 },
  { time: "15:00", requests: 360, errors: 6, latency: 176 },
  { time: "16:00", requests: 340, errors: 5, latency: 172 },
  { time: "17:00", requests: 320, errors: 4, latency: 168 },
  { time: "18:00", requests: 300, errors: 3, latency: 165 },
  { time: "19:00", requests: 280, errors: 3, latency: 160 },
  { time: "20:00", requests: 250, errors: 2, latency: 155 },
  { time: "21:00", requests: 210, errors: 2, latency: 150 },
  { time: "22:00", requests: 180, errors: 1, latency: 145 },
  { time: "23:00", requests: 140, errors: 1, latency: 140 },
];

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
