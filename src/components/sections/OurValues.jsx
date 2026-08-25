import Image from "next/image";
import { Scale } from "lucide-react";
import Section from "@/components/ui/Section";
import { encodePublicPath } from "@/lib/encode-public-path";

const IMAGE_DIR = "/images/about us/our values image";

/*
 * Five value cards, a label pill overlapping each card's top edge the way
 * the reference laid them out.
 *
 * Four of the five use the real illustrations from that folder, matched to
 * a card by what's actually in the picture (the pharmacy counter is
 * "Customer First", the lab scene is "Quality", and so on) — the folder has
 * no `2.webp`, and files are numbered as if one was meant to exist, so
 * "Ethics & Integrity" falls back to the tinted icon panel the whole set
 * used before. Drop a `2.webp` (or update `IMAGE_DIR`/the filename below) in
 * that folder and it'll pick it up the same way as the other four.
 */
const TONES = {
  secondary: {
    pill: "bg-secondary-50 text-secondary-700",
    panel: "from-secondary-50 to-secondary-100/70",
    icon: "text-secondary-600",
  },
  primary: {
    pill: "bg-primary-50 text-primary-700",
    panel: "from-primary-50 to-primary-100/70",
    icon: "text-primary-700",
  },
  accent: {
    pill: "bg-accent-50 text-accent-700",
    panel: "from-accent-50 to-accent-100/70",
    icon: "text-accent-600",
  },
};

const VALUES = [
  {
    image: `${IMAGE_DIR}/1.webp`,
    title: "Customer First",
    description: "Every decision starts with what's best for the patient in front of us.",
    tone: "secondary",
  },
  {
    // No source image for this one — see the note above.
    icon: Scale,
    title: "Ethics & Integrity",
    description: "Honest guidance and transparent pricing, even when it isn't the easy answer.",
    tone: "primary",
  },
  {
    image: `${IMAGE_DIR}/3.webp`,
    title: "Quality",
    description: "Accurate diagnostics and consistent clinical standards, every time.",
    tone: "accent",
  },
  {
    image: `${IMAGE_DIR}/4.webp`,
    title: "Accountability",
    description: "We stand behind our care and take ownership when something needs to be made right.",
    tone: "primary",
  },
  {
    image: `${IMAGE_DIR}/5.webp`,
    title: "Empathy & Compassion",
    description: "Treating every patient with the warmth and patience we'd want for our own family.",
    tone: "secondary",
  },
];

export default function OurValues() {
  return (
    <Section tone="muted">
      <h2 className="font-heading text-2xl font-semibold tracking-[-0.01em] text-primary-900 sm:text-3xl">
        Our Values
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {VALUES.map(({ icon: Icon, image, title, description, tone }) => {
          const t = TONES[tone];

          return (
            <div key={title} className="relative pt-4">
              {/* The pill sits above the card's own top edge, on the section's
                  own background — it has to be a sibling positioned outside
                  the card, not a child of it, or the card's overflow-hidden
                  (needed to clip the panel's corners) would clip the pill
                  along with it. */}
              <span
                className={`absolute left-3 top-0 z-10 rounded-lg px-3 py-1.5 text-xs font-semibold ${t.pill}`}
              >
                {title}
              </span>

              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-e1">
                {image ? (
                  <div className="relative aspect-[4/3] w-full bg-white">
                    <Image
                      src={encodePublicPath(image)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                      className="object-contain p-3"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${t.panel}`}
                  >
                    <Icon className={`h-11 w-11 sm:h-12 sm:w-12 ${t.icon}`} strokeWidth={1.5} />
                  </div>
                )}
                <p className="p-4 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
