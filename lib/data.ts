// Centralised mocked dataset — single source of truth for all dashboards.
// Cohérent avec TradeFlow_Dossier_Complet_V2.docx.

export type Corridor = "CMR-CIV" | "CMR-SEN" | "CMR-GAB";

export const CORRIDORS: Record<Corridor, { label: string; color: string; product: string; price: string; tariff: string; volume: string; score: number }> = {
  "CMR-CIV": {
    label: "CMR → CIV",
    color: "#1B4D8E",
    product: "Plantain séché",
    price: "3 100 FCFA/kg",
    tariff: "0% ZLECAf",
    volume: "750 M FCFA",
    score: 87,
  },
  "CMR-SEN": {
    label: "CMR → SEN",
    color: "#27AE60",
    product: "Gingembre bio",
    price: "4 800 FCFA/kg",
    tariff: "0% ZLECAf",
    volume: "320 M FCFA",
    score: 73,
  },
  "CMR-GAB": {
    label: "CMR → GAB",
    color: "#E87722",
    product: "Huile de palme",
    price: "1 200 FCFA/L",
    tariff: "0% CEMAC",
    volume: "580 M FCFA",
    score: 91,
  },
};

export type TxStatus =
  | "transit"
  | "escrow_confirme"
  | "liberation"
  | "attente"
  | "kyc_validation";

export interface TimelineEvent {
  at: string;        // "10 mai 2026 · 09h12"
  kind: "kyc" | "deposit" | "lock" | "shipping" | "transit" | "delivery" | "release" | "alert";
  title: string;
  detail?: string;
  actor?: string;
  status: "done" | "current" | "pending";
}

