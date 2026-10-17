"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto select-none">
      {/* Micro-bulle d'accroche WhatsApp */}
      {tooltipVisible && (
        <div className="hidden sm:flex items-center gap-3 bg-white text-brand-blue border border-brand-border py-2.5 px-4 rounded-2xl shadow-xl animate-in fade-in slide-in-from-right-4 duration-300 max-w-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold block leading-tight text-brand-blue">
              Besoin d'un devis ou de briques ?
            </span>
            <span className="text-brand-muted text-[11px]">
              Notre équipe à Marcory est en ligne
            </span>
          </div>
          <button
            onClick={() => setTooltipVisible(false)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg ml-1 transition-colors"
            aria-label="Fermer le message"
            title="Masquer l'infobulle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bouton Circulaire Officiel WhatsApp Business */}
      <a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-whatsapp text-white shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Échanger avec SCI GLORIA sur WhatsApp"
        title="Ouvrir WhatsApp Business SCI GLORIA"
      >
        {/* Onde pulsante verte */}
        <span className="absolute inset-0 rounded-full bg-brand-whatsapp opacity-40 animate-ping pointer-events-none" />

        {/* Pastille verte 'En Ligne' */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />

        {/* Icône WhatsApp blanche officielle */}
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
}
