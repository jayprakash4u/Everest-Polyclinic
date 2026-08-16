import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.$queryRaw`
    SELECT [id], [title], [description], [icon], [sortOrder], [isActive], [createdAt], [updatedAt]
    FROM [dbo].[WhyChooseUsItem]
    ORDER BY [sortOrder] ASC, [id] ASC
  `;

  return NextResponse.json(
    (items ?? []).map((row) => ({
      ...row,
      id: Number(row.id),
      sortOrder: Number(row.sortOrder),
      isActive: Boolean(row.isActive),
    })),
  );
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const now = new Date();

  await prisma.$executeRaw`
    INSERT INTO [dbo].[WhyChooseUsItem]
      ([title], [description], [icon], [sortOrder], [isActive], [createdAt], [updatedAt])
    VALUES (
      ${body.title},
      ${body.description},
      ${body.icon || "globe"},
      ${Number(body.sortOrder) || 0},
      ${body.isActive ?? true},
      ${now},
      ${now}
    )
  `;

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);
  const now = new Date();

  await prisma.$executeRaw`
    UPDATE [dbo].[WhyChooseUsItem]
    SET
      [title] = ${body.title},
      [description] = ${body.description},
      [icon] = ${body.icon || "globe"},
      [sortOrder] = ${Number(body.sortOrder) || 0},
      [isActive] = ${body.isActive ?? true},
      [updatedAt] = ${now}
    WHERE [id] = ${id}
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.$executeRaw`DELETE FROM [dbo].[WhyChooseUsItem] WHERE [id] = ${id}`;
  return NextResponse.json({ ok: true });
}
