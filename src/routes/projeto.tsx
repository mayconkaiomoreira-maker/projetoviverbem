import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeartPulse, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { topics, type Topic } from "@/data/topics";
import { Navbar } from "@/components/vb/Navbar";
import { Footer } from "@/components/vb/Footer";
import { Button } from "@/components/vb/Button";
import { SectionTitle } from "@/components/vb/SectionTitle";
import { Modal } from "@/components/vb/Modal";
import { ContentSlider } from "@/components/vb/ContentSlider";

export const Route = createFileRoute("/projeto")({
  head: () => ({
    meta: [
      { title: "Projeto Viver Bem — Cuidar da mente é cuidar do futuro" },
      {
        name: "description",
        content:
          "Conheça o Projeto Viver Bem: missão, objetivos e conteúdos sobre saúde mental, autoestima e qualidade de vida para estudantes.",
      },
      { property: "og:title", content: "Projeto Viver Bem" },
      {
        property: "og:description",
        content:
          "Missão, objetivos e conteúdos sobre saúde mental e bem-estar para estudantes.",
      },
    ],
  }),
  component: Landing,
});

const about = [
  {
    icon: HeartPulse,
    title: "Missão",
    text: "Levar informação clara e acolhedora sobre saúde mental para dentro da escola, sem julgamentos.",
  },
  {
    icon: Sparkles,
    title: "Objetivo",
    text: "Ajudar estudantes a reconhecer sinais, nomear emoções e saber onde buscar apoio.",
  },
  {
    icon: Users,
    title: "Impacto",
    text: "Ambientes escolares mais empáticos, com jovens que conversam e pedem ajuda mais cedo.",
  },
];

const goals = [
  "Reduzir o estigma em torno da saúde mental",
  "Estimular hábitos de sono, alimentação e movimento",
  "Fortalecer a autoestima e a autoimagem",
  "Ensinar formas saudáveis de lidar com a pressão escolar",
  "Promover o uso consciente das redes sociais",
  "Criar espaços seguros de escuta e diálogo",
];

function Landing() {
  const [selected, setSelected] = useState<Topic | null>(null);

  return (
    <div className="min-h-dvh">
      <Navbar />

      <main id="inicio">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-2 lg:gap-16 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <p className="text-sm font-semibold tracking-wide text-primary">
              Projeto Viver Bem
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Cuidar da mente também é cuidar do futuro.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              O Projeto Viver Bem busca conscientizar estudantes sobre saúde
              mental, autoestima e qualidade de vida.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#temas">
                <Button size="lg">Explorar conteúdos</Button>
              </a>
              <Link to="/" search={{ reset: 1 }}>
                <Button size="lg" variant="outline">
                  Rever a experiência
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="overflow-hidden rounded-[28px] bg-card shadow-lift"
          >
            <img
              src={heroImg}
              alt="Grupo de estudantes sorrindo lado a lado"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        </section>

        <section id="sobre" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <SectionTitle
            eyebrow="Sobre"
            title="Um projeto feito para quem está crescendo"
            description="Informação simples, linguagem próxima e conteúdo pensado para a rotina de quem estuda."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {about.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeInOut" }}
                className="tap rounded-[28px] bg-card p-7 shadow-soft hover:shadow-lift"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                  <a.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {a.text}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="objetivos" className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
          <SectionTitle
            eyebrow="Objetivos"
            title="Onde queremos chegar"
            description="Metas concretas que orientam cada conteúdo produzido pelo projeto."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {goals.map((g, i) => (
              <motion.li
                key={g}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeInOut" }}
                className="flex items-start gap-4 rounded-3xl bg-card px-6 py-5 shadow-soft"
              >
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 text-[15px] text-muted-foreground">
                  {g}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section id="temas" className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
          <SectionTitle
            eyebrow="Temas"
            title="Os seis assuntos do projeto"
            description="Cada tema traz o que é, os principais sinais e caminhos possíveis para lidar."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, i) => (
              <motion.article
                key={t.slug}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeInOut" }}
                className="tap flex flex-col overflow-hidden rounded-[28px] bg-card shadow-soft hover:shadow-lift"
              >
                <img
                  src={t.image}
                  alt={t.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {t.short}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-5 self-start"
                    onClick={() => setSelected(t)}
                  >
                    Saiba mais
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ""}
      >
        {selected && <ContentSlider topic={selected} />}
      </Modal>
    </div>
  );
}
