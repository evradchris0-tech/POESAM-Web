"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { UserDrawer } from "@/components/admin/user-drawer";
import { USERS, USER_COUNTS, type UserRow } from "@/lib/data";

type RoleTab = "all" | UserRow["role"];

const TABS: { key: RoleTab; label: string; count: number }[] = [
  { key: "all", label: "Tous", count: USERS.length },
  { key: "pme", label: "PME", count: USER_COUNTS.pme },
  { key: "buyer", label: "Acheteurs", count: USER_COUNTS.buyer },
  { key: "agent", label: "Agents", count: USER_COUNTS.agent },
  { key: "admin", label: "Admin", count: USER_COUNTS.admin },
];

export default function UsersPage() {
  const [tab, setTab] = useState<RoleTab>("all");
  const [query, setQuery] = useState("");
  const [trustMin, setTrustMin] = useState(0);
  const [selected, setSelected] = useState<UserRow | null>(null);

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      if (tab !== "all" && u.role !== tab) return false;
      if (trustMin > 0 && u.trust < trustMin) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.sector?.toLowerCase().includes(q)
      );
    });
  }, [tab, query, trustMin]);

  return (
    <>
      <AdminTopbar crumb="Utilisateurs" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Annuaire utilisateurs</h1>
            <p className="text-[13.5px] text-ink-500">
              {USER_COUNTS.totalPme} PME · {USER_COUNTS.totalBuyer} acheteurs · {USER_COUNTS.totalAgent} agents coop · {USER_COUNTS.totalAdmin} admin LA RUCHE
              <span className="text-ink-400"> · Aperçu de {USERS.length} fiches</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold inline-flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Exporter CSV
            </button>
            <button className="h-9 px-3.5 rounded-md bg-navy text-white hover:bg-navy-500 text-[13px] font-semibold">
              Inviter un utilisateur
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-black/[0.08] mb-5 overflow-x-auto scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px whitespace-nowrap ${
                tab === t.key
                  ? "border-navy text-navy"
                  : "border-transparent text-ink-500 hover:text-ink-700"
              }`}
            >
              {t.label}
              <span
                className={`text-[10.5px] font-semibold tabular px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? "bg-navy text-white" : "bg-ink-100 text-ink-700"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mb-3">
          <div className="px-5 py-3 border-b border-black/[0.08] bg-surface flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 h-9 rounded-md bg-white border border-black/[0.08] flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher nom, ville, secteur…"
                className="flex-1 bg-transparent border-0 outline-none text-[13px] placeholder:text-ink-400"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-ink-400" />
              <span className="text-ink-500 font-medium">Trust ≥</span>
              <select
                value={trustMin}
                onChange={(e) => setTrustMin(Number(e.target.value))}
                className="h-9 px-2.5 rounded-md border border-black/[0.08] bg-white text-[13px] outline-none focus:ring-2 focus:ring-navy"
              >
                <option value={0}>Tous</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={90}>90</option>
              </select>
            </div>
            <span className="ml-auto text-xs text-ink-500 tabular">{filtered.length} résultats</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Utilisateur", "Rôle", "Localisation", "Secteur", "Trust", "Tx", "Statut", "Activité"].map((h) => (
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-ink-500">
                    Aucun utilisateur ne correspond aux filtres.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => setSelected(u)}
                    className="border-b border-black/[0.08] last:border-0 hover:bg-surface cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1B4D8E] text-white grid place-items-center text-[11px] font-bold flex-none">
                          {u.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{u.name}</div>
                          <div className="text-[11px] text-ink-500 font-mono mt-0.5">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="px-4 py-3 text-ink-700">
                      {u.city}
                      <small className="block text-[11px] text-ink-500 font-normal">{u.country}</small>
                    </td>
                    <td className="px-4 py-3 text-ink-700 text-xs">{u.sector ?? "—"}</td>
                    <td className="px-4 py-3">
                      <TrustBar score={u.trust} />
                    </td>
                    <td className="px-4 py-3 tabular text-ink-700">{u.txClosed}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={u.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-500">{u.lastActive}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-ink-500 px-1">
          Cliquez sur une ligne pour ouvrir le profil détaillé · {filtered.length} sur {USERS.length} affichés
        </p>
      </div>

      <UserDrawer user={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function RoleBadge({ role }: { role: UserRow["role"] }) {
  const map = {
    pme: { tone: "bg-navy-100 text-navy", label: "PME" },
    buyer: { tone: "bg-orange-100 text-orange-700", label: "Acheteur" },
    agent: { tone: "bg-success-100 text-success-700", label: "Agent" },
    admin: { tone: "bg-ink-100 text-ink-700", label: "Admin" },
  } as const;
  const m = map[role];
  return <span className={`inline-flex h-6 px-2.5 rounded-full text-xs font-medium ${m.tone}`}>{m.label}</span>;
}

function TrustBar({ score }: { score: number }) {
  if (score === 0) return <span className="text-xs text-ink-400">—</span>;
  const color = score >= 75 ? "bg-success-500" : score >= 50 ? "bg-warning-500" : "bg-danger-500";
  return (
    <div className="inline-flex items-center gap-2 tabular">
      <div className="w-14 h-1 bg-ink-100 rounded overflow-hidden">
        <div className={`h-full rounded ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-semibold">{score}</span>
    </div>
  );
}

function StatusPill({ status }: { status: UserRow["status"] }) {
  const map = {
    actif: { tone: "bg-success-100 text-success-700", label: "Actif" },
    kyc_pending: { tone: "bg-warning-100 text-warning-700", label: "KYC" },
    suspended: { tone: "bg-danger-100 text-danger-700", label: "Suspendu" },
  } as const;
  const m = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium ${m.tone}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {m.label}
    </span>
  );
}
