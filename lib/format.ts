export function formatFCFA(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/ /g, " ") + " FCFA";
}

export function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR").replace(/ /g, " ");
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(".", ",") + " Mds";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + " M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + " K";
  return String(n);
}

export type RiskLevel = "low" | "medium" | "high";
export function riskLevel(score: number): RiskLevel {
  if (score < 30) return "low";
  if (score <= 60) return "medium";
  return "high";
}
