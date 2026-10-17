import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Building2, Truck, FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CatalogueView } from "@/components/CatalogueView";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Catalogue BTP, Matériaux & Terrains Titrés | SCI GLORIA INVESTMENT & CO",
  description:
    "Consultez l'ensemble de notre catalogue officiel à Abidjan : briques creuses et pleines certifiées, parcelles avec ACD, villas clés en main, carrelage grès cérame et outillage BTP.",
};

export default function CataloguePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* En-tête majestueux de la page Catalogue */}
        <section className="bg-brand-blue text-white relative overflow-hidden">
          {/* Liseré architectural et dégradé subtil */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-[#071322] opacity-90" />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            {/* Fil d'Ariane */}
            <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
              <Link href="/" className="hover:text-brand-gold transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Catalogue officiel</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="block w-12 h-px bg-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Catalogue Général des Matériaux & Biens Immobiliers
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] max-w-4xl mb-6">
              Tous nos articles, matériaux certifiés & opportunités foncières.
            </h1>

            <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed mb-10">
              Retrouvez l&apos;intégralité de nos stocks en magasin à Marcory et nos productions industrielles de briques. Prix transparents en FCFA, devis estimatif gratuit et commande directe sur WhatsApp.
            </p>

            {/* 3 Piliers de Réassurance client */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-4xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs text-slate-200">
                  Résistance briques certifiée &amp; ACD notariés
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs text-slate-200">
                  Livraison camion grue sur chantier à Abidjan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="text-xs text-slate-200">
                  Devis officiel &amp; proforma sous 24h
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Vue catalogue complète avec Sidebar de filtres multi-critères et tri */}
        <CatalogueView />

        {/* Outil interactif : Estimation de cubage et briques */}
        <MaterialCalculator />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
