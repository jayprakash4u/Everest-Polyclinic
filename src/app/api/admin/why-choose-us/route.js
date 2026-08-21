import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

/**
 * The "Why Choose Us" trust grid on the home page.
 *
 * Written against the Prisma client rather than $queryRaw. The raw form was a
 * workaround for the old SQL Server adapter, which could not run parameterised
 * queries; on MySQL that limitation is gone, and the client returns the saved
 * record so the admin screen can show it without a second request.
 */

function readBody(body) {
  const title = String(body.title ?? "").trim().slice(0, 200);
  const description = String(body.description ?? "").trim().slice(0, 2000);

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Description is required." };

  return {
    data: {
      title,
      description,
      icon: String(body.icon || "globe").trim().slice(0, 100),
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  };
}

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.whyChooseUsItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { data, error } = readBody(await request.json());
  if (error) return NextResponse.json({ error }, { status: 400 });

  const item = await prisma.whyChooseUsItem.create({ data });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.whyChooseUs);

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data, error } = readBody(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const item = await prisma.whyChooseUsItem.update({ where: { id }, data });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.whyChooseUs);

  return NextResponse.json(item);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.whyChooseUsItem.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.whyChooseUs);

  return NextResponse.json({ ok: true });
}
