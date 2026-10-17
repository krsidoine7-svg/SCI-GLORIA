"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton({ mobile = false }: { mobile?: boolean }) {
  const { cartDistinctCount, cartTotalUnits, openCart } = useCart();

  if (mobile) {
    return (
      <button
        type="button"
        onClick={openCart}
        className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-brand-surface text-brand-blue transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold">
          <ShoppingCart className={`w-4 h-4 ${cartDistinctCount > 0 ? "text-brand-blue" : "text-brand-muted"}`} />
          <span>Panier de Devis</span>
        </span>
        {cartDistinctCount > 0 && (
          <span className="bg-brand-blue text-brand-gold text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            {cartDistinctCount} {cartTotalUnits > cartDistinctCount ? `(${cartTotalUnits})` : ""}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Voir mon panier de devis (${cartDistinctCount})`}
      className="relative flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-brand-border hover:border-brand-blue bg-white text-brand-blue hover:text-brand-blue transition-all cursor-pointer group shadow-xs hover:shadow-sm"
      title="Voir mon panier de devis"
    >
      <ShoppingCart className="w-4 h-4 text-brand-blue transition-transform group-hover:scale-110" />
      {cartDistinctCount > 0 && (
        <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-brand-blue text-brand-gold text-[10px] font-bold px-1.5 rounded-full shadow-xs animate-in zoom-in duration-200">
          {cartDistinctCount}
        </span>
      )}
    </button>
  );
}
