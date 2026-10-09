import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "glass";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Desliga o brilho animado do botão primário. */
  plain?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
  outline:
    "bg-secondary text-secondary-foreground hover:bg-accent/70",
  glass: "border border-border bg-card text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  plain = false,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "tap relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
