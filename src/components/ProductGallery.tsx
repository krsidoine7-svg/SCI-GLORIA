"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera, Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductGalleryProps {
  images: string[];
  name: string;
  productId?: string;
}

export function ProductGallery({ images, name, productId }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = productId ? isFavorite(productId) : false;

  // Sécurité si aucune image n'est fournie
  const safeImages = images && images.length > 0 ? images : ["/images/products/brique-15.jpg"];
  const currentImage = safeImages[selectedIndex] || safeImages[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
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
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className="mb-10">
      {/* Affichage principal de la photo */}
      <div
        className="relative rounded-2xl overflow-hidden border border-brand-border bg-slate-100 h-80 sm:h-96 md:h-[440px] w-full shadow-sm group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentImage}
          alt={`${name} — Vue ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Bouton Like / Favori sur la photo principale */}
        {productId && (
          <button
            type="button"
            onClick={() => toggleFavorite(productId)}
            title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md z-20 cursor-pointer ${
              isFav
                ? "bg-white text-rose-600 scale-105"
                : "bg-white/85 hover:bg-white text-slate-500 hover:text-rose-500 backdrop-blur-xs"
            }`}
          >
            <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isFav ? "fill-rose-600 text-rose-600" : ""}`} />
          </button>
        )}

        {/* Indicateur du nombre de photos */}
        {safeImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-brand-blue/85 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-brand-gold" />
            <span>
              {selectedIndex + 1} / {safeImages.length}
            </span>
          </div>
        )}

        {/* Flèches précédent / suivant si plusieurs images */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-blue flex items-center justify-center shadow-md transition-all sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-blue flex items-center justify-center shadow-md transition-all sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniatures cliquables (Thumbnails) */}
      {safeImages.length > 1 && (
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {safeImages.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Afficher la photo ${idx + 1}`}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-brand-gold ring-2 ring-brand-gold/30 shadow-sm"
                    : "border-brand-border opacity-70 hover:opacity-100 hover:border-brand-blue"
                }`}
              >
                <img
                  src={img}
                  alt={`${name} miniature ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <span className="absolute inset-0 bg-brand-gold/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
