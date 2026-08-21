import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import { STATIC_FAQS } from "@/constants/blogPosts";
import { querySql } from "@/lib/sql";

/* Reads over ODBC rather than Prisma — see lib/data/whyChooseUs.js. */

async function getFaqsUncached() {
  try {
    const rows = await querySql(
      `SELECT question, answer FROM Faq
       WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC`,
    );

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

/* Cached across requests; the admin write routes invalidate these tags. */
export const getFaqs = cachedRead(
  getFaqsUncached,
  ["getFaqs"],
  CACHE_TAGS.faqs,
);