export interface Transaction {
  id: string;
  seller: string;
  buyer: string;
  buyerCountry: string;
  corridor: Corridor;
  amount: number;
  commission: number;
  status: TxStatus;
  risk: number;
  product: string;
  productEmoji: string;
  productImage: string;
  qty: string;
  bank: string;
  openedAt: string;
  expectedDelivery: string;
  sellerCity: string;
  sellerRccm: string;
  sellerTrust: number;
  buyerTrust: number;
  documents: { name: string; status: "ok" | "missing" | "pending" }[];
  timeline: TimelineEvent[];
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: "TF-2024-0847",
    seller: "Jean-Paul Mboumba",
    buyer: "Kouadio Marc",
    buyerCountry: "Abidjan, CIV",
    corridor: "CMR-CIV",
    amount: 1_550_000,
    commission: 23_250,
    status: "transit",
    risk: 32,
    product: "Plantain séché",
    productEmoji: "🌿",
    productImage: "/images/plantain.jpg",
    qty: "500 kg",
    bank: "Ecobank PAPSS",
    openedAt: "06 mai 2026 · 14h12",
    expectedDelivery: "13 mai 2026",
    sellerCity: "Bafoussam, CMR",
    sellerRccm: "RC/YAO/2024/B/00482",
    sellerTrust: 82,
    buyerTrust: 71,
    documents: [
      { name: "Facture proforma", status: "ok" },
      { name: "Certificat phytosanitaire MINADER", status: "ok" },
      { name: "Certificat d'origine ZLECAf", status: "ok" },
      { name: "Lettre de transport AGL", status: "pending" },
    ],
    timeline: [
      { at: "06 mai · 14h12", kind: "kyc", title: "KYC vendeur vérifié", detail: "Sarah Fombang · LA RUCHE", status: "done" },
      { at: "06 mai · 15h47", kind: "deposit", title: "Acheteur a déposé 1 550 000 FCFA", detail: "Orange Money CIV — KOUADIO M.", status: "done" },
      { at: "06 mai · 15h49", kind: "lock", title: "Fonds bloqués chez Ecobank PAPSS", detail: "Référence : PAPSS-CIV-0847-26", status: "done" },
      { at: "07 mai · 09h22", kind: "shipping", title: "Commande remise au transporteur AGL", detail: "20 cartons · 500 kg", status: "done" },
      { at: "09 mai · 11h05", kind: "transit", title: "Passage douane Yaoundé", detail: "GUCE export validé · 0% ZLECAf", status: "current" },
      { at: "13 mai (prévu)", kind: "delivery", title: "Livraison Abidjan attendue", status: "pending" },
      { at: "+48 h après livraison", kind: "release", title: "Libération automatique programmée", status: "pending" },
    ],
  },
  {
    id: "TF-2024-0851",
    seller: "Hawa Oumarou",
    buyer: "Fatou Diallo",
    buyerCountry: "Dakar, SEN",
    corridor: "CMR-SEN",
    amount: 960_000,
    commission: 14_400,
    status: "escrow_confirme",
    risk: 18,
    product: "Gingembre bio",
    productEmoji: "🌱",
    productImage: "/images/ginger.jpg",
    qty: "200 kg",
    bank: "Ecobank PAPSS",
    openedAt: "08 mai 2026 · 10h03",
    expectedDelivery: "16 mai 2026",
    sellerCity: "Adamawa, CMR",
    sellerRccm: "RC/NGA/2025/B/00118",
    sellerTrust: 76,
    buyerTrust: 88,
    documents: [
      { name: "Facture proforma", status: "ok" },
      { name: "Certificat bio Ecocert", status: "ok" },
      { name: "Certificat d'origine ZLECAf", status: "pending" },
    ],
    timeline: [
      { at: "08 mai · 10h03", kind: "kyc", title: "KYC vendeuse vérifié", detail: "Coop. Femmes Adamawa", status: "done" },
      { at: "08 mai · 11h41", kind: "deposit", title: "Acheteuse a déposé 960 000 FCFA", detail: "Orange Money SEN — DIALLO F.", status: "done" },
      { at: "08 mai · 11h43", kind: "lock", title: "Fonds bloqués chez Ecobank PAPSS", status: "done" },
      { at: "10 mai (en cours)", kind: "shipping", title: "Préparation expédition", status: "current" },
      { at: "16 mai (prévu)", kind: "delivery", title: "Livraison Dakar attendue", status: "pending" },
    ],
  },
  {
    id: "TF-2024-0863",
    seller: "Albert Biya",
    buyer: "Pierre Ondo",
    buyerCountry: "Libreville, GAB",
    corridor: "CMR-GAB",
    amount: 1_440_000,
    commission: 21_600,
    status: "liberation",
    risk: 12,
    product: "Huile de palme",
    productEmoji: "🫙",
    productImage: "/images/palm-oil.jpg",
    qty: "1 200 L",
    bank: "UBA PAPSS",
    openedAt: "01 mai 2026 · 08h22",
    expectedDelivery: "09 mai 2026 (livré)",
    sellerCity: "Douala, CMR",
    sellerRccm: "RC/DLA/2023/B/01209",
    sellerTrust: 94,
    buyerTrust: 79,
    documents: [
      { name: "Facture proforma", status: "ok" },
      { name: "Certificat d'origine CEMAC", status: "ok" },
      { name: "Lettre de transport AGL", status: "ok" },
      { name: "Bon de livraison signé", status: "ok" },
    ],
    timeline: [
      { at: "01 mai · 08h22", kind: "kyc", title: "KYC vendeur vérifié", status: "done" },
      { at: "01 mai · 09h12", kind: "deposit", title: "Acheteur a déposé 1 440 000 FCFA", detail: "Orange Money GAB", status: "done" },
      { at: "01 mai · 09h13", kind: "lock", title: "Fonds bloqués chez UBA PAPSS", status: "done" },
      { at: "02 mai · 11h38", kind: "shipping", title: "Expédition Douala → Libreville", status: "done" },
      { at: "09 mai · 14h22", kind: "delivery", title: "Livraison confirmée par P. Ondo", detail: "OTP livraison validé", status: "done" },
      { at: "11 mai · 14h22 (programmé)", kind: "release", title: "Libération automatique des fonds", status: "current" },
    ],
  },
  {
    id: "TF-2024-0871",
    seller: "Coop. Mungo",
    buyer: "Abi Food CI",
    buyerCountry: "Bouaké, CIV",
    corridor: "CMR-CIV",
    amount: 880_000,
    commission: 13_200,
    status: "attente",
    risk: 45,
    product: "Plantain séché",
    productEmoji: "🌿",
    productImage: "/images/plantain-bunch.jpg",
    qty: "280 kg",
    bank: "Ecobank PAPSS",
    openedAt: "09 mai 2026 · 16h44",
    expectedDelivery: "17 mai 2026",
    sellerCity: "Mungo, CMR",
    sellerRccm: "RC/MUN/2025/B/00027",
    sellerTrust: 51,
    buyerTrust: 64,
    documents: [
      { name: "Facture proforma", status: "ok" },
      { name: "Certificat phytosanitaire MINADER", status: "pending" },
      { name: "Lettre de transport AGL", status: "missing" },
    ],
    timeline: [
      { at: "09 mai · 16h44", kind: "kyc", title: "KYC vendeur vérifié", status: "done" },
      { at: "09 mai · 17h21", kind: "deposit", title: "Acheteur a déposé 880 000 FCFA", status: "done" },
      { at: "09 mai · 17h22", kind: "lock", title: "Fonds bloqués chez Ecobank PAPSS", status: "done" },
      { at: "10 mai (en attente)", kind: "shipping", title: "Expédition à programmer", detail: "Documents douaniers incomplets", status: "current" },
    ],
  },
  {
    id: "TF-2024-0875",
    seller: "GIC Bafang",
    buyer: "Dakar Naturel",
    buyerCountry: "Dakar, SEN",
    corridor: "CMR-SEN",
    amount: 620_000,
    commission: 9_300,
    status: "kyc_validation",
    risk: 8,
    product: "Gingembre bio",
    productEmoji: "🌱",
    productImage: "/images/ginger-fresh.jpg",
    qty: "130 kg",
    bank: "Ecobank PAPSS",
    openedAt: "10 mai 2026 · 11h09",
    expectedDelivery: "18 mai 2026",
    sellerCity: "Bafang, CMR",
    sellerRccm: "RC/BAF/2025/B/00098",
    sellerTrust: 0,
    buyerTrust: 81,
    documents: [
      { name: "Facture proforma", status: "ok" },
    ],
    timeline: [
      { at: "10 mai · 11h09", kind: "kyc", title: "Dossier KYC reçu — vendeur", detail: "En attente validation LA RUCHE", status: "current" },
      { at: "10 mai (en attente)", kind: "deposit", title: "Dépôt acheteur en attente", status: "pending" },
    ],
  },
];

