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

## 3. Interaction Signature : Sticky Scroll Stacking
* Les 3 cartes de services s'empilent au défilement façon Apple/Stripe.
* Implémentation : `position: sticky` natif CSS, offsets calculés, ombres progressives `shadow-2xl`.
* Zéro bibliothèque JavaScript lourde : 60 FPS garantis sur mobile.
