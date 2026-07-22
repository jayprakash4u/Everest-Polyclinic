export const sqlServerConfig = {
  host: process.env.SQLSERVER_HOST ?? "(local)\\SQLEXPRESS",
  database: process.env.SQLSERVER_DATABASE ?? "EverestPolyclinic",
  connectionString:
    process.env.SQLSERVER_CONNECTION_STRING ??
    "Driver={ODBC Driver 17 for SQL Server};Server=(local)\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;",
  databaseUrl:
    process.env.DATABASE_URL ??
    "sqlserver://localhost;instanceName=SQLEXPRESS;database=EverestPolyclinic;integratedSecurity=true;trustServerCertificate=true",
};
