import { SERVICES } from "./catalog";

/**
 * Service categories — grouping only, not pages.
 * Each entry references a service slug from the catalog.
 */
export const SERVICE_CATEGORIES = [
  {
    id: "medical",
    title: "Medical Services",
    description:
      "Consultant-led specialties for diagnosis, treatment, and ongoing medical care.",
    slugs: [
      "general-medicine",
      "family-medicine",
      "pediatrics",
      "gynecology",
      "orthopedics",
      "cardiology",
      "dermatology",
      "ent",
      "dental-care",
    ],
  },
  {
    id: "patient-care",
    title: "Patient Care",
    description:
      "Support services that extend care beyond the consultation room.",
    slugs: [
      "vaccination",
      "home-care",
      "telemedicine",
      "pharmacy",
      "physiotherapy",
    ],
  },
  {
    id: "diagnostic",
    title: "Diagnostic Services",
    description:
      "Laboratory testing, imaging, and preventive health screening under one roof.",
    slugs: ["laboratory", "diagnostic-imaging", "health-checkup"],
  },
];

/** Resolve category slugs into full service objects from the catalog. */
export function resolveCategoriesWithServices(services = SERVICES) {
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  return SERVICE_CATEGORIES.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    services: category.slugs
      .map((slug) => {
        const service = bySlug.get(slug);
        if (!service) return null;
        return {
          id: service.id,
          slug: service.slug,
          title: service.title,
          icon: service.icon,
          shortDescription: service.shortDescription,
        };
      })
      .filter(Boolean),
  }));
}

export function getServiceCategories() {
  return resolveCategoriesWithServices(SERVICES);
}

export function getCategoryForSlug(slug) {
  const category = SERVICE_CATEGORIES.find((item) => item.slugs.includes(slug));
  return category?.title ?? null;
}
