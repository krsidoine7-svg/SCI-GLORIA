"use client";

import { useEffect, useState } from "react";
import { Check, Link2, MessageCircle, Heart, ShoppingCart, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

/**
 * Boutons d'action de la fiche produit :
 *  - Commander / demander un devis sur WhatsApp
 *  - Ajouter au panier de devis (avec ShoppingCart icon et incrément/décrément)
 *  - Ajouter aux Favoris (avec Heart icon)
 *  - Partager le lien
 */
export function ProductActions({ product }: { product: Product }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id);

  const { isInCart, getItemQuantity, addToCart, incrementQuantity, decrementQuantity, openCart } = useCart();
  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);
  const isBulk = product.subCategory?.toLowerCase().includes("brique");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  async function copyLink() {
    const link = url || window.location.href;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const input = document.createElement("textarea");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="space-y-4">
      {/* 1. Ligne Principale : Panier de Devis (ShoppingCart) + WhatsApp */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {inCart ? (
          <div className="flex items-center justify-between bg-slate-50 border border-brand-blue/30 rounded-xl p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => decrementQuantity(product.id, isBulk && cartQty > 50 ? 50 : 1)}
              title="Diminuer la quantité"
              aria-label="Diminuer la quantité"
              className="w-10 h-10 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-2 px-4 py-2 font-bold text-sm text-brand-blue hover:text-brand-gold transition-colors cursor-pointer"
              title="Ouvrir mon panier de devis"
            >
              <ShoppingCart className="w-4 h-4 text-brand-gold" />
              <span>{cartQty.toLocaleString("fr-FR")} au devis</span>
            </button>

            <button
              type="button"
              onClick={() => incrementQuantity(product.id, isBulk ? 50 : 1)}
              title="Ajouter davantage"
              aria-label="Ajouter davantage"
              className="w-10 h-10 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="flex-1 inline-flex items-center justify-center gap-2.5 bg-brand-blue text-white font-semibold text-sm px-6 py-4 rounded-xl hover:bg-brand-blue/90 active:scale-98 transition-all shadow-sm cursor-pointer group"
          >
            <ShoppingCart className="w-4 h-4 text-brand-gold transition-transform group-hover:scale-110" />
            <span>Ajouter au devis groupé</span>
          </button>
        )}

        <a
          href={buildProductWhatsAppUrl(product, url || undefined)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-brand-whatsapp text-white font-semibold text-sm px-6 py-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{product.priceType === "quote" ? "Devis WhatsApp" : "Commander WhatsApp"}</span>
        </a>
      </div>

      {/* 2. Ligne Secondaire : Favoris (Heart) + Partager le lien */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          className={`flex-1 inline-flex items-center justify-center gap-2 border font-medium text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer ${
            isFav
              ? "border-rose-400 bg-rose-50 text-rose-600 shadow-xs"
              : "border-brand-border bg-white text-brand-blue hover:border-brand-blue"
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? "fill-rose-600 text-rose-600" : ""}`} />
          <span>{isFav ? "Dans mes favoris" : "Ajouter aux favoris"}</span>
        </button>

        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center justify-center gap-2 border border-brand-border bg-white text-brand-blue font-medium text-xs sm:text-sm py-3 px-4 rounded-xl hover:border-brand-blue transition-colors cursor-pointer"
          aria-live="polite"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
          <span>{copied ? "Lien copié" : "Partager"}</span>
        </button>
      </div>
    </div>
  );
}
