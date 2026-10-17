import { MessageCircle, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroSection } from "@/components/HeroSection";
import { StackingServices } from "@/components/StackingServices";
import { ProductGrid } from "@/components/ProductGrid";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full">
      {/* Composant Navbar modulaire (Top bar réassurance + Navigation Desktop & Mobile) */}
      <Navbar />

      <main className="flex-1 w-full max-w-full">
        {/* 1. Hero Section Haute Conversion & Compteurs Réassurance (MVP1-T04) */}
        <HeroSection />

        {/* 2. Catalogue BTP + Moteur des 3 regimes de prix (MVP1-T06) */}
        <ProductGrid />

        {/* 3. Simulateur & Calculateur de Matériaux BTP Briques & Carrelage */}
        <MaterialCalculator />

        {/* 4. Stacking Sections des 3 Univers de Services Fondateurs (MVP1-T05) */}
        <StackingServices />

        {/* 4. Contact & Localisation Marcory */}
        <section id="contact" className="bg-white border-t border-brand-border text-brand-blue scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="block w-12 h-px bg-brand-gold" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">Nous trouver</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-blue tracking-tight leading-[1.12] mb-5">
                Rendez-nous visite à Marcory.
              </h2>
              <p className="text-base text-brand-muted max-w-lg leading-relaxed">
                {companyData.locationDetails}. Notre équipe vous accueille du lundi au samedi pour préparer vos
                commandes et devis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:justify-end">
              <a
                href={companyData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white border border-brand-border text-brand-blue font-medium text-sm px-7 py-4 rounded-xl hover:border-brand-blue hover:bg-brand-surface transition-colors shadow-xs"
              >
                <MapPin className="w-4 h-4 text-brand-gold" />
                Itinéraire Google Maps
              </a>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-brand-whatsapp text-white font-medium text-sm px-7 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                {companyData.whatsappDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Composant Footer complet 4 colonnes */}
      <Footer />

      {/* Bouton Flottant WhatsApp persistant */}
      <FloatingWhatsApp />
    </div>
  );
}
