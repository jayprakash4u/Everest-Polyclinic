import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const item = await prisma.testimonial.create({
    data: {
      name: body.name,
      location: body.location,
      rating: Number(body.rating) || 5,
      review: body.review,
      avatar: body.avatar || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.testimonials);

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const item = await prisma.testimonial.update({
    where: { id: Number(body.id) },
    data: {
      name: body.name,
      location: body.location,
      rating: Number(body.rating) || 5,
      review: body.review,
      avatar: body.avatar || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.testimonials);

  return NextResponse.json(item);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.testimonial.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.testimonials);

  return NextResponse.json({ ok: true });
}
