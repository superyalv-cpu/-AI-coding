"use client";

import { Bell, GripHorizontal, Trash2 } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";

import { AlertModal } from "@/components/watchlist/alert-modal";
import { SparklineChart } from "@/components/charts/sparkline-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatPercentage } from "@/lib/utils";

type WatchlistItem = {
  ticker: string;
  company: string;
  priceLabel: string;
  change: number;
  logo: string;
  gradient: string;
  sparkline: { value: number }[];
};

export function SwipeStockCard({
  stock,
  onRemove,
}: {
  stock: WatchlistItem;
  onRemove: () => void;
}) {
  const x = useMotionValue(0);

  return (
    <div className="relative overflow-hidden rounded-[28px]">
      <div className="absolute inset-y-0 right-0 flex w-[104px] items-center justify-end gap-2 rounded-[28px] bg-[linear-gradient(135deg,rgba(79,172,254,0.14),rgba(0,242,254,0.18))] pr-3">
        <AlertModal ticker={stock.ticker}>
          <Button size="icon" variant="secondary" className="size-11 rounded-2xl">
            <Bell className="size-4" />
          </Button>
        </AlertModal>
        <Button
          size="icon"
          variant="outline"
          className="size-11 rounded-2xl text-rose-500"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -104, right: 0 }}
        dragElastic={0.04}
        style={{ x }}
        whileTap={{ scale: 0.995 }}
      >
        <Card className="fintech-shadow relative overflow-hidden bg-white/82 p-4 dark:bg-[#0d203dcc]">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-display font-semibold text-white shadow-[0_14px_34px_rgba(79,172,254,0.22)]",
                stock.gradient,
              )}
            >
              {stock.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-display text-base font-semibold">{stock.ticker}</p>
                <GripHorizontal className="size-3.5 text-muted-foreground" />
                <span className="rounded-full bg-white/55 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground dark:bg-white/10">
                  左滑
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{stock.company}</p>
            </div>
            <div className="min-w-[88px] shrink-0 text-right">
              <p className="font-display text-base font-semibold leading-none tracking-normal">
                {stock.priceLabel}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs font-semibold leading-none",
                  stock.change >= 0 ? "text-emerald-500" : "text-rose-500",
                )}
              >
                {formatPercentage(stock.change)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <div className="h-16 min-w-0 flex-1">
              <SparklineChart
                data={stock.sparkline}
                color={stock.change >= 0 ? "#00d7fe" : "#f97373"}
                className="h-full"
              />
            </div>
            <AlertModal ticker={stock.ticker}>
              <Button size="sm" variant="ghost" className="shrink-0 rounded-2xl">
                提醒
              </Button>
            </AlertModal>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
