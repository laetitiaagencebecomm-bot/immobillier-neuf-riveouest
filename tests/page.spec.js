import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { editorial } from '../src/data/editorial.js';
import { mkdir } from 'node:fs/promises';

const normalize=(text)=>text.replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
test.beforeEach(async ({page},info)=>{
  page.on('pageerror',error=>info.annotations.push({type:'javascript-error',description:error.message}));
  await page.goto('/');
});
test.afterEach(async ({},info)=>{expect(info.annotations.filter(a=>a.type==='javascript-error')).toEqual([]);});

test('les neuf sections reprennent intégralement la rédaction approuvée',async({page})=>{
  await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('main>section')).toHaveCount(9);
  await expect(page.locator('.city-card')).toHaveCount(3);await expect(page.locator('.article-card')).toHaveCount(3);
  const actual=normalize(await page.locator('main').innerText());
  for(const section of editorial){
    for(const text of [section.title,...section.paragraphs,...section.subsections.flatMap(s=>[s.title,...s.paragraphs])])expect(actual,`Section ${section.id}: ${text}`).toContain(normalize(text));
  }
  const brokenAnchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].map(a=>a.hash).filter(hash=>!document.getElementById(hash.slice(1))));
  expect(brokenAnchors).toEqual([]);
});

test('0/2/4 annonces et absence de programme restent indépendants du blog',async({page})=>{
  await page.getByText('Tester les états',{exact:true}).click();
  for(const count of [2,0,4]){
    await page.locator('#review-properties').selectOption(String(count));
    await expect(page.locator('.property-card')).toHaveCount(count);
    await expect(page.locator('#empty-offers'))[count===0?'toBeVisible':'toBeHidden']();
    await expect(page.locator('#programme')).toBeVisible();await expect(page.locator('.article-card')).toHaveCount(3);
  }
  await page.locator('#review-development').selectOption('none');await expect(page.locator('#programme')).toBeHidden();await expect(page.locator('.property-card')).toHaveCount(4);
  await page.locator('#review-development').selectOption('confirmed');await expect(page.locator('#programme')).toBeHidden();await expect(page.locator('#review-status')).toContainText('Aucun programme confirmé');
  await page.locator('#review-reset').click();await expect(page.locator('#programme')).toBeVisible();
});

test('les CTA conduisent au formulaire et préremplissent programme et commune',async({page})=>{
  await page.getByRole('link',{name:'Découvrir nos logements neufs',exact:true}).click();await expect(page).toHaveURL(/#logements$/);
  await page.getByRole('link',{name:'Recevoir des informations'}).click();await expect(page).toHaveURL(/#contact$/);await expect(page.locator('#programme-interest')).toHaveValue('DÉMONSTRATION — Programme à confirmer');
  await page.getByRole('button',{name:'Découvrir les logements neufs à Clamart'}).click();await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('#dialog-contact').click();await expect(page.locator('#city')).toHaveValue('Clamart');await expect(page.locator('#name')).toBeFocused();
  await page.getByRole('button',{name:'Voir le bien',exact:true}).first().click();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();
  await page.getByRole('link',{name:'Échanger avec un conseiller'}).click();await expect(page).toHaveURL(/#contact$/);
});

test('les erreurs sont accessibles et la simulation ne transmet ni ne conserve de données',async({page,context})=>{
  await page.getByRole('button',{name:'Envoyer ma demande'}).click();await expect(page.locator('#form-errors')).toBeFocused();await expect(page.locator('#name')).toHaveAttribute('aria-invalid','true');
  await page.locator('#form-errors a').first().click();await expect(page.locator('#name')).toBeFocused();
  await page.locator('#name').fill('Test Maquette');await page.locator('#email').fill('incorrect');await page.getByRole('button',{name:'Envoyer ma demande'}).click();await expect(page.locator('#email-error')).toBeVisible();
  await page.locator('#email').fill('test@example.invalid');await page.locator('#consent').check();
  const requests=[];page.on('request',r=>requests.push(r.url()));
  await page.getByRole('button',{name:'Envoyer ma demande'}).click();await expect(page.locator('#form-feedback')).toContainText('Démonstration — aucun message envoyé');
  expect(requests).toEqual([]);expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  expect(await page.evaluate(async()=>await indexedDB.databases())).toEqual([]);
});

test('clavier, menu mobile et mouvement réduit',async({page})=>{
  await page.setViewportSize({width:375,height:850});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();
  await page.getByRole('button',{name:'Menu',exact:false}).click();await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','false');await expect(page.locator('.menu-toggle')).toBeFocused();
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

for(const width of [375,430,768,1440,1920])test(`responsive et ressources à ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>Promise.all([...document.images].map(image=>{image.loading='eager';return image.decode().catch(()=>{});})));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  expect(await page.evaluate(()=>[...document.images].filter(image=>!image.naturalWidth).map(image=>image.src))).toEqual([]);
  expect(await page.evaluate(()=>document.fonts.check('500 16px "Cormorant Garamond"')&&document.fonts.check('400 16px Montserrat'))).toBeTruthy();
  await mkdir('exports/captures',{recursive:true});
  await page.screenshot({path:`exports/captures/page-${width}.png`,fullPage:true});
  if(width===375||width===1440)await page.screenshot({path:`exports/captures/apercu-${width}.png`});
});

test('accessibilité automatisée WCAG 2.1 AA à 375 et 1440px',async({page})=>{
  for(const width of [375,1440]){
    await page.setViewportSize({width,height:1000});
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
  }
});
