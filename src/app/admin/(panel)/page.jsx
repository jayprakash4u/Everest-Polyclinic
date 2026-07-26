import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { getAdminDashboardStats } from "@/lib/data/adminDashboard";

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-NP", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function CatalogCard({ title, count, href, accent }) {
  return (
    <div className="overflow-hidden rounded-xl border border-primary-100 bg-white shadow-card">
      <div className={`h-1 ${accent}`} />
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
          {title}
        </p>
        <p className="mt-2 font-heading text-4xl font-bold text-[#1a3a5c]">
          {count}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex text-sm font-semibold text-secondary-600 hover:text-secondary-700"
        >
          Manage →
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-secondary-100 text-secondary-800",
    unread: "bg-alert-100 text-alert-700",
    read: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const stats = await getAdminDashboardStats();
  const needsAttention =
    stats.pendingAppointments + stats.unreadContacts;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#1a3a5c] sm:text-4xl">
            Overview
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Start with what needs a phone call, then keep the catalog current.
            {stats.dbOnline
              ? ""
              : " Database is offline — counts may show zero until SQL Server is running."}
          </p>
        </div>
        <Link
          href="/admin/inbox"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-200 transition-colors hover:bg-primary-700"
        >
          Open inbox
        </Link>
      </div>

      <section className="overflow-hidden rounded-xl border border-primary-100 bg-white shadow-card">
        <div className="h-1 bg-gradient-to-r from-secondary-500 to-primary-600" />
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-600">
              Needs attention
            </p>
            <p className="mt-2 font-heading text-5xl font-bold text-[#1a3a5c]">
              {needsAttention}
            </p>
            <p className="mt-1 text-lg font-semibold text-[#1a3a5c]">
              Pending appointments & unread messages
            </p>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              {stats.pendingAppointments} appointment
              {stats.pendingAppointments === 1 ? "" : "s"} waiting for
              confirmation and {stats.unreadContacts} unread contact
              {stats.unreadContacts === 1 ? "" : "s"}. Call the patient, then
              update status in the inbox.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:min-w-[280px]">
            <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">
                Confirmed
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-[#1a3a5c]">
                {stats.confirmedAppointments}
              </p>
            </div>
            <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">
                All requests
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-[#1a3a5c]">
                {stats.totalAppointments}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CatalogCard
          title="Doctors"
          count={stats.doctors}
          href="/admin/doctors"
          accent="bg-primary-600"
        />
        <CatalogCard
          title="Health packages"
          count={stats.healthPackages}
          href="/admin/health-packages"
          accent="bg-secondary-500"
        />
        <CatalogCard
          title="Homepage specialists"
          count={stats.homepageSpecialists}
          href="/admin/homepage-specialists"
          accent="bg-secondary-600"
        />
        <CatalogCard
          title="Patient trust"
          count={stats.testimonials}
          href="/admin/testimonials"
          accent="bg-primary-500"
        />
        <CatalogCard
          title="Gallery images"
          count={stats.galleryImages}
          href="/admin/gallery"
          accent="bg-secondary-500"
        />
        <CatalogCard
          title="Blog posts"
          count={stats.blogPosts}
          href="/admin/blog"
          accent="bg-primary-700"
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-primary-100 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-primary-50 px-6 py-4">
          <h2 className="font-heading text-xl font-bold text-[#1a3a5c]">
            Latest inbox
          </h2>
          <Link
            href="/admin/inbox"
            className="text-sm font-semibold text-secondary-600 hover:text-secondary-700"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {stats.latestItems.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No messages yet.
            </p>
          ) : (
            stats.latestItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[#1a3a5c]">{item.name}</p>
                    <StatusBadge status={item.status} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
                <p className="shrink-0 text-xs text-slate-400">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {!stats.dbOnline ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          Database offline. Restart SQL Server (SQLEXPRESS) and refresh to see
          live counts. Signed in as {session?.name ?? "Admin"}.
        </div>
      ) : null}
    </div>
  );
}
