/** Données de formulaire traitées uniquement dans la mémoire du navigateur.
 * @typedef {{fullName:string,email:string,phone:string,city:string,projectType:'habiter'|'investir'|'a_preciser',programReference:string|null,message:string,source:'landing_page_immobilier_neuf'}} LeadForm
 */

export function selectProperties(properties, { mode = 'available', limit = 4 } = {}) {
  const count = Number.isInteger(limit) ? Math.max(0, Math.min(4, limit)) : 4;
  const status = mode === 'demo' ? 'demo' : 'available';
  return properties.filter((property) => property.isNewBuild === true && property.status === status).slice(0, count);
}

export function safeUrl(value) {
  if (typeof value !== 'string' || !/^https?:\/\//i.test(value) || /[\u0000-\u0020]/.test(value)) return null;
  try {
    const url = new URL(value);
    return url.username || url.password ? null : url.href;
  } catch { return null; }
}

export function validateLead(lead, consent) {
  const errors = {};
  if (!lead.fullName.trim()) errors.name = 'Indiquez votre nom et votre prénom.';
  if (!lead.email.trim()) errors.email = 'Indiquez votre adresse e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) errors.email = 'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.';
  if (lead.phone.trim() && (!/^\+?[\d\s().-]+$/.test(lead.phone.trim()) || lead.phone.replace(/\D/g, '').length < 6)) errors.phone = 'Vérifiez le numéro de téléphone ou laissez ce champ vide.';
  if (!consent) errors.consent = 'Cochez la case relative au traitement des données pour poursuivre la simulation.';
  return errors;
}
