import { STATIC_FAQS } from "@/constants/blogPosts";
import { prisma } from "@/lib/db";

export async function getFaqs() {
  try {
    const rows = await prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return rows.map((row) => ({
        question: row.question,
        answer: row.answer,
      }));
    }
  } catch (error) {
    console.warn("[db] FAQs fallback:", error.message);
  }

  return STATIC_FAQS;
}
