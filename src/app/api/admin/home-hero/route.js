import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getHeroSlidesForAdmin, replaceHeroSlides } from "@/lib/data/heroSlides";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const slides = await getHeroSlidesForAdmin();
    return NextResponse.json({ slides });
  } catch (error) {
    console.error("[api/admin/home-hero]", error);
    return NextResponse.json(
      { error: "Unable to load the hero slides right now." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.slides) ? body.slides : null;

  if (!incoming) {
    return NextResponse.json(
      { error: "Expected a slides array." },
      { status: 400 },
    );
  }

  /* A slide with no image would render an empty frame in the carousel, so an
     image is the one hard requirement. Label and alt are filled in below. */
  const cleaned = incoming
    .map((slide) => ({
      src: String(slide.src ?? "").trim(),
      label: String(slide.label ?? "").trim(),
      alt: String(slide.alt ?? "").trim(),
      isActive: slide.isActive !== false,
    }))
    .filter((slide) => slide.src);

  if (cleaned.length === 0) {
    return NextResponse.json(
      { error: "Add at least one slide with an image." },
      { status: 400 },
    );
  }

  if (!cleaned.some((slide) => slide.isActive)) {
    return NextResponse.json(
      { error: "At least one slide must stay visible." },
      { status: 400 },
    );
  }

  /* alt text is what a screen reader announces and what shows if the image
     fails, so it is never left empty — the caption is a reasonable stand-in. */
  const slides = cleaned.map((slide, index) => ({
    ...slide,
    label: slide.label || `Slide ${index + 1}`,
    alt: slide.alt || slide.label || `Hero image ${index + 1}`,
  }));

  try {
    const saved = await replaceHeroSlides(slides);
    return NextResponse.json({ slides: saved });
  } catch (error) {
    console.error("[api/admin/home-hero]", error);
    return NextResponse.json(
      { error: "Unable to save the hero slides right now." },
      { status: 500 },
    );
  }
}
