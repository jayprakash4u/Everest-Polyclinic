import { prisma } from "@/lib/db";

export async function findAdminByUsername(username) {
  const normalized = String(username ?? "").trim().toLowerCase();
  if (!normalized) return null;

  return prisma.adminUser.findUnique({
    where: { username: normalized },
  });
}
