import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

function parseContentJson(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const rows = await prisma.specialtyService.findMany({
    include: { detail: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  const items = rows.map((row) => {
    const stored = parseContentJson(row.detail?.contentJson);
    return {
      id: row.id,
      slug: row.slug,
      title: row.detail?.title ?? row.title,
      icon: row.icon,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      shortDescription: stored.shortDescription ?? "",
      homepageImage:
        stored.homepageImage ?? row.detail?.headerImage ?? "",
      detailId: row.detail?.id ?? null,
    };
  });

  return NextResponse.json(items);
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const existing = await prisma.specialtyService.findUnique({
    where: { id },
    include: { detail: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stored = parseContentJson(existing.detail?.contentJson);
  const nextContent = {
    ...stored,
    shortDescription: body.shortDescription ?? stored.shortDescription ?? "",
    homepageImage: body.homepageImage || stored.homepageImage || null,
  };

  const updated = await prisma.specialtyService.update({
    where: { id },
    data: {
      title: body.title ?? existing.title,
      icon: body.icon ?? existing.icon,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
      detail: existing.detail
        ? {
            update: {
              title: body.title ?? existing.detail.title,
              description:
                body.shortDescription ||
                existing.detail.description ||
                existing.title,
              headerImage:
                body.homepageImage || existing.detail.headerImage || null,
              contentJson: JSON.stringify(nextContent),
            },
          }
        : {
            create: {
              title: body.title ?? existing.title,
              description: body.shortDescription || existing.title,
              headerImage: body.homepageImage || null,
              color: "primary",
              contentJson: JSON.stringify(nextContent),
            },
          },
    },
    include: { detail: true },
  });

  return NextResponse.json(updated);
}
