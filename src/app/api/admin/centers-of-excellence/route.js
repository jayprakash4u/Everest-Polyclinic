import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

/**
 * Centres of excellence — the icon grid near the top of the home page.
 *
 * Every handler returns the affected record rather than a bare `{ ok: true }`,
 * so the admin screen can update its list from the response instead of
 * refetching the whole collection after each save.
 */

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/** A blank slug means "no detail page" — the card then links to /contact. */
function readBody(body) {
  const title = clean(body.title, 200);
  const description = clean(body.description, 2000);
  const image = clean(body.image, 500);
  const slug = clean(body.slug, 150);

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Description is required." };
  if (!image) return { error: "An icon image is required." };

  return {
    data: {
      title,
      description,
      image,
      slug: slug || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  };
}

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.centerOfExcellence.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { data, error } = readBody(await request.json());
  if (error) return NextResponse.json({ error }, { status: 400 });

  const item = await prisma.centerOfExcellence.create({ data });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.centersOfExcellence);

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

  const item = await prisma.centerOfExcellence.update({ where: { id }, data });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.centersOfExcellence);

  return NextResponse.json(item);
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.centerOfExcellence.delete({ where: { id } });
  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.centersOfExcellence);

  return NextResponse.json({ ok: true });
}
