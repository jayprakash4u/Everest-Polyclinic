import crypto from "node:crypto";
import { createPrismaClient } from "./create-prisma-client.mjs";
import {
  BLOG_POSTS,
  parseReadTimeMinutes,
  STATIC_FAQS,
  toBlogSlug,
} from "../src/constants/blogPosts.js";

const prisma = createPrismaClient();

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  const { SITE, TESTIMONIALS, STATS } = await import(
    "../src/constants/index.js"
  );
  const { DOCTOR_SPECIALISTS, DOCTOR_PAGE_STATS } = await import(
    "../src/constants/doctorsPage.js"
  );
  const { SERVICES: CATALOG_SERVICES } = await import(
    "../src/constants/services/catalog.js"
  );
  const { HEALTH_PACKAGES } = await import(
    "../src/constants/healthPackages.js"
  );

  console.log("Seeding Everest Polyclinic database...");

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      name: SITE.name,
      shortName: SITE.shortName,
      tagline: SITE.tagline,
      description: SITE.description,
      phone: SITE.phone,
      email: SITE.email,
      address: SITE.address,
      workingHours: SITE.workingHours,
      emergencyHotline: SITE.emergencyHotline,
    },
    create: {
      id: 1,
      name: SITE.name,
      shortName: SITE.shortName,
      tagline: SITE.tagline,
      description: SITE.description,
      phone: SITE.phone,
      email: SITE.email,
      address: SITE.address,
      workingHours: SITE.workingHours,
      emergencyHotline: SITE.emergencyHotline,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@everestpolyclinic.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: "Site Administrator",
      passwordHash: hashPassword(adminPassword),
      role: "super_admin",
      isActive: true,
    },
    create: {
      name: "Site Administrator",
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      role: "super_admin",
      isActive: true,
    },
  });

  for (const [index, service] of CATALOG_SERVICES.entries()) {
    const saved = await prisma.specialtyService.upsert({
      where: { slug: service.slug },
      update: {
        legacyId: service.legacyId ?? service.id,
        title: service.title,
        icon: service.icon,
        sortOrder: index,
        isActive: true,
      },
      create: {
        legacyId: service.legacyId ?? service.id,
        slug: service.slug,
        title: service.title,
        icon: service.icon,
        sortOrder: index,
        isActive: true,
      },
    });

    const contentJson = JSON.stringify({
      shortDescription: service.shortDescription,
      overview: service.overview,
      treatments: service.treatments,
      benefits: service.benefits,
      faqs: service.faqs,
      conditions: service.conditions ?? [],
      symptoms: service.symptoms ?? [],
      consultationSteps: service.consultationSteps ?? [],
      sections: service.sections ?? null,
    });

    await prisma.serviceDetail.upsert({
      where: { specialtyServiceId: saved.id },
      update: {
        title: service.title,
        description: service.overview,
        headerImage: service.heroImage ?? null,
        color: "primary",
        contentJson,
      },
      create: {
        specialtyServiceId: saved.id,
        title: service.title,
        description: service.overview,
        headerImage: service.heroImage ?? null,
        color: "primary",
        contentJson,
      },
    });
  }

  for (const [index, group] of DOCTOR_SPECIALISTS.entries()) {
    const category = await prisma.doctorCategory.upsert({
      where: { slug: group.slug },
      update: {
        name: group.category,
        sortOrder: index,
        isActive: true,
      },
      create: {
        name: group.category,
        slug: group.slug,
        sortOrder: index,
        isActive: true,
      },
    });

    for (const [doctorIndex, doctor] of group.doctors.entries()) {
      const existing = await prisma.doctor.findFirst({
        where: {
          categoryId: category.id,
          name: doctor.name,
        },
      });

      if (existing) {
        await prisma.doctor.update({
          where: { id: existing.id },
          data: {
            education: doctor.education,
            experience: doctor.experience,
            image: doctor.image,
            phone: "+977 9800000000",
            timing: "10:00 AM - 04:00 PM",
            showOnHomepage: index < 5 && doctorIndex === 0,
            sortOrder: doctorIndex + index * 10,
            isActive: true,
          },
        });
      } else {
        await prisma.doctor.create({
          data: {
            categoryId: category.id,
            name: doctor.name,
            education: doctor.education,
            experience: doctor.experience,
            image: doctor.image,
            phone: "+977 9800000000",
            timing: "10:00 AM - 04:00 PM",
            showOnHomepage: index < 5 && doctorIndex === 0,
            sortOrder: doctorIndex + index * 10,
            isActive: true,
          },
        });
      }
    }
  }

  for (const [index, item] of HEALTH_PACKAGES.entries()) {
    const existingSection = await prisma.healthPackageSection.findFirst({
      where: { section: item.section },
    });

    const section = existingSection
      ? await prisma.healthPackageSection.update({
          where: { id: existingSection.id },
          data: {
            section: item.section,
            icon: item.icon,
            sortOrder: index,
          },
        })
      : await prisma.healthPackageSection.create({
          data: {
            section: item.section,
            icon: item.icon,
            sortOrder: index,
          },
        });

    for (const [pkgIndex, pkg] of item.items.entries()) {
      const existing = await prisma.healthPackage.findFirst({
        where: {
          sectionId: section.id,
          legacyId: pkg.id,
        },
      });

      const payload = {
        sectionId: section.id,
        legacyId: pkg.id,
        name: pkg.name,
        price: pkg.price,
        originalPrice: pkg.originalPrice ?? null,
        badge: pkg.badge ?? null,
        testsJson: JSON.stringify(pkg.tests),
        sortOrder: pkgIndex,
        isActive: true,
      };

      if (existing) {
        await prisma.healthPackage.update({
          where: { id: existing.id },
          data: payload,
        });
      } else {
        await prisma.healthPackage.create({ data: payload });
      }
    }
  }

  const blogCategoryCache = new Map();

  for (const post of BLOG_POSTS) {
    let categoryId = blogCategoryCache.get(post.category);

    if (!categoryId) {
      const slug = toBlogSlug(post.category);
      const category = await prisma.blogCategory.upsert({
        where: { slug },
        update: { name: post.category },
        create: { name: post.category, slug },
      });
      categoryId = category.id;
      blogCategoryCache.set(post.category, categoryId);
    }

    const slug = toBlogSlug(post.title);

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        image: post.image,
        categoryId,
        readTimeMinutes: parseReadTimeMinutes(post.readTime),
        featured: Boolean(post.featured),
        isPublished: true,
      },
      create: {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        image: post.image,
        categoryId,
        readTimeMinutes: parseReadTimeMinutes(post.readTime),
        featured: Boolean(post.featured),
        isPublished: true,
      },
    });
  }

  await prisma.testimonial.deleteMany();

  for (const [index, item] of TESTIMONIALS.entries()) {
    await prisma.testimonial.create({
      data: {
        name: item.name,
        location: item.location,
        rating: item.rating,
        review: item.review,
        avatar: item.avatar ?? null,
        sortOrder: index,
        isActive: true,
      },
    });
  }

  await prisma.faq.deleteMany();

  for (const [index, item] of STATIC_FAQS.entries()) {
    await prisma.faq.create({
      data: {
        question: item.question,
        answer: item.answer,
        sortOrder: index,
        isActive: true,
      },
    });
  }

  await prisma.statistic.deleteMany({
    where: { context: { in: ["site", "doctors"] } },
  });

  for (const [index, item] of STATS.entries()) {
    await prisma.statistic.create({
      data: {
        value: item.value,
        label: item.label,
        context: "site",
        sortOrder: index,
        isActive: true,
      },
    });
  }

  for (const [index, item] of DOCTOR_PAGE_STATS.entries()) {
    await prisma.statistic.create({
      data: {
        value: item.value,
        label: item.label,
        context: "doctors",
        sortOrder: index,
        isActive: true,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
