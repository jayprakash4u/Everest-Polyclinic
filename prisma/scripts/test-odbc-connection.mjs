import dotenv from "dotenv";
import odbc from "odbc";

dotenv.config();

const variants = [
  process.env.SQLSERVER_CONNECTION_STRING,
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  "Driver={ODBC Driver 17 for SQL Server};Server=(local)\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  "Driver={ODBC Driver 17 for SQL Server};Server=.\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
].filter(Boolean);

for (const connectionString of variants) {
  try {
    const connection = await odbc.connect(connectionString);
    const rows = await connection.query("SELECT DB_NAME() AS db, SUSER_SNAME() AS whoami");
    console.log("OK:", connectionString.slice(0, 80) + "...");
    console.log(rows[0]);
    await connection.close();
    process.exit(0);
  } catch (error) {
    console.error("FAIL:", connectionString.slice(0, 80) + "...");
    console.error(error.message);
    if (error.odbcErrors) {
      for (const item of error.odbcErrors) {
        console.error(`  ${item.state}/${item.code}: ${item.message}`);
      }
    }
  }
}

process.exit(1);
