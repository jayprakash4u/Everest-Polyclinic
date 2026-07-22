import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import odbc from "odbc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

function generateSchemaSql() {
  const schemaPath = path.join(__dirname, "..", "schema.prisma");
  return execFileSync(
    process.execPath,
    [
      path.join(process.cwd(), "node_modules/prisma/build/index.js"),
      "migrate",
      "diff",
      "--from-empty",
      "--to-schema-datamodel",
      schemaPath,
      "--script",
    ],
    { encoding: "utf8", env: process.env },
  );
}

async function tableCount(connection) {
  const rows = await connection.query(
    "SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo'",
  );
  return Number(rows[0]?.count ?? 0);
}

async function main() {
  console.log("Connecting to SQL Server via ODBC...");
  const connection = await odbc.connect(connectionString);

  const before = await tableCount(connection);
  console.log(`Tables before setup: ${before}`);

  if (before === 0) {
    console.log("Generating and applying schema...");
    const sql = generateSchemaSql();
    fs.writeFileSync(path.join(__dirname, "init-schema.sql"), sql, "utf8");
    await connection.query(sql);
    console.log(`Tables after setup: ${await tableCount(connection)}`);
  } else {
    console.log("Tables already exist, skipping schema creation.");
  }

  await connection.close();

  console.log("Seeding admin user...");
  execFileSync(
    process.execPath,
    [path.join(process.cwd(), "prisma/scripts/seed-admin.mjs")],
    { stdio: "inherit", env: process.env },
  );

  console.log("Database setup complete.");
}

main().catch((error) => {
  console.error("Setup failed:", error);
  process.exit(1);
});
