import { NextResponse } from "next/server";
import {
  createAdminSession,
  setAdminSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { findAdminByUsername } from "@/lib/admin-users";

function getEnvAdminLogin(username, password) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const expectedUsername = (process.env.ADMIN_USERNAME ?? "admin").toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "Admin123";
  const normalizedUsername = String(username ?? "").trim().toLowerCase();

  if (!normalizedUsername || normalizedUsername !== expectedUsername) {
    return null;
  }

  if (password !== expectedPassword) {
    return null;
  }

  return {
    id: 0,
    name: "Site Administrator",
    username: expectedUsername,
    email: process.env.ADMIN_EMAIL ?? "admin@everestpolyclinic.com",
    role: "super_admin",
  };
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username?.trim() || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 },
      );
    }

    let admin = null;

    try {
      admin = await findAdminByUsername(username);
    } catch (error) {
      console.warn("[admin/login] Database lookup failed:", error.message);
    }

    if (admin?.isActive && verifyPassword(password, admin.passwordHash)) {
      const token = await createAdminSession(admin);
      await setAdminSessionCookie(token);

      return NextResponse.json({
        ok: true,
        admin: {
          name: admin.name,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    const envAdmin = getEnvAdminLogin(username, password);
    if (envAdmin) {
      const token = await createAdminSession(envAdmin);
      await setAdminSessionCookie(token);

      return NextResponse.json({
        ok: true,
        admin: {
          name: envAdmin.name,
          username: envAdmin.username,
          email: envAdmin.email,
          role: envAdmin.role,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 },
    );
  } catch (error) {
    console.error("[admin/login]", error);

    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}
