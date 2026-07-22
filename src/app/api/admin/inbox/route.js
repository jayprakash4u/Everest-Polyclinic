import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  const [contacts, appointments] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.appointmentRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return NextResponse.json({ contacts, appointments });
}
