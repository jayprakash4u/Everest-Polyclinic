import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

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

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.headers.set("Cache-Control", "no-store");
    return redirect;
  }

  try {
    await jwtVerify(token, getSecretKey());
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
    redirect.headers.set("Cache-Control", "no-store");
    return redirect;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
