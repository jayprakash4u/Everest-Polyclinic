import { NextResponse } from "next/server";
import { isDatabaseAvailable, prisma } from "@/lib/db";
import { sqlServerConfig } from "@/lib/env";

export async function GET() {
  const available = await isDatabaseAvailable();

  if (!available) {
    return NextResponse.json(
      {
        ok: false,
        database: sqlServerConfig.database,
        host: sqlServerConfig.host,
        message:
          "Database connection failed. Copy .env.example to .env and run npm run db:push && npm run db:seed",
      },
      { status: 503 },
    );
  }

  const [doctors, blogPosts, testimonials, packages] = await Promise.all([
    prisma.doctor.count(),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.healthPackage.count(),
  ]);

  return NextResponse.json({
    ok: true,
    database: sqlServerConfig.database,
    host: sqlServerConfig.host,
    counts: {
      doctors,
      blogPosts,
      testimonials,
      healthPackages: packages,
    },
  });
}
