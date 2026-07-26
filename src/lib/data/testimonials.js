import { TESTIMONIALS } from "@/constants";
import { prisma } from "@/lib/db";

function mapTestimonial(row) {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: row.rating,
    review: row.review,
    avatar: row.avatar ?? undefined,
  };
}

function mergeToMinimum(items, minimum = 6) {
  if (items.length >= minimum) return items;

  const seen = new Set(items.map((item) => item.name));
  const merged = [...items];

  for (const item of TESTIMONIALS) {
    if (merged.length >= minimum) break;
    if (!seen.has(item.name)) {
      merged.push(item);
      seen.add(item.name);
    }
  }

  return merged.length > 0 ? merged : TESTIMONIALS;
}

export async function getTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return mergeToMinimum(rows.map(mapTestimonial));
    }
  } catch (error) {
    console.warn("[db] Testimonials fallback:", error.message);
  }

  return TESTIMONIALS;
}
