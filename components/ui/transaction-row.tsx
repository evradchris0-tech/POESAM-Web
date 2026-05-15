import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Transaction } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import { StatusBadge, RiskBadge } from "./status-badge";
import { CorridorBadge } from "./corridor-badge";

interface InitialsProps {
  text: string;
  tone: "navy" | "orange" | "green";
}
function InitialsAvatar({ text, tone }: InitialsProps) {
  const tones = {
    navy: "bg-[#1B4D8E]",
    orange: "bg-[#C95E0E]",
    green: "bg-[#3B6D11]",
  };
  return (
    <div
      className={`w-7 h-7 rounded-full grid place-items-center text-[10px] font-bold tracking-wide text-white ${tones[tone]}`}
    >
      {text}
    </div>
  );
}

const COLOR_CYCLE: ("navy" | "orange" | "green")[] = ["navy", "orange", "green"];

export function TransactionRow({ tx, index = 0 }: { tx: Transaction; index?: number }) {
  const initials = tx.seller
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone = COLOR_CYCLE[index % COLOR_CYCLE.length];
  return (
    <tr className="border-b border-black/[0.08] last:border-0 hover:bg-surface">
      <td className="px-4 py-3.5">
        <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded text-ink-700">{tx.id}</span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <InitialsAvatar text={initials} tone={tone} />
          <div className="text-sm font-medium leading-tight">
            {tx.seller}
            <small className="block text-[11px] text-ink-500 font-normal mt-0.5">→ {tx.buyer}</small>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5">
        <CorridorBadge corridor={tx.corridor} />
      </td>
      <td className="px-4 py-3.5 tabular text-sm font-medium">{formatFCFA(tx.amount)}</td>
      <td className="px-4 py-3.5">
        <StatusBadge status={tx.status} />
      </td>
      <td className="px-4 py-3.5">
        <RiskBadge score={tx.risk} />
      </td>
      <td className="px-4 py-3.5 text-right">
        <Link
          href={`/admin/escrow/${tx.id}`}
          className="w-7 h-7 inline-grid place-items-center rounded-md border border-black/[0.08] text-ink-700 hover:bg-ink-100"
          aria-label="Voir la transaction"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </td>
    </tr>
  );
}

export { InitialsAvatar };
