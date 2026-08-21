import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  return NextResponse.json(settings);
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();

  const settings = await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      name: body.name,
      shortName: body.shortName,
      tagline: body.tagline,
      description: body.description,
      phone: body.phone,
      email: body.email,
      address: body.address,
      workingHours: body.workingHours,
      emergencyHotline: body.emergencyHotline,
    },
    create: {
      id: 1,
      name: body.name,
      shortName: body.shortName,
      tagline: body.tagline,
      description: body.description,
      phone: body.phone,
      email: body.email,
      address: body.address,
      workingHours: body.workingHours,
      emergencyHotline: body.emergencyHotline,
    },
  });

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.siteSettings);

  return NextResponse.json(settings);
}
