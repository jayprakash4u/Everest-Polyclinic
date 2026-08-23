import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const sections = await prisma.healthPackageSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(sections);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  if (!body.section?.trim()) {
    return NextResponse.json({ error: "Section name is required." }, { status: 400 });
  }

  const section = await prisma.healthPackageSection.create({
    data: {
      section: body.section.trim(),
      icon: body.icon?.trim() || "activity",
      sortOrder: Number(body.sortOrder) || 0,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.healthPackages);

  return NextResponse.json(section, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ error: "Missing section id." }, { status: 400 });
  }

  const section = await prisma.healthPackageSection.update({
    where: { id },
    data: {
      section: body.section?.trim(),
      icon: body.icon?.trim() || "activity",
      sortOrder: Number(body.sortOrder) || 0,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.healthPackages);

  return NextResponse.json(section);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing section id." }, { status: 400 });
  }

  await prisma.healthPackageSection.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.healthPackages);

  return NextResponse.json({ ok: true });
}
