"use client";

import { useState } from "react";
import Image from "next/image";

// Carte interactive : vraie carte géographique Afrique Ouest/Centrale en fond + corridors SVG.
// Coordonnées en % (viewBox 0..100) calées sur la carte dark générée (1:1 ratio).
// Hub Cameroun ≈ (64%, 56%). Destinations : CIV (29%, 52%), SEN (8%, 36%), GAB (62%, 72%).

interface CorridorSpec {
  id: string;
  label: string;
  metric: string;
  meta: string;
  color: string;
  d: string;
  end: { x: number; y: number; code: string };
}

const HUB = { x: 64, y: 56 };
const CORRIDORS: CorridorSpec[] = [
  {
    id: "civ",
    label: "CMR → CIV",
    metric: "Plantain séché · 87/100",
    meta: "750 M FCFA — 0% ZLECAf",
    color: "#38BDF8",
    d: `M ${HUB.x} ${HUB.y} Q 46 42, 29 52`,
    end: { x: 29, y: 52, code: "CIV" },
  },
  {
    id: "sen",
    label: "CMR → SEN",
    metric: "Gingembre bio · 73/100",
    meta: "320 M FCFA — 0% ZLECAf",
    color: "#34D399",
    d: `M ${HUB.x} ${HUB.y} Q 38 28, 8 36`,
    end: { x: 8, y: 36, code: "SEN" },
  },
  {
    id: "gab",
    label: "CMR → GAB",
    metric: "Huile de palme · 91/100",
    meta: "580 M FCFA — 0% CEMAC",
    color: "#F97316",
    d: `M ${HUB.x} ${HUB.y} Q 65 65, 62 72`,
    end: { x: 62, y: 72, code: "GAB" },
  },
];

interface Props {
  variant?: "hero" | "institutional";
  className?: string;
}

