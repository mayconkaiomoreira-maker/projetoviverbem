import type { ReactNode } from "react";
import { Info, ShieldCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "warning" | "success";

const config: Record<Tone, { icon: typeof Info; ring: string; color: string }> = {
  info: {
    icon: Info,
    ring: "border-primary/25",
    color: "text-primary",
  },
  warning: {
    icon: TriangleAlert,
    ring: "border-warning/40",
    color: "text-warning",
  },
  success: {
    icon: ShieldCheck,
    ring: "border-success/40",
    color: "text-success",
  },
};

export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const { icon: Icon, ring, color } = config[tone];

  return (
    <div
      role="note"
      className={cn(
        "glass flex items-start gap-3 rounded-3xl border px-5 py-4 shadow-soft",
        ring,
        className,
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", color)} aria-hidden="true" />
      <div className="min-w-0 text-[14px] leading-relaxed text-muted-foreground">
        {title && (
          <p className="mb-1 font-semibold text-foreground">{title}</p>
        )}
        {children}
      </div>
    </div>
  );
}
