import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  ADMIN_SESSION_COOKIE,
  isAdminDevBypassEnabled,
} from "@/lib/auth-constants";

function getSecretKey() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    "everest-polyclinic-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (!isAdminRoute || isLoginRoute) {
    return response;
  }

  if (isAdminDevBypassEnabled()) {
    return response;
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, getSecretKey());
    return response;
  } catch {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.cookies.delete(ADMIN_SESSION_COOKIE);
    return redirect;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/health).*)"],
};
