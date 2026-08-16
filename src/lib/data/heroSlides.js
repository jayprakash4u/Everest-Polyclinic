import { querySql } from "@/lib/sql";
import { HOME_HERO_SLIDES } from "@/constants/homeHero";

/*
 * Reads and writes through `querySql` (raw ODBC) rather than Prisma.
 *
 * Prisma's MSSQL layer is currently broken on this project: `count()` works but
 * any parameterised `findMany` fails with "The variable name '@P1' has already
 * been declared", which is why every section on the site is being served from
 * its static fallback. The ODBC path in lib/sql.js is unaffected, so the hero
 * editor works today. Move this to Prisma once that fault is fixed.
 */

const TABLE = "HomeHeroSlide";

/** Idempotent — safe to call on every read, costs one cheap metadata check. */
async function ensureTable() {
  await querySql(`
    IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = '${TABLE}')
    CREATE TABLE [dbo].[${TABLE}] (
      [id]        INT IDENTITY(1,1) PRIMARY KEY,
      [src]       NVARCHAR(500)  NOT NULL,
      [label]     NVARCHAR(200)  NOT NULL,
      [alt]       NVARCHAR(500)  NOT NULL,
      [sortOrder] INT            NOT NULL DEFAULT 0,
      [isActive]  BIT            NOT NULL DEFAULT 1,
      [updatedAt] DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME()
    )
  `);
}

function toSlide(row) {
  return {
    id: row.id,
    src: row.src,
    label: row.label,
    alt: row.alt,
  };
}

/**
 * Slides for the homepage hero. Falls back to the bundled constant whenever the
 * table is empty or unreachable, so the hero never renders blank.
 */
export async function getHeroSlides() {
  try {
    await ensureTable();
    const rows = await querySql(
      `SELECT id, src, label, alt FROM [dbo].[${TABLE}]
       WHERE isActive = 1 ORDER BY sortOrder ASC, id ASC`,
    );

    if (rows.length > 0) return rows.map(toSlide);
  } catch (error) {
    console.warn("[db] Hero slides fallback:", error.message);
  }

  return HOME_HERO_SLIDES;
}

/** Admin editor: every slide, including deactivated ones. */
export async function getHeroSlidesForAdmin() {
  await ensureTable();
  const rows = await querySql(
    `SELECT id, src, label, alt, sortOrder, isActive FROM [dbo].[${TABLE}]
     ORDER BY sortOrder ASC, id ASC`,
  );

  if (rows.length === 0) {
    /* First open of the editor: seed from the constant so the admin edits what
       is actually on the site rather than starting from an empty list. */
    await replaceHeroSlides(
      HOME_HERO_SLIDES.map((slide) => ({ ...slide, isActive: true })),
    );
    return getHeroSlidesForAdmin();
  }

  return rows.map((row) => ({
    ...toSlide(row),
    sortOrder: row.sortOrder,
    isActive: Boolean(row.isActive),
  }));
}

/**
 * Replaces the whole set in one go. The editor submits the full ordered list,
 * so a wholesale swap avoids having to diff adds, edits, reorders and removals
 * against what is already stored.
 */
export async function replaceHeroSlides(slides) {
  await ensureTable();
  await querySql(`DELETE FROM [dbo].[${TABLE}]`);

  for (const [index, slide] of slides.entries()) {
    await querySql(
      `INSERT INTO [dbo].[${TABLE}] (src, label, alt, sortOrder, isActive)
       VALUES (?, ?, ?, ?, ?)`,
      [
        String(slide.src ?? "").trim(),
        String(slide.label ?? "").trim(),
        String(slide.alt ?? "").trim(),
        index,
        slide.isActive === false ? 0 : 1,
      ],
    );
  }

  return getHeroSlidesForAdmin();
}
