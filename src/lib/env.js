/**
 * MySQL connection settings, read once from the environment.
 *
 * Everything has a default so a missing .env degrades to a failed connection
 * with a readable host in the error, rather than an undefined-property crash
 * somewhere deeper in the driver.
 */
export const mysqlConfig = {
  host: process.env.MYSQL_HOST ?? "127.0.0.1",
  port: Number(process.env.MYSQL_PORT ?? 3306),
  database: process.env.MYSQL_DATABASE ?? "EverestPolyclinic",
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "",
  /* Prisma reads this itself; it is re-derived here only so a missing
     DATABASE_URL still produces a working URL from the parts above. */
  databaseUrl:
    process.env.DATABASE_URL ??
    `mysql://${process.env.MYSQL_USER ?? "root"}:${
      process.env.MYSQL_PASSWORD ?? ""
    }@${process.env.MYSQL_HOST ?? "127.0.0.1"}:${
      process.env.MYSQL_PORT ?? 3306
    }/${process.env.MYSQL_DATABASE ?? "EverestPolyclinic"}`,
};
