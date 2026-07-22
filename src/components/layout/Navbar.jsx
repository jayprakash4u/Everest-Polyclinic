"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants";
import Button from "@/components/ui/Button";
import ServicesOptionsMenu from "@/components/layout/ServicesOptionsMenu";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.1a8.38 8.38 0 0 1 3.8.9L21 3z" />
      </svg>
    ),
  },
];

function closeMobileMenu(setIsOpen, setMobileServicesOpen) {
  setIsOpen(false);
  setMobileServicesOpen(false);
}

const SERVICES_MENU_WIDTH = 860;

function getServicesDropdownPosition(triggerEl) {
  if (!triggerEl || typeof window === "undefined") {
    return { top: 0, left: 0 };
  }

  const rect = triggerEl.getBoundingClientRect();
  const menuWidth = Math.min(window.innerWidth * 0.94, SERVICES_MENU_WIDTH);
  const viewportPadding = 16;
  let left = rect.left + rect.width / 2 - menuWidth / 2;

  if (left < viewportPadding) {
    left = viewportPadding;
  }

  if (left + menuWidth > window.innerWidth - viewportPadding) {
    left = window.innerWidth - menuWidth - viewportPadding;
  }

  return {
    top: rect.bottom,
    left,
  };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownPos, setServicesDropdownPos] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const servicesTriggerRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const servicesCloseTimerRef = useRef(null);
  const pathname = usePathname();

  const updateServicesDropdownPosition = useCallback(() => {
    setServicesDropdownPos(getServicesDropdownPosition(servicesTriggerRef.current));
  }, []);

  const openServicesMenu = useCallback(() => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }

    updateServicesDropdownPosition();
    setServicesOpen(true);
  }, [updateServicesDropdownPosition]);

  const scheduleCloseServicesMenu = useCallback(() => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
    }

    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, 120);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    closeMobileMenu(setIsOpen, setMobileServicesOpen);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return undefined;

    updateServicesDropdownPosition();

    const handleResize = () => updateServicesDropdownPosition();
    const handleWheel = (event) => {
      if (servicesDropdownRef.current?.contains(event.target)) return;
      setServicesOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [servicesOpen, updateServicesDropdownPosition]);

  useEffect(
    () => () => {
      if (servicesCloseTimerRef.current) {
        clearTimeout(servicesCloseTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileMenu(setIsOpen, setMobileServicesOpen);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleCloseMobile = () => closeMobileMenu(setIsOpen, setMobileServicesOpen);

  return (
    <div className="sticky top-0 z-50 w-full bg-transparent">
      <div className="relative w-full">
        {/* LOGO SECTION — desktop only */}
        <div
          className="absolute left-0 top-0 z-30 hidden h-[130px] w-[25%] items-center justify-center bg-white shadow-xl lg:flex"
          style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0% 100%)" }}
        >
          <Link href="/" className="flex flex-col items-center pr-12">
            <Image
              src="/images/logos/logo.jpg"
              alt="Everest Polyclinic"
              width={75}
              height={75}
              className="rounded-full"
            />
            <div className="mt-2 text-center">
              <p className="font-heading text-lg font-bold leading-tight text-slate-800">
                Everest International
              </p>
              <p className="text-sm font-medium text-primary-600">Polyclinic</p>
            </div>
          </Link>
        </div>

        {/* Mobile emergency strip */}
        <div className="relative z-10 bg-primary-700 px-4 py-2 lg:hidden">
          <a
            href={`tel:${SITE.emergencyHotline.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-white"
          >
            <Phone size={14} strokeWidth={2.5} />
            <span>24/7 Emergency: {SITE.emergencyHotline}</span>
          </a>
        </div>

        {/* TOP CONTACT BAR — desktop only */}
        <div
          className="relative z-10 ml-auto hidden w-full bg-primary-600 py-2.5 text-[13px] text-white lg:block lg:w-[80%]"
          style={{ clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="container mx-auto flex items-center justify-between px-4 lg:pl-28">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-secondary-200"
              >
                <Phone size={14} strokeWidth={2.5} />
                <span className="font-semibold tracking-wide">{SITE.phone}</span>
              </a>

              <div className="flex max-w-[250px] items-center gap-2 border-l border-white/20 pl-6 text-white/90">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="truncate">{SITE.address}</span>
              </div>

              <div className="flex items-center gap-2 border-l border-white/20 pl-6 text-white/90">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>24 Hours Service</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pr-6">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-secondary-300"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <header className="relative z-20 overflow-visible bg-white shadow-md">
          <nav className="ml-auto w-full overflow-visible px-4 py-3 sm:py-4 lg:w-[78%] lg:py-5 lg:pl-16">
            <div className="flex items-center justify-between gap-3">
              {/* Mobile logo */}
              <Link
                href="/"
                className="flex min-w-0 items-center gap-2.5 lg:hidden"
                onClick={handleCloseMobile}
              >
                <Image
                  src="/images/logos/logo.jpg"
                  alt={SITE.shortName}
                  width={44}
                  height={44}
                  className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary-100 sm:h-11 sm:w-11"
                />
                <div className="min-w-0 leading-tight">
                  <p className="truncate font-heading text-sm font-bold text-slate-800 sm:text-[15px]">
                    Everest International
                  </p>
                  <p className="text-[11px] font-medium text-primary-600 sm:text-xs">
                    Polyclinic
                  </p>
                </div>
              </Link>

              {/* Desktop navigation */}
              <div className="hidden flex-1 items-center justify-center overflow-visible lg:flex">
                <div className="overflow-visible rounded-xl bg-primary-600 px-6 py-2 shadow-lg">
                  <ul className="flex items-center overflow-visible">
                    {NAV_LINKS.map((link, index) => (
                      <li key={link.href} className="relative flex items-center overflow-visible">
                        {link.href === "/services" ? (
                          <div
                            ref={servicesTriggerRef}
                            className="relative"
                            onMouseEnter={openServicesMenu}
                            onMouseLeave={scheduleCloseServicesMenu}
                          >
                            <button
                              type="button"
                              className={cn(
                                "relative flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-tight text-white transition-colors hover:text-secondary-200",
                                servicesOpen &&
                                  "text-secondary-200 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-secondary-400",
                              )}
                            >
                              {link.label}
                              <ChevronDown size={12} />
                            </button>
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className={cn(
                              "px-4 py-2 text-xs font-semibold uppercase tracking-tight text-white transition-colors hover:text-secondary-200",
                              pathname === link.href && "text-secondary-300",
                            )}
                          >
                            {link.label}
                          </Link>
                        )}
                        {index < NAV_LINKS.length - 1 && (
                          <span className="mx-0.5 text-white/20">|</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4 lg:pr-2">
                <button
                  type="button"
                  className="hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600 sm:block"
                  aria-label="Search"
                >
                  <Search size={20} strokeWidth={2} />
                </button>

                <Button
                  href="/contact"
                  size="sm"
                  variant="secondary"
                  className="hidden px-4 text-[11px] font-bold uppercase tracking-wider shadow-md sm:inline-flex sm:px-5 sm:text-xs"
                >
                  Book Appointment
                </Button>

                <Button
                  href="/contact"
                  size="xs"
                  variant="secondary"
                  className="px-3 text-[10px] font-bold uppercase tracking-wide shadow-sm sm:hidden"
                >
                  Book
                </Button>

                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 lg:hidden"
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                >
                  <Menu size={22} strokeWidth={2} />
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={handleCloseMobile}
          className={cn(
            "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <aside
          className={cn(
            "absolute right-0 top-0 flex h-[100dvh] w-[80vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
            <Link
              href="/"
              onClick={handleCloseMobile}
              className="flex min-w-0 items-center gap-2.5"
            >
              <Image
                src="/images/logos/logo.jpg"
                alt={SITE.shortName}
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 rounded-full"
              />
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-slate-800">
                  {SITE.shortName}
                </p>
                <p className="text-[10px] font-medium text-primary-600">
                  Menu
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={handleCloseMobile}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          {/* Scrollable nav */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                if (link.href === "/services") {
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                          isActive || mobileServicesOpen
                            ? "bg-primary-50 text-primary-700"
                            : "text-slate-700 hover:bg-slate-50",
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          size={18}
                          className={cn(
                            "shrink-0 transition-transform duration-200",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-200 ease-out",
                          mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-2 pt-1 pl-1">
                            <ServicesOptionsMenu
                              variant="mobile"
                              onNavigate={handleCloseMobile}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleCloseMobile}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-700 hover:bg-slate-50",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Drawer footer CTAs */}
          <div className="border-t border-slate-100 bg-slate-50/80 p-4">
            <Button
              href="/contact"
              variant="secondary"
              size="md"
              fullWidth
              className="rounded-xl font-bold uppercase tracking-wide"
              onClick={handleCloseMobile}
            >
              Book Appointment
            </Button>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary-200 hover:text-primary-700"
            >
              <Phone size={16} />
              {SITE.phone}
            </a>
          </div>
        </aside>
      </div>

      {isMounted &&
        servicesOpen &&
        createPortal(
          <div
            ref={servicesDropdownRef}
            className="fixed z-[100] hidden pt-1.5 lg:block"
            style={{
              top: servicesDropdownPos.top,
              left: servicesDropdownPos.left,
            }}
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
          >
            <ServicesOptionsMenu onNavigate={() => setServicesOpen(false)} />
          </div>,
          document.body,
        )}
    </div>
  );
}
