import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "./Button";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";

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
  const [hovered, setHovered] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        aria-label="Navegação principal"
        animate={{ scale: scrolled ? 0.985 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-shadow duration-200 ease-in-out sm:px-5 lg:flex lg:justify-between ${
          scrolled ? "glass gradient-border shadow-soft" : "bg-transparent"
        }`}
      >
        <a
          href="#inicio"
          className="min-w-0 truncate text-[15px] font-semibold tracking-tight"
        >
          Projeto Viver Bem
        </a>

        <ul
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {items.map((i) => (
            <li key={i.href} className="relative">
              <a
                href={i.href}
                onMouseEnter={() => setHovered(i.href)}
                className="relative z-10 block rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground"
              >
                {i.label}
              </a>
              {hovered === i.href && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
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
            className="tap glass grid h-11 w-11 place-items-center rounded-full text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="glass gradient-border mx-auto mt-2 max-w-6xl rounded-xl shadow-lift lg:hidden"
        >
          <ul className="px-4 py-3">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-[15px] text-foreground transition-colors duration-200 hover:bg-accent"
                >
                  {i.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              {isAuthenticated ? (
                <Link to="/assistente" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full">
                    <Sparkles size={15} /> Assistente IA
                  </Button>
                </Link>
              ) : (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    openModal("login");
                  }}
                >
                  Entrar
                </Button>
              )}
            </li>
            <li className="pt-2">
              <Link to="/" search={{ reset: 1 }} onClick={() => setOpen(false)}>
                <Button size="sm" variant="outline" className="w-full">
                  Começar novamente
                </Button>
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
