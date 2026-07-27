"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  HelpCircle,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Package,
  Settings,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/admin/homepage-specialists", label: "Homepage Specialists", icon: Users },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/centers-of-excellence", label: "Centers of Excellence", icon: Award },
  { href: "/admin/why-choose-us", label: "Why Choose Us", icon: Star },
  { href: "/admin/stats", label: "Site Stats", icon: BarChart3 },
  { href: "/admin/health-packages", label: "Health Packages", icon: Package },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/testimonials", label: "Patient Trust", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
];

const PAGE_TITLES = {
  "/admin": "Overview",
  "/admin/inbox": "Inbox",
  "/admin/doctors": "Doctors",
  "/admin/homepage-specialists": "Homepage Specialists",
  "/admin/services": "Services",
  "/admin/centers-of-excellence": "Centers of Excellence",
  "/admin/why-choose-us": "Why Choose Us",
  "/admin/stats": "Site Stats",
  "/admin/health-packages": "Health Packages",
  "/admin/gallery": "Gallery",
  "/admin/blog": "Blog Posts",
  "/admin/testimonials": "Patient Trust",
  "/admin/faqs": "FAQs",
  "/admin/site-settings": "Site Settings",
};

function getPageTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  return "Admin";
}

function AdminSidebarBrand() {
  return (
    <Link href="/admin" className="flex items-center gap-3 px-1">
      <Image
        src="/images/logos/logo.jpg"
        alt="Everest Polyclinic"
        width={44}
        height={44}
        className="shrink-0 rounded-full ring-2 ring-primary-100"
      />
      <div className="min-w-0">
        <p className="truncate font-heading text-sm font-bold leading-tight text-[#1a3a5c]">
          Everest Polyclinic
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary-600">
          Admin Panel
        </p>
      </div>
    </Link>
  );
}

function AdminNav({ pathname, onNavigate }) {
  const linkClass = (active) =>
    cn(
      "relative flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold transition-colors",
      active
        ? "bg-primary-50 text-primary-800 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-secondary-500"
        : "text-slate-600 hover:bg-primary-50/60 hover:text-[#1a3a5c]",
    );

  return (
    <nav className="space-y-0.5 py-2">
      {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={linkClass(active)}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children, adminName = "Admin" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-primary-100 bg-white lg:flex">
          <div className="border-b border-primary-100">
            <div className="h-1 bg-secondary-500" />
            <div className="px-5 py-5">
              <AdminSidebarBrand />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <p className="px-5 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-primary-600/70">
              Menu
            </p>
            <AdminNav pathname={pathname} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="lg:hidden">
                <AdminSidebarBrand />
              </div>
              <div className="hidden lg:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-600">
                  Admin Panel
                </p>
                <p className="text-sm font-semibold text-[#1a3a5c]">{pageTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-[#1a3a5c]">{adminName}</p>
                <p className="text-xs text-slate-500">Staff session</p>
              </div>
              <Link
                href="/"
                target="_blank"
                className="rounded-lg border-2 border-primary-600 px-3 py-2 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-50 sm:px-4 sm:text-sm"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={() => setMobileNavOpen((open) => !open)}
                className="rounded-lg border border-primary-200 px-3 py-2 text-xs font-semibold text-primary-700 lg:hidden"
              >
                Menu
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700 sm:px-4 sm:text-sm"
              >
                Sign out
              </button>
            </div>
          </header>

          {mobileNavOpen ? (
            <div className="border-b border-primary-100 bg-white lg:hidden">
              <p className="px-4 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-primary-600/70">
                Menu
              </p>
              <AdminNav
                pathname={pathname}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          ) : null}

          <main className="flex-1 bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#1a3a5c] sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-primary-100 bg-white p-4 shadow-card sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-[#1a3a5c] focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100";

export const adminLabelClass =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary-600";
