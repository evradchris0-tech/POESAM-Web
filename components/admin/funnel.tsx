import { formatNumber } from "@/lib/format";
import { ArrowDown } from "lucide-react";

interface Step {
  step: string;
  value: number;
  kind: "neutral" | "navy" | "success";
}

export function Funnel({ steps }: { steps: Step[] }) {
  const max = steps[0].value;
  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => {
        const pct = (s.value / max) * 100;
        const conv = i > 0 ? (s.value / steps[i - 1].value) * 100 : null;
        const bg = {
          neutral: "bg-ink-300",
          navy: "bg-navy",
          success: "bg-success-500",
        }[s.kind];
        return (
          <li key={s.step}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-ink-900">{s.step}</span>
              <span className="tabular text-sm">
                <b className="text-ink-900 font-bold">{formatNumber(s.value)}</b>
                {conv !== null ? (
                  <span className={`ml-2 text-xs font-semibold ${conv > 70 ? "text-success-700" : conv > 40 ? "text-warning-700" : "text-danger-700"}`}>
                    {conv.toFixed(0)}%
                  </span>
                ) : null}
              </span>
            </div>
            <div className="h-7 bg-ink-100 rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-500 ${bg}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {i < steps.length - 1 ? (
              <div className="flex justify-center mt-1">
                <ArrowDown className="w-3 h-3 text-ink-300" />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
