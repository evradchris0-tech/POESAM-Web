import { Check, CircleDot, Circle, AlertTriangle, Truck, ShieldCheck, Send, PackageCheck, Banknote, UserCheck } from "lucide-react";
import type { TimelineEvent } from "@/lib/data";

const ICONS: Record<TimelineEvent["kind"], typeof Check> = {
  kyc: UserCheck,
  deposit: Send,
  lock: ShieldCheck,
  shipping: Truck,
  transit: Truck,
  delivery: PackageCheck,
  release: Banknote,
  alert: AlertTriangle,
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative">
      {events.map((ev, i) => {
        const Icon = ICONS[ev.kind] ?? Circle;
        const isDone = ev.status === "done";
        const isCurrent = ev.status === "current";
        const isPending = ev.status === "pending";
        return (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Connector line */}
            {i < events.length - 1 ? (
              <span
                className={`absolute left-[15px] top-8 bottom-0 w-px ${
                  isDone ? "bg-success-500/60" : isCurrent ? "bg-navy/40" : "bg-ink-200"
                }`}
              />
            ) : null}
            {/* Bullet */}
            <div
              className={`relative z-10 flex-none w-8 h-8 rounded-full grid place-items-center border-2 ${
                isDone
                  ? "bg-success-100 border-success-500 text-success-700"
                  : isCurrent
                  ? "bg-navy-100 border-navy text-navy"
                  : "bg-white border-ink-200 text-ink-400"
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : isCurrent ? <CircleDot className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
            </div>
            {/* Content */}
            <div className="flex-1 -mt-0.5 min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 tabular">
                {ev.at}
              </div>
              <div
                className={`text-[14px] mt-0.5 font-medium leading-snug ${
                  isPending ? "text-ink-500" : "text-ink-900"
                }`}
              >
                {ev.title}
              </div>
              {ev.detail ? <div className="text-[12px] text-ink-500 mt-0.5">{ev.detail}</div> : null}
              {isCurrent ? (
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-navy bg-navy-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
                  En cours
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
