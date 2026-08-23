import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import {
  getAllServiceSlugs as catalogSlugs,
  getServiceBySlug as getCatalogService,
  SERVICES as CATALOG_SERVICES,
} from "@/constants/services/catalog";
import { getHomepageServiceImage } from "@/constants/services/homepageServiceImages";
import { querySql } from "@/lib/sql";

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

/* Reads over ODBC rather than Prisma — see lib/data/whyChooseUs.js. Prisma's
   `include: { detail: true }` becomes a LEFT JOIN whose detail columns are
   aliased (both tables have `id` and `title`) and re-nested by `shapeRow`, so
   `mergeServiceRecord` above sees exactly the shape it always did. */

const SERVICE_COLUMNS = `s.id, s.legacyId, s.slug, s.title, s.icon, s.sortOrder, s.isActive,
       d.id AS detailId, d.title AS detailTitle, d.description AS detailDescription,
       d.headerImage AS detailHeaderImage, d.color AS detailColor,
       d.contentJson AS detailContentJson`;

const SERVICE_FROM = `FROM SpecialtyService s
     LEFT JOIN ServiceDetail d ON d.specialtyServiceId = s.id`;

function shapeRow(row) {
  return {
    id: Number(row.id),
    legacyId: row.legacyId == null ? null : Number(row.legacyId),
    slug: row.slug,
    title: row.title,
    icon: row.icon,
    sortOrder: Number(row.sortOrder),
    // ODBC hands back 1/0 where Prisma handed back a boolean, and callers
    // compare against `false` directly.
    isActive: Boolean(Number(row.isActive)),
    detail:
      row.detailId == null
        ? null
        : {
            id: Number(row.detailId),
            title: row.detailTitle,
            description: row.detailDescription,
            headerImage: row.detailHeaderImage,
            color: row.detailColor,
            contentJson: row.detailContentJson,
          },
  };
}

function mapDbServiceRow(row) {
  const catalog = row.slug ? getCatalogService(row.slug) : null;
  return mergeServiceRecord(catalog, row, row.detail);
}

async function getAllServicesUncached() {
  try {
    const rows = (
      await querySql(
        `SELECT ${SERVICE_COLUMNS} ${SERVICE_FROM}
         WHERE s.isActive = 1
         ORDER BY s.sortOrder ASC, s.legacyId ASC`,
      )
    ).map(shapeRow);

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

async function getServiceBySlugUncached(slug) {
  const catalog = getCatalogService(slug);

  try {
    const rows = await querySql(
      `SELECT ${SERVICE_COLUMNS} ${SERVICE_FROM}
       WHERE s.slug = ? AND s.isActive = 1
       LIMIT 1`,
      [slug],
    );

    if (rows[0]) {
      return mapDbServiceRow(shapeRow(rows[0]));
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

async function getAllServiceSlugsUncached() {
  try {
    const rows = await querySql(
      `SELECT slug FROM SpecialtyService
       WHERE isActive = 1 AND slug IS NOT NULL
       ORDER BY sortOrder ASC, id ASC`,
    );

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
    const rows = (
      await querySql(
        `SELECT ${SERVICE_COLUMNS} ${SERVICE_FROM}
         ORDER BY s.sortOrder ASC, s.legacyId ASC`,
      )
    ).map(shapeRow);

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

/* Cached across requests; the admin write routes invalidate these tags. */
export const getAllServices = cachedRead(
  getAllServicesUncached,
  ["getAllServices"],
  CACHE_TAGS.services,
);

export const getServiceBySlug = cachedRead(
  getServiceBySlugUncached,
  ["getServiceBySlug"],
  CACHE_TAGS.services,
);

export const getAllServiceSlugs = cachedRead(
  getAllServiceSlugsUncached,
  ["getAllServiceSlugs"],
  CACHE_TAGS.services,
);
