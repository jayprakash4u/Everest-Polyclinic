import { NextResponse } from "next/server";
import {
  createAdminSession,
  setAdminSessionCookie,
} from "@/lib/auth";
import { getDevAdminSession, isAdminDevBypassEnabled } from "@/lib/auth-constants";

export async function POST() {
  if (!isAdminDevBypassEnabled()) {
    return NextResponse.json({ error: "Dev login is disabled." }, { status: 403 });
  }

  const admin = getDevAdminSession();
  const token = await createAdminSession(admin);
  await setAdminSessionCookie(token);

  return NextResponse.json({
    ok: true,
    admin: { name: admin.name, email: admin.email, role: admin.role },
    devBypass: true,
  });
}
