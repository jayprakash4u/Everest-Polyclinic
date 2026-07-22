import React from "react";

const departments = [
  {
    title: "Orthopaedics",
    desc: "Expert diagnosis and treatment of bone and joint disorders.",
    svg: <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />,
  },
  {
    title: "Oncology",
    desc: "Comprehensive care and advanced treatment for cancer patients.",
    svg: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    ),
  },
  {
    title: "Pediatrics",
    desc: "Specialized medical care for infants, children, and adolescents.",
    svg: (
      <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.71 3.31-2 6-2z" />
    ),
  },
  {
    title: "Dermatology",
    desc: "Advanced treatment for all types of skin and hair conditions.",
    svg: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    ),
  },
  {
    title: "Physiotherapy",
    desc: "Rehabilitation and physical therapy for optimal recovery.",
    svg: (
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
    ),
  },
  {
    title: "Anaesthesia",
    desc: "Expert pain management and surgical anesthesia services.",
    svg: (
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
    ),
  },
];

export default function CenterOfExcellenceSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-[#0a2342] px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,95,168,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="container relative z-10 mx-auto">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="font-heading text-xl font-semibold text-primary-300 sm:text-2xl md:text-[28px]">
            Center of Excellence
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-10 bg-primary-400" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {departments.map((dept) => (
            <div
              key={dept.title}
              className="flex items-center gap-3 rounded-lg border border-primary-500/20 bg-white/[0.02] p-4 transition-transform duration-200 hover:-translate-y-0.5 sm:gap-4 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-primary-400/30 bg-primary-500/10 sm:h-[60px] sm:w-[60px]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-primary-400 sm:h-8 sm:w-8"
                >
                  {dept.svg}
                </svg>
              </div>
              <div className="min-w-0 text-left">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-[15px]">
                  {dept.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-300/80 sm:max-w-none">
                  {dept.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
