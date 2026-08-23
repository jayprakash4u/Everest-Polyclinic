import { PrismaClient } from "@prisma/client";

export {
  isDatabaseAvailable,
  querySql,
  withTransaction,
  findAdminByEmail,
} from "./sql.js";

/**
 * The Prisma client, shared process-wide.
 *
 * Prisma speaks to MySQL directly, so there is no driver adapter and none of
 * the require-patching the SQL Server build needed — the client is constructed
 * the ordinary way and reads DATABASE_URL itself.
 *
 * Cached on globalThis because Next's dev server re-evaluates modules on every
 * hot reload; without this each edit would open a fresh pool against a remote
 * server and march steadily toward its connection limit.
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__everestPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__everestPrisma = prisma;
}
