import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import {
  DOCTOR_PAGE_STATS,
  DOCTOR_SPECIALISTS,
  HOMEPAGE_SPECIALISTS,
} from "@/constants/doctorsPage";
import { querySql } from "@/lib/sql";

/* Reads over ODBC rather than Prisma — see lib/data/whyChooseUs.js. Prisma's
   `include` becomes an explicit JOIN plus grouping in JS; the shape returned to
   callers is unchanged. */

function mapDoctorToHomepageCard(row) {
  return {
    id: Number(row.id),
    name: row.name,
    degree: row.education,
    experience: row.experience,
    specialist: row.categoryName ?? "Specialist",
    timing: row.timing ?? "By appointment",
    phone: row.phone ?? "",
    image: row.image,
  };
}

function mapStaticDoctors() {
  return DOCTOR_SPECIALISTS.flatMap((group) =>
    group.doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      education: doctor.education,
      experience: doctor.experience,
      image: doctor.image,
      category: group.category,
      slug: group.slug,
    })),
  );
}

async function getDoctorsPageDataUncached() {
  try {
    /* One flat join, grouped below. A category with no active doctors still
       has to appear — Prisma's include returned it with an empty array — so
       the join is LEFT and the doctor filter lives in the ON clause, not the
       WHERE clause, where it would drop the category row entirely. */
    const rows = await querySql(
      `SELECT c.id AS categoryId, c.name AS categoryName, c.slug AS categorySlug,
              c.sortOrder AS categorySort,
              d.id AS doctorId, d.name AS doctorName, d.education, d.experience,
              d.image, d.sortOrder AS doctorSort
       FROM DoctorCategory c
       LEFT JOIN Doctor d ON d.categoryId = c.id AND d.isActive = 1
       WHERE c.isActive = 1
       ORDER BY c.sortOrder ASC, c.id ASC, d.sortOrder ASC, d.id ASC`,
    );

    if (rows.length > 0) {
      const byCategory = new Map();

      for (const row of rows) {
        const key = Number(row.categoryId);
        if (!byCategory.has(key)) {
          byCategory.set(key, {
            category: row.categoryName,
            slug: row.categorySlug,
            doctors: [],
          });
        }

        // LEFT JOIN pads a doctorless category with a null doctor row.
        if (row.doctorId == null) continue;

        byCategory.get(key).doctors.push({
          id: Number(row.doctorId),
          name: row.doctorName,
          education: row.education,
          experience: row.experience,
          image: row.image,
        });
      }

      const specialists = [...byCategory.values()];

      const stats = await querySql(
        `SELECT value, label FROM Statistic
         WHERE context = ? AND isActive = 1
         ORDER BY sortOrder ASC, id ASC`,
        ["doctors"],
      );

      return {
        specialists,
        stats:
          stats.length > 0
            ? stats.map((item) => ({ value: item.value, label: item.label }))
            : DOCTOR_PAGE_STATS,
        doctors: specialists.flatMap((group) =>
          group.doctors.map((doctor) => ({
            ...doctor,
            category: group.category,
            slug: group.slug,
          })),
        ),
      };
    }
  } catch (error) {
    console.warn("[db] Doctors fallback:", error.message);
  }

  return {
    specialists: DOCTOR_SPECIALISTS,
    stats: DOCTOR_PAGE_STATS,
    doctors: mapStaticDoctors(),
  };
}

async function getHomepageSpecialistsUncached() {
  try {
    const rows = await querySql(
      `SELECT d.id, d.name, d.education, d.experience, d.image, d.phone, d.timing,
              c.name AS categoryName
       FROM Doctor d
       INNER JOIN DoctorCategory c ON c.id = d.categoryId
       WHERE d.isActive = 1 AND d.showOnHomepage = 1
       ORDER BY d.sortOrder ASC, d.id ASC`,
    );

    if (rows.length > 0) {
      return rows.map(mapDoctorToHomepageCard);
    }
  } catch (error) {
    console.warn("[db] Homepage specialists fallback:", error.message);
  }

  return HOMEPAGE_SPECIALISTS;
}

async function getHomepageDoctorsUncached(limit = 10) {
  const specialists = await getHomepageSpecialists();
  return specialists.slice(0, limit);
}

/* Cached across requests; the admin write routes invalidate these tags. */
export const getDoctorsPageData = cachedRead(
  getDoctorsPageDataUncached,
  ["getDoctorsPageData"],
  CACHE_TAGS.doctors,
);

export const getHomepageSpecialists = cachedRead(
  getHomepageSpecialistsUncached,
  ["getHomepageSpecialists"],
  CACHE_TAGS.doctors,
);

export const getHomepageDoctors = cachedRead(
  getHomepageDoctorsUncached,
  ["getHomepageDoctors"],
  CACHE_TAGS.doctors,
);
