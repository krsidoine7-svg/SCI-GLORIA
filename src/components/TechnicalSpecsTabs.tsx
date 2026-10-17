"use client";

import { useState } from "react";
import { Download, CheckCircle2, ShieldCheck, Printer } from "lucide-react";
import type { Product, DetailedSpecTab } from "@/types";

interface TechnicalSpecsTabsProps {
  product: Product;
}

// Générateur intelligent de 4 onglets par défaut si non spécifié explicitement
function getDefaultTabsForProduct(product: Product): DetailedSpecTab[] {
  const specs = product.specs;
  const half = Math.ceil(specs.length / 2);

  if (product.category === "construction") {
    return [
      {
        id: "caracteristiques",
        label: "1. Caractéristiques & Matière",
        blocks: [
          {
            title: "Composition & Matières Premières",
            description:
              "Formulation industrielle à base de ciment CPJ 42.5 haute performance et agrégats criblés sans impuretés pour une densité maximale.",
            specs: specs.slice(0, Math.min(3, specs.length)),
          },
          {
            title: "Géométrie & Tolérances Dimensionnelles",
            description:
              "Calibrage au millimètre par presse vibrante assurant des arêtes nettes et une planéité parfaite, réduisant la consommation de mortier de pose.",
            specs: specs.slice(Math.min(3, specs.length)),
          },
        ],
      },
      {
        id: "performances",
        label: "2. Résistance & Performances",
        blocks: [
          {
            title: "Résistance Mécanique à la Compression",
            description:
              "Testée selon les exigences du génie civil ivoirien. Supporte les charges élevées d'ouvrages porteurs et de structures R+2 et plus.",
            specs: [
              { label: "Résistance nominale", value: "≥ 4.5 à 7.0 MPa certifiée" },
              { label: "Classe de résistance", value: "BTP Génie Civil Catégorie 1" },
              { label: "Vibration mécanique", value: "3000 tr/min sous presse" },
            ],
          },
          {
            title: "Comportement Humidité & Climat",
            description:
              "Matériau adapté au climat tropical humide d'Abidjan, minimisant la porosité capillaire et prévenant les infiltrations d'eau.",
            specs: [
              { label: "Absorption d'eau", value: "Inférieure à 8% en masse" },
              { label: "Stabilité thermique", value: "Inerte au fort ensoleillement" },
              { label: "Durabilité structurelle", value: "+50 ans en environnement urbain" },
            ],
          },
        ],
      },
      {
        id: "mise-en-oeuvre",
        label: "3. Mise en Œuvre & Normes",
        blocks: [
          {
            title: "Règles d'Assemblage Chantier",
            description:
              "Pose au mortier de ciment dosé à 250-300 kg/m³. Arrosage préalable recommandé avant scellement pour optimiser l'adhérence.",
            specs: [
              { label: "Mortier recommandé", value: "Ciment CPJ 42.5 + sable fin lavé" },
              { label: "Épaisseur des joints", value: "10 à 15 mm réguliers" },
              { label: "Consommation mortier", value: "Faible grâce à la régularité" },
            ],
          },
          {
            title: "Homologations & Contrôle Qualité",
            description:
              "Chaque lot fait l'objet d'un prélèvement et d'un contrôle rigoureux de résistance avant expédition depuis notre usine.",
            specs: [
              { label: "Contrôle qualité", value: "Écrasement d'échantillons en laboratoire" },
              { label: "Conformité", value: "Norme ivoirienne de construction BTP" },
              { label: "Traçabilité", value: "Bon de fabrication daté joint" },
            ],
          },
        ],
      },
      {
        id: "logistique",
        label: "4. Conditionnement & Logistique",
        blocks: [
          {
            title: "Conditionnement Usine",
            description:
              "Disponible en vrac sécurisé ou palettisé avec cerclage renforcé pour limiter tout risque de bris pendant le transport.",
            specs: [
              { label: "Conditionnement", value: "Vrac ou palettes filmées" },
              { label: "Poids unitaire", value: "14.5 kg à 22 kg selon format" },
              { label: "Manutention", value: "Manuelle ou par chariot élévateur" },
            ],
          },
          {
            title: "Livraison sur Chantier Abidjan",
            description:
              "Flotte de camions grues et bennes pour approvisionnement ponctuel ou échelonné selon le planning d'avancement de vos travaux.",
            specs: [
              { label: "Délai moyen", value: "24h à 48h après validation devis" },
              { label: "Périmètre de livraison", value: "Tout Abidjan & banlieues" },
              { label: "Déchargement", value: "Inclus directement au sol du chantier" },
            ],
          },
        ],
      },
    ];
  }

  if (product.category === "immobilier") {
    return [
      {
        id: "statut-juridique",
        label: "1. Statut Foncier & Juridique",
        blocks: [
          {
            title: "Titre Foncier & Sécurisation",
            description:
              "Tous les biens présentés font l'objet d'une vérification notariale approfondie auprès de la conservation foncière et du Ministère.",
            specs: [
              { label: "Statut officiel", value: "ACD vérifié ou Permis de Construire" },
              { label: "Origine de propriété", value: "Chaîne d'actes authentiques continue" },
              { label: "Formalisation", value: "Signature exclusive devant Notaire" },
            ],
          },
          {
            title: "Cadastre & Bornage",
            description:
              "Bornage contradictoire exécuté par un géomètre expert agréé avec pose de balises homologuées sur le terrain.",
            specs: [
              { label: "Bornage", value: "Contradictoire et certifié géomètre" },
              { label: "Plan de situation", value: "Fourni avec extrait topographique" },
              { label: "Litiges", value: "Zéro litige, bien libre de toute hypothèque" },
            ],
          },
        ],
      },
      {
        id: "viabilisation",
        label: "2. Viabilisation & Réseaux",
        blocks: [
          {
            title: "Dessertes & Infrastructures",
            description:
              "Zone accessible par voies décapées ou bitumées, adaptée à l'accès de véhicules légers et camions de chantier de construction.",
            specs: [
              { label: "Accès routier", value: "Voie bitumée ou stabilisée praticable" },
              { label: "Topographie", value: "Terrain sec et plat, hors zone inondable" },
              { label: "Assainissement", value: "Pente naturelle d'écoulement pluvial" },
            ],
          },
          {
            title: "Réseaux Publics CIE / SODECI",
            description:
              "Raccordement aux réseaux d'eau potable et d'électricité disponible à proximité immédiate de la parcelle.",
            specs: [
              { label: "Eau potable", value: "Réseau SODECI raccordable" },
              { label: "Électricité", value: "Poteaux CIE en bordure" },
              { label: "Télécom", value: "Fibre optique et 4G/5G disponibles" },
            ],
          },
        ],
      },
      {
        id: "sol-architecture",
        label: "3. Sol & Potentiel Bâtissable",
        blocks: [
          {
            title: "Caractéristiques Géotechniques",
            description:
              "Sol portant naturel ne nécessitant pas de fondations spéciales ni de remblai excessif, garantissant un coût BTP maîtrisé.",
            specs: [
              { label: "Nature du sol", value: "Terre ferme sablo-argileuse portante" },
              { label: "Niveau de nappe", value: "Profonde, absence d'humidité stagnante" },
              { label: "Travaux préliminaires", value: "Prêt à bâtir après simple décapage" },
            ],
          },
          {
            title: "Typologie de Construction Autorisée",
            description:
              "Zone résidentielle ou commerciale propice aux villas modernes, duplex standing ou immeubles de rapport R+2 à R+4.",
            specs: [
              { label: "Usage", value: "Résidentiel unifamilial ou collectif" },
              { label: "Coefficient d'emprise", value: "Conforme plan d'urbanisme" },
              { label: "Environnement", value: "Quartier en plein développement sécurisé" },
            ],
          },
        ],
      },
      {
        id: "modalites",
        label: "4. Modalités d'Acquisition",
        blocks: [
          {
            title: "Visite & Réservation",
            description:
              "Visites guidées organisées du lundi au samedi sur le site avec un conseiller foncier dédié et géomètre sur demande.",
            specs: [
              { label: "Visites terrain", value: "Du lundi au samedi sur rendez-vous" },
              { label: "Réservation", value: "Sous protocole écrit et séquestre notarié" },
              { label: "Délai de signature", value: "Acte notarié sous 30 jours ouvrés" },
            ],
          },
          {
            title: "Facilités & Accompagnement BTP",
            description:
              "Bénéficiez des tarifs préférentiels SCI GLORIA sur les briques et matériaux pour entamer votre construction immédiatement.",
            specs: [
              { label: "Paiement", value: "Comptant ou échelonné selon contrat" },
              { label: "Diaspora", value: "Gestion par procuration notariée sécurisée" },
              { label: "Pack BTP Gloria", value: "Réduction gros œuvre sur votre chantier" },
            ],
          },
        ],
      },
    ];
  }

  // Pôle Matériaux & Outillage
  return [
    {
      id: "matiere-finition",
      label: "1. Caractéristiques & Matière",
      blocks: [
        {
          title: "Composition & Fabrication Certifiée",
          description:
            "Matériaux de premier choix répondant aux normes sanitaires et architecturales les plus exigeantes du marché international.",
          specs: specs.slice(0, half),
        },
        {
          title: "Design & Qualité de Surface",
          description:
            "Finitions premium haute résistance aux rayures, aux agents chimiques ménagers et à l'usure continue.",
          specs: specs.slice(half),
        },
      ],
    },
    {
      id: "performances-tests",
      label: "2. Résistance & Performances",
      blocks: [
        {
          title: "Tests de Durabilité & Charge",
          description:
            "Composants testés pour un usage intensif en milieu résidentiel standing ou locaux commerciaux à fort passage.",
          specs: [
            { label: "Résistance aux chocs", value: "Haute tolérance mécanique" },
            { label: "Imperméabilité", value: "Émail vitrifié non poreux" },
            { label: "Comportement thermique", value: "Inaltérable à la chaleur et humidité" },
          ],
        },
        {
          title: "Hygiène & Facilité d'Entretien",
          description:
            "Surfaces traitées anti-dépôt et anti-calcaire facilitant un entretien hygiénique rapide sans agresser les finitions.",
          specs: [
            { label: "Traitement de surface", value: "Anti-bactérien et anti-taches" },
            { label: "Nettoyage", value: "Compatible tous détergents courants" },
            { label: "Tenue des teintes", value: "Protection UV contre la décoloration" },
          ],
        },
      ],
    },
    {
      id: "installation",
      label: "3. Mise en Œuvre & Normes",
      blocks: [
        {
          title: "Conseils d'Installation Professionnelle",
          description:
            "Pose recommandée par un artisan qualifié avec respect des notices de fixation et temps de séchage préconisés.",
          specs: [
            { label: "Compatibilité", value: "Standards BTP et plomberie Côte d'Ivoire" },
            { label: "Accessoires requis", value: "Colles et joints disponibles en magasin" },
            { label: "Notice technique", value: "Schéma d'installation fourni" },
          ],
        },
        {
          title: "Normes & Homologations Sanitaires",
          description:
            "Certificats d'homologation CE et contrôles d'étanchéité d'usine garantissant une sécurité d'utilisation totale.",
          specs: [
            { label: "Homologation", value: "Conforme normes européennes CE / ISO" },
            { label: "Sécurité", value: "Tolérance certifiée aux surpressions" },
            { label: "Traçabilité", value: "Garantie usine d'origine" },
          ],
        },
      ],
    },
    {
      id: "garantie-retrait",
      label: "4. Conditionnement & Garantie",
      blocks: [
        {
          title: "Emballage & Protection",
          description:
            "Cartons renforcés avec calage intérieur haute densité pour préserver l'intégrité du produit jusqu'à votre chantier.",
          specs: [
            { label: "Conditionnement", value: "Emballage d'origine scellé" },
            { label: "Contrôle avant retrait", value: "Ouverture et vérification au comptoir" },
            { label: "Disponibilité", value: "Stock réel au showroom de Marcory" },
          ],
        },
        {
          title: "Garantie & Service Après-Vente",
          description:
            "Comptoir SAV dédié à notre magasin de Marcory en bas du pont, près de la pharmacie Tiaco.",
          specs: [
            { label: "Garantie légale", value: "1 à 5 ans selon catégorie de produit" },
            { label: "Retrait gratuit", value: "Comptoir Marcory du lundi au samedi" },
            { label: "Livraison", value: "Expédition possible sur vos chantiers" },
          ],
        },
      ],
    },
  ];
}

