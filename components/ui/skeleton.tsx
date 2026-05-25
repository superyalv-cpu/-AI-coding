import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(208,236,255,0.48))] dark:bg-[linear-gradient(135deg,rgba(24,48,77,0.85),rgba(12,28,48,0.72))]",
        className,
      )}
    />
  );
}
