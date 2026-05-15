import { AdminTopbar } from "@/components/admin/topbar";
import { Construction } from "lucide-react";

export function AdminPlaceholder({
  crumb,
  title,
  subtitle,
  body,
}: {
  crumb: string;
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <>
      <AdminTopbar crumb={crumb} />
      <div className="px-6 lg:px-8 pt-7 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">{title}</h1>
          <p className="text-[13.5px] text-ink-500">{subtitle}</p>
        </div>

        <div className="bg-white border border-dashed border-black/[0.14] rounded-xl px-6 py-16 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy-100 text-navy grid place-items-center">
            <Construction className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold mb-2">Module en développement</h3>
          <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
        </div>
      </div>
    </>
  );
}
