"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CandlestickChart,
  LayoutGrid,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "首页", icon: LayoutGrid },
  { href: "/market", label: "市场", icon: CandlestickChart },
  { href: "/watchlist", label: "自选", icon: Bookmark },
  { href: "/insights", label: "洞察", icon: Sparkles },
  { href: "/profile", label: "我的", icon: UserCircle2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-[max(env(safe-area-inset-bottom),0.9rem)] left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[398px] -translate-x-1/2">
      <div className="glass-card fintech-shadow relative flex items-center justify-between rounded-[28px] px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1.5"
            >
              {active ? (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-[22px] bg-[linear-gradient(135deg,rgba(79,172,254,0.16),rgba(0,242,254,0.2))]"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              ) : null}
              <div
                className={cn(
                  "relative z-10 flex size-10 items-center justify-center rounded-2xl transition-all",
                  active
                    ? "bg-[linear-gradient(135deg,#4facfe,#00f2fe)] text-white shadow-[0_12px_28px_rgba(79,172,254,0.28)]"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-[18px]" />
              </div>
              <span
                className={cn(
                  "relative z-10 text-[10px] font-semibold tracking-[0.01em]",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
