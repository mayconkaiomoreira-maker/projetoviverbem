import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Topic } from "@/data/topics";
import { Button } from "./Button";
import { ContentSlider } from "./ContentSlider";
import { ProgressBar } from "./ProgressBar";
import { Tag } from "./Tag";

export function TopicStage({
  topic,
  index,
  total,
  onNext,
  onSkip,
  isLast,
}: {
  topic: Topic;
  index: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-16 sm:py-20">
      <Tag tone="gradient">Tema {index + 1} de {total}</Tag>
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mt-5 text-center text-4xl font-semibold sm:text-6xl"
      >
        {topic.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
        className="mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg"
      >
        {topic.short}
      </motion.p>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="surface gradient-border card-lift mt-10 w-full max-w-2xl overflow-hidden rounded-[28px]"
      >
        <img
          src={topic.image}
          alt={topic.alt}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-[38vh] w-full object-cover sm:h-[45vh]"
        />
        <span className="block px-6 py-4 text-sm text-muted-foreground">
          {open ? "Toque para recolher" : "Toque na imagem para saber mais"}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="mt-8 w-full max-w-2xl"
          >
            <ContentSlider topic={topic} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex flex-col items-center gap-6">
        <ProgressBar current={index + 1} total={total} />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onNext} size="lg">
            {isLast ? "Ver o projeto" : "Próximo tema"}
          </Button>
          <Button variant="ghost" onClick={onSkip}>
            Pular
          </Button>
        </div>
      </div>
    </div>
  );
}
