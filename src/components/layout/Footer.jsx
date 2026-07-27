import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE, FOOTER_LINKS, NAV_LINKS, SERVICES } from "@/constants";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
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
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const POPULAR_SERVICES = SERVICES.slice(0, 6);

function FooterHeading({ children }) {
  return (
    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-400 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
      {children}
    </h4>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex max-w-full items-start gap-1 text-[13px] leading-snug text-slate-400 transition-colors hover:text-white sm:items-center sm:gap-1.5 sm:text-sm"
    >
      <span className="min-w-0 break-words">{children}</span>
      <ArrowRight
        size={12}
        className="mt-0.5 hidden shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 sm:mt-0 sm:inline"
      />
    </Link>
  );
}

function ContactItem({ icon: Icon, href, children, external }) {
  const inner = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary-300 ring-1 ring-white/10 sm:h-9 sm:w-9 sm:rounded-xl">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 break-words text-[13px] leading-snug text-slate-300 sm:text-sm sm:leading-relaxed">
        {children}
      </span>
    </>
  );

  const className =
    "group flex items-start gap-2.5 rounded-xl transition-colors hover:text-white sm:gap-3";

  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const exploreLinks = NAV_LINKS.filter((link) => link.href !== "/");

  return (
    <footer className="relative overflow-hidden bg-[#051525] text-slate-400">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,168,79,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(30,95,168,0.12),transparent_35%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative h-1 bg-gradient-to-r from-secondary-500 via-secondary-400 to-primary-500" />

      {/* Emergency strip */}
      <div className="relative border-b border-white/5 bg-primary-900/30">
        <div className="container mx-auto flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="relative flex h-2 w-2 shrink-0 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert-400 opacity-60" />
              <span className="relative inline-flex h-full w-full rounded-full bg-alert-500" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white sm:text-sm">
                24/7 Emergency Care
              </p>
              <p className="text-[11px] text-slate-400 sm:text-sm">
                Immediate assistance when every minute matters.
              </p>
            </div>
          </div>
          <a
            href={`tel:${SITE.emergencyHotline.replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-alert-600 px-4 py-2 text-[13px] font-bold text-white transition hover:bg-alert-500 sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <PhoneCall size={15} />
            {SITE.emergencyHotline}
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
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
                <p className="text-xs font-medium text-secondary-400 sm:text-sm">
                  Polyclinic
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-slate-400 sm:mt-4 sm:text-sm">
              {SITE.description}
            </p>
            <p className="mt-1.5 text-[11px] italic text-slate-500 sm:mt-2 sm:text-xs">
              {SITE.tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-secondary-500/40 hover:bg-secondary-600/15 hover:text-white sm:h-10 sm:w-10"
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="mt-5 hidden sm:mt-6 sm:block">
              <Button href="/contact" variant="secondary" size="sm">
                Book Appointment
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Link columns — 2 per row on mobile */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:col-span-5 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0">
              <FooterHeading>Explore</FooterHeading>
              <ul className="space-y-2.5 sm:space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <FooterHeading>Services</FooterHeading>
              <ul className="space-y-2.5 sm:space-y-3">
                {POPULAR_SERVICES.map((service) => (
                  <li key={service.slug} className="min-w-0">
                    <FooterLink href={`/services/${service.slug}`}>
                      {service.title}
                    </FooterLink>
                  </li>
                ))}
                <li className="min-w-0">
                  <FooterLink href="/services">View all services</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:rounded-2xl sm:p-5">
              <div className="space-y-3 sm:space-y-4">
                <ContactItem icon={MapPin}>{SITE.address}</ContactItem>
                <ContactItem icon={Phone} href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                  {SITE.phone}
                </ContactItem>
                <ContactItem icon={Mail} href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </ContactItem>
                <ContactItem icon={Clock}>{SITE.workingHours}</ContactItem>
              </div>
            </div>

            <div className="mt-4 sm:hidden">
              <Button href="/contact" variant="secondary" size="sm" fullWidth>
                Book Appointment
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-6 sm:text-left lg:px-8">
          <p className="text-[11px] text-slate-500 sm:text-xs">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] sm:justify-end sm:gap-x-5 sm:gap-y-2 sm:text-xs">
            {FOOTER_LINKS.quickLinks.map((link) => (
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
