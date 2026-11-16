# Recette — V1 de démonstration, 16 novembre 2026

## Commandes

```sh
npm --cache /workspace/work/npm-cache install --no-fund --no-audit
npm test
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

La commande de tests navigateur construit avec Vite, exporte le fichier autonome, puis exécute Playwright. Le chemin Chromium et le cache utilisés ici concernent l’environnement de travail ; ils ne sont pas nécessaires pour ouvrir le fichier HTML remis. En développement local, utiliser `npm install` et un Chromium installé pour Playwright ou la variable facultative `CHROMIUM_PATH`.

## Périmètre vérifié

- Sept tests métier/rédaction : sélection réelle limitée à quatre, états 0/2/4 et incomplets, distinction neuf/récent/rénové/indisponible, modes du programme, champs facultatifs, références, URL non sûres, échappement de contenu, articles prévus et validation du formulaire. Vérification des textes de référence par rapport au cahier fourni.
- Douze tests navigateur : neuf sections et rédaction affichée, indépendance des modules, parcours hero/annonces/programme/contact, préremplissage programme et commune, erreurs accessibles, confirmation fictive, absence de requête à la simulation, absence de cookies et de stockage local/session/IndexedDB, clavier, Échap, mouvement réduit et absence d’erreur JavaScript.
- Responsive et captures à 375, 430, 768, 1440 et 1920 px : aucun débordement horizontal, images et polices chargées.
- Analyse axe-core WCAG 2.1 AA à 375 et 1440 px : aucune violation détectée dans les états analysés. Ce contrôle automatisé ne constitue pas une certification d’accessibilité.
- Contenu exact de l’export autonome chargé dans le moteur HTML, navigateur hors connexion : neuf sections, quatre annonces démo, trois communes, trois articles, images, polices, préremplissage et simulation disponibles sans serveur ni requête HTTP.

## Résultat et limites

La recette est réalisée dans Chromium sur cet environnement, avec inspection des captures ordinateur et mobile. Le ZIP final contient à sa racine le même fichier autonome, nommé `index.html`. L’intégrité de l’archive et l’identité des octets de ce fichier avec l’export sont contrôlées ; le contenu du fichier extrait est ensuite soumis au test hors connexion.

La politique d’administration du Chromium fourni interdit la navigation `file://` (`ERR_BLOCKED_BY_ADMINISTRATOR`). Elle n’a pas été modifiée. L’export est donc vérifié en chargeant son contenu exact dans le moteur HTML en mode hors connexion ; le double-clic depuis un explorateur de fichiers n’est pas vérifiable dans cet environnement. Les navigateurs Safari/Firefox, les appareils physiques, un lecteur d’écran et l’intégration WordPress/Divi ne sont pas validés par cette recette. Le flux XML, les URL commerciales finales, les données de programme, la mise à jour des articles, l’envoi réel et la livraison de messages sont hors périmètre. La cohérence graphique est basée sur la référence disponible et les styles de sa maquette ; une reproduction identique de tous les détails du site publié n’est pas affirmée.

Cette remise porte sur une branche de revue. Aucun déploiement ni fusion dans `main` n’est prévu.
