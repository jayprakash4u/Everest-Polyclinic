import Image from "next/image";
import { Flag, HeartHandshake, TrendingUp, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

const STORY_IMAGE = "/images/about us/our_story_facility_image.png";

const STEPS = [
  {
    icon: Flag,
    title: "The Beginning",
    description:
      "We started with a simple mission to make quality healthcare accessible and trustworthy for everyone in our community.",
  },
  {
    icon: TrendingUp,
    title: "Growing Together",
    description:
      "With your trust, we expanded our services, welcomed expert specialists, and invested in modern technology and infrastructure.",
  },
  {
    icon: Users,
    title: "Where We Are Today",
    description:
      "Today, we provide comprehensive care under one roof, continuing our promise of better healthcare, closer to home.",
  },
];

export default function OurStory() {
  return (
    <Section tone="muted">
      <SectionHeader
        align="center"
        accent="secondary"
        eyebrow="Our story"
        titleClassName="text-primary-900"
        title={
          <>
            Our story started with a{" "}
            <span className="text-secondary-600">simple idea</span>.
          </>
        }
        subtitle="We believe quality healthcare shouldn't require patients to travel from one department to another or from one city to another. Our goal is to bring consultations, diagnostics, pharmacy, and specialized care together under one roof."
      />

      {/*
        The source is a 1466×305 panorama — three scenes composited into one
        strip. It keeps its native ratio at every width rather than being
        cropped to something taller: cropping a montage to 16:9 on a phone would
        throw away the exterior and the corridor and leave only the reception.
      */}
      <div className="relative aspect-[1466/305] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-e1">
        <Image
          src={encodePublicPath(STORY_IMAGE)}
          alt="The Everest Healthcare building exterior, reception desk and consulting corridor"
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Tighter stack on phones — the rail joins the steps, so they no longer
          need a wide gap to read as separate. */}
      <ol className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-6 lg:gap-8">
        {/*
          Two arrangements. Below md each step is a row — numbered disc on the
          left, title and copy beside it, joined by a vertical rail — so it
          reads as an ordered list. Stacked, the badge and icon floated above
          the heading with a gap under them and looked detached from their own
          text. From md it returns to the badge row with the horizontal rail,
          which is what the three-column layout needs.
        */}
        {STEPS.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="relative flex gap-4 md:block">
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-secondary-200 md:hidden"
              />
            ) : null}

            <div className="flex shrink-0 items-center gap-3 md:shrink">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-600 font-heading text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* The icon repeats what the heading already says, and on a phone
                  it is the element that pushed everything apart. Kept for the
                  wider layout, where there is room for it. */}
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-secondary-600 ring-1 ring-secondary-100 md:flex">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>

              {/* Rail runs from this step to the edge of its column, closing on
                  a dot. Hidden on the last step and below md, where the steps
                  stack and a horizontal rail would point at nothing. */}
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden flex-1 items-center gap-1.5 pl-2 md:flex"
                >
                  <span className="h-px flex-1 bg-secondary-200" />
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                </span>
              ) : null}
            </div>

            <div className="min-w-0 pb-2 md:pb-0">
              <h3 className="font-heading text-lg font-semibold leading-tight tracking-[-0.01em] text-primary-900 md:mt-5">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:mt-2.5">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Closing promise. Tinted rather than white so it reads as the section's
          conclusion instead of a fourth step. */}
      <div
        className={cn(
          "mt-10 flex flex-col gap-4 rounded-2xl bg-secondary-50/70 p-5 ring-1 ring-inset ring-secondary-100",
          "sm:mt-12 sm:flex-row sm:items-center sm:gap-6 sm:p-7",
        )}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-secondary-600 ring-1 ring-secondary-100">
          <HeartHandshake className="h-7 w-7" strokeWidth={1.5} />
        </span>

        <span
          aria-hidden="true"
          className="hidden h-14 w-px shrink-0 bg-secondary-200 sm:block"
        />

        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-primary-900">
            Our Promise
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            We will continue to put patients first, uphold the highest
            standards, and serve our community with compassion and integrity —
            every single day.
          </p>
        </div>
      </div>
    </Section>
  );
}
