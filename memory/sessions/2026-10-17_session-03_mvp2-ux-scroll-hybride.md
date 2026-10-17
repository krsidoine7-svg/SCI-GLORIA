# Session 03 : Déploiement MVP 2, Calculateur BTP, Loader Architectural, Scroll Hybride & UX Mobile

- **Date & Heure :** 2026-10-17 00:30 (Clôture à 09:45)
- **Participants :** Utilisateur (Vibe Coder) + [CHEF DE PROJET], [DIRECTEUR ARTISTIQUE], [DÉVELOPPEUR FRONT], [DÉVELOPPEUR BACK], [QA & PERFORMANCE]
- **Statut :** Clôturée, Compilée (19/19 SSG) & Poussée sur GitHub

---

## 1. Ce qui a été réalisé & livré

### A. Panier de Devis Groupé avec Quantités (`M05`)
- Création d'un système complet et séparé pour le Panier de Devis (`CartContext.tsx`, `CartDrawer.tsx`) et les Favoris (`FavoritesContext.tsx`, `FavoritesDrawer.tsx`).
- Réglage en direct des quantités par produit (`-`, `+`, ou saisie directe).
- Raccourcis gros volumes pour les briques (500, 1 000, 2 000 et 5 000 unités).
- Calcul dynamique automatique des sous-totaux par ligne et du total estimé du chantier en FCFA.
- Bouton d'action standardisé : *"Commande & Devis"*.

### B. Génération de Ticket Proforma BTP WhatsApp Officiel
- Remplacement des messages WhatsApp génériques par un **Ticket Devis Pro officiel** structuré :
  - En-tête officiel SCI GLORIA avec mention légale Marcory en bas du pont.
  - Référence unique horodatée (`DEV-YYYYMMDD-XXXX`).
  - Détail chiffré de chaque article, conditionnement, quantité et sous-total.
  - Total général estimé en FCFA.
  - Champs pré-remplis pour les coordonnées client (Nom, Chantier, Ville/Commune).

