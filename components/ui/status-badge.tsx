import { TxStatus, STATUS_LABELS } from "@/lib/data";

const STATUS_TONE: Record<TxStatus, string> = {
  transit: "bg-warning-100 text-warning-700",
  escrow_confirme: "bg-success-100 text-success-700",
  liberation: "bg-success-100 text-success-700",
  attente: "bg-warning-100 text-warning-700",
  kyc_validation: "bg-ink-100 text-ink-700",
};

export function StatusBadge({ status }: { status: TxStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium ${STATUS_TONE[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function GenericBadge({
  tone = "navy",
  children,
}: {
  tone?: "navy" | "success" | "warning" | "danger" | "neutral" | "orange";
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    navy: "bg-navy-200 text-navy-700",
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    danger: "bg-danger-100 text-danger-700",
    orange: "bg-orange-100 text-orange-700",
    neutral: "bg-ink-100 text-ink-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function RiskBadge({ score }: { score: number }) {
  const tone =
    score < 30
      ? "text-success-700 before:bg-success-500"
      : score <= 60
      ? "text-warning-700 before:bg-warning-500"
      : "text-danger-700 before:bg-danger-500";
  return (
    <span
      className={`inline-flex items-center gap-2 tabular text-sm font-medium before:content-[''] before:w-2 before:h-2 before:rounded-full ${tone}`}
    >
      {score}
    </span>
  );
}
