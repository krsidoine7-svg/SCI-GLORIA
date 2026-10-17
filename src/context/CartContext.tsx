"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types";
import { initialProducts } from "@/data/products";
import { companyData } from "@/data/company";
import { formatPriceFcfa, buildCartTicketWhatsAppUrl } from "@/lib/whatsapp";

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartProducts: (Product & { quantity: number; lineTotal: number | null })[];
  cartDistinctCount: number; // Nombre de produits différents
  cartTotalUnits: number; // Somme de toutes les quantités
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  addToCart: (id: string, quantityToAdd?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string, step?: number) => void;
  decrementQuantity: (id: string, step?: number) => void;
  clearCart: () => void;
  totalEstimatedFcfa: number;
  hasOnDemandOrQuoteItems: boolean;
  onDemandOrQuoteCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  buildCartWhatsAppUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY_CART = "scigloria_cart_items_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Charger le panier depuis le localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CART);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch {
      // Ignorer les erreurs d'accès au localStorage
    }
    setMounted(true);
  }, []);

  const persistCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(newItems));
    } catch {
      // Ignorer les erreurs d'accès au localStorage
    }
  };

  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Ajoute ou incrémente un produit dans le panier
  const addToCart = (id: string, quantityToAdd?: number) => {
    const prod = initialProducts.find((p) => p.id === id);
    // Si aucune quantité spécifiée : 100 pour les briques, 1 pour les autres
    const defaultQty =
      quantityToAdd ??
      (prod?.subCategory?.toLowerCase().includes("brique") ? 100 : 1);

    const existingIndex = cartItems.findIndex((item) => item.id === id);
    if (existingIndex > -1) {
      // Incrémentation
      const updated = [...cartItems];
      updated[existingIndex].quantity += defaultQty;
      persistCart(updated);
    } else {
      // Nouveau produit dans le panier
      persistCart([...cartItems, { id, quantity: defaultQty }]);
    }
  };

  const removeFromCart = (id: string) => {
    persistCart(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const validQty = Math.floor(quantity);
    if (validQty <= 0) {
      removeFromCart(id);
      return;
    }

    const existingIndex = cartItems.findIndex((item) => item.id === id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity = validQty;
      persistCart(updated);
    } else {
      persistCart([...cartItems, { id, quantity: validQty }]);
    }
  };

  const incrementQuantity = (id: string, step = 1) => {
    const current = getItemQuantity(id);
    updateQuantity(id, current + step);
  };

  const decrementQuantity = (id: string, step = 1) => {
    const current = getItemQuantity(id);
    if (current - step <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, current - step);
    }
  };

  const clearCart = () => {
    persistCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Fusionner les données de produits avec les quantités du panier
  const cartProducts = cartItems
    .map((item) => {
      const product = initialProducts.find((p) => p.id === item.id);
      if (!product) return null;
      const lineTotal =
        product.priceType === "fixed" && product.priceFcfa
          ? product.priceFcfa * item.quantity
          : null;
      return {
        ...product,
        quantity: item.quantity,
        lineTotal,
      };
    })
    .filter(Boolean) as (Product & { quantity: number; lineTotal: number | null })[];

  // Nombre de références uniques
  const cartDistinctCount = cartProducts.length;

  // Somme totale de toutes les unités
  const cartTotalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total estimé en FCFA
  const totalEstimatedFcfa = cartProducts.reduce((sum, item) => {
    return sum + (item.lineTotal ?? 0);
  }, 0);

  // Articles sur devis ou sur demande
  const onDemandOrQuoteCount = cartProducts.filter(
    (p) => p.priceType === "on_demand" || p.priceType === "quote"
  ).length;
  const hasOnDemandOrQuoteItems = onDemandOrQuoteCount > 0;

  // Générateur de ticket WhatsApp officiel de devis et commande pro
  const buildCartWhatsAppUrl = () => {
    return buildCartTicketWhatsAppUrl(cartProducts, totalEstimatedFcfa, onDemandOrQuoteCount);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartProducts,
        cartDistinctCount,
        cartTotalUnits,
        isInCart,
        getItemQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalEstimatedFcfa,
        hasOnDemandOrQuoteItems,
        onDemandOrQuoteCount,
        isCartOpen,
        openCart,
        closeCart,
        buildCartWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
