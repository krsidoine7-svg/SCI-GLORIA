"use client";

import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  ChevronDown,
  Hammer,
  Home as HomeIcon,
  Building2,
} from "lucide-react";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { FavoritesButton } from "@/components/FavoritesButton";
import { CartButton } from "@/components/CartButton";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-border">
      {/* 1. Bandeau supérieur Réassurance & Contact (1 seule ligne épurée sur mobile) */}
      <div className="bg-brand-blue text-white py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-medium border-b border-brand-blueLight">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Adresse : courte sur mobile, détaillée sur desktop */}
          <div className="flex items-center gap-3 min-w-0">
            <a
              href={companyData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-brand-gold transition-colors text-[11px] sm:text-xs truncate"
              title="Ouvrir l'itinéraire sur Google Maps"
            >
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold flex-shrink-0" />
              <span className="sm:hidden font-medium">Marcory, Abidjan</span>
              <span className="hidden sm:inline">{companyData.address}</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>{companyData.hoursWeek} | {companyData.hoursSaturday}</span>
            </span>
          </div>

          {/* Téléphone : sur la même ligne à droite */}
          <a
            href={`tel:${companyData.phone}`}
            className="flex items-center gap-1.5 text-brand-gold hover:text-white transition-colors text-[11px] sm:text-xs font-semibold flex-shrink-0"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{companyData.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      {/* 2. Barre principale de navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo SCI GLORIA */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-brand-gold font-bold text-xl shadow-md border border-brand-blueLight transition-transform">
            SG
          </div>
          <div>
            <span className="font-bold text-lg text-brand-blue tracking-tight block leading-tight">
              SCI GLORIA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">
              Investment & Co
            </span>
          </div>
        </a>

        {/* Liens Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <a href="/" className="text-brand-blue hover:text-brand-gold transition-colors">
            Accueil
          </a>

          {/* Menu déroulant Services */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="flex items-center gap-1 text-brand-muted hover:text-brand-blue transition-colors py-2"
            >
              <span>Nos 3 Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-brand-border p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <a
                  href="/#services"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-surface transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Hammer className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-blue">1. Construction & Briques</div>
                    <div className="text-[11px] text-gray-500">Chantiers BTP et usine de briques</div>
                  </div>
                </a>

                <a
                  href="/#services"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-surface transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HomeIcon className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-blue">2. Gestion Immobilière</div>
                    <div className="text-[11px] text-gray-500">Terrains avec ACD, villas, gestion</div>
                  </div>
                </a>

                <a
                  href="/#services"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-brand-surface transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-blue">3. Vente de Matériaux</div>
                    <div className="text-[11px] text-gray-500">Outillage et finitions Marcory</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <a href="/#catalogue" className="hover:text-brand-blue transition-colors">
            Catalogue BTP
          </a>
          <a href="/#calculateur" className="hover:text-brand-blue transition-colors text-brand-gold font-semibold">
            Calculateur BTP
          </a>
          <a href="/a-propos" className="hover:text-brand-blue transition-colors">
            À propos
          </a>
          <a href="/contact" className="hover:text-brand-blue transition-colors">
            Contact & Localisation
          </a>
        </div>

        {/* Favoris + Panier de Devis + Hamburger Mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FavoritesButton />
          <CartButton />

          {/* Bouton Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-brand-blue hover:bg-brand-surface border border-brand-border transition-colors"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 3. Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-brand-gold px-2 block">
              Nos 3 Pôles d'Activités
            </span>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-surface text-sm font-semibold text-brand-blue"
            >
              <Hammer className="w-4 h-4 text-brand-blue" />
              <span>1. Construction & Briques</span>
            </a>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-surface text-sm font-semibold text-brand-blue"
            >
              <HomeIcon className="w-4 h-4 text-brand-gold" />
              <span>2. Gestion Immobilière</span>
            </a>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-surface text-sm font-semibold text-brand-blue"
            >
              <Building2 className="w-4 h-4 text-brand-blue" />
              <span>3. Matériaux & Finitions</span>
            </a>
          </div>

          <div className="border-t border-brand-border pt-3 space-y-2">
            <FavoritesButton mobile />
            <CartButton mobile />
            <a
              href="/#catalogue"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 text-sm font-medium text-brand-blue hover:text-brand-gold"
            >
              Catalogue BTP & Fiches
            </a>
            <a
              href="/#calculateur"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 text-sm font-semibold text-brand-gold"
            >
              Calculateur de Matériaux BTP
            </a>
            <a
              href="/a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 text-sm font-medium text-brand-blue hover:text-brand-gold"
            >
              À propos
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 text-sm font-medium text-brand-blue hover:text-brand-gold"
            >
              Plan d'accès Marcory & Horaires
            </a>
          </div>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-whatsapp text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md hover:bg-emerald-600 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Échanger sur WhatsApp ({companyData.whatsappDisplay})</span>
          </a>
        </div>
      )}
    </header>
  );
}
