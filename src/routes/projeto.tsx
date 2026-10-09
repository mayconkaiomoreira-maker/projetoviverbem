import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeartPulse, Sparkles, Users } from "lucide-react";
import studentMarks from "@/assets/student-marks.png";
import { TopicArtwork } from "@/components/vb/TopicArtwork";
import { topics, type Topic } from "@/data/topics";
import { Navbar } from "@/components/vb/Navbar";
import { Footer } from "@/components/vb/Footer";
import { Button } from "@/components/vb/Button";
import { SectionTitle } from "@/components/vb/SectionTitle";
import { Modal } from "@/components/vb/Modal";
import { ContentSlider } from "@/components/vb/ContentSlider";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";

export const Route = createFileRoute("/projeto")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Projeto Viver Bem — Cuidar da mente é cuidar do futuro" },
      {
        name: "description",
        content:
          "Conheça o Projeto Viver Bem: missão, objetivos e conteúdos sobre saúde mental, autoestima e qualidade de vida para estudantes.",
      },
      { property: "og:title", content: "Conheça o Projeto Viver Bem" },
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
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  return (
    <div className="min-h-dvh">
      <Navbar />

      <main id="inicio">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-14 pt-28 text-center sm:pt-32">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex w-full flex-col items-center">
            <img src={studentMarks} width={1536} height={512} alt="" className="character-row" />
            <h1 className="display-title mt-4 max-w-4xl">Projeto <span className="hero-highlight">Viver Bem</span></h1>
            <p className="mt-5 text-xl font-medium sm:text-2xl">Cuidar da mente também é cuidar do futuro.</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">O Projeto Viver Bem busca conscientizar estudantes sobre saúde mental, autoestima e qualidade de vida.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#temas"><Button>Explorar conteúdos</Button></a>
              <Link to="/" search={{ reset: 1 }}><Button variant="outline">Rever a experiência</Button></Link>
            </div>
          </motion.div>
          <div className="mt-14 grid w-full max-w-4xl grid-cols-3 gap-3 sm:gap-5">
            {[0, 2, 5].map((index) => <div key={index} className="overflow-hidden rounded-xl"><TopicArtwork index={index} className="aspect-[4/3]" /></div>)}
          </div>
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
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.2, delay: i * 0.1, ease: "easeInOut" }}
                className={`rounded-xl border border-border p-7 ${["bg-card", "bg-accent", "bg-peach"][i]}`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-primary">
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
                transition={{ duration: 0.2, delay: i * 0.05, ease: "easeInOut" }}
                className="flex items-start gap-4 border-b border-border px-2 py-5"
              >
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-peach text-xs font-semibold text-foreground">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.2, delay: (i % 3) * 0.1, ease: "easeInOut" }}
                className="card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <TopicArtwork index={i} />
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

        <section id="assistente" className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-y border-border bg-marigold px-7 py-14 text-center sm:px-14"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-card/50 text-foreground">
              <Sparkles size={24} aria-hidden="true" />
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Converse com o Assistente IA do Viver Bem
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/75 sm:text-base">
              Tire dúvidas sobre ansiedade, autoestima, rotina e bem-estar em um
              espaço acolhedor. Crie sua conta gratuita para começar.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {isAuthenticated ? (
                <Link to="/assistente">
                  <Button size="lg" variant="outline">
                    Abrir assistente
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={() => openModal("signup")}
                  >
                    Criar conta gratuita
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-foreground hover:bg-card/30 hover:text-foreground"
                    onClick={() => openModal("login")}
                  >
                    Já tenho conta
                  </Button>
                </>
              )}
            </div>
          </motion.div>
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
