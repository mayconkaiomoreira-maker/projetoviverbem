import { createFileRoute } from "@tanstack/react-router";
import { ChatApp } from "@/components/vb/ChatApp";

export const Route = createFileRoute("/_authenticated/assistente/$id")({
  head: () => ({
    meta: [
      { title: "Conversa — Assistente Viver Bem" },
      {
        name: "description",
        content:
          "Sua conversa com o Assistente IA do Projeto Viver Bem sobre saúde mental e bem-estar.",
      },
      { property: "og:title", content: "Conversa — Assistente Viver Bem" },
      {
        property: "og:description",
        content: "Apoio educativo e acolhedor sobre bem-estar emocional.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return <ChatApp key={id} conversationId={id} />;
}
