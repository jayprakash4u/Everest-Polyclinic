import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { mapPackageForClient, parseTestsInput } from "@/lib/health-package-utils";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const [sections, packages] = await Promise.all([
    prisma.healthPackageSection.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    }),
    prisma.healthPackage.findMany({
      include: { section: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    }),
  ]);

  return NextResponse.json({
    sections,
    packages: packages.map(mapPackageForClient),
  });
}

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const sectionId = Number(body.sectionId);

  if (!sectionId || !body.name?.trim()) {
    return NextResponse.json(
      { error: "Section and package name are required." },
      { status: 400 },
    );
  }

  const tests = parseTestsInput(body.testsText ?? body.tests);

  const item = await prisma.healthPackage.create({
    data: {
      sectionId,
      name: body.name.trim(),
      price: Number(body.price) || 0,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      badge: body.badge?.trim() || null,
      testsJson: JSON.stringify(tests),
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { section: true },
  });

  return NextResponse.json(mapPackageForClient(item), { status: 201 });
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({ error: "Missing package id." }, { status: 400 });
  }

  const tests = parseTestsInput(body.testsText ?? body.tests);

  const item = await prisma.healthPackage.update({
    where: { id },
    data: {
      sectionId: Number(body.sectionId),
      name: body.name?.trim(),
      price: Number(body.price) || 0,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      badge: body.badge?.trim() || null,
      testsJson: JSON.stringify(tests),
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive ?? true,
    },
    include: { section: true },
  });

  return NextResponse.json(mapPackageForClient(item));
}

export async function DELETE(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Missing package id." }, { status: 400 });
  }

  await prisma.healthPackage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
