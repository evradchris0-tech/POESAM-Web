import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  unit?: string;
  trend?: { kind: "up" | "down" | "muted" | "danger"; text: string };
  icon?: LucideIcon;
  emphasis?: "default" | "danger";
}

export function MetricCard({ label, value, unit, trend, icon: Icon, emphasis = "default" }: Props) {
  const trendTone = {
    up: "text-success-700",
    down: "text-danger-700",
    muted: "text-ink-500",
    danger: "text-danger-700",
  };
  return (
    <div className="bg-white border border-black/[0.08] rounded-lg px-5 py-4 flex flex-col gap-2 min-h-[100px]">
      <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
        <span>{label}</span>
        {Icon ? <Icon className="w-3.5 h-3.5 opacity-60" /> : null}
      </div>
      <div
        className={`text-[28px] font-bold tabular leading-tight tracking-tight ${
          emphasis === "danger" ? "text-danger-500" : "text-ink-900"
        }`}
      >
        {value}
        {unit ? <span className="text-sm font-medium text-ink-500 ml-1">{unit}</span> : null}
      </div>
      {trend ? (
        <div className={`text-[11.5px] font-semibold tabular ${trendTone[trend.kind]}`}>
          {trend.kind === "up" ? "↑ " : trend.kind === "down" ? "↓ " : ""}
          {trend.text}
        </div>
      ) : null}
    </div>
  );
}
