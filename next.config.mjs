/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "images.unsplash.com", "i.pravatar.cc"],
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
