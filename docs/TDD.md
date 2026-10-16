# TDD — Technical Design Document
# SCI GLORIA INVESTMENT & CO

> **Projet :** Plateforme Web E-commerce Vitrine, Devis & Services BTP  
> **Client :** SCI GLORIA INVESTMENT & CO (Abidjan, Marcory)  
> **Auteur :** [DÉVELOPPEUR FRONT] & [DÉVELOPPEUR BACK / DATA]  
> **Version :** 1.0 | Date : Octobre 2026

---

## 1. Stack Technique & Justifications

| Composant | Technologie Choisie | Justification Technique |
| :--- | :--- | :--- |
| **Framework Web** | **Next.js (App Router) / React 19** | Rendu hybride (Server Components pour SEO instantané, Client Components pour interactions), vitesse maximale sur mobile 3G/4G à Abidjan. |
| **Langage** | **TypeScript (Strict Mode)** | Sécurité de typage complète, zéro `any`, robustesse des modèles de données et prévention des bugs d'exécution. |
| **Styling & CSS** | **Tailwind CSS v3/v4** | Contrôle total sur la palette Bleu Nuit / Blanc / Jaune Or, zéro surcharge CSS inutile, compilation minimale. |
| **Composants UI** | **shadcn/ui + Radix UI** | Composants accessibles, légers, sans dépendance lourde, hautement personnalisables. |
| **Icônes** | **Lucide React** | Bibliothèque SVG vectorielle légère, moderne et modulaire. |
| **Stockage Données** | **Modèle Évolutif (JSON Typé → Neon Postgres / Firebase)** | MVP 1 sur jeux de données statiques ultra-performants, puis transition transparente vers BaaS en MVP 2 sans refonte front. |
| **Hébergement** | **Vercel / Cloudflare Pages** | Réseau mondial Edge (CDN ultra-rapide en Afrique de l'Ouest), certificats SSL automatiques et haute disponibilité. |

---

## 2. Modèle de Données TypeScript (Zero `any`)

### 2.1 Types Principaux

```typescript
// Enumération stricte des 3 régimes de prix
export type PriceType = 'fixed' | 'on_demand' | 'quote';

// Les 3 Pôles de Services officiels
export type ServiceCategory = 'construction' | 'immobilier' | 'materiaux';

// Spécification technique unitaire pour le BTP
export interface TechnicalSpec {
  label: string;      // ex: "Résistance à la compression"
  value: string;      // ex: "4.5 MPa (Conforme norme BTP)"
}

// Modèle Produit / Article du catalogue
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  subCategory: string;             // ex: "Briques", "Outillage", "Terrains"
  shortDescription: string;
  fullDescription: string;
  specs: TechnicalSpec[];
  priceType: PriceType;
  priceFcfa?: number;              // Présent si priceType === 'fixed'
  priceUnit?: string;              // ex: "par unité", "le sac de 50kg", "par m²"
  inStock: boolean;
  stockQuantity?: number;
  images: string[];
  videoUrl?: string;
  featured: boolean;               // Mis en avant sur l'accueil
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;       // Soft Delete pour ne jamais détruire de donnée
}

// Modèle Service
export interface ServiceHub {
  id: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  highlights: string[];
  ctaLabel: string;
}

// Modèle Demande Commerciale / Lead WhatsApp
export interface CommercialLead {
  id: string;
  productSlug?: string;
  productName?: string;
  priceType: PriceType;
  clientMessage: string;
  generatedWhatsAppUrl: string;
  createdAt: string;
}
```

---

## 3. Génération des Liens & Messages WhatsApp

Pour garantir un taux de transformation élevé, chaque interaction produit un lien WhatsApp officiel encodé selon la documentation Meta :

```typescript
// Utilitaire universel de formatage WhatsApp
const SCI_GLORIA_PHONE = "2250707830410"; // Numéro officiel WhatsApp Business

export function buildWhatsAppUrl(product: Product, originUrl: string): string {
  let message = `Bonjour SCI GLORIA INVESTMENT & CO,\n`;
  message += `Je suis intéressé par : *${product.name}*\n`;
  
  if (product.priceType === 'fixed' && product.priceFcfa) {
    message += `Prix affiché : *${product.priceFcfa.toLocaleString('fr-FR')} FCFA* ${product.priceUnit || ''}\n`;
  } else if (product.priceType === 'on_demand') {
    message += `Régime : *Prix sur demande*\n`;
  } else {
    message += `Régime : *Demande de devis chantier*\n`;
  }

  message += `Lien de la fiche : ${originUrl}\n`;
  message += `Pouvez-vous m'indiquer la disponibilité et les modalités de livraison ?`;

  return `https://wa.me/${SCI_GLORIA_PHONE}?text=${encodeURIComponent(message)}`;
}
```

---

## 4. Implémentation du Sticky Scroll / Stacking Sections (M01-B)

Pour garantir 60 FPS sur smartphone et ordinateur sans bibliothèque externe encombrante :

```tsx
// Structure React du composant StackingServices
export function StackingServices({ services }: { services: ServiceHub[] }) {
  return (
    <section className="relative w-full py-16 px-4 max-w-7xl mx-auto">
      <div className="space-y-12">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="sticky top-24 rounded-3xl bg-white border border-gray-200 p-8 shadow-2xl transition-all duration-300"
            style={{
              zIndex: 10 + index,
              transform: `scale(${1 - (services.length - 1 - index) * 0.02})`,
            }}
          >
            {/* Contenu immersif du service avec visuels et bouton WhatsApp */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 5. SEO Local Abidjan & Balisage Sémantique

Le site injecte automatiquement un composant JSON-LD certifié Schema.org pour un référencement prioritaire à Abidjan :

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "SCI GLORIA INVESTMENT & CO",
  "image": "https://scigloria.ci/images/og-scigloria.jpg",
  "telephone": "+2250707830410",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Marcory en bas du pont, près de la pharmacie Tiaco",
    "addressLocality": "Abidjan",
    "addressCountry": "CI"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 5.3025,
    "longitude": -3.9850
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:30"
    }
  ]
}
```
