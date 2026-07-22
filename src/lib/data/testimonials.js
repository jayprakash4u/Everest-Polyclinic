import { TESTIMONIALS } from "@/constants";
import { prisma } from "@/lib/db";

export async function getTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        location: row.location,
        rating: row.rating,
        review: row.review,
        avatar: row.avatar ?? undefined,
      }));
    }
  } catch (error) {
    console.warn("[db] Testimonials fallback:", error.message);
  }

  return TESTIMONIALS;
}
