"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, LayoutDashboard, UserCheck, Shield, FileSearch, AlertTriangle, TrendingUp, Users, RefreshCw, Banknote, ExternalLink } from "lucide-react";
import { TRANSACTIONS, USERS } from "@/lib/data";
import { useToast } from "@/components/ui/toast";

interface CommandItem {
  id: string;
  label: string;
  group: string;
  icon: typeof Search;
  hint?: string;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { push } = useToast();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  // Open with Cmd/Ctrl+K or via custom "open-palette" event
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onCustom = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onCustom);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onCustom);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items: CommandItem[] = useMemo(() => {
    const base: CommandItem[] = [
      { id: "nav-overview", label: "Vue d'ensemble", group: "Navigation", icon: LayoutDashboard, run: () => router.push("/admin") },
      { id: "nav-kyc", label: "Gestion KYC", group: "Navigation", icon: UserCheck, hint: "3 en attente", run: () => router.push("/admin/kyc") },
      { id: "nav-escrow", label: "Supervision Escrow", group: "Navigation", icon: Shield, hint: "5 transactions", run: () => router.push("/admin/escrow") },
      { id: "nav-rag", label: "Monitoring RAG", group: "Navigation", icon: FileSearch, hint: "247 q / mois", run: () => router.push("/admin/rag-monitor") },
      { id: "nav-fraud", label: "Détection Fraude", group: "Navigation", icon: AlertTriangle, hint: "1 alerte", run: () => router.push("/admin/fraud") },
      { id: "nav-metrics", label: "Métriques plateforme", group: "Navigation", icon: TrendingUp, run: () => router.push("/admin/metrics") },
      { id: "nav-users", label: "Utilisateurs", group: "Navigation", icon: Users, run: () => router.push("/admin/users") },
      { id: "nav-landing", label: "Ouvrir la landing publique", group: "Navigation", icon: ExternalLink, run: () => router.push("/") },
      // Actions
      {
        id: "act-reindex",
        label: "Lancer la ré-indexation RAG",
        group: "Actions",
        icon: RefreshCw,
        hint: "~ 6 min",
        run: () => push({ tone: "info", title: "Ré-indexation lancée", description: "Pipeline pgvector démarré · ETA 6 min." }),
      },
      {
        id: "act-export",
        label: "Exporter le rapport mensuel",
        group: "Actions",
        icon: Banknote,
        hint: "PDF + Excel",
        run: () => push({ tone: "success", title: "Rapport exporté", description: "Téléchargement démarré (mock)." }),
      },
    ];

    // Transactions par ID
    TRANSACTIONS.forEach((tx) => {
      base.push({
        id: `tx-${tx.id}`,
        label: `${tx.id} — ${tx.seller} → ${tx.buyer}`,
        group: "Transactions",
        icon: Shield,
        hint: tx.product,
        run: () => router.push(`/admin/escrow/${tx.id}`),
      });
    });

    // Users
    USERS.slice(0, 14).forEach((u) => {
      base.push({
        id: `usr-${u.id}`,
        label: u.name,
        group: "Utilisateurs",
        icon: Users,
        hint: `${u.role.toUpperCase()} · ${u.city}`,
        run: () => router.push("/admin/users"),
      });
    });

    return base;
  }, [router, push]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q) ||
        it.hint?.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Group filtered items
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((it) => {
      if (!groups[it.group]) groups[it.group] = [];
      groups[it.group].push(it);
    });
    return groups;
  }, [filtered]);

  const flatList = filtered; // for keyboard nav

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(flatList.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = flatList[selected];
      if (it) {
        it.run();
        close();
      }
    }
  };

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm pt-[10vh] px-4" onClick={close}>
      <div
        className="bg-white rounded-xl shadow-lift border border-black/[0.08] max-w-xl mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-black/[0.08]">
          <Search className="w-4 h-4 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Rechercher une page, transaction, utilisateur, action…"
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-ink-400"
          />
          <kbd className="text-[10px] font-semibold text-ink-500 bg-surface px-1.5 py-0.5 rounded border border-black/[0.08]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto scrollbar-thin py-2">
          {flatList.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-ink-500">
              Aucun résultat pour "{query}".
            </div>
          ) : (
            Object.entries(grouped).map(([group, list]) => (
              <div key={group} className="mb-2 last:mb-0">
                <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                  {group}
                </div>
                {list.map((it) => {
                  runningIndex++;
                  const isSel = runningIndex === selected;
                  return (
                    <button
                      key={it.id}
                      onMouseEnter={() => setSelected(flatList.indexOf(it))}
                      onClick={() => {
                        it.run();
                        close();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left ${
                        isSel ? "bg-navy-100 text-navy" : "text-ink-900 hover:bg-ink-100"
                      }`}
                    >
                      <it.icon className="w-4 h-4 flex-none opacity-80" />
                      <span className="flex-1 truncate font-medium">{it.label}</span>
                      {it.hint ? (
                        <span className="text-xs text-ink-500 flex-none truncate">{it.hint}</span>
                      ) : null}
                      {isSel ? <ArrowRight className="w-3.5 h-3.5 flex-none" /> : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-black/[0.08] flex items-center gap-4 text-[11px] text-ink-500">
          <span className="inline-flex items-center gap-1">
            <kbd className="font-semibold bg-surface px-1.5 py-0.5 rounded border border-black/[0.08]">↑↓</kbd>
            naviguer
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="font-semibold bg-surface px-1.5 py-0.5 rounded border border-black/[0.08]">⏎</kbd>
            ouvrir
          </span>
          <span className="ml-auto inline-flex items-center gap-1">
            <kbd className="font-semibold bg-surface px-1.5 py-0.5 rounded border border-black/[0.08]">⌘K</kbd>
            ouvre / ferme
          </span>
        </div>
      </div>
    </div>
  );
}
