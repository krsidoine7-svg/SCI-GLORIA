"use client";

import Link from "next/link";
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { formatPriceFcfa } from "@/lib/whatsapp";

export function FavoritesDrawer() {
  const {
    isFavoritesOpen,
    closeFavorites,
    favoriteProducts,
    favoritesCount,
    removeFavorite,
    clearFavorites,
  } = useFavorites();
  const { addToCart, isInCart, openCart } = useCart();

  if (!isFavoritesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fond sombre semi-transparent */}
      <div
        onClick={closeFavorites}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-full max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* En-tête des Favoris */}
          <div className="p-5 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-brand-blue tracking-tight">
                  Mes Favoris
                </h2>
                <p className="text-xs text-brand-muted">
                  {favoritesCount} article{favoritesCount > 1 ? "s" : ""} sauvegardé{favoritesCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeFavorites}
              aria-label="Fermer les favoris"
              className="p-2 text-brand-muted hover:text-brand-blue rounded-xl hover:bg-white border border-transparent hover:border-brand-border transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Liste des articles favoris */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-brand-blue mb-2">
                  Aucun article en favoris
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
                  Cliquez sur l'icône de cœur sur n'importe quel produit pour le retrouver rapidement ici.
                </p>
                <button
                  type="button"
                  onClick={closeFavorites}
                  className="inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-blue/90 transition-colors cursor-pointer"
                >
                  <span>Parcourir le catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              favoriteProducts.map((product) => {
                const img = product.images?.[0] || "/images/products/brique-15.jpg";
                const inCart = isInCart(product.id);

                return (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl border border-brand-border bg-white hover:border-brand-blue/60 transition-colors group space-y-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <Link
                        href={`/produit/${product.slug}`}
                        onClick={closeFavorites}
                        className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-brand-border block"
                      >
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted truncate">
                          {product.subCategory}
                        </p>
                        <Link
                          href={`/produit/${product.slug}`}
                          onClick={closeFavorites}
                          className="font-semibold text-sm text-brand-blue hover:text-brand-gold transition-colors truncate block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs font-medium text-brand-blue mt-0.5">
                          {product.priceType === "fixed" && product.priceFcfa
                            ? `${formatPriceFcfa(product.priceFcfa)} ${product.priceUnit || ""}`
                            : product.priceType === "on_demand"
                            ? "Prix sur demande"
                            : "Devis gratuit"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFavorite(product.id)}
                        title="Retirer des favoris"
                        aria-label={`Retirer ${product.name} des favoris`}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bouton pour basculer l'article dans le panier de devis */}
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product.id);
                        closeFavorites();
                        openCart();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-brand-surface border border-brand-border hover:bg-brand-blue hover:text-white text-brand-blue text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{inCart ? "Voir dans le panier de devis (+1)" : "Ajouter au panier de devis"}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pied du volet favoris */}
          {favoriteProducts.length > 0 && (
            <div className="p-5 border-t border-brand-border bg-brand-surface flex items-center justify-between">
              <button
                type="button"
                onClick={clearFavorites}
                className="text-xs text-brand-muted hover:text-rose-600 transition-colors cursor-pointer"
              >
                Vider les favoris
              </button>
              <button
                type="button"
                onClick={closeFavorites}
                className="text-xs text-brand-blue font-semibold hover:underline cursor-pointer"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
