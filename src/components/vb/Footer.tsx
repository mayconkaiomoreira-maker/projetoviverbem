import { Instagram, Mail, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="glass border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="text-[15px] font-semibold text-primary">Projeto Viver Bem</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Conscientização sobre saúde mental, autoestima e qualidade de vida
            para estudantes e jovens.
          </p>
        </div>

        <nav aria-label="Links úteis">
          <p className="text-sm font-semibold">Links úteis</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a className="transition-colors duration-300 hover:text-primary" href="#sobre">
                Sobre o projeto
              </a>
            </li>
            <li>
              <a className="transition-colors duration-300 hover:text-primary" href="#temas">
                Temas
              </a>
            </li>
            <li>
              <a className="transition-colors duration-300 hover:text-primary" href="#objetivos">
                Objetivos
              </a>
            </li>
            <li>
              <a
                className="transition-colors duration-300 hover:text-primary"
                href="https://www.cvv.org.br"
                target="_blank"
                rel="noreferrer"
              >
                CVV — apoio emocional (188)
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Contato</p>
          <a
            href="mailto:contato@projetoviverbem.org"
            className="mt-3 inline-block text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            contato@projetoviverbem.org
          </a>
          <div className="mt-4 flex gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram do Projeto Viver Bem"
              className="tap gradient-border glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:text-primary"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube do Projeto Viver Bem"
              className="tap gradient-border glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:text-primary"
            >
              <Youtube size={18} />
            </a>
            <a
              href="mailto:contato@projetoviverbem.org"
              aria-label="Enviar e-mail"
              className="tap gradient-border glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:text-primary"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Projeto Viver Bem. Conteúdo educativo, sem
        finalidade de diagnóstico.
      </div>
    </footer>
  );
}
