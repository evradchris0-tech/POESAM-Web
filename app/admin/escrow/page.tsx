"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminTopbar } from "@/components/admin/topbar";
import { TRANSACTIONS, STATUS_LABELS, TxStatus } from "@/lib/data";
import { CorridorBadge } from "@/components/ui/corridor-badge";
import { StatusBadge, RiskBadge } from "@/components/ui/status-badge";
import { formatFCFA } from "@/lib/format";
import { useToast } from "@/components/ui/toast";

const FILTERS: { key: "all" | TxStatus; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "transit", label: "En transit" },
  { key: "escrow_confirme", label: "Escrow confirmé" },
  { key: "liberation", label: "Libération" },
  { key: "attente", label: "En attente" },
];

const PAGE_SIZE = 5;

export default function EscrowPage() {
  const { push } = useToast();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [sort, setSort] = useState<{ col: "id" | "amount" | "risk"; dir: "asc" | "desc" }>({ col: "id", dir: "desc" });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const base = filter === "all" ? TRANSACTIONS : TRANSACTIONS.filter((t) => t.status === filter);
    const sorted = [...base].sort((a, b) => {
      let d = 0;
      if (sort.col === "amount") d = a.amount - b.amount;
      else if (sort.col === "risk") d = a.risk - b.risk;
      else d = a.id.localeCompare(b.id);
      return sort.dir === "asc" ? d : -d;
    });
    return sorted;
  }, [filter, sort]);

  const toggleSort = (col: "id" | "amount" | "risk") => {
    setSort((s) => (s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "desc" }));
  };
  const total = filtered.length;
  const totalAmount = filtered.reduce((acc, t) => acc + t.amount, 0);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <AdminTopbar crumb="Supervision Escrow" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Supervision Escrow</h1>
            <p className="text-[13.5px] text-ink-500">
              {total} transactions · Volume bloqué : {formatFCFA(totalAmount)}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3.5 rounded-md border border-navy text-navy bg-white hover:bg-navy-100 text-[13px] font-semibold">
              Filtre · 3 corridors
            </button>
            <button className="h-9 px-3.5 rounded-md bg-navy text-white hover:bg-navy-500 text-[13px] font-semibold">
              Exporter Excel
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <KpiCard label="En transit" value={String(TRANSACTIONS.filter((t) => t.status === "transit").length)} sub="2,4M FCFA bloqués" />
          <KpiCard label="Escrow confirmé" value={String(TRANSACTIONS.filter((t) => t.status === "escrow_confirme").length)} sub="0,96M FCFA" />
          <KpiCard label="Libération en cours" value={String(TRANSACTIONS.filter((t) => t.status === "liberation").length)} sub="1,44M FCFA" />
          <KpiCard label="Litiges ouverts" value="0" sub="— sain" tone="success" />
        </div>

        <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden mb-3">
          <div className="px-5 py-3.5 border-b border-black/[0.08] flex items-center justify-between">
            <div className="text-sm">
              <span className="text-ink-500">Total volume en escrow filtré · </span>
              <b className="text-[20px] font-bold tabular text-ink-900 ml-1">{formatFCFA(totalAmount)}</b>
            </div>
            <span className="text-xs text-ink-500">Mise à jour il y a 12 sec</span>
          </div>

          {/* Inline filters */}
          <div className="px-5 py-3 border-b border-black/[0.08] bg-surface flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key);
                  setPage(1);
                }}
                className={`h-8 px-3 text-xs font-semibold rounded-md ${
                  filter === f.key
                    ? "bg-navy text-white"
                    : "bg-white text-ink-700 border border-black/[0.08] hover:bg-ink-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr>
                {[
                  { key: "id", label: "ID Tx", sortable: true },
                  { key: "_", label: "Produit", sortable: false },
                  { key: "_", label: "Corridor", sortable: false },
                  { key: "amount", label: "Montant", sortable: true },
                  { key: "_", label: "Commission", sortable: false },
                  { key: "_", label: "Statut", sortable: false },
                  { key: "risk", label: "Risk", sortable: true },
                  { key: "_", label: "Bank", sortable: false },
                  { key: "_", label: "Actions", sortable: false },
                ].map((h, i) => (
                  <th
                    key={i}
                    onClick={() => h.sortable && toggleSort(h.key as "id" | "amount" | "risk")}
                    className={`text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08] ${
                      h.sortable ? "cursor-pointer hover:text-ink-700 select-none" : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {h.label}
                      {h.sortable && sort.col === h.key ? (
                        <span className="text-navy text-[10px]">{sort.dir === "asc" ? "▲" : "▼"}</span>
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-ink-500 text-sm">
                    Aucune transaction pour ce filtre.
                  </td>
                </tr>
              ) : (
                slice.map((tx) => (
                  <tr key={tx.id} className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded text-ink-700">{tx.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-medium leading-tight flex items-center gap-2">
                        <span className="text-base">{tx.productEmoji}</span>
                        <div>
                          {tx.product}
                          <small className="block text-[11px] text-ink-500 font-normal mt-0.5">{tx.qty}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <CorridorBadge corridor={tx.corridor} />
                    </td>
                    <td className="px-4 py-3.5 tabular text-sm font-medium">{formatFCFA(tx.amount)}</td>
                    <td className="px-4 py-3.5 tabular text-sm text-ink-700">{formatFCFA(tx.commission)}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <RiskBadge score={tx.risk} />
                    </td>
                    <td className="px-4 py-3.5 text-sm text-ink-700">{tx.bank}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => push({ tone: "success", title: "Fonds libérés", description: `${tx.id} · ${formatFCFA(tx.amount - tx.commission)} envoyés.` })}
                          className="h-7 px-2.5 text-[11px] font-semibold rounded-md bg-success-500 text-white hover:bg-success-700"
                        >
                          Libérer
                        </button>
                        <button
                          onClick={() => push({ tone: "warning", title: "Litige ouvert", description: `${tx.id} · arbitrage sous 48 h.` })}
                          className="h-7 px-2.5 text-[11px] font-semibold rounded-md bg-white text-ink-700 border border-black/[0.08] hover:bg-ink-100"
                        >
                          Litige
                        </button>
                        <Link
                          href={`/admin/escrow/${tx.id}`}
                          className="w-7 h-7 grid place-items-center rounded-md border border-black/[0.08] text-ink-700 hover:bg-ink-100"
                          aria-label="Voir le détail"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-xs text-ink-500">
          <span>
            Page {page} / {pages} · {total} résultat{total > 1 ? "s" : ""}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="h-8 px-3 rounded-md border border-black/[0.08] bg-white font-semibold disabled:opacity-40"
            >
              ← Précédent
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="h-8 px-3 rounded-md border border-black/[0.08] bg-white font-semibold disabled:opacity-40"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function KpiCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "default" | "success";
}) {
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4 flex flex-col gap-2 min-h-[100px]">
      <div className="text-xs text-ink-500 font-medium">{label}</div>
      <div
        className={`text-[28px] font-bold tabular leading-tight tracking-tight ${
          tone === "success" ? "text-success-500" : "text-ink-900"
        }`}
      >
        {value}
      </div>
      <div className="text-[11.5px] text-ink-500 font-medium">{sub}</div>
    </div>
  );
}
