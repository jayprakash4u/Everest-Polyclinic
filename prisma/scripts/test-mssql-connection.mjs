import sql from "mssql";

const config = {
  server: "localhost\\SQLEXPRESS",
  database: "EverestPolyclinic",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  authentication: {
    type: "default",
    options: {},
  },
};

try {
  await sql.connect(config);
  const result = await sql.query("SELECT DB_NAME() AS db, @@VERSION AS version");
  console.log("Connected:", result.recordset[0]?.db);
  await sql.close();
} catch (error) {
  console.error("Connection failed:", error.message);
  process.exit(1);
}
