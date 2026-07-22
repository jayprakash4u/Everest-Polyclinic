import Module from "node:module";
import { PrismaClient } from "@prisma/client";
import { PrismaMssql } from "@prisma/adapter-mssql";

const originalRequire = Module.prototype.require;

Module.prototype.require = function patchedRequire(request) {
  if (request === "mssql") {
    return originalRequire.call(this, "mssql/msnodesqlv8.js");
  }

  return originalRequire.call(this, request);
};

export function createPrismaClient() {
  const connectionString =
    process.env.SQLSERVER_CONNECTION_STRING ??
    "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

  const adapter = new PrismaMssql({
    connectionString,
    options: {
      trustServerCertificate: true,
    },
  });

  return new PrismaClient({ adapter });
}
