"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Shield,
  FileSearch,
  AlertTriangle,
  TrendingUp,
  Users,
  Settings,
  Play,
} from "lucide-react";
import { Brand } from "@/components/ui/brand";

interface Item {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: { text: string; tone: "danger" | "neutral" };
}

const SUPERVISION: Item[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/kyc", label: "Gestion KYC", icon: UserCheck, badge: { text: "3", tone: "danger" } },
  { href: "/admin/escrow", label: "Supervision Escrow", icon: Shield, badge: { text: "8", tone: "neutral" } },
  { href: "/admin/rag-monitor", label: "Monitoring RAG", icon: FileSearch },
  { href: "/admin/fraud", label: "Détection Fraude", icon: AlertTriangle, badge: { text: "1", tone: "danger" } },
];

const PLATFORM: Item[] = [
  { href: "/admin/metrics", label: "Métriques", icon: TrendingUp },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname() || "/admin";
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="bg-white border-r border-black/[0.08] py-5 px-3.5 sticky top-0 h-screen overflow-y-auto scrollbar-thin flex flex-col w-[240px] lg:w-[240px] md:w-[72px] hidden md:flex">
      <Link
        href="/admin"
        aria-label="TradeFlow Africa — Backoffice"
        className="inline-flex items-center px-2.5 py-1.5 mb-1"
      >
        <Brand height={32} />
      </Link>
      <div className="hidden lg:block px-2.5 text-[11px] text-ink-500 tracking-wide">
        Backoffice · LA RUCHE
      </div>

      <SidebarGroup title="Supervision" items={SUPERVISION} isActive={isActive} />
      <SidebarGroup title="Plateforme" items={PLATFORM} isActive={isActive} />

      {/* Bouton démo + profil — épinglés en bas */}
      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => window.dispatchEvent(new Event("open-demo"))}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-semibold text-orange-700 bg-orange/10 hover:bg-orange/20 transition-colors w-full border border-orange/20"
          title="Voir la démo produit"
        >
          <Play className="w-[18px] h-[18px] flex-none fill-current" />
          <span className="hidden lg:inline">Démo produit</span>
        </button>

        <div className="p-2.5 flex items-center gap-2.5 border border-black/[0.08] rounded-lg bg-surface">
          <div className="w-8 h-8 rounded-full grid place-items-center bg-[#1B4D8E] text-white text-[11px] font-bold">
            SF
          </div>
          <div className="hidden lg:block text-[12.5px] font-semibold leading-tight">
            Sarah Fombang
            <small className="block text-[11px] text-ink-500 font-normal mt-0.5">
              Admin · LA RUCHE
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarGroup({
  title,
  items,
  isActive,
}: {
  title: string;
  items: Item[];
  isActive: (href: string) => boolean;
}) {
  return (
    <>
      <div className="hidden lg:block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400 px-2.5 pt-3 pb-1.5 mt-2">
        {title}
      </div>
      <nav className="flex flex-col gap-px">
        {items.map((it) => {
          const active = isActive(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] font-medium transition-colors ${
                active
                  ? "bg-navy-100 text-navy font-semibold"
                  : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              {active ? (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-orange" />
              ) : null}
              <Icon className="w-[18px] h-[18px] flex-none opacity-85" />
              <span className="hidden lg:inline">{it.label}</span>
              {it.badge ? (
                <span
                  className={`hidden lg:inline ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    active
                      ? "bg-navy text-white"
                      : it.badge.tone === "danger"
                      ? "bg-danger-100 text-danger-700"
                      : "bg-ink-100 text-ink-700"
                  }`}
                >
                  {it.badge.text}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
