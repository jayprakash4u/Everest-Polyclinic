import odbc from "odbc";

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

function sqlString(value) {
  return `N'${String(value).replace(/'/g, "''")}'`;
}

const SITE = {
  phone: "+977 985-8021822",
  email: "everestintel2070@gmail.com",
  address: "Karkando Chowk, Nepalgunj-18, Nepalganj, Nepal",
  emergencyHotline: "+977 985-8021822",
};

const connection = await odbc.connect(connectionString);
const now = new Date().toISOString();

await connection.query(`
  UPDATE [dbo].[SiteSetting]
  SET
    [phone] = ${sqlString(SITE.phone)},
    [email] = ${sqlString(SITE.email)},
    [address] = ${sqlString(SITE.address)},
    [emergencyHotline] = ${sqlString(SITE.emergencyHotline)},
    [updatedAt] = ${sqlString(now)}
  WHERE [id] = 1
`);

const rows = await connection.query(`
  SELECT [phone], [email], [address], [emergencyHotline]
  FROM [dbo].[SiteSetting]
  WHERE [id] = 1
`);

console.log("SiteSetting updated:", rows[0]);
await connection.close();
