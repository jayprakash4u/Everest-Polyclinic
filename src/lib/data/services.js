import {
  getAllServiceSlugs as catalogSlugs,
  getServiceBySlug as getCatalogService,
} from "@/constants/services/catalog";
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

  return {
    id: catalog.id,
    slug: catalog.slug,
    title: dbDetail?.title ?? dbRow?.title ?? catalog.title,
    icon: dbRow?.icon ?? catalog.icon,
    category: "specialty",
    ...(dbRow?.detail && stored.overview ? { overview: stored.overview } : {}),
    ...(dbRow?.detail && stored.shortDescription ? { shortDescription: stored.shortDescription } : {}),
    ...(dbRow?.detail && stored.treatments?.length ? { treatments: stored.treatments } : {}),
    ...(dbRow?.detail && stored.benefits?.length ? { benefits: stored.benefits } : {}),
    ...(dbRow?.detail && stored.faqs?.length ? { faqs: stored.faqs } : {}),
    ...(dbRow?.detail && stored.conditions?.length ? { conditions: stored.conditions } : {}),
    ...(dbRow?.detail && stored.symptoms?.length ? { symptoms: stored.symptoms } : {}),
    ...(dbRow?.detail && stored.highlights?.length ? { highlights: stored.highlights } : {}),
    ...(dbRow?.detail && stored.sections ? { sections: stored.sections } : {}),
    isActive: dbRow?.isActive ?? true,
  };
}

export async function getAllServices() {
  try {
    const rows = await prisma.specialtyService.findMany({
      where: { isActive: true },
      include: { detail: true },
      orderBy: [{ sortOrder: "asc" }, { legacyId: "asc" }],
    });

    const bySlug = new Map(
      rows.filter((row) => row.slug).map((row) => [row.slug, row]),
    );

    return rows
      .filter((row) => row.slug)
      .map((row) => {
        const catalog = getCatalogService(row.slug);
        if (!catalog) return null;
        const merged = mergeServiceRecord(catalog, row, row.detail);
        return merged.isActive !== false ? merged : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("[db] Services list fallback:", error.message);
    return [];
  }
}

export async function getServiceBySlug(slug) {
  const catalog = getCatalogService(slug);
  if (!catalog) return null;

  try {
    const row = await prisma.specialtyService.findFirst({
      where: { slug, isActive: true },
      include: { detail: true },
    });

    if (row?.detail) {
      return mergeServiceRecord(catalog, row, row.detail);
    }
  } catch (error) {
    console.warn("[db] Service by slug fallback:", error.message);
  }

  return catalog;
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

    const bySlug = new Map(rows.filter((r) => r.slug).map((r) => [r.slug, r]));

    return rows
      .filter((row) => row.slug)
      .map((row) => {
        const catalog = getCatalogService(row.slug);
        if (!catalog) return null;
        const merged = mergeServiceRecord(catalog, row, row.detail);
        return merged.isActive !== false ? merged : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("[db] Services admin list fallback:", error.message);
    return [];
  }
}

export async function getSpecialtyServiceBySlug(slug) {
  const catalog = getCatalogService(slug);
  if (!catalog) return null;

  try {
    const row = await prisma.specialtyService.findFirst({
      where: { slug },
      include: { detail: true },
    });

    if (row) {
      return mergeServiceRecord(catalog, row, row.detail);
    }
  } catch (error) {
    console.warn("[db] Admin service fallback:", error.message);
  }

  return catalog;
}
