'use client';
import React from 'react';

const certifications = [
  {
    title: 'NABL Accredited',
    desc: '',
    icon: (
      <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="65" cy="65" r="60" fill="#e8f4fd" stroke="#0284c7" strokeWidth="2.5"/>
        <circle cx="65" cy="65" r="50" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M65 22 L92 34 L92 60 Q92 80 65 92 Q38 80 38 60 L38 34 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M65 29 L86 39 L86 60 Q86 76 65 86 Q44 76 44 60 L44 39 Z" fill="#fff" stroke="#0284c7" strokeWidth="1.8" strokeLinejoin="round"/>
        <polyline points="52,61 61,72 78,50" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="44" y="92" width="42" height="16" rx="8" fill="#0284c7"/>
        <text x="65" y="104" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Arial,sans-serif" letterSpacing="1.5">NABL</text>
        <circle cx="65" cy="29" r="6" fill="#16a34a"/>
      </svg>
    ),
  },
  {
    title: 'ISO 15189:2012',
    desc: '',
    icon: (
      <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="65" cy="65" r="60" fill="#e8f4fd" stroke="#0284c7" strokeWidth="2.5"/>
        <circle cx="65" cy="65" r="50" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="65" cy="58" r="22" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.2"/>
        <circle cx="65" cy="58" r="14" fill="#fff" stroke="#0284c7" strokeWidth="2"/>
        <rect x="62" y="32" width="6" height="8" rx="2" fill="#0284c7"/>
        <rect x="62" y="76" width="6" height="8" rx="2" fill="#0284c7"/>
        <rect x="34" y="55" width="8" height="6" rx="2" fill="#0284c7"/>
        <rect x="78" y="55" width="8" height="6" rx="2" fill="#0284c7"/>
        <rect x="42" y="38" width="6" height="8" rx="2" fill="#0284c7" transform="rotate(45 45 42)"/>
        <rect x="76" y="38" width="6" height="8" rx="2" fill="#0284c7" transform="rotate(-45 79 42)"/>
        <rect x="42" y="68" width="6" height="8" rx="2" fill="#0284c7" transform="rotate(-45 45 72)"/>
        <rect x="76" y="68" width="6" height="8" rx="2" fill="#0284c7" transform="rotate(45 79 72)"/>
        <text x="65" y="63" textAnchor="middle" fontSize="11" fontWeight="900" fill="#16a34a" fontFamily="Arial,sans-serif">ISO</text>
        <rect x="38" y="88" width="54" height="16" rx="8" fill="#16a34a"/>
        <text x="65" y="100" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Arial,sans-serif" letterSpacing="1">15189:2012</text>
      </svg>
    ),
  },
  {
    title: 'CAP Certified',
    desc: '',
    icon: (
      <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="65" cy="65" r="60" fill="#e8f4fd" stroke="#0284c7" strokeWidth="2.5"/>
        <circle cx="65" cy="65" r="50" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="65" cy="50" r="26" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5"/>
        <circle cx="65" cy="50" r="19" fill="#fff" stroke="#0284c7" strokeWidth="1.8"/>
        <text x="65" y="55" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0284c7" fontFamily="Arial,sans-serif">CAP</text>
        <path d="M50 72 L42 95 L55 87 L60 98 L65 76Z" fill="#16a34a" stroke="#16a34a" strokeLinejoin="round"/>
        <path d="M80 72 L88 95 L75 87 L70 98 L65 76Z" fill="#0284c7" stroke="#0284c7" strokeLinejoin="round"/>
        <circle cx="65" cy="50" r="8" fill="#16a34a" opacity="0.15"/>
        <polygon points="65,38 67.5,46 76,46 69.5,51 72,59 65,54 58,59 60.5,51 54,46 62.5,46" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function OurAchievements() {
  return (
    <section className="w-full bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary-600 font-black uppercase tracking-[0.3em] text-xs">Accreditations</span>
          <h2 className="text-4xl font-heading font-black text-slate-900">Certified Excellence</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="group bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-white hover:border-primary-100 text-center"
            >
              <div className="relative mb-8 flex justify-center">
                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-primary-50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full blur-xl opacity-50"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  {cert.icon}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{cert.title}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global Standards</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}