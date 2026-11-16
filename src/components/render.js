import { safeUrl } from '../domain.js';
import { editorial } from '../data/editorial.js';

export const arrow = '<svg class="link-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 19 19 5M5 5h14v14"/></svg>';
export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
export function asset(path) {
  return globalThis.__RIVE_PREVIEW_ASSETS__?.[path] ?? `${import.meta.env?.BASE_URL ?? '/'}assets/${path}`;
}
const imageSource = (path) => escapeHtml(/^https?:/.test(path ?? '') ? safeUrl(path) ?? asset('residence-illustration.svg') : asset(path || 'residence-illustration.svg'));
const number = (value) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
const money = (value) => `${number(value)} €`;
const hasNumber = (value) => typeof value === 'number' && Number.isFinite(value) && value > 0;
const paragraphs = (values) => values.map((text) => `<p>${escapeHtml(text)}</p>`).join('');
const cta = (url, label, kind, extra = '') => safeUrl(url)
  ? `<a class="${kind}" href="${escapeHtml(safeUrl(url))}">${label} ${arrow}</a>`
  : `<button type="button" class="${kind}" data-preview="${extra}">${label} ${arrow}</button>`;

export function renderProperties(properties) {
  return properties.map((property, index) => {
    const demo = property.status === 'demo';
    const specs = [hasNumber(property.rooms) ? `${number(property.rooms)} pièce${property.rooms > 1 ? 's' : ''}` : '', hasNumber(property.surfaceSqm) ? `${number(property.surfaceSqm)} m²` : ''].filter(Boolean);
    return `<article class="property-card" data-property-id="${escapeHtml(property.id)}" data-status="${demo ? 'demo' : 'available'}"><div class="property-photo"><img src="${imageSource(property.image)}" alt="${demo ? '' : escapeHtml(property.title)}" width="763" height="973" loading="lazy" ${index > 1 ? 'class="alternate-crop"' : ''}>${demo ? `<span class="photo-label">DÉMONSTRATION ${String(index + 1).padStart(2, '0')}</span>` : ''}</div><div class="property-body">${property.city || demo ? `<p class="property-location">${escapeHtml(property.city || 'Commune à renseigner')}${property.developmentName ? ` · ${escapeHtml(property.developmentName)}` : ''}</p>` : ''}<h3>${escapeHtml(property.title)}</h3>${specs.length || demo ? `<p class="property-specs">${specs.length ? specs.join(' · ') : 'Pièces · Surface à confirmer'}</p>` : ''}<div class="property-bottom">${hasNumber(property.priceEur) ? `<span class="price">${money(property.priceEur)}</span>` : demo ? '<span class="placeholder-price">Prix à confirmer</span>' : ''}${cta(demo ? null : property.url, 'Voir le bien', 'card-link', 'property')}</div></div></article>`;
  }).join('');
}

export function renderDevelopment(development) {
  if (!['demo', 'confirmed'].includes(development.mode) || (development.mode === 'confirmed' && !development.name?.trim())) return '';
  const demo = development.mode === 'demo';
  const details = demo ? [['Typologies', 'À confirmer'], ['Surfaces et prix', 'À confirmer'], ['Livraison', 'Si confirmée']] : [
    ['Promoteur', development.developer], ['Typologies', development.typologies], ['Livraison prévisionnelle', development.deliveryDate], ['Prix à partir de', hasNumber(development.priceFrom) ? money(development.priceFrom) : null],
  ].filter(([, value]) => value !== null && value !== undefined && String(value).trim());
  const content = editorial[2];
  const reference = demo ? 'DÉMONSTRATION — Programme à confirmer' : development.id;
  return `<figure class="programme-visual ${demo ? 'programme-demo-visual' : ''}"><img src="${imageSource(development.image)}" width="800" height="650" alt="${demo ? 'Dessin architectural de démonstration, sans programme réel' : escapeHtml(development.name)}" loading="lazy"><figcaption>${demo ? 'Visuel de démonstration · programme à confirmer' : escapeHtml(development.name)}</figcaption></figure><div class="editorial-copy programme-copy"><p class="eyebrow">PROGRAMME À LA UNE</p><h2 id="programme-title">${escapeHtml(content.title)}</h2>${paragraphs(content.paragraphs)}<div class="programme-fields">${demo ? '<span class="module-tag">PRÉSENTATION PROVISOIRE</span>' : ''}<h3>${escapeHtml(demo ? 'Nom du programme à confirmer' : development.name)}</h3>${development.city ? `<p>${escapeHtml(development.city)}</p>` : demo ? '<p>Commune · Quartier à confirmer</p>' : ''}${!demo && development.description ? `<p>${escapeHtml(development.description)}</p>` : ''}${details.length ? `<dl>${details.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>` : ''}</div><div class="actions">${cta(demo ? null : development.url, 'Découvrir le programme', 'btn primary', 'programme')}<a class="text-link" href="#contact" data-program-reference="${escapeHtml(reference)}">Recevoir des informations ${arrow}</a></div>${demo ? '<p class="demo-note">Aucune opération commerciale présentée. Ce module sera renseigné manuellement après validation.</p>' : ''}</div>`;
}

export function renderArticles(articles) {
  return articles.filter((article) => article.tag === 'immobilier-neuf').slice(0, 3).map((article) => {
    const url = article.status === 'published' ? safeUrl(article.url) : null;
    const title = escapeHtml(article.title);
    return `<article class="article-card ${article.status === 'planned' ? 'planned-article' : ''}">${article.image ? `<img class="article-image" src="${imageSource(article.image)}" width="764" height="500" alt="" loading="lazy">` : `<div class="planned-image"><span class="module-tag">ARTICLE À PRODUIRE</span><img src="${imageSource('residence-illustration.svg')}" alt="" width="170" height="140" loading="lazy"></div>`}<div class="article-body"><p class="article-category">${article.status === 'planned' ? 'CHOISIR SON QUARTIER' : article.id === 'vefa' ? 'ACHETER SUR PLAN' : 'PRÉPARER SON ACHAT'}</p><h3>${url ? `<a href="${escapeHtml(url)}">${title}</a>` : title}</h3><p class="article-excerpt">${escapeHtml(article.excerpt)}</p>${url ? `<a class="card-link article-link" href="${escapeHtml(url)}">Lire l'article ${arrow}</a>` : `<span class="planned-label">${article.status === 'planned' ? 'À venir après validation éditoriale' : 'Lien à confirmer'}</span>`}</div></article>`;
  }).join('');
}
