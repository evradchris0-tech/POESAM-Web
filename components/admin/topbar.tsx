"use client";

import { Bell, HelpCircle, Search, ExternalLink, Play } from "lucide-react";
import Link from "next/link";

export function AdminTopbar({ crumb }: { crumb: string }) {
  return (
    <header className="flex items-center gap-4 px-6 lg:px-8 bg-white border-b border-black/[0.08] h-[60px] sticky top-0 z-10">
      <div className="flex items-center gap-2 text-[13px] text-ink-500">
        <span>LA RUCHE</span>
        <span className="text-ink-300">/</span>
        <b className="text-ink-900 font-semibold">{crumb}</b>
      </div>

      <button
        onClick={() => window.dispatchEvent(new Event("open-palette"))}
        className="ml-6 hidden md:flex items-center gap-2 px-3 h-9 rounded-md bg-surface border border-transparent hover:border-navy/30 hover:bg-white transition-colors flex-1 max-w-sm text-left"
        aria-label="Ouvrir la palette de commandes"
      >
        <Search className="w-3.5 h-3.5 text-ink-400" />
        <span className="flex-1 text-[13px] text-ink-400">Rechercher transaction, PME, action…</span>
        <kbd className="text-[10px] font-semibold text-ink-500 bg-white px-1.5 py-0.5 rounded border border-black/[0.08]">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-3">
        {/* Bouton démo rapide */}
        <button
          onClick={() => window.dispatchEvent(new Event("open-demo"))}
          id="admin-btn-demo"
          className="hidden md:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-orange/10 text-orange-700 border border-orange/20 text-[13px] font-semibold hover:bg-orange/20 transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Démo
        </button>
        <button
          className="relative w-9 h-9 grid place-items-center rounded-md bg-surface text-ink-700 hover:bg-ink-100"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-500 ring-2 ring-surface" />
        </button>
        <button
          className="w-9 h-9 grid place-items-center rounded-md bg-surface text-ink-700 hover:bg-ink-100"
          aria-label="Aide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <Link
          href="/"
          className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md bg-navy text-white text-[13px] font-semibold hover:bg-navy-500"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Landing publique
        </Link>
      </div>
    </header>
  );
}
