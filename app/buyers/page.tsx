import Image from "next/image";
import { ArrowRight, ShieldCheck, Lock, FileText, Search, MessageSquare, CreditCard, PackageCheck } from "lucide-react";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

export default function BuyersPage() {
  return (
    <main>
      <LandingHeader />

      {/* HERO */}
      <section className="relative -mt-[72px] pt-[72px] overflow-hidden text-white">
        <Image
          src="/images/farmer-portrait.jpg"
          alt="Producteur africain"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 25%, rgba(232,119,34,0.18), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(46,109,164,0.30), transparent 60%), linear-gradient(180deg, rgba(14,46,85,0.92) 0%, rgba(10,35,66,0.96) 100%)",
          }}
        />
        <div className="container-tf relative">
          <div className="py-16 lg:py-24 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 border border-orange-300/35">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
              Espace acheteurs · CIV · SEN · GAB
            </span>
            <h1 className="text-[40px] sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mt-6 mb-5 text-balance">
              Accédez aux meilleurs fournisseurs <span className="text-orange-300">d'Afrique centrale.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl mb-8">
              Vérifiés. Certifiés. Sécurisés par escrow PAPSS. Aucune devise tierce, aucun risque
              de non-paiement, des fournisseurs camerounais sélectionnés à la main.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#inscription"
                className="inline-flex items-center gap-2 px-6 rounded-md bg-orange text-white font-semibold text-[15px] hover:bg-orange-700"
                style={{ height: 52 }}
              >
                Trouver un fournisseur
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center px-6 rounded-md border border-white/45 text-white font-semibold text-[15px] hover:bg-white/10"
                style={{ height: 52 }}
              >
                Voir le catalogue
              </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
              <Stat n="200" l="fournisseurs vérifiés" />
              <Stat n="3" l="corridors actifs" />
              <Stat n="100%" l="escrow PAPSS sécurisé" />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="catalogue" className="py-20 lg:py-24">
        <div className="container-tf">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Catalogue</span>
            <h2 className="text-3xl lg:text-[40px] font-semibold leading-tight tracking-tight mt-3 mb-4 text-balance">
              Produits disponibles à l'export.
            </h2>
            <p className="text-lg text-ink-700 leading-relaxed">
              Trois familles de produits agro-transformés, prêtes à l'expédition,
              avec fournisseurs vérifiés KYC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { image: "/images/plantain-bunch.jpg", title: "Plantain séché", count: 12, range: "2 700 – 3 500 FCFA/kg", avail: "Disponibilité immédiate" },
              { image: "/images/ginger-fresh.jpg", title: "Gingembre bio", count: 5, range: "4 200 – 5 200 FCFA/kg", avail: "Stock disponible" },
              { image: "/images/palm-fruit.jpg", title: "Huile de palme raffinée", count: 8, range: "900 – 1 400 FCFA/L", avail: "Export régulier" },
            ].map((p, i) => (
              <article
                key={i}
                className="bg-white border border-black/[0.08] rounded-xl overflow-hidden flex flex-col hover:shadow-lift transition-shadow group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-semibold bg-white/95 text-navy backdrop-blur-sm">
                      {p.count} fournisseurs
                    </span>
                  </div>
                </div>
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <div className="border-t border-black/[0.08] pt-4 grid gap-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ink-500">Fourchette de prix</span>
                      <b className="tabular text-ink-900">{p.range}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-500">Disponibilité</span>
                      <span className="text-success-700 font-semibold">{p.avail}</span>
                    </div>
                  </div>
                  <button className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-md bg-navy text-white font-semibold text-sm hover:bg-navy-500">
                    Voir fournisseurs
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ACHETER EN SÉCURITÉ */}
      <section className="py-20 lg:py-24 border-y border-black/[0.08] bg-surface">
        <div className="container-tf">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow">Comment acheter en sécurité</span>
            <h2 className="text-3xl lg:text-[40px] font-semibold leading-tight tracking-tight mt-3 mb-4 text-balance">
              4 étapes. 0 risque.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            <div className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-black/[0.08]" />
            {[
              { n: 1, icon: Search, title: "Rechercher", body: "Trouvez le bon produit et le bon fournisseur grâce à notre moteur IA." },
              { n: 2, icon: MessageSquare, title: "Contacter", body: "Discutez directement avec le fournisseur vérifié — KYC complet." },
              { n: 3, icon: CreditCard, title: "Escrow", body: "Déposez le paiement via Orange Money — 100% sécurisé via PAPSS." },
              { n: 4, icon: PackageCheck, title: "Recevoir", body: "Confirmez la livraison — les fonds sont libérés automatiquement." },
            ].map((s) => (
              <div key={s.n} className="relative z-10 lg:pr-2 bg-surface">
                <div className="w-12 h-12 rounded-full bg-orange text-white grid place-items-center mb-6 border-4 border-surface">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400 mb-1 tabular">
                  Étape {s.n}
                </div>
                <h4 className="text-[17px] font-semibold mb-1.5 tracking-tight">{s.title}</h4>
                <p className="text-sm text-ink-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI TRADEFLOW */}
      <section className="py-20 lg:py-24">
        <div className="container-tf">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow">Pourquoi TradeFlow</span>
            <h2 className="text-3xl lg:text-[40px] font-semibold leading-tight tracking-tight mt-3 mb-4 text-balance">
              Conçu pour vous protéger à chaque étape.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Fournisseurs KYC vérifiés",
                body: "Chaque fournisseur est vérifié par l'équipe LA RUCHE : RCCM officiel, pièce d'identité du dirigeant, justificatif d'activité. Pas d'inconnus.",
              },
              {
                icon: Lock,
                title: "Escrow PAPSS — zéro risque",
                body: "Votre argent est protégé par une banque agréée (Ecobank ou UBA) jusqu'à confirmation de la livraison. Libération sous 48 h en cas de litige.",
              },
              {
                icon: FileText,
                title: "Guide douanier intégré",
                body: "Toutes les procédures d'importation sont sourcées des Journaux Officiels et codes douaniers ZLECAf. L'IA cite les textes — elle ne devine pas.",
              },
            ].map((b, i) => (
              <div key={i} className="bg-white border border-black/[0.08] rounded-xl p-7">
                <div className="w-11 h-11 grid place-items-center rounded-md bg-navy-100 text-navy mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-semibold tracking-tight mb-2">{b.title}</h3>
                <p className="text-sm text-ink-700 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE INSCRIPTION */}
      <section id="inscription" className="py-20 lg:py-24 bg-[#0E2E55] text-white">
        <div className="container-tf max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 border border-orange-300/35 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />
              Accès gratuit
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight mb-4">
              Accédez au catalogue complet gratuitement.
            </h2>
            <p className="text-white/75 text-lg">
              Validation sous 24 h. Aucune carte de crédit requise.
            </p>
          </div>

          <form className="bg-white text-ink-900 rounded-xl p-6 lg:p-8 grid gap-4 shadow-lift">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Nom de l'entreprise" required>
                <input
                  required
                  type="text"
                  placeholder="Abi Food CI SARL"
                  className="w-full h-11 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-orange"
                />
              </FormField>
              <FormField label="Pays" required>
                <select
                  required
                  className="w-full h-11 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-orange"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez un pays
                  </option>
                  <option>Côte d'Ivoire</option>
                  <option>Sénégal</option>
                  <option>Gabon</option>
                  <option>Ghana</option>
                  <option>Nigeria</option>
                  <option>Autre — Afrique</option>
                </select>
              </FormField>
              <FormField label="Secteur d'activité" required>
                <select
                  required
                  className="w-full h-11 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-orange"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez un secteur
                  </option>
                  <option>Distribution agro-alimentaire</option>
                  <option>Restauration / HoReCa</option>
                  <option>Industrie cosmétique</option>
                  <option>Industrie pharmaceutique</option>
                  <option>Autre</option>
                </select>
              </FormField>
              <FormField label="Email professionnel" required>
                <input
                  required
                  type="email"
                  placeholder="achats@entreprise.ci"
                  className="w-full h-11 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-orange"
                />
              </FormField>
              <FormField label="Téléphone WhatsApp" required>
                <input
                  required
                  type="tel"
                  placeholder="+225 XX XX XX XX"
                  className="w-full h-11 px-3 rounded-md border border-black/[0.08] bg-white text-sm outline-none focus:ring-2 focus:ring-orange md:col-span-2"
                />
              </FormField>
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-12 px-6 rounded-md bg-orange text-white font-semibold text-[15px] hover:bg-orange-700 inline-flex items-center justify-center gap-2"
            >
              Accéder au catalogue
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-ink-500 text-center">
              Accès gratuit. Aucune carte de crédit requise.
            </p>
          </form>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <span>
      <b className="text-white tabular">{n}</b> <span className="text-white/60">{l}</span>
    </span>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500 mb-1.5 block">
        {label} {required ? <span className="text-orange">*</span> : null}
      </span>
      {children}
    </label>
  );
}
