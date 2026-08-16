import { WHY_CHOOSE_US } from "@/constants";
import { prisma } from "@/lib/db";

function mapItem(row) {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    icon: row.icon,
    sortOrder: Number(row.sortOrder),
    isActive: Boolean(row.isActive),
  };
}

export async function getWhyChooseUsItems() {
  try {
    const rows = await prisma.$queryRaw`
      SELECT [id], [title], [description], [icon], [sortOrder], [isActive]
      FROM [dbo].[WhyChooseUsItem]
      WHERE [isActive] = 1
      ORDER BY [sortOrder] ASC, [id] ASC
    `;

    if (Array.isArray(rows) && rows.length) {
      return rows.map(mapItem);
    }
  } catch (error) {
    console.warn("[db] Why choose us fallback:", error.message);
  }

  return WHY_CHOOSE_US;
}
