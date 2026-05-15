"use client";

import { useEffect } from "react";
import { X, MapPin, Calendar, ShieldCheck, Briefcase, Activity } from "lucide-react";
import type { UserRow } from "@/lib/data";

interface Props {
  user: UserRow | null;
  onClose: () => void;
}

const ROLE_LABELS: Record<UserRow["role"], string> = {
  pme: "PME Exportatrice",
  buyer: "Acheteur / Importateur",
  agent: "Agent Coopérative",
  admin: "Admin LA RUCHE",
};

const STATUS_TONE: Record<UserRow["status"], { bg: string; fg: string; label: string }> = {
  actif: { bg: "bg-success-100", fg: "text-success-700", label: "Actif" },
  kyc_pending: { bg: "bg-warning-100", fg: "text-warning-700", label: "KYC en attente" },
  suspended: { bg: "bg-danger-100", fg: "text-danger-700", label: "Suspendu" },
};

export function UserDrawer({ user, onClose }: Props) {
  useEffect(() => {
    if (!user) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [user, onClose]);

  if (!user) return null;

  const tone = STATUS_TONE[user.status];

  return (
    <div className="fixed inset-0 z-[120] bg-black/30" onClick={onClose}>
      <aside
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white border-l border-black/[0.08] shadow-lift overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-black/[0.08] px-5 py-4 flex items-center justify-between z-10">
          <h3 className="text-sm font-semibold text-ink-500">Profil utilisateur</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full grid place-items-center text-white font-bold text-base bg-[#1B4D8E] flex-none">
              {user.initials}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 mb-0.5">
                {ROLE_LABELS[user.role]}
              </div>
              <h2 className="text-xl font-semibold tracking-tight">{user.name}</h2>
              <div className="flex items-center gap-1.5 text-sm text-ink-500 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {user.city}, {user.country}
              </div>
              <span
                className={`mt-2 inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium ${tone.bg} ${tone.fg}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                {tone.label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <Stat label="Trust Score" value={user.trust > 0 ? `${user.trust}/100` : "—"} barPct={user.trust} />
            <Stat label="Tx clôturées" value={String(user.txClosed)} />
          </div>

          <div className="mt-6 space-y-4">
            {user.sector ? (
              <DetailRow icon={Briefcase} label="Secteur">
                {user.sector}
              </DetailRow>
            ) : null}
            <DetailRow icon={Calendar} label="Inscrit le">
              {user.joinedAt}
            </DetailRow>
            <DetailRow icon={Activity} label="Dernière activité">
              {user.lastActive}
            </DetailRow>
            <DetailRow icon={ShieldCheck} label="ID utilisateur">
              <code className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{user.id}</code>
            </DetailRow>
          </div>

          {user.role === "pme" || user.role === "buyer" ? (
            <div className="mt-6 pt-6 border-t border-black/[0.08]">
              <h4 className="text-sm font-semibold mb-3">Badges</h4>
              <div className="flex flex-wrap gap-2">
                {user.trust >= 75 ? (
                  <Badge tone="success">Exportateur vérifié</Badge>
                ) : null}
                {user.txClosed >= 10 ? <Badge tone="navy">Transacteur régulier</Badge> : null}
                {user.txClosed >= 20 ? <Badge tone="orange">Top performer</Badge> : null}
                {user.status === "kyc_pending" ? <Badge tone="warning">KYC à finaliser</Badge> : null}
                {user.trust === 0 && user.txClosed === 0 ? (
                  <Badge tone="neutral">Nouvel utilisateur</Badge>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-6 pt-6 border-t border-black/[0.08] flex gap-2">
            <button className="h-10 px-4 rounded-md border border-black/[0.08] bg-white text-ink-700 text-sm font-semibold hover:bg-ink-100 flex-1">
              Envoyer un message
            </button>
            <button className="h-10 px-4 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-500 flex-1">
              Voir transactions
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Stat({ label, value, barPct }: { label: string; value: string; barPct?: number }) {
  return (
    <div className="border border-black/[0.08] rounded-md p-3">
      <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-400 mb-1">
        {label}
      </div>
      <div className="text-lg font-bold tabular text-ink-900">{value}</div>
      {barPct !== undefined ? (
        <div className="h-1 bg-ink-100 rounded mt-2 overflow-hidden">
          <div
            className={`h-full rounded ${
              barPct >= 75 ? "bg-success-500" : barPct >= 50 ? "bg-warning-500" : barPct > 0 ? "bg-danger-500" : "bg-ink-300"
            }`}
            style={{ width: `${Math.max(barPct, 4)}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Briefcase;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-7 h-7 rounded-md bg-surface grid place-items-center flex-none text-ink-500">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-400">{label}</div>
        <div className="text-ink-900 mt-0.5 break-words">{children}</div>
      </div>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "success" | "navy" | "orange" | "warning" | "neutral";
  children: React.ReactNode;
}) {
  const tones = {
    success: "bg-success-100 text-success-700",
    navy: "bg-navy-100 text-navy",
    orange: "bg-orange-100 text-orange-700",
    warning: "bg-warning-100 text-warning-700",
    neutral: "bg-ink-100 text-ink-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
