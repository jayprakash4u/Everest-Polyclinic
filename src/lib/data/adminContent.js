import { querySql } from "@/lib/sql";

/*
 * Doctors, gallery images and blog posts for the page editors.
 *
 * Hand-written SQL through `querySql` rather than Prisma.
 *
 * The original reason given here — that Prisma's MSSQL layer failed on
 * parameterised reads — no longer applies: this project runs on MySQL, where
 * the Prisma loaders alongside this file read correctly. What remains is a
 * duplicate read path. Prefer the Prisma loader in lib/data for new work, and
 * fold these back into it when the admin write routes are next touched.
 *
 * Columns are always listed explicitly — the driver has thrown "Error
 * retrieving the result set" on `SELECT *` against some of these tables.
 */

/** Deletes rows whose id is no longer in the submitted list. */
async function pruneMissing(table, keptIds) {
  if (keptIds.length > 0) {
    await querySql(
      `DELETE FROM ${table} WHERE id NOT IN (${keptIds
        .map(() => "?")
        .join(",")})`,
      keptIds,
    );
  } else {
    await querySql(`DELETE FROM ${table}`);
  }
}

/* ────────────────────────────── Doctors ────────────────────────────── */

const DOCTOR_COLUMNS =
  "id, categoryId, name, education, experience, image, phone, timing, showOnHomepage, sortOrder, isActive";

export async function getDoctorCategories() {
  return querySql(
    `SELECT id, name, slug, sortOrder FROM DoctorCategory
     WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC`,
  );
}

export async function getDoctorsForAdmin() {
  const rows = await querySql(
    `SELECT ${DOCTOR_COLUMNS} FROM Doctor ORDER BY sortOrder ASC, id ASC`,
  );

  return rows.map((row) => ({
    id: row.id,
    categoryId: row.categoryId,
    name: row.name,
    education: row.education,
    experience: row.experience,
    image: row.image,
    phone: row.phone ?? "",
    timing: row.timing ?? "",
    showOnHomepage: Boolean(Number(row.showOnHomepage)),
    isActive: Boolean(Number(row.isActive)),
  }));
}

