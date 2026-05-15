import { notFound } from "next/navigation";
import { TRANSACTIONS } from "@/lib/data";
import { TransactionDetail } from "@/components/admin/transaction-detail";

export function generateStaticParams() {
  return TRANSACTIONS.map((tx) => ({ id: tx.id }));
}

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const tx = TRANSACTIONS.find((t) => t.id === params.id);
  if (!tx) notFound();
  return <TransactionDetail tx={tx} />;
}
