# Passation à Roland — Immobilier neuf

## Statut et sources

Cette V1 est une maquette front-end. Le plan a été approuvé le 16 novembre 2026. `cahier-editorial.md` contient les textes de référence ; `prd.md` précise le périmètre. Les neuf sections de la page sont conservées dans l’ordre prévu. Les tests comparent la rédaction affichée aux paragraphes approuvés, en normalisant uniquement les espaces et apostrophes typographiques.

La direction graphique réutilise les polices Cormorant Garamond et Montserrat, le logo, les couleurs et la base CSS de la maquette Premier achat récupérée précédemment. La page publiée est consultable en texte, mais une comparaison complète de son CSS actuel et une conformité visuelle identique ne sont pas établies. Les captures de cette V1 servent à la revue graphique. Les photographies sont des visuels d’ambiance, jamais des annonces. Les droits et les visuels commerciaux définitifs sont à vérifier avant mise en ligne ; le dessin architectural est une illustration abstraite sans opération réelle. Les polices disposent des licences OFL incluses.

## Intégrer WordPress / Divi

Reprendre les sections de `main` et réutiliser le header/footer globaux du site. La barre « Tester les états », les mentions de maquette et les modales explicatives servent à la revue. Retirer ces commandes dans l’intégration finale. Préfixer les styles dans le thème enfant ou les limiter au conteneur de la landing afin d’éviter les collisions avec Divi. Harmoniser le chargement des polices avec le thème.

## Annonces : branchement du flux par Roland

Le flux XML existe et son champ métier « immobilier neuf » est identifié, selon Laetitia. Aucun accès à ce flux n’est nécessaire à la maquette. Le nom technique du champ et ses valeurs seront repris du mapping réel, sans les deviner.

Modèle local `src/data/properties.js` : `id`, `title`, `city`, `developmentName`, `rooms`, `surfaceSqm`, `priceEur`, `image`, `url`, `status`, `isNewBuild`.

La future sélection réelle doit retenir uniquement les ventes publiables, disponibles, avec `isNewBuild === true` et `status === 'available'`, dans la limite de quatre, sans compléter artificiellement s’il n’y en a qu’une ou deux. Un bien récent, rénové ou indisponible est exclu. Les cartes de la maquette portent `status: 'demo'`, des valeurs nulles et aucun prix inventé ; elles ne peuvent pas entrer dans la sélection réelle. Traiter le flux et ses éventuels identifiants côté serveur.

Remplacer les actions de démonstration par les vraies fiches des annonces et une URL validée pour la liste complète. Les champs absents sont masqués. Le modèle peut être enrichi avec une date de livraison seulement si celle-ci est confirmée. Distinguer une panne de flux d’une absence de stock : garder une invitation neutre au contact si l’état commercial est inconnu.

## Programme manuel indépendant

Modèle `src/data/development.js` : `id`, `mode: demo|confirmed|none`, `name`, `city`, `developer`, `description`, `image`, `typologies`, `deliveryDate`, `priceFrom`, `url`. Prévoir des champs administrables dans l’outil déjà utilisé par l’équipe.

- `demo` : présentation provisoire explicite, aucun nom ni prix commercial inventé.
- `confirmed` : identité validée et seuls champs renseignés. Sans nom confirmé, le bloc reste masqué. Toute livraison renseignée dans cet état doit être validée en amont.
- `none` : bloc masqué, bande de contact suivante conservée.

Le clic « Recevoir des informations » préremplit `programReference` : référence du programme confirmé, ou mention explicite de démonstration pour la maquette. Le mode du programme n’a aucun effet sur les annonces ou le blog. Aucune opération Icade à Meudon n’est renseignée comme réelle.

## Trois communes et trois articles

Les textes de Boulogne-Billancourt, Clamart et Meudon sont présentés en trois cartes. Les liens de sélections neuves par ville ne sont pas connus : les boutons sont explicitement des démonstrations, puis permettent de rejoindre le formulaire avec la ville choisie. Les remplacer uniquement après vérification des URL, sans faire passer une sélection générique ancien/récent pour une offre neuve.

Le futur blog doit utiliser l’étiquette `immobilier-neuf` et les trois derniers articles publiés, avec titre, image, extrait et permalien WordPress réels. Les deux liens existants sont :

- https://riveouestimmo.com/immobilier-neuf-tout-savoir-sur-la-vefa/
- https://riveouestimmo.com/immobilier-neuf-avantages-et-inconvenients-par-rapport-a-lancien/

Ils ont été consultés le 16 novembre 2026. Les contenus doivent être actualisés avant mise en avant, notamment pour les mentions réglementaires et fiscales. Les résumés et images de cette V1 restent des éléments de maquette. Le troisième article est prévu au cahier, explicitement non publié, sans fausse URL.

## Formulaire : simulation puis intégration

Les champs correspondent au modèle `LeadForm` : `fullName`, `email`, `phone`, `city`, `projectType: habiter|investir|a_preciser`, `programReference`, `message`, `source: landing_page_immobilier_neuf`. Ce code technique correspond au libellé de suivi du cahier « Landing page Immobilier neuf ». La provenance est l’URL de la page ; dans le fichier autonome, elle est le libellé `maquette-autonome-locale` pour ne pas enregistrer le chemin local de l’utilisateur.

Nom, e-mail et consentement sont requis ; le téléphone est facultatif. La simulation fournit un résumé d’erreurs accessible, des messages associés aux champs et une confirmation explicitement fictive. Aucun fetch, CRM, envoi de mail, journal de coordonnées ou stockage navigateur n’est implémenté. Les champs restent visibles en mémoire tant que la page est ouverte.

Pour la production, raccorder le traitement habituel de WordPress avec validation côté serveur, antispam, destinataire et consentement confirmés. Conserver les textes du cahier. La confirmation réelle « Merci pour votre message. Votre demande a bien été transmise à l’équipe Rive Ouest Immobilier. » ne doit apparaître qu’après un succès réel ; prévoir le cas d’échec et supprimer le gestionnaire de simulation.

## SEO et éléments à confirmer

Title et description du cahier sont présents ; la maquette est `noindex,nofollow`. Le slug `/immobilier-neuf-hauts-de-seine/` n’est pas confirmé disponible et doit être vérifié dans WordPress. Configurer canonique et indexation dans Yoast uniquement à la mise en ligne validée, sans doubler WebPage/BreadcrumbList. Aucun ItemList de biens fictifs, avis ou FAQ ajoutée.

Avant lancement : valider les programmes et leurs visuels, le champ XML et la disponibilité, les URL de sélection générale et par ville, le troisième article, la mise à jour des guides, le destinataire du formulaire et la recette du site intégré. Ces vérifications concernent l’intégration future et n’empêchent pas la revue de la maquette.
