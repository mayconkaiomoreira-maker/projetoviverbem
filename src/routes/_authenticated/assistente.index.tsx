import { useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/assistente/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Assistente IA — Projeto Viver Bem" },
      {
        name: "description",
        content:
          "Converse com o Assistente IA do Projeto Viver Bem sobre ansiedade, autoestima, rotina e bem-estar.",
      },
      { property: "og:title", content: "Assistente IA — Projeto Viver Bem" },
      {
        property: "og:description",
        content: "Apoio educativo sobre saúde mental para estudantes.",
      },
    ],
  }),
  component: AssistenteIndex,
});

function AssistenteIndex() {
  const navigate = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .order("updated_at", { ascending: false })
        .limit(1);

      const found = existing?.[0]?.id;
      if (found) {
        void navigate({ to: "/assistente/$id", params: { id: found }, replace: true });
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) return;

      const { data: created } = await supabase
        .from("conversations")
        .insert({ user_id: userId })
        .select("id")
        .single();

      if (created) {
        void navigate({
          to: "/assistente/$id",
          params: { id: created.id },
          replace: true,
        });
      }
    })();
  }, [navigate]);

  return (
    <div className="grid h-dvh place-items-center bg-background">
      <Loader2 className="animate-spin text-primary" size={26} />
    </div>
  );
}
