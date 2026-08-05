import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/vb/Button";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Projeto Viver Bem" },
      {
        name: "description",
        content: "Gerencie seu nome e sua conta no Projeto Viver Bem.",
      },
      { property: "og:title", content: "Meu perfil — Projeto Viver Bem" },
      {
        property: "og:description",
        content: "Configurações da sua conta no Projeto Viver Bem.",
      },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { profile, user, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setName(profile?.full_name ?? "");
  }, [profile?.full_name]);

  async function save() {
    if (!user) return;
    setBusy(true);
    setOk(false);
    await supabase.from("profiles").update({ full_name: name.trim() }).eq("id", user.id);
    await refreshProfile();
    setBusy(false);
    setOk(true);
  }

  return (
    <div className="min-h-dvh bg-background px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="mx-auto max-w-xl"
      >
        <Link
          to="/assistente"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} /> Voltar ao assistente
        </Link>

        <div className="mt-6 rounded-[28px] bg-card p-7 shadow-soft">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {(profile?.full_name || user?.email || "?").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {profile?.full_name || "Meu perfil"}
              </h1>
              <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <label className="mt-8 block text-sm font-medium" htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-[15px] outline-none transition-all duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/15"
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={save} disabled={busy}>
              {busy ? <Loader2 size={17} className="animate-spin" /> : null}
              Salvar alterações
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut();
                void navigate({ to: "/projeto" });
              }}
            >
              <LogOut size={16} /> Sair da conta
            </Button>
          </div>

          {ok && (
            <p className="mt-4 text-sm text-primary">Perfil atualizado com sucesso.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
