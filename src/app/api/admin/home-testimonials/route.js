import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  getTestimonialsForAdmin,
  saveTestimonials,
} from "@/lib/data/homeTestimonials";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const testimonials = await getTestimonialsForAdmin();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("[api/admin/home-testimonials]", error);
    return NextResponse.json(
      { error: "Unable to load patient voices right now." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.testimonials) ? body.testimonials : null;

  if (!incoming) {
    return NextResponse.json(
      { error: "Expected a testimonials array." },
      { status: 400 },
    );
  }

  const testimonials = [];

  for (const [index, item] of incoming.entries()) {
    const name = String(item.name ?? "").trim();
    const location = String(item.location ?? "").trim();
    const review = String(item.review ?? "").trim();
    const rating = Number(item.rating);

    if (!name) {
      return NextResponse.json(
        { error: `Review ${index + 1} needs a patient name.` },
        { status: 400 },
      );
    }

    if (!review) {
      return NextResponse.json(
        { error: `"${name}" needs review text.` },
        { status: 400 },
      );
    }

    /* The card renders this as a row of filled stars, so anything outside 1–5
       would either draw nothing or overflow the row. */
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: `"${name}" needs a rating between 1 and 5.` },
        { status: 400 },
      );
    }

    testimonials.push({
      id: Number(item.id) || null,
      name,
      location,
      rating,
      review,
      avatar: String(item.avatar ?? "").trim(),
      isActive: item.isActive !== false,
    });
  }

  try {
    const saved = await saveTestimonials(testimonials);
    return NextResponse.json({ testimonials: saved });
  } catch (error) {
    console.error("[api/admin/home-testimonials]", error);
    return NextResponse.json(
      { error: "Unable to save patient voices right now." },
      { status: 500 },
    );
  }
}
