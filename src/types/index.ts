// Les 3 régimes de prix obligatoires de SCI GLORIA
export type PriceType = "fixed" | "on_demand" | "quote";

// Les 3 grands pôles de services officiels
export type ServiceCategory = "construction" | "immobilier" | "materiaux";

// Fiche technique BTP
export interface TechnicalSpec {
  label: string; // ex: "Résistance", "Dimensions", "Conditionnement"
  value: string; // ex: "4.5 MPa", "15x20x40 cm", "Palette de 80 unités"
}

// Modèle Produit / Article du catalogue
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  subCategory: string; // ex: "Briques", "Finitions", "Terrains", "Outillage"
  shortDescription: string;
  fullDescription: string;
  specs: TechnicalSpec[];
  priceType: PriceType;
  priceFcfa?: number; // Défini si priceType === 'fixed'
  priceUnit?: string; // ex: "l'unité", "le sac de 50kg", "le seau de 25kg", "le lot"
  inStock: boolean;
  stockStatus: "in_stock" | "low_stock" | "on_order";
  badge?: string; // ex: "Nouveauté", "Arrivage", "Meilleure Vente"
  certifiedBadge?: boolean; // Affiche la cocarde de certification / qualité
  images: string[];
  featured: boolean; // Mis en avant sur l'accueil
  createdAt: string;
}

// Modèle Service / Grand Pôle
export interface ServiceHub {
  id: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  accentColor: string;
}

// Données d'entreprise
export interface CompanyInfo {
  name: string;
  tagline: string;
  address: string;
  locationDetails: string;
  phone: string;
  whatsappPhone: string;
  whatsappDisplay: string;
  hoursWeek: string;
  hoursSaturday: string;
  googleMapsUrl: string;
}
