import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const [categories, doctors] = await Promise.all([
    prisma.doctorCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        doctors: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.doctor.findMany({
      include: { category: true },
      orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
    }),
  ]);

  return NextResponse.json({ categories, doctors });
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const doctor = await prisma.doctor.create({
    data: {
      categoryId: Number(body.categoryId),
      name: body.name,
      education: body.education,
      experience: body.experience,
      image: body.image,
      phone: body.phone || null,
      timing: body.timing || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json(doctor, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const doctor = await prisma.doctor.update({
    where: { id: Number(body.id) },
    data: {
      categoryId: Number(body.categoryId),
      name: body.name,
      education: body.education,
      experience: body.experience,
      image: body.image,
      phone: body.phone || null,
      timing: body.timing || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json(doctor);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.doctor.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.doctors);

  return NextResponse.json({ ok: true });
}
