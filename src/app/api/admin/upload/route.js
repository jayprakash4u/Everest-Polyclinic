import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_TYPE = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Please upload a JPG, PNG, WebP, or GIF image." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller." },
      { status: 400 },
    );
  }

  const originalExt = path.extname(file.name || "").toLowerCase();
  const ext =
    originalExt && [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(originalExt)
      ? originalExt === ".jpeg"
        ? ".jpg"
        : originalExt
      : EXT_BY_TYPE[file.type] || ".jpg";

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "admin");
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/admin/${fileName}` });
}
