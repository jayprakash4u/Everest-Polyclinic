import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { WHY_CHOOSE_US } from "@/constants";

/*
 * The original hand-drawn icon set, kept as-is. Only the palette moved: these
 * were drawn in stock Tailwind green (#22c55e / #dcfce7), a hue that appears
 * nowhere else in the brand. They now use the logo green ramp.
 */
const InternationalStandardsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6 L40 14 L40 30 Q40 40 24 44 Q8 40 8 30 L8 14 Z"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <polygon
      points="24,14 27,22 36,22 29,27 32,35 24,30 16,35 19,27 12,22 21,22"
      fill="#2FA84F"
      opacity={0.85}
    />
  </svg>
);

const EmergencyCareIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle
      cx="24"
      cy="24"
      r="14"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="12"
      stroke="#92D5A8"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="24"
      x2="34"
      y2="30"
      stroke="#92D5A8"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <rect x="30" y="8" width="14" height="14" rx="4" fill="#1F843C" />
    <rect x="36" y="10" width="3" height="10" fill="#F2FBF4" />
    <rect x="31" y="14" width="12" height="3" fill="#F2FBF4" />
  </svg>
);

const NABLLabIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M18 6 L18 22 L6 38 Q4 42 8 44 L40 44 Q44 42 42 38 L30 22 L30 6 Z"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <line x1="18" y1="6" x2="30" y2="6" stroke="#2FA84F" strokeWidth="1.5" />
    <path
      d="M10 36 Q16 32 24 34 Q32 32 38 36 L42 42 Q44 44 40 44 L8 44 Q4 44 6 42 Z"
      fill="#2FA84F"
      opacity={0.45}
    />
  </svg>
);

const HomeSampleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <polygon
      points="24,4 4,20 10,20 10,44 38,44 38,20 44,20"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <rect
      x="20"
      y="28"
      width="8"
      height="16"
      rx="1"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <path
      d="M24 14 Q30 20 30 25 Q30 30 24 30 Q18 30 18 25 Q18 20 24 14Z"
      fill="#2FA84F"
      opacity={0.75}
    />
  </svg>
);

const OnlineReportsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M12 4 L12 44 L36 44 L36 14 L26 4 Z"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <path d="M26 4 L26 14 L36 14" stroke="#2FA84F" strokeWidth="1.5" />
    <rect x="18" y="30" width="5" height="10" fill="#2FA84F" />
    <rect x="25" y="24" width="5" height="16" fill="#2FA84F" opacity={0.75} />
  </svg>
);

const ExpertSpecialistsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle
      cx="24"
      cy="36"
      r="9"
      fill="#DFF3E5"
      stroke="#2FA84F"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="36" r="4" fill="#2FA84F" opacity={0.55} />
    <path d="M24 27 Q24 18 14 14" stroke="#2FA84F" strokeWidth="1.5" />
    <path d="M24 27 Q24 18 34 14" stroke="#2FA84F" strokeWidth="1.5" />
    <circle cx="14" cy="12" r="4" fill="#2FA84F" />
    <circle cx="34" cy="12" r="4" fill="#2FA84F" />
  </svg>
);

const ICONS = {
  globe: InternationalStandardsIcon,
  alarm: EmergencyCareIcon,
  shield: NABLLabIcon,
  home: HomeSampleIcon,
  document: OnlineReportsIcon,
  users: ExpertSpecialistsIcon,
};

export default function WhyChooseUs({ items = WHY_CHOOSE_US }) {
  const list = items?.length ? items : WHY_CHOOSE_US;

  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Why Everest"
        title="Six reasons families keep coming back"
        subtitle="International medical standards and local expertise, brought together in one place in Nepalgunj."
      />

      {/*
        A hairline matrix rather than six floating cards or one long list.
        `gap-px` over a slate background paints the rules between cells, so the
        six reasons read as a single considered block — no borders stacking up,
        no shadows, and the argument stays dense enough to take in at a glance.

        The photograph that used to sit beside this list is gone: the only
        asset available was 735x525 and was being stretched across a panel
        roughly 576px wide and 720px tall, so it rendered visibly soft. An
        upscaled stock photo was doing less for this section than the space is.
      */}
      <Reveal
        as="ul"
        stagger
        className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((item) => {
          const Icon = ICONS[item.icon];

          // Icon-left on a phone, stacked above the text from `sm` up. Stacked
          // on mobile left each cell tall and half-empty, and six of those in a
          // column is a long, sparse scroll.
          return (
            <li
              key={item.title}
              className="group flex gap-4 bg-white p-5 transition-colors hover:bg-slate-50/70 sm:flex-col sm:gap-0 sm:p-7"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center [&_svg]:h-10 [&_svg]:w-10 sm:h-12 sm:w-12 sm:[&_svg]:h-12 sm:[&_svg]:w-12">
                {Icon ? <Icon /> : null}
              </span>

              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.01em] text-slate-900 sm:mt-5">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:mt-2">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
