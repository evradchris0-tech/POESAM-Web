"use client";

import { useState } from "react";
import { TrendingUp, Users, Smile, Banknote } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { Funnel } from "@/components/admin/funnel";
import { CohortTable } from "@/components/admin/cohort-table";
import { Sparkline } from "@/components/ui/sparkline";
import { FUNNEL, COHORTS, MRR_HISTORY, NPS } from "@/lib/data";
import { formatFCFA, formatCompact } from "@/lib/format";

const RANGES = ["7j", "30j", "90j", "YTD"] as const;

export default function MetricsPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30j");
  const mrrSeries = MRR_HISTORY.map((m) => m.value);
  const mrrCurrent = mrrSeries[mrrSeries.length - 1];
  const mrrPrev = mrrSeries[mrrSeries.length - 2];
  const mrrGrowth = ((mrrCurrent - mrrPrev) / mrrPrev) * 100;
  const arr = mrrCurrent * 12;

  return (
    <>
      <AdminTopbar crumb="Métriques" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Métriques plateforme</h1>
            <p className="text-[13.5px] text-ink-500">
              Funnel d'acquisition, cohortes, MRR, NPS — données arrêtées au 10 mai 2026
            </p>
          </div>
          <div className="inline-flex border border-black/[0.08] rounded-md overflow-hidden bg-white">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`h-9 px-3.5 text-[13px] font-semibold border-r last:border-r-0 border-black/[0.08] ${
                  range === r ? "bg-navy text-white" : "text-ink-700 hover:bg-ink-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <KpiCard
            label="MRR"
            value={formatCompact(mrrCurrent) + " FCFA"}
            trend={`↑ ${mrrGrowth.toFixed(0)}% MoM`}
            trendKind="up"
            spark={mrrSeries}
            color="#1B4D8E"
            icon={Banknote}
          />
          <KpiCard
            label="ARR projeté"
            value={formatCompact(arr) + " FCFA"}
            trend="extrapolation MRR · 12"
            trendKind="muted"
            spark={mrrSeries.map((v) => v * 12)}
            color="#27AE60"
            icon={TrendingUp}
          />
          <KpiCard
            label="NRR"
            value="112%"
            trend="↑ +4 pts vs Q1"
            trendKind="up"
            spark={[98, 101, 105, 108, 110, 112]}
            color="#E87722"
            icon={Users}
          />
          <KpiCard
            label="NPS"
            value={String(NPS.score)}
            trend={`${NPS.total} réponses · Mai`}
            trendKind="muted"
            spark={[42, 48, 53, 58, 61, NPS.score]}
            color="#3B6D11"
            icon={Smile}
          />
        </div>

        {/* Funnel + Cohorts */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-4 mb-6">
          <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <h4 className="text-sm font-semibold">Funnel d'acquisition · 30 derniers jours</h4>
              <span className="text-xs text-ink-500">Visites → 1ère tx escrow</span>
            </div>
            <div className="p-5">
              <Funnel steps={FUNNEL} />
              <div className="mt-5 pt-5 border-t border-black/[0.08] text-xs text-ink-500 leading-relaxed">
                Taux global Visite → Première tx : <b className="text-ink-900 tabular">{((FUNNEL[FUNNEL.length - 1].value / FUNNEL[0].value) * 100).toFixed(1)}%</b>.
                Conforme aux benchmarks fintech B2B africains (1,5–2,5%).
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <h4 className="text-sm font-semibold">Rétention par cohorte</h4>
              <span className="text-xs text-ink-500">% PME actives N mois après onboarding</span>
            </div>
            <div className="p-5">
              <CohortTable cohorts={COHORTS} />
            </div>
          </div>
        </div>

        {/* MRR History + NPS Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-4 mb-6">
          <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <h4 className="text-sm font-semibold">MRR · 6 derniers mois</h4>
              <span className="text-xs text-ink-500 tabular">{formatFCFA(mrrCurrent)}</span>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-3 h-48">
                {MRR_HISTORY.map((m) => {
                  const max = Math.max(...MRR_HISTORY.map((x) => x.value));
                  const h = (m.value / max) * 100;
                  const isCurrent = m === MRR_HISTORY[MRR_HISTORY.length - 1];
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[11px] tabular font-semibold text-ink-700">
                        {formatCompact(m.value)}
                      </div>
                      <div
                        className="w-full bg-ink-100 rounded-md overflow-hidden flex flex-col-reverse"
                        style={{ height: "150px" }}
                      >
                        <div
                          className={`w-full rounded-md ${isCurrent ? "bg-orange" : "bg-navy/80"}`}
                          style={{ height: `${Math.max(h, 5)}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-ink-500 tabular">{m.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
              <h4 className="text-sm font-semibold">NPS · Distribution</h4>
              <span className="text-xs text-ink-500 tabular">{NPS.total} répondants</span>
            </div>
            <div className="p-5">
              <div className="flex items-baseline gap-3 mb-5">
                <div className="text-[56px] font-bold tabular leading-none text-success-700">
                  {NPS.score}
                </div>
                <div className="text-sm text-ink-500">
                  <div className="text-success-700 font-semibold">Excellent (≥ 50)</div>
                  <div className="text-xs">Score net = Promoteurs % − Détracteurs %</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <NpsBar label="Promoteurs (9-10)" pct={NPS.promoters} color="bg-success-500" />
                <NpsBar label="Passifs (7-8)" pct={NPS.passives} color="bg-warning-500" />
                <NpsBar label="Détracteurs (0-6)" pct={NPS.detractors} color="bg-danger-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Top performing corridors */}
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-black/[0.08]">
            <h4 className="text-sm font-semibold">Corridors les plus performants</h4>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["#", "Corridor", "Revenu généré", "Tx clôturées", "Valeur moy.", "Part du revenu"].map((h) => (
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
                { rank: 1, c: "CMR → CIV", rev: 1_250_000, tx: 48, avg: 26_041, share: 44 },
                { rank: 2, c: "CMR → GAB", rev: 970_000, tx: 31, avg: 31_290, share: 34 },
                { rank: 3, c: "CMR → SEN", rev: 620_000, tx: 21, avg: 29_523, share: 22 },
              ].map((r) => (
                <tr key={r.rank} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                  <td className="px-4 py-3 tabular text-ink-500 font-medium">#{r.rank}</td>
                  <td className="px-4 py-3 font-semibold text-navy">{r.c}</td>
                  <td className="px-4 py-3 tabular">{formatFCFA(r.rev)}</td>
                  <td className="px-4 py-3 tabular">{r.tx}</td>
                  <td className="px-4 py-3 tabular text-ink-700">{formatFCFA(r.avg)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-ink-100 rounded overflow-hidden">
                        <div className="h-full bg-navy rounded" style={{ width: `${r.share}%` }} />
                      </div>
                      <span className="tabular text-xs text-ink-700">{r.share}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function KpiCard({
  label,
  value,
  trend,
  trendKind,
  spark,
  color,
  icon: Icon,
}: {
  label: string;
  value: string;
  trend: string;
  trendKind: "up" | "down" | "muted";
  spark: number[];
  color: string;
  icon: typeof TrendingUp;
}) {
  const trendTone = {
    up: "text-success-700",
    down: "text-danger-700",
    muted: "text-ink-500",
  }[trendKind];
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4">
      <div className="flex items-center justify-between text-xs text-ink-500 font-medium mb-1">
        <span>{label}</span>
        <Icon className="w-3.5 h-3.5 opacity-60" />
      </div>
      <div className="text-[26px] font-bold tabular leading-tight tracking-tight text-ink-900">
        {value}
      </div>
      <div className="flex items-end justify-between mt-1">
        <div className={`text-[11.5px] font-semibold tabular ${trendTone}`}>{trend}</div>
        <Sparkline values={spark} color={color} width={80} height={28} />
      </div>
    </div>
  );
}

function NpsBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-ink-700">{label}</span>
        <b className="tabular text-ink-900">{pct}%</b>
      </div>
      <div className="h-2 bg-ink-100 rounded overflow-hidden">
        <div className={`h-full rounded ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
