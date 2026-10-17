# Base de Connaissances — Design System & Tokens Visuels

## 1. Palette Officielle (Certifiée WCAG AA)
* **Fond Principal :** Blanc Pur `#FFFFFF` (dominant, aéré, lumière).
* **Surfaces & Cartes :** Gris Platine `#F8FAFC`.
* **Couleur Maîtresse Institutionnelle :** Bleu Nuit Profond `#0B192C` (textes majeurs, titres, cartes phares — Contraste 17.8:1 sur blanc).
* **Texte Secondaire :** Gris Métal `#4B5563` (fiches techniques, détails — Contraste 7.1:1 sur blanc).
* **Bordures :** Gris Délicat `#E5E7EB` (fines, discrètes).
* **Accent BTP / Devis :** Jaune Or Chantier `#F59E0B` (énergie, boutons devis).
* **Accent WhatsApp Direct :** Vert Officiel `#25D366` (réservé aux boutons de contact WhatsApp).

## 2. Typographie
* **Police Unique :** **Poppins** (Google Fonts).
* **Titres H1 :** Poppins Bold (700) — 56px desktop / 36px mobile.
* **Titres H2 :** Poppins SemiBold (600) — 34px desktop / 26px mobile.
* **Prix & Boutons :** Poppins Medium (500) — 16px.
* **Corps de texte :** Poppins Regular (400) — 16px / 15px interligne `1.6`.

## 3. Interaction Signature : Scroll Stacking Hybride
* **Cartes 01 & 02 :** S'empilent au défilement vertical façon Apple/Stripe (`sticky top-20` et `sticky top-24`).
* **Carte 03 (Matériaux) :** Arrive par glissement horizontal **de la droite vers la gauche** (`translateX(105% → 0%)`) asservi au scroll pour venir se caler au-dessus du stack.
* Implémentation : `position: sticky` natif CSS + calcul de scroll sans bibliothèque externe (60/120 FPS).

## 4. Écran de Chargement Immersif Corporate (`PageLoader.tsx`)
* **Fond :** Bleu nuit profond `#070F1E` avec trame architecturale millimétrée en filigrane.
* **Emblème :** Structure vectorielle or 24K (hexagone, fondations béton, 3 piliers d'univers BTP).
* **Jauge :** Ligne laser dorée ultra-fine de 2px, progression 0-100% en 1,1s et fondu de sortie cinéma.
* *Note : Zéro image d'avatar/lion sur l'écran d'accueil afin de préserver l'élégance institutionnelle.*

## 5. Animation de Vague Hero (`HeroSection.tsx`)
* Déclenchée automatiquement dès la fin du chargement initial (~1,1s).
* Déferlement séquentiel de gauche à droite :
  - Déploiement de la ligne de marque Marcory.
  - Titre H1 révélé mot par mot avec décalage d'onde de 90ms.
  - Onde liquide dorée SVG animée sous le titre.
  - Effet de brillance lumineuse continue sur "Abidjan".

## 6. Navigation Catalogue Mobile (`ProductGrid.tsx`)
* **Sur Mobile :** Carrousel horizontal fluide tactile (`snap-x snap-mandatory`), défilement des articles de gauche à droite au doigt sans allonger la page verticalement.
* **Bouton Fiche Dédiée :** Bouton clair *"Voir plus →"* sur chaque carte redirigeant vers `/produit/[slug]`.
* **Sur Desktop :** Grille aérée 3 colonnes.

