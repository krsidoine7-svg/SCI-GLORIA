import type { Product } from "@/types";
import { formatPriceFcfa } from "@/lib/whatsapp";

/**
 * Moteur des 3 régimes de prix :
 *  - fixed     : montant affiché en FCFA
 *  - on_demand : "Prix sur demande" (cours du fer, du ciment, terrains)
 *  - quote     : "Devis gratuit sous 24h"
 */
export function PriceTag({ product }: { product: Product }) {
  if (product.priceType === "fixed" && product.priceFcfa) {
    return (
      <div>
        <div className="text-2xl font-semibold text-brand-blue tracking-tight">
          {formatPriceFcfa(product.priceFcfa)}
        </div>
        {product.priceUnit && <span className="text-xs text-brand-muted">{product.priceUnit}</span>}
      </div>
    );
  }

  if (product.priceType === "on_demand") {
    return (
      <div>
        <div className="text-lg font-semibold text-brand-blue">Prix sur demande</div>
        <span className="text-xs text-brand-muted">Selon le cours du jour</span>
      </div>
    );
  }

  return (
    <div>
      <div className="text-lg font-semibold text-brand-blue">Devis gratuit</div>
      <span className="text-xs text-brand-muted">Chiffrage sous 24h</span>
    </div>
  );
}
