"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const servicesList = [
  { name: "24/7 Emergency", id: 1 },
  { name: "Ambulance Service", id: 2 },
  { name: "ICU / Critical Care", id: 3 },
  { name: "Surgery", id: 4 },
  { name: "Diagnostic Services", id: 5 },
  { name: "Pharmacy 24/7", id: 6 },
  { name: "Blood Bank", id: 7 },
  { name: "Telemedicine", id: 9 },
  { name: "Health Checkup", id: 10 },
  { name: "Home Care", id: 11 },
  { name: "Vaccination", id: 12 },
  { name: "Physiotherapy", id: 13 },
  { name: "Maternity Care", id: 14 },
  { name: "Dialysis", id: 15 },
  { name: "Cardiac Care", id: 16 },
  { name: "Mental Health", id: 17 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 w-full bg-transparent">
      <div className="relative w-full">
        {/* LOGO SECTION */}
        <div
          className="absolute left-0 top-0 z-30 hidden lg:flex h-[130px] w-[25%] items-center justify-center bg-white shadow-xl"
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
            <div className="text-center mt-2">
              <p className="font-heading font-bold text-lg leading-tight text-slate-800">
                Everest International
              </p>
              <p className="text-sm font-medium text-primary-600">Polyclinic</p>
            </div>
          </Link>
        </div>

        {/* TOP CONTACT BAR */}
        <div
          className="relative z-10 ml-auto w-full lg:w-[80%] bg-primary-600 py-2.5 text-[13px] text-white"
          style={{ clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="container mx-auto px-4 lg:pl-28 flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+9779858021822"
                className="flex items-center gap-2 hover:text-secondary-200 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-semibold tracking-wide">985-8021822</span>
              </a>

              <div className="flex items-center gap-2 text-white/90 border-l border-white/20 pl-6">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="truncate max-w-[250px]">
                  Karkando Chowk, Nepalgunj-18
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/90 border-l border-white/20 pl-6">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>24 Hours Service</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pr-6 ml-auto lg:ml-0">
              <Link
                href="#"
                className="hover:text-secondary-300 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="hover:text-secondary-300 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="hover:text-secondary-300 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="hover:text-secondary-300 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.1a8.38 8.38 0 0 1 3.8.9L21 3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <header className="relative z-20 bg-white shadow-md">
          <nav className="ml-auto w-full lg:w-[78%] px-4 lg:pl-16 py-5">
            <div className="flex items-center justify-between">
              {/* CENTERED NAVIGATION BOX */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="px-6 py-2 bg-primary-600 rounded-xl shadow-lg">
                  <ul className="flex items-center">
                    {NAV_LINKS.map((link, index) => (
                      <li
                        key={link.href}
                        className="flex items-center relative"
                      >
                        {link.href === "/services" ? (
                          <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "px-4 py-2 font-semibold text-xs uppercase tracking-tight text-white hover:text-secondary-200 transition-colors flex items-center gap-1",
                                pathname === link.href && "text-secondary-300",
                              )}
                            >
                              {link.label}
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </Link>
                            {servicesOpen && (
                              <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-lg shadow-2xl border border-slate-100 py-3 z-50 max-h-80 overflow-y-auto">
                                {servicesList.map((s) => (
                                  <Link
                                    key={s.id}
                                    href={`/services?service=${s.id}`}
                                    className="block px-6 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-colors"
                                  >
                                    {s.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={link.href}
                            className={cn(
                              "px-4 py-2 font-semibold text-xs uppercase tracking-tight text-white hover:text-secondary-200 transition-colors",
                              pathname === link.href && "text-secondary-300",
                            )}
                          >
                            {link.label}
                          </Link>
                        )}
                        {index < NAV_LINKS.length - 1 && (
                          <span className="text-white/20 mx-0.5">|</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION BUTTONS: Search + Small Appointment Button */}
              <div className="flex items-center gap-4 pr-2">
                {/* Search Icon */}
                <button
                  className="p-2 text-slate-600 hover:text-primary-600 transition-colors"
                  aria-label="Search"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>

                {/* Small Appointment Button */}
                <Button
                  size="sm"
                  className="bg-secondary-600 hover:bg-secondary-700 text-white shadow-md px-5 text-xs font-bold uppercase tracking-wider"
                >
                  Book Now
                </Button>

                {/* Mobile Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 text-slate-800"
                >
                  <div className="w-6 h-0.5 bg-current mb-1.5" />
                  <div className="w-6 h-0.5 bg-current mb-1.5" />
                  <div className="w-6 h-0.5 bg-current" />
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white p-6 shadow-xl border-t w-full h-screen fixed inset-0 z-[60]">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-800 text-3xl"
            >
              &times;
            </button>
          </div>
          <ul className="space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-slate-800 block border-b pb-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
