import { NextResponse } from "next/server";
import { isDatabaseAvailable, prisma } from "@/lib/db";
import { mysqlConfig } from "@/lib/env";
import { getAdminSession } from "@/lib/auth";

/*
 * Two audiences, two levels of detail.
 *
 * Anonymous callers — uptime monitors, load balancers — get only the liveness
 * bit, because the host, database name and row counts are useful to an attacker
 * and to nobody else. A signed-in admin gets the full diagnostic.
 */
export async function GET() {
  const session = await getAdminSession();
  const available = await isDatabaseAvailable();

  if (!available) {
    return NextResponse.json(
      session
        ? {
            ok: false,
            database: mysqlConfig.database,
            host: `${mysqlConfig.host}:${mysqlConfig.port}`,
            message:
              "Database connection failed. Check MYSQL_* in .env, then run npm run db:push && npm run db:seed",
          }
        : { ok: false },
      { status: 503 },
    );
  }

  if (!session) {
    return NextResponse.json({ ok: true });
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
    counts: { doctors, blogPosts, testimonials, healthPackages: packages },
  });
}
