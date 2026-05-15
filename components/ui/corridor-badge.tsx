import { Corridor, CORRIDORS } from "@/lib/data";

export function CorridorBadge({ corridor }: { corridor: Corridor }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium bg-navy-200 text-navy-700">
      {CORRIDORS[corridor].label}
    </span>
  );
}
