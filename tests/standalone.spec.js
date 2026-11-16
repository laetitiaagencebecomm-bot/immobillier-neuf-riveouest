import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('le contenu du fichier autonome fonctionne hors connexion avec son parcours complet',async({page,context})=>{
  await context.setOffline(true);
  const errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
  // La politique du navigateur géré interdit file://. On vérifie le contenu exact
  // de l’export par le moteur HTML, hors connexion, sans modifier cette politique.
  await page.setContent(await readFile(process.env.STANDALONE_HTML ?? new URL('../exports/maquette-immobilier-neuf.html',import.meta.url),'utf8'));
  await expect(page.locator('main>section')).toHaveCount(9);await expect(page.locator('.property-card')).toHaveCount(4);await expect(page.locator('.city-card')).toHaveCount(3);await expect(page.locator('.article-card')).toHaveCount(3);
  await page.evaluate(()=>Promise.all([...document.images].map(image=>{image.loading='eager';return image.decode().catch(()=>{});})));
  expect(await page.evaluate(()=>[...document.images].every(image=>image.naturalWidth>0))).toBeTruthy();
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.fonts.check('500 16px "Cormorant Garamond"')&&document.fonts.check('400 16px Montserrat'))).toBeTruthy();
  await page.getByRole('link',{name:'Recevoir des informations'}).click();await expect(page.locator('#programme-interest')).toHaveValue('DÉMONSTRATION — Programme à confirmer');
  await page.locator('#name').fill('Test Maquette');await page.locator('#email').fill('test@example.invalid');await page.locator('#consent').check();await page.getByRole('button',{name:'Envoyer ma demande'}).click();
  await expect(page.locator('#form-feedback')).toContainText('aucun message envoyé');expect(requests).toEqual([]);expect(errors).toEqual([]);
});
