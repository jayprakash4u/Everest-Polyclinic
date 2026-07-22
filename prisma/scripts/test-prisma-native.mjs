import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { prisma } = require("../../src/lib/db-native.cjs");

try {
  const admin = await prisma.adminUser.findUnique({
    where: { email: "admin@everestpolyclinic.com" },
  });
  console.log("Admin found:", admin?.email, admin?.isActive);
} catch (error) {
  console.error("Query failed:", error.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
