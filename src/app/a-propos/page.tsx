import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { servicesData } from "@/data/services";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "À propos | SCI GLORIA INVESTMENT & CO",
  description:
    "SCI GLORIA INVESTMENT & CO : construction, fabrication de briques, gestion immobilière et vente de matériaux à Marcory, Abidjan.",
};

const commitments = [
  {
    title: "Des prix lisibles",
    text: "Prix fixe affiché en FCFA, prix sur demande selon le cours du jour, ou devis gratuit sous 24h. Jamais de surprise.",
  },
  {
    title: "Des documents vérifiés",
    text: "Chaque terrain proposé est présenté avec son statut juridique, notamment l'ACD, avant toute visite.",
  },
  {
    title: "Un interlocuteur direct",
    text: "Pas de paiement en ligne : vous échangez avec notre équipe sur WhatsApp, puis vous confirmez au magasin ou à la livraison.",
  },
  {
    title: "Un ancrage local",
    text: "Magasin, entrepôt et unité de fabrication réunis à Marcory, pour contrôler le stock et la qualité au même endroit.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-px bg-brand-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">À propos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] max-w-4xl">
              Bâtir, équiper et investir : une seule maison à Marcory.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              {companyData.name} réunit trois métiers au même endroit : la construction avec sa propre unité de
              briques, la gestion immobilière et la vente de matériaux.
            </p>
          </div>
        </section>

        {/* Les 3 métiers */}
        <section className="py-14 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue mb-10">Nos trois métiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesData.map((s, i) => (
                <article key={s.id} className="border border-brand-border rounded-2xl p-7 flex flex-col">
                  <span className="text-4xl font-semibold text-brand-gold mb-6">0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-brand-blue mb-3 leading-snug">
                    {s.title.replace(/^[0-9]\.\s*/, "")}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Nos engagements */}
        <section className="py-14 md:py-20 px-4 sm:px-6 bg-brand-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue mb-4">Nos engagements</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Ce que vous pouvez attendre de nous, à chaque commande et à chaque visite.
              </p>
            </div>
            <dl className="lg:col-span-8 divide-y divide-brand-border border-y border-brand-border">
              {commitments.map((c) => (
                <div key={c.title} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-6">
                  <dt className="font-semibold text-brand-blue">{c.title}</dt>
                  <dd className="sm:col-span-2 text-sm text-brand-muted leading-relaxed">{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Lieu */}
        <section className="py-14 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-brand-border rounded-3xl p-8 sm:p-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue mb-4">Venez voir sur place</h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-2">{companyData.address}.</p>
              <p className="text-sm text-brand-muted leading-relaxed">
                {companyData.hoursWeek} · {companyData.hoursSaturday}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-brand-blue text-white font-medium text-sm px-7 py-4 rounded-xl hover:bg-brand-blueLight transition-colors"
              >
                Plan d'accès et horaires
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-brand-whatsapp text-white font-medium text-sm px-7 py-4 rounded-xl hover:bg-emerald-600 transition-colors"
              >
                Écrire sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
