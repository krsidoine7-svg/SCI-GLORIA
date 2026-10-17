"use client";

import { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Check,
  Tag,
  ArrowUpDown,
  MessageCircle,
  X,
  ChevronDown,
  ShoppingBag,
  Filter,
} from "lucide-react";
import type { ServiceCategory, Product, PriceType } from "@/types";
import { initialProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

type SortOption = "featured" | "price_asc" | "price_desc" | "name_asc";
type StockFilter = "all" | "in_stock" | "on_order";
type PriceModeFilter = "all" | "fixed" | "quote";

interface CategoryOption {
  id: ServiceCategory;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "construction", label: "BTP & Briques Industrielles" },
  { id: "immobilier", label: "Terrains Titrés ACD & Villas" },
  { id: "materiaux", label: "Carrelage, Sanitaire & Outillage" },
];

const SUB_CATEGORIES = [
  "Briques",
  "Terrains",
  "Villas",
  "Carrelage",
  "Sanitaire",
  "Outillage",
  "Finitions",
  "Gros Œuvre",
];

export function CatalogueView() {
  // États de filtrage
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockFilter>("all");
  const [selectedPriceMode, setSelectedPriceMode] = useState<PriceModeFilter>("all");
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  // État du tiroir mobile
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Compteurs d'articles par pôle
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      construction: 0,
      immobilier: 0,
      materiaux: 0,
    };
    initialProducts.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Compteurs stock
  const stockCounts = useMemo(() => {
    let inStock = 0;
    let onOrder = 0;
    initialProducts.forEach((p) => {
      if (p.stockStatus === "in_stock") inStock++;
      else onOrder++;
    });
    return { inStock, onOrder };
  }, []);

  // Gestion des cases à cocher catégories
  const toggleCategory = (cat: ServiceCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Gestion des badges sous-catégories
  const toggleSubCategory = (sub: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Réinitialisation de tous les filtres
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStock("all");
    setSelectedPriceMode("all");
    setSelectedSubCategories([]);
    setSortOption("featured");
  };

  // Nombre de filtres actifs
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    count += selectedCategories.length;
    if (selectedStock !== "all") count++;
    if (selectedPriceMode !== "all") count++;
    count += selectedSubCategories.length;
    return count;
  }, [searchQuery, selectedCategories, selectedStock, selectedPriceMode, selectedSubCategories]);

  // Filtrage combiné et multi-critères
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return initialProducts.filter((product) => {
      // 1. Recherche par mot-clé
      if (q) {
        const matchName = product.name.toLowerCase().includes(q);
        const matchSub = product.subCategory.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        const matchBadge = product.badge?.toLowerCase().includes(q) ?? false;
        const matchSpecs = product.specs.some(
          (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );
        if (!matchName && !matchSub && !matchDesc && !matchBadge && !matchSpecs) {
          return false;
        }
      }

      // 2. Catégories / Pôles
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // 3. Disponibilité stock
      if (selectedStock === "in_stock" && product.stockStatus !== "in_stock") {
        return false;
      }
      if (selectedStock === "on_order" && product.stockStatus === "in_stock") {
        return false;
      }

      // 4. Régime de prix / mode d'exploitation
      if (selectedPriceMode === "fixed" && product.priceType !== "fixed") {
        return false;
      }
      if (selectedPriceMode === "quote" && product.priceType === "fixed") {
        return false;
      }

      // 5. Rayons / sous-catégories
      if (
        selectedSubCategories.length > 0 &&
        !selectedSubCategories.includes(product.subCategory)
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedStock, selectedPriceMode, selectedSubCategories]);

  // Tri des résultats
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case "price_asc":
        return list.sort((a, b) => {
          const pa = a.priceFcfa ?? 999999999;
          const pb = b.priceFcfa ?? 999999999;
          return pa - pb;
        });
      case "price_desc":
        return list.sort((a, b) => {
          const pa = a.priceFcfa ?? -1;
          const pb = b.priceFcfa ?? -1;
          return pb - pa;
        });
      case "name_asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

  // Contenu de la Sidebar de filtres (réutilisé pour Desktop et Mobile Drawer)
  const renderSidebarContent = () => (
    <div className="space-y-7">
      {/* En-tête de la Sidebar */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-5 h-5 text-brand-gold" />
          <h3 className="font-bold text-base text-brand-blue tracking-tight">
            Filtres du catalogue
          </h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-amber-700 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      {/* 1. Recherche directe */}
      <div>
        <label
          htmlFor="catalog-search"
          className="block text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-2.5"
        >
          Recherche Directe
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="catalog-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Modèle, réf, mot-clé..."
            className="w-full bg-[#F4F8FC] border border-brand-border/80 rounded-xl pl-10 pr-9 py-2.5 text-xs text-brand-blue placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-brand-blue"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Catégories / Pôles d'engins & BTP */}
      <div>
        <span className="block text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-3">
          Pôles d&apos;Activités
        </span>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            const count = categoryCounts[cat.id] || 0;
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between gap-3 text-xs text-brand-blue cursor-pointer group select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isChecked
                        ? "bg-brand-blue border-brand-blue text-white"
                        : "border-slate-300 bg-white group-hover:border-brand-blue"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate group-hover:text-brand-gold transition-colors">
                    {cat.label}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-[#EEF4FA] px-2 py-0.5 rounded-md flex-shrink-0">
                  {count}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Disponibilité */}
      <div>
        <span className="block text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-3">
          Disponibilité
        </span>
        <div className="space-y-2">
          <label className="flex items-center justify-between gap-2 text-xs text-brand-blue cursor-pointer select-none">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>En stock immédiat</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-[#EEF4FA] px-2 py-0.5 rounded-md">
              {stockCounts.inStock}
            </span>
            <input
              type="radio"
              name="stock"
              checked={selectedStock === "in_stock"}
              onChange={() => setSelectedStock(selectedStock === "in_stock" ? "all" : "in_stock")}
              className="sr-only"
            />
          </label>

          <label className="flex items-center justify-between gap-2 text-xs text-brand-blue cursor-pointer select-none">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Sur commande / Réservation</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-[#EEF4FA] px-2 py-0.5 rounded-md">
              {stockCounts.onOrder}
            </span>
            <input
              type="radio"
              name="stock"
              checked={selectedStock === "on_order"}
              onChange={() => setSelectedStock(selectedStock === "on_order" ? "all" : "on_order")}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* 4. Régime de prix / Mode d'acquisition */}
      <div>
        <span className="block text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-2.5">
          Régime de Prix
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() =>
              setSelectedPriceMode(selectedPriceMode === "fixed" ? "all" : "fixed")
            }
            className={`text-xs py-2.5 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
              selectedPriceMode === "fixed"
                ? "bg-brand-blue text-white border-brand-blue shadow-xs font-semibold"
                : "bg-[#F7FAFD] text-brand-blue border-brand-border/80 hover:border-brand-blue"
            }`}
          >
            Prix Fixe en FCFA
          </button>
          <button
            type="button"
            onClick={() =>
              setSelectedPriceMode(selectedPriceMode === "quote" ? "all" : "quote")
            }
            className={`text-xs py-2.5 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
              selectedPriceMode === "quote"
                ? "bg-brand-blue text-white border-brand-blue shadow-xs font-semibold"
                : "bg-[#F7FAFD] text-brand-blue border-brand-border/80 hover:border-brand-blue"
            }`}
          >
            Sur Devis / ACD
          </button>
        </div>
      </div>

      {/* 5. Rayons phares & Catégories précises (Badges cliquables) */}
      <div>
        <span className="block text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-2.5">
          Rayons &amp; Matériaux
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUB_CATEGORIES.map((sub) => {
            const isSelected = selectedSubCategories.includes(sub);
            return (
              <button
                key={sub}
                type="button"
                onClick={() => toggleSubCategory(sub)}
                className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand-gold text-brand-blue font-bold border-brand-gold shadow-xs"
                    : "bg-[#F4F8FC] text-slate-700 border-slate-200/90 hover:border-brand-gold/70"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Encart d'assistance sur-mesure WhatsApp (comme sur la maquette) */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">Besoin sur-mesure ?</h4>
            <p className="text-[11px] text-emerald-800 leading-snug mt-1">
              Gros tonnage chantier, commande spéciale ou article non listé ? Échangez directement avec un conseiller SCI GLORIA.
            </p>
          </div>
        </div>
        <a
          href={buildGeneralWhatsAppUrl(
            "Bonjour SCI GLORIA, j'ai une demande sur-mesure pour un chantier ou un devis spécifique."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-whatsapp text-white font-medium text-xs py-2.5 px-3 rounded-xl shadow-xs hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp direct conseiller</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Grille principale : Sidebar à gauche + Catalogue à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Colonne Gauche : Sidebar Desktop (Largeur fixe 3 à 4 colonnes) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28 bg-white border border-brand-border/90 rounded-3xl p-6 shadow-sm">
            {renderSidebarContent()}
          </div>
        </aside>

        {/* Colonne Droite : Grille des produits & Barre d'outils supérieure */}
        <section className="lg:col-span-8 xl:col-span-9">
          {/* Barre d'Outils Supérieure (Barre de résultats) */}
          <div className="bg-white border border-brand-border/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Compteur de résultats & bouton filtres mobile */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <div>
                <span className="text-base sm:text-lg font-bold text-brand-blue">
                  {sortedProducts.length} article{sortedProducts.length > 1 ? "s" : ""}
                </span>
                <span className="text-xs text-brand-muted ml-1.5">répertorié{sortedProducts.length > 1 ? "s" : ""}</span>
              </div>

              {/* Bouton pour ouvrir la Sidebar sur Mobile */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-xs font-semibold bg-brand-surface border border-brand-border px-3.5 py-2 rounded-xl text-brand-blue hover:border-brand-gold cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-brand-gold" />
                <span>Filtres</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-gold text-brand-blue text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Sélecteur de Tri */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-muted hidden sm:inline">Trier par :</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="appearance-none bg-[#F4F8FC] border border-brand-border rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-brand-blue focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="featured">Pertinence &amp; En vedette</option>
                  <option value="price_asc">Prix croissant (FCFA)</option>
                  <option value="price_desc">Prix décroissant (FCFA)</option>
                  <option value="name_asc">Nom alphabétique (A - Z)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tags des filtres actifs (pour supprimer en 1 clic) */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-brand-muted">Filtres appliqués :</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-[#EEF4FA] text-brand-blue text-xs px-3 py-1 rounded-full font-medium">
                  &ldquo;{searchQuery}&rdquo;
                  <button type="button" onClick={() => setSearchQuery("")} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategories.map((catId) => {
                const label = CATEGORIES.find((c) => c.id === catId)?.label || catId;
                return (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-1.5 bg-[#EEF4FA] text-brand-blue text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {label}
                    <button type="button" onClick={() => toggleCategory(catId)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              {selectedStock !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-[#EEF4FA] text-brand-blue text-xs px-3 py-1 rounded-full font-medium">
                  {selectedStock === "in_stock" ? "En stock immédiat" : "Sur commande"}
                  <button type="button" onClick={() => setSelectedStock("all")} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPriceMode !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-[#EEF4FA] text-brand-blue text-xs px-3 py-1 rounded-full font-medium">
                  {selectedPriceMode === "fixed" ? "Prix fixe FCFA" : "Sur devis"}
                  <button type="button" onClick={() => setSelectedPriceMode("all")} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSubCategories.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-blue text-xs px-3 py-1 rounded-full font-medium"
                >
                  {sub}
                  <button type="button" onClick={() => toggleSubCategory(sub)} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-gold ml-2"
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* Grille des Articles répertoriés */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* État aucun résultat trouvé */
            <div className="text-center py-20 px-4 bg-white rounded-3xl border border-brand-border">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F5FA] text-slate-400 mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-brand-blue mb-1">
                Aucun article ne correspond à ces critères
              </h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto mb-6">
                Essayez d&apos;élargir vos filtres ou effectuez une recherche avec d&apos;autres mots-clés.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Tiroir Mobile Bottom Sheet / Modal pour la Sidebar */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Overlay flouté */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Tiroir coulissant */}
          <div className="relative w-full max-w-sm bg-white h-full overflow-y-auto p-6 z-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6">
                <span className="font-bold text-base text-brand-blue">Filtres du catalogue</span>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderSidebarContent()}
            </div>

            <div className="pt-6 mt-8 border-t border-brand-border">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full bg-brand-blue text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md hover:bg-brand-blueLight transition-colors"
              >
                Voir les {sortedProducts.length} articles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
