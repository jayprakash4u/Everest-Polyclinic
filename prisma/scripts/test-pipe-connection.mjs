import odbc from "odbc";

const candidates = [
  "Driver={ODBC Driver 17 for SQL Server};Server=np:\\\\.\\pipe\\MSSQL$SQLEXPRESS\\sql\\query;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  "Driver={ODBC Driver 17 for SQL Server};Server=(local)\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  "Driver={ODBC Driver 17 for SQL Server};Server=.\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
];

for (const connectionString of candidates) {
  try {
    const connection = await odbc.connect(connectionString);
    const rows = await connection.query("SELECT @@SERVERNAME AS server_name, DB_NAME() AS db");
    console.log("OK via", connectionString.slice(0, 70) + "...");
    console.log(rows[0]);
    await connection.close();
    process.exit(0);
  } catch (error) {
    console.error("FAIL via", connectionString.slice(0, 70) + "...");
    console.error(error.message);
  }
}

process.exit(1);
