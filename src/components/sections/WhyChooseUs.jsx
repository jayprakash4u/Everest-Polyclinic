import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { WHY_CHOOSE_US } from "@/constants";

const InternationalStandardsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6 L40 14 L40 30 Q40 40 24 44 Q8 40 8 30 L8 14 Z"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <polygon
      points="24,14 27,22 36,22 29,27 32,35 24,30 16,35 19,27 12,22 21,22"
      fill="#22c55e"
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
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="12"
      stroke="#86efac"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="24"
      x2="34"
      y2="30"
      stroke="#86efac"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <rect x="30" y="8" width="14" height="14" rx="4" fill="#16a34a" />
    <rect x="36" y="10" width="3" height="10" fill="#f0fdf4" />
    <rect x="31" y="14" width="12" height="3" fill="#f0fdf4" />
  </svg>
);

const NABLLabIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M18 6 L18 22 L6 38 Q4 42 8 44 L40 44 Q44 42 42 38 L30 22 L30 6 Z"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <line x1="18" y1="6" x2="30" y2="6" stroke="#22c55e" strokeWidth="1.5" />
    <path
      d="M10 36 Q16 32 24 34 Q32 32 38 36 L42 42 Q44 44 40 44 L8 44 Q4 44 6 42 Z"
      fill="#22c55e"
      opacity={0.45}
    />
  </svg>
);

const HomeSampleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <polygon
      points="24,4 4,20 10,20 10,44 38,44 38,20 44,20"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <rect
      x="20"
      y="28"
      width="8"
      height="16"
      rx="1"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <path
      d="M24 14 Q30 20 30 25 Q30 30 24 30 Q18 30 18 25 Q18 20 24 14Z"
      fill="#22c55e"
      opacity={0.75}
    />
  </svg>
);

const OnlineReportsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M12 4 L12 44 L36 44 L36 14 L26 4 Z"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <path d="M26 4 L26 14 L36 14" stroke="#22c55e" strokeWidth="1.5" />
    <rect x="18" y="30" width="5" height="10" fill="#22c55e" />
    <rect x="25" y="24" width="5" height="16" fill="#22c55e" opacity={0.75} />
  </svg>
);

const ExpertSpecialistsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle
      cx="24"
      cy="36"
      r="9"
      fill="#dcfce7"
      stroke="#22c55e"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="36" r="4" fill="#22c55e" opacity={0.55} />
    <path d="M24 27 Q24 18 14 14" stroke="#22c55e" strokeWidth="1.5" />
    <path d="M24 27 Q24 18 34 14" stroke="#22c55e" strokeWidth="1.5" />
    <circle cx="14" cy="12" r="4" fill="#22c55e" />
    <circle cx="34" cy="12" r="4" fill="#22c55e" />
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
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="relative order-1 md:order-none">
            <div className="mx-auto h-56 max-w-md overflow-hidden rounded-2xl sm:h-72 md:mx-0 md:h-80 lg:h-96 lg:max-w-none">
              <img
                src="/clinic-image.jpg"
                alt="Everest Polyclinic"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="order-2 md:order-none">
            <SectionHeader
              badge="Why Choose Us"
              badgeVariant="secondary"
              title="Nepal's Most Trusted PolyClinic"
              subtitle="We combine international medical standards with local expertise to deliver exceptional healthcare."
              centered={false}
              className="mb-8 sm:mb-10"
            />

            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {list.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 [&_svg]:h-10 [&_svg]:w-10 sm:[&_svg]:h-12 sm:[&_svg]:w-12">
                      {Icon ? React.createElement(Icon) : null}
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 font-heading text-xs font-semibold leading-snug text-slate-800 sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-3 sm:line-clamp-none sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
