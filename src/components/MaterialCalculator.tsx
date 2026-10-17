"use client";

import { useState } from "react";
import {
  Calculator,
  Layers,
  Grid,
  CheckCircle2,
  ShoppingCart,
  ArrowRight,
  Info,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPriceFcfa } from "@/lib/whatsapp";

type CalculatorTab = "briques" | "carrelage";

export function MaterialCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("briques");
  const { addToCart, openCart } = useCart();

  // --- ÉTAT DU CALCULATEUR DE BRIQUES ---
  const [wallLength, setWallLength] = useState<number>(15); // mètres
  const [wallHeight, setWallHeight] = useState<number>(2.5); // mètres
  const [brickWastePercent, setBrickWastePercent] = useState<number>(5); // 5% de marge de casse
  const [selectedBrickType, setSelectedBrickType] = useState<"standard" | "pleine">("standard");

  // Constantes BTP Briques 15x20x40 cm : 12.5 briques par m² de mur
  const BRICKS_PER_M2 = 12.5;
  const brickPrice = selectedBrickType === "standard" ? 350 : 450;
  const brickProductId = selectedBrickType === "standard" ? "prod-001" : "prod-002";
  const brickLabel =
    selectedBrickType === "standard"
      ? "Brique Creuse 15 cm Standard"
      : "Brique Pleine 15 cm Haute Résistance";

  const wallArea = Math.max(0, Number((wallLength * wallHeight).toFixed(2)));
  const netBricks = Math.ceil(wallArea * BRICKS_PER_M2);
  const totalBricks = Math.ceil(netBricks * (1 + brickWastePercent / 100));
  const estimatedCementBags = Math.ceil(totalBricks / 75); // 1 sac CPJ 42.5 pour ~75 briques de 15
  const totalBrickPrice = totalBricks * brickPrice;

  // --- ÉTAT DU CALCULATEUR DE CARRELAGE ---
  const [roomLength, setRoomLength] = useState<number>(6); // mètres
  const [roomWidth, setRoomWidth] = useState<number>(5); // mètres
  const [tileWastePercent, setTileWastePercent] = useState<number>(10); // 10% de découpes & plinthes

  // Constantes Grès Cérame 60x60 cm : Carton de 4 carreaux = 1.44 m²
  const M2_PER_BOX = 1.44;
  const BOX_PRICE = 18000; // 18 000 FCFA le carton (soit 12 500 FCFA/m²)
  const tileProductId = "prod-009";

  const floorArea = Math.max(0, Number((roomLength * roomWidth).toFixed(2)));
  const areaWithWaste = Number((floorArea * (1 + tileWastePercent / 100)).toFixed(2));
  const totalBoxes = Math.ceil(areaWithWaste / M2_PER_BOX);
  const totalTileM2Covered = Number((totalBoxes * M2_PER_BOX).toFixed(2));
  const totalTilePrice = totalBoxes * BOX_PRICE;

  const handleAddBricksToCart = () => {
    addToCart(brickProductId, totalBricks);
    openCart();
  };

  const handleAddTilesToCart = () => {
    addToCart(tileProductId, totalBoxes);
    openCart();
  };

  return (
    <section id="calculateur" className="py-20 md:py-28 px-4 sm:px-6 bg-white scroll-mt-24 border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="block w-12 h-px bg-brand-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
              Outil d&apos;estimation chantier
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-blue tracking-tight leading-[1.12] mb-4">
            Simulateur de matériaux BTP.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Évitez les surplus coûteux et les arrêts de chantier. Calculez en quelques secondes le nombre exact de briques ou de carrelages nécessaires pour votre projet à Abidjan.
          </p>
        </div>

        {/* Sélecteur d'onglets (Briques vs Carrelage) */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("briques")}
            className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer shadow-xs ${
              activeTab === "briques"
                ? "bg-brand-blue text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers className="w-4 h-4 text-brand-gold" />
            <span>Calculateur de Briques</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("carrelage")}
            className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer shadow-xs ${
              activeTab === "carrelage"
                ? "bg-brand-blue text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Grid className="w-4 h-4 text-brand-gold" />
            <span>Calculateur de Carrelage</span>
          </button>
        </div>

        {/* CONTENU ONGLET 1 : BRIQUES INDUSTRIELLES */}
        {activeTab === "briques" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulaire de saisie des dimensions du mur (Col 1-7) */}
            <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-brand-blue flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-gold" />
                <span>Dimensions de votre mur ou clôture</span>
              </h3>

              {/* Choix du type de brique */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Modèle de brique industrielle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBrickType("standard")}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedBrickType === "standard"
                        ? "border-brand-blue bg-white ring-2 ring-brand-blue/15 shadow-xs"
                        : "border-brand-border bg-white/60 hover:bg-white"
                    }`}
                  >
                    <span className="font-bold text-sm text-brand-blue block">Brique Creuse 15 cm</span>
                    <span className="text-xs text-brand-muted">350 FCFA · Murs et clôtures</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBrickType("pleine")}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedBrickType === "pleine"
                        ? "border-brand-blue bg-white ring-2 ring-brand-blue/15 shadow-xs"
                        : "border-brand-border bg-white/60 hover:bg-white"
                    }`}
                  >
                    <span className="font-bold text-sm text-brand-blue block">Brique Pleine 15 cm</span>
                    <span className="text-xs text-brand-muted">450 FCFA · Fondations massives</span>
                  </button>
                </div>
              </div>

              {/* Champs Longueur et Hauteur */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="wall-length" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Longueur du mur (mètres)
                  </label>
                  <div className="relative">
                    <input
                      id="wall-length"
                      type="number"
                      step="0.5"
                      min="1"
                      max="500"
                      value={wallLength}
                      onChange={(e) => setWallLength(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-base font-bold text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">m</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="wall-height" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Hauteur du mur (mètres)
                  </label>
                  <div className="relative">
                    <input
                      id="wall-height"
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="50"
                      value={wallHeight}
                      onChange={(e) => setWallHeight(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-base font-bold text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">m</span>
                  </div>
                </div>
              </div>

              {/* Marge de casse conseillée */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider">Marge de sécurité BTP (chutes &amp; découpes)</span>
                  <span className="font-bold text-brand-blue">+{brickWastePercent}%</span>
                </div>
                <div className="flex items-center gap-3">
                  {[0, 5, 8, 10].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setBrickWastePercent(pct)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        brickWastePercent === pct
                          ? "bg-brand-blue text-white border-brand-blue"
                          : "bg-white text-slate-600 border-brand-border hover:border-brand-blue"
                      }`}
                    >
                      +{pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Raccourcis chantiers types à Abidjan */}
              <div className="pt-2 border-t border-brand-border flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Chantiers fréquents :</span>
                <button
                  type="button"
                  onClick={() => {
                    setWallLength(10);
                    setWallHeight(2.2);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Clôture 10m (2.2m haut)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWallLength(25);
                    setWallHeight(2.5);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Clôture parcelle 25m
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWallLength(4);
                    setWallHeight(2.8);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Cloison chambre 4m
                </button>
              </div>
            </div>

            {/* Carte de Résultat & Ajout direct au Panier (Col 8-12) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0B192C] to-[#07111E] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-gold/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">
                  Estimation Chantier SCI GLORIA
                </span>
                <span className="text-[11px] text-white/60">Norme 12.5 briques/m²</span>
              </div>

              {/* Résultat principal */}
              <div>
                <p className="text-xs text-white/70 mb-1">Nombre recommandé pour {wallArea} m² de mur :</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold tracking-tight">
                    {totalBricks.toLocaleString("fr-FR")}
                  </span>
                  <span className="text-base text-white font-semibold">briques vibrées</span>
                </div>
                <p className="text-[11px] text-white/60 mt-1">
                  Dont {netBricks} briques nettes + {(totalBricks - netBricks)} briques de réserve ({brickWastePercent}% de sécurité).
                </p>
              </div>

              {/* Détails complémentaires chantier */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-white/80">
                  <span>Modèle sélectionné</span>
                  <span className="font-semibold text-white">{brickLabel}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Prix unitaire usine</span>
                  <span className="font-semibold text-white">{formatPriceFcfa(brickPrice)} / unité</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Ciment estimé pour le mortier</span>
                  <span className="font-semibold text-brand-gold">~{estimatedCementBags} sacs de 50 kg</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-white">Sous-total estimé :</span>
                  <span className="text-xl font-bold text-brand-gold">
                    {formatPriceFcfa(totalBrickPrice)}
                  </span>
                </div>
              </div>

              {/* Bouton pour ajouter le lot calculé directement au Panier de Devis */}
              <button
                type="button"
                onClick={handleAddBricksToCart}
                className="w-full inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-blue font-bold text-sm py-4 px-6 rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-brand-gold/20 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-5 h-5 text-brand-blue" />
                <span>Ajouter ces {totalBricks.toLocaleString("fr-FR")} briques au devis</span>
              </button>

              <p className="text-[10px] text-center text-white/50 leading-relaxed">
                Prix usine indicatif hors transport camion-grue. À valider sur devis WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* CONTENU ONGLET 2 : CARRELAGE GRÈS CÉRAME */}
        {activeTab === "carrelage" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulaire de saisie des dimensions de la pièce (Col 1-7) */}
            <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-brand-blue flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-gold" />
                <span>Dimensions de la pièce à carreler</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="room-length" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Longueur de la pièce (mètres)
                  </label>
                  <div className="relative">
                    <input
                      id="room-length"
                      type="number"
                      step="0.5"
                      min="1"
                      max="100"
                      value={roomLength}
                      onChange={(e) => setRoomLength(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-base font-bold text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">m</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="room-width" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Largeur de la pièce (mètres)
                  </label>
                  <div className="relative">
                    <input
                      id="room-width"
                      type="number"
                      step="0.5"
                      min="1"
                      max="100"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-base font-bold text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">m</span>
                  </div>
                </div>
              </div>

              {/* Marge de chutes & plinthes */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider">Marge pour découpes, angles &amp; plinthes</span>
                  <span className="font-bold text-brand-blue">+{tileWastePercent}%</span>
                </div>
                <div className="flex items-center gap-3">
                  {[5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTileWastePercent(pct)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        tileWastePercent === pct
                          ? "bg-brand-blue text-white border-brand-blue"
                          : "bg-white text-slate-600 border-brand-border hover:border-brand-blue"
                      }`}
                    >
                      +{pct}% {pct === 10 ? "(Standard)" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pièces types à Abidjan */}
              <div className="pt-2 border-t border-brand-border flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Pièces types :</span>
                <button
                  type="button"
                  onClick={() => {
                    setRoomLength(6);
                    setRoomWidth(5);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Grand Salon (30 m²)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRoomLength(4);
                    setRoomWidth(3.5);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Chambre Principale (14 m²)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRoomLength(10);
                    setRoomWidth(8);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white border border-brand-border hover:border-brand-blue text-slate-700 font-medium cursor-pointer"
                >
                  Appartement 3P (80 m²)
                </button>
              </div>
            </div>

            {/* Carte de Résultat Carrelage (Col 8-12) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0B192C] to-[#07111E] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-gold/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">
                  Estimation Carrelage 60x60
                </span>
                <span className="text-[11px] text-white/60">Carton de 1.44 m²</span>
              </div>

              {/* Résultat principal */}
              <div>
                <p className="text-xs text-white/70 mb-1">Conditionnement nécessaire pour {floorArea} m² :</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold tracking-tight">
                    {totalBoxes}
                  </span>
                  <span className="text-base text-white font-semibold">cartons</span>
                </div>
                <p className="text-[11px] text-white/60 mt-1">
                  Soit {totalTileM2Covered} m² réels couverts (inclut {tileWastePercent}% pour chutes et coupes).
                </p>
              </div>

              {/* Détails complémentaires */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-white/80">
                  <span>Modèle calculé</span>
                  <span className="font-semibold text-white">Grès Cérame 60x60 Poli Miroir</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Prix au carton</span>
                  <span className="font-semibold text-white">{formatPriceFcfa(BOX_PRICE)} (1.44 m²)</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Équivalent au m²</span>
                  <span className="font-semibold text-brand-gold">12 500 FCFA / m²</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-white">Sous-total estimé :</span>
                  <span className="text-xl font-bold text-brand-gold">
                    {formatPriceFcfa(totalTilePrice)}
                  </span>
                </div>
              </div>

              {/* Bouton pour ajouter ces cartons au devis */}
              <button
                type="button"
                onClick={handleAddTilesToCart}
                className="w-full inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-blue font-bold text-sm py-4 px-6 rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-brand-gold/20 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-5 h-5 text-brand-blue" />
                <span>Ajouter ces {totalBoxes} cartons au devis</span>
              </button>

              <p className="text-[10px] text-center text-white/50 leading-relaxed">
                Disponible au showroom Marcory. Devis complet avec colle et joints sur WhatsApp.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
