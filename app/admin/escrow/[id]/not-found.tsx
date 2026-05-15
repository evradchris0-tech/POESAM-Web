import Link from "next/link";
import { AdminTopbar } from "@/components/admin/topbar";
import { EmptyState } from "@/components/ui/empty-state";
import { FileQuestion } from "lucide-react";

export default function TxNotFound() {
  return (
    <>
      <AdminTopbar crumb="Escrow / Introuvable" />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <Link
          href="/admin/escrow"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-500 hover:text-navy font-medium mb-5"
        >
          ← Retour aux transactions
        </Link>
        <EmptyState
          icon={FileQuestion}
          title="Transaction introuvable"
          description="Cette transaction n'existe pas, ou elle a été archivée. Vérifiez l'identifiant TF-2024-XXXX ou retournez à la liste."
        />
      </div>
    </>
  );
}
