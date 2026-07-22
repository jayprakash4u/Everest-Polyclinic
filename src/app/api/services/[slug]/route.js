import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/data/services";

export async function GET(_request, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Invalid service slug." }, { status: 400 });
  }

  const service = await getServiceBySlug(slug);

  if (!service) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 });
  }

  return NextResponse.json(service);
}
