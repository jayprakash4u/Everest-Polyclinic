import { querySql } from "@/lib/sql";
import { TESTIMONIALS } from "@/constants";

/*
 * Hand-written SQL through `querySql` rather than Prisma.
 *
 * The original reason given here — that Prisma's MSSQL layer failed on
 * parameterised reads — no longer applies: this project runs on MySQL, where
 * the Prisma loaders alongside this file read correctly. What remains is a
 * duplicate read path. Prefer the Prisma loader in lib/data for new work, and
 * fold these back into it when the admin write routes are next touched.
 *
 * Columns are listed explicitly rather than `SELECT *` — the driver has thrown
 * "Error retrieving the result set" on the wildcard against this table.
 */

const COLUMNS = "id, name, location, rating, review, avatar, sortOrder, isActive";

function toTestimonial(row) {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    rating: row.rating,
    review: row.review,
    avatar: row.avatar || undefined,
  };
}

/**
 * What the homepage carousel renders.
 *
 * Deliberately does *not* pad the list up to a minimum from the static file the
 * way the Prisma version did. These are attributed patient reviews; topping the
 * real ones up with bundled samples would present writing nobody submitted as
 * though a named patient had said it. A short section is the honest outcome of
 * having few reviews.
 */
export async function getHomeTestimonials() {
  try {
    const rows = await querySql(
      `SELECT ${COLUMNS} FROM Testimonial
       WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC`,
    );

    if (rows.length > 0) return rows.map(toTestimonial);
  } catch (error) {
    console.warn("[db] Home testimonials fallback:", error.message);
  }

  return TESTIMONIALS;
}

/** Every review, published or not, for the admin editor. */
export async function getTestimonialsForAdmin() {
  const rows = await querySql(
    `SELECT ${COLUMNS} FROM Testimonial ORDER BY sortOrder ASC, id ASC`,
  );

  return rows.map((row) => ({
    ...toTestimonial(row),
    avatar: row.avatar || "",
    sortOrder: row.sortOrder,
    isActive: Boolean(row.isActive),
  }));
}

/**
 * Upserts the submitted list and removes anything no longer in it. Rows are
 * updated in place so ids stay stable.
 */
export async function saveTestimonials(testimonials) {
  const keptIds = testimonials.map((item) => item.id).filter(Boolean);

  if (keptIds.length > 0) {
    await querySql(
      `DELETE FROM Testimonial WHERE id NOT IN (${keptIds
        .map(() => "?")
        .join(",")})`,
      keptIds,
    );
  } else {
    await querySql(`DELETE FROM Testimonial`);
  }

  for (const [index, item] of testimonials.entries()) {
    const values = [
      item.name,
      item.location,
      item.rating,
      item.review,
      item.avatar || null,
      index,
      item.isActive === false ? 0 : 1,
    ];

    if (item.id) {
      await querySql(
        `UPDATE Testimonial
         SET name = ?, location = ?, rating = ?, review = ?, avatar = ?,
             sortOrder = ?, isActive = ?
         WHERE id = ?`,
        [...values, item.id],
      );
    } else {
      await querySql(
        `INSERT INTO Testimonial
           (name, location, rating, review, avatar, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getTestimonialsForAdmin();
}
