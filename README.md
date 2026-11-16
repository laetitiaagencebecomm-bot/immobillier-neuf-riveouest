# Rive Ouest — Immobilier neuf

V1 de démonstration de la landing page : neuf sections, textes du cahier éditorial du 16 novembre 2026, continuité graphique avec la page Premier achat & Investissement. Projet Vite + HTML/CSS/JavaScript natifs, sans framework d’interface ni service externe.

## Voir la maquette sans installation

Le ZIP de remise, dans `livraison/Rive-Ouest-Immobilier-Neuf-Maquette.zip`, contient un **`index.html` autonome à sa racine** : décompresser le ZIP, puis ouvrir ce fichier dans Chrome, Edge, Firefox ou Safari. Les styles, polices et visuels sont intégrés. Aucun serveur ni connexion n’est nécessaire pour parcourir la maquette et simuler le formulaire. Les liens vers les articles et le site existant nécessitent une connexion.

Le dossier `sources/` du ZIP contient le projet de développement ; son fichier `index.html` nécessite Vite. Pour consulter la maquette, utiliser le fichier à la racine du ZIP.

## Développer et vérifier

Node.js 22.12+ ou 24 recommandé.

```sh
npm install
npm run dev
npm test
npm run test:browser
```

Avant le premier test navigateur, installer Chromium pour Playwright avec `npx playwright install chromium`, ou utiliser un Chromium déjà installé : `CHROMIUM_PATH=/chemin/vers/chromium npm run test:browser`. La variable est facultative et concerne uniquement les tests. Les tests de navigateur lancent le build, exportent la maquette autonome puis ouvrent le serveur de prévisualisation local.

```sh
npm run build
npm run preview
npm run export:standalone
```

Le build statique est dans `dist/`. L’export à ouvrir directement est `exports/maquette-immobilier-neuf.html` ; dans la remise ZIP, ce même fichier est nommé `index.html`. Le développement utilise le port 4173, la prévisualisation le port 4174.

## Organisation

- `index.html` : rédaction et structure de la page.
- `src/data/` : annonces, programme manuel, articles et textes éditoriaux de contrôle.
- `src/components/render.js` : rendu des modules, champs facultatifs et liens.
- `src/domain.js` : distinction neuf/récent, disponibilité, URL et validation locale.
- `src/main.js` : interactions, états de revue et formulaire simulé.
- `src/styles/` : base graphique récupérée, styles de page et ajustements V1.
- `public/assets/` : logo, visuels d’ambiance, illustration abstraite, polices et licences.
- `tests/` : règles métier, rédaction, parcours, accessibilité, responsive et export autonome hors connexion.
- `docs/` : sources du brief, passation Roland et recette.

## Tester les états

Dans la barre de maquette, ouvrir **Tester les états**. Les annonces (0, 2 ou 4 emplacements) et le programme (provisoire, confirmé, absent) sont indépendants. Aucun programme confirmé n’étant renseigné, cet état masque le bloc. La logique d’affichage des seuls champs confirmés est couverte par des fixtures identifiées comme tests, sans publier d’offre réelle. Le troisième article reste indiqué comme à produire.

Le formulaire affiche les erreurs, accepte une simulation valide et confirme **« Démonstration — aucun message envoyé »**. L’application ne transmet, ne journalise et ne persiste aucune coordonnée. Les liens commerciaux non confirmés ouvrent des explications de démonstration.

## Cadre de la remise

Branche `feat/landing-immobilier-neuf-v1`, revue par PR sans fusion. Aucun déploiement n’est inclus. Le flux XML, le champ métier immobilier neuf, le programme manuel, les articles WordPress et le traitement du formulaire seront raccordés par Roland après validation. Voir `docs/passation-roland.md` et `docs/recette.md`.
