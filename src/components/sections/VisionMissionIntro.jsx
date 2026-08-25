import { Rocket, Binoculars } from "lucide-react";
import Container from "@/components/ui/Container";

/*
 * A short, badge-style Vision/Mission pair right under the hero. This is now
 * the only place on the site that states them — the earlier dark-card
 * section further down the page (VisionMissionGoals.jsx, which also carried
 * a third "Goals" item) was removed as a duplicate once this one shipped.
 */
const ITEMS = [
  {
    icon: Rocket,
    title: "Our Vision",
    description:
      "To be the most trusted home healthcare provider, delivering compassionate and high-quality medical services that empower patients to live healthier, more fulfilling lives in the comfort of their homes.",
    tone: "primary",
  },
  {
    icon: Binoculars,
    title: "Our Mission",
    description:
      "To provide personalized, compassionate, and professional healthcare services at home — from skilled nursing and physiotherapy to telemedicine and palliative care — ensuring every patient receives dignified and expert attention.",
    tone: "secondary",
  },
];

const TONES = {
  primary: {
    ring: "border-primary-700 text-primary-700",
    glow: "border-primary-200",
    line: "bg-primary-200",
  },
  secondary: {
    ring: "border-secondary-600 text-secondary-600",
    glow: "border-secondary-200",
    line: "bg-secondary-200",
  },
};

function VisionMissionBadge({ icon: Icon, title, description, tone }) {
  const t = TONES[tone];

  return (
    <div className="relative flex flex-col items-center px-4 text-center">
      {/* The line runs the full column width and sits behind both rings; the
          inner circle is opaque white, so it's the circle — not a mask or a
          z-index trick on the line itself — that interrupts it. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-14 h-px sm:top-16 ${t.line}`}
      />

      <span
        className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 sm:h-28 sm:w-28 ${t.glow}`}
      >
        <span
          className={`flex h-[74px] w-[74px] items-center justify-center rounded-full border-[3px] bg-white sm:h-[88px] sm:w-[88px] ${t.ring}`}
        >
          <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.75} />
        </span>
      </span>

      <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-primary-900 sm:text-base">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function VisionMissionIntro() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container className="grid gap-12 sm:grid-cols-2 sm:gap-8">
        {ITEMS.map((item) => (
          <VisionMissionBadge key={item.title} {...item} />
        ))}
      </Container>
    </section>
  );
}
