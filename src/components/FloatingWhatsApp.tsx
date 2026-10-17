"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (dismissed) return;

    let isMounted = true;

    // Cycle d'apparition et de disparition fluide
    const showTooltip = () => {
      if (!isMounted || dismissed) return;
      setTooltipVisible(true);

      // Reste visible pendant 6.5 secondes pour lecture
      timerRef.current = setTimeout(() => {
        if (!isMounted || dismissed) return;
        setTooltipVisible(false);

        // Pause de 20 secondes avant de ressortir doucement
        timerRef.current = setTimeout(() => {
          showTooltip();
        }, 20000);
      }, 6500);
    };

    // Première apparition après 2 secondes d'arrivée sur le site
    timerRef.current = setTimeout(showTooltip, 2000);

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    setTooltipVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <aside
      aria-label="Contact WhatsApp rapide"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 pointer-events-auto select-none"
    >
      {/* Micro-bulle d'accroche WhatsApp animée : sort du bouton, reste 6s puis rentre */}
      <div
        className={`flex items-center gap-2.5 sm:gap-3 bg-white text-brand-blue border border-brand-border py-2.5 px-3 sm:px-4 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out max-w-[245px] sm:max-w-xs ${
          tooltipVisible && !dismissed
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-6 scale-90 pointer-events-none"
        }`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <div className="text-xs min-w-0">
          <span className="font-bold block leading-tight text-brand-blue text-[11px] sm:text-xs truncate sm:whitespace-normal">
            Besoin d&apos;un devis ou de briques ?
          </span>
          <span className="text-brand-muted text-[10px] sm:text-[11px] leading-tight block mt-0.5 truncate sm:whitespace-normal">
            Notre équipe à Marcory est en ligne
          </span>
        </div>
        <button
          onClick={handleClose}
          className="p-1 text-slate-400 hover:text-brand-blue hover:bg-slate-100 rounded-lg ml-0.5 sm:ml-1 transition-colors cursor-pointer flex-shrink-0"
          aria-label="Fermer le message"
          title="Masquer l'infobulle"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bouton Circulaire Officiel WhatsApp Business */}
      <a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-brand-whatsapp text-white shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Échanger avec SCI GLORIA sur WhatsApp"
        title="Ouvrir WhatsApp Business SCI GLORIA"
      >
        {/* Onde pulsante verte */}
        <span className="absolute inset-0 rounded-full bg-brand-whatsapp opacity-40 animate-ping pointer-events-none" />

        {/* Pastille verte 'En Ligne' */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />

        {/* Icône WhatsApp blanche officielle */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
      </a>
    </aside>
  );
}
