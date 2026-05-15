"use client";

import { useState } from "react";
import { Check, X, FileText } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { GenericBadge } from "@/components/ui/status-badge";
import { KYC_QUEUE } from "@/lib/data";
import { useToast } from "@/components/ui/toast";

const TABS = ["En attente (3)", "Validés", "Rejetés"];

export default function KycPage() {
  const [tab, setTab] = useState(0);
  const { push } = useToast();

  return (
    <>
      <AdminTopbar crumb="Gestion KYC" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Gestion KYC</h1>
            <p className="text-[13.5px] text-ink-500">3 dossiers en attente · 2 dépassent le SLA de 24h</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold">
              Filtre · Tous types
            </button>
            <button className="h-9 px-3.5 rounded-md bg-navy text-white hover:bg-navy-500 text-[13px] font-semibold">
              Historique complet
            </button>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
            <div className="text-xs text-ink-500 font-medium">Validés ce mois</div>
            <div className="text-[28px] font-bold tabular text-success-700 leading-tight mt-1">47</div>
          </div>
          <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
            <div className="text-xs text-ink-500 font-medium">En attente</div>
            <div className="text-[28px] font-bold tabular text-warning-700 leading-tight mt-1">3</div>
          </div>
          <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
            <div className="text-xs text-ink-500 font-medium">Rejetés ce mois</div>
            <div className="text-[28px] font-bold tabular text-danger-700 leading-tight mt-1">2</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-black/[0.08] mb-5">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px ${
                i === tab
                  ? "border-navy text-navy"
                  : "border-transparent text-ink-500 hover:text-ink-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between bg-white">
                <h4 className="text-sm font-semibold">Queue de validation</h4>
                <span className="text-xs text-ink-500">Triés par ancienneté</span>
              </div>
              {KYC_QUEUE.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-5 py-4 border-b border-black/[0.08] last:border-0"
                >
                  <Avatar text={row.initials} tone={row.avatarColor} />
                  <div>
                    <div className="text-sm font-semibold">{row.name}</div>
                    <div className="text-xs text-ink-500 mt-0.5">
                      {row.type} · {row.city} · Soumis {row.submittedAgo}
                      {row.slaBreach ? (
                        <span className="text-warning-700 font-semibold"> · SLA dépassé</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {row.docs.rccm !== undefined ? (
                      <DocBadge ok={row.docs.rccm}>RCCM</DocBadge>
                    ) : null}
                    {row.docs.corp !== undefined ? (
                      <DocBadge ok={row.docs.corp}>Cert. Inc.</DocBadge>
                    ) : null}
                    {row.docs.id !== undefined ? <DocBadge ok={row.docs.id}>ID</DocBadge> : null}
                    {row.docs.selfie !== undefined ? (
                      <DocBadge ok={row.docs.selfie}>Selfie</DocBadge>
                    ) : null}
                  </div>
                  <div className="flex gap-1.5">
                    {row.docs.selfie === false ? null : (
                      <button
                        onClick={() => push({ tone: "success", title: `${row.name} validé(e)`, description: "Profil activé · accès plateforme ouvert." })}
                        className="h-8 px-3 text-xs font-semibold rounded-md bg-success-500 text-white hover:bg-success-700"
                      >
                        Valider
                      </button>
                    )}
                    <button
                      onClick={() => push({ tone: "info", title: "Complément demandé", description: `${row.name} sera notifié(e) par WhatsApp.` })}
                      className="h-8 px-3 text-xs font-semibold rounded-md bg-white text-warning-700 border border-warning-500 hover:bg-warning-100"
                    >
                      Complément
                    </button>
                    <button
                      onClick={() => push({ tone: "danger", title: "Dossier rejeté", description: `${row.name} · motif requis pour audit.` })}
                      className="h-8 px-3 text-xs font-semibold rounded-md bg-white text-danger-700 border border-danger-500 hover:bg-danger-100"
                    >
                      Rejeter
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-7 mb-3">
              <h3 className="text-sm font-semibold">Historique du jour</h3>
              <span className="text-xs text-ink-500">5 validations</span>
            </div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["Heure", "Profil", "Type", "Action", "Validateur"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { h: "14:08", p: "Mbarga Solange", t: "PME · Douala", a: <GenericBadge tone="success">Validé</GenericBadge>, v: "Sarah F." },
                    { h: "12:45", p: "Eyenga Désiré", t: "PME · Bafia", a: <GenericBadge tone="success">Validé</GenericBadge>, v: "Sarah F." },
                    { h: "11:30", p: "Kamga Joël", t: "PME · Bafoussam", a: <GenericBadge tone="warning">Complément demandé</GenericBadge>, v: "Patrice O." },
                    { h: "10:14", p: "Senegal Naturel SARL", t: "Acheteur · SEN", a: <GenericBadge tone="success">Validé</GenericBadge>, v: "Patrice O." },
                    { h: "09:02", p: "Faux Profil 09", t: "PME · suspect", a: <GenericBadge tone="danger">Rejeté</GenericBadge>, v: "Sarah F." },
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                      <td className="px-4 py-3 tabular font-medium">{r.h}</td>
                      <td className="px-4 py-3">{r.p}</td>
                      <td className="px-4 py-3 text-ink-700">{r.t}</td>
                      <td className="px-4 py-3">{r.a}</td>
                      <td className="px-4 py-3 text-ink-700">{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Stats KYC · Mai 2026</h4>
              </div>
              <ul className="text-[13px]">
                {[
                  { l: "Validés ce mois", v: "47", cls: "text-success-700" },
                  { l: "En attente", v: "3", cls: "text-warning-700" },
                  { l: "Rejetés ce mois", v: "2", cls: "text-danger-700" },
                  { l: "Taux d'acceptation", v: "94%", cls: "text-ink-900" },
                  { l: "Temps moy. validation", v: "6,2 h", cls: "text-ink-900" },
                ].map((r) => (
                  <li key={r.l} className="px-5 py-3 flex justify-between border-b border-black/[0.08] last:border-0">
                    <span>{r.l}</span>
                    <b className={`text-base tabular ${r.cls}`}>{r.v}</b>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Documents requis</h4>
              </div>
              <ul className="text-[12.5px]">
                {[
                  { l: "RCCM (PME)", r: "obligatoire" },
                  { l: "Pièce d'identité", r: "obligatoire" },
                  { l: "Selfie", r: "obligatoire" },
                  { l: "Cert. d'incorporation (Acheteur)", r: "obligatoire" },
                  { l: "Justif. bancaire", r: "si > 5M FCFA" },
                ].map((r) => (
                  <li key={r.l} className="px-5 py-3 flex justify-between border-b border-black/[0.08] last:border-0">
                    <span>{r.l}</span>
                    <span className="text-ink-500">{r.r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Avatar({ text, tone }: { text: string; tone: "navy" | "orange" | "green" }) {
  const tones = {
    navy: "bg-[#1B4D8E]",
    orange: "bg-[#C95E0E]",
    green: "bg-[#3B6D11]",
  };
  return (
    <div className={`w-10 h-10 rounded-full grid place-items-center text-[13px] font-bold text-white ${tones[tone]}`}>
      {text}
    </div>
  );
}

function DocBadge({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold ${
        ok ? "bg-success-100 text-success-700" : "bg-danger-100 text-danger-700"
      }`}
    >
      {children} {ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
    </span>
  );
}
