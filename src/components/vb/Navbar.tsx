import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

const items = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Temas", href: "#temas" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between"
      >
        <a
          href="#inicio"
          className="min-w-0 truncate text-[15px] font-semibold tracking-tight"
        >
          Projeto Viver Bem
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="text-sm text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated ? (
            <Link to="/assistente" className="hidden lg:block">
              <Button size="sm">
                <Sparkles size={15} /> Assistente IA
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => openModal("login")}
            >
              Entrar
            </Button>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="tap grid h-11 w-11 place-items-center rounded-full bg-muted text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-4">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[15px] text-foreground"
                >
                  {i.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/" search={{ reset: 1 }}>
                <Button size="sm" className="w-full">
                  Começar novamente
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
