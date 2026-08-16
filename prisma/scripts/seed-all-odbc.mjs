/**
 * Full database seed via ODBC only (no Prisma).
 * Run: node prisma/scripts/seed-all-odbc.mjs
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import odbc from "odbc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const connectionString =
  process.env.SQLSERVER_CONNECTION_STRING ??
  "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=EverestPolyclinic;Trusted_Connection=Yes;TrustServerCertificate=Yes;";

/** Inlined from src/constants/index.js to avoid `@/` re-exports breaking Node. */
const SITE = {
  name: "Everest International Polyclinic",
  shortName: "Everest Polyclinic",
  tagline: "World-Class Healthcare at the Foot of the Himalayas",
  description:
    "Nepal's most trusted international polyclinic offering comprehensive medical services with cutting-edge technology and compassionate care.",
  phone: "+977 985-8021822",
  email: "everestintel2070@gmail.com",
  address: "Karkando Chowk, Nepalgunj-18, Nepalganj, Nepal",
  workingHours: "Sun – Fri: 8:00 AM – 8:00 PM",
  emergencyHotline: "+977 985-8021822",
};

const STATS = [
  { value: "25,000+", label: "Patients Treated" },
  { value: "50+", label: "Specialist Doctors" },
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Lab Tests Available" },
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

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sita Sharma",
    location: "Kathmandu",
    rating: 5,
    review:
      "Everest Polyclinic gave me world-class treatment at affordable prices. The doctors are extremely knowledgeable and caring.",
    avatar: "/avatars/sita.jpg",
  },
  {
    id: 2,
    name: "Ramesh Karki",
    location: "Pokhara",
    rating: 5,
    review:
      "I flew in from Pokhara specifically for their cardiac evaluation. Outstanding facility and professional staff.",
    avatar: "/avatars/ramesh.jpg",
  },
  {
    id: 3,
    name: "Priya Thapa",
    location: "Lalitpur",
    rating: 5,
    review:
      "The lab reports came on WhatsApp within hours. So convenient and the results were very accurate.",
    avatar: "/avatars/priya.jpg",
  },
  {
    id: 4,
    name: "Anil Gurung",
    location: "Bhaktapur",
    rating: 5,
    review:
      "Booked a full health checkup for my parents. Everything was well organised — from registration to consultation and reports.",
    avatar: "/avatars/anil.jpg",
  },
  {
    id: 5,
    name: "Mina Rai",
    location: "Kathmandu",
    rating: 5,
    review:
      "The pediatric team was patient and kind with my daughter. Clear explanation of treatment and follow-up care made us feel confident.",
    avatar: "/avatars/mina.jpg",
  },
  {
    id: 6,
    name: "Bikash Shrestha",
    location: "Chitwan",
    rating: 5,
    review:
      "Used telemedicine for a follow-up after travel. Quick, professional, and the doctor reviewed my reports thoroughly online.",
    avatar: "/avatars/bikash.jpg",
  },
];

/** Slim identity list from catalog.js — enriched via pageContent.js (extensionless catalog import fails in plain Node). */
const SERVICES_RAW = [
  { id: 1, slug: "general-medicine", title: "General Medicine", icon: "stethoscope" },
  { id: 2, slug: "family-medicine", title: "Family Medicine", icon: "users" },
  { id: 3, slug: "pediatrics", title: "Pediatrics", icon: "baby" },
  { id: 4, slug: "gynecology", title: "Gynecology", icon: "maternity" },
  { id: 5, slug: "orthopedics", title: "Orthopedics", icon: "bone" },
  { id: 6, slug: "cardiology", title: "Cardiology", icon: "heart" },
  { id: 7, slug: "dermatology", title: "Dermatology", icon: "sparkles" },
  { id: 8, slug: "ent", title: "ENT", icon: "ear" },
  { id: 9, slug: "dental-care", title: "Dental Care", icon: "tooth" },
  { id: 10, slug: "physiotherapy", title: "Physiotherapy", icon: "activity" },
  { id: 11, slug: "laboratory", title: "Laboratory", icon: "microscope" },
  { id: 12, slug: "diagnostic-imaging", title: "Diagnostic Imaging", icon: "scan" },
  { id: 13, slug: "vaccination", title: "Vaccination", icon: "syringe" },
  { id: 14, slug: "health-checkup", title: "Health Checkup", icon: "clipboardcheck" },
  { id: 15, slug: "pharmacy", title: "Pharmacy", icon: "pill" },
  { id: 16, slug: "home-care", title: "Home Care", icon: "homecare" },
  { id: 17, slug: "telemedicine", title: "Telemedicine", icon: "telemedicine" },
];

