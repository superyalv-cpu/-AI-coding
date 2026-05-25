"use client";

import { useState } from "react";
import { BellDot, MoonStar, Settings2, Target } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GradientIcon } from "@/components/shared/gradient-icon";
import { PageTransition } from "@/components/shared/page-transition";
import { useMounted } from "@/hooks/use-mounted";
import { profileData } from "@/mock-data/investment-data";

export function ProfileScreen() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const [briefing, setBriefing] = useState(true);
  const [push, setPush] = useState(true);
  const [rebalance, setRebalance] = useState(false);
  const [target, setTarget] = useState(profileData.yearlyReturnTarget);

  return (
    <PageTransition>
      <header className="flex items-center justify-between px-1 pt-2">
        <div>
          <p className="text-sm text-muted-foreground">个人中心</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.04em]">
            专属投资控制台
          </h1>
        </div>
        <GradientIcon>
          <Settings2 className="size-5" />
        </GradientIcon>
      </header>

      <Card className="p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 glow-ring">
            <AvatarFallback className="text-base">{profileData.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-display text-xl font-semibold">{profileData.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profileData.role}</p>
            <div className="mt-3 inline-flex rounded-full bg-[linear-gradient(135deg,rgba(79,172,254,0.16),rgba(0,242,254,0.22))] px-3 py-1 text-xs font-semibold text-primary">
              BlueAlpha 高级版
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/48 dark:bg-white/8">
            <BellDot className="size-[18px] text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold">通知设置</p>
            <p className="text-xs text-muted-foreground">定制 AI 推送内容</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <SettingRow
            title={profileData.settings[0].label}
            description={profileData.settings[0].description}
            checked={push}
            onCheckedChange={setPush}
          />
          <SettingRow
            title={profileData.settings[1].label}
            description={profileData.settings[1].description}
            checked={briefing}
            onCheckedChange={setBriefing}
          />
          <SettingRow
            title={profileData.settings[2].label}
            description={profileData.settings[2].description}
            checked={rebalance}
            onCheckedChange={setRebalance}
          />
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/48 dark:bg-white/8">
            <Target className="size-[18px] text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold">年度目标收益</p>
            <p className="text-xs text-muted-foreground">用来校准 AI 的参考目标</p>
          </div>
        </div>

        <div className="mt-5 rounded-[24px] bg-white/36 p-4 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">目标</p>
            <p className="font-display text-xl font-semibold">{target}%</p>
          </div>
          <input
            type="range"
            min={8}
            max={30}
            step={1}
            value={target}
            onChange={(event) => setTarget(Number(event.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-[#4facfe]"
          />
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted-foreground">
            <span>稳健</span>
            <span>进取</span>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white/48 dark:bg-white/8">
              <MoonStar className="size-[18px] text-primary" />
            </div>
            <div>
              <p className="text-base font-semibold">深色模式</p>
              <p className="text-xs text-muted-foreground">更适合盘后查看与夜间使用</p>
            </div>
          </div>
          <Switch
            checked={mounted ? theme === "dark" : false}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold">已连接市场</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profileData.connectedMarkets.map((market) => (
              <span
                key={market}
                className="rounded-full border border-white/35 bg-white/40 px-3 py-2 text-xs font-semibold text-foreground dark:border-white/10 dark:bg-white/6"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </PageTransition>
  );
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[24px] bg-white/36 p-4 dark:bg-white/5">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
