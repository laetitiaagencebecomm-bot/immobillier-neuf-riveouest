# RIVE OUEST IMMOBILIER — PRD CODEX
## Landing page « Immobilier neuf » — V1 de démonstration
**Statut : brief de production ; étape 1 = plan à valider.**
**Référentiel éditorial : cahier éditorial « Immobilier neuf », version du 16 novembre 2026, communiqué séparément.**

## 1. Objectif de la mission
Produire dans le dépôt `laetitiaagencebecomm-bot/immobillier-neuf-riveouest` une **V1 navigable, responsive et testable** de la landing page « Immobilier neuf » de Rive Ouest Immobilier. La page doit reprendre fidèlement la direction visuelle de https://riveouestimmo.com/investissement-premier-achat/ et reproduire **les textes du cahier éditorial validé sans les réécrire**. Le livrable sera une maquette front-end autonome destinée à la revue marketing puis à la passation au développeur Roland pour intégration WordPress/Divi.

**Instruction impérative : commence par inspecter les références et produire un plan. N'écris, ne crée, ne modifie aucun fichier avant validation explicite du plan par l'utilisateur.** Si le dépôt est encore vide, signale les prérequis d'initialisation ; ne suppose pas que tu peux créer une branche sans commit initial.

## 2. Contexte métier
Rive Ouest Immobilier est implanté à Boulogne-Billancourt, Clamart et Meudon et intervient également dans les communes voisines. Objectif commercial : faire découvrir les appartements et programmes neufs réellement commercialisés, mettre à la une une opération prioritaire, qualifier des demandes d'information et de recherche, orienter vers les fiches biens et le contact.

Cibles : acquéreurs de résidence principale, primo-accédants, familles, investisseurs. La page **ne doit pas** assimiler logement neuf, appartement récent et ancien rénové. Une opération Icade à Meudon est évoquée commercialement mais **son nom, ses caractéristiques, sa disponibilité et les droits d'exploitation des visuels restent à confirmer**. Aucun fait commercial non vérifié ne doit être affiché comme réel.

Notre analyse préalable croise Search Console classique, performance dans les fonctionnalités IA de Google, Keyword Planner et l'analyse des SERP de quatre requêtes : « programme neuf 92 », « immobilier neuf Boulogne-Billancourt », « programme neuf Clamart », « appartement neuf Meudon ». Intention principale : **trouver un programme ou un appartement neuf dans les Hauts-de-Seine**. Positionnement : offre vérifiée + expertise locale, pas copie d'un portail national. La V1 doit permettre de valider architecture, qualité graphique, comportement mobile et tunnel de conversion, pas le référencement effectif ni le fonctionnement de systèmes externes.

## 3. Périmètre V1 indispensable
1. Afficher un hero deux colonnes reprenant le H1 et les deux CTA du cahier éditorial.
2. Présenter quatre **cartes de démonstration clairement étiquetées** comme telles, préparées pour un futur flux d'annonces neuves.
3. Présenter un **programme à la une** sous forme d'un composant signature administrable à terme ; son contenu est provisoire, sans information Icade inventée.
4. Faire fonctionner les ancres et CTA du haut et du milieu vers un formulaire de démonstration en bas.
5. Présenter trois cartes locales : Boulogne-Billancourt, Clamart, Meudon ; textes conformes au cahier.
6. Présenter les bénéfices du neuf et l'accompagnement Rive Ouest sans duplications ni promesses abusives.
7. Présenter trois cartes de blog prévues pour un futur module dynamique.
8. Simuler la validation du formulaire côté navigateur, les erreurs utiles et une confirmation explicitement fictive.
9. Fournir un aperçu local et une documentation permettant la passation à Roland.

