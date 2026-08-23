import { querySql } from "@/lib/sql";

/*
 * A small key/value store for one-off homepage settings — a section's
 * photograph, a headline, a toggle. Anything that is a single value rather than
 * a list, and so does not warrant a table of its own.
 *
 * Raw SQL rather than Prisma because this table is created on demand and is
 * deliberately not part of the Prisma schema, so there is no generated client
 * for it. `key` is a reserved word in MySQL, hence the backquoting.
 */

const TABLE = "HomePageSetting";

/** Idempotent — safe to call on every read. */
async function ensureTable() {
  await querySql(`
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      \`key\`   VARCHAR(100) NOT NULL PRIMARY KEY,
      \`value\` LONGTEXT NOT NULL,
      updatedAt DATETIME NOT NULL
                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
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
      `SELECT \`key\`, \`value\` FROM ${TABLE}
       WHERE \`key\` IN (${keys.map(() => "?").join(",")})`,
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
      await querySql(`DELETE FROM ${TABLE} WHERE \`key\` = ?`, [key]);
      continue;
    }

    /* Row alias rather than VALUES(), which MySQL deprecated in 8.0.20. */
    await querySql(
      `INSERT INTO ${TABLE} (\`key\`, \`value\`) VALUES (?, ?) AS incoming
       ON DUPLICATE KEY UPDATE \`value\` = incoming.\`value\``,
      [key, text],
    );
  }
}
