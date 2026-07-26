const BASE = "/images/our medical services";

/** Homepage “Our medical services” carousel icons — keyed by service slug */
export const HOMEPAGE_SERVICE_IMAGES = {
  "general-medicine": `${BASE}/General medicine'.png`,
  "family-medicine": `${BASE}/Family medicines.png`,
  pediatrics: `${BASE}/pediatrics.png`,
  gynecology: `${BASE}/gynacology.png`,
  orthopedics: `${BASE}/orthopodics.png`,
  cardiology: `${BASE}/cardiology.png`,
  dermatology: `${BASE}/Dermatology.png`,
  ent: `${BASE}/Ent.png`,
  "dental-care": `${BASE}/Dental care.png`,
  physiotherapy: `${BASE}/Physiotherapy.png`,
  laboratory: `${BASE}/laboratory.png`,
  "diagnostic-imaging": `${BASE}/Diagnostic.png`,
  vaccination: `${BASE}/Vaccination.png`,
  "health-checkup": `${BASE}/Healthcheckup.png`,
  pharmacy: `${BASE}/Pharmacy.png`,
  "home-care": `${BASE}/Home care.png`,
  telemedicine: `${BASE}/Telemedicine.png`,
};

export function getHomepageServiceImage(slug) {
  return HOMEPAGE_SERVICE_IMAGES[slug] ?? null;
}
