import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="px-6 py-12 text-center bg-white border border-dashed border-black/[0.14] rounded-xl">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-navy-100 text-navy grid place-items-center">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold mb-1.5">{title}</h3>
      <p className="text-xs text-ink-500 leading-relaxed max-w-md mx-auto">{description}</p>
      {action ? (
        <button
          onClick={action.onClick}
          className="mt-4 h-9 px-3.5 rounded-md bg-navy text-white text-[13px] font-semibold hover:bg-navy-500"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
