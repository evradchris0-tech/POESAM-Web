"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Shield, Activity, Ban, EyeOff } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { RiskBreakdown } from "@/components/admin/risk-breakdown";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GenericBadge } from "@/components/ui/status-badge";
import { FRAUD_ALERTS, FRAUD_HISTOGRAM } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import { useToast } from "@/components/ui/toast";

export default function FraudPage() {
  const alert = FRAUD_ALERTS[0];
  const maxBucket = Math.max(...FRAUD_HISTOGRAM.map((b) => b.count));
  const { push } = useToast();
  const [dialog, setDialog] = useState<null | "block" | "verify" | "fp">(null);
  const closeDialog = () => setDialog(null);

  return (
    <>
      <AdminTopbar crumb="Détection Fraude" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Détection Fraude</h1>
            <p className="text-[13.5px] text-ink-500">
              Isolation Forest v3 · 247 transactions scorées ce mois · 1 alerte active
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold">
              Historique alertes
            </button>
            <button className="h-9 px-3.5 rounded-md bg-navy text-white hover:bg-navy-500 text-[13px] font-semibold">
              Configurer seuils
            </button>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Transactions scorées" value="247" sub="30 derniers jours" />
          <StatCard label="Flaggées risk > 60" value="12" sub="≈ 4,9% du volume" tone="warning" />
          <StatCard label="Confirmées fraude" value="1" sub="Taux confirmation 8%" tone="danger" />
          <StatCard label="Faux positifs" value="11" sub="Pondèrent le modèle" tone="muted" />
        </div>

        {/* Featured alert */}
        <div className="bg-white border-2 border-danger-500 rounded-xl overflow-hidden mb-6 shadow-card">
          <div className="px-6 py-4 bg-danger-100/70 border-b border-danger-500/30 flex items-start gap-4">
            <div className="w-11 h-11 grid place-items-center rounded-md bg-danger-500 text-white flex-none">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-danger-700">
                  Alerte active
                </span>
                <span className="font-mono text-xs bg-white px-1.5 py-0.5 rounded text-ink-700">
                  {alert.id}
                </span>
                <GenericBadge tone="navy">{alert.model}</GenericBadge>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-ink-900 mb-1">
                {alert.pattern}
              </h2>
              <p className="text-sm text-ink-700 leading-relaxed">{alert.detail}</p>
            </div>
            <div className="flex-none text-right">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-400">
                Risk Score
              </div>
              <div className="text-5xl font-bold tabular tracking-tight text-danger-500 leading-none">
                {alert.risk}
              </div>
              <div className="text-xs text-ink-500 mt-1 tabular">/ 100</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-black/[0.08]">
            <div>
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Risk Breakdown — 5 dimensions XGBoost</h4>
                <Shield className="w-4 h-4 text-ink-400" />
              </div>
              <RiskBreakdown items={alert.breakdown} />
            </div>
            <div>
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Pattern detection — transactions similaires</h4>
                <Activity className="w-4 h-4 text-ink-400" />
              </div>
              <ul className="divide-y divide-black/[0.08]">
                {alert.similar.map((s) => (
                  <li key={s.id} className="px-5 py-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-center text-sm">
                    <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded text-ink-700 w-fit">
                      {s.id}
                    </span>
                    <span className="tabular text-sm font-medium">{formatFCFA(s.amount)}</span>
                    <span className="col-span-2 text-xs text-ink-500 leading-snug">
                      {s.date} · vers <b className="text-ink-700">{s.buyer}</b> · {s.sharedPattern}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/admin/escrow"
                className="block text-center text-xs font-semibold text-navy py-3 border-t border-black/[0.08] hover:bg-surface"
              >
                Voir les transactions concernées →
              </Link>
            </div>
          </div>

          <div className="px-6 py-4 bg-surface border-t border-black/[0.08] flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => setDialog("fp")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md border border-black/[0.08] bg-white text-ink-700 text-[13px] font-semibold hover:bg-ink-100"
            >
              <EyeOff className="w-3.5 h-3.5" />
              Marquer faux positif
            </button>
            <button
              onClick={() => setDialog("verify")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-white border border-warning-500 text-warning-700 text-[13px] font-semibold hover:bg-warning-100"
            >
              Demander vérif manuelle
            </button>
            <button
              onClick={() => setDialog("block")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-danger-500 text-white text-[13px] font-semibold hover:bg-danger-700"
            >
              <Ban className="w-3.5 h-3.5" />
              Bloquer la transaction
            </button>
          </div>
        </div>

        {/* Histogram */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <h4 className="text-sm font-semibold">Distribution risk scores · 30 derniers jours</h4>
              <span className="text-xs text-ink-500">247 transactions</span>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-2 h-44">
                {FRAUD_HISTOGRAM.map((b) => {
                  const h = (b.count / maxBucket) * 100;
                  const colors = {
                    success: "bg-success-500",
                    warning: "bg-warning-500",
                    danger: "bg-danger-500",
                  };
                  return (
                    <div key={b.range} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[10px] tabular font-semibold text-ink-700">{b.count}</div>
                      <div className="w-full bg-ink-100 rounded-sm overflow-hidden flex flex-col-reverse" style={{ height: "140px" }}>
                        <div className={`w-full rounded-sm ${colors[b.tone]}`} style={{ height: `${Math.max(h, 2)}%` }} />
                      </div>
                      <div className="text-[10px] text-ink-500 tabular">{b.range}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t border-black/[0.08] text-xs text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-success-500" /> Risque faible (&lt; 30)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-warning-500" /> Modéré (30–60)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-danger-500" /> Élevé (&gt; 60)
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Comment ça marche</h4>
              </div>
              <div className="p-5 text-sm text-ink-700 leading-relaxed">
                <p className="mb-3">
                  Chaque transaction passe par <b>Isolation Forest</b> (détection d'anomalie non supervisée)
                  puis par <b>XGBoost</b> qui pondère 5 dimensions de risque.
                </p>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Le modèle est ré-entraîné chaque trimestre sur les transactions clôturées
                  (succès + fraudes confirmées). Les faux positifs marqués par les admins
                  pondèrent négativement.
                </p>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Seuils actifs</h4>
              </div>
              <ul className="text-[13px]">
                <li className="px-5 py-3 flex justify-between border-b border-black/[0.08]">
                  <span>Auto-escrow</span>
                  <b className="text-success-700 tabular">&lt; 30</b>
                </li>
                <li className="px-5 py-3 flex justify-between border-b border-black/[0.08]">
                  <span>Vérif documentaire</span>
                  <b className="text-warning-700 tabular">30 – 60</b>
                </li>
                <li className="px-5 py-3 flex justify-between border-b border-black/[0.08]">
                  <span>Validation manuelle</span>
                  <b className="text-warning-700 tabular">60 – 75</b>
                </li>
                <li className="px-5 py-3 flex justify-between">
                  <span>Blocage automatique</span>
                  <b className="text-danger-700 tabular">≥ 75</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={dialog === "block"}
        title="Bloquer la transaction ?"
        description={`${alert.txId} sera immédiatement gelée. Vendeur et acheteur recevront une notification. Cette action sera revue par l'équipe LA RUCHE sous 24 h.`}
        confirmLabel="Bloquer immédiatement"
        tone="danger"
        onConfirm={() => push({ tone: "danger", title: "Transaction bloquée", description: `${alert.txId} gelée · équipe notifiée.` })}
        onClose={closeDialog}
      />
      <ConfirmDialog
        open={dialog === "verify"}
        title="Demander une vérification manuelle ?"
        description="Le vendeur sera contacté pour fournir un justificatif d'activité supplémentaire (factures antérieures, attestation CCIMA). La transaction reste bloquée jusqu'à réception."
        confirmLabel="Envoyer la demande"
        tone="default"
        onConfirm={() => push({ tone: "info", title: "Vérif demandée", description: "Vendeur notifié — SLA 72 h." })}
        onClose={closeDialog}
      />
      <ConfirmDialog
        open={dialog === "fp"}
        title="Marquer comme faux positif ?"
        description="L'alerte sera classée et utilisée pour ré-entraîner le modèle. La transaction reprendra son cours normal."
        confirmLabel="Confirmer faux positif"
        tone="success"
        onConfirm={() => push({ tone: "success", title: "Faux positif enregistré", description: "Le modèle apprendra de cette correction." })}
        onClose={closeDialog}
      />
    </>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "default" | "warning" | "danger" | "muted";
}) {
  const valueColor = {
    default: "text-ink-900",
    warning: "text-warning-700",
    danger: "text-danger-500",
    muted: "text-ink-500",
  }[tone];
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
      <div className="text-xs text-ink-500 font-medium">{label}</div>
      <div className={`text-[28px] font-bold tabular leading-tight tracking-tight mt-1 ${valueColor}`}>
        {value}
      </div>
      <div className="text-[11.5px] text-ink-500 font-medium mt-1">{sub}</div>
    </div>
  );
}
