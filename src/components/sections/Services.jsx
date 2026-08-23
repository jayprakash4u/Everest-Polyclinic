import { createElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/constants/services/catalog";
import {
  getHomepageServiceImage,
  HOMEPAGE_SERVICE_SLUGS,
} from "@/constants/services/homepageServiceImages";
import { getServiceIcon } from "@/lib/service-icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { encodePublicPath } from "@/lib/encode-public-path";

/**
 * `getServiceIcon` returns a component from a fixed lookup table, so the
 * identity is stable across renders — but binding it to a capitalised local and
 * rendering `<Icon />` reads as a component created during render. createElement
 * expresses the same thing without the ambiguity.
 */
function ServiceIcon({ iconKey, className }) {
  return createElement(getServiceIcon(iconKey), { className, strokeWidth: 1.5 });
}

function ServiceCard({ service }) {
  const image = service.homepageImage || getHomepageServiceImage(service.slug);
  const summary =
    service.shortDescription ||
    service.hero?.description ||
    "Expert consultation and coordinated care at Everest Polyclinic.";

  return (
    <Link
      href={`/services/${service.slug}`}
      /* No `overflow-hidden` on the card itself — the notch disc and the
         button both have to paint past the bottom-right corner. The watermark
         gets its own clipped layer instead. pb reserves the notch's height. */
      /* Hover fills the card navy, the way the design fills its active card.
         Navy rather than green because the corner button is green — a green
         card would swallow it. */
      className="group relative flex h-full w-full flex-col rounded-3xl border border-slate-200/70 bg-white p-4 pb-14 shadow-e1 transition duration-300 hover:-translate-y-1 hover:border-primary-900 hover:bg-primary-900 hover:shadow-e2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:p-6 sm:pb-16"
    >
      {/* Oversized, near-transparent copy of the icon bleeding off the right
          edge — the texture that stops a sparse card reading as empty. Clipped
          by its own wrapper so it stops at the card's rounded edge. */}
      {image ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <span className="absolute -right-5 top-2 block h-32 w-32 opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.13] sm:h-40 sm:w-40">
            {/* The artwork is navy line-art, so it would vanish against the
                navy hover fill. `brightness-0 invert` forces it to flat white. */}
            <Image
              src={encodePublicPath(image)}
              alt=""
              fill
              sizes="160px"
              className="object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
            />
          </span>
        </span>
      ) : null}

      {image ? (
        <span className="relative block h-11 w-11 sm:h-14 sm:w-14">
          <Image
            src={encodePublicPath(image)}
            alt=""
            fill
            sizes="56px"
            className="object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
          />
        </span>
      ) : (
        <span className="relative flex h-11 w-11 items-center justify-center text-primary-800 transition-colors duration-300 group-hover:text-white sm:h-14 sm:w-14">
          <ServiceIcon iconKey={service.icon} className="h-7 w-7 sm:h-9 sm:w-9" />
        </span>
      )}

      <h3 className="relative mt-4 font-heading text-sm font-semibold leading-snug tracking-[-0.01em] text-primary-900 transition-colors duration-300 group-hover:text-white sm:mt-5 sm:text-lg">
        <span className="line-clamp-2">{service.title}</span>
      </h3>

      <p className="relative mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/75 sm:mt-2.5 sm:text-sm">
        {summary}
      </p>

      {/* Dashed rule closing the card. The design puts a clinician count in the
          row beneath it; there is no such figure in the service data, so the
          slot carries the action label rather than an invented number. */}
      <span
        aria-hidden="true"
        className="relative mt-auto block border-t border-dashed border-slate-300 pt-3.5 transition-colors duration-300 group-hover:border-white/30"
      />
      <span className="relative flex items-center gap-2 text-[11px] font-semibold text-secondary-700 transition-colors duration-300 group-hover:text-secondary-300 sm:text-xs">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500 transition-colors duration-300 group-hover:bg-secondary-400"
        />
        Explore service
      </span>

      {/*
        The cut.

        One disc painted in the section's own background colour with the button
        nested inside it. Nesting keeps the carved ring even on every side by
        construction, rather than by keeping two sets of offsets in agreement.

        The pair is pulled outwards so it straddles the card's bottom-right
        corner — the disc takes a concave bite out of the card and the button
        sits half outside it. That overhang is what makes the corner read as
        scooped rather than as a button parked in a corner.

        Doing it this way rather than with a CSS mask keeps the card's border
        and shadow intact everywhere else. It is tied to the section tone:
        `Section tone="muted"` resolves to bg-primary-50, so the disc must stay
        primary-50 to disappear.
      */}
      <span
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-primary-50 sm:-bottom-5 sm:-right-5 sm:h-[88px] sm:w-[88px]"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-600 text-white shadow-e1 transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary-700 sm:h-12 sm:w-12">
          <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
        </span>
      </span>
    </Link>
  );
}

export default function Services({ services = SERVICES }) {
  const catalog = services?.length ? services : SERVICES;

  /*
    Fixed eight, in a fixed order, resolved by slug — see HOMEPAGE_SERVICE_SLUGS.
    `filter(Boolean)` covers a slug that has been retired upstream: the grid
    loses a tile rather than rendering a broken card.
  */
  const items = HOMEPAGE_SERVICE_SLUGS.map((slug) =>
    catalog.find((service) => service.slug === slug),
  ).filter(Boolean);

  return (
    <Section tone="muted" id="services-list">
      <SectionHeader
        align="center"
        accent="secondary"
        eyebrow="Our medical services"
        titleClassName="text-primary-900"
        title={
          <>
            Comprehensive Care,{" "}
            <span className="text-secondary-600">All in One Place</span>
          </>
        }
        subtitle="From routine health checkups to specialist care, we provide accessible medical services for every stage of life."
      />

      {/*
        A static grid, not the carousel this section used to be. Eight tiles fit
        4×2 on a desktop with room to spare, and a carousel hides half of them
        behind a scroll gesture for no gain — the whole point of the section is
        that the range is visible at a glance.
      */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {items.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      {/* Rules either side keep the button from floating loose under the grid
          and close the section deliberately. */}
      <div className="mt-10 flex items-center justify-center gap-4 sm:mt-12 sm:gap-6">
        <span aria-hidden="true" className="hidden h-px w-12 bg-slate-300 sm:block lg:w-20" />

        <Link
          href="/services"
          className="group inline-flex items-center gap-3 rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5"
        >
          View All Medical Services
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500 text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>

        <span aria-hidden="true" className="hidden h-px w-12 bg-slate-300 sm:block lg:w-20" />
      </div>
    </Section>
  );
}
