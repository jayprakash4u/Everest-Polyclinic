import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import { CENTERS_OF_EXCELLENCE } from "@/constants/centerOfExcellence";
import { querySql } from "@/lib/sql";

/* Raw SQL rather than Prisma — see lib/data/whyChooseUs.js. */

function mapCenter(row) {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    /* The stored image wins. This used to be overridden by a title-keyed
       lookup into the constants, which was harmless while the rows were
       seed-only but silently discarded anything uploaded through the admin
       panel. The constant survives as the whole-list fallback below. */
    image: row.image,
    slug: row.slug ?? null,
    sortOrder: Number(row.sortOrder),
    isActive: Boolean(Number(row.isActive)),
  };
}

async function getCentersOfExcellenceUncached() {
  try {
    const rows = await querySql(
      `SELECT id, title, description, image, slug, sortOrder, isActive
       FROM CenterOfExcellence
       WHERE isActive = 1
       ORDER BY sortOrder ASC, id ASC`,
    );

    if (rows.length) return rows.map(mapCenter);
  } catch (error) {
    console.warn("[db] Centers of excellence fallback:", error.message);
  }

  return CENTERS_OF_EXCELLENCE;
}

/* Cached across requests; the admin write routes invalidate these tags. */
export const getCentersOfExcellence = cachedRead(
  getCentersOfExcellenceUncached,
  ["getCentersOfExcellence"],
  CACHE_TAGS.centersOfExcellence,
);
