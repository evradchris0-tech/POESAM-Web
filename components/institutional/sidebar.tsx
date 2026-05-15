"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, AlertOctagon, FileBarChart, Building2, Lock } from "lucide-react";
import { Brand } from "@/components/ui/brand";

const ITEMS = [
  { href: "/institutional", label: "Corridors actifs", icon: Map },
  { href: "/institutional/barriers", label: "Obstacles non tarifaires", icon: AlertOctagon },
  { href: "/institutional/reports", label: "Rapports ZLECAf", icon: FileBarChart },
  { href: "/institutional/partners", label: "Partenaires", icon: Building2 },
  { href: "/institutional/access", label: "Accès & permissions", icon: Lock },
];

export function InstitutionalSidebar() {
  const pathname = usePathname() || "/institutional";
  const isActive = (href: string) =>
    href === "/institutional" ? pathname === "/institutional" : pathname.startsWith(href);

  return (
    <aside className="bg-[#F8FAFC] border-r border-black/[0.08] py-5 px-3.5 sticky top-0 h-screen overflow-y-auto scrollbar-thin flex flex-col w-[240px]">
      <Link
        href="/institutional"
        aria-label="TradeFlow Africa — Dashboard institutionnel"
        className="inline-flex items-center px-2.5 py-1.5 mb-1"
      >
        <Brand height={32} />
      </Link>
      <div className="px-2.5 text-[11px] text-ink-500 tracking-wide">Accès Institutionnel</div>

      <nav className="flex flex-col gap-px mt-5">
        {ITEMS.map((it) => {
          const active = isActive(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] font-medium ${
                active
                  ? "bg-navy-100 text-navy font-semibold"
                  : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-none opacity-85" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2.5 pt-6 text-[11px] text-ink-400 leading-relaxed">
        Données anonymisées · Lecture seule
        <br />
        <span className="text-ink-500">Édition Mai 2026 — v2.0</span>
      </div>
    </aside>
  );
}
