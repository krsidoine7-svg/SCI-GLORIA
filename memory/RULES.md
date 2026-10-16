# PROTOCOLE DU SYSTÈME DE MÉMOIRE (RAG & SESSIONS)
# SCI GLORIA INVESTMENT & CO

> **Règle absolue :** L'IA ne doit jamais perdre le contexte, même en cas de coupure de session ou de changement de conversation.  
> **Structure :** 2 espaces complémentaires (Sessions chronologiques & Base de connaissances structurée).

---

## 1. Architecture des 2 Espaces de Mémoire

```
memory/
├── RULES.md                      # Ce guide d'utilisation et règles d'enregistrement
├── sessions/                     # ESPACE 1 : Journal chronologique brut des sessions
│   └── YYYY-MM-DD_session-XX_titre.md
└── knowledge/                    # ESPACE 2 : Base de connaissances structurée (RAG)
    ├── 01_contexte-entreprise.md # Qui est SCI GLORIA, localisation, coordonnées
    ├── 02_services-et-prix.md    # 3 pôles, 3 régimes de prix, flux WhatsApp
    ├── 03_design-tokens-ui.md    # Bleu Nuit, Poppins, Sticky Scroll Stacking
    ├── 04_stack-et-securite.md   # Next.js, TypeScript, OWASP, Soft Delete
    └── 05_journal-decisions.md   # Tous les arbitrages validés avec date et motif
```

---

## 2. Espace 1 : Journal de Session (`memory/sessions/`)

### Quand l'alimenter ?
* À la fin de chaque section de travail, à chaque changement de phase, ou dès que l'utilisateur dit *"j'ai terminé ma section / session"*.

### Format du fichier horodaté
Nom du fichier : `YYYY-MM-DD_session-[NUMÉRO]_[TITRE-COURT].md`  
Exemple : `2026-10-16_session-01_cadrage-fondations.md`

### Structure obligatoire du fichier de session :
```markdown
# Session XX : [Titre de la session]
- **Date & Heure :** YYYY-MM-DD HH:mm
- **Participants :** Utilisateur + [NOM DES EXPERTS ACTIFS]
- **Statut :** Clôturée & Validée

## 1. Ce qui a été réalisé / discuté
(Résumé factuel des étapes traitées)

## 2. Décisions clés actées
(Choix techniques, design, business pris durant la session)

## 3. Livrables produits
(Liste des fichiers créés ou modifiés)

## 4. Prochaine étape prévue
(Ce qui doit être fait dès la reprise)
```

---

## 3. Espace 2 : Base Structurée RAG (`memory/knowledge/`)

### Rôle pour l'IA
Ces fichiers sont synthétiques, denses en information utile et dépourvus de bavardage. L'IA les lit en priorité pour :
* Connaître instantanément les fondamentaux du projet.
* Répondre à toute question de l'utilisateur avec une précision absolue.
* Ne jamais réinventer ce qui a déjà été validé.

### Règle de synchronisation
Dès qu'un fichier de session est créé dans `memory/sessions/`, l'IA extrait immédiatement les nouvelles vérités pour mettre à jour les fiches correspondantes dans `memory/knowledge/`.

---

## 4. Protocole d'Interrogation & Commandes

L'utilisateur peut écrire à tout moment :
* `MEMOIRE` ou `RAPPEL` : L'IA consulte `memory/knowledge/` et résume l'état exact du projet.
* `HISTORIQUE` : L'IA liste les sessions archivées dans `memory/sessions/`.
* `QUESTION [sujet]` : L'IA interroge la mémoire pour restituer la décision officielle.
