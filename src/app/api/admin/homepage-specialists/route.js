import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const [categories, specialists] = await Promise.all([
    prisma.doctorCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.doctor.findMany({
      where: { showOnHomepage: true },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    }),
  ]);

  return NextResponse.json({ categories, specialists });
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  if (!body.name?.trim() || !body.categoryId || !body.education?.trim()) {
    return NextResponse.json(
      { error: "Name, specialty category, and degree are required." },
      { status: 400 },
    );
  }

  const specialist = await prisma.doctor.create({
    data: {
      categoryId: Number(body.categoryId),
      name: body.name.trim(),
      education: body.education.trim(),
      experience: body.experience?.trim() || "Available",
      image: body.image?.trim() || "/images/doctors/doctor-1.jpg",
      phone: body.phone?.trim() || null,
      timing: body.timing?.trim() || null,
      showOnHomepage: true,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json(specialist, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ error: "Missing specialist id." }, { status: 400 });
  }

  const specialist = await prisma.doctor.update({
    where: { id },
    data: {
      categoryId: Number(body.categoryId),
      name: body.name?.trim(),
      education: body.education?.trim(),
      experience: body.experience?.trim() || "Available",
      image: body.image?.trim(),
      phone: body.phone?.trim() || null,
      timing: body.timing?.trim() || null,
      showOnHomepage: true,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json(specialist);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing specialist id." }, { status: 400 });
  }

  await prisma.doctor.update({
    where: { id },
    data: { showOnHomepage: false },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json({ ok: true });
}
