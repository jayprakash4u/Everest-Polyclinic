import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Baby, Stethoscope, Users, Venus } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { encodePublicPath } from "@/lib/encode-public-path";
import { HOME_CARE_TEAM_IMAGE } from "@/constants/homepageSections";

/* Three entry points into the specialist list, each a real service route. */
const DEPARTMENTS = [
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Comprehensive care for all ages",
    href: "/services/general-medicine",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Expert care for your little ones",
    href: "/services/pediatrics",
  },
  {
    icon: Venus,
    title: "Gynecology",
    description: "Women's health, every step of the way",
    href: "/services/gynecology",
  },
];

/* The photograph is admin-managed (Admin → Pages → Home Page).
   HOME_CARE_TEAM_IMAGE is what the site shipped with and the fallback. */
export default function DoctorsSection({ sideImage, sideImageAlt }) {
  const image = sideImage || HOME_CARE_TEAM_IMAGE.image;
  const alt = sideImageAlt || HOME_CARE_TEAM_IMAGE.alt;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50/60 via-white to-white">
      {/*
        The asset already carries its own pale blob and dot field on the left,
        so it is built to sit on the right and dissolve into a light page. No
        scrim or feather is added here — doing so would fight the artwork.

        Below lg it is a block at the top; from lg it lifts out of flow and
        holds the right of the section, the same arrangement as the heroes.
      */}
      <div className="relative aspect-[3/2] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[56%]">
        <Image
          src={encodePublicPath(image)}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />
      </div>

      <Container className="relative">
        <div className="py-10 sm:py-14 lg:w-[46%] lg:py-20 xl:py-24">
          {/* Rule sits under the label rather than beside it, as in the
              reference — the one place on the site that varies from the
              shared SectionHeader, which is why this is written out. */}
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-600 sm:text-sm">
            Meet your care team
          </p>
          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-10 bg-secondary-500"
          />

          <h2 className="mt-6 font-heading text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-primary-900 sm:text-[2.5rem] lg:text-[3rem]">
            Experienced doctors.
            <br />
            <span className="text-secondary-600">Personal attention.</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-6 block h-0.5 w-10 bg-secondary-500"
          />

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 lg:text-lg">
            From everyday healthcare to specialist treatment, meet the
            clinicians who care for families in Nepalgunj.
          </p>

          <Button
            href="/doctors"
            size="lg"
            className="group mt-8 bg-primary-800 hover:bg-primary-900 focus-visible:ring-primary-800"
          >
            <Users size={18} strokeWidth={2} />
            Meet all doctors
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Button>
        </div>

        {/*
          Department shortcuts closing the section. In normal flow after the
          copy, so from lg the row runs across the foot and over the artwork
          behind it — no negative-margin overlap to keep in sync.
        */}
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-200/70 pb-px shadow-e1 sm:grid-cols-3 lg:mb-16 xl:mb-20">
          {DEPARTMENTS.map(({ icon: Icon, title, description, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full items-center gap-4 bg-white p-5 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600 transition-colors duration-300 group-hover:bg-secondary-100 sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-base font-semibold tracking-[-0.01em] text-primary-900">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-slate-600">
                    {description}
                  </span>
                </span>

                <ArrowRight
                  className="h-5 w-5 shrink-0 text-secondary-600 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
