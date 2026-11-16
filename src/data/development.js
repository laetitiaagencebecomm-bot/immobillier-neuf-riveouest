/** @typedef {{id:string,mode:'demo'|'confirmed'|'none',name:string|null,city:string|null,developer:string|null,description:string,image:string|null,typologies:string|null,deliveryDate:string|null,priceFrom:number|null,url:string|null}} FeaturedDevelopment */

/** Module manuel indépendant des annonces. Aucune opération réelle n’est renseignée. @type {FeaturedDevelopment} */
export const development = {
  id: 'programme-demo',
  mode: 'demo',
  name: null,
  city: null,
  developer: null,
  description: '',
  image: 'residence-illustration.svg',
  typologies: null,
  deliveryDate: null,
  priceFrom: null,
  url: null,
};
