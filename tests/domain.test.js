import test from 'node:test';
import assert from 'node:assert/strict';
import { selectProperties, safeUrl, validateLead } from '../src/domain.js';
import { renderProperties, renderDevelopment, renderArticles } from '../src/components/render.js';
import { development } from '../src/data/development.js';
import { properties } from '../src/data/properties.js';
import { articles } from '../src/data/articles.js';
import { editorial } from '../src/data/editorial.js';
import { readFileSync } from 'node:fs';

test('les textes de référence restent présents dans le cahier éditorial fourni',()=>{
  const normalize=text=>text.replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const source=normalize(readFileSync(new URL('../docs/cahier-editorial.md',import.meta.url),'utf8'));
  for(const section of editorial)for(const text of [section.title,...section.paragraphs,...section.subsections.flatMap(s=>[s.title,...s.paragraphs])])assert(source.includes(normalize(text)),text);
});

test('la sélection réelle exclut les récents, rénovés, indisponibles et démos', () => {
  const available = Array.from({ length: 6 }, (_, i) => ({ ...properties[0], id: `test-${i}`, status: 'available' }));
  const mixed = [{ ...available[0], id:'recent', isNewBuild:false }, { ...available[0], id:'renove', isNewBuild:'true' }, { ...available[0], id:'vendu', status:'unavailable' }, ...properties, ...available];
  assert.deepEqual(selectProperties(mixed).map(p=>p.id), ['test-0','test-1','test-2','test-3']);
  assert.equal(selectProperties(mixed, { limit:2 }).length, 2);
  assert.equal(selectProperties(mixed, { limit:0 }).length, 0);
  assert.equal(selectProperties([available[0]]).length,1);
  assert.equal(selectProperties(properties).length,0);
  assert.equal(selectProperties(properties,{ mode:'demo' }).length,4);
});

test('le programme absent ou confirmé sans identité n’affiche aucune offre', () => {
  assert.equal(renderDevelopment({...development,mode:'none'}),'');
  assert.equal(renderDevelopment({...development,mode:'confirmed'}),'');
  assert.match(renderDevelopment(development), /PRÉSENTATION PROVISOIRE/);
  assert.doesNotMatch(renderDevelopment(development), /Icade|Meudon|\d[\d ]+ €/);
});

test('le programme confirmé affiche seulement les champs renseignés et préremplit sa référence', () => {
  const fixture={...development,mode:'confirmed',name:'Fixture de test',id:'test-reference',description:'Texte de test',developer:null,url:null};
  const html=renderDevelopment(fixture);
  assert.match(html,/Fixture de test/);assert.match(html,/data-program-reference="test-reference"/);
  assert.doesNotMatch(html,/À confirmer|Livraison prévisionnelle|Prix à partir|Promoteur/);
  assert.match(html,/data-preview="programme"/);
});

test('les valeurs de rendu sont échappées et les URL non valides restent inactives', () => {
  assert.equal(safeUrl('javascript:alert(1)'),null);assert.equal(safeUrl('//example.com'),null);assert.equal(safeUrl('https://user:secret@example.com'),null);
  assert.equal(safeUrl('https://riveouestimmo.com/'), 'https://riveouestimmo.com/');
  const html=renderProperties([{...properties[0],title:'<img src=x onerror=alert(1)>',status:'available',url:'javascript:alert(1)',rooms:0,surfaceSqm:0,priceEur:null}]);
  assert.doesNotMatch(html,/<img src=x|href="javascript:|0 m²|0 pièce|Prix à confirmer/);
  assert.match(html,/&lt;img/);
});

test('un article prévu ne devient pas un article publié même si une URL est fournie', () => {
  const html=renderArticles([{...articles[2],url:'https://example.com/'}]);
  assert.match(html,/ARTICLE À PRODUIRE/);assert.doesNotMatch(html,/<a /);
});

test('la validation accepte le téléphone facultatif et signale les erreurs utiles', () => {
  const lead={fullName:'Test Maquette',email:'test@example.invalid',phone:'',city:'',projectType:'a_preciser',programReference:null,message:'',source:'landing_page_immobilier_neuf'};
  assert.deepEqual(validateLead(lead,true),{});
  assert.deepEqual(Object.keys(validateLead({...lead,fullName:' ',email:'mauvais',phone:'abc'},false)),['name','email','phone','consent']);
  assert.deepEqual(validateLead({...lead,phone:'+33 (0)1 23 45 67 89'},true),{});
});
