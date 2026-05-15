import type { Metadata } from "next";
import "./globals.css";
import { GlobalDemoModal } from "@/components/ui/global-demo-modal";

export const metadata: Metadata = {
  title: "TradeFlow Africa — L'infrastructure du commerce africain",
  description:
    "TradeFlow Africa connecte les PME camerounaises aux acheteurs africains. Intelligence commerciale IA, guide douanier officiel, paiement sécurisé PAPSS.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <GlobalDemoModal />
      </body>
    </html>
  );
}
