"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Lock } from "lucide-react";
import { Brand } from "@/components/ui/brand";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all border-b ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-black/[0.08]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container-tf flex items-center gap-8 h-[72px]">
        <Link href="/" aria-label="TradeFlow Africa — Accueil" className="flex items-center">
          <Brand height={36} pill={!scrolled} />
        </Link>

        <nav
          className={`hidden md:flex gap-7 ml-4 text-sm font-medium ${
            scrolled ? "text-ink-700" : "text-white/85"
          }`}
        >
          <a href="#solution" className="hover:opacity-90 py-1.5 border-b-2 border-transparent">
            La solution
          </a>
          <a href="#corridors" className="hover:opacity-90 py-1.5 border-b-2 border-transparent">
            Corridors
          </a>
          <a href="#temoignages" className="hover:opacity-90 py-1.5 border-b-2 border-transparent">
            Témoignages
          </a>
          <Link href="/buyers" className="hover:opacity-90 py-1.5 border-b-2 border-transparent">
            Acheteurs
          </Link>
          <a href="#contact" className="hover:opacity-90 py-1.5 border-b-2 border-transparent">
            Contact
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-demo"))}
            id="header-btn-demo"
            className={`hidden md:inline-flex h-10 px-4 items-center gap-2 rounded-md text-sm font-semibold border ${
              scrolled
                ? "border-navy text-navy hover:bg-navy-100"
                : "border-white/45 text-white hover:bg-white/10"
            }`}
          >
            Voir la démo
          </button>

          {/* Lien Backoffice Admin */}
          <Link
            href="/admin"
            id="header-btn-admin"
            className={`hidden md:inline-flex h-10 px-3.5 items-center gap-1.5 rounded-md text-sm font-semibold transition-colors ${
              scrolled
                ? "bg-ink-100 text-ink-700 hover:bg-ink-200"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
            title="Accès Backoffice LA RUCHE"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin
          </Link>

          <a
            href="#cta"
            className="hidden md:inline-flex h-10 px-4 items-center gap-2 rounded-md text-sm font-semibold bg-orange text-white hover:bg-orange-700"
          >
            Commencer à exporter
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden w-10 h-10 grid place-items-center ${
              scrolled ? "text-ink-900" : "text-white"
            }`}
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="md:hidden bg-white border-t border-black/[0.08]">
          <nav className="container-tf flex flex-col gap-1 py-3 text-sm font-medium text-ink-900">
            <a href="#solution" onClick={() => setOpen(false)} className="px-2 py-2.5">
              La solution
            </a>
            <a href="#corridors" onClick={() => setOpen(false)} className="px-2 py-2.5">
              Corridors
            </a>
            <a href="#temoignages" onClick={() => setOpen(false)} className="px-2 py-2.5">
              Témoignages
            </a>
            <Link href="/buyers" onClick={() => setOpen(false)} className="px-2 py-2.5">
              Acheteurs
            </Link>
            <a href="#contact" onClick={() => setOpen(false)} className="px-2 py-2.5">
              Contact
            </a>
            <button
              onClick={() => { setOpen(false); window.dispatchEvent(new Event("open-demo")); }}
              className="px-2 py-2.5 text-left font-medium text-orange-700"
            >
              ▶ Voir la démo
            </button>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="px-2 py-2.5 flex items-center gap-2 font-medium text-ink-500"
            >
              <Lock className="w-3.5 h-3.5" />
              Backoffice Admin
            </Link>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 px-4 items-center justify-center rounded-md text-sm font-semibold bg-orange text-white"
            >
              Commencer à exporter
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
