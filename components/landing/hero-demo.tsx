"use client";

import { ArrowRight, Play } from "lucide-react";

/** Dispatch un event global pour ouvrir le modal démo (monté dans le layout). */
const openDemo = () => window.dispatchEvent(new Event("open-demo"));

export function HeroDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#cta"
        className="inline-flex px-6 items-center gap-2 rounded-md bg-orange text-white font-semibold text-[15px] hover:bg-orange-700 transition-colors"
        style={{ height: 52 }}
      >
        Commencer à exporter
        <ArrowRight className="w-4 h-4" />
      </a>
      <button
        id="btn-open-demo"
        onClick={openDemo}
        className="inline-flex px-6 items-center gap-2 rounded-md border border-white/45 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors"
        style={{ height: 52 }}
      >
        <Play className="w-4 h-4 fill-current" />
        Voir la démo en direct
      </button>
    </div>
  );
}
