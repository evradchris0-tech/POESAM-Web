"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "default" | "danger" | "success";
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Annuler",
  tone = "default",
  onConfirm,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toneClasses = {
    default: "bg-navy hover:bg-navy-500 text-white",
    danger: "bg-danger-500 hover:bg-danger-700 text-white",
    success: "bg-success-500 hover:bg-success-700 text-white",
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 grid place-items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-black/[0.08] w-full max-w-md shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100" aria-label="Fermer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5 text-sm text-ink-700 leading-relaxed">{description}</div>
        <div className="px-5 py-4 border-t border-black/[0.08] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-md border border-black/[0.08] bg-white text-ink-700 text-sm font-semibold hover:bg-ink-100"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`h-10 px-4 rounded-md text-sm font-semibold ${toneClasses[tone]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
