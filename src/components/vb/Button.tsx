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
    "bg-[image:var(--gradient-primary)] text-primary-foreground glow hover:brightness-[1.06]",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
  outline:
    "gradient-border glass text-foreground hover:text-primary hover:shadow-soft",
  glass: "glass text-foreground shadow-soft hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
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
        "tap relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        variant === "primary" && !plain && "shimmer",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
