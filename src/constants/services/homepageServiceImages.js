const BASE = "/images/our medical services";

/**
 * Homepage “Our medical services” icons — keyed by service slug.
 *
 * The artwork ships as `111111.png` … `88888.png`. The numbers are the export
 * order, not the service, so each entry is commented with the glyph it actually
 * contains: mapping was done by opening the files, not by trusting filenames.
 * Renaming them to their slug would remove the need for this note entirely.
 */
export const HOMEPAGE_SERVICE_IMAGES = {
  // Note the seven 1s — `111111.png` (six) is the earlier, smaller-drawn
  // version of the same glyph and is no longer used.
  "health-checkup": `${BASE}/1111111.png`, // heart with pulse trace
  pharmacy: `${BASE}/22222.png`, // capsule and tablets
  "home-care": `${BASE}/333333.png`, // house enclosing a heart
  telemedicine: `${BASE}/44444.png`, // monitor, clinician, chat bubble
  "general-medicine": `${BASE}/55555.png`, // stethoscope
  "family-medicine": `${BASE}/6666.png`, // family group beneath a heart
  pediatrics: `${BASE}/77777.png`, // infant face
  gynecology: `${BASE}/88888.png`, // Venus symbol
};

/**
 * The homepage grid is exactly these eight, in this order — preventive care
 * first, then the everyday departments. Ordering here rather than slicing the
 * catalog keeps the grid stable when services are added or reordered upstream,
 * and guarantees every tile has artwork.
 */
export const HOMEPAGE_SERVICE_SLUGS = [
  "health-checkup",
  "pharmacy",
  "home-care",
  "telemedicine",
  "general-medicine",
  "family-medicine",
  "pediatrics",
  "gynecology",
];

export function getHomepageServiceImage(slug) {
  return HOMEPAGE_SERVICE_IMAGES[slug] ?? null;
}
