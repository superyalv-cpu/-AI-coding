"use client";

import { useMemo, useState } from "react";
import { BellRing, Plus, Zap } from "lucide-react";

import { SwipeStockCard } from "@/components/watchlist/swipe-stock-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientIcon } from "@/components/shared/gradient-icon";
import { PageTransition } from "@/components/shared/page-transition";
import { watchlistStocks } from "@/mock-data/investment-data";

export function WatchlistScreen() {
  const [stocks, setStocks] = useState(watchlistStocks.slice(0, 4));
  const remaining = useMemo(
    () => watchlistStocks.filter((stock) => !stocks.some((item) => item.ticker === stock.ticker)),
    [stocks],
  );

  const addStock = () => {
    if (remaining.length > 0) {
      setStocks((current) => [...current, remaining[0]]);
      return;
    }

    setStocks((current) => [...current.slice(1), current[0]]);
  };

  return (
    <PageTransition>
      <header className="flex items-start justify-between px-1 pt-2">
        <div>
          <p className="text-sm text-muted-foreground">智能自选</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.04em]">
            重点关注标的
          </h1>
        </div>
        <GradientIcon>
          <BellRing className="size-5" />
        </GradientIcon>
      </header>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">支持滑动操作</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              向左滑动任意股票卡片，即可快速设置提醒或移除。
            </p>
          </div>
          <Button onClick={addStock} className="shrink-0 rounded-2xl">
            <Plus className="size-4" />
            添加
          </Button>
        </div>
        <div className="mt-4 rounded-[22px] bg-white/36 px-4 py-3 dark:bg-white/5">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Zap className="size-4" />
            今日已有 4 个重点触发条件由 AI 持续监控
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {stocks.map((stock) => (
          <SwipeStockCard
            key={stock.ticker}
            stock={stock}
            onRemove={() => setStocks((current) => current.filter((item) => item.ticker !== stock.ticker))}
          />
        ))}
      </div>
    </PageTransition>
  );
}
