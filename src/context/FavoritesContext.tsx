"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types";
import { initialProducts } from "@/data/products";

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: Product[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavoritesOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY_FAVORITES = "scigloria_favorites_list_v2";
const LEGACY_STORAGE_KEY = "scigloria_favorites_v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Charger depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Si format legacy [id] ou [{id}]
          const ids = parsed.map((item) => (typeof item === "string" ? item : item.id)).filter(Boolean);
          setFavorites(ids);
        }
      }
    } catch {
      // Ignorer les erreurs d'accès au localStorage
    }
    setMounted(true);
  }, []);

  const persistFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(newFavs));
    } catch {
      // Ignorer les erreurs d'accès au localStorage
    }
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      persistFavorites(favorites.filter((favId) => favId !== id));
    } else {
      persistFavorites([...favorites, id]);
    }
  };

  const removeFavorite = (id: string) => {
    persistFavorites(favorites.filter((favId) => favId !== id));
  };

  const clearFavorites = () => {
    persistFavorites([]);
  };

  const openFavorites = () => setIsFavoritesOpen(true);
  const closeFavorites = () => setIsFavoritesOpen(false);

  const favoriteProducts = initialProducts.filter((p) => favorites.includes(p.id));
  const favoritesCount = favoriteProducts.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteProducts,
        favoritesCount,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        isFavoritesOpen,
        openFavorites,
        closeFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
