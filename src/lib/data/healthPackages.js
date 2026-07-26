import { HEALTH_PACKAGES, HOMEPAGE_HEALTH_PACKAGES } from "@/constants/healthPackages";
import { prisma } from "@/lib/db";

function mapPackageRow(pkg) {
  let tests = [];
  try {
    tests = JSON.parse(pkg.testsJson || "[]");
  } catch {
    tests = [];
  }

  return {
    id: pkg.legacyId ?? pkg.id,
    name: pkg.name,
    price: pkg.price,
    originalPrice: pkg.originalPrice ?? undefined,
    badge: pkg.badge ?? null,
    tests,
  };
}

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

export async function getHomepageHealthPackages() {
  try {
    const flagged = await prisma.healthPackage.findMany({
      where: { isActive: true, showOnHomepage: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      take: 12,
    });

    if (flagged.length) {
      return flagged.map(mapPackageRow);
    }

    const all = await prisma.healthPackage.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    if (all.length) {
      const featured = all.filter((pkg) => pkg.badge);
      const rest = all.filter((pkg) => !pkg.badge);
      return [...featured, ...rest].slice(0, 6).map(mapPackageRow);
    }
  } catch (error) {
    console.warn("[db] Homepage health packages fallback:", error.message);
  }

  return HOMEPAGE_HEALTH_PACKAGES;
}
