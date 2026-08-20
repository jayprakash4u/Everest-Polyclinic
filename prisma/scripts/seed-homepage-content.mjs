/**
 * Seeds the homepage-only content: centers of excellence, the "why choose us"
 * grid, the site statistics strip, and the admin-managed image slots.
 *
 * Written against the Prisma client rather than raw SQL so it carries no
 * dialect of its own — it followed the database from SQL Server to MySQL
 * without changing a line of its logic.
 */
import { createPrismaClient } from "../create-prisma-client.mjs";
import {
  CARE_TEAM_SECTION,
  HERO_SECTION,
  HOME_CARE_TEAM_IMAGE,
  HOME_HERO_SLIDES,
  HOME_PAGE,
} from "../../src/constants/homepageSections.js";

const prisma = await createPrismaClient();

const CENTERS_OF_EXCELLENCE = [
  {
    title: "Orthopaedics",
    description:
      "Expert diagnosis and treatment for bone, joint, and mobility conditions.",
    image: "/images/Center of excellence/one.png",
    slug: "orthopedics",
  },
  {
    title: "Oncology",
    description:
      "Comprehensive care and advanced treatment for cancer patients.",
    image: "/images/Center of excellence/two.png",
    slug: null,
  },
  {
    title: "Pediatrics",
    description:
      "Dedicated care for infants, children, and adolescents at every stage.",
    image: "/images/Center of excellence/three.png",
    slug: "pediatrics",
  },
  {
    title: "Dermatology",
    description:
      "Medical and aesthetic skin care with precise, patient-focused treatment.",
    image: "/images/Center of excellence/four.png",
    slug: "dermatology",
  },
  {
    title: "Physiotherapy",
    description:
      "Rehabilitation and movement therapy to restore strength and function.",
    image: "/images/Center of excellence/six.png",
    slug: "physiotherapy",
  },
  {
    title: "Anaesthesia",
    description: "Expert pain management and surgical anaesthesia services.",
    image: "/images/Center of excellence/five.png",
    slug: null,
  },
];

const WHY_CHOOSE_US = [
  {
    title: "International Standards",
    description:
      "JCI-aligned protocols and internationally trained medical professionals.",
    icon: "globe",
  },
  {
    title: "24/7 Emergency Care",
    description:
      "Round-the-clock emergency services with rapid response teams.",
    icon: "alarm",
  },
  {
    title: "NABL Accredited Lab",
    description:
      "ISO 15189:2012 certified laboratory ensuring accurate diagnostics.",
    icon: "shield",
  },
  {
    title: "Home Sample Collection",
    description:
      "Convenient doorstep blood and sample collection across Kathmandu.",
    icon: "home",
  },
  {
    title: "Online Reports",
    description:
      "Secure digital reports delivered within 24 hours via WhatsApp and email.",
    icon: "document",
  },
  {
    title: "Expert Specialists",
    description:
      "50+ specialists across medical specialties with decades of experience.",
    icon: "users",
  },
];

const STATS = [
  { value: "25,000+", label: "Patients Treated" },
  { value: "50+", label: "Specialist Doctors" },
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Lab Tests Available" },
];

/**
 * Image slots are seeded only when the section is empty.
 *
 * The others above are reference content and safe to replace on every run, but
 * these are the one thing on the homepage an admin edits directly — re-running
 * the seed must not overwrite a photograph someone uploaded.
 */
async function seedSectionImages(section, rows) {
  const existing = await prisma.pageSectionImage.count({
    where: { page: HOME_PAGE, section },
  });

  if (existing > 0) {
    console.log(`  ${section}: ${existing} row(s) already present — left alone.`);
    return;
  }

  await prisma.pageSectionImage.createMany({
    data: rows.map((row, index) => ({
      page: HOME_PAGE,
      section,
      image: row.image,
      label: row.label ?? null,
      alt: row.alt ?? null,
      sortOrder: index,
      isActive: true,
    })),
  });

  console.log(`  ${section}: seeded ${rows.length} row(s).`);
}

async function main() {
  console.log("Seeding homepage content...");

  await prisma.centerOfExcellence.deleteMany();
  await prisma.centerOfExcellence.createMany({
    data: CENTERS_OF_EXCELLENCE.map((item, index) => ({
      ...item,
      sortOrder: index,
      isActive: true,
    })),
  });

  await prisma.whyChooseUsItem.deleteMany();
  await prisma.whyChooseUsItem.createMany({
    data: WHY_CHOOSE_US.map((item, index) => ({
      ...item,
      sortOrder: index,
      isActive: true,
    })),
  });

  await prisma.statistic.deleteMany({ where: { context: "site" } });
  await prisma.statistic.createMany({
    data: STATS.map((item, index) => ({
      ...item,
      context: "site",
      sortOrder: index,
      isActive: true,
    })),
  });

  await seedSectionImages(HERO_SECTION, HOME_HERO_SLIDES);
  await seedSectionImages(CARE_TEAM_SECTION, [HOME_CARE_TEAM_IMAGE]);

  const [centers, why, stats, images] = await Promise.all([
    prisma.centerOfExcellence.count(),
    prisma.whyChooseUsItem.count(),
    prisma.statistic.count({ where: { context: "site" } }),
    prisma.pageSectionImage.count(),
  ]);

  console.log(
    `Seeded centers=${centers}, whyChooseUs=${why}, siteStats=${stats}, sectionImages=${images}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
