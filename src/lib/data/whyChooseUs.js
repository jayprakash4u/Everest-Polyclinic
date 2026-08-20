import { WHY_CHOOSE_US } from "@/constants";
import { querySql } from "@/lib/sql";

/* Reads over ODBC rather than Prisma. Prisma's MSSQL adapter cannot run a
   parameterised query against this database — see lib/db-native.cjs — so every
   call threw and dumped a stack trace on each request. */

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

export async function getWhyChooseUsItems() {
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
