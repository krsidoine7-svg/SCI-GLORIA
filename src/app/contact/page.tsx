import type { Metadata } from "next";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactForm } from "@/components/ContactForm";
import { companyData } from "@/data/company";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & accès à Marcory | SCI GLORIA INVESTMENT & CO",
  description:
    "Retrouvez notre magasin et entrepôt à Marcory, en bas du pont, près de la pharmacie Tiaco. Horaires, itinéraire et contact WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-px bg-brand-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">Contact</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] max-w-3xl">
              Rendez-nous visite à Marcory, ou écrivez-nous.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              {companyData.address}.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Coordonnées et plan */}
            <div className="lg:col-span-6">
              <dl className="divide-y divide-brand-border border-y border-brand-border mb-10">
                <div className="flex gap-4 py-5">
                  <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-sm text-brand-muted mb-1">Adresse</dt>
                    <dd className="text-brand-blue font-medium">{companyData.address}</dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-sm text-brand-muted mb-1">Horaires</dt>
                    <dd className="text-brand-blue font-medium">{companyData.hoursWeek}</dd>
                    <dd className="text-brand-blue font-medium">{companyData.hoursSaturday}</dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-sm text-brand-muted mb-1">Téléphone et WhatsApp</dt>
                    <dd>
                      <a href={`tel:${companyData.phone}`} className="text-brand-blue font-medium hover:text-brand-gold">
                        {companyData.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={companyData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-brand-blue text-white font-medium text-sm px-7 py-4 rounded-xl hover:bg-brand-blueLight transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Itinéraire Google Maps
                </a>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-brand-border text-brand-blue font-medium text-sm px-7 py-4 rounded-xl hover:border-brand-blue transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp direct
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl border border-brand-border">
                <iframe
                  title="Plan d'accès SCI GLORIA à Marcory, près de la pharmacie Tiaco"
                  src="https://www.google.com/maps?q=Pharmacie+Tiaco+Marcory+Abidjan&output=embed"
                  className="w-full h-[360px] block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-6">
              <div className="border border-brand-border rounded-3xl bg-brand-surface p-7 sm:p-10">
                <h2 className="text-2xl font-semibold text-brand-blue mb-2">Dites-nous ce qu'il vous faut</h2>
                <p className="text-sm text-brand-muted mb-8">
                  Réponse de notre équipe sur WhatsApp, avec un devis gratuit sous 24h.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
