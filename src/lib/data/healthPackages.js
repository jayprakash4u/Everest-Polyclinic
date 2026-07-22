import { HEALTH_PACKAGES } from "@/constants/healthPackages";
import { prisma } from "@/lib/db";

export async function getHealthPackages() {
  try {
    const sections = await prisma.healthPackageSection.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      include: {
        packages: {
          where: { isActive: true },
          orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
        },
      },
    });

    if (sections.some((section) => section.packages.length > 0)) {
      return sections
        .filter((section) => section.packages.length > 0)
        .map((section) => ({
          section: section.section,
          icon: section.icon,
          items: section.packages.map((pkg) => ({
            id: pkg.legacyId ?? pkg.id,
            name: pkg.name,
            price: pkg.price,
            originalPrice: pkg.originalPrice ?? undefined,
            badge: pkg.badge ?? null,
            tests: JSON.parse(pkg.testsJson || "[]"),
          })),
        }));
    }
  } catch (error) {
    console.warn("[db] Health packages fallback:", error.message);
  }

  return HEALTH_PACKAGES;
}
