import { AdminSidebar } from "@/components/admin/sidebar";
import { DesktopOnlyNotice } from "@/components/admin/desktop-only";
import { ToastProvider } from "@/components/ui/toast";
import { CommandPalette } from "@/components/admin/command-palette";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DesktopOnlyNotice />
      <div className="hidden lg:grid grid-cols-[240px_1fr] min-h-screen bg-surface">
        <AdminSidebar />
        <div className="flex flex-col min-w-0 route-fade">{children}</div>
      </div>
      <CommandPalette />
    </ToastProvider>
  );
}
