import { SITE } from "@/constants";
import { prisma } from "@/lib/db";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    if (settings) {
      return {
        name: settings.name,
        shortName: settings.shortName,
        tagline: settings.tagline,
        description: settings.description,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        workingHours: settings.workingHours,
        emergencyHotline: settings.emergencyHotline,
      };
    }
  } catch (error) {
    console.warn("[db] Site settings fallback:", error.message);
  }

  return SITE;
}
