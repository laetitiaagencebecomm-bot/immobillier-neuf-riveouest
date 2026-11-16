/** @typedef {{id:string,title:string,city:string,developmentName:string|null,rooms:number|null,surfaceSqm:number|null,priceEur:number|null,image:string,url:string|null,status:'demo'|'available'|'unavailable',isNewBuild:boolean}} NewProperty */

/** Quatre emplacements sans prix, surface, commune ou disponibilité inventés. @type {NewProperty[]} */
export const properties = Array.from({ length: 4 }, (_, index) => ({
  id: `demo-${index + 1}`,
  title: 'Appartement neuf',
  city: '',
  developmentName: null,
  rooms: null,
  surfaceSqm: null,
  priceEur: null,
  image: index % 2 === 0 ? 'appartement-4.webp' : 'investissement.webp',
  url: null,
  status: 'demo',
  isNewBuild: true,
}));
