import { cn } from "@/lib/utils";

export function GradientIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glow-ring flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,172,254,0.9),rgba(0,242,254,0.72))] text-white shadow-[0_10px_30px_rgba(79,172,254,0.24)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
