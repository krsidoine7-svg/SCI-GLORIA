import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
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

            {/* Réseau Social Officiel TikTok */}
            {companyData.tiktok && (
              <div className="pt-1">
                <a
                  href={companyData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/50 text-xs text-slate-200 transition-all group"
                  title="Suivez nos chantiers et réalisations sur TikTok"
                >
                  <div className="w-6 h-6 rounded-lg bg-black/70 flex items-center justify-center text-white group-hover:text-brand-gold transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">Rejoignez-nous sur TikTok</span>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors">{companyData.tiktokHandle}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-1" />
                </a>
              </div>
            )}
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
                  href="/catalogue"
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

              <div className="pt-1 border-t border-white/5 space-y-2">
                <div>
                  <a
                    href={`tel:${companyData.phone}`}
                    className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{companyData.whatsappDisplay}</span>
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${companyData.email}`}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-brand-gold transition-colors text-xs"
                    title="Envoyer un e-mail"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span className="truncate">{companyData.email}</span>
                  </a>
                </div>
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
                <span>Contactez-nous sur WhatsApp</span>
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