export const STATUS_LABELS: Record<TxStatus, string> = {
  transit: "En transit",
  escrow_confirme: "Escrow confirmé",
  liberation: "Libération en cours",
  attente: "En attente expédition",
  kyc_validation: "KYC en validation",
};

export interface KycRow {
  id: string;
  name: string;
  type: string;
  city: string;
  submittedAgo: string;
  slaBreach?: boolean;
  docs: { rccm?: boolean; id?: boolean; selfie?: boolean; corp?: boolean };
  initials: string;
  avatarColor: "navy" | "orange" | "green";
}

export const KYC_QUEUE: KycRow[] = [
  {
    id: "kyc-1",
    name: "Nkemdirim Pauline",
    type: "PME · Plantain & dérivés",
    city: "Yaoundé",
    submittedAgo: "il y a 2h",
    docs: { rccm: true, id: true, selfie: true },
    initials: "NP",
    avatarColor: "orange",
  },
  {
    id: "kyc-2",
    name: "Tchangani Ibrahim",
    type: "Agent Coopérative",
    city: "Ngaoundéré",
    submittedAgo: "il y a 18h",
    slaBreach: true,
    docs: { rccm: true, id: true, selfie: false },
    initials: "TI",
    avatarColor: "green",
  },
  {
    id: "kyc-3",
    name: "Chemeli Food Ltd",
    type: "Acheteur · Kenya",
    city: "Nairobi",
    submittedAgo: "il y a 3h",
    docs: { corp: true, id: true },
    initials: "CF",
    avatarColor: "navy",
  },
];

export interface RagQuery {
  question: string;
  corridor: string;
  chunks: string;
  confidence: number;
  source: string;
  feedback: "up" | "down";
}

export const RAG_QUERIES: RagQuery[] = [
  {
    question: "Certificat d'origine pour huile de palme vers Gabon ?",
    corridor: "CMR → GAB",
    chunks: "5/5",
    confidence: 0.91,
    source: "Règl. CEMAC 01/19",
    feedback: "up",
  },
  {
    question: "Droits de douane gingembre vers Sénégal ZLECAf ?",
    corridor: "CMR → SEN",
    chunks: "4/5",
    confidence: 0.87,
    source: "JO CMR 15/01/2025",
    feedback: "up",
  },
  {
    question: "Documents phytosanitaires plantain Côte d'Ivoire ?",
    corridor: "CMR → CIV",
    chunks: "4/5",
    confidence: 0.83,
    source: "MINADER Circ. 2024",
    feedback: "up",
  },
  {
    question: "Délai GUCE pour déclaration export ?",
    corridor: "CMR général",
    chunks: "3/5",
    confidence: 0.79,
    source: "GUCE Procédures 2025",
    feedback: "down",
  },
];

// 30 daily values per corridor for the overview chart, in FCFA.
function makeSeries(seed: number, base: number, slope: number): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < 30; i++) {
    s = (s * 9301 + 49297) % 233280;
    const noise = (s / 233280 - 0.5) * 0.35;
    out.push(Math.round(base + slope * i + base * noise));
  }
  return out;
}

export const CHART_SERIES = {
  "CMR-CIV": makeSeries(11, 700_000, 35_000),
  "CMR-SEN": makeSeries(7, 380_000, 9_000),
  "CMR-GAB": makeSeries(23, 540_000, 22_000),
};

