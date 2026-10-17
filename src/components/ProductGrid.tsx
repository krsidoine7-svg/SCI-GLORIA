"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { ServiceCategory } from "@/types";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Filter = "all" | ServiceCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tout le catalogue" },
  { id: "construction", label: "Briques & construction" },
  { id: "immobilier", label: "Terrains & immobilier" },
  { id: "materiaux", label: "Matériaux & outillage" },
];

interface ProductGridProps {
  isDedicatedPage?: boolean;
}

export function ProductGrid({ isDedicatedPage = false }: ProductGridProps = {}) {
  const [active, setActive] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrage combiné : par pôle d'activité ET par recherche textuelle multi-champs
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return initialProducts.filter((p) => {
      // 1. Filtre de catégorie
      const matchesCategory = active === "all" || p.category === active;
      if (!matchesCategory) return false;

      // 2. Filtre de recherche par mot-clé
      if (!q) return true;

      const nameMatch = p.name.toLowerCase().includes(q);
      const subCatMatch = p.subCategory.toLowerCase().includes(q);
      const descMatch = p.shortDescription.toLowerCase().includes(q);
      const badgeMatch = p.badge?.toLowerCase().includes(q) ?? false;
      const specMatch = p.specs.some(
        (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
      );

      return nameMatch || subCatMatch || descMatch || badgeMatch || specMatch;
    });
  }, [active, searchQuery]);

  // Si page dédiée /catalogue ou recherche active : affiche tous les résultats. Sur l'accueil : les 6 premiers.
  const displayedProducts = useMemo(() => {
    if (isDedicatedPage || searchQuery) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, 6);
  }, [filteredProducts, searchQuery, isDedicatedPage]);

  return (
    <section id="catalogue" className="py-20 md:py-28 px-4 sm:px-6 bg-brand-surface scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-12 h-px bg-brand-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
              Disponibilité &amp; transparence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-blue tracking-tight leading-[1.12] mb-5">
            Articles &amp; biens en vedette
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Fiches techniques certifiées, commande en ligne avec panier de devis et contact WhatsApp direct.
          </p>
        </div>

        {/* Barre de Recherche Instantanée & Filtres par pôle */}
        <div className="mb-10 space-y-4">
          {/* Champ de recherche instantanée */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une brique, carrelage, terrain, peinture, outillage..."
              className="w-full bg-white border border-brand-border rounded-2xl pl-12 pr-11 py-3.5 text-sm text-brand-blue placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 shadow-xs transition-all"
              aria-label="Rechercher dans le catalogue"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                title="Effacer la recherche"
                aria-label="Effacer la recherche"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-brand-blue rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtres par pôle */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtrer le catalogue">
            {filters.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                      : "bg-white text-brand-blue border-brand-border hover:border-brand-blue"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Résumé textuel si filtre ou recherche active */}
          {searchQuery && (
            <div className="flex items-center justify-between text-xs text-brand-muted pt-1">
              <span>
                {filteredProducts.length} résultat{filteredProducts.length > 1 ? "s" : ""} pour la recherche &ldquo;
                <strong className="text-brand-blue">{searchQuery}</strong>&rdquo;
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-brand-blue font-semibold hover:underline cursor-pointer"
              >
                Voir tout le catalogue
              </button>
            </div>
          )}
        </div>

        {/* Affichage des Produits : Défilement horizontal de gauche à droite sur mobile, Grille sur Desktop */}
        {filteredProducts.length > 0 ? (
          <>
            {/* Version Mobile : Carrousel horizontal tactile fluide (défilement de gauche à droite) */}
            <div className="md:hidden">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2.5 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <span>Glissez de gauche à droite</span>
                  <span className="text-brand-gold font-bold">→</span>
                </span>
                <span className="text-[11px] font-semibold text-brand-blue bg-white px-2 py-0.5 rounded-full border border-brand-border">
                  {displayedProducts.length} articles affichés
                </span>
              </div>

              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 -mx-4 px-4 scroll-smooth">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-[84vw] max-w-[340px] flex-shrink-0 snap-center"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Version Tablette & Desktop : Grille classique 2 à 3 colonnes */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Lien direct et épuré vers le catalogue complet */}
            {!isDedicatedPage && (
              <div className="mt-10 sm:mt-12 text-center flex items-center justify-center">
                <a
                  href="/catalogue"
                  className="text-base font-semibold text-brand-blue underline underline-offset-4 decoration-brand-gold decoration-2 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  Voir tout le catalogue
                </a>
              </div>
            )}
          </>
        ) : (
          /* État aucun résultat trouvé */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-brand-border">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-brand-blue mb-1">
              Aucun article ne correspond à votre recherche
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto mb-6">
              Vérifiez l&apos;orthographe ou essayez un mot plus général comme &ldquo;brique&rdquo;, &ldquo;carrelage&rdquo;, &ldquo;terrain&rdquo; ou &ldquo;peinture&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActive("all");
              }}
              className="inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-blue/90 transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Rappel des 3 régimes de prix */}
        <p className="mt-10 text-xs sm:text-sm text-brand-muted">
          Prix fixe affiché en FCFA · Prix sur demande selon le cours du jour · Devis gratuit sous 24h.
        </p>
      </div>
    </section>
  );
}
