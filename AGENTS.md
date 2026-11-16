# Rive Ouest — Immobilier neuf

## Mission
Maquette front-end autonome pour revue marketing et intégration ultérieure WordPress/Divi par Roland. Référence graphique : https://riveouestimmo.com/investissement-premier-achat/. `docs/cahier-editorial.md` fait foi pour les textes ; `docs/prd.md` précise le périmètre. Plan approuvé dans la conversation le 16 novembre 2026.

## Commandes
`npm install`, `npm run dev`, `npm run build`, `npm test`, `npm run test:browser`, `npm run export:standalone`.
Les tests navigateur utilisent Chromium via `CHROMIUM_PATH` si renseigné, sinon le navigateur Playwright installé. Le cache npm peut être placé dans un répertoire de travail avec `npm --cache <chemin> install`.

## Conventions
HTML/CSS/JS natifs avec Vite. Données de démonstration séparées dans `src/data/`. Composants de rendu dans `src/components/`, règles métier dans `src/domain.js`. Préserver la palette, les polices, les textes approuvés et l’accessibilité. Données commerciales absentes : conserver la mention démonstration ou masquer les champs ; jamais inventer un programme, un prix ou une disponibilité. Distinguer strictement neuf, récent et rénové.

## Limites
Aucun raccordement XML, WordPress, API, CRM ou messagerie. Aucune transmission ni persistance des coordonnées. Aucun déploiement, aucune modification d’un autre dépôt, aucun secret. Ne supprimer aucun fichier sans instruction.

## Git et recette
Travail sur `feat/landing-immobilier-neuf-v1`. Ne pas modifier `main` après son initialisation ; PR de revue sans fusion automatique. Done : neuf sections fidèles, états 0/2/4 annonces et programme démo/confirmé/absent, liens honnêtes, formulaire simulé accessible, tests à 375/430/768/1440/1920 px, build réussi et passation documentée.
