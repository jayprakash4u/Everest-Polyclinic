import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getGalleryForAdmin, saveGallery } from "@/lib/data/adminContent";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const images = await getGalleryForAdmin();
    return NextResponse.json({ images });
  } catch (error) {
    console.error("[api/admin/page-gallery]", error);
    return NextResponse.json(
      { error: "Unable to load the gallery right now." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.images) ? body.images : null;

  if (!incoming) {
    return NextResponse.json({ error: "Expected an images array." }, { status: 400 });
  }

  const images = [];

  for (const [index, image] of incoming.entries()) {
    const src = String(image.src ?? "").trim();
    if (!src) continue; // A row with no file is an empty slot, not an error.

    const caption = String(image.caption ?? "").trim();

    images.push({
      id: Number(image.id) || null,
      src,
      /* Alt text is what a screen reader announces and what shows if the file
         fails to load, so it is never stored empty. */
      alt: String(image.alt ?? "").trim() || caption || `Gallery image ${index + 1}`,
      caption,
      isActive: image.isActive !== false,
    });
  }

  try {
    const saved = await saveGallery(images);
    return NextResponse.json({ images: saved });
  } catch (error) {
    console.error("[api/admin/page-gallery]", error);
    return NextResponse.json(
      { error: "Unable to save the gallery right now." },
      { status: 500 },
    );
  }
}
