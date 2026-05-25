"use client";

import { BellRing, Percent, TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function AlertModal({
  ticker,
  children,
}: {
  ticker: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,172,254,0.95),rgba(0,242,254,0.75))] text-white shadow-[0_16px_40px_rgba(79,172,254,0.28)]">
            <BellRing className="size-5" />
          </div>
          <DialogTitle>{ticker} 智能提醒</DialogTitle>
          <DialogDescription>
            设置关键监控条件，让系统只在真正重要的波动出现时提醒你。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field
              icon={<TrendingUp className="size-4" />}
              label="高于价格"
              placeholder="$240"
            />
            <Field
              icon={<TrendingDown className="size-4" />}
              label="低于价格"
              placeholder="$198"
            />
            <Field
              icon={<Percent className="size-4" />}
              label="涨幅提醒"
              placeholder="4.0%"
            />
            <Field
              icon={<Percent className="size-4" />}
              label="跌幅提醒"
              placeholder="3.5%"
            />
          </div>

          <div className="rounded-[24px] border border-white/35 bg-white/38 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">开启通知</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  触发后立即推送，并在消息中附带 AI 分析结论。
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Button className="w-full">保存提醒</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <label className="space-y-2">
      <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span className="flex size-7 items-center justify-center rounded-xl bg-white/55 text-foreground dark:bg-white/10">
          {icon}
        </span>
        {label}
      </span>
      <Input placeholder={placeholder} />
    </label>
  );
}
