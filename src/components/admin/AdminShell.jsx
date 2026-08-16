"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import {
  BookOpen,
  CalendarCheck,
  ChevronDown,
  Home,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  Menu,
  Stethoscope,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants";

/**
 * Grouped page-first, so the menu mirrors the website rather than the database.
 *
 * Deliberately small: the day-to-day dashboard, and the pages themselves edited
 * section by section. The old per-entity screens (doctors, gallery, blog,
 * testimonials and so on) were removed — content is reached through the page it
 * appears on instead. Their API routes are untouched, so any of them can be
 * brought back under the page that owns them.
 */
const NAV_GROUPS = [
  {
    label: "Dashboard",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/admin/inbox", label: "Inbox", icon: Inbox },
      { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        href: "/admin/pages/home",
        label: "Home page",
        icon: Home,
        /* Sections of the page, in the order a visitor meets them. Each one
           gets its own route as it becomes editable. */
        children: [
          { href: "/admin/pages/home/hero", label: "Hero section" },
          { href: "/admin/pages/home/health-packages", label: "Health packages" },
          { href: "/admin/pages/home/care-team", label: "Meet your care team" },
          { href: "/admin/pages/home/testimonials", label: "Patient voices" },
        ],
      },
      { href: "/admin/pages/doctors", label: "Doctors page", icon: Stethoscope },
      { href: "/admin/pages/gallery", label: "Gallery page", icon: ImageIcon },
      { href: "/admin/pages/blog", label: "Blog page", icon: BookOpen },
    ],
  },
];

const NAV_ITEMS = NAV_GROUPS.flatMap((group) =>
  group.items.flatMap((item) => [item, ...(item.children ?? [])]),
);

function getPageTitle(pathname) {
  /* Longest match wins, so /admin/pages/home resolves to the page entry rather
     than to the /admin overview it also starts with. */
  const match = NAV_ITEMS.filter((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href),
  ).sort((a, b) => b.href.length - a.href.length)[0];

  return match?.label ?? "Admin";
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

const navLinkClass = (active) =>
  cn(
    "relative flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold transition-colors",
    active
      ? "bg-primary-50 text-primary-800 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-secondary-500"
      : "text-slate-600 hover:bg-primary-50/60 hover:text-[#1a3a5c]",
  );

/**
 * A parent entry with its sections nested underneath. The row is still a link
 * to the page overview; the chevron is a separate control so the group can be
 * opened without navigating, and closed again while you are inside it.
 */
function AdminNavParent({ item, pathname, onNavigate }) {
  const { href, label, icon: Icon, children } = item;
  const isWithin = pathname.startsWith(href);

  const [open, setOpen] = useState(isWithin);
  const [lastWithin, setLastWithin] = useState(isWithin);

  /* Navigating into the group opens it — handled during render rather than in
     an effect, which would cost an extra pass and trip the cascading-render rule. */
  if (lastWithin !== isWithin) {
    setLastWithin(isWithin);
    if (isWithin) setOpen(true);
  }

  const panelId = `adminnav-${href.replace(/\W+/g, "-")}`;

  return (
    <div>
      <div className={cn("relative flex items-center", navLinkClass(pathname === href))}>
        <Link
          href={href}
          onClick={onNavigate}
          className="flex min-w-0 flex-1 items-center gap-2.5"
        >
          <Icon size={16} />
          {label}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Collapse" : "Expand"} ${label} sections`}
          className="-mr-1 rounded p-1 text-slate-400 transition-colors hover:bg-primary-100/60 hover:text-primary-700"
        >
          <ChevronDown
            size={15}
            className={cn("transition-transform duration-200", open ? "rotate-0" : "-rotate-90")}
          />
        </button>
      </div>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5 py-0.5">
            {children.map((child) => {
              const active = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "relative flex items-center gap-2 py-2 pl-11 pr-4 text-sm transition-colors",
                    active
                      ? "bg-primary-50 font-semibold text-primary-800 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-secondary-500"
                      : "font-medium text-slate-500 hover:bg-primary-50/60 hover:text-[#1a3a5c]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      active ? "bg-secondary-500" : "bg-slate-300",
                    )}
                  />
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminNav({ pathname, onNavigate }) {
  return (
    <nav className="pb-4">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="pt-3 first:pt-0">
          <p className="px-5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-600/70">
            {group.label}
          </p>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              if (item.children?.length) {
                return (
                  <AdminNavParent
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                );
              }

              const { href, label, icon: Icon, exact } = item;
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className={navLinkClass(active)}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function AdminShell({ children, adminName = "Admin" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

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

          {/* The group headings inside AdminNav replace the old single "Menu"
              label — two levels of heading in a row read as a mistake. */}
          <div className="flex-1 overflow-y-auto pt-4">
            <AdminNav pathname={pathname} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="lg:hidden">
                <Link href="/admin" className="flex items-center gap-2">
                  <Image
                    src="/images/logos/logo.jpg"
                    alt={SITE.shortName}
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-full ring-2 ring-primary-100"
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="truncate font-heading text-sm font-bold text-slate-800">
                      Everest Polyclinic
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary-600">
                      Admin
                    </p>
                  </div>
                </Link>
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
                className="rounded-lg border border-primary-200 p-2 text-primary-700 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
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
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                onClick={() => setMobileNavOpen(false)}
              />
              <div className="absolute left-0 top-0 h-full w-[280px] -translate-x-0 bg-white shadow-2xl transition-transform duration-300 ease-out">
                <div className="border-b border-primary-100">
                  <div className="h-1 bg-secondary-500" />
                  <div className="flex items-center justify-between px-5 py-4">
                    <AdminSidebarBrand />
                    <button
                      type="button"
                      onClick={() => setMobileNavOpen(false)}
                      className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Close menu"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-3">
                  <AdminNav
                    pathname={pathname}
                    onNavigate={() => setMobileNavOpen(false)}
                  />
                </div>
              </div>
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
