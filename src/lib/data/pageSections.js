import {
  CARE_TEAM_SECTION,
  HERO_SECTION,
  HOME_CARE_TEAM_IMAGE,
  HOME_HERO_SLIDES,
  HOME_PAGE,
} from "@/constants/homepageSections";
import { querySql } from "@/lib/sql";

/* Reads over ODBC rather than Prisma, for the same reason as
   lib/data/whyChooseUs.js — the MSSQL adapter cannot run a parameterised
   query against this database. */

function mapRow(row) {
  return {
    id: Number(row.id),
    image: row.image,
    label: row.label ?? "",
    alt: row.alt ?? "",
    sortOrder: Number(row.sortOrder),
  };
}

async function getSectionImages(page, section) {
  try {
    const rows = await querySql(
      `SELECT id, image, label, alt, sortOrder
       FROM PageSectionImage
       WHERE page = ? AND section = ? AND isActive = 1
       ORDER BY sortOrder ASC, id ASC`,
      [page, section],
    );

    return rows.map(mapRow);
  } catch (error) {
    console.warn(`[db] Page section "${page}/${section}" fallback:`, error.message);
    return [];
  }
}

/** Hero carousel frames. Falls back to the shipped five when nothing is stored. */
export async function getHomeHeroSlides() {
  const rows = await getSectionImages(HOME_PAGE, HERO_SECTION);
  if (!rows.length) return HOME_HERO_SLIDES;

  /* A frame with no caption still has to name itself in the control rail and
     the phone dots, so fall back to its position rather than render a blank. */
  return rows.map((row, index) => ({
    image: row.image,
    label: row.label || `Slide ${index + 1}`,
    alt: row.alt || "",
  }));
}

/** The single "Meet your care team" photo. */
export async function getHomeCareTeamImage() {
  const [row] = await getSectionImages(HOME_PAGE, CARE_TEAM_SECTION);
  if (!row?.image) return HOME_CARE_TEAM_IMAGE;

  return {
    image: row.image,
    alt: row.alt || HOME_CARE_TEAM_IMAGE.alt,
  };
}
