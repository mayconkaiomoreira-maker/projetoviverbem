import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Topic } from "@/data/topics";
import { Tag } from "./Tag";

const labels = ["O que é?", "Sintomas", "Como lidar"];

export function ContentSlider({ topic }: { topic: Topic }) {
  const [page, setPage] = useState(0);

  const go = (dir: number) =>
    setPage((p) => (p + dir + labels.length) % labels.length);

  return (
    <div className="glass gradient-border rounded-[28px] p-6 shadow-lift sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Conteúdo anterior"
          className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:text-primary"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="min-w-0 truncate text-center text-xs font-medium text-muted-foreground">
          {page + 1} / {labels.length}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo conteúdo"
          className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:text-primary"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-6 min-h-[15rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            aria-live="polite"
          >
            <Tag tone="gradient">{labels[page]}</Tag>
            <h3 className="mt-4 text-2xl font-semibold">{topic.title}</h3>

            {page === 0 && (
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {topic.what}
              </p>
            )}

            {page === 1 && (
              <ul className="mt-4 space-y-3">
                {topic.symptoms.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-[15px] text-muted-foreground sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
            )}

            {page === 2 && (
              <>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {topic.how}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {topic.tips.map((t) => (
                    <li
                      key={t}
                      className="gradient-border glass rounded-full px-4 py-2 text-sm text-accent-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {labels.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Ir para ${l}`}
            aria-current={i === page}
            className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
              i === page ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
