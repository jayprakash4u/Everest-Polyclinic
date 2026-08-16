import { querySql } from "@/lib/sql";

/*
 * A small key/value store for one-off homepage settings — a section's
 * photograph, a headline, a toggle. Anything that is a single value rather than
 * a list, and so does not warrant a table of its own.
 *
 * Raw ODBC for the same reason as the other homepage editors: Prisma's MSSQL
 * layer fails on parameterised reads here, so a Prisma-backed value would
 * always fall through to its hard-coded default and admin edits would never
 * reach the site.
 */

const TABLE = "HomePageSetting";

/** Idempotent — safe to call on every read. */
async function ensureTable() {
  await querySql(`
    IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = '${TABLE}')
    CREATE TABLE [dbo].[${TABLE}] (
      [key]       NVARCHAR(100) NOT NULL PRIMARY KEY,
      [value]     NVARCHAR(Max) NOT NULL,
      [updatedAt] DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
    )
  `);
}

/**
 * Reads the requested keys in one round trip.
 * `defaults` supplies the shipped value for anything not yet overridden, so a
 * section never renders empty just because no one has touched it.
 */
export async function getHomeSettings(defaults = {}) {
  const keys = Object.keys(defaults);
  if (keys.length === 0) return {};

  try {
    await ensureTable();
    const rows = await querySql(
      `SELECT [key], [value] FROM [dbo].[${TABLE}]
       WHERE [key] IN (${keys.map(() => "?").join(",")})`,
      keys,
    );

    const stored = Object.fromEntries(
      rows.filter((row) => row.value).map((row) => [row.key, row.value]),
    );

    return { ...defaults, ...stored };
  } catch (error) {
    console.warn("[db] Home settings fallback:", error.message);
    return { ...defaults };
  }
}

export async function saveHomeSettings(values) {
  await ensureTable();

  for (const [key, value] of Object.entries(values)) {
    const text = String(value ?? "").trim();

    /* An empty value means "go back to the shipped default", which is a delete
       rather than storing a blank that would render nothing. */
    if (!text) {
      await querySql(`DELETE FROM [dbo].[${TABLE}] WHERE [key] = ?`, [key]);
      continue;
    }

    await querySql(
      `MERGE [dbo].[${TABLE}] AS target
       USING (SELECT ? AS [key], ? AS [value]) AS source
       ON target.[key] = source.[key]
       WHEN MATCHED THEN
         UPDATE SET [value] = source.[value], [updatedAt] = SYSUTCDATETIME()
       WHEN NOT MATCHED THEN
         INSERT ([key], [value]) VALUES (source.[key], source.[value]);`,
      [key, text],
    );
  }
}
