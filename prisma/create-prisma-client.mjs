import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Prisma client for the CLI scripts (seeds, one-off maintenance).
 *
 * These run under plain Node rather than Next, so nothing has loaded .env for
 * them — without this the client falls back to whatever DATABASE_URL the shell
 * happens to carry, which is usually nothing. Node has read .env natively since
 * v20.12, so no dotenv dependency is needed.
 */
export function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env");
  if (!fs.existsSync(envPath)) return;

  try {
    process.loadEnvFile(envPath);
  } catch {
    /* Unreadable or malformed .env — let the connection fail with its own
       error rather than masking it with a parse error here. */
  }
}

export async function createPrismaClient() {
  loadEnv();

  /* Plain client: Prisma speaks MySQL natively, so there is no driver adapter
     and no require-patching of the sort the SQL Server build needed. */
  const { PrismaClient } = await import("@prisma/client");
  return new PrismaClient();
}
