import { querySql } from "@/lib/sql";
import { TESTIMONIALS } from "@/constants";

/*
 * Raw ODBC, for the same reason as the other homepage editors: Prisma's MSSQL
 * layer fails on parameterised reads here, so the Prisma copy in
 * lib/data/testimonials.js always falls through to the static list and admin
 * edits would never reach the page.
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
      `SELECT ${COLUMNS} FROM [dbo].[Testimonial]
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
    `SELECT ${COLUMNS} FROM [dbo].[Testimonial] ORDER BY sortOrder ASC, id ASC`,
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
      `DELETE FROM [dbo].[Testimonial] WHERE id NOT IN (${keptIds
        .map(() => "?")
        .join(",")})`,
      keptIds,
    );
  } else {
    await querySql(`DELETE FROM [dbo].[Testimonial]`);
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
        `UPDATE [dbo].[Testimonial]
         SET name = ?, location = ?, rating = ?, review = ?, avatar = ?,
             sortOrder = ?, isActive = ?
         WHERE id = ?`,
        [...values, item.id],
      );
    } else {
      await querySql(
        `INSERT INTO [dbo].[Testimonial]
           (name, location, rating, review, avatar, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getTestimonialsForAdmin();
}
