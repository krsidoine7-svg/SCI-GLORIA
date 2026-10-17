"use client";

import Link from "next/link";
import {
  X,
  ShoppingCart,
  MessageCircle,
  Trash2,
  ArrowRight,
  Plus,
  Minus,
  Calculator,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPriceFcfa } from "@/lib/whatsapp";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartProducts,
    cartDistinctCount,
    cartTotalUnits,
    removeFromCart,
    clearCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    totalEstimatedFcfa,
    hasOnDemandOrQuoteItems,
    onDemandOrQuoteCount,
    buildCartWhatsAppUrl,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fond sombre semi-transparent */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* En-tête du Panier */}
          <div className="p-5 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shadow-xs">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-brand-blue tracking-tight">
                  Mon Panier de Devis
                </h2>
                <p className="text-xs text-brand-muted">
                  {cartDistinctCount} référence{cartDistinctCount > 1 ? "s" : ""}
                  {cartTotalUnits > cartDistinctCount && (
                    <span className="font-semibold text-brand-blue ml-1">
                      ({cartTotalUnits.toLocaleString("fr-FR")} unités au total)
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Fermer le panier de devis"
              className="p-2 text-brand-muted hover:text-brand-blue rounded-xl hover:bg-white border border-transparent hover:border-brand-border transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Liste des articles avec réglage précis des quantités */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartProducts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4 border border-brand-border">
                  <ShoppingCart className="w-8 h-8 text-brand-muted" />
                </div>
                <h3 className="text-base font-semibold text-brand-blue mb-2">
                  Votre panier de devis est vide
                </h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
                  Ajoutez des briques, carrelages, sanitaires ou outillage depuis le catalogue en cliquant sur le bouton <strong>"Ajouter au devis"</strong> pour ajuster vos quantités.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-semibold px-5 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Explorer le catalogue BTP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cartProducts.map((product) => {
                const img = product.images?.[0] || "/images/products/brique-15.jpg";
                const isBulk = product.subCategory?.toLowerCase().includes("brique");

                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl border border-brand-border bg-white hover:border-brand-blue/60 transition-all shadow-xs space-y-3"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Photo produit */}
                      <Link
                        href={`/produit/${product.slug}`}
                        onClick={closeCart}
                        className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-brand-border block"
                      >
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Infos produit */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted truncate">
                            {product.subCategory}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            title="Retirer du panier"
                            aria-label={`Retirer ${product.name}`}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <Link
                          href={`/produit/${product.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-sm text-brand-blue hover:text-brand-gold transition-colors block line-clamp-1"
                        >
                          {product.name}
                        </Link>

                        <p className="text-xs text-brand-muted mt-0.5">
                          {product.priceType === "fixed" && product.priceFcfa
                            ? `${formatPriceFcfa(product.priceFcfa)} ${product.priceUnit || ""}`
                            : product.priceType === "on_demand"
                            ? "Prix sur demande"
                            : "Sur devis gratuit"}
                        </p>
                      </div>
                    </div>

                    {/* Bloc Réglage des Quantités & Sous-total */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      {/* Contrôle incrémenter / décrémenter et saisie libre */}
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-brand-border rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => decrementQuantity(product.id, isBulk && product.quantity > 50 ? 50 : 1)}
                          title="Diminuer la quantité"
                          aria-label="Diminuer la quantité"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center px-2">
                          <input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) updateQuantity(product.id, val);
                            }}
                            className="w-16 sm:w-20 text-center font-bold text-sm text-brand-blue bg-transparent focus:outline-none"
                            aria-label={`Quantité pour ${product.name}`}
                          />
                          <span className="text-[11px] text-slate-500 font-medium ml-1">
                            {product.priceUnit ? product.priceUnit.replace(/^l'|^le /, "") : "u."}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => incrementQuantity(product.id, isBulk ? 50 : 1)}
                          title="Augmenter la quantité"
                          aria-label="Augmenter la quantité"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Sous-total chiffré de la ligne */}
                      <div className="text-right">
                        {product.lineTotal !== null ? (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                              Sous-total
                            </span>
                            <span className="text-sm font-bold text-brand-blue">
                              {formatPriceFcfa(product.lineTotal)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-brand-gold bg-brand-blue/5 px-2.5 py-1 rounded-md">
                            {product.priceType === "on_demand" ? "Sur demande" : "Sur devis"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Raccourcis gros volumes pour les briques */}
                    {isBulk && (
                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        <span className="text-slate-400 font-medium">Volume :</span>
                        {[500, 1000, 2000, 5000].map((step) => (
                          <button
                            key={step}
                            type="button"
                            onClick={() => updateQuantity(product.id, step)}
                            className={`px-2 py-0.5 rounded-md font-semibold border transition-all cursor-pointer ${
                              product.quantity === step
                                ? "bg-brand-blue text-white border-brand-blue"
                                : "bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue"
                            }`}
                          >
                            {step.toLocaleString("fr-FR")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pied du panier avec Total Chiffré & Bouton WhatsApp */}
          {cartProducts.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-brand-border bg-brand-surface space-y-4">
              <div className="space-y-1.5 pb-2 border-b border-brand-border/60">
                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <span>Références au devis</span>
                  <span className="font-semibold text-brand-blue">
                    {cartDistinctCount} article{cartDistinctCount > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <span>Total des unités</span>
                  <span className="font-semibold text-brand-blue">
                    {cartTotalUnits.toLocaleString("fr-FR")}
                  </span>
                </div>

                {totalEstimatedFcfa > 0 && (
                  <div className="flex items-baseline justify-between pt-2">
                    <div>
                      <span className="text-sm font-bold text-brand-blue block">
                        Total Estimé
                      </span>
                      <span className="text-[10px] text-brand-muted">
                        Hors frais de transport et déchargement
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-brand-blue tracking-tight">
                      {formatPriceFcfa(totalEstimatedFcfa)}
                    </span>
                  </div>
                )}

                {hasOnDemandOrQuoteItems && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 rounded-lg mt-1 font-medium">
                    + {onDemandOrQuoteCount} article(s) à chiffrer sur mesure par nos conseillers techniques.
                  </p>
                )}
              </div>

              {/* Bouton d'envoi du Ticket Devis Pro officiel sur WhatsApp */}
              <a
                href={buildCartWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-brand-whatsapp text-white font-bold text-sm py-4 px-4 rounded-xl hover:bg-emerald-600 transition-all shadow-md group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Commande & Devis</span>
              </a>

              {/* Actions secondaires */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Vider le panier
                </button>
                <button
                  type="button"
                  onClick={closeCart}
                  className="text-xs text-brand-blue font-semibold hover:text-brand-gold transition-colors cursor-pointer"
                >
                  Poursuivre la sélection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