## 4. Hors périmètre V1
Pas de connexion réelle WordPress, Divi, logiciel immobilier, API, CRM, formulaire de contact ou messagerie ; pas d'envoi d'e-mail ; pas de base de données ni de stockage des coordonnées ; pas de déploiement public ni de modification du site en ligne ; pas d'ajout de paiement, authentification, espace client, recherche complexe ou filtres avancés ; pas de pages locales supplémentaires ; pas de refonte du header/footer ; pas de création d'annonces, prix, avis, garanties, promoteurs ou programmes présentés comme réels. Ne pas implémenter un « SEO IA » spéculatif ou garantir des citations dans les réponses IA.

## 5. Sources et fichiers à utiliser
**Priorité 1 — références à lire sans modifier :**
- Page publiée : https://riveouestimmo.com/investissement-premier-achat/ (référence graphique de première importance).
- Cahier éditorial SEO/GEO Rive Ouest « Immobilier neuf », V1 du 16/11/2026 : **pièce jointe obligatoire contenant la rédaction intégrale validée** ; elle prévaut sur les résumés du présent PRD.
- Archive éventuelle `Rive-Ouest-site-complet-v2.zip` du projet Premier achat : référence technique et visuelle, à examiner si fournie ; ne pas modifier ni déployer son contenu.
- Nuancier Rive Ouest si joint ; à défaut couleurs ci-dessous.

**Priorité 2 — pages de contexte :**
- https://riveouestimmo.com/investissement-premier-achat/
- https://riveouestimmo.com/immobilier-neuf-tout-savoir-sur-la-vefa/
- https://riveouestimmo.com/immobilier-neuf-avantages-et-inconvenients-par-rapport-a-lancien/
- Site Rive Ouest pour vérifier navigation, identité et liens réellement existants. Ne pas inventer les URL manquantes.

**Repo cible :** `laetitiaagencebecomm-bot/immobillier-neuf-riveouest` (orthographe exacte, même si le nom contient deux « l » dans « immobillier »). Ne pas toucher aux autres dépôts, et notamment à l'ancien projet « Premier achat ».

Si les références publiées ne sont pas accessibles, **déclarer cette limite et demander/utiliser les captures ou archive de référence** avant de prétendre à une copie fidèle. Lors de la phase de plan, identifier les fichiers à créer et les références indisponibles. Ne modifier les éventuels fichiers préexistants qu'après validation.

## 6. Contraintes techniques et design system
**Stack privilégiée : Vite + HTML/CSS/JavaScript natifs**, sans framework lourd. Proposer une autre stack uniquement si l'inspection de l'archive de référence démontre un avantage concret, à faire approuver dans le plan. Pas de framework UI ni dépendance superflue. Aucune persistance de données pour la V1 ; jeux de données locaux de démonstration.

**Palette officielle :** `#111f2a` marine, `#0e2639` marine secondaire, `#ffffff` blanc dominant, `#f2f2f2` gris clair, `#cdcccc` gris perle, `#dfd1c8` beige d'accent, `#7f7f7f` gris. Pas d'orange/turquoise, dégradés gadgets, ombres lourdes ou artifices typographiques. **Polices, header, footer, boutons, espacements et langage des cartes à reprendre prioritairement sur la page de référence** ; ne pas inventer une nouvelle identité.

Design : élégant, contemporain, clair, immobilier premium accessible, pas une vitrine uniquement « luxe ». Conteneur proche de 1 200 px, grands visuels de résidence contemporaine, images de démonstration sans implication de disponibilité commerciale. Hero compact, quatre cartes immédiatement après. Programme à la une composé d'environ 55 % de visuel / 45 % de texte sur ordinateur et empilé sur mobile.

Responsive au moins 375, 430, 768, 1440 et 1920 px. Aucun scroll horizontal. HTML sémantique, H1 unique, titres H2/H3 ordonnés, labels, erreurs accessibles, focus visibles, navigation clavier, images sans déformation, réduction des animations et contrastes suffisants. Images optimisées, chargement différé des visuels hors écran, pas de carrousel automatique ni de parallaxe.

