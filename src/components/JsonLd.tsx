import { companyData } from "@/data/company";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor", "RealEstateAgent"],
    name: companyData.name,
    description:
      "Construction BTP, unité industrielle de fabrication de briques, gestion immobilière et vente de matériaux à Marcory, Abidjan.",
    url: "https://scigloria.ci",
    telephone: companyData.phone,
    priceRange: "FCFA",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marcory en bas du pont, près de la pharmacie Tiaco",
      addressLocality: "Marcory, Abidjan",
      addressRegion: "Abidjan",
      addressCountry: "CI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.3033",
      longitude: "-3.9872",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:30",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Abidjan",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services & Matériaux SCI GLORIA",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fabrication de briques creuses et pleines",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vente de terrains sécurisés avec ACD vérifié",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Outillage professionnel et matériaux de finitions",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
