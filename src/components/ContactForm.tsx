"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

const needs = [
  "Commande de briques",
  "Devis pour un chantier",
  "Achat de matériaux ou d'outillage",
  "Terrain ou bien immobilier",
  "Gestion locative",
  "Autre demande",
];

/**
 * Formulaire sans serveur : les informations saisies sont assemblées en un message
 * WhatsApp pré-rempli, envoyé à l'équipe commerciale (aucune donnée stockée sur le site).
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState(needs[0]);
  const [message, setMessage] = useState("");

  const text =
    `Bonjour SCI GLORIA INVESTMENT & CO,\n\n` +
    `Je m'appelle ${name.trim() || "..."}.\n` +
    `Objet : ${need}\n` +
    (message.trim() ? `\n${message.trim()}\n` : "") +
    `\nMerci de me recontacter.`;

  const fieldClass =
    "w-full rounded-xl border border-brand-border bg-white px-4 py-3.5 text-sm text-brand-blue placeholder:text-gray-400 focus:outline-none focus:border-brand-blue transition-colors";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(buildGeneralWhatsAppUrl(text), "_blank", "noopener,noreferrer");
      }}
      className="space-y-5"
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-brand-blue mb-2">
          Votre nom
        </label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Kouassi Yao"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-need" className="block text-sm font-medium text-brand-blue mb-2">
          Votre besoin
        </label>
        <select
          id="contact-need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={fieldClass}
        >
          {needs.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-brand-blue mb-2">
          Détails (quantité, lieu, délai...)
        </label>
        <textarea
          id="contact-message"
          rows={5}
          maxLength={800}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre projet en quelques lignes."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-whatsapp text-white font-medium text-sm px-8 py-4 rounded-xl hover:bg-emerald-600 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Envoyer sur WhatsApp
      </button>
      <p className="text-xs text-brand-muted">
        Le message s'ouvre dans WhatsApp, prêt à envoyer. Rien n'est enregistré sur ce site.
      </p>
    </form>
  );
}
