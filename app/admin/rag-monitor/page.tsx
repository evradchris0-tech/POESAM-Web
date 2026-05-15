"use client";

import { RefreshCw, Plus, AlertTriangle, FileText } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { GenericBadge } from "@/components/ui/status-badge";
import { RAG_QUERIES } from "@/lib/data";
import { useToast } from "@/components/ui/toast";

export default function RagMonitorPage() {
  const { push } = useToast();
  return (
    <>
      <AdminTopbar crumb="Monitoring RAG" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">
              Monitoring RAG · Customs Navigator
            </h1>
            <p className="text-[13.5px] text-ink-500">
              247 questions ce mois · Confiance moyenne 0,83 · 94% feedback positif
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold">
              Filtre · Corridor
            </button>
            <button
              onClick={() => push({ tone: "info", title: "Ré-indexation lancée", description: "Pipeline pgvector démarré · ETA 6 min." })}
              className="h-9 px-3.5 rounded-md bg-orange text-white hover:bg-orange-700 text-[13px] font-semibold inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Lancer ré-indexation
            </button>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Stat label="Questions ce mois" value="247" />
          <Stat label="Confiance moyenne" value="0,83" />
          <Stat label="Feedback positif" value="94%" tone="success" />
          <Stat label="Temps réponse moy." value="1,8 s" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Interrogations récentes</h4>
                <span className="text-xs text-ink-500">Top 4 — dernière heure</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["Question", "Corridor", "Chunks", "Confiance", "Source citée", "Feedback"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {RAG_QUERIES.map((q, i) => (
                    <tr key={i} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                      <td className="px-4 py-3.5 max-w-[36ch]">{q.question}</td>
                      <td className="px-4 py-3.5">
                        <GenericBadge tone="navy">{q.corridor}</GenericBadge>
                      </td>
                      <td className="px-4 py-3.5 tabular text-ink-700">{q.chunks}</td>
                      <td className="px-4 py-3.5">
                        <ConfidenceBar value={q.confidence} warn={q.feedback === "down"} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] font-medium border ${
                            q.feedback === "down"
                              ? "bg-warning-100 text-warning-700 border-warning-700/15"
                              : "bg-navy-100 text-navy border-navy/15"
                          }`}
                        >
                          <FileText className="w-3 h-3 opacity-70" />
                          {q.source}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-base">
                        {q.feedback === "up" ? "👍" : "👎"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-sm font-semibold mt-7 mb-3">Couverture par base vectorielle</h3>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <ul className="text-[13px]">
                {[
                  { name: "JO Cameroun · 2024-2025", chunks: "1 247 chunks", tone: "success" },
                  { name: "Règl. CEMAC · 2018-2024", chunks: "892 chunks", tone: "success" },
                  { name: "Codes douaniers ZLECAf", chunks: "418 chunks", tone: "success" },
                  { name: "JO Sénégal · 2025", chunks: "72 chunks · à compléter", tone: "warning" },
                  { name: "Procédures GUCE", chunks: "309 chunks", tone: "success" },
                ].map((r) => (
                  <li
                    key={r.name}
                    className="px-5 py-3 flex justify-between items-baseline border-b border-black/[0.08] last:border-0"
                  >
                    <span>{r.name}</span>
                    <b
                      className={`text-base tabular ${
                        r.tone === "warning" ? "text-warning-700" : "text-success-700"
                      }`}
                    >
                      {r.chunks}
                    </b>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Alerte qualité</h4>
              </div>
              <div className="p-5 flex gap-3">
                <div className="w-9 h-9 grid place-items-center rounded-md bg-warning-100 text-warning-700 flex-none">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    3 questions sans chunks pertinents cette semaine
                  </p>
                  <p className="text-xs text-ink-500 mt-1.5">
                    Vérifier la couverture du JO Sénégal Q1 2026 — recommandation d'indexation prioritaire.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Métriques RAG · Mai 2026</h4>
              </div>
              <ul className="text-[13px]">
                {[
                  { l: "Questions ce mois", v: "247" },
                  { l: "Confiance moyenne", v: "0,83" },
                  { l: "Feedback positif", v: "94%", tone: "success" },
                  { l: "Temps réponse moy.", v: "1,8 s" },
                  { l: "Top corridor", v: "CMR → CIV" },
                ].map((r, i) => (
                  <li key={i} className="px-5 py-3 flex justify-between border-b border-black/[0.08] last:border-0">
                    <span>{r.l}</span>
                    <b className={`text-base tabular ${r.tone === "success" ? "text-success-700" : "text-ink-900"}`}>{r.v}</b>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Actions admin</h4>
              </div>
              <div className="divide-y divide-black/[0.08]">
                <ActionRow
                  icon={RefreshCw}
                  title="Ré-indexation"
                  body="Force la mise à jour de la base pgvector — durée : ~6 min"
                  cta="Lancer maintenant"
                />
                <ActionRow
                  icon={Plus}
                  title="Ajouter une source"
                  body="PDF, texte, ou URL JO officiel"
                  cta="Importer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "success" }) {
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
      <div className="text-xs text-ink-500 font-medium">{label}</div>
      <div
        className={`text-[28px] font-bold tabular leading-tight tracking-tight mt-1 ${
          tone === "success" ? "text-success-500" : "text-ink-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ConfidenceBar({ value, warn }: { value: number; warn: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 tabular">
      <div className="w-14 h-1 rounded bg-ink-100 overflow-hidden">
        <div
          className={`h-full ${warn ? "bg-warning-500" : "bg-navy"}`}
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
      <span className="text-xs">{value.toString().replace(".", ",")}</span>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: typeof RefreshCw;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="flex gap-3 px-5 py-3.5">
      <div className="w-8 h-8 grid place-items-center rounded-md bg-navy-100 text-navy flex-none">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[13px] font-semibold">{title}</p>
        <p className="text-[11.5px] text-ink-500 mt-0.5">{body}</p>
        <a href="#" className="text-xs font-semibold text-navy mt-1 inline-block">
          {cta} →
        </a>
      </div>
    </div>
  );
}
