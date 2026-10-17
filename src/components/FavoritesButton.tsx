"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export function FavoritesButton({ mobile = false }: { mobile?: boolean }) {
  const { favoritesCount, openFavorites } = useFavorites();

  if (mobile) {
    return (
      <button
        type="button"
        onClick={openFavorites}
        className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-brand-surface text-brand-blue transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold">
          <Heart className={`w-4 h-4 ${favoritesCount > 0 ? "fill-rose-500 text-rose-500" : "text-brand-muted"}`} />
          <span>Mes Favoris</span>
        </span>
        {favoritesCount > 0 && (
          <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {favoritesCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openFavorites}
      aria-label={`Voir mes favoris (${favoritesCount})`}
      className="relative flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-brand-border hover:border-brand-blue bg-white text-brand-blue hover:text-rose-600 transition-colors cursor-pointer group shadow-xs"
      title="Voir mes favoris"
    >
      <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${favoritesCount > 0 ? "fill-rose-500 text-rose-500" : "text-brand-muted group-hover:text-rose-500"}`} />
      {favoritesCount > 0 && (
        <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold px-1 rounded-full shadow-xs animate-in zoom-in duration-200">
          {favoritesCount}
        </span>
      )}
    </button>
  );
}
