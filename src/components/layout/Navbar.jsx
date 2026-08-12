"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants";
import ServicesOptionsMenu from "@/components/layout/ServicesOptionsMenu";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { cn } from "@/lib/utils";

const SERVICES_MENU_WIDTH = 860;
const VIEWPORT_PADDING = 16;

function isActiveLink(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function getServicesDropdownPosition(triggerEl) {
  if (!triggerEl || typeof window === "undefined") {
    return { top: 0, left: 0 };
  }

  const rect = triggerEl.getBoundingClientRect();
  const menuWidth = Math.min(window.innerWidth * 0.94, SERVICES_MENU_WIDTH);
  let left = rect.left + rect.width / 2 - menuWidth / 2;

  left = Math.max(VIEWPORT_PADDING, left);
  left = Math.min(left, window.innerWidth - menuWidth - VIEWPORT_PADDING);

  return { top: rect.bottom, left };
}

/** Wordmark echoes the reception signage: EVEREST / INTERNATIONAL / descriptor. */
function BrandLockup({ compact, onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
    >
      <Image
        src="/images/logos/logo.jpg"
        alt=""
        width={160}
        height={160}
        priority
        sizes="56px"
        className={cn(
          "shrink-0 rounded-full object-cover transition-all duration-300",
          compact ? "h-11 w-11" : "h-12 w-12 lg:h-14 lg:w-14",
        )}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-heading font-extrabold uppercase leading-none tracking-tight text-primary-900 transition-all duration-300",
            compact ? "text-xl lg:text-[26px]" : "text-xl lg:text-[30px]",
          )}
        >
          Everest
        </span>
        <span
          className={cn(
            "font-heading font-medium uppercase leading-none tracking-[0.08em] text-primary-900/90 transition-all duration-300",
            compact ? "mt-1 text-[11px] lg:text-[14px]" : "mt-1.5 text-[11px] lg:text-[17px]",
          )}
        >
          International
        </span>
        <span
          className={cn(
            "font-semibold uppercase leading-none tracking-[0.04em] text-slate-500 transition-all duration-300",
            compact ? "mt-1 text-[7px] lg:text-[8px]" : "mt-1.5 text-[7px] lg:text-[9.5px]",
          )}
        >
          Polyclinic &amp; Diagnostic Center
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);

  const servicesTriggerRef = useRef(null);
  const servicesCloseTimerRef = useRef(null);

  /* Route changed — drop every open menu during render, not in an effect. */
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setIsOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }

  const closeMobile = useCallback(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const openBooking = useCallback(() => {
    setBookingOpen(true);
    setIsOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, []);

  const syncDropdownPosition = useCallback(() => {
    setDropdownPos(getServicesDropdownPosition(servicesTriggerRef.current));
  }, []);

  const openServicesMenu = useCallback(() => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }

    syncDropdownPosition();
    setServicesOpen(true);
  }, [syncDropdownPosition]);

  const scheduleCloseServicesMenu = useCallback(() => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
    }

    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, 140);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return undefined;

    syncDropdownPosition();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    window.addEventListener("resize", syncDropdownPosition);
    window.addEventListener("scroll", syncDropdownPosition, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", syncDropdownPosition);
      window.removeEventListener("scroll", syncDropdownPosition);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen, syncDropdownPosition]);

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
      if (event.key === "Escape") closeMobile();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMobile]);

  const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <div className="sticky top-0 z-50 w-full">
      <header
        className={cn(
          "border-b bg-white transition-all duration-300",
          scrolled
            ? "border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.07)]"
            : "border-slate-100 shadow-none",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-all duration-300",
              scrolled ? "h-[76px]" : "h-[84px] lg:h-[104px]",
            )}
          >
            <BrandLockup compact={scrolled} onClick={closeMobile} />

            {/* Centre navigation */}
            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-5 2xl:gap-7">
                {NAV_LINKS.map((link) => {
                  const isActive = isActiveLink(pathname, link.href);
                  const labelClass =
                    "relative flex items-center gap-1 py-2 text-[14.5px] font-medium transition-colors";
                  const indicator = (
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-primary-600 transition-transform duration-200 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  );

                  if (link.href === "/services") {
                    return (
                      <li key={link.href}>
                        <div
                          ref={servicesTriggerRef}
                          onMouseEnter={openServicesMenu}
                          onMouseLeave={scheduleCloseServicesMenu}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              servicesOpen ? setServicesOpen(false) : openServicesMenu()
                            }
                            aria-expanded={servicesOpen}
                            aria-haspopup="true"
                            className={cn(
                              labelClass,
                              isActive || servicesOpen
                                ? "text-primary-700"
                                : "text-slate-600 hover:text-primary-700",
                            )}
                          >
                            {link.label}
                            <ChevronDown
                              size={14}
                              strokeWidth={2.5}
                              className={cn(
                                "transition-transform duration-200",
                                servicesOpen && "rotate-180",
                              )}
                            />
                            {indicator}
                          </button>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          labelClass,
                          isActive
                            ? "text-primary-700"
                            : "text-slate-600 hover:text-primary-700",
                        )}
                      >
                        {link.label}
                        {indicator}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Phone pill + mobile trigger */}
            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href={telHref}
                className="hidden items-center gap-2.5 rounded-full border border-slate-200 py-2.5 pl-4 pr-5 transition-colors hover:border-primary-300 hover:bg-primary-50/50 md:inline-flex"
              >
                <Phone size={17} strokeWidth={2.5} className="text-primary-600" />
                <span className="font-heading text-[15px] font-semibold text-primary-900">
                  {SITE.phone}
                </span>
              </a>

              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-2 rounded-full bg-secondary-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-secondary-700 md:hidden"
              >
                <CalendarDays size={15} strokeWidth={2.5} />
                Book
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 xl:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu size={22} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] xl:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMobile}
          className={cn(
            "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <aside
          className={cn(
            "absolute right-0 top-0 flex h-[100dvh] w-[min(86vw,360px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
            <BrandLockup compact onClick={closeMobile} />
            <button
              type="button"
              onClick={closeMobile}
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
            <ul className="space-y-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = isActiveLink(pathname, link.href);

                if (link.href === "/services") {
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-expanded={mobileServicesOpen}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                          isActive || mobileServicesOpen
                            ? "bg-primary-50 text-primary-700"
                            : "text-slate-700 hover:bg-slate-50",
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          size={18}
                          className={cn(
                            "shrink-0 text-slate-400 transition-transform duration-200",
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
                          <div className="pb-2 pt-1">
                            <ServicesOptionsMenu
                              variant="mobile"
                              onNavigate={closeMobile}
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
                      onClick={closeMobile}
                      tabIndex={isOpen ? 0 : -1}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
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

          <div className="border-t border-slate-100 bg-slate-50/70 p-4">
            <button
              type="button"
              onClick={openBooking}
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary-600 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,168,79,0.28)] transition-colors hover:bg-secondary-700"
            >
              <CalendarDays size={17} strokeWidth={2.5} />
              Book Appointment
            </button>
            <a
              href={telHref}
              tabIndex={isOpen ? 0 : -1}
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-primary-900 transition-colors hover:border-primary-300 hover:text-primary-700"
            >
              <Phone size={16} strokeWidth={2.5} className="text-primary-600" />
              {SITE.phone}
            </a>
          </div>
        </aside>
      </div>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* servicesOpen only flips via a client event, so no mount guard is needed. */}
      {servicesOpen &&
        createPortal(
          <div
            className="fixed z-[100] hidden pt-2 xl:block"
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
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