function sqlString(value) {
  if (value == null) return "NULL";
  return `N'${String(value).replace(/'/g, "''")}'`;
}

function sqlBit(value) {
  return value ? 1 : 0;
}

function sqlInt(value) {
  if (value == null) return "NULL";
  return String(Number(value));
}

function srcUrl(relPath) {
  return pathToFileURL(path.join(ROOT, relPath)).href;
}

async function countTable(connection, table) {
  const rows = await connection.query(
    `SELECT COUNT(*) AS count FROM [dbo].[${table}]`,
  );
  return rows[0].count;
}

async function ensureGalleryTable(connection) {
  await connection.query(`
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'GalleryImage')
BEGIN
  CREATE TABLE [dbo].[GalleryImage] (
    [id] INT NOT NULL IDENTITY(1,1),
    [src] NVARCHAR(500) NOT NULL,
    [alt] NVARCHAR(300) NOT NULL,
    [caption] NVARCHAR(300) NULL,
    [sortOrder] INT NOT NULL CONSTRAINT [GalleryImage_sortOrder_df] DEFAULT 0,
    [isActive] BIT NOT NULL CONSTRAINT [GalleryImage_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GalleryImage_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [GalleryImage_pkey] PRIMARY KEY CLUSTERED ([id])
  );
END
  `);
}

/** Align live SQL Server columns with prisma/schema.prisma when older DBs lack them. */
async function ensureSchemaColumns(connection) {
  await connection.query(`
IF COL_LENGTH('dbo.SpecialtyService', 'slug') IS NULL
BEGIN
  ALTER TABLE [dbo].[SpecialtyService]
    ADD [slug] NVARCHAR(150) NULL;
END
  `);

  await connection.query(`
IF NOT EXISTS (
  SELECT 1 FROM sys.indexes
  WHERE name = N'SpecialtyService_slug_key'
    AND object_id = OBJECT_ID(N'dbo.SpecialtyService')
)
BEGIN
  CREATE UNIQUE NONCLUSTERED INDEX [SpecialtyService_slug_key]
    ON [dbo].[SpecialtyService]([slug])
    WHERE [slug] IS NOT NULL;
END
  `);

  await connection.query(`
IF COL_LENGTH('dbo.Doctor', 'showOnHomepage') IS NULL
BEGIN
  ALTER TABLE [dbo].[Doctor]
    ADD [showOnHomepage] BIT NOT NULL
      CONSTRAINT [Doctor_showOnHomepage_df] DEFAULT 0;
END
  `);

  await connection.query(`
IF COL_LENGTH('dbo.HealthPackage', 'showOnHomepage') IS NULL
BEGIN
  ALTER TABLE [dbo].[HealthPackage]
    ADD [showOnHomepage] BIT NOT NULL
      CONSTRAINT [HealthPackage_showOnHomepage_df] DEFAULT 0;
END
  `);
}

