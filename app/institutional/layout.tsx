import { InstitutionalSidebar } from "@/components/institutional/sidebar";
import { DesktopOnlyNotice } from "@/components/admin/desktop-only";

export default function InstitutionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DesktopOnlyNotice />
      <div className="hidden lg:grid grid-cols-[240px_1fr] min-h-screen bg-[#F5F7FA]">
        <InstitutionalSidebar />
        <div className="flex flex-col min-w-0">{children}</div>
      </div>
    </>
  );
}
