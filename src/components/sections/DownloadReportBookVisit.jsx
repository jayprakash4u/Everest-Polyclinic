import {
  Clock,
  Home,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/constants";
import { HEALTH_PACKAGE_FEATURES } from "@/constants/healthPackages";

const phoneHref = `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;
const emergencyHref = `tel:${SITE.emergencyHotline.replace(/[^\d+]/g, "")}`;

const STEPS = [
  {
    title: "Book or walk in",
    description:
      "Reserve a slot online or by phone. Walk-ins are welcome during opening hours — no appointment needed to be seen.",
  },
  {
    title: "See your specialist",
    description:
      "Consultation, samples and imaging happen in the same building, so there is no travelling between departments.",
  },
  {
    title: "Collect your results",
    description:
      "Most laboratory reports are ready the same day, and your doctor talks you through what they mean.",
  },
];

const FEATURE_ICONS = {
  shield: ShieldCheck,
  clock: Clock,
  home: Home,
  stethoscope: Stethoscope,
};

const PRACTICAL = [
  { icon: Clock, label: "Opening hours", value: SITE.workingHours },
  { icon: MapPin, label: "Find us", value: SITE.address },
  {
    icon: PhoneCall,
    label: "Emergency, day or night",
    value: SITE.emergencyHotline,
    href: emergencyHref,
  },
];

export default function DownloadReportBookVisit() {
  return (
    <Section tone="dark">
      {/* The booking CTA rides in the header's action slot. Left as a bare
          heading it left the whole top-right of the band empty. */}
      <SectionHeader
        light
        eyebrow="Visiting us"
        title="What happens when you come in"
        subtitle="Three steps, one building, no running between departments."
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Book an appointment</Button>
            <Button href={phoneHref} variant="outlineWhite">
              <PhoneCall size={16} strokeWidth={2} />
              Call reception
            </Button>
          </div>
        }
      />

      {/* Three equal columns so the row resolves flush instead of one side
          running longer than the other. */}
      <Reveal
        as="ol"
        stagger
        className="grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3"
      >
        {STEPS.map(({ title, description }, index) => (
          <li key={title} className="bg-primary-900 p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="font-heading text-4xl font-semibold leading-none text-secondary-400/70"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {description}
            </p>
          </li>
        ))}
      </Reveal>

      {/* Practical detail and service commitments close the band, so the
          section answers "how do I actually use this place" end to end. */}
      <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-12 lg:gap-12">
        <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
          {PRACTICAL.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-3">
              <Icon
                size={18}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-secondary-400"
              />
              <div className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-white">
                  {href ? (
                    <a
                      href={href}
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:col-span-4 lg:grid-cols-1 lg:gap-y-2.5">
          {HEALTH_PACKAGE_FEATURES.map(({ label, icon }) => {
            const Icon = FEATURE_ICONS[icon] ?? ShieldCheck;
            return (
              <li
                key={label}
                className="flex items-start gap-2 text-xs font-medium leading-tight text-slate-300 sm:text-sm"
              >
                <Icon
                  size={15}
                  strokeWidth={2}
                  className="mt-px shrink-0 text-secondary-400"
                />
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
