import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUp,
  Loader2,
  LogOut,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
  User as UserIcon,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import studentMarks from "@/assets/student-marks.png";
import { Button } from "./Button";
import { useAuth } from "@/hooks/useAuth";

type Conversation = { id: string; title: string; updated_at: string };
type Message = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "Como lidar com a ansiedade antes das provas?",
  "Dicas para melhorar minha autoestima",
  "Como organizar minha rotina de estudos?",
  "Estou usando redes sociais demais, e agora?",
];

export function ChatApp({ conversationId }: { conversationId: string }) {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const name = profile?.full_name || user?.email?.split("@")[0] || "você";

  async function loadConversations() {
    const { data } = await supabase
      .from("conversations")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    setConversations((data as Conversation[]) ?? []);
  }

  useEffect(() => {
    void loadConversations();
  }, []);

  useEffect(() => {
    let active = true;
    setMessages([]);
    setStreaming(null);
    supabase
      .from("messages")
      .select("id, role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        const loaded = (data as Message[]) ?? [];
        // Não sobrescreve mensagens já enviadas enquanto o histórico carregava.
        setMessages((prev) => (prev.length > 0 ? prev : loaded));
      });
    inputRef.current?.focus();
    return () => {
      active = false;
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    setError(null);
    setInput("");
    setPending(true);

    const optimistic: Message = {
      id: `tmp-${Date.now()}`,
      role: "user",
      content,
    };
    const history = [...messages, optimistic];
    setMessages(history);

    const userId = user?.id;
    if (!userId) return;

    const { error: insertError } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, user_id: userId, role: "user", content });
    if (insertError) {
      setError("Não foi possível salvar sua mensagem.");
      setPending(false);
      return;
    }

    if (messages.length === 0) {
      const title = content.length > 46 ? `${content.slice(0, 46)}…` : content;
      await supabase.from("conversations").update({ title }).eq("id", conversationId);
      void loadConversations();
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        setError(
          res.status === 429
            ? "Muitas mensagens em pouco tempo. Aguarde um instante."
            : res.status === 402
              ? "O assistente está temporariamente indisponível."
              : "Não foi possível falar com o assistente agora.",
        );
        setPending(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setPending(false);
      setStreaming("");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreaming(acc);
      }

      setStreaming(null);
      const { data: saved } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          user_id: userId,
          role: "assistant",
          content: acc,
        })
        .select("id, role, content")
        .single();

      setMessages((prev) => [
        ...prev,
        (saved as Message) ?? {
          id: `tmp-a-${Date.now()}`,
          role: "assistant",
          content: acc,
        },
      ]);
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);
      void loadConversations();
    } catch {
      setError("Conexão interrompida. Tente novamente.");
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  async function newConversation() {
    const userId = user?.id;
    if (!userId) return;
    const { data } = await supabase
      .from("conversations")
      .insert({ user_id: userId })
      .select("id")
      .single();
    if (data) {
      setSidebar(false);
      void navigate({ to: "/assistente/$id", params: { id: data.id } });
    }
  }

  async function removeConversation(id: string) {
    await supabase.from("conversations").delete().eq("id", id);
    await loadConversations();
    if (id === conversationId) void navigate({ to: "/assistente" });
  }

  const empty = messages.length === 0 && !streaming && !pending;

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebar && (
          <motion.div
            className="fixed inset-0 z-40 bg-foreground/20  lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebar(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`bg-background fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/projeto" className="text-[15px] font-semibold tracking-tight">
            Viver Bem
          </Link>
          <Button variant="ghost"
            type="button"
            onClick={() => setSidebar(false)}
            aria-label="Fechar menu"
            className="tap grid h-10 w-10 place-items-center rounded-lg bg-muted lg:hidden"
          >
            <X size={17} />
          </Button>
        </div>

        <div className="px-4">
          <Button variant="primary"
            type="button"
            onClick={newConversation}
            className="tap flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[15px] font-medium text-primary-foreground shadow-soft hover:bg-primary-hover"
          >
            <Plus size={17} /> Nova conversa
          </Button>
        </div>

        <nav className="mt-5 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Conversas
          </p>
          {conversations.length === 0 && (
            <p className="px-3 text-sm text-muted-foreground">
              Nenhuma conversa ainda.
            </p>
          )}
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`group flex items-center gap-1 rounded-lg pr-1 transition-colors duration-200 ease-in-out ${
                c.id === conversationId ? "bg-accent" : "hover:bg-muted"
              }`}
            >
              <Link
                to="/assistente/$id"
                params={{ id: c.id }}
                onClick={() => setSidebar(false)}
                className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-sm"
              >
                <MessageSquare size={15} className="shrink-0 text-muted-foreground" />
                <span className="min-w-0 truncate">{c.title}</span>
              </Link>
              <Button variant="ghost"
                type="button"
                aria-label={`Excluir ${c.title}`}
                onClick={() => removeConversation(c.id)}
                className="tap grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground opacity-0 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            to="/perfil"
            className="tap flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              {name.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{name}</span>
            <UserIcon size={15} className="text-muted-foreground" />
          </Link>
          <Button variant="ghost"
            type="button"
            onClick={async () => {
              await signOut();
              void navigate({ to: "/projeto" });
            }}
            className="tap mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut size={15} /> Sair
          </Button>
        </div>
      </aside>

      {/* Chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="bg-card flex items-center gap-3 border-b border-border px-4 py-3 lg:px-8">
          <Button variant="ghost"
            type="button"
            onClick={() => setSidebar(true)}
            aria-label="Abrir conversas"
            className="tap grid h-10 w-10 place-items-center rounded-lg bg-muted lg:hidden"
          >
            <MessageSquare size={17} />
          </Button>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight">
              Assistente Viver Bem
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Conteúdo educativo — não substitui atendimento profissional
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {empty && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="pt-10 text-center"
              >
                <img src={studentMarks} width={1536} height={512} alt="" className="character-row mx-auto" />
                <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                  Olá, {name.split(" ")[0]} 👋
                </h1>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  Sou o assistente do Projeto Viver Bem. Podemos conversar sobre
                  ansiedade, autoestima, rotina, redes sociais e bem-estar.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <Button variant="ghost"
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="tap h-auto min-h-20 whitespace-normal rounded-xl border border-border bg-card px-5 py-4 text-left text-[15px] justify-start hover:bg-accent"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((m) => (
              <Bubble key={m.id} role={m.role} content={m.content} />
            ))}

            {streaming !== null && <Bubble role="assistant" content={streaming} />}

            {pending && (
              <div className="flex items-center gap-2 rounded-xl bg-card px-5 py-4 text-muted-foreground shadow-soft self-start">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Pensando...</span>
              </div>
            )}

            {error && (
              <p className="self-center rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="border-t border-border bg-background px-4 py-4  lg:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="mx-auto flex max-w-3xl items-end gap-2 rounded-xl border border-border bg-card p-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Escreva sua mensagem..."
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <Button variant="primary"
              type="submit"
              disabled={!input.trim() || pending || streaming !== null}
              aria-label="Enviar mensagem"
              className="tap grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
            >
              <ArrowUp size={18} />
            </Button>
          </form>
          <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-muted-foreground">
            Em caso de crise, ligue para o CVV — 188 (gratuito, 24h).
          </p>
        </div>
      </main>
    </div>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`max-w-[85%] rounded-xl px-5 py-4 text-[15px] leading-relaxed shadow-soft ${
        isUser
          ? "self-end bg-accent text-foreground"
          : "self-start bg-card text-foreground"
      }`}
    >
      {isUser ? (
        <p className="whitespace-pre-wrap">{content}</p>
      ) : (
        <div className="space-y-3 [&_a]:text-primary [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </motion.div>
  );
}
