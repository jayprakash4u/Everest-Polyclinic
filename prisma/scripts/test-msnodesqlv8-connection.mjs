import sql from "mssql/msnodesqlv8.js";

const configs = [
  {
    label: "trustedConnection",
    config: {
      server: "localhost\\SQLEXPRESS",
      database: "EverestPolyclinic",
      driver: "msnodesqlv8",
      options: {
        trustedConnection: true,
        trustServerCertificate: true,
      },
    },
  },
  {
    label: "connectionString",
    config: {
      connectionString:
        "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
      driver: "msnodesqlv8",
    },
  },
];

for (const { label, config } of configs) {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT DB_NAME() AS db");
    console.log(`[${label}] Connected:`, result.recordset[0]);
    await sql.close();
    process.exit(0);
  } catch (error) {
    console.error(`[${label}] Failed:`, error.message);
  }
}

process.exit(1);
