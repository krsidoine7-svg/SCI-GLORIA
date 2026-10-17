import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PriceTag } from "@/components/PriceTag";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { TechnicalSpecsTabs } from "@/components/TechnicalSpecsTabs";
import { initialProducts } from "@/data/products";
import { companyData } from "@/data/company";

type Params = { slug: string };

const categoryLabels = {
  construction: "Construction & briques",
  immobilier: "Gestion immobilière",
  materiaux: "Matériaux & outillage",
} as const;

const stockLabels = {
  in_stock: "En stock",
  low_stock: "Stock limité",
  on_order: "Sur commande",
} as const;

export function generateStaticParams(): Params[] {
  return initialProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Article introuvable | SCI GLORIA" };
  return {
    title: `${product.name} | SCI GLORIA INVESTMENT & CO`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = initialProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* En-tête de la fiche */}
        <section className="bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 md:pb-20">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au catalogue
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-px bg-brand-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">
                {categoryLabels[product.category]} · {product.subCategory}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] max-w-4xl">
              {product.name}
            </h1>
            {product.badge && (
              <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-brand-gold/40 px-3.5 py-1.5 rounded-xl shadow-xs">
                {product.certifiedBadge && (
                  <img
                    src="/images/badge-certifie-gold.png"
                    alt="Certification SCI GLORIA"
                    className="w-5 h-5 object-contain"
                  />
                )}
                <span className="text-sm font-semibold text-brand-gold">{product.badge}</span>
                {product.certifiedBadge && (
                  <span className="text-xs text-white/70 pl-2 border-l border-white/20">
                    Garantie & Conformité SCI GLORIA
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Corps de la fiche */}
        <section className="py-14 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Description et caractéristiques */}
            <div className="lg:col-span-7">
              {/* Galerie photos interactive HD */}
              <ProductGallery images={product.images} name={product.name} productId={product.id} />

              <h2 className="text-xl font-semibold text-brand-blue mb-4">Description</h2>
              <p className="text-base text-brand-muted leading-relaxed mb-6">{product.fullDescription}</p>

              {/* Raccourci vers les spécifications complètes */}
              <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                  <span className="text-xs sm:text-sm font-medium text-brand-blue">
                    Fiche technique homologuée & contrôles de résistance disponibles ci-dessous
                  </span>
                </div>
                <a
                  href="#specifications-homologuees"
                  className="text-xs font-bold text-brand-blue hover:text-brand-gold underline underline-offset-4 flex-shrink-0"
                >
                  Voir les spécifications
                </a>
              </div>
            </div>

            {/* Encart prix et actions */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 border border-brand-border rounded-3xl p-7 sm:p-9 bg-brand-surface">
                <PriceTag product={product} />

                <div className="mt-6 pt-6 border-t border-brand-border flex items-center gap-3 text-sm text-brand-blue">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.stockStatus === "in_stock"
                        ? "bg-emerald-500"
                        : product.stockStatus === "low_stock"
                        ? "bg-amber-500"
                        : "bg-slate-400"
                    }`}
                  />
                  {stockLabels[product.stockStatus]}
                </div>

                <div className="mt-8">
                  <ProductActions product={product} />
                </div>

                <p className="mt-8 flex items-start gap-3 text-xs text-brand-muted leading-relaxed">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>
                    {companyData.locationDetails}. Retrait au magasin ou livraison sur chantier, à confirmer sur
                    WhatsApp.
                  </span>
                </p>
              </div>
            </aside>
          </div>

          {/* Section Fiche Technique Homologuée avec Onglets en Pleine Largeur */}
          <div id="specifications-homologuees" className="max-w-7xl mx-auto scroll-mt-24">
            <TechnicalSpecsTabs product={product} />
          </div>
        </section>

        {/* Articles du même pôle */}
        {related.length > 0 && (
          <section className="py-14 md:py-20 px-4 sm:px-6 bg-brand-surface">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-brand-blue mb-8">Dans le même pôle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
