import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07111E] text-white border-t border-brand-gold/30 selection:bg-brand-gold selection:text-brand-blue overflow-hidden">
      {/* Corps Principal du Footer : 4 Colonnes Structurées */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Colonne 1 : Identité de Marque & Statut Légal (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E2440] to-[#081525] border border-brand-gold/40 flex items-center justify-center shadow-lg">
                <span className="font-bold text-xl tracking-tight text-brand-gold">SG</span>
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white block leading-tight">
                  SCI GLORIA
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-brand-gold font-semibold block">
                  INVESTMENT & CO
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Partenaire BTP de référence à Abidjan pour la fourniture de matériaux certifiés, la fabrication de briques industrielles et la valorisation foncière sécurisée.
            </p>

            {/* Badge de certification institutionnelle */}
            <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-200">
              <img
                src="/images/badge-certifie-gold.png"
                alt="Certification BTP"
                className="w-4 h-4 object-contain"
              />
              <span className="text-[11px] font-medium text-slate-300">
                Société immatriculée au RCCM d'Abidjan
              </span>
            </div>
          </div>

          {/* Colonne 2 : Navigation dans les 3 Pôles (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
                Nos 3 Pôles d'Activités
              </h4>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/#services"
                  className="group flex items-center justify-between py-1 hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    01. BTP & Briques Industrielles
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="group flex items-center justify-between py-1 hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    02. Terrains Titrés ACD & Villas
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="group flex items-center justify-between py-1 hover:text-white transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    03. Carrelage, Sanitaire & Outillage
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalogue"
                  className="group flex items-center justify-between py-1 text-brand-gold/90 hover:text-brand-gold font-medium transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Catalogue & Prix en FCFA
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Localisation & Horaires Marcory (Col 8-9) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
                Siège & Magasin
              </h4>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <a
                href={companyData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-slate-300 hover:text-white transition-colors leading-relaxed"
                title="Ouvrir l'itinéraire Google Maps"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Marcory en bas du pont, près de la pharmacie Tiaco, Abidjan.
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-200">{companyData.hoursWeek}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{companyData.hoursSaturday}</p>
                </div>
              </div>

              <div className="pt-1 border-t border-white/5">
                <a
                  href={`tel:${companyData.phone}`}
                  className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{companyData.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 4 : Comptoir WhatsApp Direct (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
                Conseillers en Ligne
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
              <p className="text-xs text-slate-300 leading-relaxed">
                Sans paiement par carte en ligne : nos conseillers établissent vos devis officiels, bons de commande et organisent vos visites de chantiers directement par message.
              </p>

              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-whatsapp text-white font-medium text-xs py-3 px-4 rounded-xl shadow-md hover:bg-emerald-600 transition-all text-center group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Ouvrir WhatsApp Business</span>
              </a>

              <p className="text-[10px] text-center text-slate-400">
                Réponse moyenne sous 30 minutes pendant les heures ouvrées
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Barre Inférieure Institutionnelle & Mentions Légales */}
      <div className="border-t border-white/10 bg-black/40 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            © {currentYear} <span className="text-slate-200 font-medium">SCI GLORIA INVESTMENT & CO</span> — BTP, Immobilier & Matériaux. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-[11px]">
            <span className="text-slate-400">
              Droit OHADA & République de Côte d'Ivoire
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link
              href="/mentions-legales"
              className="text-slate-300 hover:text-brand-gold transition-colors"
            >
              Mentions Légales & Confidentialité
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link
              href="/contact"
              className="text-slate-300 hover:text-brand-gold transition-colors"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
