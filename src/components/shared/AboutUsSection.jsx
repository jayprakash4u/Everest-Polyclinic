'use client';

export default function AboutUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-center">
          
          {/* LEFT SIDE - Dark Blue with Abstract Patterns */}
          <div className="relative bg-slate-900 overflow-hidden p-8 md:p-12 min-h-[500px] flex flex-col justify-center">
            {/* Abstract circular patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-400/8 rounded-full blur-xl" />
            
            <div className="relative z-10">
              {/* Small heading */}
              <p className="text-teal-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Who We Are
              </p>
              
              {/* Main title with highlighted "Us" */}
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                About <span className="text-teal-400">Us</span>
              </h2>
              
              {/* Description */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Our dedicated team of healthcare professionals provides compassionate, expert-led services with a commitment to excellence in patient care. We combine advanced medical technology with personalized attention to deliver outcomes that matter.
              </p>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                From preventive health screenings to complex surgical procedures, we offer a comprehensive range of services designed to keep you and your family healthy. Every patient is treated with dignity, respect, and the highest standard of medical care.
              </p>
              
              {/* Statistics Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">10+</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="text-center border-l border-slate-700">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">5K+</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Patients Served</div>
                </div>
                <div className="text-center border-l border-slate-700">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Specialists</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Light Background with Doctor Image */}
          <div className="relative bg-slate-50 rounded-2xl p-4 md:p-8 flex items-end justify-center min-h-[500px]">
            {/* Doctor Image */}
            <div className="relative w-full max-w-md">
              <img
                src="/images/doctors/female-doctor-arms-crossed.jpg"
                alt="Dr. Sarah Mitchell - Chief Medical Officer"
                className="w-full h-auto object-cover rounded-xl shadow-2xl"
              />
              
              {/* Floating Name Card */}
              <div className="absolute -bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-slate-700/50">
                <h3 className="text-white font-heading font-bold text-xl mb-1">
                  Dr. Sarah Mitchell
                </h3>
                <p className="text-teal-400 text-sm font-medium">
                  Chief Medical Officer
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
