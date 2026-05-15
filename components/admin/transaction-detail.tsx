"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, Banknote, FileText, AlertTriangle, Snowflake, Check, X, MapPin } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { Timeline } from "@/components/admin/timeline";
import { CorridorBadge } from "@/components/ui/corridor-badge";
import { StatusBadge, RiskBadge } from "@/components/ui/status-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CORRIDORS, type Transaction } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import { useToast } from "@/components/ui/toast";

export function TransactionDetail({ tx }: { tx: Transaction }) {
  const corridor = CORRIDORS[tx.corridor];
  const { push } = useToast();
  const [dialog, setDialog] = useState<null | "release" | "dispute" | "freeze">(null);

  const closeDialog = () => setDialog(null);

  return (
    <>
      <AdminTopbar crumb={`Escrow / ${tx.id}`} />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <Link
          href="/admin/escrow"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-500 hover:text-navy font-medium mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux transactions
        </Link>

        {/* Header */}
        <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden mb-6">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-[12px] bg-surface px-2 py-1 rounded text-ink-700">{tx.id}</span>
                <CorridorBadge corridor={tx.corridor} />
                <StatusBadge status={tx.status} />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight mb-1.5 flex items-center gap-3">
                <span className="text-3xl">{tx.productEmoji}</span>
                {tx.product} · {tx.qty}
              </h1>
              <p className="text-sm text-ink-500">
                Ouvert le {tx.openedAt} · Livraison attendue : {tx.expectedDelivery}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-ink-400">
                Montant bloqué
              </div>
              <div className="text-[40px] font-bold tabular tracking-tight text-ink-900 leading-none">
                {formatFCFA(tx.amount)}
              </div>
              <div className="text-xs text-ink-500">
                Commission TradeFlow : <b className="text-ink-700 tabular">{formatFCFA(tx.commission)}</b>
              </div>
            </div>
          </div>
          {/* Actions bar */}
          <div className="px-6 py-3 bg-surface border-t border-black/[0.08] flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => setDialog("freeze")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md border border-black/[0.08] bg-white text-ink-700 text-[13px] font-semibold hover:bg-ink-100"
            >
              <Snowflake className="w-3.5 h-3.5" /> Geler la transaction
            </button>
            <button
              onClick={() => setDialog("dispute")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-white border border-warning-500 text-warning-700 text-[13px] font-semibold hover:bg-warning-100"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Ouvrir un litige
            </button>
            <button
              onClick={() => setDialog("release")}
              className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-success-500 text-white text-[13px] font-semibold hover:bg-success-700"
            >
              <Banknote className="w-3.5 h-3.5" /> Libérer les fonds
            </button>
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
          {/* Left col: Timeline + Documents */}
          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Chronologie escrow</h4>
                <span className="text-xs text-ink-500">{tx.timeline.length} événements</span>
              </div>
              <div className="p-5">
                <Timeline events={tx.timeline} />
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Documents douaniers</h4>
                <span className="text-xs text-ink-500">{tx.documents.length} document(s)</span>
              </div>
              <ul className="divide-y divide-black/[0.08]">
                {tx.documents.map((doc) => (
                  <li key={doc.name} className="px-5 py-3 flex items-center gap-3 text-sm">
                    <div
                      className={`w-8 h-8 rounded-md grid place-items-center flex-none ${
                        doc.status === "ok"
                          ? "bg-success-100 text-success-700"
                          : doc.status === "pending"
                          ? "bg-warning-100 text-warning-700"
                          : "bg-danger-100 text-danger-700"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{doc.name}</span>
                    {doc.status === "ok" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-700">
                        <Check className="w-3.5 h-3.5" /> Reçu
                      </span>
                    ) : doc.status === "pending" ? (
                      <span className="text-xs font-semibold text-warning-700">En attente</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-danger-700">
                        <X className="w-3.5 h-3.5" /> Manquant
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy-50 border border-navy/15 rounded-lg p-5 mt-4 flex gap-3">
              <div className="w-9 h-9 grid place-items-center rounded-md bg-navy-100 text-navy flex-none">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-sm text-ink-700 leading-relaxed">
                <b className="text-ink-900">Customs Navigator suggère :</b>
                <br />
                Pour {tx.product.toLowerCase()} sur le corridor {corridor.label}, vérifier la circulaire MINADER
                2024 sur les exigences phytosanitaires ZLECAf — disponible dans la base RAG.
                <Link href="/admin/rag-monitor" className="ml-1 text-navy font-semibold">
                  Ouvrir →
                </Link>
              </div>
            </div>
          </div>

          {/* Right col: Parties + Banking + Risk */}
          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Vendeur</h4>
              </div>
              <div className="p-5">
                <PersonCard
                  name={tx.seller}
                  detail={`${tx.sellerCity} · RCCM ${tx.sellerRccm}`}
                  trust={tx.sellerTrust}
                  initials={tx.seller.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                  tone="navy"
                />
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Acheteur</h4>
              </div>
              <div className="p-5">
                <PersonCard
                  name={tx.buyer}
                  detail={tx.buyerCountry}
                  trust={tx.buyerTrust}
                  initials={tx.buyer.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                  tone="orange"
                />
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg p-5 mt-4">
              <h4 className="text-sm font-semibold mb-3">Banque escrow</h4>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-md bg-navy-100 text-navy grid place-items-center flex-none">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">{tx.bank}</div>
                  <div className="text-xs text-ink-500 mt-0.5">Agréée PAPSS · Réf. PAPSS-{tx.id.split("-")[2]}-26</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Risk Score</h4>
                <RiskBadge score={tx.risk} />
              </div>
              <div className="p-5 text-sm text-ink-700 leading-relaxed">
                Évalué par XGBoost sur 5 dimensions (acheteur · produit · corridor · devise · timing).
                <Link href="/admin/fraud" className="ml-1 text-navy font-semibold">
                  Voir détection fraude →
                </Link>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="relative aspect-[16/10]">
                <Image src={tx.productImage} alt={tx.product} fill className="object-cover" sizes="380px" />
              </div>
              <div className="px-5 py-3 text-xs text-ink-500 border-t border-black/[0.08]">
                Photo produit · échantillon Bafoussam 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={dialog === "release"}
        title="Libérer les fonds vers le vendeur ?"
        description={`${formatFCFA(tx.amount - tx.commission)} seront transférés vers ${tx.seller} via Orange Money ${tx.corridor.split("-")[0]} dans les 60 secondes. Cette action est irréversible.`}
        confirmLabel="Confirmer la libération"
        tone="success"
        onConfirm={() => push({ tone: "success", title: "Fonds libérés", description: `${formatFCFA(tx.amount - tx.commission)} envoyés à ${tx.seller}.` })}
        onClose={closeDialog}
      />
      <ConfirmDialog
        open={dialog === "dispute"}
        title="Ouvrir un litige ?"
        description="L'équipe LA RUCHE sera notifiée immédiatement. Les fonds resteront bloqués jusqu'à arbitrage (SLA 48 h)."
        confirmLabel="Ouvrir le litige"
        tone="danger"
        onConfirm={() => push({ tone: "warning", title: "Litige ouvert", description: "Équipe LA RUCHE notifiée · arbitrage sous 48 h." })}
        onClose={closeDialog}
      />
      <ConfirmDialog
        open={dialog === "freeze"}
        title="Geler la transaction ?"
        description="Le vendeur sera notifié. Aucun mouvement ne sera possible sans déblocage manuel par un admin."
        confirmLabel="Geler"
        tone="default"
        onConfirm={() => push({ tone: "info", title: "Transaction gelée", description: "Vendeur et acheteur notifiés." })}
        onClose={closeDialog}
      />
    </>
  );
}

function PersonCard({
  name,
  detail,
  trust,
  initials,
  tone,
}: {
  name: string;
  detail: string;
  trust: number;
  initials: string;
  tone: "navy" | "orange" | "green";
}) {
  const tones = {
    navy: "bg-[#1B4D8E]",
    orange: "bg-[#C95E0E]",
    green: "bg-[#3B6D11]",
  };
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-full grid place-items-center text-white font-bold ${tones[tone]}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-semibold truncate">{name}</div>
          <div className="text-xs text-ink-500 truncate inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {detail}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400 font-semibold mb-1.5">
        Trust Score
        <span className="tabular text-ink-900 ml-auto font-bold text-base normal-case tracking-normal">
          {trust > 0 ? `${trust}/100` : "—"}
        </span>
      </div>
      <div className="h-1.5 bg-ink-100 rounded overflow-hidden">
        <div
          className={`h-full rounded ${
            trust >= 75 ? "bg-success-500" : trust >= 50 ? "bg-warning-500" : trust > 0 ? "bg-danger-500" : "bg-ink-300"
          }`}
          style={{ width: `${Math.max(trust, 4)}%` }}
        />
      </div>
    </div>
  );
}
