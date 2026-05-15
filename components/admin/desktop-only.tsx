import { Monitor } from "lucide-react";

export function DesktopOnlyNotice() {
  return (
    <div className="lg:hidden min-h-screen grid place-items-center bg-surface px-6">
      <div className="bg-white rounded-xl border border-black/[0.08] p-8 max-w-sm text-center shadow-card">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-navy-100 text-navy grid place-items-center">
          <Monitor className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold mb-2">Dashboard disponible sur desktop</h2>
        <p className="text-sm text-ink-500 leading-relaxed">
          Cette interface a été optimisée pour les écrans larges (≥ 1024 px).
          Reconnectez-vous depuis un ordinateur pour accéder au backoffice TradeFlow.
        </p>
      </div>
    </div>
  );
}
