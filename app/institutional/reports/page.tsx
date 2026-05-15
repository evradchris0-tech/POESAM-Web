"use client";

import { useState } from "react";
import { Download, FileText, FileSpreadsheet, X } from "lucide-react";
import { InstitutionalTopbar } from "@/components/institutional/topbar";

const REPORTS = [
  {
    title: "Rapport Mai 2026 — Flux commerciaux CMR-Afrique",
    period: "Mensuel",
    formats: ["pdf", "xlsx"],
    pages: 28,
  },
  {
    title: "Rapport Avril 2026 — Analyse obstacles non tarifaires",
    period: "Mensuel",
    formats: ["pdf"],
    pages: 16,
  },
  {
    title: "Rapport Q1 2026 — Synthèse ZLECAf Cameroun",
    period: "Trimestriel",
    formats: ["pdf"],
    pages: 42,
  },
];

export default function ReportsPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <InstitutionalTopbar crumb="Rapports ZLECAf" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Rapports institutionnels</h1>
            <p className="text-[13.5px] text-ink-500">
              Téléchargement libre pour les organismes partenaires · Anonymisé
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="h-9 px-3.5 rounded-md bg-orange text-white hover:bg-orange-700 text-[13px] font-semibold"
          >
            Générer rapport personnalisé
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {REPORTS.map((r, i) => (
            <article
              key={i}
              className="bg-white border border-black/[0.08] rounded-lg p-5 flex flex-col gap-4"
            >
              <div className="w-10 h-10 grid place-items-center rounded-md bg-navy-100 text-navy">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-snug tracking-tight">{r.title}</h3>
                <div className="text-xs text-ink-500 mt-1.5">
                  {r.period} · {r.pages} pages
                </div>
              </div>
              <div className="mt-auto flex gap-2 flex-wrap">
                {r.formats.includes("pdf") ? (
                  <button className="inline-flex h-9 px-3 items-center gap-1.5 text-xs font-semibold rounded-md border border-navy text-navy bg-white hover:bg-navy-100">
                    <Download className="w-3.5 h-3.5" /> Télécharger PDF
                  </button>
                ) : null}
                {r.formats.includes("xlsx") ? (
                  <button className="inline-flex h-9 px-3 items-center gap-1.5 text-xs font-semibold rounded-md border border-black/[0.08] text-ink-700 bg-white hover:bg-ink-100">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="bg-white border border-black/[0.08] rounded-lg p-5">
          <h4 className="text-sm font-semibold mb-2">Archives</h4>
          <p className="text-xs text-ink-500">
            Les rapports antérieurs à 2026 sont accessibles sur demande à l'équipe LA RUCHE.
            Conformément à la loi 2024/017, l'accès est journalisé et auditable.
          </p>
        </div>
      </div>

      {open ? <ReportModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function ReportModal({ onClose }: { onClose: () => void }) {
  const [period, setPeriod] = useState("Mensuel");
  const [corridor, setCorridor] = useState("Tous");
  const [format, setFormat] = useState("PDF");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center px-4">
      <div className="bg-white rounded-xl border border-black/[0.08] w-full max-w-md shadow-lift">
        <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
          <h3 className="text-base font-semibold">Générer un rapport personnalisé</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 grid gap-4">
          <Field label="Période">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-navy"
            >
              {["Mensuel", "Trimestriel", "Annuel"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Corridor">
            <select
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-navy"
            >
              {["Tous", "CMR → CIV", "CMR → SEN", "CMR → GAB"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Format">
            <div className="flex gap-2">
              {["PDF", "Excel"].map((o) => (
                <button
                  key={o}
                  onClick={() => setFormat(o)}
                  className={`flex-1 h-10 rounded-md text-sm font-semibold border ${
                    format === o
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-ink-700 border-black/[0.08] hover:bg-ink-100"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div className="px-5 py-4 border-t border-black/[0.08] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-md border border-black/[0.08] bg-white text-ink-700 text-sm font-semibold hover:bg-ink-100"
          >
            Annuler
          </button>
          <button className="h-10 px-4 rounded-md bg-orange text-white text-sm font-semibold hover:bg-orange-700">
            Générer
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
