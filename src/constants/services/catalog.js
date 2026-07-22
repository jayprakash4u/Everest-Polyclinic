/**
 * Service registry — slim identity list.
 * Only used for: navbar dropdown, static page slugs, icon mapping.
 * All rich content lives in pageContent.js.
 */

import { enrichServicesWithPageContent } from "./pageContent";

const SERVICES_RAW = [
  { id: 1, slug: "general-medicine", title: "General Medicine", icon: "stethoscope" },
  { id: 2, slug: "family-medicine", title: "Family Medicine", icon: "users" },
  { id: 3, slug: "pediatrics", title: "Pediatrics", icon: "baby" },
  { id: 4, slug: "gynecology", title: "Gynecology", icon: "maternity" },
  { id: 5, slug: "orthopedics", title: "Orthopedics", icon: "bone" },
  { id: 6, slug: "cardiology", title: "Cardiology", icon: "heart" },
  { id: 7, slug: "dermatology", title: "Dermatology", icon: "sparkles" },
  { id: 8, slug: "ent", title: "ENT", icon: "ear" },
  { id: 9, slug: "dental-care", title: "Dental Care", icon: "tooth" },
  { id: 10, slug: "physiotherapy", title: "Physiotherapy", icon: "activity" },
  { id: 11, slug: "laboratory", title: "Laboratory", icon: "microscope" },
  { id: 12, slug: "diagnostic-imaging", title: "Diagnostic Imaging", icon: "scan" },
  { id: 13, slug: "vaccination", title: "Vaccination", icon: "syringe" },
  { id: 14, slug: "health-checkup", title: "Health Checkup", icon: "clipboardcheck" },
  { id: 15, slug: "pharmacy", title: "Pharmacy", icon: "pill" },
  { id: 16, slug: "home-care", title: "Home Care", icon: "homecare" },
  { id: 17, slug: "telemedicine", title: "Telemedicine", icon: "telemedicine" },
];

export const SERVICES = enrichServicesWithPageContent(SERVICES_RAW);

export function getServiceBySlug(slug) {
  return SERVICES.find((service) => service.slug === slug) ?? null;
}

export function getAllServiceSlugs() {
  return SERVICES.map((service) => service.slug);
}

export function getServiceNavItems() {
  return SERVICES.map(({ id, slug, title, icon }) => ({ id, slug, title, icon }));
}

export { getServiceCategories, SERVICE_CATEGORIES } from "./categories";
