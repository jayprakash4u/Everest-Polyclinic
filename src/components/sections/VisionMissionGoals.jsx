'use client';

import { useEffect, useRef, useState } from 'react';

const items = [
  {
    id: 'vision',
    title: 'Vision',
    description:
      'To be the most trusted home healthcare provider, delivering compassionate and high-quality medical services that empower patients to live healthier, more fulfilling lives in the comfort of their homes.',
    colorValue: '#16a34a',
  },
  {
    id: 'mission',
    title: 'Mission',
    description:
      'To provide personalized, compassionate, and professional healthcare services at home — from skilled nursing and physiotherapy to telemedicine and palliative care — ensuring every patient receives dignified and expert attention.',
    colorValue: '#0284c7',
  },
  {
    id: 'goals',
    title: 'Goals',
    description:
      'To expand access to quality home healthcare across all communities, continuously improve patient outcomes through evidence-based practices, and build a team of dedicated professionals committed to excellence in care.',
    colorValue: '#166534',
  },
];

// SVG icon components
const VisionIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <ellipse cx="20" cy="20" rx="18" ry="10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="2.2"/>
    <circle cx="20" cy="20" r="2" fill="white"/>
    <line x1="20" y1="6" x2="20" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="34" x2="20" y2="37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MissionIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M20 6 C20 6 14 10 14 18 C14 22 17 25 20 26 C23 25 26 22 26 18 C26 10 20 6 20 6Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M14 24 L10 34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 24 L30 34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="30" x2="28" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="17" r="3" fill="white" opacity="0.8"/>
  </svg>
);

const GoalsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="2"/>
    <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2"/>
    <circle cx="20" cy="20" r="4" fill="white"/>
    <line x1="20" y1="4" x2="20" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="32" x2="20" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4" y1="20" x2="8" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="36" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col lg:flex-row min-h-[700px] bg-slate-900 overflow-hidden"
    >
      {/* LEFT: Visual Brand Anchor */}
      <div className="relative w-full lg:w-[40%] min-h-[300px] lg:min-h-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
          style={{ backgroundImage: "url('/images/vision-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
        
        {/* Vertically centered title that works on all screens */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-white/20 text-[12vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-none select-none">
            Values
          </h2>
        </div>
        
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <div className="w-12 h-[2px] bg-secondary-400 mb-4"></div>
          <h3 className="text-2xl font-black text-white uppercase tracking-widest">Our North Star</h3>
          <p className="text-primary-100/60 text-sm mt-2">Guiding every clinical decision we make.</p>
        </div>
      </div>

      {/* RIGHT: Content Area */}
      <div className="flex-1 bg-white px-8 md:px-20 py-20 flex flex-col justify-center gap-8">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.id];
          return (
            <div
              key={item.id}
              className="group flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-[2rem] hover:bg-slate-50 transition-all duration-500 border border-transparent hover:border-slate-100"
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              <div 
                className="w-20 h-20 rounded-3xl flex-shrink-0 flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                style={{ background: item.colorValue }}
              >
                <IconComponent />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-500 leading-relaxed text-sm max-w-lg">
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