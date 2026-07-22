import {
  DOCTOR_PAGE_STATS,
  DOCTOR_SPECIALISTS,
  HOMEPAGE_SPECIALISTS,
} from "@/constants/doctorsPage";
import { prisma } from "@/lib/db";

function mapDoctorToHomepageCard(doctor) {
  return {
    id: doctor.id,
    name: doctor.name,
    degree: doctor.education,
    specialist: doctor.category?.name ?? "Specialist",
    timing: doctor.timing ?? "By appointment",
    phone: doctor.phone ?? "",
    image: doctor.image,
  };
}

function mapStaticDoctors() {
  return DOCTOR_SPECIALISTS.flatMap((group) =>
    group.doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      education: doctor.education,
      experience: doctor.experience,
      image: doctor.image,
      category: group.category,
      slug: group.slug,
    })),
  );
}

export async function getDoctorsPageData() {
  try {
    const categories = await prisma.doctorCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        doctors: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (categories.length > 0) {
      const specialists = categories.map((category) => ({
        category: category.name,
        slug: category.slug,
        doctors: category.doctors.map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
          education: doctor.education,
          experience: doctor.experience,
          image: doctor.image,
        })),
      }));

      const stats = await prisma.statistic.findMany({
        where: { context: "doctors", isActive: true },
        orderBy: { sortOrder: "asc" },
      });

      return {
        specialists,
        stats:
          stats.length > 0
            ? stats.map((item) => ({ value: item.value, label: item.label }))
            : DOCTOR_PAGE_STATS,
        doctors: specialists.flatMap((group) =>
          group.doctors.map((doctor) => ({
            ...doctor,
            category: group.category,
            slug: group.slug,
          })),
        ),
      };
    }
  } catch (error) {
    console.warn("[db] Doctors fallback:", error.message);
  }

  return {
    specialists: DOCTOR_SPECIALISTS,
    stats: DOCTOR_PAGE_STATS,
    doctors: mapStaticDoctors(),
  };
}

export async function getHomepageSpecialists() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true, showOnHomepage: true },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    if (doctors.length > 0) {
      return doctors.map(mapDoctorToHomepageCard);
    }
  } catch (error) {
    console.warn("[db] Homepage specialists fallback:", error.message);
  }

  return HOMEPAGE_SPECIALISTS;
}

export async function getHomepageDoctors(limit = 10) {
  const specialists = await getHomepageSpecialists();
  return specialists.slice(0, limit);
}
