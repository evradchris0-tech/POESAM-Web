import { Info } from "lucide-react";
import { InstitutionalTopbar } from "@/components/institutional/topbar";

const COLS = [
  "Documents manquants",
  "Délais excessifs",
  "Frais informels",
  "Blocage douanier",
  "Autre",
];

const ROWS: { corridor: string; values: number[] }[] = [
  { corridor: "CMR → CIV", values: [12, 8, 3, 1, 0] },
  { corridor: "CMR → SEN", values: [6, 11, 5, 0, 0] },
  { corridor: "CMR → GAB", values: [4, 3, 2, 0, 0] },
];

function tone(n: number) {
  if (n <= 5) return { bg: "#EAF3DE", fg: "#3B6D11" };
  if (n <= 10) return { bg: "#FAEEDA", fg: "#854F0B" };
  return { bg: "#FCEBEB", fg: "#A32D2D" };
}

export default function BarriersPage() {
  return (
    <>
      <InstitutionalTopbar crumb="Obstacles non tarifaires" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Obstacles non tarifaires</h1>
            <p className="text-[13.5px] text-ink-500">
              Signalements remontés par les utilisateurs · Mai 2026 · Catégorisation automatique
            </p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-black/[0.08]">
            <h4 className="text-sm font-semibold">Heatmap des signalements</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08] w-[160px]">
                    Corridor
                  </th>
                  {COLS.map((c) => (
                    <th
                      key={c}
                      className="text-center px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.corridor} className="border-b border-black/[0.08] last:border-0">
                    <td className="px-4 py-4 font-semibold text-navy">{r.corridor}</td>
                    {r.values.map((v, i) => {
                      const t = tone(v);
                      return (
                        <td key={i} className="px-2 py-2">
                          <div
                            className="rounded-md py-3 grid place-items-center text-base font-bold tabular"
                            style={{ background: t.bg, color: t.fg }}
                          >
                            {v}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-black/[0.08] flex flex-wrap gap-4 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ background: "#EAF3DE" }} /> 0–5 signalements
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ background: "#FAEEDA" }} /> 6–10
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ background: "#FCEBEB" }} /> 11+
            </span>
          </div>
        </div>

        <div className="bg-navy-50 border border-navy/15 rounded-lg p-5 flex gap-3 mb-6">
          <div className="w-9 h-9 grid place-items-center rounded-md bg-navy-100 text-navy flex-none">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-sm text-ink-700 leading-relaxed">
            Ces données sont collectées anonymement auprès des utilisateurs TradeFlow Africa.
            Aucun nom de PME ni de transaction n'est exposé — seulement des catégories d'obstacles
            et leur fréquence par corridor. Conforme loi 2024/017.
          </div>
        </div>

        {/* Top 5 issues breakdown */}
        <h3 className="text-sm font-semibold mb-3">Top obstacles · 30 derniers jours</h3>
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Catégorie", "Corridor le + touché", "Signalements", "Évolution"].map((h) => (
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
                { c: "Documents manquants", co: "CMR → CIV", n: 12, e: "+3" },
                { c: "Délais excessifs", co: "CMR → SEN", n: 11, e: "+5" },
                { c: "Délais excessifs", co: "CMR → CIV", n: 8, e: "−2" },
                { c: "Documents manquants", co: "CMR → SEN", n: 6, e: "+1" },
                { c: "Frais informels", co: "CMR → SEN", n: 5, e: "+2" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                  <td className="px-4 py-3.5">{r.c}</td>
                  <td className="px-4 py-3.5 font-semibold text-navy">{r.co}</td>
                  <td className="px-4 py-3.5 tabular">{r.n}</td>
                  <td className={`px-4 py-3.5 tabular font-semibold ${r.e.startsWith("−") ? "text-success-700" : "text-warning-700"}`}>
                    {r.e}
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