export function AfricaMap({ variant = "hero", className = "" }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const isInst = variant === "institutional";

  // En mode hero : pas d'image de fond (la photo satellite est dans le parent),
  // juste le SVG overlay transparent incrusté directement sur l'image de la section.
  if (!isInst) {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Zone vide proportionnelle pour ancrer le SVG */}
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>

          {/* SVG overlay corridors — transparent, incrusté sur la photo satellite */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
            role="img"
            aria-label="Carte Afrique avec 3 corridors commerciaux"
          >
            <defs>
              <radialGradient id="dotPulse" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#F5A55B" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F5A55B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {CORRIDORS.map((c) => (
              <path
                key={c.id + "-base"}
                d={c.d}
                fill="none"
                stroke={c.color}
                strokeOpacity={hover && hover !== c.id ? 0.3 : 0.95}
                strokeLinecap="round"
                strokeWidth={hover === c.id ? 4 : 3}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {CORRIDORS.map((c) => (
              <path
                key={c.id + "-anim"}
                d={c.d}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`corridor-line ${hover && hover !== c.id ? "paused" : ""}`}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {CORRIDORS.map((c) => (
              <path
                key={c.id + "-hit"}
                d={c.d}
                fill="none"
                stroke="transparent"
                strokeWidth="22"
                strokeLinecap="round"
                onMouseEnter={() => setHover(c.id)}
                onMouseLeave={() => setHover(null)}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* Hub Cameroun */}
            <circle cx={HUB.x} cy={HUB.y} r="4.5" fill="url(#dotPulse)" className="pulse-soft" />
            <circle cx={HUB.x} cy={HUB.y} r="1.6" fill="#E87722" stroke="#fff" strokeWidth="0.5" />

            {CORRIDORS.map((c) => (
              <circle
                key={c.id + "-end"}
                cx={c.end.x}
                cy={c.end.y}
                r={hover === c.id ? 1.5 : 1.1}
                fill={c.color}
                stroke="#fff"
                strokeWidth="0.4"
              />
            ))}

            <g
              fontFamily="Inter, system-ui"
              fontSize="2.8"
              fontWeight="700"
              fill="#fff"
              stroke="#071220"
              strokeWidth="0.8"
              paintOrder="stroke fill"
            >
              <text x={HUB.x} y={HUB.y + 5.5} textAnchor="middle">CMR</text>
              <text x={CORRIDORS[0].end.x} y={CORRIDORS[0].end.y - 2.5} textAnchor="middle">CIV</text>
              <text x={CORRIDORS[1].end.x + 5} y={CORRIDORS[1].end.y - 2} textAnchor="middle">SEN</text>
              <text x={CORRIDORS[2].end.x} y={CORRIDORS[2].end.y + 4.5} textAnchor="middle">GAB</text>
            </g>
          </svg>

          {/* Tooltips au survol */}
          {CORRIDORS.map((c) => {
            const isOn = hover === c.id;
            const left = (HUB.x + c.end.x) / 2;
            const top = (HUB.y + c.end.y) / 2;
            return (
              <div
                key={c.id + "-tip"}
                className={`absolute pointer-events-none transition-opacity duration-200 z-10 ${
                  isOn ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -110%)",
                }}
              >
                <div className="px-3 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap bg-[#071220]/90 backdrop-blur border border-white/15 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </div>
                  <div className="text-[10.5px] mt-0.5 text-white/85">{c.metric}</div>
                  <div className="text-[10px] mt-0.5 text-white/65">{c.meta}</div>
                </div>
              </div>
            );
          })}

          {/* Étiquettes statiques */}
          <div className="absolute inset-0 pointer-events-none">
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-sky-400/30 text-white"
              style={{ left: "46%", top: "46%", transform: "translate(-50%, -110%)" }}
            >
              CMR → CIV <b className="text-sky-300">87/100</b>
            </span>
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-emerald-400/30 text-white"
              style={{ left: "36%", top: "28%", transform: "translate(-50%, -110%)" }}
            >
              CMR → SEN <b className="text-emerald-300">73/100</b>
            </span>
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-orange-400/30 text-white"
              style={{ left: "68%", top: "78%", transform: "translate(-50%, -110%)" }}
            >
              CMR → GAB <b className="text-orange-300">91/100</b>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Mode institutional : garde l'image de fond avec cadre
  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* Image de fond — version carte géographique dark */}
        <Image
          src="/africa-hero.png"
          alt="Carte de l'Afrique avec corridors commerciaux TradeFlow"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          sizes="(max-width: 1024px) 90vw, 540px"
        />

        {/* SVG overlay : corridors */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
          role="img"
          aria-label="Carte Afrique avec 3 corridors commerciaux"
        >
          <defs>
            <radialGradient id="dotPulse" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F5A55B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F5A55B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Lignes de base (toujours visibles) */}
          {CORRIDORS.map((c) => (
            <path
              key={c.id + "-base"}
              d={c.d}
              fill="none"
              stroke={c.color}
              strokeOpacity={hover && hover !== c.id ? 0.3 : 0.95}
              strokeLinecap="round"
              strokeWidth={hover === c.id ? 4 : 3}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Pointillés blancs animés par-dessus */}
          {CORRIDORS.map((c) => (
            <path
              key={c.id + "-anim"}
              d={c.d}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={`corridor-line ${hover && hover !== c.id ? "paused" : ""}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Hit-areas larges pour le survol */}
          {CORRIDORS.map((c) => (
            <path
              key={c.id + "-hit"}
              d={c.d}
              fill="none"
              stroke="transparent"
              strokeWidth="22"
              strokeLinecap="round"
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              vectorEffect="non-scaling-stroke"
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Hub Cameroun */}
          <circle cx={HUB.x} cy={HUB.y} r="4.5" fill="url(#dotPulse)" className="pulse-soft" />
          <circle cx={HUB.x} cy={HUB.y} r="1.6" fill="#E87722" stroke="#fff" strokeWidth="0.5" />

          {/* Destinations */}
          {CORRIDORS.map((c) => (
            <circle
              key={c.id + "-end"}
              cx={c.end.x}
              cy={c.end.y}
              r={hover === c.id ? 1.5 : 1.1}
              fill={c.color}
              stroke="#fff"
              strokeWidth="0.4"
            />
          ))}

          {/* Labels pays */}
          <g
            fontFamily="Inter, system-ui"
            fontSize="2.8"
            fontWeight="700"
            fill="#fff"
            stroke="#071220"
            strokeWidth="0.8"
            paintOrder="stroke fill"
          >
            <text x={HUB.x} y={HUB.y + 5.5} textAnchor="middle">CMR</text>
            <text x={CORRIDORS[0].end.x} y={CORRIDORS[0].end.y - 2.5} textAnchor="middle">CIV</text>
            <text x={CORRIDORS[1].end.x + 5} y={CORRIDORS[1].end.y - 2} textAnchor="middle">SEN</text>
            <text x={CORRIDORS[2].end.x} y={CORRIDORS[2].end.y + 4.5} textAnchor="middle">GAB</text>
          </g>
        </svg>

        {/* Tooltips au survol */}
        {CORRIDORS.map((c) => {
          const isOn = hover === c.id;
          const left = (HUB.x + c.end.x) / 2;
          const top = (HUB.y + c.end.y) / 2;
          return (
            <div
              key={c.id + "-tip"}
              className={`absolute pointer-events-none transition-opacity duration-200 z-10 ${
                isOn ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -110%)",
              }}
            >
              <div
                className={`px-3 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap ${
                  isInst
                    ? "bg-white border border-black/10 text-ink-900 shadow-lift"
                    : "bg-[#0E2E55]/95 backdrop-blur border border-white/15 text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  {c.label}
                </div>
                <div className={`text-[10.5px] mt-0.5 ${isInst ? "text-ink-700" : "text-white/85"}`}>
                  {c.metric}
                </div>
                <div className={`text-[10px] mt-0.5 ${isInst ? "text-ink-500" : "text-white/65"}`}>
                  {c.meta}
                </div>
              </div>
            </div>
          );
        })}

        {/* Étiquettes statiques style "carte" — hero uniquement */}
        {!isInst ? (
          <div className="absolute inset-0 pointer-events-none">
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-sky-400/30 text-white"
              style={{ left: "46%", top: "46%", transform: "translate(-50%, -110%)" }}
            >
              CMR → CIV <b className="text-sky-300">87/100</b>
            </span>
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-emerald-400/30 text-white"
              style={{ left: "36%", top: "28%", transform: "translate(-50%, -110%)" }}
            >
              CMR → SEN <b className="text-emerald-300">73/100</b>
            </span>
            <span
              className="absolute px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#071220]/75 backdrop-blur-sm border border-orange-400/30 text-white"
              style={{ left: "68%", top: "78%", transform: "translate(-50%, -110%)" }}
            >
              CMR → GAB <b className="text-orange-300">91/100</b>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
