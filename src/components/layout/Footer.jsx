import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
} from "lucide-react";
import { SITE, FOOTER_LINKS, NAV_LINKS } from "@/constants";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function FooterHeading({ children }) {
  return (
    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-400 sm:mb-5 sm:text-[11px] sm:tracking-[0.2em]">
      {children}
    </h4>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-xs text-slate-400 transition-colors hover:text-white sm:text-sm"
    >
      {children}
    </Link>
  );
}

function ContactRow({ icon: Icon, href, children, external }) {
  const content = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary-300 sm:h-9 sm:w-9">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
      </span>
      <span className="text-xs leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200 sm:text-sm">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group flex items-start gap-2.5 sm:gap-3"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return <div className="group flex items-start gap-2.5 sm:gap-3">{content}</div>;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#061d2e] text-slate-400">
      {/* Brand accent stripe */}
      <div className="h-1 bg-secondary-500" />

      {/* Emergency CTA strip */}
      <div className="border-b border-white/5 bg-primary-900/40">
        <div className="container mx-auto flex flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert-400 opacity-60" />
              <span className="relative inline-flex h-full w-full rounded-full bg-alert-500" />
            </span>
            <p className="text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">24/7 Emergency Care</span>
              <span className="hidden sm:inline">
                {" "}— We&apos;re always here when you need us most.
              </span>
            </p>
          </div>
          <a
            href={`tel:${SITE.emergencyHotline.replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-alert-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-alert-500 sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <PhoneCall size={14} className="sm:hidden" />
            <PhoneCall size={16} className="hidden sm:block" />
            {SITE.emergencyHotline}
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-12 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3">
              <Image
                src="/images/logos/logo.jpg"
                alt={SITE.shortName}
                width={56}
                height={56}
                className="h-11 w-11 rounded-full ring-2 ring-white/10 sm:h-14 sm:w-14"
              />
              <div>
                <p className="font-heading text-sm font-bold leading-tight text-white sm:text-base">
                  Everest International
                </p>
                <p className="text-xs font-medium text-secondary-400 sm:text-sm">Polyclinic</p>
              </div>
            </Link>

            <p className="mt-3 line-clamp-3 max-w-sm text-xs leading-relaxed text-slate-400 sm:mt-5 sm:line-clamp-none sm:text-sm">
              {SITE.description}
            </p>

            <p className="mt-2 hidden text-xs italic text-slate-500 sm:mt-4 sm:block">
              {SITE.tagline}
            </p>

            <div className="mt-4 flex gap-1.5 sm:mt-6 sm:gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-secondary-500/40 hover:bg-secondary-600/20 hover:text-white sm:h-9 sm:w-9"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & hours */}
          <div className="col-span-2 lg:col-span-5">
            <FooterHeading>Contact Us</FooterHeading>
            <div className="space-y-3 sm:space-y-4">
              <ContactRow icon={MapPin}>{SITE.address}</ContactRow>
              <ContactRow icon={Phone} href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                {SITE.phone}
              </ContactRow>
              <ContactRow icon={Mail} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </ContactRow>
              <ContactRow icon={Clock}>{SITE.workingHours}</ContactRow>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:py-6 sm:text-left">
          <p className="text-xs text-slate-500">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            {FOOTER_LINKS.quickLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 transition-colors hover:text-slate-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
