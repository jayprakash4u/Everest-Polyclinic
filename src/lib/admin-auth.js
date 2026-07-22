import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { isAdminDevBypassEnabled } from "@/lib/auth-constants";

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (isAdminDevBypassEnabled() && session.adminId === 0) {
    return {
      session,
      response: null,
      devBypass: true,
    };
  }

  return { session, response: null };
}
