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
      <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4">
        <AlertModal ticker={stock.ticker}>
          <Button size="icon" variant="secondary" className="size-12 rounded-2xl">
            <Bell className="size-4" />
          </Button>
        </AlertModal>
        <Button
          size="icon"
          variant="outline"
          className="size-12 rounded-2xl text-rose-500"
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
        <Card className="fintech-shadow relative overflow-hidden p-4">
          <div className="absolute right-4 top-4 rounded-full bg-white/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground dark:bg-white/8">
            左滑
          </div>
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
              </div>
              <p className="truncate text-xs text-muted-foreground">{stock.company}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-base font-semibold">{stock.priceLabel}</p>
              <p
                className={cn(
                  "text-xs font-semibold",
                  stock.change >= 0 ? "text-emerald-500" : "text-rose-500",
                )}
              >
                {formatPercentage(stock.change)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <div className="h-16 flex-1">
              <SparklineChart
                data={stock.sparkline}
                color={stock.change >= 0 ? "#00d7fe" : "#f97373"}
                className="h-full"
              />
            </div>
            <AlertModal ticker={stock.ticker}>
              <Button size="sm" variant="ghost" className="rounded-2xl">
                提醒
              </Button>
            </AlertModal>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