// ─── FRAUDE ──────────────────────────────────────────────────────────────────

export interface FraudAlert {
  id: string;
  txId: string;
  risk: number;
  model: string;
  pattern: string;
  detail: string;
  flaggedAt: string;
  breakdown: { dim: string; score: number; reason: string }[];
  similar: { id: string; date: string; amount: number; buyer: string; sharedPattern: string }[];
}

export const FRAUD_ALERTS: FraudAlert[] = [
  {
    id: "FR-2026-0091",
    txId: "TF-2024-0091",
    risk: 78,
    model: "Isolation Forest (v3 · Avril 2026)",
    pattern: "Cluster de dépôts rapides depuis comptes vendeurs nouvellement créés",
    detail:
      "5 transactions vers le même acheteur ivoirien sur 48 h, depuis 5 PME inscrites dans la semaine. Montants régulièrement sous le seuil de vigilance.",
    flaggedAt: "10 mai 2026 · 13h46",
    breakdown: [
      { dim: "Risque acheteur", score: 62, reason: "Acheteur récent — 3 tx, dont 1 contestée" },
      { dim: "Risque produit", score: 38, reason: "Plantain séché — peu de fraudes historiques" },
      { dim: "Risque corridor", score: 71, reason: "CMR → CIV — taux de litige 8% sur 30j" },
      { dim: "Risque devise", score: 22, reason: "PAPSS FCFA stable" },
      { dim: "Risque timing", score: 88, reason: "5 dépôts en 48 h depuis comptes < 7 jours" },
    ],
    similar: [
      { id: "TF-2024-0089", date: "09 mai · 22h14", amount: 480_000, buyer: "Abi Food CI", sharedPattern: "Même acheteur, vendeur < 7j" },
      { id: "TF-2024-0090", date: "10 mai · 03h12", amount: 495_000, buyer: "Abi Food CI", sharedPattern: "Sous-seuil, vendeur < 7j" },
      { id: "TF-2024-0091", date: "10 mai · 13h46", amount: 510_000, buyer: "Abi Food CI", sharedPattern: "Sous-seuil, vendeur < 7j" },
    ],
  },
];

// Distribution risk scores 30j (10 buckets)
export const FRAUD_HISTOGRAM = [
  { range: "0-10", count: 78, tone: "success" as const },
  { range: "10-20", count: 64, tone: "success" as const },
  { range: "20-30", count: 41, tone: "success" as const },
  { range: "30-40", count: 28, tone: "warning" as const },
  { range: "40-50", count: 17, tone: "warning" as const },
  { range: "50-60", count: 11, tone: "warning" as const },
  { range: "60-70", count: 5, tone: "danger" as const },
  { range: "70-80", count: 2, tone: "danger" as const },
  { range: "80-90", count: 1, tone: "danger" as const },
  { range: "90-100", count: 0, tone: "danger" as const },
];

// ─── METRICS ─────────────────────────────────────────────────────────────────

export const FUNNEL = [
  { step: "Visites uniques", value: 2_412, kind: "neutral" as const },
  { step: "Inscriptions", value: 312, kind: "neutral" as const },
  { step: "KYC complétés", value: 218, kind: "navy" as const },
  { step: "Première recherche", value: 167, kind: "navy" as const },
  { step: "Première tx escrow", value: 47, kind: "success" as const },
];

// Retention par cohorte (% gardés après N mois)
export const COHORTS = [
  { cohort: "Déc 2025", size: 12, retention: [100, 92, 83, 75, 67, 58] },
  { cohort: "Jan 2026", size: 18, retention: [100, 89, 78, 72, 67, null] },
  { cohort: "Fév 2026", size: 24, retention: [100, 88, 79, 71, null, null] },
  { cohort: "Mar 2026", size: 31, retention: [100, 87, 77, null, null, null] },
  { cohort: "Avr 2026", size: 42, retention: [100, 86, null, null, null, null] },
  { cohort: "Mai 2026", size: 47, retention: [100, null, null, null, null, null] },
];

// MRR sur 6 mois (FCFA)
export const MRR_HISTORY = [
  { month: "Déc", value: 280_000 },
  { month: "Jan", value: 410_000 },
  { month: "Fév", value: 720_000 },
  { month: "Mar", value: 1_280_000 },
  { month: "Avr", value: 2_290_000 },
  { month: "Mai", value: 2_840_000 },
];

export const NPS = {
  score: 64,
  promoters: 71,
  passives: 22,
  detractors: 7,
  total: 142,
};