export async function saveDoctors(doctors) {
  await pruneMissing("Doctor", doctors.map((d) => d.id).filter(Boolean));

  for (const [index, doctor] of doctors.entries()) {
    const values = [
      doctor.categoryId,
      doctor.name,
      doctor.education,
      doctor.experience,
      doctor.image,
      doctor.phone || null,
      doctor.timing || null,
      doctor.showOnHomepage ? 1 : 0,
      index,
      doctor.isActive === false ? 0 : 1,
    ];

    if (doctor.id) {
      await querySql(
        `UPDATE Doctor
         SET categoryId = ?, name = ?, education = ?, experience = ?, image = ?,
             phone = ?, timing = ?, showOnHomepage = ?, sortOrder = ?,
             isActive = ?, updatedAt = UTC_TIMESTAMP()
         WHERE id = ?`,
        [...values, doctor.id],
      );
    } else {
      await querySql(
        `INSERT INTO Doctor
           (categoryId, name, education, experience, image, phone, timing,
            showOnHomepage, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getDoctorsForAdmin();
}

/* ────────────────────────────── Gallery ────────────────────────────── */

export async function getGalleryForAdmin() {
  const rows = await querySql(
    `SELECT id, src, alt, caption, sortOrder, isActive FROM GalleryImage
     ORDER BY sortOrder ASC, id ASC`,
  );

  return rows.map((row) => ({
    id: row.id,
    src: row.src,
    alt: row.alt,
    caption: row.caption ?? "",
    isActive: Boolean(Number(row.isActive)),
  }));
}

export async function saveGallery(images) {
  await pruneMissing("GalleryImage", images.map((i) => i.id).filter(Boolean));

  for (const [index, image] of images.entries()) {
    const values = [
      image.src,
      image.alt,
      image.caption || null,
      index,
      image.isActive === false ? 0 : 1,
    ];

    if (image.id) {
      await querySql(
        `UPDATE GalleryImage
         SET src = ?, alt = ?, caption = ?, sortOrder = ?, isActive = ?
         WHERE id = ?`,
        [...values, image.id],
      );
    } else {
      await querySql(
        `INSERT INTO GalleryImage (src, alt, caption, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getGalleryForAdmin();
}

/* ─────────────────────────────── Blog ─────────────────────────────── */

const BLOG_COLUMNS =
  "id, title, slug, excerpt, body, image, categoryId, readTimeMinutes, featured, isPublished, publishedAt";

export async function getBlogCategories() {
  return querySql(
    `SELECT id, name, slug FROM BlogCategory ORDER BY name ASC`,
  );
}

export async function getBlogPostsForAdmin() {
  const rows = await querySql(
    `SELECT ${BLOG_COLUMNS} FROM BlogPost ORDER BY publishedAt DESC, id DESC`,
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body ?? "",
    image: row.image,
    categoryId: row.categoryId,
    readTimeMinutes: row.readTimeMinutes,
    featured: Boolean(Number(row.featured)),
    isPublished: Boolean(Number(row.isPublished)),
    /* Sent to the client as YYYY-MM-DD so it drops straight into a date input. */
    publishedAt: row.publishedAt
      ? new Date(row.publishedAt).toISOString().slice(0, 10)
      : "",
  }));
}

export async function saveBlogPosts(posts) {
  await pruneMissing("BlogPost", posts.map((p) => p.id).filter(Boolean));

  for (const post of posts) {
    const values = [
      post.title,
      post.slug,
      post.excerpt,
      post.body || null,
      post.image,
      post.categoryId,
      post.readTimeMinutes,
      post.featured ? 1 : 0,
      post.isPublished === false ? 0 : 1,
      post.publishedAt || new Date().toISOString().slice(0, 10),
    ];

    if (post.id) {
      await querySql(
        `UPDATE BlogPost
         SET title = ?, slug = ?, excerpt = ?, body = ?, image = ?,
             categoryId = ?, readTimeMinutes = ?, featured = ?, isPublished = ?,
             publishedAt = ?, updatedAt = UTC_TIMESTAMP()
         WHERE id = ?`,
        [...values, post.id],
      );
    } else {
      await querySql(
        `INSERT INTO BlogPost
           (title, slug, excerpt, body, image, categoryId, readTimeMinutes,
            featured, isPublished, publishedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getBlogPostsForAdmin();
}

/* ───────────────────── Public reads (ODBC) ───────────────────── */

/*
 * The public pages need these through ODBC too. Their Prisma equivalents in
 * lib/data/{doctors,gallery,blog}.js always fall through to static fallbacks
 * while the MSSQL adapter is broken, so anything saved above would be stored
 * but never shown.
 *
 * Each still falls back to its bundled list if the table is empty or the query
 * fails, so a page never renders blank.
 */

export async function getPublicGalleryImages(fallback = []) {
  try {
    const rows = await querySql(
      `SELECT id, src, alt, caption FROM GalleryImage
       WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC`,
    );

    if (rows.length) {
      return rows.map((row) => ({
        id: row.id,
        src: row.src,
        alt: row.alt,
        caption: row.caption ?? row.alt,
      }));
    }
  } catch (error) {
    console.warn("[db] Gallery fallback:", error.message);
  }

  return fallback;
}

export async function getPublicBlogPosts(fallback = []) {
  try {
    const rows = await querySql(
      `SELECT p.id, p.title, p.slug, p.excerpt, p.image, p.readTimeMinutes,
              p.featured, p.publishedAt, c.name AS categoryName
       FROM BlogPost p
       LEFT JOIN BlogCategory c ON c.id = p.categoryId
       WHERE p.isPublished = 1
       ORDER BY p.publishedAt DESC, p.id DESC`,
    );

    if (rows.length) return rows;
  } catch (error) {
    console.warn("[db] Blog posts fallback:", error.message);
  }

  return fallback;
}

export async function getPublicDoctors() {
  try {
    const rows = await querySql(
      `SELECT d.id, d.name, d.education, d.experience, d.image, d.phone,
              d.timing, d.showOnHomepage, c.name AS categoryName, c.slug AS categorySlug
       FROM Doctor d
       LEFT JOIN DoctorCategory c ON c.id = d.categoryId
       WHERE d.isActive = 1
       ORDER BY d.sortOrder ASC, d.id ASC`,
    );

    return rows;
  } catch (error) {
    console.warn("[db] Doctors fallback:", error.message);
    return [];
  }
}
