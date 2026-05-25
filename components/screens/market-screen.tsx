"use client";

import { Activity, Globe2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientIcon } from "@/components/shared/gradient-icon";
import { PageTransition } from "@/components/shared/page-transition";
import { marketOverview, type MarketKey } from "@/mock-data/investment-data";
import { cn, formatPercentage } from "@/lib/utils";

const markets: MarketKey[] = ["US", "HK", "CN"];
const marketLabels: Record<MarketKey, string> = {
  US: "美股",
  HK: "港股",
  CN: "A股",
};

export function MarketScreen() {
  return (
    <PageTransition>
      <header className="flex items-center justify-between px-1 pt-2">
        <div>
          <p className="text-sm text-muted-foreground">市场总览</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.04em]">
            全球市场脉搏
          </h1>
        </div>
        <GradientIcon>
          <Globe2 className="size-5" />
        </GradientIcon>
      </header>

      <Tabs defaultValue="US">
        <TabsList className="w-full justify-between">
          {markets.map((market) => (
            <TabsTrigger key={market} value={market} className="flex-1">
              {marketLabels[market]}
            </TabsTrigger>
          ))}
        </TabsList>

        {markets.map((market, index) => (
          <TabsContent key={market} value={market}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-4"
            >
              <Card className="overflow-hidden p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{marketLabels[market]} 盘面情绪</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      AI 判断今日指数广度维持健康状态
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-500/12 px-3 py-2 text-sm font-semibold text-emerald-600">
                    偏进攻
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {marketOverview[market].indices.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-[24px] border border-white/30 bg-white/36 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <Activity className="size-4 text-primary" />
                      </div>
                      <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-emerald-500">
                        {formatPercentage(item.change)}
                      </p>
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                          <span>热度指标</span>
                          <span>{item.breadth}/100</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/55 dark:bg-white/8">
                          <div
                            className="h-2 rounded-full bg-[linear-gradient(135deg,#4facfe,#00f2fe)]"
                            style={{ width: `${item.breadth}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">资金热力</p>
                    <p className="text-xs text-muted-foreground">行业压力与机会分布</p>
                  </div>
                  <TrendingUp className="size-4 text-primary" />
                </div>
                <div className="mt-4 space-y-3">
                  {marketOverview[market].heat.map((item) => (
                    <div key={item.name} className="rounded-[24px] bg-white/32 p-4 dark:bg-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.trend}</p>
                        </div>
                        <p
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold",
                            item.trend === "强势" &&
                              "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
                            item.trend === "观望" &&
                              "bg-amber-400/12 text-amber-600 dark:text-amber-300",
                            item.trend === "降温" &&
                              "bg-slate-500/12 text-slate-600 dark:text-slate-300",
                          )}
                        >
                          {item.strength}%
                        </p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/55 dark:bg-white/8">
                        <div
                          className="h-2 rounded-full bg-[linear-gradient(135deg,#4facfe,#00f2fe)]"
                          style={{ width: `${item.strength}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </PageTransition>
  );
}
