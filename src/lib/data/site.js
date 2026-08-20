import { cache } from "react";
import { SITE } from "@/constants";
import { querySql } from "@/lib/sql";

/* Reads over ODBC rather than Prisma — see lib/data/whyChooseUs.js. This one
   runs on every page through the root layout, so it was the loudest of the
   failing calls. */

/* Wrapped in cache() because both generateMetadata and the layout body ask for
   this on the same request, and it is a database round trip each time. */
export const getSiteSettings = cache(async () => {
  try {
    const rows = await querySql(
      `SELECT name, shortName, tagline, description, phone, email,
              address, workingHours, emergencyHotline
       FROM SiteSetting WHERE id = 1
       LIMIT 1`,
    );

    const settings = rows[0];
    if (settings) {
      /* Merged over SITE field by field rather than returned wholesale: a
         column left blank in the admin panel should fall back to the shipped
         value, not blank out the phone number in the header. */
      const stored = Object.fromEntries(
        Object.entries({
          name: settings.name,
          shortName: settings.shortName,
          tagline: settings.tagline,
          description: settings.description,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          workingHours: settings.workingHours,
          emergencyHotline: settings.emergencyHotline,
        }).filter(([, value]) => typeof value === "string" && value.trim() !== ""),
      );

      return { ...SITE, ...stored };
    }
  } catch (error) {
    console.warn("[db] Site settings fallback:", error.message);
  }

  return SITE;
});
