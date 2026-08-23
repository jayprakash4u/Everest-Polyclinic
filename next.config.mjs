const isProduction = process.env.NODE_ENV === "production";

/*
 * Sent on every response.
 *
 * Deliberately no script/style CSP: Next injects inline bootstrap scripts, and
 * a policy strict enough to be worth having would need per-request nonces
 * threaded through the app. `frame-ancestors` is the part that carries its
 * weight on its own — it is the modern replacement for X-Frame-Options and
 * stops the admin panel being framed for clickjacking.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  /* Only meaningful over TLS, and skipping it in dev keeps browsers from
     pinning localhost to https for the next two years. */
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  // mysql2 is a native driver and the Prisma engine is CJS: keep both out of the bundle.
  serverExternalPackages: ["mysql2", "@prisma/client"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