### C. Simulateur & Calculateur de Matériaux BTP (`MVP2-T05` / `M10-B`)
- Composant interactif autonome [MaterialCalculator.tsx](file:///c:/Users/Toto.ADMINISTRATOR/Desktop/Projects/PROJECT%20PARTENAIRE/GLORIA%20INST/SCI%20GLORIA/src/components/MaterialCalculator.tsx).
- **Module Briques (15x20x40 cm)** : saisie de la surface de mur en m², calcul automatique du nombre exact de briques (12,5 briques/m²) + marge de casse de 5% + estimation des sacs de ciment 42.5 nécessaires.
- **Module Carrelage (60x60 cm)** : saisie de la surface au sol en m², conversion automatique en cartons de 4 carreaux (1,44 m²/carton) + marge de casse/découpes de 10%.
- Bouton 1-clic pour injecter directement le volume calculé dans le Panier de Devis.

### D. Barre de Recherche Instantanée dans le Catalogue (`MVP2-T04` / `M04-B`)
- Filtre dynamique multi-champs en temps réel sur le nom, la sous-catégorie, les caractéristiques techniques et les cotes.
- Compteur de résultats en direct et bouton d'effacement rapide.

### E. Écran de Chargement Immersif Corporate (`PageLoader.tsx`)
- Splash screen haute horlogerie / architecture de luxe sans image de lion :
  - Emblème géométrique vectoriel or 24K (hexagone de structure, fondations béton, 3 piliers des pôles métiers).
  - Jauge laser dorée ultra-fine de 2px avec reflet ambré.
  - Progression fluide 0-100% en ~1,1 seconde et fondu de sortie cinéma sans blocage du visiteur.
  - Trame de précision architecturale en filigrane sur fond bleu nuit `#070F1E`.

### F. Animation de Vague Hero de Gauche à Droite (`HeroSection.tsx`)
- À la fin du chargement, cascade séquentielle de gauche à droite :
  - Déploiement de la ligne de marque Marcory.
  - Titre H1 révélé mot par mot avec décalage de 90ms (*Bâtir* → *équiper* → *et* → *investir* ... → *Abidjan*).
  - Ligne de vague liquide dorée en SVG animée de gauche à droite sous le titre.
  - Paragraphe descriptif et boutons glissant dans le sillage de l'onde.

### G. Scroll Stacking Hybride des Services (`StackingServices.tsx`)
- Résolution du blocage de `position: sticky` causé par `overflow-x: hidden` (remplacé par `overflow-x: clip`).
- **Comportement Hybride sur-mesure** :
  - Carte 01 (BTP & Briques) : sticky en tête.
  - Carte 02 (Immobilier & Terrains) : monte du bas vers le haut et se superpose.
  - Carte 03 (Matériaux & Outillage) : glisse **horizontalement de la droite vers la gauche** (`translateX: 105% → 0%`) au scroll pour venir se caler au-dessus de la carte 02.

### H. Carrousel Horizontal Tactile sur Mobile (`ProductGrid.tsx`)
- Remplacement de la grille verticale mobile par une **rangée horizontale fluide** avec défilement de gauche à droite (`snap-x snap-mandatory`).
- Chaque carte occupe 84vw pour inviter naturellement au balayage du doigt.
- Intégration sur chaque carte d'un bouton dédié **"Voir plus"** ouvrant la fiche technique `/produit/[slug]`.

### I. Épuration de l'En-tête & Barre Mobile (`Navbar.tsx`)
- Suppression du bouton vert "WhatsApp Direct" sur l'en-tête desktop (déjà omniprésent via la bulle flottante).
- Remplacement des mots "Favoris" et "Panier" par deux boutons d'icônes minimalistes soignés avec badges numériques.
- Réduction du bandeau supérieur mobile de 75px empilés à une seule ligne ultra-fine de 28px avec adresse courte et téléphone alignés.

---

## 2. Décisions clés actées

1. **Suppression de la mascotte lion sur l'écran de chargement :** Remplacée par un emblème architectural vectoriel or pour un positionnement corporate et haut de gamme.
2. **Scroll hybride vertical + latéral :** La 3e carte d'univers arrive par la droite au défilement pour casser la monotonie du scroll classique.
3. **Carrousel mobile pour les articles :** Navigation horizontale au doigt sur mobile, grille 3 colonnes conservée sur desktop.
4. **Ticket WhatsApp Pro :** Remplacement des messages libres par des tickets proforma numérotés avec devis chiffré en FCFA.
5. **Correction CSS Sticky :** Bannissement de `overflow-x: hidden` sur les conteneurs parents au profit de `overflow-x: clip`.

---

## 3. Livrables & Fichiers

- `src/components/PageLoader.tsx` (Nouveau) : Écran de chargement institutionnel or 24K.
- `src/components/MaterialCalculator.tsx` (Nouveau) : Calculateur BTP briques et carrelage.
- `src/components/CartButton.tsx` & `CartDrawer.tsx` (Nouveaux) : Gestion du panier de devis.
- `src/components/FavoritesButton.tsx` & `FavoritesDrawer.tsx` : Gestion des favoris épurée.
- `src/context/CartContext.tsx` (Nouveau) : État global du panier et calculs FCFA.
- `src/components/HeroSection.tsx` : Animation de vague séquentielle de gauche à droite.
- `src/components/StackingServices.tsx` : Scroll Stacking hybride vertical/latéral.
- `src/components/ProductGrid.tsx` : Carrousel mobile horizontal + barre de recherche instantanée.
- `src/components/ProductCard.tsx` : Bouton dédié "Voir plus" vers `/produit/[slug]`.
- `src/components/Navbar.tsx` : En-tête épuré et bandeau mobile 1 ligne.
- `src/app/globals.css` : Tokens d'onde dorée et `overflow-x: clip`.
- `PROJET.md` : Journal du projet mis à jour.
- Dépôt GitHub : Branche `main` synchronisée et à jour (`13617b9`).

---

## 4. Prochaine étape prévue (Reprise Session 04)
- Passer aux fonctionnalités d'administration du MVP 2 :
  - `MVP2-T02` : Espace Administrateur Simple (`M09`) pour gérer les fiches produits.
  - `MVP2-T03` : Gestion rapide des stocks & disponibilités (`M10`).