export function TechnicalSpecsTabs({ product }: TechnicalSpecsTabsProps) {
  const tabs = product.detailedTabs || getDefaultTabsForProduct(product);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full mt-14 pt-10 border-t border-brand-border/80">
      {/* En-tête de la section Fiche Technique */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-brand-gold font-bold block mb-2">
            Certification Technique Normée
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue tracking-tight">
            Spécifications Techniques Homologuées
          </h2>
        </div>

        {/* Bouton interactif Télécharger / Imprimer la Fiche PDF */}
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 self-start md:self-auto text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-blueLight bg-brand-surface hover:bg-slate-100 border border-brand-border px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer group"
          title="Imprimer ou enregistrer en PDF la fiche technique"
        >
          <Printer className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
          <span>Télécharger la Fiche Technique (PDF)</span>
        </button>
      </div>

      {/* Barre d'onglets horizontaux numérotés */}
      <div className="bg-[#F0F5FA] p-1.5 rounded-2xl flex flex-wrap gap-1 mb-8" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex-1 min-w-[140px] sm:min-w-[180px] text-xs sm:text-sm py-3 px-4 rounded-xl font-medium transition-all text-center cursor-pointer ${
                isActive
                  ? "bg-white text-brand-blue font-semibold shadow-xs"
                  : "text-slate-600 hover:text-brand-blue hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Conteneur principal de l'onglet actif : 2 blocs/colonnes */}
      <div className="bg-[#F7FAFD] border border-brand-border/80 rounded-3xl p-6 sm:p-9 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {activeTab.blocks.map((block, idx) => (
            <div key={idx} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-brand-blue">
                    {block.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {block.description}
                </p>
              </div>

              {/* Tableau de spécifications avec bandes contrastées comme sur la maquette */}
              <div className="rounded-2xl overflow-hidden border border-brand-border/70 shadow-xs bg-white">
                <dl className="divide-y divide-brand-border/50">
                  {block.specs.map((spec, sIdx) => {
                    const isEven = sIdx % 2 === 0;
                    return (
                      <div
                        key={sIdx}
                        className={`flex items-center justify-between gap-4 py-3.5 px-4 text-xs sm:text-sm transition-colors ${
                          isEven ? "bg-white" : "bg-[#F3F8FC]/60"
                        }`}
                      >
                        <dt className="text-slate-600 font-medium">{spec.label}</dt>
                        <dd className="font-bold text-brand-blue text-right">{spec.value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          ))}
        </div>

        {/* Pied de la fiche technique avec rappel de certification */}
        <div className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Spécifications certifiées par le bureau technique de SCI GLORIA</span>
          </div>
          <span className="text-[11px] text-brand-muted">
            Droit OHADA & Réglementation BTP Côte d&apos;Ivoire
          </span>
        </div>
      </div>
    </div>
  );
}
