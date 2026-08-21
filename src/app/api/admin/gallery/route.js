import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  if (!body.src?.trim() || !body.alt?.trim()) {
    return NextResponse.json(
      { error: "Image and alt text are required." },
      { status: 400 },
    );
  }

  const item = await prisma.galleryImage.create({
    data: {
      src: body.src.trim(),
      alt: body.alt.trim(),
      caption: body.caption?.trim() || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.gallery);

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const item = await prisma.galleryImage.update({
    where: { id },
    data: {
      src: body.src?.trim(),
      alt: body.alt?.trim(),
      caption: body.caption?.trim() || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.gallery);

  return NextResponse.json(item);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.galleryImage.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.gallery);

  return NextResponse.json({ ok: true });
}
