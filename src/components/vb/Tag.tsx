import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "primary" | "gradient";

const tones: Record<Tone, string> = {
  default:
    "glass text-muted-foreground",
  primary:
    "bg-accent text-primary border border-primary/20",
  gradient:
    "gradient-border glass text-foreground",
};

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
