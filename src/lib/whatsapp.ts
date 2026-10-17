import { Product } from "@/types";
import { companyData } from "@/data/company";

/**
 * Formate un montant en FCFA lisible (ex: 350 -> "350 FCFA", 65000 -> "65 000 FCFA")
 */
export function formatPriceFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/**
 * Génère un identifiant unique de ticket devis au format pro BTP (ex: DEV-20261016-8412)
 */
export function generateTicketReference(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DEV-${yyyy}${mm}${dd}-${random}`;
}

/**
 * Construit un ticket de commande & devis structuré au format texte pour WhatsApp
 */
export function buildCartTicketWhatsAppUrl(
  items: (Product & { quantity: number; lineTotal: number | null })[],
  totalEstimatedFcfa: number,
  onDemandOrQuoteCount: number
): string {
  if (!items || items.length === 0) {
    return buildGeneralWhatsAppUrl(
      "Bonjour SCI GLORIA INVESTMENT & CO, je souhaite obtenir des renseignements sur vos matériaux et services BTP."
    );
  }

  const ticketRef = generateTicketReference();
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalUnits = items.reduce((acc, it) => acc + it.quantity, 0);

  let msg = `========================================\n`;
  msg += `    *SCI GLORIA INVESTMENT & CO*\n`;
  msg += `    *TICKET DE COMMANDE & DEVIS BTP*\n`;
  msg += `========================================\n\n`;

  msg += `*RÉFÉRENCE :* ${ticketRef}\n`;
  msg += `*DATE      :* ${dateStr} à ${timeStr}\n`;
  msg += `*MAGASIN   :* Marcory en bas du pont, Abidjan\n`;
  msg += `*CONTACT   :* +225 07 07 83 04 10\n\n`;

  msg += `----------------------------------------\n`;
  msg += `*ARTICLES SÉLECTIONNÉS (${items.length} réf. · ${totalUnits.toLocaleString("fr-FR")} unités)*\n`;
  msg += `----------------------------------------\n\n`;

  items.forEach((item, index) => {
    const num = String(index + 1).padStart(2, "0");
    const unitLabel = item.priceUnit ? item.priceUnit.replace(/^l'|^le /, "") : "unité(s)";

    msg += `*${num}. ${item.name.toUpperCase()}*\n`;
    msg += `   • Catégorie : ${item.subCategory}\n`;
    msg += `   • Quantité  : *${item.quantity.toLocaleString("fr-FR")} ${unitLabel}*\n`;

    if (item.priceType === "fixed" && item.priceFcfa && item.lineTotal !== null) {
      msg += `   • P.U.      : ${formatPriceFcfa(item.priceFcfa)} ${item.priceUnit || ""}\n`;
      msg += `   • Sous-tot  : *${formatPriceFcfa(item.lineTotal)}*\n`;
    } else if (item.priceType === "on_demand") {
      msg += `   • Régime    : *Prix sur demande (cours du jour)*\n`;
    } else {
      msg += `   • Régime    : *Projet sur devis gratuit*\n`;
    }
    msg += `\n`;
  });

  msg += `----------------------------------------\n`;
  msg += `*RÉCAPITULATIF FINANCIER ESTIMÉ*\n`;
  msg += `----------------------------------------\n`;

  if (totalEstimatedFcfa > 0) {
    msg += `*TOTAL ARTICLES : ${formatPriceFcfa(totalEstimatedFcfa)}*\n`;
  }
  if (onDemandOrQuoteCount > 0) {
    msg += `(+ ${onDemandOrQuoteCount} référence(s) à coter sur mesure)\n`;
  }
  msg += `• Livraison chantier : À chiffrer selon la commune\n`;
  msg += `• Facture pro / Bon de commande disponible\n\n`;

  msg += `----------------------------------------\n`;
  msg += `*COORDONNÉES CLIENT (À compléter)*\n`;
  msg += `----------------------------------------\n`;
  msg += `• Nom & Prénom : \n`;
  msg += `• Commune / Chantier : \n`;
  msg += `• Téléphone direct : \n\n`;

  msg += `----------------------------------------\n`;
  msg += `Bonjour l'équipe commerciale, merci de me confirmer la disponibilité du stock et de m'établir le devis officiel avec la livraison.\n`;
  msg += `========================================`;

  return `https://wa.me/${companyData.whatsappPhone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Construit l'URL WhatsApp avec message pré-formaté pour un produit spécifique
 */
export function buildProductWhatsAppUrl(product: Product, currentUrl?: string): string {
  let message = `Bonjour SCI GLORIA INVESTMENT & CO,\n\n`;
  message += `Je suis intéressé par votre article :\n`;
  message += `- *${product.name}* (Catégorie : ${product.subCategory})\n`;

  if (product.priceType === "fixed" && product.priceFcfa) {
    message += `- *Prix affiché :* ${formatPriceFcfa(product.priceFcfa)} ${product.priceUnit || ""}\n`;
  } else if (product.priceType === "on_demand") {
    message += `- *Régime :* Prix sur demande\n`;
  } else {
    message += `- *Régime :* Demande de devis gratuit\n`;
  }

  if (currentUrl) {
    message += `- *Fiche produit :* ${currentUrl}\n`;
  }

  message += `\nPouvez-vous m'indiquer la disponibilité en stock et les conditions de retrait à Marcory ou de livraison sur chantier ?`;

  return `https://wa.me/${companyData.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Construit une URL WhatsApp générale de contact
 */
export function buildGeneralWhatsAppUrl(customMessage?: string): string {
  const defaultText = `Bonjour SCI GLORIA INVESTMENT & CO, je vous contacte depuis votre site internet. J'aimerais avoir des informations sur vos services (Construction, Immobilier, Matériaux).`;
  const text = customMessage || defaultText;
  return `https://wa.me/${companyData.whatsappPhone}?text=${encodeURIComponent(text)}`;
}
