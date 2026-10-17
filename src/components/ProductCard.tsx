"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Camera, ChevronLeft, ChevronRight, Heart, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import { PriceTag } from "@/components/PriceTag";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

const stockLabels: Record<Product["stockStatus"], { text: string; dot: string }> = {
  in_stock: { text: "En stock", dot: "bg-emerald-500" },
  low_stock: { text: "Stock limité", dot: "bg-amber-500" },
  on_order: { text: "Sur commande", dot: "bg-slate-400" },
};

export function ProductCard({ product }: { product: Product }) {
  const stock = stockLabels[product.stockStatus];
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id);
  const { isInCart, getItemQuantity, addToCart, incrementQuantity, decrementQuantity, openCart } = useCart();
  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);
  const isBulk = product.subCategory?.toLowerCase().includes("brique");
  const images = product.images && product.images.length > 0 ? product.images : ["/images/products/brique-15.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // Swipe vers la gauche -> image suivante
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe vers la droite -> image précédente
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }
    setTouchStartX(null);
  };

  const currentImage = images[currentImageIndex] || images[0];

  return (
    <article className="group bg-white border border-brand-border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-blue hover:shadow-card transition-all">
      {/* Conteneur photo avec défilement gauche/droite et swipe tactile */}
      <div
        className="relative h-52 w-full overflow-hidden bg-slate-100 border-b border-brand-border select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link href={`/produit/${product.slug}`} className="block w-full h-full">
          <img
            src={currentImage}
            alt={`${product.name} (photo ${currentImageIndex + 1})`}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            loading="lazy"
          />
        </Link>

        {/* Bouton Like / Favori */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md z-20 cursor-pointer ${
            isFav
              ? "bg-white text-rose-600 scale-105"
              : "bg-white/85 hover:bg-white text-slate-500 hover:text-rose-500 backdrop-blur-xs"
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? "fill-rose-600 text-rose-600" : ""}`} />
        </button>

        {/* Badge produit (Bestseller, ACD, etc.) avec cocarde étoilée sur les articles certifiés */}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs pointer-events-none z-10 ${
              product.certifiedBadge
                ? "bg-brand-blue/95 border border-brand-gold/40 text-brand-gold shadow-md"
                : "bg-brand-blue/90 text-white/90"
            }`}
          >
            {product.certifiedBadge && (
              <img
                src="/images/badge-certifie-gold.png"
                alt="Certification SCI GLORIA"
                className="w-3.5 h-3.5 object-contain flex-shrink-0"
              />
            )}
            <span>{product.badge}</span>
          </span>
        )}

        {/* Indicateur du nombre de photos */}
        {images.length > 1 && (
          <span className="absolute bottom-2.5 left-2.5 bg-brand-blue/85 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-sm pointer-events-none z-10">
            <Camera className="w-3 h-3 text-brand-gold" />
            <span>
              {currentImageIndex + 1}/{images.length}
            </span>
          </span>
        )}

        {/* Flèches de navigation gauche / droite sur la carte */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-brand-blue text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md cursor-pointer z-20 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-brand-blue text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md cursor-pointer z-20 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Points de pagination (Dots) au bas de la photo */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/45 backdrop-blur-xs px-2 py-1 rounded-full pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                aria-label={`Afficher la photo ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === currentImageIndex
                    ? "w-3.5 h-1.5 bg-brand-gold"
                    : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 mb-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="text-brand-muted font-medium">{product.subCategory}</span>
          </div>

          <h3 className="font-semibold text-xl text-brand-blue mb-2.5 leading-snug">
            <Link href={`/produit/${product.slug}`} className="hover:text-brand-gold transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-brand-muted mb-5 line-clamp-2 leading-relaxed">{product.shortDescription}</p>

          <dl className="divide-y divide-brand-border border-t border-brand-border mb-6">
            {product.specs.slice(0, 3).map((spec, i) => (
              <div key={i} className="flex justify-between gap-4 py-2 text-xs sm:text-sm">
                <dt className="text-brand-muted">{spec.label}</dt>
                <dd className="font-medium text-brand-blue text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4 pt-1">
            <PriceTag product={product} />
            <span className="inline-flex items-center gap-1.5 text-xs text-brand-muted whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${stock.dot}`} />
              {stock.text}
            </span>
          </div>

          {product.slug && (
            <Link
              href={`/produit/${product.slug}`}
              className="mt-3.5 inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-brand-border bg-slate-50 hover:bg-slate-100 text-brand-blue font-semibold text-xs transition-colors shadow-2xs group/more"
            >
              <span>Voir plus</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover/more:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Barre d'action avec bouton Panier (icône ShoppingCart) et WhatsApp */}
      <div className="p-4 pt-0 flex items-center gap-2">
        {inCart ? (
          <div className="flex-1 flex items-center justify-between bg-slate-100 border border-brand-blue/30 rounded-xl p-1 shadow-xs">
            <button
              type="button"
              onClick={() => decrementQuantity(product.id, isBulk && cartQty > 50 ? 50 : 1)}
              title="Diminuer la quantité"
              aria-label="Diminuer la quantité"
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-1.5 px-2 text-xs font-bold text-brand-blue hover:text-brand-gold transition-colors cursor-pointer"
              title="Ouvrir mon panier de devis"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-brand-gold" />
              <span>{cartQty.toLocaleString("fr-FR")} au panier</span>
            </button>

            <button
              type="button"
              onClick={() => incrementQuantity(product.id, isBulk ? 50 : 1)}
              title="Ajouter davantage"
              aria-label="Ajouter davantage"
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-brand-blue flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl hover:bg-brand-blue/90 active:scale-98 transition-all shadow-xs cursor-pointer group/btn"
          >
            <ShoppingCart className="w-4 h-4 text-brand-gold transition-transform group-hover/btn:scale-110" />
            <span>Ajouter au devis</span>
          </button>
        )}

        <a
          href={buildProductWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          title="Échanger directement sur WhatsApp pour cet article"
          aria-label="Échanger directement sur WhatsApp"
          className="w-11 h-11 rounded-xl bg-brand-whatsapp hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-xs flex-shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
