# TradeFlow Africa — Web App

Application Next.js 14 + Tailwind, livrée pour le pitch POESAM 2026.

> Le projet vit dans `D:\TradeFlow\web\`. À la racine du dépôt on garde le
> dossier candidature (`.docx`), les maquettes mobile (`mobile/`) et le logo source.

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** avec design tokens TradeFlow (`tailwind.config.ts`)
- **lucide-react** pour les icônes
- Police **Inter** via Google Fonts

## Démarrer

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build production
npm start
```

## Routes

| URL | Contenu |
|---|---|
| `/` | Landing publique (hero, problème, solution, corridors, témoignages, CTA) |
| `/buyers` | Espace acheteurs / importateurs (catalogue + inscription) |
| `/admin` | Backoffice LA RUCHE — vue d'ensemble |
| `/admin/kyc` | Validation KYC |
| `/admin/escrow` | Supervision Escrow + filtres + pagination |
| `/admin/rag-monitor` | Monitoring du Customs Navigator (RAG) |
| `/admin/fraud` `/admin/metrics` `/admin/users` `/admin/settings` | Placeholders |
| `/institutional` | Dashboard B2G — corridors actifs |
| `/institutional/barriers` | Heatmap des obstacles non tarifaires |
| `/institutional/reports` | Rapports + générateur custom |
| `/institutional/partners` `/institutional/access` | Compléments B2G |

## Arborescence

```
app/
├── layout.tsx              ← font Inter, métadonnées
├── globals.css             ← tokens, animations subtiles
├── page.tsx                ← landing
├── buyers/page.tsx
├── admin/
│   ├── layout.tsx          ← sidebar + topbar + desktop-only
│   ├── page.tsx            ← overview
│   ├── kyc/escrow/rag-monitor/...
└── institutional/
    ├── layout.tsx
    ├── page.tsx            ← corridors
    ├── barriers/reports/partners/access/

components/
├── landing/                ← header, footer
├── admin/                  ← sidebar, topbar, activity-chart, placeholder, desktop-only
├── institutional/          ← sidebar, topbar
└── ui/                     ← africa-map, status-badge, corridor-badge, metric-card, transaction-row

lib/
├── data.ts                 ← TRANSACTIONS, KYC_QUEUE, RAG_QUERIES, CHART_SERIES (mocks)
└── format.ts               ← formatFCFA, riskLevel
```

## Design tokens

Tous définis dans `tailwind.config.ts` :

- **Navy** `#1B4D8E` (institutionnel)
- **Orange** `#E87722` (accent, action)
- **Success / Danger / Warning** : 100 / 500 / 700
- **Ink** : 100 → 900 pour les neutres
- **Surface** `#F5F7FA`

Polices : Inter, fallbacks system-ui. Container max 1200px.

## Mocks

`lib/data.ts` est la source unique pour toutes les données affichées. Aucune
connexion Supabase / API. Pour brancher un vrai backend en M3, remplacer les
exports par des appels async côté server components.

## Responsive

- Landing & Buyers : mobile 375px → desktop 1280px (Tailwind `md:` `lg:`)
- Admin & Institutional : desktop only — `< lg` affiche un message "Dashboard
  disponible sur desktop" via `<DesktopOnlyNotice />`

## Notes

- `web/` (statique HTML d'origine) et `mobile/` (maquettes Figma) restent à la
  racine — non touchés par le build Next.js (exclus dans `tsconfig.json`).
- Le dossier candidature `TradeFlow_Dossier_Complet_V2.docx` est la source
  documentaire de toutes les données affichées.
