import { TrendingUp } from "lucide-react";
import { InstitutionalTopbar } from "@/components/institutional/topbar";
import { AfricaMap } from "@/components/ui/africa-map";

export default function InstitutionalCorridors() {
  return (
    <>
      <InstitutionalTopbar crumb="Corridors actifs" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Corridors commerciaux actifs</h1>
            <p className="text-[13.5px] text-ink-500">
              Vue agrégée et anonymisée — basée sur les transactions TradeFlow Africa · Mai 2026
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
          <div className="bg-white border border-black/[0.08] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold">Carte des 3 corridors actifs</h4>
              <span className="text-xs text-ink-500">Survolez une ligne pour les détails</span>
            </div>
            <AfricaMap variant="institutional" className="max-w-[520px] mx-auto" />
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs">
              <Legend color="#1B4D8E" label="CMR → CIV — Plantain séché" />
              <Legend color="#27AE60" label="CMR → SEN — Gingembre bio" />
              <Legend color="#E87722" label="CMR → GAB — Huile de palme" />
            </div>
          </div>

          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg p-5">
              <h4 className="text-sm font-semibold mb-4">Volumes globaux Mai 2026</h4>
              <ul className="text-[13px]">
                {[
                  { l: "Volume facilité (cumul)", v: "1,65 Mds FCFA" },
                  { l: "Transactions clôturées", v: "100" },
                  { l: "PME exportatrices actives", v: "47" },
                  { l: "Acheteurs vérifiés", v: "32" },
                ].map((r) => (
                  <li key={r.l} className="px-1 py-2.5 flex justify-between border-b border-black/[0.08] last:border-0">
                    <span className="text-ink-700">{r.l}</span>
                    <b className="tabular text-ink-900">{r.v}</b>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-black/[0.08] rounded-lg p-5 mt-4">
              <h4 className="text-sm font-semibold mb-3">Méthodologie</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Données collectées au fil des transactions des PME utilisatrices de TradeFlow.
                Anonymisation au niveau commerçant. Conforme à la loi camerounaise n°2024/017 sur
                la protection des données.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold mt-8 mb-3">Synthèse par corridor</h3>
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Corridor", "Volume FCFA", "Transactions", "Produit dominant", "Prix moyen", "Évolution M/M"].map(
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
              {[
                { c: "CMR → CIV", v: "750 M", n: 48, p: "Plantain séché", pr: "3 100 FCFA/kg", e: "+8%" },
                { c: "CMR → SEN", v: "320 M", n: 21, p: "Gingembre bio", pr: "4 800 FCFA/kg", e: "+2%" },
                { c: "CMR → GAB", v: "580 M", n: 31, p: "Huile de palme", pr: "1 200 FCFA/L", e: "+5%" },
              ].map((r) => (
                <tr key={r.c} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                  <td className="px-4 py-3.5 font-semibold text-navy">{r.c}</td>
                  <td className="px-4 py-3.5 tabular">{r.v} FCFA</td>
                  <td className="px-4 py-3.5 tabular">{r.n}</td>
                  <td className="px-4 py-3.5">{r.p}</td>
                  <td className="px-4 py-3.5 tabular">{r.pr}</td>
                  <td className="px-4 py-3.5 text-success-700 font-semibold inline-flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
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

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-ink-700">
      <span className="w-3 h-0.5 rounded" style={{ background: color }} />
      {label}
    </span>
  );
}
