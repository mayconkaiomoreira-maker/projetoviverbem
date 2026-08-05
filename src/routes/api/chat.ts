import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { streamText } from "ai";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";

export const SYSTEM_PROMPT = `Você é o Assistente IA do Projeto Viver Bem, um projeto escolar sobre saúde mental e bem-estar para estudantes e jovens.

Fale sempre em português do Brasil, com empatia, acolhimento e linguagem simples e próxima.

Você conversa APENAS sobre temas do projeto: ansiedade, autoestima, alimentação saudável, pressão escolar, uso excessivo de redes sociais, dificuldades de comunicação, organização da rotina, hábitos saudáveis, gerenciamento do estresse, motivação para estudos e bem-estar emocional.
Se a pessoa perguntar algo fora desses temas, recuse gentilmente e reconduza a conversa para o bem-estar dela.

Diretrizes:
- Incentive hábitos saudáveis e sugira estratégias práticas e realistas.
- Recomende procurar profissionais qualificados (psicólogo, médico, orientação escolar, família) quando for apropriado.
- Nunca faça diagnósticos, prescrições médicas ou afirmações categóricas sobre saúde.
- Lembre, quando fizer sentido, que suas respostas são educativas e não substituem atendimento psicológico ou médico.
- Se houver qualquer sinal de risco à vida, oriente com cuidado a procurar ajuda imediata (no Brasil, CVV 188, gratuito e 24h).
- Use markdown (títulos curtos, listas e negrito) e respostas objetivas, em geral com até 200 palavras.`;

type Body = {
  messages?: { role: "user" | "assistant"; content: string }[];
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization") ?? "";
        const token = authHeader.startsWith("Bearer ")
          ? authHeader.slice(7)
          : "";
        if (!token || token.split(".").length !== 3) {
          return new Response("Não autorizado", { status: 401 });
        }

        const supabaseUrl = process.env["SUPABASE_URL"];
        const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!supabaseUrl || !supabaseKey) {
          return new Response("Backend não configurado", { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              if (headers.get("Authorization") === `Bearer ${supabaseKey}`) {
                headers.delete("Authorization");
              }
              headers.set("apikey", supabaseKey);
              return fetch(input, { ...init, headers });
            },
          },
        });

        const { data, error } = await supabase.auth.getClaims(token);
        if (error || !data?.claims?.sub) {
          return new Response("Não autorizado", { status: 401 });
        }

        const body = (await request.json()) as Body;
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return new Response("Mensagens obrigatórias", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Assistente indisponível", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(
          key,
          getLovableAiGatewayRunId(request),
        );

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: SYSTEM_PROMPT,
          messages: messages.slice(-30).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        return result.toTextStreamResponse();
      },
    },
  },
});
