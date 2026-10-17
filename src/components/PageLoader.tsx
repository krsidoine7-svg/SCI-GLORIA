"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(true); // Défaut à true pour ne jamais bloquer

  useEffect(() => {
    // Le loader d'accueil ne s'affiche QUE sur la page d'accueil "/" et une seule fois par session
    if (pathname !== "/") {
      setIsDone(true);
      return;
    }

    // Affichage fluide de l'animation d'accueil à chaque chargement
    setIsDone(false);
    setProgress(0);
    setIsFading(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 50 ? 15 : 10;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    if (progress >= 100 && !isDone) {
      const timerFade = setTimeout(() => {
        setIsFading(true);
      }, 150);

      const timerDone = setTimeout(() => {
        setIsDone(true);
      }, 650);

      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerDone);
      };
    }
  }, [progress, isDone]);

  if (isDone) return null;

  const statusMessage =
    progress < 40
      ? "Connexion aux serveurs SCI GLORIA..."
      : progress < 80
      ? "Chargement du catalogue & des cotations BTP..."
      : "Ouverture de la plateforme...";

  return (
    <aside
      aria-label="Chargement de SCI GLORIA INVESTMENT & CO"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070F1E] text-white select-none transition-all duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none scale-102 blur-[2px]" : "opacity-100"
      }`}
    >
      {/* Halo lumineux d'ambiance doré & bleu nuit */}
      <div className="absolute w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-brand-blueLight/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Trame architecturale */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm text-center">
        {/* Emblème Architectural Vectoriel 24K Gold */}
        <div className="relative mb-7">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-brand-gold/30 p-4 backdrop-blur-md shadow-2xl flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="loaderGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>

              <polygon
                points="50,8 88,28 88,72 50,92 12,72 12,28"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="1.5"
                opacity="0.45"
              />

              <path
                d="M26 36 L50 20 L74 36"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path d="M34 68 V42" stroke="url(#loaderGoldGrad)" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 68 V32" stroke="url(#loaderGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M66 68 V42" stroke="url(#loaderGoldGrad)" strokeWidth="3" strokeLinecap="round" />

              <line
                x1="24"
                y1="70"
                x2="76"
                y2="70"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute -inset-1 rounded-2xl border border-brand-gold/15 animate-ping opacity-30 pointer-events-none" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white">
          SCI GLORIA
        </h1>
        <p className="text-[11px] uppercase tracking-[0.35em] text-brand-gold font-semibold mt-1">
          INVESTMENT &amp; CO
        </p>

        <div className="flex items-center gap-3 my-5 w-full justify-center opacity-70">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/30" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gray-300 font-medium">
            Abidjan • Marcory
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Jauge Laser Ultra-fine */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-300 to-brand-gold rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(245,158,11,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-56 sm:w-64 text-[11px] text-gray-400 font-mono">
          <span className="text-left text-gray-400 truncate pr-2 text-[10px] font-sans tracking-wide">
            {statusMessage}
          </span>
          <span className="text-brand-gold font-semibold tracking-wider">{progress}%</span>
        </div>
      </div>
    </aside>
  );
}
