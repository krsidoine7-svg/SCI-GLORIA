"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

const hubVisualData = {
  construction: {
    number: "01",
    subtitle: "Construction & industrie",
    image: "/images/products/brique-15.jpg",
    metrics: [
      ["Capacité hebdomadaire", "+25 000 briques"],
      ["Résistance certifiée", "4,5 à 6,0 MPa"],
      ["Formats", "10, 15 et 20 cm"],
      ["Livraison", "Directe sur chantier"],
    ],
    waMessage:
      "Bonjour SCI GLORIA, je souhaite commander des briques ou obtenir un devis pour un chantier de construction.",
  },
  immobilier: {
    number: "02",
    subtitle: "Gestion & promotion immobilière",
    image: "/images/products/villa-duplex.jpg",
    metrics: [
      ["Audit juridique", "ACD et bornage vérifiés"],
      ["Partenaires", "Notaires et géomètres agréés"],
      ["Biens", "Terrains, villas et duplex"],
      ["Diaspora", "Rapports et virement mensuel"],
    ],
    waMessage:
      "Bonjour SCI GLORIA, je souhaite des informations sur vos terrains avec ACD ou vos biens en gestion immobilière.",
  },
  materiaux: {
    number: "03",
    subtitle: "Matériaux & outillage",
    image: "/images/products/carrelage-gres-1.jpg",
    metrics: [
      ["Disponibilité", "Stock réel en magasin"],
      ["Rayons", "Carreaux, sanitaire, outillage"],
      ["Tarifs", "Détail et gros"],
      ["Retrait", "Comptoir Marcory ou livraison"],
    ],
    waMessage:
      "Bonjour SCI GLORIA, je souhaite des renseignements ou un devis sur votre catalogue de carrelage, sanitaire et outillage.",
  },
};

export function StackingServices() {
  const [card3Progress, setCard3Progress] = useState(0);
  const card3TrackRef = useRef<HTMLDivElement>(null);

  // Synchronisation du glissement latéral de la 3e carte avec le scroll
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!card3TrackRef.current) return;
      const rect = card3TrackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Détection de l'accroche sticky (offset dynamique selon la hauteur d'en-tête)
      const stickyTop = window.innerWidth < 768 ? 96 : 124;
      const trackHeight = rect.height - windowHeight;

      if (trackHeight <= 0) return;

      // Distance scrollée dès que le track entre dans sa zone sticky
      const scrolled = stickyTop - rect.top;
      // La carte glisse sur 75% du parcours de scroll, puis reste ancrée
      const scrollRange = windowHeight * 0.75;
      const rawProgress = scrolled / scrollRange;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      setCard3Progress(clamped);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rendu modulaire d'une carte de pôle d'activité
  const renderCardContent = (service: (typeof servicesData)[0], index: number) => {
    const visual = hubVisualData[service.id as keyof typeof hubVisualData];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white shadow-2xl shadow-brand-blue/15 border border-brand-border/80 rounded-3xl overflow-hidden">
        {/* Panneau visuel : Photo du pôle + dégradé + numéro et titre */}
        <div className="relative lg:col-span-4 min-h-[240px] sm:min-h-[280px] p-7 sm:p-9 flex flex-col justify-between text-white overflow-hidden group">
          {/* Image d'illustration du pôle avec zoom subtil */}
          <img
            src={visual.image}
            alt={visual.subtitle}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Dégradé Bleu Nuit profond pour garantir la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/85 to-brand-blue/65" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-6xl sm:text-7xl font-semibold text-brand-gold leading-none tracking-tight drop-shadow-sm">
              {visual.number}
            </span>
            {index === 2 && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-gold text-brand-blue shadow-sm">
                Arrivée latérale
              </span>
            )}
          </div>

          <div className="relative z-10 mt-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand-gold font-semibold mb-2 drop-shadow-xs">
              {visual.subtitle}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-white drop-shadow-sm">
              {service.title.replace(/^[0-9]\.\s*/, "")}
            </h3>
          </div>
        </div>

        {/* Contenu textuel et indicateurs */}
        <div className="lg:col-span-8 p-7 sm:p-9 lg:p-10">
          <p className="text-brand-blue font-medium text-base mb-3">{service.tagline}</p>
          <p className="text-sm text-brand-muted leading-relaxed mb-8 max-w-2xl">
            {service.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {/* Atouts */}
            <ul className="divide-y divide-brand-border border-t border-brand-border mb-8 md:mb-0 self-start">
              {service.highlights.map((item, hIdx) => (
                <li key={hIdx} className="py-3 text-sm text-brand-blue leading-snug">
                  {item}
                </li>
              ))}
            </ul>

            {/* Fiche chiffrée */}
            <dl className="divide-y divide-brand-border border-t border-brand-border self-start">
              {visual.metrics.map(([label, val], mIdx) => (
                <div key={mIdx} className="py-3 flex justify-between gap-4 text-sm">
                  <dt className="text-brand-muted">{label}</dt>
                  <dd className="font-semibold text-brand-blue text-right">{val}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href={buildGeneralWhatsAppUrl(visual.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-brand-blue text-white font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-brand-blueLight transition-colors"
            >
              {service.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-brand-blue underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors"
            >
              Nous trouver à Marcory
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="py-20 md:py-28 px-4 sm:px-6 bg-white scroll-mt-20 overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-12 h-px bg-brand-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
              Notre cœur de métier
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-blue tracking-tight leading-[1.12] mb-5">
            Trois métiers, une seule maison à Abidjan.
          </h2>
          <p className="text-base text-brand-muted leading-relaxed">
            Une expertise intégrée pour concevoir, fournir et rentabiliser vos projets immobiliers, sans
            intermédiaires inutiles.
          </p>
        </div>

        {/* Cartes empilées hybrides : Cartes 1 & 2 en vertical + Carte 3 en glissement horizontal depuis la droite */}
        <div className="relative pb-16 md:pb-24">
          {/* Carte 01 : BTP & Briques (Statique en sticky vertical) */}
          <article className="sticky top-20 md:top-24 z-10 transition-transform">
            {renderCardContent(servicesData[0], 0)}
          </article>

          {/* Carte 02 : Immobilier & Terrains (Monte du bas vers le haut et se superpose) */}
          <article className="sticky top-24 md:top-28 z-20 mt-8 md:mt-12 transition-transform">
            {renderCardContent(servicesData[1], 1)}
          </article>

          {/* Carte 03 : Matériaux & Outillage (Glisse de la droite vers la gauche par-dessus la 2e carte au scroll) */}
          <div ref={card3TrackRef} className="relative min-h-[140vh] sm:min-h-[155vh] mt-8 md:mt-12">
            <div className="sticky top-28 md:top-32 z-30 w-full overflow-visible">
              <article
                style={{
                  transform: `translateX(${(1 - card3Progress) * 105}%)`,
                  willChange: "transform",
                }}
                className="transition-transform duration-75 ease-out shadow-2xl shadow-brand-blue/30 rounded-3xl"
              >
                {renderCardContent(servicesData[2], 2)}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
