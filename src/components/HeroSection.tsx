"use client";

import { useEffect, useState } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

// Compteur animé sans dépendance externe
function AnimatedCounter({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: <>+<AnimatedCounter end={500} suffix=" 000" /></>, label: "Briques produites et livrées" },
  { value: <>+<AnimatedCounter end={120} /></>, label: "Chantiers réalisés" },
  { value: <AnimatedCounter end={100} suffix="%" />, label: "Terrains avec ACD vérifié" },
  { value: <>0 FCFA</>, label: "Devis chiffré sous 24h" },
];

const heroSlides = [
  {
    id: "construction",
    image: "/images/products/brique-15.jpg",
    alt: "Pôle 1 : Construction BTP & Usine industrielle de briques à Abidjan",
    label: "01. BTP & Briques",
    shortTag: "Usine de Briques & Chantiers",
    headline: "Fabrication de briques vibrées & chantiers gros œuvre",
  },
  {
    id: "immobilier",
    image: "/images/products/villa-duplex.jpg",
    alt: "Pôle 2 : Gestion Immobilière, Terrains ACD & Villas clés en main",
    label: "02. Terrains & Villas",
    shortTag: "Terrains ACD & Villas",
    headline: "Terrains titrés avec ACD vérifié & promotion de standing",
  },
  {
    id: "materiaux",
    image: "/images/products/carrelage-gres-1.jpg",
    alt: "Pôle 3 : Vente de Matériaux, Carrelages d'importation et Sanitaires",
    label: "03. Carreaux & Sanitaire",
    shortTag: "Carreaux, Sanitaire & Outillage",
    headline: "Grès cérame émaillé, WC suspendus Rimless & outillage pro",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [waveActive, setWaveActive] = useState(false);

  // Déclenchement de la vague de gauche à droite dès la fin du chargement initial (~1.1s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaveActive(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative text-white overflow-hidden min-h-[480px] md:min-h-[500px] flex flex-col justify-between">
      {/* 3 Images d'arrière-plan en fondu enchaîné (Crossfade) pour les 3 grands services */}
      {heroSlides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        />
      ))}

      {/* Voile sombre très léger et dégradé doux pour révéler la photo tout en protégeant les textes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

      {/* Contenu principal épuré et positionné plus bas avec animation de vague */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-10 sm:pt-36 md:pt-48 md:pb-14 w-full">
        <div className="max-w-2xl">
          {/* 1. Repère de marque avec déploiement de vague de gauche à droite */}
          <div
            className={`flex items-center gap-3 mb-3 transition-all duration-700 ease-out ${
              waveActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <span
              className={`block h-px bg-brand-gold shadow-sm transition-all duration-700 ease-out ${
                waveActive ? "w-8" : "w-0"
              }`}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-sm">
              BTP · Immobilier · Matériaux — Marcory
            </span>
          </div>

          {/* 2. Titre H1 avec onde séquentielle mot par mot de gauche à droite */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight leading-[1.16] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] max-w-xl">
            {/* Première ligne */}
            <span className="block overflow-hidden py-0.5">
              {["Bâtir,", "équiper", "et", "investir"].map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden mr-2">
                  <span
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      waveActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                    style={{ transitionDelay: `${wIdx * 90}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>

            {/* Deuxième ligne avec point culminant doré */}
            <span className="block overflow-hidden py-0.5">
              {[
                { text: "en", isGold: false },
                { text: "toute", isGold: false },
                { text: "sécurité", isGold: false },
                { text: "à", isGold: false },
                { text: "Abidjan.", isGold: true },
              ].map((item, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden mr-2">
                  <span
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      item.isGold ? "text-brand-gold text-wave-gold font-bold" : ""
                    } ${waveActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                    style={{ transitionDelay: `${(wIdx + 4) * 90}ms` }}
                  >
                    {item.text}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* 3. Vague graphique dorée animée de gauche à droite */}
          <div className="overflow-hidden my-3 w-52 sm:w-64 h-3.5">
            <svg
              className={`w-full h-full text-brand-gold transition-all duration-1000 ease-out ${
                waveActive ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
              }`}
              style={{ transitionDelay: "750ms" }}
              viewBox="0 0 240 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 7 C 20 1, 40 13, 60 7 C 80 1, 100 13, 120 7 C 140 1, 160 13, 180 7 C 200 1, 220 13, 240 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={waveActive ? "animate-wave-line" : ""}
              />
            </svg>
          </div>

          {/* 4. Description révélée par glissement d'onde de gauche à droite */}
          <p
            className={`text-xs sm:text-sm text-white/90 leading-relaxed mb-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-normal whitespace-normal md:whitespace-nowrap transition-all duration-700 ease-out ${
              waveActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "850ms" }}
          >
            Briques industrielles, terrains avec ACD, carrelages, sanitaires et outillage.
          </p>

          {/* 5. Boutons d'action compacts */}
          <div
            className={`flex flex-wrap items-center gap-2.5 mb-4 transition-all duration-700 ease-out ${
              waveActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "980ms" }}
          >
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-whatsapp text-white font-medium text-xs px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-all shadow-md shadow-black/40 hover:scale-[1.02]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Discuter sur WhatsApp
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-white hover:text-brand-blue border border-white/30 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-all backdrop-blur-sm shadow-md"
            >
              Nos 3 métiers
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Régimes de prix condensé */}
          <p
            className={`text-[10px] text-white/60 drop-shadow-sm transition-opacity duration-700 ${
              waveActive ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            Prix fixe en FCFA · Prix sur demande · Devis sous 24h
          </p>
        </div>
      </div>

      {/* Bandeau de chiffres avec fond sombre translucide très léger */}
      <div className="relative z-10 border-t border-white/15 bg-black/45 backdrop-blur-md">
        <dl className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-4 sm:px-6 py-7 sm:py-9 border-white/15 ${i % 2 === 0 ? "border-r" : ""} ${
                i < 2 ? "border-b lg:border-b-0" : ""
              } ${i < 3 ? "lg:border-r" : "lg:border-r-0"}`}
            >
              <dd className="text-3xl sm:text-4xl font-semibold text-white tracking-tight drop-shadow-sm">{s.value}</dd>
              <dt className="mt-2 text-xs sm:text-sm text-white/75">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
