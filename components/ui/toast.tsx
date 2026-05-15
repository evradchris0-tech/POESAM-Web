"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Check, AlertTriangle, Info, X, AlertOctagon } from "lucide-react";

type Tone = "success" | "warning" | "danger" | "info";

interface Toast {
  id: number;
  tone: Tone;
  title: string;
  description?: string;
}

interface ToastContextValue {
  push: (t: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue>({ push: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => remove(id), 4500);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none w-full max-w-sm">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: Check,
    warning: AlertTriangle,
    danger: AlertOctagon,
    info: Info,
  };
  const tones = {
    success: "border-success-500/40 bg-white",
    warning: "border-warning-500/40 bg-white",
    danger: "border-danger-500/40 bg-white",
    info: "border-navy/30 bg-white",
  };
  const iconWrap = {
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    danger: "bg-danger-100 text-danger-700",
    info: "bg-navy-100 text-navy",
  };
  const Icon = icons[toast.tone];
  return (
    <div
      role="status"
      className={`pointer-events-auto rounded-lg border-2 shadow-lift p-3.5 flex gap-3 items-start animate-[slideIn_200ms_ease-out] ${tones[toast.tone]}`}
      style={{ animation: "slideIn 240ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className={`w-8 h-8 rounded-md grid place-items-center flex-none ${iconWrap[toast.tone]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-ink-900 leading-tight">{toast.title}</div>
        {toast.description ? (
          <div className="text-xs text-ink-500 mt-1 leading-snug">{toast.description}</div>
        ) : null}
      </div>
      <button
        onClick={onClose}
        className="w-7 h-7 rounded-md grid place-items-center text-ink-400 hover:bg-ink-100"
        aria-label="Fermer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
