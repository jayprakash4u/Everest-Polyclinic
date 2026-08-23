"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import {
  BookOpen,
  CalendarCheck,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Home,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  Settings,
  Star,
  Stethoscope,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Two ways in, deliberately.
 *
 * "Pages" is organised the way an admin thinks about the site — open the page
 * you want to change and every slot on it is in front of you. "Content" stays
 * organised by record, because a doctor or a testimonial is one thing that
 * surfaces on several pages and belongs to no single one of them.
 */
const NAV_GROUPS = [
  {
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/admin/inbox", label: "Inbox", icon: Inbox },
      {
        href: "/admin/appointments",
        label: "Appointments",
        icon: CalendarCheck,
      },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        href: "/admin/pages/home",
        label: "Home Page",
        icon: Home,
        /* One entry per editable section of the page, in the order a visitor
           meets them, so the nav mirrors the page it edits. */
        children: [
          { href: "/admin/pages/home/hero", label: "Hero Slider" },
          { href: "/admin/pages/home/care-team", label: "Meet Our Care Team" },
          { href: "/admin/pages/home/patient-voices", label: "Patient Voices" },
        ],
      },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
      {
        href: "/admin/homepage-specialists",
        label: "Homepage Specialists",
        icon: Users,
      },
      {
        href: "/admin/centers-of-excellence",
        label: "Centres of Excellence",
        icon: Award,
      },
      { href: "/admin/why-choose-us", label: "Why Choose Us", icon: Star },
      { href: "/admin/stats", label: "Site Stats", icon: BarChart3 },
      {
        href: "/admin/health-packages",
        label: "Health Packages",
        icon: Package,
      },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
      {
        href: "/admin/testimonials",
        label: "Patient Trust",
        icon: MessageSquareQuote,
      },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
    ],
  },
];

const PAGE_TITLES = Object.fromEntries(
  NAV_GROUPS.flatMap((group) =>
    group.items.flatMap((item) => [
      [item.href, item.label],
      ...(item.children ?? []).map((child) => [child.href, child.label]),
    ]),
  ),
);

function getPageTitle(pathname) {
  return PAGE_TITLES[pathname] ?? "Admin";
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AdminSidebarBrand({ compact }) {
  return (
    <Link
      href="/admin"
      className="group flex items-center gap-3 rounded-xl px-1 py-1 transition-opacity hover:opacity-90"
    >
      <Image
        src="/images/logos/logo.jpg"
        alt="Everest Polyclinic"
        width={compact ? 34 : 40}
        height={compact ? 34 : 40}
        className="shrink-0 rounded-xl ring-1 ring-slate-200"
      />
      <div className="min-w-0">
        <p className="truncate font-heading text-[15px] font-bold leading-tight text-primary-900">
          Everest Polyclinic
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-600">
          Admin Panel
        </p>
      </div>
    </Link>
  );
}

const navRowClass = (active) =>
  cn(
    "group relative flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
    active
      ? "bg-primary-600 text-white shadow-sm shadow-primary-600/25"
      : "text-slate-600 hover:bg-slate-100 hover:text-primary-900",
  );

/**
 * A nav entry, optionally with its own sub-sections.
 *
 * The parent stays a link — "Home Page" is a real overview screen, not just a
 * folder — so the chevron is a separate control beside it rather than swallowing
 * the whole row. Opening is remembered in state but forced open whenever the
 * current route is inside the group, so navigating to a child never leaves the
 * item that matches the page collapsed.
 */
function NavItem({ item, pathname, onNavigate }) {
  const { href, label, icon: Icon, exact, children } = item;
  const active = exact ? pathname === href : pathname.startsWith(href);
  const [open, setOpen] = useState(active);

  /* Adjusted during render rather than in an effect: this is derived state
     reacting to a prop change, so an effect would render the collapsed group
     once and then immediately re-render it open. */
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (active) setOpen(true);
  }

  if (!children?.length) {
    return (
      <li>
        <Link
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={navRowClass(active)}
        >
          <Icon
            size={17}
            strokeWidth={active ? 2.2 : 1.9}
            className={cn(
              "shrink-0 transition-colors",
              active
                ? "text-white"
                : "text-slate-400 group-hover:text-primary-600",
            )}
          />
          <span className="truncate">{label}</span>
        </Link>
      </li>
    );
  }

  /* The parent highlights only on its own screen; a child route highlights the
     child instead, so two rows are never lit at once. */
  const onOverview = pathname === href;

  return (
    <li>
      <div className="flex items-center gap-1">
        <Link
          href={href}
          onClick={onNavigate}
          aria-current={onOverview ? "page" : undefined}
          className={navRowClass(onOverview)}
        >
          <Icon
            size={17}
            strokeWidth={onOverview ? 2.2 : 1.9}
            className={cn(
              "shrink-0 transition-colors",
              onOverview
                ? "text-white"
                : "text-slate-400 group-hover:text-primary-600",
            )}
          />
          <span className="truncate">{label}</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${label} sections`}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary-600"
        >
          <ChevronDown
            size={15}
            className={cn(
              "transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {open ? (
        /* Indented under a hairline so the sub-sections read as belonging to
           the page above them rather than as more top-level destinations. */
        <ul className="ml-[22px] mt-1 space-y-0.5 border-l border-slate-200 pl-3">
          {children.map((child) => {
            const childActive = pathname === child.href;

            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  aria-current={childActive ? "page" : undefined}
                  className={cn(
                    "block truncate rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                    childActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-500 hover:bg-slate-100 hover:text-primary-900",
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}

function AdminNav({ pathname, onNavigate }) {
  return (
    <nav className="px-3 pb-4">
      {NAV_GROUPS.map((group, index) => (
        <div
          key={group.label ?? "primary"}
          className={index > 0 ? "mt-6" : "mt-2"}
        >
          {group.label ? (
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {group.label}
            </p>
          ) : null}

          <ul className="space-y-1">
            {group.items.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
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
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* ── Sidebar ── */}
        <aside className="hidden w-[264px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="px-5 py-5">
            <AdminSidebarBrand />
          </div>

          <div className="flex-1 overflow-y-auto">
            <AdminNav pathname={pathname} />
          </div>

          {/* The signed-in identity sits at the foot of the rail, where an admin
              expects it, rather than competing with the page title up top. */}
          <div className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                {initialsOf(adminName)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary-900">
                  {adminName}
                </p>
                <p className="truncate text-xs text-slate-400">Staff session</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                title="Sign out"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-alert-50 hover:text-alert-600"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* ── Top bar ──
              Sticky, so the page title and the "View site" escape hatch stay
              reachable down a long CRUD list. */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNavOpen((open) => !open)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <div className="min-w-0 lg:hidden">
                <AdminSidebarBrand compact />
              </div>

              <div className="hidden min-w-0 lg:block">
                <h1 className="truncate font-heading text-lg font-bold text-primary-900">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 sm:text-sm"
              >
                View site
                <ExternalLink size={13} />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-700 sm:text-sm lg:hidden"
              >
                Sign out
              </button>
            </div>
          </header>

          {/* ── Mobile drawer ── */}
          {mobileNavOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={() => setMobileNavOpen(false)}
              />
              <div className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <AdminSidebarBrand />
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <AdminNav
                    pathname={pathname}
                    onNavigate={() => setMobileNavOpen(false)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="font-heading text-2xl font-bold tracking-[-0.01em] text-primary-900 sm:text-[28px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminCard({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-primary-900 shadow-sm transition-colors placeholder:text-slate-300 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100";

export const adminLabelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500";
