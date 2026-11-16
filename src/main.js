import './styles/brand.css';
import './styles/page.css';
import './styles/v1.css';
import { properties } from './data/properties.js';
import { development } from './data/development.js';
import { articles } from './data/articles.js';
import { selectProperties, validateLead } from './domain.js';
import { renderProperties, renderDevelopment, renderArticles, escapeHtml } from './components/render.js';

const $ = (selector) => document.querySelector(selector);
const form = $('#project-form');
const dialog = $('#preview-dialog');
let pendingCity = '';
let submitted = false;

function renderOffers(limit = 4) {
  const selected = selectProperties(properties, { mode: 'demo', limit });
  $('#property-grid').innerHTML = renderProperties(selected);
  $('#offer-placeholders').hidden = selected.length === 0;
  $('#empty-offers').hidden = selected.length > 0;
}
function renderProgramme(mode = development.mode) {
  const html = renderDevelopment({ ...development, mode });
  $('#development-content').innerHTML = html;
  $('#programme').hidden = !html;
  $('#review-status').textContent = mode === 'confirmed' && !html
    ? 'Aucun programme confirmé renseigné : le bloc est masqué. Les annonces restent indépendantes.'
    : 'Les modules sont testés indépendamment.';
}
renderOffers();
renderProgramme();
$('#articles').innerHTML = renderArticles(articles);

$('#review-properties').addEventListener('change', (event) => renderOffers(Number(event.target.value)));
$('#review-development').addEventListener('change', (event) => renderProgramme(event.target.value));
$('#review-reset').addEventListener('click', () => {
  $('#review-properties').value = '4';
  $('#review-development').value = 'demo';
  renderOffers(); renderProgramme();
});

function closeMenu() {
  $('.menu-toggle').setAttribute('aria-expanded', 'false');
  $('#navigation').classList.remove('is-open');
}
$('.menu-toggle').addEventListener('click', () => {
  const open = $('.menu-toggle').getAttribute('aria-expanded') !== 'true';
  $('.menu-toggle').setAttribute('aria-expanded', String(open));
  $('#navigation').classList.toggle('is-open', open);
});
$('#navigation').addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeMenu();
    $('.buy-menu').open = false;
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if ($('.menu-toggle').getAttribute('aria-expanded') === 'true') {
    closeMenu(); $('.menu-toggle').focus();
  }
  if ($('.review-panel').open) {
    $('.review-panel').open = false;
    $('.review-panel summary').focus();
  }
});

const previews = {
  property: ['La fiche du logement', 'Cette carte est une démonstration. Elle conduira à la fiche du logement neuf correspondant après intégration par Roland. Aucun prix ni aucune disponibilité réelle ne sont annoncés.'],
  selection: ['Tous les logements neufs', 'Cette action est une démonstration. La destination de la sélection complète sera renseignée lors de l’intégration. Vous pouvez poursuivre vers le formulaire de simulation.'],
  programme: ['Le programme à la une', 'Présentation provisoire : le nom, le visuel et les caractéristiques du programme seront renseignés manuellement après validation. Aucun programme réel n’est annoncé ici.'],
};
document.addEventListener('click', (event) => {
  const preview = event.target.closest('[data-preview]');
  if (preview) {
    pendingCity = preview.dataset.city ?? '';
    const [title, text] = preview.dataset.preview === 'city'
      ? [`Les logements neufs à ${pendingCity}`, 'Cette sélection est un emplacement de démonstration. Son lien sera renseigné après vérification de la sélection neuve par commune. Vous pouvez préciser votre recherche dans le formulaire de simulation.']
      : previews[preview.dataset.preview];
    $('#preview-title').textContent = title;
    $('#preview-content').textContent = text;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  const referenceLink = event.target.closest('[data-program-reference]');
  if (referenceLink) {
    $('#programme-interest').value = referenceLink.dataset.programReference;
  }
});
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
$('#dialog-contact').addEventListener('click', () => {
  dialog.close();
  if (pendingCity) $('#city').value = pendingCity;
  pendingCity = '';
  $('#contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  $('#name').focus({ preventScroll: true });
});

/** @returns {import('./domain.js').LeadForm} */
function readLead() {
  return {
    fullName: form.elements.fullName.value.trim(),
    email: form.elements.email.value.trim(),
    phone: form.elements.phone.value.trim(),
    city: form.elements.city.value,
    projectType: form.elements.projectType.value,
    programReference: form.elements.programReference.value.trim() || null,
    message: form.elements.message.value.trim(),
    source: 'landing_page_immobilier_neuf',
  };
}
function showErrors(errors) {
  for (const id of ['name', 'email', 'phone', 'consent']) {
    const error = errors[id];
    $(`#${id}`).setAttribute('aria-invalid', String(Boolean(error)));
    $(`#${id}-error`).hidden = !error;
    $(`#${id}-error`).textContent = error ?? '';
  }
  $('#form-errors').hidden = Object.keys(errors).length === 0;
  $('#form-errors').innerHTML = Object.keys(errors).length
    ? `<p>Vérifiez les champs suivants :</p><ul>${Object.entries(errors).map(([id, text]) => `<li><a href="#${id}">${escapeHtml(text)}</a></li>`).join('')}</ul>`
    : '';
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitted = true;
  const lead = readLead();
  const errors = validateLead(lead, $('#consent').checked);
  showErrors(errors);
  $('#form-feedback').hidden = true;
  if (Object.keys(errors).length) {
    $('#form-errors').focus();
    return;
  }
  $('#form-feedback').textContent = 'Démonstration — aucun message envoyé. La saisie est valide. Aucune demande n’a été transmise et aucune donnée n’a été enregistrée.';
  $('#form-feedback').hidden = false;
  $('#form-feedback').focus();
  // Aucun envoi, journal, stockage ou conservation de l’objet lead après cet événement.
});
form.addEventListener('input', () => {
  $('#form-feedback').hidden = true;
  if (submitted) showErrors(validateLead(readLead(), $('#consent').checked));
});
$('#form-errors').addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link) { event.preventDefault(); $(link.getAttribute('href')).focus(); }
});
$('#provenance').value = location.origin === 'null' ? 'maquette-autonome-locale' : location.origin + location.pathname;
