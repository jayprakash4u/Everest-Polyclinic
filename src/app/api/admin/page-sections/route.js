import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { CACHE_TAGS, revalidatePublic } from "@/lib/cache";
import { querySql, withTransaction } from "@/lib/sql";

/* Raw SQL rather than Prisma, matching the public reader in
   lib/data/pageSections.js — see the note there. */

const TABLE = "PageSectionImage";

/** Every section an admin is allowed to write, and how many images it holds. */
const SECTION_LIMITS = {
  home: {
    hero: 12,
    "care-team": 1,
  },
};

function limitFor(page, section) {
  return SECTION_LIMITS[page]?.[section];
}

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function GET(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const page = clean(new URL(request.url).searchParams.get("page"), 60);

  if (!SECTION_LIMITS[page]) {
    return NextResponse.json({ error: "Unknown page." }, { status: 400 });
  }

  const rows = await querySql(
    `SELECT id, section, image, label, alt, sortOrder
     FROM ${TABLE}
     WHERE page = ? AND isActive = 1
     ORDER BY section ASC, sortOrder ASC, id ASC`,
    [page],
  );

  /* Grouped by section so the editor can hand each section its own list, and
     so a section with nothing stored comes back as [] rather than missing. */
  const sections = Object.fromEntries(
    Object.keys(SECTION_LIMITS[page]).map((section) => [section, []]),
  );

  for (const row of rows) {
    if (!sections[row.section]) continue;
    sections[row.section].push({
      id: Number(row.id),
      image: row.image,
      label: row.label ?? "",
      alt: row.alt ?? "",
    });
  }

  return NextResponse.json({ page, sections });
}

/**
 * Replaces one section's images wholesale. The editor sends the section as the
 * admin arranged it — order included — so a single replace covers add, edit,
 * remove and reorder without the client tracking row ids.
 */
export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const page = clean(body.page, 60);
  const section = clean(body.section, 60);
  const limit = limitFor(page, section);

  if (!limit) {
    return NextResponse.json({ error: "Unknown page or section." }, { status: 400 });
  }

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Expected an items array." }, { status: 400 });
  }

  const items = body.items
    .map((item) => ({
      image: clean(item?.image, 500),
      label: clean(item?.label, 150),
      alt: clean(item?.alt, 300),
    }))
    .filter((item) => item.image);

  if (items.length > limit) {
    return NextResponse.json(
      { error: `This section holds at most ${limit} image(s).` },
      { status: 400 },
    );
  }

  /* Delete-then-insert, both on one connection inside a transaction. Run as two
     independent statements a failed insert would leave the section empty and
     blank that part of the homepage until someone noticed. */
  try {
    await withTransaction(async (connection) => {
      await connection.execute(
        `DELETE FROM ${TABLE} WHERE page = ? AND section = ?`,
        [page, section],
      );

      if (!items.length) return;

      const values = items
        .map(() => "(?, ?, ?, ?, ?, ?, 1, UTC_TIMESTAMP(3))")
        .join(", ");
      const params = items.flatMap((item, index) => [
        page,
        section,
        item.image,
        item.label || null,
        item.alt || null,
        index,
      ]);

      await connection.execute(
        `INSERT INTO ${TABLE}
           (page, section, image, label, alt, sortOrder, isActive, updatedAt)
         VALUES ${values}`,
        params,
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to save section." },
      { status: 500 },
    );
  }

  // The database changed, so the public site must stop serving its cached copy.
  revalidatePublic(CACHE_TAGS.pageSections);

  return NextResponse.json({ ok: true, count: items.length });
}
