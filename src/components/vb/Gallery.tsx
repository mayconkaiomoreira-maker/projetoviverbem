import { useState } from "react";
import { motion } from "motion/react";
import { Modal } from "./Modal";
import atividadeVideo from "@/assets/atividade-video.mp4.asset.json";
import atividadeVideoCapa from "@/assets/atividade-video-capa.webp.asset.json";
import atividade01 from "@/assets/atividade-01.jpg.asset.json";
import atividade02 from "@/assets/atividade-02.jpg.asset.json";
import atividade03 from "@/assets/atividade-03.jpg.asset.json";
import atividade04 from "@/assets/atividade-04.jpg.asset.json";
import atividade05 from "@/assets/atividade-05.jpg.asset.json";
import atividade06 from "@/assets/atividade-06.jpg.asset.json";
import atividade07 from "@/assets/atividade-07.jpg.asset.json";
import atividade08 from "@/assets/atividade-08.jpg.asset.json";
import atividade09 from "@/assets/atividade-09.jpg.asset.json";
import atividade10 from "@/assets/atividade-10.jpg.asset.json";
import mini01 from "@/assets/atividade-01-mini.webp.asset.json";
import mini02 from "@/assets/atividade-02-mini.webp.asset.json";
import mini03 from "@/assets/atividade-03-mini.webp.asset.json";
import mini04 from "@/assets/atividade-04-mini.webp.asset.json";
import mini05 from "@/assets/atividade-05-mini.webp.asset.json";
import mini06 from "@/assets/atividade-06-mini.webp.asset.json";
import mini07 from "@/assets/atividade-07-mini.webp.asset.json";
import mini08 from "@/assets/atividade-08-mini.webp.asset.json";
import mini09 from "@/assets/atividade-09-mini.webp.asset.json";
import mini10 from "@/assets/atividade-10-mini.webp.asset.json";

const minis = [mini01, mini02, mini03, mini04, mini05, mini06, mini07, mini08, mini09, mini10].map((m) => m.url);

const photos = [
  {
    src: atividade01.url,
    alt: "Três estudantes escrevendo juntos em cartões de papel colorido na sala de aula",
    caption: "Escrevendo os cartões da dinâmica",
  },
  {
    src: atividade02.url,
    alt: "Quatro estudantes de pé, apresentando suas ideias para a turma",
    caption: "Apresentando as ideias para a turma",
  },
  {
    src: atividade03.url,
    alt: "Dois estudantes conversando sobre a atividade, sentados perto da janela",
    caption: "Conversa em dupla durante a atividade",
  },
  {
    src: atividade04.url,
    alt: "Estudante entregando uma caneta a um colega sentado na carteira",
    caption: "Material trocado, conversa começando",
  },
  {
    src: atividade05.url,
    alt: "Grupo de quatro estudantes em roda de conversa no meio da sala",
    caption: "Roda de conversa no meio da sala",
  },
  {
    src: atividade06.url,
    alt: "Vista da sala de aula com estudantes escrevendo em grupos",
    caption: "A turma inteira na atividade",
  },
  {
    src: atividade07.url,
    alt: "Estudante concentrado escrevendo na carteira",
    caption: "Momento de concentração na escrita",
  },
  {
    src: atividade08.url,
    alt: "Três estudantes lendo juntos uma folha de papel",
    caption: "Leitura compartilhada em grupo",
  },
  {
    src: atividade09.url,
    alt: "Estudante entregando cartões de papel colorido a um colega",
    caption: "Cartões coloridos prontos para a dinâmica",
  },
  {
    src: atividade10.url,
    alt: "Estudantes escrevendo em folhas durante a oficina na sala de aula",
    caption: "Anotações durante a oficina",
  },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="mx-auto mt-12 max-w-sm overflow-hidden rounded-xl border border-border bg-card card-lift"
      >
        <video
          src={atividadeVideo.url}
          controls
          playsInline
          preload="none"
          poster={atividadeVideoCapa.url}
          className="w-full"
          aria-label="Vídeo da atividade do projeto na sala de aula"
        />
        <figcaption className="block px-4 py-3 text-sm text-muted-foreground">
          Registro em vídeo da dinâmica na sala de aula
        </figcaption>
      </motion.figure>

      <div className="mt-4 columns-2 gap-4 lg:columns-3">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25, delay: (i % 3) * 0.08, ease: "easeInOut" }}
            onClick={() => setOpen(i)}
            aria-label={`Ampliar foto: ${p.caption}`}
            className="card-lift mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-card text-left"
          >
            <img src={minis[i] ?? p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full" />
            <span className="block px-4 py-3 text-sm text-muted-foreground">
              {p.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open !== null ? photos[open]?.caption ?? "" : ""}
      >
        {open !== null && photos[open] && (
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="w-full rounded-lg"
          />
        )}
      </Modal>
    </>
  );
}
