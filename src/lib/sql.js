import odbc from "odbc";
import { sqlServerConfig } from "./env.js";

let poolPromise = null;

function buildConnectionStrings() {
  const configured = sqlServerConfig.connectionString?.trim();
  const database = sqlServerConfig.database ?? "EverestPolyclinic";
  const host = sqlServerConfig.host ?? "(local)\\SQLEXPRESS";

  const servers = [
    host,
    process.env.SQLSERVER_PIPE ??
      "np:\\\\.\\pipe\\MSSQL$SQLEXPRESS\\sql\\query",
    "(local)\\SQLEXPRESS",
    ".\\SQLEXPRESS",
    "localhost\\SQLEXPRESS",
  ].filter(Boolean);

  const uniqueServers = [...new Set(servers)];

  const generated = uniqueServers.map((server) =>
    server.startsWith("np:")
      ? `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=Yes;TrustServerCertificate=Yes;`
      : `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=Yes;TrustServerCertificate=Yes;`,
  );

  if (configured) {
    return [configured, ...generated.filter((value) => value !== configured)];
  }

  return generated;
}

export function getSqlConnectionString() {
  return buildConnectionStrings()[0];
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithFallback() {
  const candidates = buildConnectionStrings();
  let lastError;

  for (const connectionString of candidates) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        return await odbc.connect(connectionString);
      } catch (error) {
        lastError = error;
        if (attempt === 0) {
          await wait(1000);
        }
      }
    }
  }

  throw lastError;
}

export async function getSqlConnection() {
  if (!poolPromise) {
    poolPromise = connectWithFallback().catch((error) => {
      poolPromise = null;
      throw error;
    });
  }

  return poolPromise;
}

export async function querySql(sql, params = []) {
  try {
    const connection = await getSqlConnection();
    return await connection.query(sql, params);
  } catch (error) {
    poolPromise = null;
    throw error;
  }
}

export async function isDatabaseAvailable() {
  try {
    await querySql("SELECT 1 AS ok");
    return true;
  } catch {
    return false;
  }
}

export async function findAdminByEmail(email) {
  const rows = await querySql(
    "SELECT TOP 1 id, name, email, passwordHash, role, isActive FROM AdminUser WHERE email = ?",
    [email],
  );

  return rows[0] ?? null;
}

export function isSqlConnectionError(error) {
  if (!error) return false;
  if (Array.isArray(error.odbcErrors) && error.odbcErrors.length > 0) {
    return true;
  }

  const message = String(error.message ?? "").toLowerCase();
  return (
    message.includes("connect") ||
    message.includes("timeout") ||
    message.includes("instance was not available") ||
    message.includes("server is not found")
  );
}
