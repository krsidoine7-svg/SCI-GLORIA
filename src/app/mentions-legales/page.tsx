import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Mentions Légales & Conformité | SCI GLORIA INVESTMENT & CO",
  description:
    "Mentions légales, politique de confidentialité, conformité droit ivoirien (Loi n° 2013-450, ARTCI) et informations juridiques de SCI GLORIA INVESTMENT & CO.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* En-tête */}
        <section className="bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-px bg-brand-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">
                Cadre Juridique & Conformité
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] max-w-4xl">
              Mentions Légales & Politique de Confidentialité
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
              Informations réglementaires régies par le droit de la République de Côte d'Ivoire et les dispositions de l'OHADA.
            </p>
          </div>
        </section>

        {/* Contenu textuel structuré */}
        <section className="py-14 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12 text-sm text-brand-muted leading-relaxed">
            
            {/* 1. Éditeur */}
            <div>
              <h2 className="text-xl font-semibold text-brand-blue mb-4">
                1. Éditeur du Site
              </h2>
              <p className="mb-3">
                Le présent site internet accessible à l'adresse <strong className="text-brand-blue">https://scigloria.ci</strong> est édité par la société :
              </p>
              <div className="bg-brand-surface p-5 rounded-2xl border border-brand-border space-y-2">
                <p><strong className="text-brand-blue">Dénomination sociale :</strong> {companyData.name}</p>
                <p><strong className="text-brand-blue">Siège d'exploitation :</strong> {companyData.address}</p>
                <p><strong className="text-brand-blue">Activités :</strong> Travaux de construction BTP, fabrication industrielle de briques, gestion et promotion immobilière, vente d'outillage et matériaux.</p>
                <p><strong className="text-brand-blue">Téléphone / WhatsApp commercial :</strong> {companyData.whatsappDisplay}</p>
                <p><strong className="text-brand-blue">Pays d'immatriculation :</strong> République de Côte d'Ivoire (Droit OHADA)</p>
              </div>
            </div>

            {/* 2. Absence de paiement bancaire en ligne */}
            <div>
              <h2 className="text-xl font-semibold text-brand-blue mb-4">
                2. Modèle de Vente & Absence de Paiement en Ligne
              </h2>
              <p className="mb-3">
                Pour garantir la sécurité absolue des transactions et prémunir les acquéreurs contre toute tentative de fraude ou d'usurpation :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-brand-blue">Aucun paiement par carte bancaire ou prélèvement automatique</strong> n'est exécuté directement sur ce site web.
                </li>
                <li>
                  Les demandes formulées depuis le catalogue constituent des pré-commandes ou des demandes de devis transmis à notre équipe commerciale via WhatsApp Business ou par rendez-vous physique.
                </li>
                <li>
                  Tout règlement final s'effectue exclusivement au comptoir de notre magasin de Marcory ou selon les modalités contractuelles convenues de gré à gré (virement bancaire d'entreprise, chèque certifié, ou paiement à la livraison après inspection des matériaux).
                </li>
              </ul>
            </div>

            {/* 3. Protection des données personnelles (Loi n° 2013-450) */}
            <div>
              <h2 className="text-xl font-semibold text-brand-blue mb-4">
                3. Protection des Données Personnelles & ARTCI
              </h2>
              <p className="mb-3">
                Conformément à la <strong className="text-brand-blue">Loi n° 2013-450 du 19 juin 2013</strong> relative à la protection des données à caractère personnel en Côte d'Ivoire, régulée par l'ARTCI (Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire) :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Les informations saisies sur le formulaire de contact (nom, besoin, message) ne sont ni stockées dans une base de données publique, ni vendues, ni cédées à des tiers.
                </li>
                <li>
                  Elles sont exclusivement utilisées pour générer le message de contact pré-rempli dans l'application WhatsApp de l'utilisateur à des fins d'échange commercial privé.
                </li>
                <li>
                  Vous disposez d'un droit permanent d'accès, de rectification et de suppression de vos échanges en nous contactant directement à notre siège de Marcory ou sur WhatsApp au <strong className="text-brand-blue">{companyData.whatsappDisplay}</strong>.
                </li>
              </ul>
            </div>

            {/* 4. Propriété intellectuelle */}
            <div>
              <h2 className="text-xl font-semibold text-brand-blue mb-4">
                4. Propriété Intellectuelle
              </h2>
              <p>
                L'ensemble des éléments graphiques, photographies, fiches techniques, logos et textes composant ce site sont la propriété exclusive de <strong className="text-brand-blue">{companyData.name}</strong> ou font l'objet d'une autorisation d'utilisation. Toute reproduction totale ou partielle sans accord préalable écrit est formellement interdite.
              </p>
            </div>

            {/* 5. Droit applicable et juridiction */}
            <div>
              <h2 className="text-xl font-semibold text-brand-blue mb-4">
                5. Droit Applicable & Litiges
              </h2>
              <p>
                Le présent site est soumis au droit positif en vigueur en République de Côte d'Ivoire et aux actes uniformes de l'OHADA. Tout différend relatif à l'interprétation ou à l'exécution qui n'aurait pu trouver de règlement amiable sera soumis aux juridictions compétentes d'Abidjan.
              </p>
            </div>

            {/* Bouton retour */}
            <div className="pt-8 border-t border-brand-border">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-brand-blueLight transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