// ─── USERS ───────────────────────────────────────────────────────────────────

export type UserRole = "pme" | "buyer" | "agent" | "admin";

export interface UserRow {
  id: string;
  name: string;
  role: UserRole;
  city: string;
  country: string;
  sector?: string;
  trust: number;
  txClosed: number;
  joinedAt: string;
  lastActive: string;
  status: "actif" | "kyc_pending" | "suspended";
  initials: string;
}

// Helper to generate consistent mock users.
function u(
  id: string,
  name: string,
  role: UserRole,
  city: string,
  country: string,
  trust: number,
  txClosed: number,
  joinedAt: string,
  lastActive: string,
  sector?: string,
  status: UserRow["status"] = "actif"
): UserRow {
  const parts = name.split(/\s+/);
  const initials = (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
  return { id, name, role, city, country, sector, trust, txClosed, joinedAt, lastActive, status, initials };
}

export const USERS: UserRow[] = [
  // PME (top 8)
  u("u-001", "Jean-Paul Mboumba", "pme", "Bafoussam", "Cameroun", 82, 14, "2026-01-08", "il y a 12 min", "Agro-transformation"),
  u("u-002", "Hawa Oumarou", "pme", "Adamawa", "Cameroun", 76, 9, "2026-02-14", "il y a 1 h", "Gingembre bio"),
  u("u-003", "Albert Biya", "pme", "Douala", "Cameroun", 94, 22, "2025-12-02", "il y a 2 h", "Huile de palme"),
  u("u-004", "Nkemdirim Pauline", "pme", "Yaoundé", "Cameroun", 0, 0, "2026-05-10", "il y a 2 h", "Plantain & dérivés", "kyc_pending"),
  u("u-005", "Coop. Mungo", "pme", "Mungo", "Cameroun", 51, 3, "2026-04-20", "hier", "Plantain"),
  u("u-006", "GIC Bafang", "pme", "Bafang", "Cameroun", 0, 0, "2026-05-09", "il y a 4 h", "Gingembre", "kyc_pending"),
  u("u-007", "Mbarga Solange", "pme", "Douala", "Cameroun", 67, 6, "2026-03-12", "hier", "Cacao"),
  u("u-008", "Eyenga Désiré", "pme", "Bafia", "Cameroun", 58, 4, "2026-03-28", "il y a 3 j", "Manioc"),
  // Acheteurs
  u("b-001", "Kouadio Marc", "buyer", "Abidjan", "Côte d'Ivoire", 71, 8, "2026-01-22", "il y a 15 min", "Distribution agro"),
  u("b-002", "Fatou Diallo", "buyer", "Dakar", "Sénégal", 88, 11, "2025-11-18", "il y a 30 min", "HoReCa"),
  u("b-003", "Pierre Ondo", "buyer", "Libreville", "Gabon", 79, 7, "2026-02-04", "il y a 3 h", "Distribution agro"),
  u("b-004", "Abi Food CI", "buyer", "Bouaké", "Côte d'Ivoire", 64, 4, "2026-03-30", "il y a 6 h", "Industrie alim."),
  u("b-005", "Dakar Naturel", "buyer", "Dakar", "Sénégal", 81, 5, "2026-02-19", "hier", "Cosmétiques"),
  u("b-006", "Chemeli Food Ltd", "buyer", "Nairobi", "Kenya", 0, 0, "2026-05-10", "il y a 3 h", "Distribution", "kyc_pending"),
  // Agents Coop
  u("a-001", "Tchangani Ibrahim", "agent", "Ngaoundéré", "Cameroun", 0, 0, "2026-05-09", "il y a 18 h", "Coopérative · 42 PME", "kyc_pending"),
  u("a-002", "Patrice Ondoa", "agent", "Yaoundé", "Cameroun", 89, 38, "2026-01-10", "il y a 1 h", "Coopérative · 28 PME"),
  // Admin LA RUCHE
  u("ad-001", "Sarah Fombang", "admin", "Yaoundé", "Cameroun", 100, 0, "2025-10-01", "actuellement", "LA RUCHE"),
  u("ad-002", "Patrice Mvondo", "admin", "Douala", "Cameroun", 100, 0, "2025-10-01", "il y a 4 h", "LA RUCHE"),
];

export const USER_COUNTS = {
  pme: USERS.filter((u) => u.role === "pme").length,
  buyer: USERS.filter((u) => u.role === "buyer").length,
  agent: USERS.filter((u) => u.role === "agent").length,
  admin: USERS.filter((u) => u.role === "admin").length,
  totalPme: 47,
  totalBuyer: 32,
  totalAgent: 8,
  totalAdmin: 5,
};
