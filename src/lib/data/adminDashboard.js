import { prisma } from "@/lib/db";
import { isDatabaseAvailable } from "@/lib/sql";

const EMPTY_STATS = {
  dbOnline: false,
  pendingAppointments: 0,
  confirmedAppointments: 0,
  totalAppointments: 0,
  unreadContacts: 0,
  doctors: 0,
  healthPackages: 0,
  blogPosts: 0,
  testimonials: 0,
  homepageSpecialists: 0,
  latestItems: [],
};

export async function getAdminDashboardStats() {
  const dbOnline = await isDatabaseAvailable();

  if (!dbOnline) {
    return { ...EMPTY_STATS, dbOnline: false };
  }

  try {
    const [
      pendingAppointments,
      confirmedAppointments,
      totalAppointments,
      unreadContacts,
      doctors,
      healthPackages,
      blogPosts,
      testimonials,
      homepageSpecialists,
      latestAppointments,
      latestContacts,
    ] = await Promise.all([
      prisma.appointmentRequest.count({ where: { status: "pending" } }),
      prisma.appointmentRequest.count({ where: { status: "confirmed" } }),
      prisma.appointmentRequest.count(),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.doctor.count({ where: { isActive: true } }),
      prisma.healthPackage.count(),
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.doctor.count({ where: { isActive: true, showOnHomepage: true } }),
      prisma.appointmentRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const latestItems = [
      ...latestAppointments.map((item) => ({
        id: `appointment-${item.id}`,
        type: "appointment",
        name: item.name,
        detail: item.department ?? item.packageName ?? "Appointment request",
        status: item.status,
        createdAt: item.createdAt,
      })),
      ...latestContacts.map((item) => ({
        id: `contact-${item.id}`,
        type: "contact",
        name: item.name,
        detail: item.subject ?? "Contact message",
        status: item.isRead ? "read" : "unread",
        createdAt: item.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    return {
      dbOnline: true,
      pendingAppointments,
      confirmedAppointments,
      totalAppointments,
      unreadContacts,
      doctors,
      healthPackages,
      blogPosts,
      testimonials,
      homepageSpecialists,
      latestItems,
    };
  } catch (error) {
    console.warn("[admin] Dashboard stats fallback:", error.message);
    return { ...EMPTY_STATS, dbOnline: false };
  }
}
