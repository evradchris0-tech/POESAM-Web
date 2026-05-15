import Link from "next/link";

export function InstitutionalTopbar({ crumb }: { crumb: string }) {
  return (
    <header className="flex items-center gap-4 px-6 lg:px-8 bg-white border-b border-black/[0.08] h-[60px] sticky top-0 z-10">
      <div className="flex items-center gap-2 text-[13px] text-ink-500">
        <span>Dashboard institutionnel</span>
        <span className="text-ink-300">/</span>
        <b className="text-ink-900 font-semibold">{crumb}</b>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden md:inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-medium bg-navy-100 text-navy">
          <span className="w-1.5 h-1.5 rounded-full bg-navy" />
          GUCE · Lecture seule
        </span>
        <Link
          href="/"
          className="inline-flex h-9 px-3.5 items-center gap-1.5 rounded-md border border-black/[0.08] bg-white text-ink-700 text-[13px] font-semibold hover:bg-ink-100"
        >
          Retour landing
        </Link>
      </div>
    </header>
  );
}
