import Image from "next/image";
import {
  ArrowRight,
  Search,
  FileText,
  Shield,
  LayoutGrid,
  Info,
  Download,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { AfricaMap } from "@/components/ui/africa-map";
import { HeroDemo } from "@/components/landing/hero-demo";

export default function LandingPage() {
  return (
    <main>
      <LandingHeader />

      {/* HERO — Fullscreen satellite immersif */}
      <section
        className="relative -mt-[72px] overflow-hidden text-white"
        style={{ minHeight: "100svh" }}
      >
        {/* Photo satellite plein écran */}
        <Image
          src="/africa-satellite.png"
          alt="Afrique de l'Ouest et Centrale vue depuis l'espace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradient sombre à gauche pour lisibilité du texte */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,35,66,0.97) 0%, rgba(10,35,66,0.82) 38%, rgba(10,35,66,0.30) 62%, transparent 100%), linear-gradient(180deg, rgba(10,35,66,0.55) 0%, transparent 30%, transparent 70%, rgba(10,35,66,0.75) 100%)",
          }}
        />

        {/* Contenu par-dessus l'image */}
        <div className="relative z-10 container-tf">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center" style={{ minHeight: "100svh" }}>

            {/* Colonne gauche — texte */}
            <div className="pt-36 pb-16 lg:py-0">
              <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 border border-orange-300/35">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                Infrastructure Numérique Publique du commerce africain
              </span>
              <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.05] tracking-tight mt-6 mb-6 text-balance">
                Votre produit mérite{" "}
                <span className="text-orange-300">l'Afrique entière.</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-[520px] mb-9">
                TradeFlow Africa connecte les PME camerounaises aux acheteurs africains.
                Intelligence commerciale IA. Guide douanier officiel. Paiement sécurisé PAPSS.
              </p>
              <HeroDemo />
              <div className="flex flex-wrap items-center gap-4 mt-8 text-xs font-medium uppercase tracking-[0.06em] text-white/55">
                <span>Construit avec CCIMA</span>
                <span className="w-1 h-1 rounded-full bg-white/25" />
                <span>Conforme Loi 2024/017</span>
                <span className="w-1 h-1 rounded-full bg-white/25" />
                <span>PAPSS — Afreximbank</span>
              </div>
            </div>

            {/* Colonne droite — corridors SVG incrustés sur l'image, sans cadre */}
            <div className="hidden lg:flex items-center justify-end h-full">
              <AfricaMap variant="hero" className="w-[520px] max-w-[50vw]" />
            </div>

          </div>
        </div>

        {/* Indicateur scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.14em] font-semibold">
          <span>Défiler</span>
          <span className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* STAT BAND */}
      <section className="bg-[#0A2342] border-t border-white/10 text-white">
        <div className="container-tf">
          <div className="grid grid-cols-2 lg:grid-cols-4 py-9">
            {[
              { num: "15", unit: "%", label: "du commerce africain est intra-africain — le potentiel est immense" },
              { num: "206", unit: "Mds $", label: "volume potentiel ZLECAf à horizon 2035" },
              { num: "450", unit: "Mds $", label: "marché africain agro & manufacturé d'ici 2030" },
              { num: "3 252", unit: "Mds FCFA", label: "PIB agricole CEMAC adressable par TradeFlow" },
            ].map((s, i) => (
              <div
                key={i}
                className={`px-4 sm:px-6 py-2 ${
                  i > 0 ? "lg:border-l border-white/10" : ""
                } ${i === 2 ? "lg:border-t-0 border-t border-white/10 pt-6 lg:pt-2" : ""} ${
                  i === 3 ? "lg:border-t-0 border-t border-white/10 pt-6 lg:pt-2" : ""
                }`}
              >
                <div className="text-3xl lg:text-4xl font-bold tabular leading-tight tracking-tight">
                  {s.num}
                  <span className="text-orange-300 ml-1 font-semibold">{s.unit}</span>
                </div>
                <div className="mt-2 text-xs font-medium text-white/60 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section id="probleme" className="py-24 lg:py-28">
        <div className="container-tf">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">Le problème</span>
            <h2 className="text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mt-3 mb-5 text-balance">
              L'argent africain quitte l'Afrique.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              Même produit. Même qualité. Pas d'infrastructure numérique. La Côte d'Ivoire achète
              au Maroc ce qu'elle pourrait acheter au Cameroun pour mille fois moins.
            </p>
          </div>

          {/* Paradoxe */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] border border-black/[0.08] rounded-xl overflow-hidden mb-14">
            <div className="p-12 bg-surface">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400 mb-4">
                Côte d'Ivoire ← Maroc · 2024
              </div>
              <div className="text-[56px] font-bold leading-none tracking-tight tabular text-ink-900 mb-3">
                32 Mds <span className="text-[28px] text-ink-500">FCFA</span>
              </div>
              <p className="text-ink-700 leading-relaxed">
                Importations annuelles de plantain séché et dérivés. Frais portuaires, devise
                tierce, intermédiaires multiples.
              </p>
            </div>
            <div
              className="grid place-items-center lg:w-14 lg:border-x border-y lg:border-y-0 border-black/[0.08] bg-white text-ink-400 text-[11px] font-bold tracking-[0.16em] py-3 lg:py-0"
            >
              VS
            </div>
            <div className="p-12 bg-white">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400 mb-4">
                Côte d'Ivoire ← Cameroun · 2024
              </div>
              <div className="text-[56px] font-bold leading-none tracking-tight tabular text-danger-500 mb-3">
                9,55 M <span className="text-[28px] text-ink-500">FCFA</span>
              </div>
              <p className="text-ink-700 leading-relaxed">
                Sur le même produit. Pas par manque de demande. Par manque d'infrastructure
                numérique entre voisins.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Information manquante",
                body: "Les PME camerounaises ignorent qui achète quoi, à quel prix, dans quel pays voisin.",
              },
              {
                title: "Douanes incompréhensibles",
                body: "Procédures fragmentées entre CEMAC, CEDEAO, ZLECAf. Une erreur de document = amende ou blocage.",
              },
              {
                title: "Paiement impossible",
                body: "Sans escrow ni rails interbancaires africains, l'acheteur paie par virement euro/dollar — ou pas du tout.",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-7 bg-white border border-black/[0.08] rounded-xl"
              >
                <div className="w-9 h-9 grid place-items-center rounded-md bg-danger-100 text-danger-700 mb-4">
                  <Info className="w-5 h-5" />
                </div>
                <h4 className="text-[17px] font-semibold mb-1.5">{b.title}</h4>
                <p className="text-sm text-ink-700 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION ÉDITORIALE — Break photographique Loro Piana style */}
      <section className="relative">
        <div className="relative aspect-[16/7] md:aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/market.jpg"
            alt="Marché ouest-africain"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2E55]/85 via-[#0E2E55]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-tf">
              <div className="max-w-xl text-white">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 mb-4">
                  Le terrain. Les vrais.
                </span>
                <p className="text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-[1.15] tracking-tight text-balance">
                  « Mon plantain a déjà voyagé jusqu'au Maroc. Il n'avait jamais traversé la frontière voisine. »
                </p>
                <div className="mt-6 text-sm text-white/70">
                  Jean-Paul Mboumba — GIC Agro-Bafoussam, Cameroun
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section
        id="solution"
        className="py-24 lg:py-28 border-y border-black/[0.08] bg-surface"
      >
        <div className="container-tf">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">La solution</span>
            <h2 className="text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mt-3 mb-5 text-balance">
              4 modules. 1 infrastructure. 0 intermédiaire.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              TradeFlow Africa industrialise le bout-en-bout : trouver l'acheteur, comprendre la
              douane, sécuriser le paiement, suivre la transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-black/[0.08] rounded-xl overflow-hidden bg-black/[0.08] gap-px">
            {[
              {
                num: "01",
                title: "Market Intelligence IA",
                icon: Search,
                desc: "Moteur prédictif sur ITC TradeMap, Afreximbank et UN Comtrade. Score d'opportunité 0–100 par paire produit-acheteur-corridor, mis à jour quotidiennement.",
                stat: "87/100",
                statLabel: "score moyen, calculé en moins de 5 minutes",
              },
              {
                num: "02",
                title: "Customs Navigator RAG",
                icon: FileText,
                desc: "Architecture Retrieval-Augmented Generation sur pgvector. Les Journaux Officiels CEMAC sont indexés. L'IA cite les textes officiels — elle ne devine pas la loi, elle la cite.",
                stat: "0,87",
                statLabel: "score de confiance moyen sur 247 questions/mois",
              },
              {
                num: "03",
                title: "TradeEscrow PAPSS",
                icon: Shield,
                desc: "Orange Money en last mile + banque agréée PAPSS (Ecobank, UBA) pour le règlement interbancaire. Zéro devise tierce. Zéro agrément BEAC requis.",
                stat: "48 h",
                statLabel: "libération escrow après livraison confirmée",
              },
              {
                num: "04",
                title: "Trade Dashboard",
                icon: LayoutGrid,
                desc: "Vision unifiée des opportunités, transactions, alertes et statuts douaniers. Notifications WhatsApp et SMS pour les zones à connectivité limitée.",
                stat: "1 vue",
                statLabel: "de la prospection au paiement reçu",
              },
            ].map((m) => (
              <div key={m.num} className="bg-white p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 grid place-items-center rounded-lg bg-navy-100 text-navy">
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.14em] text-ink-400 tabular">
                      {m.num} / MODULE
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-tight">{m.title}</h3>
                  </div>
                </div>
                <p className="text-[15px] text-ink-700 leading-relaxed flex-1">{m.desc}</p>
                <div className="pt-4 mt-2 border-t border-black/[0.08] flex items-center gap-3.5 text-sm text-ink-500">
                  <b className="text-navy text-[22px] font-bold tabular tracking-tight">{m.stat}</b>
                  <span>{m.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="py-24 lg:py-28">
        <div className="container-tf">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">Comment ça marche</span>
            <h2 className="text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mt-3 mb-5 text-balance">
              De la plantation au paiement, en 4 étapes.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              Conçu pour Jean-Paul à Bafoussam comme pour Kouadio Marc à Abidjan. Ouvert sur
              Android milieu de gamme, en pidgin et en français.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            <div className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-black/[0.08]" />
            {[
              { n: 1, title: "Inscription & KYC", body: "RCCM, pièce d'identité, selfie. Validation par l'équipe LA RUCHE.", meta: "~ 24 heures" },
              { n: 2, title: "Recherche acheteur", body: "Score IA par paire produit-corridor. Demande de cotation en un clic.", meta: "~ 5 minutes" },
              { n: 3, title: "Guide douanier", body: "Documents requis, droits, règles ZLECAf — sourcés du Journal Officiel.", meta: "Réponse instantanée" },
              { n: 4, title: "Escrow sécurisé", body: "Acheteur dépose. Vendeur livre. Paiement libéré. Sans devise tierce.", meta: "PAPSS · Orange Money" },
            ].map((s) => (
              <div key={s.n} className="relative z-10 lg:pr-2">
                <div className="w-12 h-12 rounded-full bg-navy text-white grid place-items-center font-bold text-base mb-6 border-4 border-white tabular">
                  {s.n}
                </div>
                <h4 className="text-[17px] font-semibold mb-1.5 tracking-tight">{s.title}</h4>
                <p className="text-sm text-ink-700 leading-relaxed mb-3">{s.body}</p>
                <div className="text-xs font-semibold text-navy tracking-wide tabular">{s.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREUVE — corridors */}
      <section
        id="corridors"
        className="py-24 lg:py-28 border-y border-black/[0.08] bg-surface"
      >
        <div className="container-tf">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">La preuve</span>
            <h2 className="text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mt-3 mb-5 text-balance">
              3 corridors. 3 opportunités réelles. Aujourd'hui.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              Pas de promesse. Des données mesurables, des prix vérifiables, des droits de douane
              connus. À activer dès maintenant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { pair: "CMR → CIV", product: "Plantain séché", image: "/images/plantain.jpg", score: 87, price: "3 100", priceUnit: "FCFA/kg", tariff: "0%", tariffNote: "ZLECAf", volume: "750 M", barColor: "#27AE60" },
              { pair: "CMR → SEN", product: "Gingembre bio", image: "/images/ginger.jpg", score: 73, price: "4 800", priceUnit: "FCFA/kg", tariff: "0%", tariffNote: "ZLECAf", volume: "320 M", barColor: "#E87722" },
              { pair: "CMR → GAB", product: "Huile de palme", image: "/images/palm-oil.jpg", score: 91, price: "1 200", priceUnit: "FCFA/L", tariff: "0%", tariffNote: "CEMAC", volume: "580 M", barColor: "#27AE60" },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white border border-black/[0.08] rounded-xl overflow-hidden flex flex-col group"
              >
                {/* Photo produit éditoriale */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                  <Image
                    src={c.image}
                    alt={c.product}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium bg-white/95 text-success-700 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                      Actif
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#0E2E55]/90 text-white backdrop-blur-sm">
                      {c.pair.split(" → ")[0]}
                      <span className="text-orange-300">→</span>
                      {c.pair.split(" → ")[1]}
                    </span>
                  </div>
                </div>
                <div className="px-5 pt-5 pb-2">
                  <h3 className="text-[22px] font-semibold tracking-tight mb-5">{c.product}</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-ink-400 font-semibold">Score opportunité</div>
                      <div className="text-[17px] font-semibold tabular mt-1 text-ink-900">
                        {c.score}<small className="text-ink-500 font-medium text-xs ml-1">/100</small>
                      </div>
                      <div className="h-2 bg-ink-100 rounded mt-2 overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${c.score}%`, background: c.barColor }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-ink-400 font-semibold">Prix moyen</div>
                      <div className="text-[17px] font-semibold tabular mt-1 text-ink-900">
                        {c.price}<small className="text-ink-500 font-medium text-xs ml-1">{c.priceUnit}</small>
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-ink-400 font-semibold">Droits douane</div>
                      <div className="text-[17px] font-semibold tabular mt-1 text-success-700">
                        {c.tariff}<small className="text-ink-500 font-medium text-xs ml-1">{c.tariffNote}</small>
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.08em] text-ink-400 font-semibold">Volume marché</div>
                      <div className="text-[17px] font-semibold tabular mt-1 text-ink-900">
                        {c.volume}<small className="text-ink-500 font-medium text-xs ml-1">FCFA</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto px-5 py-3.5 border-t border-black/[0.08] bg-white text-xs text-ink-400">
                  Source : ITC TradeMap + INS Cameroun · 2024
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYNERGIE ORANGE */}
      <section className="py-20 bg-surface border-y border-black/[0.08]">
        <div className="container-tf">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <span className="eyebrow text-orange-700">Synergie Orange</span>
              <h2 className="text-3xl lg:text-[32px] font-semibold leading-tight tracking-tight mt-3 mb-4 max-w-[480px]">
                Construit sur les rails Orange.
              </h2>
              <p className="text-lg text-ink-700 leading-relaxed max-w-[480px]">
                Chaque transaction génère du revenu Orange Money, du trafic SMS, et de la
                consommation data dans les zones rurales. Une infrastructure publique, financée
                par un opérateur privé.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.08] border border-black/[0.08] rounded-md overflow-hidden">
                {[
                  { b: "Orange", s: "Money" },
                  { b: "Orange", s: "SMS Pro" },
                  { b: "Orange", s: "Cloud" },
                  { b: "Orange", s: "Fab CMR" },
                ].map((o, i) => (
                  <div key={i} className="bg-white py-7 px-4 grid place-items-center text-center">
                    <div>
                      <b className="text-orange font-bold text-[15px]">{o.b}</b>
                      <small className="block text-[11px] text-ink-400 uppercase tracking-[0.06em] font-semibold mt-1">
                        {o.s}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[22px] leading-snug text-ink-900 font-medium border-l-[3px] border-orange pl-5 tracking-tight">
                « L'opérateur télécom devient l'épine dorsale du commerce intra-africain. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="py-24 lg:py-28">
        <div className="container-tf">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow">Pilote · 200 PME camerounaises</span>
            <h2 className="text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight mt-3 mb-5 text-balance">
              Le terrain en parle.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              Trois utilisateurs du programme pilote, sur les corridors CMR-CIV, CMR-SEN et CMR-GAB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "J'ai trouvé 5 acheteurs ivoiriens en 4 minutes. Avant TradeFlow, j'aurais payé un courtier 800 000 FCFA pour la même information.",
                initials: "JP",
                color: "bg-[#1B4D8E]",
                name: "Jean-Paul M.",
                role: "GIC Agro-Bafoussam · CMR → CIV",
              },
              {
                quote: "Le guide douanier m'a évité une amende de 480 000 FCFA. Il m'a montré la circulaire MINADER que je n'avais jamais lue.",
                initials: "HO",
                color: "bg-[#3B6D11]",
                name: "Hawa O.",
                role: "Coop. Femmes Adamawa · CMR → SEN",
              },
              {
                quote: "Mon escrow a été libéré 48 h après la livraison confirmée. Sans euro, sans dollar, directement en FCFA sur Orange Money.",
                initials: "AB",
                color: "bg-[#C95E0E]",
                name: "Albert B.",
                role: "Neo Processing Douala · CMR → GAB",
              },
            ].map((t, i) => (
              <article
                key={i}
                className="bg-white border border-black/[0.08] rounded-xl p-8 flex flex-col gap-6"
              >
                <p className="text-lg leading-snug text-ink-900 font-medium tracking-tight">
                  <span className="text-orange text-4xl font-serif leading-none mr-1 align-bottom">
                    “
                  </span>
                  {t.quote}
                </p>
                <div className="mt-auto pt-5 border-t border-black/[0.08] flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full grid place-items-center text-white font-bold text-[13px] tracking-wide ${t.color}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-ink-500">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-20">
        <div className="container-tf">
          <p className="text-center mb-8 tracking-[0.08em] uppercase font-semibold text-[11px] text-ink-400">
            Construit avec et pour les institutions africaines
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px border border-black/[0.08] rounded-xl overflow-hidden bg-black/[0.08]">
            {[
              { b: "CCIMA", s: "Cameroun" },
              { b: "GUCE", s: "Douanes" },
              { b: "Afreximbank", s: "PAPSS" },
              { b: "Orange", s: "Cameroun" },
              { b: "ZLECAf", s: "Secrétariat" },
            ].map((p, i) => (
              <div
                key={i}
                className={`bg-white py-6 px-4 grid place-items-center text-center font-bold text-[17px] text-ink-700 tracking-wide ${
                  i === 4 ? "hidden md:grid" : ""
                }`}
              >
                <div>
                  {p.b}
                  <small className="block text-[10px] text-ink-400 uppercase tracking-[0.1em] font-semibold mt-1">
                    {p.s}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        id="cta"
        className="relative text-white text-center py-24 lg:py-28 overflow-hidden"
      >
        {/* Photo de fond + gradient overlay */}
        <Image
          src="/images/farmer.jpg"
          alt="Producteur africain au champ"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(232,119,34,0.20), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(46,109,164,0.30), transparent 50%), linear-gradient(180deg, rgba(14,46,85,0.92) 0%, rgba(14,46,85,0.96) 100%)",
          }}
        />
        <div className="container-tf relative">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 border border-orange-300/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
            Pilote · Accès gratuit 3 mois
          </span>
          <h2 className="text-4xl lg:text-[52px] font-semibold leading-[1.1] tracking-tight mb-5 text-balance">
            Commencez à exporter vers l'Afrique
            <br />
            dès aujourd'hui.
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">
            Rejoignez les 200 PME camerounaises du programme pilote. Validation KYC en 24 h,
            premier corridor activé en 7 jours.
          </p>

          {/* Form: email + phone */}
          <form className="max-w-xl mx-auto bg-white/[0.05] backdrop-blur border border-white/10 rounded-xl p-5 sm:p-6 text-left mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                  Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="vous@entreprise.cm"
                  className="mt-1.5 w-full h-11 px-3 rounded-md bg-white/95 text-ink-900 text-sm placeholder:text-ink-400 outline-none focus:ring-2 focus:ring-orange"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                  Téléphone (WhatsApp)
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+237 6 XX XX XX XX"
                  className="mt-1.5 w-full h-11 px-3 rounded-md bg-white/95 text-ink-900 text-sm placeholder:text-ink-400 outline-none focus:ring-2 focus:ring-orange"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 w-full h-12 px-6 rounded-md bg-orange text-white font-semibold text-[15px] hover:bg-orange-700 inline-flex items-center justify-center gap-2"
            >
              Demander l'accès pilote
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[12px] text-white/55 mt-3 text-center">
              Réponse sous 24 h. Aucune carte de crédit requise.
            </p>
          </form>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#"
              className="inline-flex px-6 items-center gap-2 rounded-md bg-orange text-white font-semibold text-[15px] hover:bg-orange-700"
              style={{ height: 52 }}
            >
              Télécharger l'application
              <Download className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex px-6 items-center gap-2 rounded-md border border-white/45 text-white font-semibold text-[15px] hover:bg-white/10"
              style={{ height: 52 }}
            >
              Contacter l'équipe
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
