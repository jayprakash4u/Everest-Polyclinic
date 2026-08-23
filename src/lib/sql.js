import mysql from "mysql2/promise";
import { mysqlConfig } from "./env.js";

/**
 * The raw-SQL path into MySQL.
 *
 * This sits alongside Prisma rather than replacing it: the public read helpers
 * in lib/data use hand-written SQL (joins and aggregates Prisma would need
 * several round trips for), while the admin write routes mostly use the Prisma
 * client. Both talk to the same server.
 *
 * A pool, not a single connection. The database is remote, so a TCP round trip
 * per request is the dominant cost and reconnecting on every query would show
 * up directly in page latency.
 */
let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.user,
      password: mysqlConfig.password,
      database: mysqlConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      /* Queue rather than reject: a burst of parallel section reads on the
         homepage should wait for a connection, not fail the render. */
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10_000,
      /* DATETIME comes back as a JS Date; DECIMAL/BIGINT as strings unless
         asked otherwise. Callers already coerce with Number() where it
         matters, so the defaults are left alone. */
      timezone: "Z",
      charset: "utf8mb4_general_ci",
    });
  }

  return pool;
}

/**
 * Runs a parameterised query and returns just the rows.
 *
 * Placeholders are `?`, and values must be passed through `params` — never
 * interpolated into the string — so the driver escapes them.
 */
export async function querySql(sql, params = []) {
  const [rows] = await getPool().query(sql, params);
  return rows;
}

/** Runs several statements as one transaction on a single pooled connection. */
export async function withTransaction(run) {
  const connection = await getPool().getConnection();

  try {
    await connection.beginTransaction();
    const result = await run(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback().catch(() => {});
    throw error;
  } finally {
    connection.release();
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
    "SELECT id, name, email, passwordHash, role, isActive FROM `AdminUser` WHERE email = ? LIMIT 1",
    [email],
  );

  return rows[0] ?? null;
}

/** True for "the server is unreachable", as opposed to a bad query. */
export function isSqlConnectionError(error) {
  if (!error) return false;

  const transportCodes = new Set([
    "ECONNREFUSED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "EHOSTUNREACH",
    "ENETUNREACH",
    "ECONNRESET",
    "EPIPE",
    "PROTOCOL_CONNECTION_LOST",
    "PROTOCOL_SEQUENCE_TIMEOUT",
    "ER_CON_COUNT_ERROR",
  ]);

  return transportCodes.has(error.code);
}
