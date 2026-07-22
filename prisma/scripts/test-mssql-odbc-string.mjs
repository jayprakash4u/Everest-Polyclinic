import sql from "mssql";

const connectionString =
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

try {
  await sql.connect({ connectionString });
  const result = await sql.query("SELECT DB_NAME() AS db");
  console.log("Connected via mssql+ODBC string:", result.recordset[0]);
  await sql.close();
} catch (error) {
  console.error("Connection failed:", error.message);
  process.exit(1);
}
