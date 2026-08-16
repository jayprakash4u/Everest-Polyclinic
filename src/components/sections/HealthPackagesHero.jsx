import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Home,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { HEALTH_PACKAGE_FEATURES } from "@/constants/healthPackages";
import { encodePublicPath } from "@/lib/encode-public-path";

const HERO_IMAGE = "/images/health_packages_side_image.png";

const FEATURE_ICONS = {
  shield: ShieldCheck,
  clock: Clock,
  home: Home,
  stethoscope: Stethoscope,
};

/**
 * Labels arrive as one string ("NABL Accredited Lab"). The reference sets the
 * first word bold on its own line and the remainder beneath, which every
 * current label happens to split cleanly on — "NABL / Accredited Lab",
 * "Same-Day / Reports", "Home / Collection", "Doctor / Consultation". A label
 * with no space falls back to a single line rather than breaking.
 */
function splitLabel(label) {
  const index = label.indexOf(" ");
  if (index === -1) return [label, null];
  return [label.slice(0, index), label.slice(index + 1)];
}

export default function HealthPackagesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50/70 via-white to-white">
      {/* Below lg the photograph is a block at the top with the copy beneath
          it; from lg it lifts out of flow and holds the right of the section.
          The swept left edge is what stops a landscape photo from reading as a
          rectangle pasted onto the page. */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100 lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%] lg:rounded-l-[6rem]">
        <Image
          src={encodePublicPath(HERO_IMAGE)}
          alt="A doctor discussing a health checkup plan with a patient"
          fill
          // This is the LCP on /health-packages.
          preload
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-white/80 to-transparent lg:block"
        />
      </div>

      <Container className="relative">
        <div className="py-8 sm:py-12 lg:py-20 xl:py-24">
          <div className="lg:w-[48%]">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm"
            >
              <Link href="/" className="transition-colors hover:text-primary-700">
                Home
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-medium text-primary-900">Health Packages</span>
            </nav>

            <p className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary-600">
              <span className="h-px w-6 bg-secondary-400" />
              Our health packages
            </p>

            <h1 className="mt-5 font-heading text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-900 sm:text-5xl lg:text-[3.25rem]">
              Complete care.
              <br />
              <span className="text-secondary-600">One simple package.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
              Preventive health checkups designed to help you understand your
              health, detect concerns early, and stay ahead of potential
              problems.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                href="#packages"
                size="lg"
                className="group w-full justify-center sm:w-auto"
              >
                Explore Our Packages
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>

              {/*
                Decorative sign-off, and only from sm. On a phone the divider
                beside it is hidden and it wraps onto its own line under the
                button, where it reads as a stray fragment of copy rather than a
                flourish attached to anything.

                The reference sets this in a handwriting face; rather than load a
                script font for two words it uses the heading serif in italic —
                same "signed off" register, no extra payload.
              */}
              <span aria-hidden="true" className="hidden h-10 w-px bg-slate-200 sm:block" />

              <p className="hidden font-heading text-lg italic leading-tight text-secondary-600 sm:block">
                Healthier
                <br />
                Tomorrow
              </p>
            </div>
          </div>

          {/*
            Full-width trust bar closing the hero. It sits in normal flow after
            the copy, so on lg it runs across the foot of the section and over
            the photograph behind it — no negative-margin overlap to maintain,
            which is how the old strip was pinned.
          */}
          <ul className="mt-10 grid grid-cols-2 divide-x divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-e1 sm:grid-cols-4 sm:divide-y-0 lg:mt-16">
            {HEALTH_PACKAGE_FEATURES.map(({ label, icon }) => {
              const Icon = FEATURE_ICONS[icon] ?? ShieldCheck;
              const [lead, rest] = splitLabel(label);

              return (
                <li
                  key={label}
                  className="flex items-center gap-3 px-3 py-4 sm:gap-4 sm:px-5 sm:py-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <p className="min-w-0 text-sm leading-snug">
                    <span className="block font-heading font-semibold text-primary-900">
                      {lead}
                    </span>
                    {rest ? (
                      <span className="mt-0.5 block text-slate-600">{rest}</span>
                    ) : null}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
