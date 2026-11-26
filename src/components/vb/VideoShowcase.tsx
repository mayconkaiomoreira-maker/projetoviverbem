import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import v1 from "@/assets/registro-01.mp4.asset.json";
import v2 from "@/assets/registro-02.mp4.asset.json";
import v3 from "@/assets/registro-03.mp4.asset.json";
import v4 from "@/assets/registro-04.mp4.asset.json";
import v5 from "@/assets/registro-05.mp4.asset.json";
import v6 from "@/assets/registro-06.mp4.asset.json";
import c1 from "@/assets/registro-01-capa.webp.asset.json";
import c2 from "@/assets/registro-02-capa.webp.asset.json";
import c3 from "@/assets/registro-03-capa.webp.asset.json";
import c4 from "@/assets/registro-04-capa.webp.asset.json";
import c5 from "@/assets/registro-05-capa.webp.asset.json";
import c6 from "@/assets/registro-06-capa.webp.asset.json";


const covers = [c1, c2, c3, c4, c5, c6];
const videos = [v1, v2, v3, v4, v5, v6].map((v, i) => ({ src: v.url, poster: covers[i]?.url, label: `Registro ${i + 1}` }));

export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const current = videos[active] ?? videos[0]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-16"
    >
      {/* Concentric frames: outer radius = inner radius + padding */}
      <div className="rounded-[28px] border border-border bg-card p-2 sm:p-3">
        <div className="rounded-[20px] border border-border bg-muted p-2 sm:rounded-[16px]">
          <div className="relative aspect-video overflow-hidden rounded-[12px] sm:rounded-[8px] bg-midnight">
            <AnimatePresence mode="wait">
              <motion.video
                key={current.src}
                src={current.src}
                controls
                playsInline
                preload="none"
                poster={current.poster}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-contain"
                aria-label={`Vídeo da atividade: ${current.label}`}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {videos.map((v, i) => {
          const on = i === active;
          return (
            <motion.button
              key={v.src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              aria-pressed={on}
              aria-label={`Assistir ${v.label}`}
              className={`rounded-[16px] border p-1.5 transition-colors duration-200 ${on ? "border-primary bg-accent" : "border-border bg-card hover:border-primary"}`}
            >
              <div className="relative aspect-video overflow-hidden rounded-[10px] bg-midnight">
                <img src={v.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className={`grid h-8 w-8 place-items-center rounded-full ${on ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}>
                    <Play size={14} aria-hidden="true" />
                  </span>
                </span>
              </div>
              <span className="mt-1.5 block text-xs font-medium text-muted-foreground">{v.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
