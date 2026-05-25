import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileShell } from "@/components/layout/mobile-shell";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell>
      {children}
      <BottomNav />
    </MobileShell>
  );
}
