import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { topics } from "@/data/topics";
import { Button } from "@/components/vb/Button";
import studentMarks from "@/assets/student-marks.png";
import { ArrowRight, Heart, BookOpen, MessageCircle } from "lucide-react";
import { TopicStage } from "@/components/vb/TopicStage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Projeto Viver Bem — Saúde mental para estudantes" },
      {
        name: "description",
        content:
          "Uma experiência interativa sobre ansiedade, autoestima, pressão escolar e bem-estar para estudantes e jovens.",
      },
      { property: "og:title", content: "Projeto Viver Bem" },
      {
        property: "og:description",
        content:
          "Uma experiência interativa sobre saúde mental, autoestima e qualidade de vida para jovens.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    reset: search["reset"] ? 1 : undefined,
  }),
  component: Experiencia,
});

const introItems = [
  "Ansiedade",
  "Má alimentação",
  "Baixa autoestima",
  "Pressão escolar",
  "Excesso de redes sociais",
  "Dificuldade de se expressar",
];

function Experiencia() {
  const navigate = useNavigate();
  const { reset } = Route.useSearch();
  // 0 = boas-vindas, 1 = introdução, 2+ = tópicos
  const [step, setStep] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (reset) setStep(0);
  }, [reset]);

  useEffect(() => {
    if (step !== 1) return;
    setVisibleItems(0);
    const timers = introItems.map((_, i) =>
      setTimeout(() => setVisibleItems(i + 1), 350 * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const goLanding = () => navigate({ to: "/projeto" });
  const topicIndex = step - 2;

  return (
    <main className="min-h-dvh">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.section
            key="welcome"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="welcome-section flex flex-col items-center justify-center px-6 text-center"
          >
            <img src={studentMarks} width={1536} height={512} alt="" className="character-row" />
            <h1 className="display-title mt-5 max-w-4xl">
              Projeto <span className="hero-highlight">Viver Bem</span>
            </h1>
            <p className="mt-4 text-xl font-medium sm:text-2xl">Seja bem-vindo. Cuidar de você importa.</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Uma experiência criada para conscientizar sobre desafios
              enfrentados por muitos jovens.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={() => setStep(1)}>
                Começar <ArrowRight size={17} />
              </Button>
              <Button variant="outline" onClick={goLanding}>
                Pular
              </Button>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Heart size={16} /> Saúde mental</span>
              <span className="flex items-center gap-2"><BookOpen size={16} /> Seis temas</span>
              <span className="flex items-center gap-2"><MessageCircle size={16} /> Um espaço de escuta</span>
            </div>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex min-h-dvh flex-col items-center justify-center px-6"
          >
            <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-5xl">
              Aqui falaremos sobre:
            </h1>
            <ul className="mt-10 w-full max-w-md space-y-3">
              {introItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  animate={
                    i < visibleItems
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-[15px] shadow-soft sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-primary"
                  />
                  <span className="min-w-0">{item}</span>
                </motion.li>
              ))}
            </ul>

            <AnimatePresence>
              {visibleItems === introItems.length && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                  <Button size="lg" onClick={() => setStep(2)}>
                    Continuar
                  </Button>
                  <Button variant="ghost" onClick={goLanding}>
                    Pular
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {step >= 2 && topics[topicIndex] && (
          <motion.section
            key={topics[topicIndex].slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <TopicStage
              topic={topics[topicIndex]}
              index={topicIndex}
              total={topics.length}
              isLast={topicIndex === topics.length - 1}
              onSkip={goLanding}
              onNext={() =>
                topicIndex === topics.length - 1
                  ? goLanding()
                  : setStep((s) => s + 1)
              }
            />
          </motion.section>
        )}
      </AnimatePresence>
      {step === 0 && <div className="paper-preview mx-5 mb-12 flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:mx-auto"><span className="text-lg font-semibold">Pequenos passos. Mais bem-estar.</span><Button variant="ghost" onClick={goLanding}>Conhecer o projeto <ArrowRight size={16} /></Button></div>}
    </main>
  );
}
