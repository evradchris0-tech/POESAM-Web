import { InstitutionalTopbar } from "@/components/institutional/topbar";
import { Building2 } from "lucide-react";

const PARTNERS = [
  { name: "CCIMA", role: "Chambre de Commerce — Cameroun", status: "Actif", since: "Jan 2026" },
  { name: "GUCE", role: "Guichet Unique du Commerce — Cameroun", status: "En négociation", since: "Mar 2026" },
  { name: "Afreximbank", role: "PAPSS — règlement interbancaire", status: "Actif", since: "Fév 2026" },
  { name: "Orange Cameroun", role: "Orange Money + SMS + Cloud Avenue", status: "Actif", since: "Jan 2026" },
  { name: "ZLECAf Secrétariat", role: "Données ZLECAf et reporting", status: "Veille", since: "—" },
  { name: "Ecobank PAPSS", role: "Banque escrow partenaire", status: "Actif", since: "Avr 2026" },
];

export default function PartnersPage() {
  return (
    <>
      <InstitutionalTopbar crumb="Partenaires" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Partenaires institutionnels</h1>
          <p className="text-[13.5px] text-ink-500">
            Écosystème multi-acteurs construit autour de TradeFlow Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PARTNERS.map((p) => (
            <div key={p.name} className="bg-white border border-black/[0.08] rounded-lg p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 grid place-items-center rounded-md bg-navy-100 text-navy">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="text-xs text-ink-500 mt-0.5">{p.role}</div>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span
                  className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full font-medium ${
                    p.status === "Actif"
                      ? "bg-success-100 text-success-700"
                      : p.status === "En négociation"
                      ? "bg-warning-100 text-warning-700"
                      : "bg-ink-100 text-ink-700"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                  {p.status}
                </span>
                <span className="text-ink-500">Depuis {p.since}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
