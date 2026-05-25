"use client";

import { BrainCircuit, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { GradientIcon } from "@/components/shared/gradient-icon";
import { PageTransition } from "@/components/shared/page-transition";
import { insightsData } from "@/mock-data/investment-data";

export function InsightsScreen() {
  return (
    <PageTransition>
      <header className="flex items-center justify-between px-1 pt-2">
        <div>
          <p className="text-sm text-muted-foreground">AI 洞察</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-[-0.04em]">
            组合智能分析
          </h1>
        </div>
        <GradientIcon>
          <BrainCircuit className="size-5" />
        </GradientIcon>
      </header>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,254,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
          <div className="absolute inset-x-6 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(79,172,254,0.5),transparent)]" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">组合健康评分</p>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-muted-foreground">
                  {insightsData.narrative}
                </p>
              </div>
              <div className="relative flex size-24 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#4facfe ${insightsData.healthScore}%, rgba(255,255,255,0.18) 0)`,
                  }}
                />
                <div className="absolute inset-2 rounded-full bg-white/80 dark:bg-[#0b1f3a]" />
                <div className="relative text-center">
                  <p className="font-display text-2xl font-semibold">{insightsData.healthScore}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    评分
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {insightsData.riskFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="rounded-[22px] border border-white/30 bg-white/34 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {factor.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold">{factor.value}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/55 dark:bg-white/8">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(135deg,#4facfe,#00f2fe)]"
                      style={{ width: `${factor.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="space-y-3"
      >
        {insightsData.aiCards.map((card, index) => (
          <Card key={card.title} className="p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,172,254,0.92),rgba(0,242,254,0.72))] text-white shadow-[0_10px_30px_rgba(79,172,254,0.2)]">
                {index === 0 ? (
                  <Sparkles className="size-[18px]" />
                ) : index === 1 ? (
                  <TriangleAlert className="size-[18px]" />
                ) : (
                  <ShieldCheck className="size-[18px]" />
                )}
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
      >
        <Card className="p-5">
          <p className="text-base font-semibold">AI 建议</p>
          <div className="mt-4 space-y-3">
            {insightsData.suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="rounded-[22px] bg-white/36 px-4 py-3 text-sm leading-6 text-foreground dark:bg-white/5"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </Card>
      </motion.section>
    </PageTransition>
  );
}
