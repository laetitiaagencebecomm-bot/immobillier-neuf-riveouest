/** @typedef {{id:string,title:string,excerpt:string,image:string|null,url:string|null,status:'published'|'planned',tag:'immobilier-neuf'}} ArticlePreview */

/** Liens existants vérifiés ; résumés de maquette et visuels d’ambiance, à remplacer par WordPress. @type {ArticlePreview[]} */
export const articles = [
  {
    id: 'vefa',
    title: 'Immobilier neuf : tout savoir sur la VEFA',
    excerpt: 'Qu’est-ce qu’un achat sur plan ? Retrouvez les explications de Rive Ouest sur la vente en l’état futur d’achèvement.',
    image: 'residence-illustration.svg',
    url: 'https://riveouestimmo.com/immobilier-neuf-tout-savoir-sur-la-vefa/',
    status: 'published',
    tag: 'immobilier-neuf',
  },
  {
    id: 'neuf-ancien',
    title: "Immobilier neuf : avantages et inconvénients par rapport à l'ancien",
    excerpt: 'Confort, conception, délais : les points de comparaison pour réfléchir à votre projet d’acquisition.',
    image: 'investissement.webp',
    url: 'https://riveouestimmo.com/immobilier-neuf-avantages-et-inconvenients-par-rapport-a-lancien/',
    status: 'published',
    tag: 'immobilier-neuf',
  },
  {
    id: 'quartiers',
    title: 'Acheter un appartement neuf à Meudon, Clamart ou Boulogne-Billancourt : comment choisir son quartier ?',
    excerpt: 'Emplacement réservé au troisième article du cahier éditorial. Ce contenu n’est pas encore publié.',
    image: null,
    url: null,
    status: 'planned',
    tag: 'immobilier-neuf',
  },
];
