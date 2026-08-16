import { querySql } from "@/lib/sql";
import { HOMEPAGE_HEALTH_PACKAGES } from "@/constants/healthPackages";

/*
 * Raw ODBC rather than Prisma, for the same reason as the hero slides: Prisma's
 * MSSQL layer fails on any parameterised `findMany` here ("The variable name
 * '@P1' has already been declared"), so every Prisma-backed read on this site
 * silently serves its static fallback. Editing packages through the admin would
 * have no visible effect if the public read went through Prisma.
 */

/** `testsJson` holds a mix of plain strings and `{ label, items[] }` groups. */
function parseTests(raw) {
  try {
    const value = JSON.parse(raw || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function toPackage(row) {
  return {
    id: row.legacyId ?? row.id,
    name: row.name,
    price: row.price,
    originalPrice: row.originalPrice ?? undefined,
    badge: row.badge ?? null,
    tests: parseTests(row.testsJson),
  };
}

/** What the homepage carousel renders. */
export async function getHomepageHealthPackages() {
  try {
    const flagged = await querySql(
      `SELECT TOP 12 id, legacyId, name, price, originalPrice, badge, testsJson
       FROM [dbo].[HealthPackage]
       WHERE isActive = 1 AND showOnHomepage = 1
       ORDER BY sortOrder ASC, id ASC`,
    );

    if (flagged.length) return flagged.map(toPackage);

    /* Nothing flagged yet — fall back to badged packages first, then the rest,
       so the section is never empty just because no one has curated it. */
    const all = await querySql(
      `SELECT id, legacyId, name, price, originalPrice, badge, testsJson
       FROM [dbo].[HealthPackage]
       WHERE isActive = 1
       ORDER BY sortOrder ASC, id ASC`,
    );

    if (all.length) {
      const badged = all.filter((row) => row.badge);
      const rest = all.filter((row) => !row.badge);
      return [...badged, ...rest].slice(0, 6).map(toPackage);
    }
  } catch (error) {
    console.warn("[db] Homepage health packages fallback:", error.message);
  }

  return HOMEPAGE_HEALTH_PACKAGES;
}

export async function getHealthPackageSections() {
  const rows = await querySql(
    `SELECT id, section, icon, sortOrder FROM [dbo].[HealthPackageSection]
     ORDER BY sortOrder ASC, id ASC`,
  );
  return rows;
}

/** Every package, flagged or not, for the admin editor. */
export async function getHealthPackagesForAdmin() {
  const rows = await querySql(
    `SELECT p.id, p.sectionId, p.name, p.price, p.originalPrice, p.badge,
            p.testsJson, p.showOnHomepage, p.sortOrder, p.isActive,
            s.section AS sectionName
     FROM [dbo].[HealthPackage] p
     LEFT JOIN [dbo].[HealthPackageSection] s ON s.id = p.sectionId
     ORDER BY p.sortOrder ASC, p.id ASC`,
  );

  return rows.map((row) => ({
    id: row.id,
    sectionId: row.sectionId,
    sectionName: row.sectionName ?? "",
    name: row.name,
    price: row.price,
    originalPrice: row.originalPrice ?? null,
    badge: row.badge ?? "",
    tests: parseTests(row.testsJson),
    showOnHomepage: Boolean(row.showOnHomepage),
    sortOrder: row.sortOrder,
    isActive: Boolean(row.isActive),
  }));
}

/**
 * Upserts the submitted list and removes anything no longer in it.
 *
 * Rows are updated in place rather than deleted and re-inserted, so ids stay
 * stable — `legacyId` and the section relation both depend on them.
 */
export async function saveHealthPackages(packages) {
  const keptIds = packages.map((pkg) => pkg.id).filter(Boolean);

  if (keptIds.length > 0) {
    await querySql(
      `DELETE FROM [dbo].[HealthPackage] WHERE id NOT IN (${keptIds
        .map(() => "?")
        .join(",")})`,
      keptIds,
    );
  } else {
    await querySql(`DELETE FROM [dbo].[HealthPackage]`);
  }

  for (const [index, pkg] of packages.entries()) {
    const values = [
      pkg.sectionId,
      pkg.name,
      pkg.price,
      pkg.originalPrice ?? null,
      pkg.badge || null,
      JSON.stringify(pkg.tests ?? []),
      pkg.showOnHomepage ? 1 : 0,
      index,
      pkg.isActive === false ? 0 : 1,
    ];

    if (pkg.id) {
      await querySql(
        `UPDATE [dbo].[HealthPackage]
         SET sectionId = ?, name = ?, price = ?, originalPrice = ?, badge = ?,
             testsJson = ?, showOnHomepage = ?, sortOrder = ?, isActive = ?
         WHERE id = ?`,
        [...values, pkg.id],
      );
    } else {
      await querySql(
        `INSERT INTO [dbo].[HealthPackage]
           (sectionId, name, price, originalPrice, badge, testsJson,
            showOnHomepage, sortOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values,
      );
    }
  }

  return getHealthPackagesForAdmin();
}
