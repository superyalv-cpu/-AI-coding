export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto min-h-svh w-full max-w-[430px] overflow-x-hidden px-4 pb-28 pt-[max(env(safe-area-inset-top),1.25rem)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-72px] top-[46px] size-44 rounded-full bg-[#4facfe]/20 blur-3xl" />
        <div className="absolute right-[-64px] top-[180px] size-40 rounded-full bg-[#00f2fe]/18 blur-3xl" />
        <div className="absolute bottom-[120px] left-[30%] size-36 rounded-full bg-white/30 blur-3xl dark:bg-[#1f5f94]/25" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