## 7. Modèle de données local de démonstration
Les données sont séparées du rendu et facilement remplaçables ultérieurement.

**NewProperty** : `id:string`, `title:string`, `city:string`, `developmentName:string|null`, `rooms:number|null`, `surfaceSqm:number|null`, `priceEur:number|null`, `image:string`, `url:string|null`, `status:'demo'|'available'|'unavailable'`, `isNewBuild:boolean`.

**FeaturedDevelopment** : `id:string`, `mode:'demo'|'confirmed'|'none'`, `name:string|null`, `city:string|null`, `developer:string|null`, `description:string`, `image:string|null`, `typologies:string|null`, `deliveryDate:string|null`, `priceFrom:number|null`, `url:string|null`. Dans le mode `demo`, conserver des champs visiblement provisoires et non des offres imaginaires.

**ArticlePreview** : `id:string`, `title:string`, `excerpt:string`, `image:string|null`, `url:string|null`, `status:'published'|'planned'`, `tag:'immobilier-neuf'`.

**LeadForm** : `fullName:string`, `email:string`, `phone:string`, `city:string`, `projectType:'habiter'|'investir'|'a_preciser'`, `programReference:string|null`, `message:string`, `source:'landing_page_immobilier_neuf'` ; informations uniquement en mémoire, sans transmission ni stockage.

## 8. Écran unique et sections dans l'ordre
Créer **une seule landing page** avec ces neuf sections, en reproduisant **mot pour mot les textes du cahier éditorial joint**. Les titres ci-dessous sont des repères ; le cahier fait foi :

1. **Hero** : H1 « Immobilier neuf dans les Hauts-de-Seine : trouvez le logement qui vous correspond ». CTA « Découvrir nos logements neufs » vers section 2 et « Parler de mon projet » vers formulaire section 9. Composition texte/image deux colonnes.
2. **Annonces** : H2 « Découvrez nos appartements neufs à la vente », grille de 4 cartes (démonstration) ; CTA « Voir tous les logements neufs » avec destination **non inventée**. Si URL finale absente, fournir une action de démo explicitement indiquée, pas un faux lien actif de production.
3. **Programme à la une** : H2 « Découvrez notre programme immobilier du moment » ; grande image + panneau ; mode démo / confirmé / aucun actif ; CTA « Découvrir le programme » et « Recevoir des informations ». Une demande d'information peut préremplir `programReference` dans le formulaire de simulation.
4. **CTA intermédiaire** : « Vous avez un projet d'achat dans le neuf ? », bande marine et ancre vers formulaire.
5. **Territoires** : H2 « Où acheter dans le neuf dans les Hauts-de-Seine ? », 3 cartes Boulogne-Billancourt, Clamart, Meudon ; différencier logements neufs et appartements récents ; liens vers sélections de biens uniquement si URL vérifiée.
6. **Avantages du neuf** : H2 « Pourquoi choisir un logement neuf ? », quatre cartes : confort, garanties VEFA, frais d'acquisition selon conditions, financement selon éligibilité. Ne rien garantir universellement.
7. **Accompagnement** : H2 « Votre achat immobilier neuf, accompagné à chaque étape », trois étapes : définir, comparer, être orienté ; CTA vers contact et lien éventuel vers gestion locative si vérifié.
8. **Articles** : H2 « Nos conseils pour réussir votre achat immobilier neuf », trois cartes ; deux liens existants vers guides VEFA et neuf vs ancien à vérifier, troisième article à produire sans URL inventée ; alimentation future par étiquette WordPress `immobilier-neuf`.
9. **Formulaire** : H2 « Parlons de votre projet immobilier neuf », champs selon modèle ; validation locale, erreurs, confirmation étiquetée « démonstration — aucun message envoyé ».

