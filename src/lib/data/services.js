import {
  getAllServiceSlugs as catalogSlugs,
  getServiceBySlug as getCatalogService,
  SERVICES as CATALOG_SERVICES,
} from "@/constants/services/catalog";
import { getHomepageServiceImage } from "@/constants/services/homepageServiceImages";
import { prisma } from "@/lib/db";

function parseContentJson(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function mergeServiceRecord(catalog, dbRow, dbDetail) {
  const stored = parseContentJson(dbDetail?.contentJson);
  const base = catalog ?? {
    id: dbRow?.legacyId ?? dbRow?.id,
    slug: dbRow?.slug,
    title: dbRow?.title,
    icon: dbRow?.icon,
    category: "specialty",
  };

  const homepageImage =
    stored.homepageImage ??
    dbDetail?.headerImage ??
    getHomepageServiceImage(base.slug) ??
    null;

  return {
    ...base,
    id: base.id ?? dbRow?.legacyId ?? dbRow?.id,
    slug: dbRow?.slug ?? base.slug,
    title: dbDetail?.title ?? dbRow?.title ?? base.title,
    icon: dbRow?.icon ?? base.icon,
    shortDescription:
      stored.shortDescription ?? base.shortDescription ?? "",
    overview: stored.overview ?? stored.about ?? base.overview ?? "",
    about: stored.about ?? stored.overview ?? base.about ?? "",
    treatments: stored.treatments ?? base.treatments ?? [],
    benefits: stored.benefits ?? base.benefits ?? [],
    faqs: stored.faqs ?? base.faqs ?? [],
    conditions: stored.conditions ?? base.conditions ?? [],
    symptoms: stored.symptoms ?? base.symptoms ?? [],
    consultationSteps:
      stored.consultationSteps ?? base.consultationSteps ?? [],
    sections: stored.sections ?? base.sections ?? null,
    hero: stored.hero ?? base.hero ?? null,
    aboutBenefits: stored.aboutBenefits ?? base.aboutBenefits ?? [],
    serviceOfferings:
      stored.serviceOfferings ?? base.serviceOfferings ?? null,
    whyChooseUs: stored.whyChooseUs ?? base.whyChooseUs ?? null,
    highlights: stored.highlights ?? base.highlights ?? null,
    cta: stored.cta ?? base.cta ?? null,
    heroSideImage:
      stored.heroSideImage ??
      dbDetail?.headerImage ??
      base.heroSideImage ??
      null,
    homepageImage,
    sortOrder: dbRow?.sortOrder ?? 0,
    isActive: dbRow?.isActive ?? true,
    dbId: dbRow?.id ?? null,
  };
}

function mapDbServiceRow(row) {
  const catalog = row.slug ? getCatalogService(row.slug) : null;
  return mergeServiceRecord(catalog, row, row.detail);
}

export async function getAllServices() {
  try {
    const rows = await prisma.specialtyService.findMany({
      where: { isActive: true },
      include: { detail: true },
      orderBy: [{ sortOrder: "asc" }, { legacyId: "asc" }],
    });

    if (rows.length) {
      return rows
        .filter((row) => row.slug)
        .map(mapDbServiceRow)
        .filter((service) => service.isActive !== false);
    }
  } catch (error) {
    console.warn("[db] Services list fallback:", error.message);
  }

  return CATALOG_SERVICES.map((service) => ({
    ...service,
    homepageImage: getHomepageServiceImage(service.slug),
  }));
}

export async function getServiceBySlug(slug) {
  const catalog = getCatalogService(slug);

  try {
    const row = await prisma.specialtyService.findFirst({
      where: { slug, isActive: true },
      include: { detail: true },
    });

    if (row) {
      return mapDbServiceRow(row);
    }
  } catch (error) {
    console.warn("[db] Service by slug fallback:", error.message);
  }

  if (!catalog) return null;

  return {
    ...catalog,
    homepageImage: getHomepageServiceImage(slug),
  };
}

export async function getAllServiceSlugs() {
  try {
    const rows = await prisma.specialtyService.findMany({
      where: { isActive: true, slug: { not: null } },
      select: { slug: true },
      orderBy: [{ sortOrder: "asc" }],
    });

    if (rows.length) {
      return rows.map((row) => row.slug).filter(Boolean);
    }
  } catch (error) {
    console.warn("[db] Service slugs fallback:", error.message);
  }

  return catalogSlugs();
}

/** Admin: list all services with DB merge for dashboard/editor */
export async function getSpecialtyServicesAdminList() {
  try {
    const rows = await prisma.specialtyService.findMany({
      include: { detail: true },
      orderBy: [{ sortOrder: "asc" }, { legacyId: "asc" }],
    });

    if (rows.length) {
      return rows.filter((row) => row.slug).map(mapDbServiceRow);
    }
  } catch (error) {
    console.warn("[db] Services admin list fallback:", error.message);
  }

  return CATALOG_SERVICES.map((service, index) => ({
    ...service,
    homepageImage: getHomepageServiceImage(service.slug),
    sortOrder: index,
    isActive: true,
    dbId: null,
  }));
}

export async function getSpecialtyServiceBySlug(slug) {
  return getServiceBySlug(slug);
}
