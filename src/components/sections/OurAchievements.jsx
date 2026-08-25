"use client";

const certifications = [
  {
    title: "NABL Accredited",
    desc: "",
    icon: (
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 sm:h-24 sm:w-24 md:h-[130px] md:w-[130px]"
      >
        <circle
          cx="65"
          cy="65"
          r="60"
          fill="#e8f4fd"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <circle
          cx="65"
          cy="65"
          r="50"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M65 22 L92 34 L92 60 Q92 80 65 92 Q38 80 38 60 L38 34 Z"
          fill="#bae6fd"
          stroke="#0284c7"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M65 29 L86 39 L86 60 Q86 76 65 86 Q44 76 44 60 L44 39 Z"
          fill="#fff"
          stroke="#0284c7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <polyline
          points="52,61 61,72 78,50"
          fill="none"
          stroke="#16a34a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="44" y="92" width="42" height="16" rx="8" fill="#0284c7" />
        <text
          x="65"
          y="104"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#fff"
          fontFamily="Arial,sans-serif"
          letterSpacing="1.5"
        >
          NABL
        </text>
        <circle cx="65" cy="29" r="6" fill="#16a34a" />
      </svg>
    ),
  },
  {
    title: "ISO 15189:2012",
    desc: "",
    icon: (
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 sm:h-24 sm:w-24 md:h-[130px] md:w-[130px]"
      >
        <circle
          cx="65"
          cy="65"
          r="60"
          fill="#e8f4fd"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <circle
          cx="65"
          cy="65"
          r="50"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="65"
          cy="58"
          r="22"
          fill="#bae6fd"
          stroke="#0284c7"
          strokeWidth="2.2"
        />
        <circle
          cx="65"
          cy="58"
          r="14"
          fill="#fff"
          stroke="#0284c7"
          strokeWidth="2"
        />
        <rect x="62" y="32" width="6" height="8" rx="2" fill="#0284c7" />
        <rect x="62" y="76" width="6" height="8" rx="2" fill="#0284c7" />
        <rect x="34" y="55" width="8" height="6" rx="2" fill="#0284c7" />
        <rect x="78" y="55" width="8" height="6" rx="2" fill="#0284c7" />
        <rect
          x="42"
          y="38"
          width="6"
          height="8"
          rx="2"
          fill="#0284c7"
          transform="rotate(45 45 42)"
        />
        <rect
          x="76"
          y="38"
          width="6"
          height="8"
          rx="2"
          fill="#0284c7"
          transform="rotate(-45 79 42)"
        />
        <rect
          x="42"
          y="68"
          width="6"
          height="8"
          rx="2"
          fill="#0284c7"
          transform="rotate(-45 45 72)"
        />
        <rect
          x="76"
          y="68"
          width="6"
          height="8"
          rx="2"
          fill="#0284c7"
          transform="rotate(45 79 72)"
        />
        <text
          x="65"
          y="63"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fill="#16a34a"
          fontFamily="Arial,sans-serif"
        >
          ISO
        </text>
        <rect x="38" y="88" width="54" height="16" rx="8" fill="#16a34a" />
        <text
          x="65"
          y="100"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#fff"
          fontFamily="Arial,sans-serif"
          letterSpacing="1"
        >
          15189:2012
        </text>
      </svg>
    ),
  },
  {
    title: "CAP Certified",
    desc: "",
    icon: (
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 sm:h-24 sm:w-24 md:h-[130px] md:w-[130px]"
      >
        <circle
          cx="65"
          cy="65"
          r="60"
          fill="#e8f4fd"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <circle
          cx="65"
          cy="65"
          r="50"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="65"
          cy="50"
          r="26"
          fill="#bae6fd"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <circle
          cx="65"
          cy="50"
          r="19"
          fill="#fff"
          stroke="#0284c7"
          strokeWidth="1.8"
        />
        <text
          x="65"
          y="55"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0284c7"
          fontFamily="Arial,sans-serif"
        >
          CAP
        </text>
        <path
          d="M50 72 L42 95 L55 87 L60 98 L65 76Z"
          fill="#16a34a"
          stroke="#16a34a"
          strokeLinejoin="round"
        />
        <path
          d="M80 72 L88 95 L75 87 L70 98 L65 76Z"
          fill="#0284c7"
          stroke="#0284c7"
          strokeLinejoin="round"
        />
        <circle cx="65" cy="50" r="8" fill="#16a34a" opacity="0.15" />
        <polygon
          points="65,38 67.5,46 76,46 69.5,51 72,59 65,54 58,59 60.5,51 54,46 62.5,46"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function OurAchievements() {
  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <span className="flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-secondary-600 sm:text-xs">
            <span className="h-px w-6 bg-secondary-400" />
            Accreditations
            <span className="h-px w-6 bg-secondary-400" />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black text-primary-900 sm:text-3xl md:text-4xl">
            Certified <span className="text-secondary-600">Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 md:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group rounded-2xl border border-white bg-white p-4 text-center shadow-sm transition-all duration-500 hover:border-primary-100 hover:shadow-2xl sm:rounded-[2rem] sm:p-6 md:rounded-[3rem] md:p-10 ${
                index === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="relative mb-3 flex justify-center sm:mb-6 md:mb-8">
                <div className="absolute inset-0 scale-0 rounded-full bg-primary-50 opacity-50 blur-xl transition-transform duration-500 group-hover:scale-100" />
                <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
                  {cert.icon}
                </div>
              </div>
              <h3 className="mb-1 text-[13px] font-black text-primary-900 sm:mb-2 sm:text-lg md:text-xl">
                {cert.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                Global Standards
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
