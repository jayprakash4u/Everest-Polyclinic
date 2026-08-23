import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";

/*
 * Returns null when there is no usable signing key.
 *
 * The development fallback is a literal in a public repository, so treating it
 * as valid in production would let anyone mint their own admin session. If the
 * variable is missing in production we fail closed — no key, no admin access —
 * which matches lib/auth.js, where the same omission throws.
 */
function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") return null;
    return new TextEncoder().encode("everest-polyclinic-dev-secret-change-me");
  }

  return new TextEncoder().encode(secret);
}

function denyToLogin(request) {
  const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
  redirect.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  redirect.headers.set("Cache-Control", "no-store");
  return redirect;
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

  const secretKey = getSecretKey();

  if (!secretKey) {
    console.error(
      "[middleware] ADMIN_SESSION_SECRET is not set; refusing all admin access.",
    );
    return denyToLogin(request);
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.headers.set("Cache-Control", "no-store");
    return redirect;
  }

  try {
    await jwtVerify(token, secretKey);
    const verified = NextResponse.next();
    verified.headers.set("x-pathname", pathname);
    verified.headers.set("Cache-Control", "no-store");
    return verified;
  } catch {
    return denyToLogin(request);
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
