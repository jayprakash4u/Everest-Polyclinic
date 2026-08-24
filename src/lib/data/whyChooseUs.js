import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import { WHY_CHOOSE_US } from "@/constants";
import { querySql } from "@/lib/sql";

/* Hand-written SQL via lib/sql.js rather than Prisma: this query needs a
   filter + order-by that's simpler to express directly than through Prisma's
   query builder. See lib/sql.js for the shared pool. */

function mapItem(row) {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    icon: row.icon,
    sortOrder: Number(row.sortOrder),
    isActive: Boolean(Number(row.isActive)),
  };
}

async function getWhyChooseUsItemsUncached() {
  try {
    const rows = await querySql(
      `SELECT id, title, description, icon, sortOrder, isActive
       FROM WhyChooseUsItem
       WHERE isActive = 1
       ORDER BY sortOrder ASC, id ASC`,
    );

    if (rows.length) return rows.map(mapItem);
  } catch (error) {
    console.warn("[db] Why choose us fallback:", error.message);
  }

  return WHY_CHOOSE_US;
}

/* Cached across requests; the admin write routes invalidate these tags. */
export const getWhyChooseUsItems = cachedRead(
  getWhyChooseUsItemsUncached,
  ["getWhyChooseUsItems"],
  CACHE_TAGS.whyChooseUs,
);
