import { NextResponse } from "next/server";
import {
  createAdminSession,
  setAdminSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { findAdminByEmail, isSqlConnectionError } from "@/lib/sql";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const admin = await findAdminByEmail(email.trim().toLowerCase());

    if (!admin || admin.isActive === false || admin.isActive === 0 || admin.isActive === "0" || !verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createAdminSession(admin);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      ok: true,
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("[admin/login]", error);

    if (isSqlConnectionError(error)) {
      return NextResponse.json(
        {
          error:
            "Cannot connect to SQL Server (SQLEXPRESS). Restart the 'SQL Server (SQLEXPRESS)' service in services.msc, then try again.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}
