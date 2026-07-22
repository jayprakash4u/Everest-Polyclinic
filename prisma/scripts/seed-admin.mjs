import crypto from "node:crypto";
import odbc from "odbc";

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@everestpolyclinic.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = hashPassword(adminPassword);

  const connection = await odbc.connect(connectionString);

  await connection.query(`
    IF NOT EXISTS (SELECT 1 FROM AdminUser WHERE email = '${adminEmail.replace(/'/g, "''")}')
    INSERT INTO AdminUser (name, email, passwordHash, role, isActive, createdAt, updatedAt)
    VALUES ('Site Administrator', '${adminEmail.replace(/'/g, "''")}', '${passwordHash}', 'super_admin', 1, GETDATE(), GETDATE())
  `);

  const rows = await connection.query(
    `SELECT id, email, role FROM AdminUser WHERE email = '${adminEmail.replace(/'/g, "''")}'`,
  );

  console.log("Admin user ready:", rows[0]);
  await connection.close();
}

main().catch((error) => {
  console.error("Admin seed failed:", error);
  process.exit(1);
});
