import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import odbc from "odbc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

async function main() {
  const sqlPath = path.join(__dirname, "add-homepage-content-tables.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");
  const batches = sql
    .split(/^\s*GO\s*$/gim)
    .map((batch) => batch.trim())
    .filter(Boolean);

  console.log("Connecting via ODBC...");
  const connection = await odbc.connect(connectionString);

  for (const batch of batches) {
    await connection.query(batch);
  }

  await connection.close();
  console.log("Homepage content tables ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
