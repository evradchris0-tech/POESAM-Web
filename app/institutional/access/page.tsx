import { InstitutionalTopbar } from "@/components/institutional/topbar";
import { Lock, ShieldCheck } from "lucide-react";

export default function AccessPage() {
  return (
    <>
      <InstitutionalTopbar crumb="Accès & permissions" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Accès & permissions</h1>
          <p className="text-[13.5px] text-ink-500">
            Comptes institutionnels en lecture seule · Conforme loi 2024/017
          </p>
        </div>

        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-black/[0.08]">
            <h4 className="text-sm font-semibold">Comptes actifs</h4>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Organisme", "Personne", "Email", "Rôle", "Dernière connexion"].map((h) => (
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
                { o: "GUCE Cameroun", n: "Évangéliste Mboumba", e: "evangeliste.m@guce.cm", r: "Lecteur", d: "10 mai 2026 · 09h12" },
                { o: "MINCOMMERCE", n: "Christine Tabi", e: "ctabi@mincommerce.cm", r: "Lecteur", d: "08 mai 2026 · 16h45" },
                { o: "CCIMA", n: "Patrice Ondoa", e: "p.ondoa@ccima.cm", r: "Lecteur", d: "09 mai 2026 · 11h02" },
                { o: "Afreximbank", n: "Sandra Ojo", e: "sojo@afreximbank.com", r: "Lecteur", d: "06 mai 2026 · 18h30" },
              ].map((u, i) => (
                <tr key={i} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                  <td className="px-4 py-3.5 font-semibold text-navy">{u.o}</td>
                  <td className="px-4 py-3.5">{u.n}</td>
                  <td className="px-4 py-3.5 text-ink-700">{u.e}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium bg-navy-100 text-navy">
                      <Lock className="w-3 h-3" />
                      {u.r}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-ink-700 tabular">{u.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-navy-50 border border-navy/15 rounded-lg p-5 flex gap-3">
          <div className="w-9 h-9 grid place-items-center rounded-md bg-navy-100 text-navy flex-none">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-sm text-ink-700 leading-relaxed">
            Tous les accès institutionnels sont en lecture seule, journalisés et auditables.
            Aucun téléchargement de données personnelles n'est autorisé. Demande d'accès :
            <a href="mailto:contact@tradeflow-africa.cm" className="text-navy font-semibold ml-1">
              contact@tradeflow-africa.cm
            </a>.
          </div>
        </div>
      </div>
    </>
  );
}
