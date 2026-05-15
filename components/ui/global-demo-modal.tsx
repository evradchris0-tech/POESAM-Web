"use client";

import { useState, useEffect } from "react";
import { DemoModal } from "@/components/ui/demo-modal";

/**
 * Monté une seule fois dans le RootLayout.
 * N'importe quel bouton peut ouvrir la démo avec :
 *   window.dispatchEvent(new Event("open-demo"))
 */
export function GlobalDemoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-demo", handler);
    return () => window.removeEventListener("open-demo", handler);
  }, []);

  return <DemoModal isOpen={open} onClose={() => setOpen(false)} />;
}