async function main() {
  console.log("Loading constants...");

  const { enrichServicesWithPageContent } = await import(
    srcUrl("src/constants/services/pageContent.js")
  );

  let getHomepageServiceImage = () => null;
  try {
    const homepageImages = await import(
      srcUrl("src/constants/services/homepageServiceImages.js")
    );
    getHomepageServiceImage = homepageImages.getHomepageServiceImage;
  } catch (error) {
    console.warn(
      "Could not import getHomepageServiceImage; homepageImage will be null.",
      error.message,
    );
  }

  const { DOCTOR_SPECIALISTS, DOCTOR_PAGE_STATS } = await import(
    srcUrl("src/constants/doctorsPage.js")
  );
  const { HEALTH_PACKAGES } = await import(
    srcUrl("src/constants/healthPackages.js")
  );
  const {
    BLOG_POSTS,
    STATIC_FAQS,
    toBlogSlug,
    parseReadTimeMinutes,
  } = await import(srcUrl("src/constants/blogPosts.js"));
  const { GALLERY_IMAGES } = await import(
    srcUrl("src/constants/galleryImages.js")
  );
  const { CENTERS_OF_EXCELLENCE } = await import(
    srcUrl("src/constants/centerOfExcellence.js")
  );

  const SERVICES = enrichServicesWithPageContent(SERVICES_RAW);

  console.log("Connecting via ODBC...");
  const connection = await odbc.connect(connectionString);
  const now = new Date().toISOString();

  try {
    console.log("Ensuring schema columns / GalleryImage table...");
    await ensureSchemaColumns(connection);
    await ensureGalleryTable(connection);

    // 1. SiteSetting
    console.log("Seeding SiteSetting...");
    await connection.query("DELETE FROM [dbo].[SiteSetting] WHERE [id] = 1");
    await connection.query(`
      INSERT INTO [dbo].[SiteSetting]
        ([id], [name], [shortName], [tagline], [description], [phone], [email],
         [address], [workingHours], [emergencyHotline], [updatedAt])
      VALUES (
        1,
        ${sqlString(SITE.name)},
        ${sqlString(SITE.shortName)},
        ${sqlString(SITE.tagline)},
        ${sqlString(SITE.description)},
        ${sqlString(SITE.phone)},
        ${sqlString(SITE.email)},
        ${sqlString(SITE.address)},
        ${sqlString(SITE.workingHours)},
        ${sqlString(SITE.emergencyHotline)},
        ${sqlString(now)}
      )
    `);

    // 2. SpecialtyService + ServiceDetail
    console.log("Seeding SpecialtyService + ServiceDetail...");
    for (const [index, service] of SERVICES.entries()) {
      const legacyId = service.legacyId ?? service.id;
      const existing = await connection.query(`
        SELECT [id] FROM [dbo].[SpecialtyService]
        WHERE [slug] = ${sqlString(service.slug)}
      `);

      let specialtyServiceId;
      if (existing.length > 0) {
        specialtyServiceId = existing[0].id;
        await connection.query(`
          UPDATE [dbo].[SpecialtyService]
          SET
            [legacyId] = ${sqlInt(legacyId)},
            [title] = ${sqlString(service.title)},
            [icon] = ${sqlString(service.icon)},
            [sortOrder] = ${index},
            [isActive] = 1
          WHERE [id] = ${specialtyServiceId}
        `);
      } else {
        await connection.query(`
          INSERT INTO [dbo].[SpecialtyService]
            ([legacyId], [slug], [title], [icon], [sortOrder], [isActive])
          VALUES (
            ${sqlInt(legacyId)},
            ${sqlString(service.slug)},
            ${sqlString(service.title)},
            ${sqlString(service.icon)},
            ${index},
            1
          )
        `);
        const inserted = await connection.query(`
          SELECT [id] FROM [dbo].[SpecialtyService]
          WHERE [slug] = ${sqlString(service.slug)}
        `);
        specialtyServiceId = inserted[0].id;
      }

      const homepageImage = getHomepageServiceImage(service.slug) ?? null;
      const contentJson = JSON.stringify({
        shortDescription: service.shortDescription,
        overview: service.overview,
        about: service.about ?? service.overview,
        treatments: service.treatments,
        benefits: service.benefits,
        faqs: service.faqs,
        conditions: service.conditions ?? [],
        symptoms: service.symptoms ?? [],
        consultationSteps: service.consultationSteps ?? [],
        sections: service.sections ?? null,
        hero: service.hero ?? null,
        aboutBenefits: service.aboutBenefits ?? [],
        serviceOfferings: service.serviceOfferings ?? null,
        whyChooseUs: service.whyChooseUs ?? null,
        highlights: service.highlights ?? null,
        cta: service.cta ?? null,
        homepageImage,
        heroSideImage: service.heroSideImage ?? null,
      });

      const description =
        service.overview || service.shortDescription || service.title;
      const headerImage =
        service.hero?.image ?? service.heroSideImage ?? homepageImage ?? null;

      const detailExisting = await connection.query(`
        SELECT [id] FROM [dbo].[ServiceDetail]
        WHERE [specialtyServiceId] = ${specialtyServiceId}
      `);

      if (detailExisting.length > 0) {
        await connection.query(`
          UPDATE [dbo].[ServiceDetail]
          SET
            [title] = ${sqlString(service.title)},
            [description] = ${sqlString(description)},
            [headerImage] = ${sqlString(headerImage)},
            [color] = N'primary',
            [contentJson] = ${sqlString(contentJson)}
          WHERE [specialtyServiceId] = ${specialtyServiceId}
        `);
      } else {
        await connection.query(`
          INSERT INTO [dbo].[ServiceDetail]
            ([specialtyServiceId], [title], [description], [headerImage], [color], [contentJson])
          VALUES (
            ${specialtyServiceId},
            ${sqlString(service.title)},
            ${sqlString(description)},
            ${sqlString(headerImage)},
            N'primary',
            ${sqlString(contentJson)}
          )
        `);
      }
    }

    // 3. DoctorCategory + Doctor
    console.log("Seeding DoctorCategory + Doctor...");
    for (const [index, group] of DOCTOR_SPECIALISTS.entries()) {
      const catExisting = await connection.query(`
        SELECT [id] FROM [dbo].[DoctorCategory]
        WHERE [slug] = ${sqlString(group.slug)}
      `);

      let categoryId;
      if (catExisting.length > 0) {
        categoryId = catExisting[0].id;
        await connection.query(`
          UPDATE [dbo].[DoctorCategory]
          SET
            [name] = ${sqlString(group.category)},
            [sortOrder] = ${index},
            [isActive] = 1
          WHERE [id] = ${categoryId}
        `);
      } else {
        await connection.query(`
          INSERT INTO [dbo].[DoctorCategory]
            ([name], [slug], [sortOrder], [isActive])
          VALUES (
            ${sqlString(group.category)},
            ${sqlString(group.slug)},
            ${index},
            1
          )
        `);
        const inserted = await connection.query(`
          SELECT [id] FROM [dbo].[DoctorCategory]
          WHERE [slug] = ${sqlString(group.slug)}
        `);
        categoryId = inserted[0].id;
      }

      for (const [doctorIndex, doctor] of group.doctors.entries()) {
        const showOnHomepage = index < 5 && doctorIndex === 0;
        const sortOrder = doctorIndex + index * 10;
        const docExisting = await connection.query(`
          SELECT [id] FROM [dbo].[Doctor]
          WHERE [categoryId] = ${categoryId}
            AND [name] = ${sqlString(doctor.name)}
        `);

        if (docExisting.length > 0) {
          await connection.query(`
            UPDATE [dbo].[Doctor]
            SET
              [education] = ${sqlString(doctor.education)},
              [experience] = ${sqlString(doctor.experience)},
              [image] = ${sqlString(doctor.image)},
              [phone] = N'+977 9800000000',
              [timing] = N'10:00 AM - 04:00 PM',
              [showOnHomepage] = ${sqlBit(showOnHomepage)},
              [sortOrder] = ${sortOrder},
              [isActive] = 1,
              [updatedAt] = ${sqlString(now)}
            WHERE [id] = ${docExisting[0].id}
          `);
        } else {
          await connection.query(`
            INSERT INTO [dbo].[Doctor]
              ([categoryId], [name], [education], [experience], [image],
               [phone], [timing], [showOnHomepage], [sortOrder], [isActive],
               [createdAt], [updatedAt])
            VALUES (
              ${categoryId},
              ${sqlString(doctor.name)},
              ${sqlString(doctor.education)},
              ${sqlString(doctor.experience)},
              ${sqlString(doctor.image)},
              N'+977 9800000000',
              N'10:00 AM - 04:00 PM',
              ${sqlBit(showOnHomepage)},
              ${sortOrder},
              1,
              ${sqlString(now)},
              ${sqlString(now)}
            )
          `);
        }
      }
    }

    // 4. HealthPackageSection + HealthPackage
    console.log("Seeding HealthPackageSection + HealthPackage...");
    for (const [index, item] of HEALTH_PACKAGES.entries()) {
      const secExisting = await connection.query(`
        SELECT [id] FROM [dbo].[HealthPackageSection]
        WHERE [section] = ${sqlString(item.section)}
      `);

      let sectionId;
      if (secExisting.length > 0) {
        sectionId = secExisting[0].id;
        await connection.query(`
          UPDATE [dbo].[HealthPackageSection]
          SET
            [icon] = ${sqlString(item.icon)},
            [sortOrder] = ${index}
          WHERE [id] = ${sectionId}
        `);
      } else {
        await connection.query(`
          INSERT INTO [dbo].[HealthPackageSection]
            ([section], [icon], [sortOrder])
          VALUES (
            ${sqlString(item.section)},
            ${sqlString(item.icon)},
            ${index}
          )
        `);
        const inserted = await connection.query(`
          SELECT [id] FROM [dbo].[HealthPackageSection]
          WHERE [section] = ${sqlString(item.section)}
        `);
        sectionId = inserted[0].id;
      }

      for (const [pkgIndex, pkg] of item.items.entries()) {
        const testsJson = JSON.stringify(pkg.tests);
        const showOnHomepage = Boolean(pkg.badge);
        const pkgExisting = await connection.query(`
          SELECT [id] FROM [dbo].[HealthPackage]
          WHERE [sectionId] = ${sectionId}
            AND [legacyId] = ${sqlInt(pkg.id)}
        `);

        if (pkgExisting.length > 0) {
          await connection.query(`
            UPDATE [dbo].[HealthPackage]
            SET
              [name] = ${sqlString(pkg.name)},
              [price] = ${sqlInt(pkg.price)},
              [originalPrice] = ${sqlInt(pkg.originalPrice ?? null)},
              [badge] = ${sqlString(pkg.badge ?? null)},
              [testsJson] = ${sqlString(testsJson)},
              [showOnHomepage] = ${sqlBit(showOnHomepage)},
              [sortOrder] = ${pkgIndex},
              [isActive] = 1
            WHERE [id] = ${pkgExisting[0].id}
          `);
        } else {
          await connection.query(`
            INSERT INTO [dbo].[HealthPackage]
              ([sectionId], [legacyId], [name], [price], [originalPrice],
               [badge], [testsJson], [showOnHomepage], [sortOrder], [isActive])
            VALUES (
              ${sectionId},
              ${sqlInt(pkg.id)},
              ${sqlString(pkg.name)},
              ${sqlInt(pkg.price)},
              ${sqlInt(pkg.originalPrice ?? null)},
              ${sqlString(pkg.badge ?? null)},
              ${sqlString(testsJson)},
              ${sqlBit(showOnHomepage)},
              ${pkgIndex},
              1
            )
          `);
        }
      }
    }

    // 5. BlogCategory + BlogPost
    console.log("Seeding BlogCategory + BlogPost...");
    const blogCategoryCache = new Map();

    for (const post of BLOG_POSTS) {
      let categoryId = blogCategoryCache.get(post.category);

      if (!categoryId) {
        const categorySlug = toBlogSlug(post.category);
        const catExisting = await connection.query(`
          SELECT [id] FROM [dbo].[BlogCategory]
          WHERE [slug] = ${sqlString(categorySlug)}
        `);

        if (catExisting.length > 0) {
          categoryId = catExisting[0].id;
          await connection.query(`
            UPDATE [dbo].[BlogCategory]
            SET [name] = ${sqlString(post.category)}
            WHERE [id] = ${categoryId}
          `);
        } else {
          await connection.query(`
            INSERT INTO [dbo].[BlogCategory] ([name], [slug])
            VALUES (${sqlString(post.category)}, ${sqlString(categorySlug)})
          `);
          const inserted = await connection.query(`
            SELECT [id] FROM [dbo].[BlogCategory]
            WHERE [slug] = ${sqlString(categorySlug)}
          `);
          categoryId = inserted[0].id;
        }
        blogCategoryCache.set(post.category, categoryId);
      }

      const slug = toBlogSlug(post.title);
      const readTimeMinutes = parseReadTimeMinutes(post.readTime);
      const postExisting = await connection.query(`
        SELECT [id] FROM [dbo].[BlogPost]
        WHERE [slug] = ${sqlString(slug)}
      `);

      if (postExisting.length > 0) {
        await connection.query(`
          UPDATE [dbo].[BlogPost]
          SET
            [title] = ${sqlString(post.title)},
            [excerpt] = ${sqlString(post.excerpt)},
            [image] = ${sqlString(post.image)},
            [categoryId] = ${categoryId},
            [readTimeMinutes] = ${readTimeMinutes},
            [featured] = ${sqlBit(Boolean(post.featured))},
            [isPublished] = 1,
            [updatedAt] = ${sqlString(now)}
          WHERE [id] = ${postExisting[0].id}
        `);
      } else {
        await connection.query(`
          INSERT INTO [dbo].[BlogPost]
            ([title], [slug], [excerpt], [image], [categoryId],
             [readTimeMinutes], [featured], [isPublished],
             [publishedAt], [createdAt], [updatedAt])
          VALUES (
            ${sqlString(post.title)},
            ${sqlString(slug)},
            ${sqlString(post.excerpt)},
            ${sqlString(post.image)},
            ${categoryId},
            ${readTimeMinutes},
            ${sqlBit(Boolean(post.featured))},
            1,
            ${sqlString(now)},
            ${sqlString(now)},
            ${sqlString(now)}
          )
        `);
      }
    }

    // 6. Testimonial
    console.log("Seeding Testimonial...");
    await connection.query("DELETE FROM [dbo].[Testimonial]");
    for (const [index, item] of TESTIMONIALS.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[Testimonial]
          ([name], [location], [rating], [review], [avatar],
           [sortOrder], [isActive], [createdAt])
        VALUES (
          ${sqlString(item.name)},
          ${sqlString(item.location)},
          ${sqlInt(item.rating)},
          ${sqlString(item.review)},
          ${sqlString(item.avatar ?? null)},
          ${index},
          1,
          ${sqlString(now)}
        )
      `);
    }

    // 7. Faq
    console.log("Seeding Faq...");
    await connection.query("DELETE FROM [dbo].[Faq]");
    for (const [index, item] of STATIC_FAQS.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[Faq]
          ([question], [answer], [sortOrder], [isActive])
        VALUES (
          ${sqlString(item.question)},
          ${sqlString(item.answer)},
          ${index},
          1
        )
      `);
    }

    // 8. Statistic
    console.log("Seeding Statistic...");
    await connection.query(`
      DELETE FROM [dbo].[Statistic]
      WHERE [context] IN (N'site', N'doctors')
    `);
    for (const [index, item] of STATS.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[Statistic]
          ([value], [label], [context], [sortOrder], [isActive])
        VALUES (
          ${sqlString(item.value)},
          ${sqlString(item.label)},
          N'site',
          ${index},
          1
        )
      `);
    }
    for (const [index, item] of DOCTOR_PAGE_STATS.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[Statistic]
          ([value], [label], [context], [sortOrder], [isActive])
        VALUES (
          ${sqlString(item.value)},
          ${sqlString(item.label)},
          N'doctors',
          ${index},
          1
        )
      `);
    }

    // 9. GalleryImage
    console.log("Seeding GalleryImage...");
    await ensureGalleryTable(connection);
    await connection.query("DELETE FROM [dbo].[GalleryImage]");
    for (const [index, item] of GALLERY_IMAGES.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[GalleryImage]
          ([src], [alt], [caption], [sortOrder], [isActive], [createdAt])
        VALUES (
          ${sqlString(item.src)},
          ${sqlString(item.alt)},
          ${sqlString(item.caption ?? null)},
          ${index},
          1,
          ${sqlString(now)}
        )
      `);
    }

    // 10. CenterOfExcellence + WhyChooseUsItem
    console.log("Seeding CenterOfExcellence + WhyChooseUsItem...");
    await connection.query("DELETE FROM [dbo].[CenterOfExcellence]");
    for (const [index, item] of CENTERS_OF_EXCELLENCE.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[CenterOfExcellence]
          ([title], [description], [image], [slug], [sortOrder],
           [isActive], [createdAt], [updatedAt])
        VALUES (
          ${sqlString(item.title)},
          ${sqlString(item.description)},
          ${sqlString(item.image)},
          ${item.slug ? sqlString(item.slug) : "NULL"},
          ${index},
          1,
          ${sqlString(now)},
          ${sqlString(now)}
        )
      `);
    }

    await connection.query("DELETE FROM [dbo].[WhyChooseUsItem]");
    for (const [index, item] of WHY_CHOOSE_US.entries()) {
      await connection.query(`
        INSERT INTO [dbo].[WhyChooseUsItem]
          ([title], [description], [icon], [sortOrder],
           [isActive], [createdAt], [updatedAt])
        VALUES (
          ${sqlString(item.title)},
          ${sqlString(item.description)},
          ${sqlString(item.icon)},
          ${index},
          1,
          ${sqlString(now)},
          ${sqlString(now)}
        )
      `);
    }

    const counts = {
      SpecialtyService: await countTable(connection, "SpecialtyService"),
      ServiceDetail: await countTable(connection, "ServiceDetail"),
      Doctor: await countTable(connection, "Doctor"),
      HealthPackage: await countTable(connection, "HealthPackage"),
      BlogPost: await countTable(connection, "BlogPost"),
      Testimonial: await countTable(connection, "Testimonial"),
      Faq: await countTable(connection, "Faq"),
      Statistic: await countTable(connection, "Statistic"),
      GalleryImage: await countTable(connection, "GalleryImage"),
      CenterOfExcellence: await countTable(connection, "CenterOfExcellence"),
      WhyChooseUsItem: await countTable(connection, "WhyChooseUsItem"),
      SiteSetting: await countTable(connection, "SiteSetting"),
    };

    console.log("\nSeed completed. Counts:");
    for (const [table, count] of Object.entries(counts)) {
      console.log(`  ${table}: ${count}`);
    }
  } finally {
    await connection.close();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
