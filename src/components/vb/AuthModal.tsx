import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Lock, Mail, User as UserIcon, X } from "lucide-react";
import { Button } from "./Button";
import { Tag } from "./Tag";
import { Notice } from "./Notice";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";

const words = [
  "mente",
  "autoestima",
  "ansiedade",
  "futuro",
  "saúde",
  "equilíbrio",
  "confiança",
  "bem-estar",
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -8 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="inline-block font-semibold"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const field =
  "h-12 w-full rounded-2xl border border-border bg-background/70 pl-11 pr-4 text-[15px] outline-none transition-all duration-300 ease-in-out placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15";

export function AuthModal() {
  const { open, mode, closeModal, setMode } = useAuthModal();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setError(null);
      setBusy(false);
      setPassword("");
      setConfirm("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup") {
      if (name.trim().length < 3) return setError("Informe seu nome completo.");
      if (password.length < 6)
        return setError("A senha precisa ter ao menos 6 caracteres.");
      if (password !== confirm) return setError("As senhas não coincidem.");
      if (!terms) return setError("É preciso aceitar os termos para continuar.");
    }

    setBusy(true);
    try {
      if (mode === "signup") await signUp(name, email, password);
      else await signIn(email, password);
      await new Promise((r) => setTimeout(r, 700));
      closeModal();
      void navigate({ to: "/assistente" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setBusy(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-md"
            onClick={closeModal}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={isSignup ? "Criar conta" : "Entrar"}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="glass gradient-border relative flex h-full max-h-full w-full flex-col overflow-hidden shadow-lift sm:h-auto sm:max-h-[88vh] sm:w-[75vw] sm:max-w-5xl sm:flex-row sm:rounded-[32px]"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Fechar"
              className="tap absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-card/70 text-muted-foreground backdrop-blur hover:text-foreground"
            >
              <X size={18} />
            </button>

            {/* Lado esquerdo — 40% */}
            <div className="relative hidden flex-col justify-center gap-4 bg-[image:var(--gradient-primary)] p-12 sm:flex sm:w-2/5">
              <Tag className="self-start border-primary-foreground/25 text-primary-foreground">Projeto Viver Bem</Tag>
              <p className="text-3xl font-semibold leading-tight tracking-tight text-primary-foreground">
                Cuidar da sua <RotatingWord /> pode transformar sua vida.
              </p>
              <p className="text-[15px] text-primary-foreground/80">
                Estamos aqui para caminhar com você.
              </p>
            </div>

            {/* Lado direito — 60% */}
            <div className="flex flex-1 items-center justify-center overflow-y-auto bg-muted/40 p-6 sm:w-3/5 sm:p-10">
              <div className="gradient-border glass w-full max-w-md rounded-[28px] p-6 shadow-soft sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    key={mode}
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, x: isSignup ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isSignup ? -60 : 60 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {isSignup ? "Criar conta" : "Entrar"}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {isSignup
                          ? "Leva menos de um minuto."
                          : "Acesse o Assistente IA do projeto."}
                      </p>
                    </div>

                    {isSignup && (
                      <div className="relative">
                        <UserIcon
                          size={17}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          className={field}
                          placeholder="Nome completo"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="relative">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        className={field}
                        type="email"
                        required
                        placeholder="E-mail"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        className={field}
                        type="password"
                        required
                        placeholder="Senha"
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {isSignup && (
                      <>
                        <div className="relative">
                          <Lock
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <input
                            className={field}
                            type="password"
                            required
                            placeholder="Confirmar senha"
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                          />
                        </div>
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
                          />
                          <span>
                            Li e concordo com os Termos de Uso e Política de
                            Privacidade.
                          </span>
                        </label>
                      </>
                    )}

                    {error && <Notice tone="warning">{error}</Notice>}

                    <Button type="submit" className="w-full" disabled={busy}>
                      {busy ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          {isSignup ? "Criando sua conta..." : "Entrando..."}
                        </>
                      ) : isSignup ? (
                        "Criar conta"
                      ) : (
                        "Entrar"
                      )}
                    </Button>

                    <div className="pt-1 text-center text-sm text-muted-foreground">
                      {isSignup ? "Já possui uma conta?" : "Não possui uma conta?"}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setError(null);
                        setMode(isSignup ? "login" : "signup");
                      }}
                    >
                      {isSignup ? "Entrar" : "Criar conta"}
                    </Button>
                  </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
