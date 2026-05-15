import Link from "next/link";
import { Brand } from "@/components/ui/brand";

export function LandingFooter() {
  return (
    <footer id="contact" className="bg-[#0A2342] text-white/60 pt-16 pb-8 text-sm">
      <div className="container-tf">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-10 md:gap-14 mb-14">
          <div>
            <Link href="/" aria-label="TradeFlow Africa" className="inline-flex mb-4">
              <Brand height={40} pill />
            </Link>
            <p className="text-white/55 leading-relaxed max-w-xs">
              L'Infrastructure Numérique Publique du commerce transfrontalier africain.
              Yaoundé · Douala · Bafoussam.
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.12em] mb-4">
              Produit
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li><a href="#solution" className="text-white/75 hover:text-white">Modules</a></li>
              <li><a href="#corridors" className="text-white/75 hover:text-white">Corridors</a></li>
              <li><Link href="/buyers" className="text-white/75 hover:text-white">Espace acheteurs</Link></li>
              <li><a href="#cta" className="text-white/75 hover:text-white">Tarifs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.12em] mb-4">
              Institutions
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/institutional" className="text-white/75 hover:text-white">Dashboard B2G</Link></li>
              <li><Link href="/institutional/reports" className="text-white/75 hover:text-white">Rapports ZLECAf</Link></li>
              <li><a href="#" className="text-white/75 hover:text-white">Conformité Loi 2024/017</a></li>
              <li><a href="#" className="text-white/75 hover:text-white">Presse</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.12em] mb-4">
              Contact
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li><a href="mailto:contact@tradeflow-africa.cm" className="text-white/75 hover:text-white">contact@tradeflow-africa.cm</a></li>
              <li><a href="tel:+237699123456" className="text-white/75 hover:text-white">+237 6 99 12 34 56</a></li>
              <li><a href="#" className="text-white/75 hover:text-white">WhatsApp Business</a></li>
              <li><Link href="/admin" className="text-white/45 hover:text-white">Admin LA RUCHE</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-4 text-xs text-white/45">
          <span>© 2026 TradeFlow Africa SAS · RCCM Yaoundé · Conforme Loi 2024/017 sur la protection des données personnelles</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
