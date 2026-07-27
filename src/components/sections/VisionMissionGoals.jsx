"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: "vision",
    title: "Vision",
    description:
      "To be the most trusted home healthcare provider, delivering compassionate and high-quality medical services that empower patients to live healthier, more fulfilling lives in the comfort of their homes.",
    colorValue: "#16a34a",
  },
  {
    id: "mission",
    title: "Mission",
    description:
      "To provide personalized, compassionate, and professional healthcare services at home — from skilled nursing and physiotherapy to telemedicine and palliative care — ensuring every patient receives dignified and expert attention.",
    colorValue: "#0284c7",
  },
  {
    id: "goals",
    title: "Goals",
    description:
      "To expand access to quality home healthcare across all communities, continuously improve patient outcomes through evidence-based practices, and build a team of dedicated professionals committed to excellence in care.",
    colorValue: "#166534",
  },
];

const VisionIcon = ({ size = 36 }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <ellipse
      cx="20"
      cy="20"
      rx="18"
      ry="10"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="2.2" />
    <circle cx="20" cy="20" r="2" fill="white" />
    <line
      x1="20"
      y1="6"
      x2="20"
      y2="3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="34"
      x2="20"
      y2="37"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MissionIcon = ({ size = 36 }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <path
      d="M20 6 C20 6 14 10 14 18 C14 22 17 25 20 26 C23 25 26 22 26 18 C26 10 20 6 20 6Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M14 24 L10 34"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M26 24 L30 34"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="30"
      x2="28"
      y2="30"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="17" r="3" fill="white" opacity="0.8" />
  </svg>
);

const GoalsIcon = ({ size = 36 }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
  >
    <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="2" />
    <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2" />
    <circle cx="20" cy="20" r="4" fill="white" />
    <line
      x1="20"
      y1="4"
      x2="20"
      y2="8"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="32"
      x2="20"
      y2="36"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="20"
      x2="8"
      y2="20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="32"
      y1="20"
      x2="36"
      y2="20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const iconMap = {
  vision: VisionIcon,
  mission: MissionIcon,
  goals: GoalsIcon,
};

export default function VisionMissionGoals() {
  const [visible, setVisible] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => [...prev, i]);
              }, i * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full min-h-0 flex-col overflow-hidden bg-slate-900 lg:min-h-[700px] lg:flex-row"
    >
      {/* LEFT: Visual Brand Anchor */}
      <div className="relative min-h-[200px] w-full overflow-hidden sm:min-h-[260px] lg:min-h-full lg:w-[40%]">
        <div
          className="absolute inset-0 bg-cover bg-center contrast-125 grayscale"
          style={{ backgroundImage: "url('/images/vision-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h2 className="select-none text-[14vw] font-black uppercase leading-none tracking-tighter text-white/20 sm:text-[12vw] lg:text-[8vw]">
            Values
          </h2>
        </div>

        <div className="absolute bottom-6 left-5 right-5 z-10 sm:bottom-12 sm:left-12 sm:right-12">
          <div className="mb-2 h-[2px] w-10 bg-secondary-400 sm:mb-4 sm:w-12" />
          <h3 className="text-lg font-black uppercase tracking-widest text-white sm:text-2xl">
            Our North Star
          </h3>
          <p className="mt-1 text-xs text-primary-100/60 sm:mt-2 sm:text-sm">
            Guiding every clinical decision we make.
          </p>
        </div>
      </div>

      {/* RIGHT: Content Area */}
      <div className="flex flex-1 flex-col justify-center gap-3 bg-white px-4 py-8 sm:gap-6 sm:px-8 sm:py-14 md:gap-8 md:px-20 md:py-20">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.id];
          return (
            <div
              key={item.id}
              className="group flex flex-row items-start gap-3 rounded-2xl border border-transparent p-3 transition-all duration-500 hover:border-slate-100 hover:bg-slate-50 sm:gap-6 sm:rounded-[2rem] sm:p-6 md:gap-8 md:p-8"
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index)
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg rotate-3 transition-transform duration-500 group-hover:rotate-0 sm:h-16 sm:w-16 sm:rounded-2xl md:h-20 md:w-20 md:rounded-3xl"
                style={{ background: item.colorValue }}
              >
                <span className="sm:hidden">
                  <IconComponent size={22} />
                </span>
                <span className="hidden sm:inline">
                  <IconComponent size={36} />
                </span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h4 className="mb-1 text-base font-black uppercase tracking-tight text-slate-900 sm:mb-2 sm:text-xl md:text-2xl">
                  {item.title}
                </h4>
                <p className="max-w-lg text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
