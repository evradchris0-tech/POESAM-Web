import { CHART_SERIES } from "@/lib/data";

export function ActivityChart() {
  const series = CHART_SERIES;
  const all = [...series["CMR-CIV"], ...series["CMR-SEN"], ...series["CMR-GAB"]];
  const max = Math.max(...all);

  const W = 720;
  const H = 220;
  const padL = 40;
  const padR = 8;
  const padT = 20;
  const padB = 38;

  const buildPath = (vals: number[]) => {
    const dx = (W - padL - padR) / (vals.length - 1);
    return vals
      .map((v, i) => {
        const x = padL + i * dx;
        const y = padT + (H - padT - padB) * (1 - v / max);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="bg-white border border-black/[0.08] rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-black/[0.08] flex items-center justify-between">
        <h4 className="text-sm font-semibold">Volume de transactions · 30 derniers jours</h4>
        <span className="text-xs text-ink-500">FCFA · par corridor</span>
      </div>
      <div className="p-5">
        <div className="flex gap-5 mb-4 text-xs text-ink-700">
          {[
            { label: "CMR → CIV", color: "#1B4D8E" },
            { label: "CMR → SEN", color: "#27AE60" },
            { label: "CMR → GAB", color: "#E87722" },
          ].map((l) => (
            <span key={l.label} className="inline-flex items-center gap-2 font-medium">
              <span className="w-3 h-0.5 rounded" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
          {/* grid */}
          <g stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2 3">
            <line x1={padL} y1="20" x2={W - padR} y2="20" />
            <line x1={padL} y1="70" x2={W - padR} y2="70" />
            <line x1={padL} y1="120" x2={W - padR} y2="120" />
            <line x1={padL} y1="170" x2={W - padR} y2="170" />
          </g>
          {/* y axis labels */}
          <g fontSize="10" fill="#888888">
            <text x="32" y="24" textAnchor="end">2,0M</text>
            <text x="32" y="74" textAnchor="end">1,5M</text>
            <text x="32" y="124" textAnchor="end">1,0M</text>
            <text x="32" y="174" textAnchor="end">0,5M</text>
            <text x="32" y="200" textAnchor="end">0</text>
          </g>
          {/* x axis labels */}
          <g fontSize="10" fill="#888888">
            <text x="60" y="200">11/04</text>
            <text x="200" y="200">18/04</text>
            <text x="340" y="200">25/04</text>
            <text x="480" y="200">02/05</text>
            <text x="620" y="200">09/05</text>
          </g>
          <path
            d={buildPath(series["CMR-CIV"])}
            fill="none"
            stroke="#1B4D8E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath(series["CMR-SEN"])}
            fill="none"
            stroke="#27AE60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath(series["CMR-GAB"])}
            fill="none"
            stroke="#E87722"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
