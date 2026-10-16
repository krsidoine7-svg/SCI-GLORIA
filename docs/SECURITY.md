# SECURITY.md — Politique de Sécurité, Intégrité & Conformité
# SCI GLORIA INVESTMENT & CO

> **Projet :** Plateforme Web E-commerce Vitrine, Devis & Services BTP  
> **Auteur :** [QA, SÉCURITÉ & ACCESSIBILITÉ]  
> **Référentiel :** OWASP Top 10 (Web & API) & Bonnes Pratiques Cybersécurité CI/OHADA

---

## 1. Principes Fondamentaux de Sécurité

La plateforme SCI GLORIA applique le principe du **Moindre Privilège** et de la **Défense en Profondeur** :
* **Surface d'attaque minimale en MVP 1 :** L'absence de paiement automatisé par carte bancaire sur le serveur élimine tout risque de vol de coordonnées bancaires ou de fraude PCI-DSS.
* **Intégrité des prix :** Les données de prix et de fiches techniques sont typées et validées côté serveur pour empêcher toute injection ou altération frauduleuse des montants.

---

## 2. Conformité OWASP Top 10

| Risque OWASP | Mesure Technique Implémentée sur SCI GLORIA |
| :--- | :--- |
| **A01 : Broken Access Control** | En MVP 1, pas d'espaces privés exposés. En MVP 2/3, contrôle strict des sessions côté serveur (RBAC : Admin vs Agent commercial vs Client). |
| **A02 : Cryptographic Failures** | Tous les échanges s'effectuent sous HTTPS strict avec certificat TLS 1.3 forcé et en-tête HSTS. Mots de passe hashés avec Argon2/Bcrypt en MVP 2. |
| **A03 : Injection (SQL, XSS)** | Utilisation exclusive des mécanismes de templating React (échappement automatique des chaînes HTML) et requêtes paramétrées avec ORM/BaaS typé. Zéro `dangerouslySetInnerHTML`. |
| **A04 : Insecure Design** | Absence de secrets ou clés API privées dans le code source front-end. Variables d'environnement isolées (`.env.local`). |
| **A05 : Security Misconfiguration** | En-têtes HTTP de sécurité configurés : `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`. |
| **A06 : Vulnerable Components** | Audit automatisé des dépendances npm avec zéro vulnérabilité critique tolérée. |
| **A07 : Identification & Auth Failures** | Protection contre les attaques par force brute (rate limiting sur les formulaires de contact et devis). |
| **A08 : Software and Data Integrity** | Hachage SHA-256 de vérification pour les fiches techniques PDF téléchargeables afin de garantir qu'aucun document n'a été falsifié. |
| **A09 : Security Logging & Monitoring** | Journalisation des erreurs côté serveur et traçabilité des modifications catalogue. |
| **A10 : Server-Side Request Forgery (SSRF)** | Validation stricte des URL sortantes et interdiction des requêtes vers des adresses IP privées. |

---

## 3. Protection Anti-Scraping & Intelligence Artificielle

Pour protéger le catalogue exclusif de SCI GLORIA (notamment les prix des briques et les détails de parcelles immobilières) contre le pillage automatisé par des bots malveillants :
* **Fichier `robots.txt` strict :** Définition explicite des bots autorisés (moteurs de recherche référents) et blocage des scrapers agressifs connus.
* **Fichier `llm.txt` :** Document synthétique officiel décrivant l'entreprise pour que les moteurs d'IA (ChatGPT, Gemini, Perplexity) citent fidèlement SCI GLORIA sans avoir à aspirer tout le site de manière destructive.
* **Limitation de débit (Rate Limiting) :** Restriction à 60 requêtes par minute par adresse IP sur les pages catalogue.

---

## 4. Politique de "Soft Delete" (Suppression Logique)

Conformément aux exigences de traçabilité commerciale et comptable :
* **Règle absolue :** Aucun produit, commande ou devis n'est jamais supprimé physiquement de la base de données avec une requête `DELETE`.
* **Implémentation :** Chaque table comporte une colonne `deleted_at TIMESTAMP WITH TIME ZONE NULL`.
  * Si `deleted_at IS NULL` : Le produit est visible et actif.
  * Si `deleted_at IS NOT NULL` : Le produit est archivé/masqué de la vitrine publique, mais reste consultable dans les archives historiques par l'administrateur.
* **Radiographie d'impact :** Toute tentative de suppression vérifie au préalable les dépendances (ex: fiches partagées, commandes associées) et affiche un rapport d'impact avant confirmation.
