"use client";

import { useMemo } from "react";
import {
  Area,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

import { formatCompactCurrency } from "@/lib/utils";

type Point = {
  label: string;
  portfolio: number;
  sp500: number;
  nasdaq: number;
};

export function PerformanceChart({ data }: { data: Point[] }) {
  const min = useMemo(
    () => Math.min(...data.flatMap((point) => [point.portfolio, point.sp500, point.nasdaq])) - 120,
    [data],
  );
  const max = useMemo(
    () => Math.max(...data.flatMap((point) => [point.portfolio, point.sp500, point.nasdaq])) + 120,
    [data],
  );

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4facfe" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4facfe" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="spFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7fc8ff" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#7fc8ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="nasdaqFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity={0} />
            </linearGradient>
            <filter id="chartGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7a93b2", fontSize: 11 }}
          />
          <YAxis hide domain={[min, max]} />
          <Tooltip
            cursor={{ stroke: "rgba(79,172,254,0.2)", strokeWidth: 1, strokeDasharray: "4 4" }}
            contentStyle={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 50px rgba(7, 38, 71, 0.14)",
            }}
            formatter={(value: number) => formatCompactCurrency(value)}
            labelStyle={{ color: "#486583", fontWeight: 600 }}
          />
          <Area type="monotone" dataKey="portfolio" fill="url(#portfolioFill)" stroke="none" />
          <Area type="monotone" dataKey="sp500" fill="url(#spFill)" stroke="none" />
          <Area type="monotone" dataKey="nasdaq" fill="url(#nasdaqFill)" stroke="none" />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="#4facfe"
            strokeWidth={3.6}
            dot={false}
            filter="url(#chartGlow)"
          />
          <Line
            type="monotone"
            dataKey="sp500"
            stroke="#7dbfff"
            strokeWidth={2.2}
            dot={false}
            strokeDasharray="0"
          />
          <Line
            type="monotone"
            dataKey="nasdaq"
            stroke="#00d7fe"
            strokeWidth={2.2}
            dot={false}
            strokeDasharray="6 6"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
