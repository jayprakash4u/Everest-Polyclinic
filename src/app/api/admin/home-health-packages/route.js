import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  getHealthPackageSections,
  getHealthPackagesForAdmin,
  saveHealthPackages,
} from "@/lib/data/homeHealthPackages";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const [packages, sections] = await Promise.all([
      getHealthPackagesForAdmin(),
      getHealthPackageSections(),
    ]);
    return NextResponse.json({ packages, sections });
  } catch (error) {
    console.error("[api/admin/home-health-packages]", error);
    return NextResponse.json(
      { error: "Unable to load health packages right now." },
      { status: 500 },
    );
  }
}

/** Tests arrive as `["CBC", { label, items: [...] }]` — keep both shapes. */
function cleanTests(tests) {
  if (!Array.isArray(tests)) return [];

  return tests
    .map((test) => {
      if (typeof test === "string") return test.trim();
      if (test && typeof test === "object") {
        const label = String(test.label ?? "").trim();
        const items = Array.isArray(test.items)
          ? test.items.map((item) => String(item).trim()).filter(Boolean)
          : [];
        if (!label) return null;
        return items.length ? { label, items } : label;
      }
      return null;
    })
    .filter(Boolean);
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.packages) ? body.packages : null;

  if (!incoming) {
    return NextResponse.json(
      { error: "Expected a packages array." },
      { status: 400 },
    );
  }

  const packages = [];

  for (const [index, pkg] of incoming.entries()) {
    const name = String(pkg.name ?? "").trim();
    const price = Number(pkg.price);
    const sectionId = Number(pkg.sectionId);

    if (!name) {
      return NextResponse.json(
        { error: `Package ${index + 1} needs a name.` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: `"${name}" needs a price of zero or more.` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(sectionId) || sectionId <= 0) {
      return NextResponse.json(
        { error: `"${name}" needs a category.` },
        { status: 400 },
      );
    }

    const originalPrice =
      pkg.originalPrice === null || pkg.originalPrice === "" || pkg.originalPrice === undefined
        ? null
        : Number(pkg.originalPrice);

    if (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice < price)) {
      /* The card renders this struck through beside the price and derives the
         "Save X%" pill from the gap, so a lower "was" price would show a
         negative saving. */
      return NextResponse.json(
        { error: `"${name}": the original price must be higher than the price.` },
        { status: 400 },
      );
    }

    packages.push({
      id: Number(pkg.id) || null,
      sectionId,
      name,
      price: Math.round(price),
      originalPrice: originalPrice === null ? null : Math.round(originalPrice),
      badge: String(pkg.badge ?? "").trim(),
      tests: cleanTests(pkg.tests),
      showOnHomepage: Boolean(pkg.showOnHomepage),
      isActive: pkg.isActive !== false,
    });
  }

  try {
    const saved = await saveHealthPackages(packages);
    return NextResponse.json({ packages: saved });
  } catch (error) {
    console.error("[api/admin/home-health-packages]", error);
    return NextResponse.json(
      { error: "Unable to save health packages right now." },
      { status: 500 },
    );
  }
}
