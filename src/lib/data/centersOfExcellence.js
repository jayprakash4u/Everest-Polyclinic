import { CENTERS_OF_EXCELLENCE } from "@/constants/centerOfExcellence";
import { prisma } from "@/lib/db";

const IMAGE_BY_TITLE = Object.fromEntries(
  CENTERS_OF_EXCELLENCE.map((item) => [item.title, item.image]),
);

function mapCenter(row) {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    image: IMAGE_BY_TITLE[row.title] ?? row.image,
    slug: row.slug ?? null,
    sortOrder: Number(row.sortOrder),
    isActive: Boolean(row.isActive),
  };
}

export async function getCentersOfExcellence() {
  try {
    const rows = await prisma.$queryRaw`
      SELECT [id], [title], [description], [image], [slug], [sortOrder], [isActive]
      FROM [dbo].[CenterOfExcellence]
      WHERE [isActive] = 1
      ORDER BY [sortOrder] ASC, [id] ASC
    `;

    if (Array.isArray(rows) && rows.length) {
      return rows.map(mapCenter);
    }
  } catch (error) {
    console.warn("[db] Centers of excellence fallback:", error.message);
  }

  return CENTERS_OF_EXCELLENCE;
}