Interactions : ancres fonctionnelles, liens vérifiés ou marqués à compléter, formulaires simulés, comportement de l'état vide. Le visiteur doit atteindre le formulaire depuis le haut et le milieu ; les CTA des cartes doivent être cohérents avec leur statut.

## 9. Logique métier en SI / ALORS / SINON
- **SI** la propriété est étiquetée `isNewBuild=true` et `status='available'` **ALORS** elle peut apparaître dans la grille future ; **SINON** l'exclure de la sélection réelle. Pour la démo, les quatre cartes portent visiblement le statut `demo`.
- **SI** le nombre de biens disponibles est inférieur à quatre **ALORS** n'afficher que les biens disponibles ; **SINON** en afficher quatre selon l'ordre défini lors de l'intégration.
- **SI** aucun bien n'est disponible **ALORS** afficher un état vide élégant et un CTA de recherche ; **SINON** afficher la grille.
- **SI** `FeaturedDevelopment.mode='demo'` **ALORS** afficher la mention « présentation provisoire » et des champs non confirmés ; **SINON SI** mode `confirmed` **ALORS** afficher uniquement les champs réellement renseignés ; **SINON** masquer/remplacer le bloc par un CTA de recherche.
- **SI** une URL cible n'est pas confirmée **ALORS** ne pas fabriquer de lien externe ; **SINON** rendre le lien cliquable.
- **SI** le formulaire comporte un champ requis invalide **ALORS** afficher une erreur accessible ; **SINON** afficher une confirmation simulée et ne transmettre aucune donnée.
- **SI** une carte d'article correspond à un contenu encore non publié **ALORS** l'indiquer en mode prototype, sans URL fictive ; **SINON** afficher le lien vérifié.

