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
  serverExternalPackages: [
    "odbc",
    "msnodesqlv8",
    "mssql",
    "@prisma/adapter-mssql",
    "@prisma/client",
  ],
};

export default nextConfig;
