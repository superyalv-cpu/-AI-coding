"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

type SparklinePoint = {
  value: number;
};

export function SparklineChart({
  data,
  color = "#4facfe",
  className,
}: {
  data: SparklinePoint[];
  color?: string;
  className?: string;
}) {
  const gradientId = `spark-${color.replace("#", "")}`;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.36} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#${gradientId})`}
            strokeWidth={2.4}
            dot={false}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