## 10. Plan d'exécution demandé à Codex — GATE OBLIGATOIRE
**Phase A — À faire maintenant uniquement :**
1. Inspecter le dépôt GitHub et dire s'il est vide, sa branche par défaut et son état initial.
2. Inspecter les sources accessibles : page publiée, cahier éditorial joint, archive éventuelle et nuancier.
3. Reformuler mission, utilisateurs, parcours et neuf/récent.
4. Énumérer les hypothèses, éléments non vérifiés et risques (programme Icade, flux, URL, droits d'images).
5. Présenter la V1, la stack proposée, l'arborescence des fichiers, le design system et les états.
6. Décrire les étapes d'implémentation, tests, critères de recette et documents de passation.
7. Indiquer ce qui requiert décision humaine.
8. **S'arrêter et demander explicitement la validation du plan. Aucun commit ni fichier avant cette validation.**

**Phase B — Après validation uniquement :**
1. Confirmer l'existence d'un commit initial sur `main`; créer alors une branche `feat/landing-immobilier-neuf-v1` (ou utiliser une branche dédiée existante approuvée).
2. Initialiser la stack minimale et les données de démonstration.
3. Construire sections et composants en reprenant le design de référence.
4. Brancher interactions locales ; tester états principaux et vides.
5. Exécuter build/tests, inspecter responsive et accessibilité.
6. Rédiger README, note de passation et AGENTS.md court, puis résumer les modifications et fournir un aperçu.
7. Préparer une PR de revue si approprié ; **ne pas la fusionner** sans instruction.

## 11. Sécurité, gouvernance et validations
Ne supprimer aucun fichier ; ne changer aucun dépôt autre que celui de la mission ; ne pas toucher à `main` après initialisation ; ne pas publier ni déployer ; ne pas installer de dépendance inutile ; ne pas accéder à des secrets ; ne pas mettre de données personnelles réelles dans le dépôt, qui pourrait être public ; ne pas écrire dans WordPress ni dans une API sans consentement spécifique. Proposer un changement d'architecture avant de l'appliquer s'il dépasse la V1. Différencier les faits observés, les suppositions et les choix du prototype.

## 12. Critères d'acceptation observables
- Les neuf sections existent dans l'ordre, avec leur contenu de référence fidèle.
- Une seule balise H1, hiérarchie H2/H3 cohérente.
- Style Rive Ouest vérifiable, navigation header/footer cohérente avec la référence.
- Grille de quatre annonces en mode démo explicite ; aucun faux programme réel.
- Programme à la une visuellement distinctif et trois modes gérés.
- Trois cartes locales ; trois articles ; CTA cohérents.
- Hero et bandeau milieu conduisent au formulaire bas de page.
- Formulaire avec labels, validation accessible et aucune transmission.
- Aucun débordement aux cinq largeurs demandées.
- Build et tests réussis, ou limites signalées explicitement.
- README + note Roland + AGENTS.md fournis ; liste des URL/données à remplacer.

## 13. Tests à effectuer après validation du plan et développement
- **Cas normal** : quatre biens démo, programme à la une, trois articles, CTA et formulaire simulé.
- **Cas incomplet** : biens 0/2, programme absent, article non publié, URL manquante.
- **Cas ambigu** : appartement récent non neuf ; programme Icade non confirmé ; vérifier qu'aucune information n'est présentée comme garantie.
- **Parcours principal** : hero → annonces → programme → contact → validation/confirmation de démo.
- **Responsive** : captures ou vérification explicite aux largeurs 375, 430, 768, 1440 et 1920 px.
- **Accessibilité** : clavier, focus, contraste, labels, messages d'erreur, alt selon pertinence, mouvement réduit.
- **Technique** : commande de build, console sans erreur bloquante, liens et ancres, aucune requête CRM/API, aucune donnée sensible persistée.
Codex doit préciser les commandes exécutées, corriger les erreurs constatées et nommer tout test non réalisable.

## 14. Définition de terminé (Done when)
La V1 est terminée lorsque son parcours principal fonctionne en prévisualisation, que les neuf sections respectent le cahier éditorial, que la direction graphique est cohérente avec la référence, que les états incomplets sont traités, que les tests applicables passent, que les limitations sont consignées et que Roland dispose des informations nécessaires pour reconnecter le prototype à WordPress/Divi. Aucun déploiement ou fusion dans `main` n'est inclus dans « terminé ».

## 15. Recommandation AGENTS.md
Après validation du plan, créer un `AGENTS.md` court documentant :
- mission et référence de la page sœur ;
- commandes `npm install`, `npm run dev`, `npm run build` si retenues ;
- fichiers de données fictives et conventions des composants ;
- charte, textes éditoriaux approuvés, accessibilité ;
- interdiction de créer un faux programme ou d'intégrer un service réel ;
- règles Git : branche dédiée, aucune publication ni fusion automatique ;
- définition de terminé et tests obligatoires.
Ne pas créer AGENTS.md avant approbation du plan.

## 16. Prompt de démarrage Codex
Lis intégralement ce PRD et le cahier éditorial joint avant toute action.
Tu es chargé de la V1 de la landing « Immobilier neuf » de Rive Ouest.
Travaille uniquement dans `laetitiaagencebecomm-bot/immobillier-neuf-riveouest`.
Commence par inspecter l'état du dépôt : il peut être vide.
Analyse la référence https://riveouestimmo.com/investissement-premier-achat/ et les éventuels fichiers joints.
Identifie les sources non accessibles et les informations commerciales non confirmées.
Reformule l'objectif, le périmètre, le hors-périmètre et les dépendances.
Propose la stack la plus simple et l'arborescence de fichiers.
Détaille les neuf sections, leurs données de démo et le parcours de conversion.
Prévois les états vides, l'accessibilité, le responsive et les tests.
Énumère les risques, arbitrages et validations humaines.
**Arrête-toi impérativement après le plan : aucun fichier, commit ni installation avant ma validation.**
Une fois le plan validé, exécute par étapes sur une branche dédiée.
À la fin, fournis un aperçu, les commandes de test, un rapport de recette et la note de passation pour Roland.
