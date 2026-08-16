import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  getDoctorCategories,
  getDoctorsForAdmin,
  saveDoctors,
} from "@/lib/data/adminContent";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const [doctors, categories] = await Promise.all([
      getDoctorsForAdmin(),
      getDoctorCategories(),
    ]);
    return NextResponse.json({ doctors, categories });
  } catch (error) {
    console.error("[api/admin/page-doctors]", error);
    return NextResponse.json(
      { error: "Unable to load doctors right now." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.doctors) ? body.doctors : null;

  if (!incoming) {
    return NextResponse.json({ error: "Expected a doctors array." }, { status: 400 });
  }

  const doctors = [];

  for (const [index, doctor] of incoming.entries()) {
    const name = String(doctor.name ?? "").trim();
    const education = String(doctor.education ?? "").trim();
    const image = String(doctor.image ?? "").trim();
    const categoryId = Number(doctor.categoryId);

    if (!name) {
      return NextResponse.json(
        { error: `Doctor ${index + 1} needs a name.` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return NextResponse.json(
        { error: `"${name}" needs a specialty.` },
        { status: 400 },
      );
    }

    /* Every card on the doctors page and the homepage renders a photo frame —
       without a source it draws an empty grey box. */
    if (!image) {
      return NextResponse.json(
        { error: `"${name}" needs a photo.` },
        { status: 400 },
      );
    }

    doctors.push({
      id: Number(doctor.id) || null,
      categoryId,
      name,
      education: education || "MBBS",
      experience: String(doctor.experience ?? "").trim() || "5+ Years",
      image,
      phone: String(doctor.phone ?? "").trim(),
      timing: String(doctor.timing ?? "").trim(),
      showOnHomepage: Boolean(doctor.showOnHomepage),
      isActive: doctor.isActive !== false,
    });
  }

  try {
    const saved = await saveDoctors(doctors);
    return NextResponse.json({ doctors: saved });
  } catch (error) {
    console.error("[api/admin/page-doctors]", error);
    return NextResponse.json(
      { error: "Unable to save doctors right now." },
      { status: 500 },
    );
  }
}
