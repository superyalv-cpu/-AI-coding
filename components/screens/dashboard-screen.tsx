"use client";

import { useState } from "react";
import { Bell, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { SparklineChart } from "@/components/charts/sparkline-chart";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { GradientIcon } from "@/components/shared/gradient-icon";
import { PageTransition } from "@/components/shared/page-transition";
import { useDemoReady } from "@/hooks/use-demo-ready";
import {
  hotSectors,
  portfolioPerformance,
  portfolioSummary,
  watchlistStocks,
  type TimeframeKey,
} from "@/mock-data/investment-data";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

const timeframes: TimeframeKey[] = ["1D", "1W", "1M", "1Y"];
const timeframeLabels: Record<TimeframeKey, string> = {
  "1D": "1日",
  "1W": "1周",
  "1M": "1月",
  "1Y": "1年",
};

export function DashboardScreen() {
  const ready = useDemoReady(800);
  const [timeframe, setTimeframe] = useState<TimeframeKey>("1W");

  return (
    <PageTransition>
      <header className="flex items-center justify-between px-1 pt-2">
        <div>
          <p className="text-sm text-muted-foreground">早上好，{portfolioSummary.owner}</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.04em]">
            AI 为你盯住市场
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex size-11 items-center justify-center rounded-2xl bg-white/38 text-foreground shadow-[0_10px_30px_rgba(15,42,76,0.08)] backdrop-blur-xl dark:bg-white/8">
            <Bell className="size-[18px]" />
          </button>
          <Avatar className="glow-ring size-11">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {!ready ? <DashboardSkeleton /> : null}

      {ready ? (
        <>
          <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="fintech-shadow relative overflow-hidden px-5 py-5">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,172,254,0.18),rgba(0,242,254,0.12))]" />
              <div className="absolute -right-8 top-6 size-28 rounded-full bg-white/34 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">总资产估值</p>
                    <div className="mt-2 font-display text-[34px] font-semibold tracking-[-0.05em]">
                      <AnimatedNumber value={portfolioSummary.balance} formatter={formatCurrency} />
                    </div>
                  </div>
                  <GradientIcon>
                    <TrendingUp className="size-5" />
                  </GradientIcon>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-[24px] bg-white/38 px-4 py-3 dark:bg-white/6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      今日盈亏
                    </p>
                    <p className="mt-1 text-lg font-semibold text-emerald-500">
                      <AnimatedNumber
                        value={portfolioSummary.dailyChange}
                        formatter={formatCurrency}
                      />
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-500/12 px-3 py-2 text-sm font-semibold text-emerald-600">
                    {formatPercentage(portfolioSummary.dailyChangePct)}
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <Card className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">表现走势</p>
                  <p className="mt-1 text-xs text-muted-foreground">与核心基准对比</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/42 px-2 py-1 dark:bg-white/6">
                  <LegendDot color="bg-[#4facfe]" label="组合" />
                  <LegendDot color="bg-[#7dbfff]" label="标普500" />
                  <LegendDot color="bg-[#00d7fe]" label="纳指" />
                </div>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {timeframes.map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                      timeframe === item
                        ? "bg-[linear-gradient(135deg,#4facfe,#00f2fe)] text-white shadow-[0_12px_26px_rgba(79,172,254,0.25)]"
                        : "bg-white/44 text-muted-foreground dark:bg-white/8",
                    )}
                    onClick={() => setTimeframe(item)}
                  >
                    {timeframeLabels[item]}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-[26px] bg-white/34 px-3 py-4 dark:bg-white/5">
                <PerformanceChart data={portfolioPerformance[timeframe]} />
              </div>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-base font-semibold">热门赛道</p>
                <p className="text-xs text-muted-foreground">AI 实时摘要</p>
              </div>
              <button className="text-xs font-semibold text-primary">查看全部</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
              {hotSectors.map((sector) => (
                <Card key={sector.name} className="min-w-[220px] flex-1 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-semibold">{sector.name}</p>
                    <p className="text-sm font-semibold text-emerald-500">
                      {formatPercentage(sector.performance)}
                    </p>
                  </div>
                  <div className="mt-3 h-14">
                    <SparklineChart data={sector.chart} color="#4facfe" className="h-full" />
                  </div>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{sector.summary}</p>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="text-base font-semibold">自选预览</p>
                <p className="text-xs text-muted-foreground">你重点关注的标的</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                打开
                <ChevronRight className="size-4" />
              </Button>
            </div>
            {watchlistStocks.slice(0, 3).map((stock) => (
              <Card key={stock.ticker} className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-display font-semibold text-white shadow-[0_14px_34px_rgba(79,172,254,0.22)]",
                      stock.gradient,
                    )}
                  >
                    {stock.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-base font-semibold">{stock.ticker}</p>
                        <p className="text-xs text-muted-foreground">{stock.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{stock.priceLabel}</p>
                        <p className="text-xs font-semibold text-emerald-500">
                          {formatPercentage(stock.change)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 h-12">
                      <SparklineChart data={stock.sparkline} color="#00d7fe" className="h-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.section>
        </>
      ) : null}
    </PageTransition>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className={cn("size-2 rounded-full", color)} />
      <span className="text-[10px] font-semibold text-muted-foreground">{label}</span>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-80 w-full" />
      <div className="flex gap-3 overflow-hidden">
        <Skeleton className="h-40 min-w-[220px] flex-1" />
        <Skeleton className="h-40 min-w-[220px] flex-1" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
