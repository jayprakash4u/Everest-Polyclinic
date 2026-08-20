import { NextResponse } from "next/server";
import { isDatabaseAvailable, prisma } from "@/lib/db";
import { mysqlConfig } from "@/lib/env";

export async function GET() {
  const available = await isDatabaseAvailable();

  if (!available) {
    return NextResponse.json(
      {
        ok: false,
        database: mysqlConfig.database,
        host: `${mysqlConfig.host}:${mysqlConfig.port}`,
        message:
          "Database connection failed. Check MYSQL_* in .env, then run npm run db:push && npm run db:seed",
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
    database: mysqlConfig.database,
    host: `${mysqlConfig.host}:${mysqlConfig.port}`,
    counts: {
      doctors,
      blogPosts,
      testimonials,
      healthPackages: packages,
    },
  });
}
