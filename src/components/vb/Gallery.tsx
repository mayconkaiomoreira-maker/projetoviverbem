import { useState } from "react";
import { motion } from "motion/react";
import { Modal } from "./Modal";
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
      <div className="mt-12 columns-2 gap-4 lg:columns-3">
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
            <img src={p.src} alt={p.alt} loading="lazy" className="w-full" />
            <span className="block px-4 py-3 text-sm text-muted-foreground">
              {p.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open !== null ? photos[open].caption : ""}
      >
        {open !== null && (
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
