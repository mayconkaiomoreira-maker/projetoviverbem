import { motion } from "motion/react";

/**
 * Fundo ambiente com blobs de gradiente flutuantes.
 * Adaptado do componente "Floating Gradient" da biblioteca 21st.dev,
 * usando os tokens de cor do Projeto Viver Bem.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <motion.div
        className="absolute -left-[10%] top-[-10%] h-[52vmax] w-[52vmax] rounded-full bg-primary/25 blur-[110px]"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[12%] h-[46vmax] w-[46vmax] rounded-full bg-ambient-rose/25 blur-[120px]"
        animate={{ x: [0, -50, 30, 0], y: [0, 70, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[25%] h-[50vmax] w-[50vmax] rounded-full bg-ambient-mint/30 blur-[130px]"
        animate={{ x: [0, 40, -40, 0], y: [0, -50, -10, 0], scale: [1, 1.18, 1.02, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--background)_95%)] opacity-70" />
    </div>
  );
}
