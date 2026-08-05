import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ModalValue = {
  open: boolean;
  mode: "login" | "signup";
  openModal: (mode?: "login" | "signup") => void;
  closeModal: () => void;
  setMode: (mode: "login" | "signup") => void;
};

const Ctx = createContext<ModalValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const value = useMemo<ModalValue>(
    () => ({
      open,
      mode,
      openModal: (next = "login") => {
        setMode(next);
        setOpen(true);
      },
      closeModal: () => setOpen(false),
      setMode,
    }),
    [open, mode],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthModal precisa estar dentro de AuthModalProvider");
  return ctx;
}
