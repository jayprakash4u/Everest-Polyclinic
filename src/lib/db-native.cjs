const Module = require("node:module");

const originalRequire = Module.prototype.require;

Module.prototype.require = function patchedRequire(request) {
  if (request === "mssql") {
    return originalRequire.call(this, "mssql/msnodesqlv8.js");
  }

  return originalRequire.call(this, request);
};

const { PrismaClient } = require("@prisma/client");
const { PrismaMssql } = require("@prisma/adapter-mssql");

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  'Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;';

const adapter = new PrismaMssql({
  connectionString,
  options: {
    trustServerCertificate: true,
  },
});

const prisma = new PrismaClient({ adapter });

async function isDatabaseAvailable() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  prisma,
  isDatabaseAvailable,
};
