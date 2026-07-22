import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const items = await prisma.faq.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const item = await prisma.faq.create({
    data: {
      question: body.question,
      answer: body.answer,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const item = await prisma.faq.update({
    where: { id: Number(body.id) },
    data: {
      question: body.question,
      answer: body.answer,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
  });

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

  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
