import { STATS } from "@/constants";
import { prisma } from "@/lib/db";

export async function getSiteStats() {
  try {
    const rows = await prisma.statistic.findMany({
      where: { context: "site", isActive: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    if (rows.length) {
      return rows.map((row) => ({
        id: row.id,
        value: row.value,
        label: row.label,
        sortOrder: row.sortOrder,
        isActive: row.isActive,
        context: row.context,
      }));
    }
  } catch (error) {
    console.warn("[db] Site stats fallback:", error.message);
  }

  return STATS;
}

export async function getSiteStatsAdmin() {
  try {
    return await prisma.statistic.findMany({
      where: { context: "site" },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });
  } catch (error) {
    console.warn("[db] Site stats admin fallback:", error.message);
    return [];
  }
}
