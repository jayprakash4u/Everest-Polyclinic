import odbc from "odbc";

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

const connection = await odbc.connect(connectionString);
const tables = await connection.query(`
  SELECT TABLE_NAME
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = 'dbo'
  ORDER BY TABLE_NAME
`);

console.log("Tables:");
for (const row of tables) {
  const countRows = await connection.query(
    `SELECT COUNT(*) AS c FROM [dbo].[${row.TABLE_NAME}]`,
  );
  console.log(`- ${row.TABLE_NAME}: ${countRows[0].c}`);
}

await connection.close();
