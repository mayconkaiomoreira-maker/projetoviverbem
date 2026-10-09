import { motion } from "motion/react";

export function ProgressBar({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label?: string;
}) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full max-w-xs">
      <div
        className="surface h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={label ?? "Progresso da experiência"}
      >
        <motion.div
          className="h-full rounded-full bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {current} de {total}
      </p>
    </div>
  );
}
