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
};

export default nextConfig;
