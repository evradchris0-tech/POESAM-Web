interface BreakdownItem {
  dim: string;
  score: number;
  reason: string;
}

export function RiskBreakdown({ items }: { items: BreakdownItem[] }) {
  return (
    <ul className="divide-y divide-black/[0.08]">
      {items.map((it) => {
        const tone =
          it.score < 30
            ? { bar: "bg-success-500", txt: "text-success-700" }
            : it.score <= 60
            ? { bar: "bg-warning-500", txt: "text-warning-700" }
            : { bar: "bg-danger-500", txt: "text-danger-700" };
        return (
          <li key={it.dim} className="px-5 py-4 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 items-center">
            <div className="font-medium text-sm">{it.dim}</div>
            <div className={`text-base font-bold tabular ${tone.txt}`}>{it.score}<span className="text-ink-400 font-medium text-xs">/100</span></div>
            <div className="col-span-2 h-1.5 bg-ink-100 rounded overflow-hidden">
              <div className={`h-full rounded ${tone.bar}`} style={{ width: `${it.score}%` }} />
            </div>
            <div className="col-span-2 text-xs text-ink-500 leading-snug">{it.reason}</div>
          </li>
        );
      })}
    </ul>
  );
}
