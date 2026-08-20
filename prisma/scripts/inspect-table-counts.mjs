/**
 * Prints a row count for every table. The quickest way to tell a seeding
 * problem ("blogpost: 0") from a query problem after a schema change.
 *
 * Run: npm run db:counts
 */
import { loadEnv } from "../create-prisma-client.mjs";

loadEnv();

const { default: mysql } = await import("mysql2/promise");

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

try {
  const [tables] = await connection.query(
    `SELECT TABLE_NAME AS name
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'
     ORDER BY TABLE_NAME`,
  );

  const rows = [];
  for (const { name } of tables) {
    /* Table names come from information_schema, not user input, but they are
       still identifiers rather than values — backtick-quote them so an odd
       name cannot break the statement. */
    const [[{ total }]] = await connection.query(
      `SELECT COUNT(*) AS total FROM \`${name.replace(/`/g, "``")}\``,
    );
    rows.push({ table: name, rows: Number(total) });
  }

  console.log(
    `${process.env.MYSQL_DATABASE} @ ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`,
  );
  console.table(rows);
  console.log(`${rows.length} tables, ${rows.reduce((sum, r) => sum + r.rows, 0)} rows total.`);
} finally {
  await connection.end();
}
