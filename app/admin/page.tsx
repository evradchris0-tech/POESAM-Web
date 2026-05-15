import {
  Users,
  ArrowRightLeft,
  Shield,
  TrendingUp,
  Clock,
  Star,
  AlertTriangle,
  Percent,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { MetricCard } from "@/components/ui/metric-card";
import { TransactionRow } from "@/components/ui/transaction-row";
import { ActivityChart } from "@/components/admin/activity-chart";
import { TRANSACTIONS } from "@/lib/data";

export default function AdminOverview() {
  return (
    <>
      <AdminTopbar crumb="Vue d'ensemble" />

      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Vue d'ensemble</h1>
            <p className="text-[13.5px] text-ink-500">Activité plateforme · 10 mai 2026 · 14h32</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold">
              Filtre · 30 jours
            </button>
            <button className="h-9 px-3.5 rounded-md bg-navy text-white hover:bg-navy-500 text-[13px] font-semibold">
              Exporter rapport
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard label="PME actives" value="47" trend={{ kind: "up", text: "+12 ce mois" }} icon={Users} />
          <MetricCard label="Transactions actives" value="8" trend={{ kind: "muted", text: "3 corridors" }} icon={ArrowRightLeft} />
          <MetricCard label="Volume escrow actif" value="6,2" unit="M FCFA" trend={{ kind: "up", text: "+18% / mois précédent" }} icon={Shield} />
          <MetricCard label="Revenus du mois" value="2,84" unit="M FCFA" trend={{ kind: "up", text: "+24% MoM" }} icon={TrendingUp} />
          <MetricCard label="KYC en attente" value="3" trend={{ kind: "danger", text: "2 dossiers > 48h" }} icon={Clock} />
          <MetricCard label="Trust Score moyen" value="74" unit="/100" trend={{ kind: "up", text: "+3 pts" }} icon={Star} />
          <MetricCard label="Alertes fraude actives" value="1" trend={{ kind: "danger", text: "TF-2024-0091 · Risk 78" }} icon={AlertTriangle} emphasis="danger" />
          <MetricCard label="Conversion Free → Pro" value="18" unit="%" trend={{ kind: "muted", text: "— stable" }} icon={Percent} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
          <div>
            <ActivityChart />

            <div className="flex justify-between items-center mt-8 mb-3.5">
              <h3 className="text-sm font-semibold">Transactions récentes</h3>
              <a href="/admin/escrow" className="text-xs font-semibold text-navy">
                Voir toutes →
              </a>
            </div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["ID", "Vendeur · Acheteur", "Corridor", "Montant", "Statut", "Risk", ""].map(
                      (h, i) => (
                        <th
                          key={i}
                          className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((tx, i) => (
                    <TransactionRow key={tx.id} tx={tx} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
                <h4 className="text-sm font-semibold">Alertes système</h4>
                <span className="text-xs text-ink-500">Temps réel</span>
              </div>
              <div>
                <AlertRow tone="danger" title="Fraude flaggée · Transaction TF-2024-0091" body="Risk Score 78/100 · Isolation Forest · Pattern d'escrow inhabituel" cta="Examiner" />
                <AlertRow tone="warning" title="3 KYC en attente depuis plus de 48h" body="Validations à traiter avant 16h00" cta="Voir la queue" />
                <AlertRow tone="info" title="Couverture RAG faible · JO Sénégal Q1 2026" body="3 questions sans chunks pertinents cette semaine" cta="Vérifier" />
                <AlertRow tone="info" title="Nouveau pilote · Coop. Femmes Adamawa" body="Onboarding terminé · CMR → SEN actif" />
              </div>
            </div>

            <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mt-4">
              <div className="px-5 py-4 border-b border-black/[0.08]">
                <h4 className="text-sm font-semibold">Santé infrastructure</h4>
              </div>
              <ul className="text-[13px]">
                {[
                  { name: "Supabase API", value: "99,9%", tone: "success" as const },
                  { name: "Claude Sonnet API", value: "OK", tone: "success" as const },
                  { name: "Orange Money sandbox", value: "OK", tone: "success" as const },
                  { name: "AGL Logistics API", value: "Lent", tone: "warning" as const },
                  { name: "pgvector RAG", value: "247 q/mois", tone: "success" as const },
                ].map((r) => (
                  <li
                    key={r.name}
                    className="px-5 py-3.5 flex justify-between items-baseline border-b border-black/[0.08] last:border-0"
                  >
                    <span>{r.name}</span>
                    <b
                      className={`text-base tabular ${
                        r.tone === "success" ? "text-success-700" : "text-warning-700"
                      }`}
                    >
                      {r.value}
                    </b>
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

function AlertRow({
  tone,
  title,
  body,
  cta,
}: {
  tone: "danger" | "warning" | "info";
  title: string;
  body: string;
  cta?: string;
}) {
  const tones = {
    danger: "bg-danger-100 text-danger-700",
    warning: "bg-warning-100 text-warning-700",
    info: "bg-navy-100 text-navy",
  };
  const Icon = tone === "danger" ? AlertTriangle : tone === "warning" ? Clock : PlusCircle;
  return (
    <div className="flex gap-3 px-5 py-3.5 border-b border-black/[0.08] last:border-0">
      <div className={`w-8 h-8 grid place-items-center rounded-md flex-none ${tones[tone]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] leading-snug">
          <b>{title.split(" · ")[0]}</b>
          {title.includes(" · ") ? <> · {title.split(" · ").slice(1).join(" · ")}</> : null}
        </p>
        <small className="text-[11.5px] text-ink-500 block mt-1">{body}</small>
        {cta ? (
          <a href="#" className="text-navy text-xs font-semibold inline-flex items-center gap-1 mt-1.5">
            {cta} <ArrowRight className="w-3 h-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
