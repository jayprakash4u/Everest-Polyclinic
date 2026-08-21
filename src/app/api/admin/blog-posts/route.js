import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { toBlogSlug } from "@/constants/blogPosts";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const categoryName = body.category?.trim();

  if (!categoryName) {
    return NextResponse.json({ error: "Category is required." }, { status: 400 });
  }

  const category = await prisma.blogCategory.upsert({
    where: { slug: toBlogSlug(categoryName) },
    update: { name: categoryName },
    create: { name: categoryName, slug: toBlogSlug(categoryName) },
  });

  const slug = body.slug?.trim() || toBlogSlug(body.title);

  const item = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      body: body.body || null,
      image: body.image,
      categoryId: category.id,
      readTimeMinutes: Number(body.readTimeMinutes) || 5,
      featured: Boolean(body.featured),
      isPublished: body.isPublished ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.blog);

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const categoryName = body.category?.trim();

  if (!categoryName) {
    return NextResponse.json({ error: "Category is required." }, { status: 400 });
  }

  const category = await prisma.blogCategory.upsert({
    where: { slug: toBlogSlug(categoryName) },
    update: { name: categoryName },
    create: { name: categoryName, slug: toBlogSlug(categoryName) },
  });

  const item = await prisma.blogPost.update({
    where: { id: Number(body.id) },
    data: {
      title: body.title,
      slug: body.slug?.trim() || toBlogSlug(body.title),
      excerpt: body.excerpt,
      body: body.body || null,
      image: body.image,
      categoryId: category.id,
      readTimeMinutes: Number(body.readTimeMinutes) || 5,
      featured: Boolean(body.featured),
      isPublished: body.isPublished ?? true,
    },
    include: { category: true },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.blog);

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

  await prisma.blogPost.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.blog);

  return NextResponse.json({ ok: true });
}
