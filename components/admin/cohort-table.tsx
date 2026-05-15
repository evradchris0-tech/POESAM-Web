interface Cohort {
  cohort: string;
  size: number;
  retention: (number | null)[];
}

function cellTone(v: number | null) {
  if (v === null) return "bg-transparent text-transparent";
  if (v >= 90) return "bg-success-500/85 text-white";
  if (v >= 75) return "bg-success-500/60 text-success-700";
  if (v >= 60) return "bg-warning-500/45 text-warning-700";
  if (v >= 40) return "bg-warning-500/25 text-warning-700";
  return "bg-danger-500/30 text-danger-700";
}

export function CohortTable({ cohorts }: { cohorts: Cohort[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]">
              Cohorte
            </th>
            <th className="text-right px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08]">
              Taille
            </th>
            {["M0", "M+1", "M+2", "M+3", "M+4", "M+5"].map((h) => (
              <th
                key={h}
                className="text-center px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400 bg-surface border-b border-black/[0.08] w-[68px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((c) => (
            <tr key={c.cohort} className="border-b border-black/[0.08] last:border-0">
              <td className="px-3 py-2 font-medium">{c.cohort}</td>
              <td className="px-3 py-2 text-right tabular text-ink-700">{c.size}</td>
              {c.retention.map((v, i) => (
                <td key={i} className="px-1 py-1">
                  <div className={`rounded-md py-1.5 text-center text-[12px] font-semibold tabular ${cellTone(v)}`}>
                    {v === null ? "—" : `${v}%`}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
