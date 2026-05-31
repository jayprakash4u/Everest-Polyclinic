// ============================================================
// DEPARTMENT ICONS — 35 React SVG Components
// Palette: #22c55e (primary green) + #86efac (light green)
// Background card: #0c4a6e  |  Page bg: #071c2e
// Usage: <CardiologyIcon width={48} height={48} />
// ============================================================

const d = {
  width: 48, height: 48, viewBox: "0 0 52 52",
  fill: "none", xmlns: "http://www.w3.org/2000/svg",
};
const S  = { fill:"none", stroke:"#22c55e", strokeWidth:2,   strokeLinecap:"round", strokeLinejoin:"round" };
const SL = { fill:"none", stroke:"#86efac", strokeWidth:1.5, strokeLinecap:"round", strokeLinejoin:"round" };

export const GeneralMedicineIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="19" r="8" {...S}/>
    <path d="M13 44 Q13 32 26 32 Q39 32 39 44" {...S}/>
    <line x1="26" y1="11" x2="26" y2="6" {...SL}/>
    <line x1="32" y1="13" x2="35" y2="10" {...SL}/>
    <line x1="20" y1="13" x2="17" y2="10" {...SL}/>
    <circle cx="26" cy="6"  r="2" fill="#22c55e"/>
    <circle cx="35" cy="10" r="2" fill="#22c55e"/>
    <circle cx="17" cy="10" r="2" fill="#22c55e"/>
  </svg>
);

export const DermatologyIcon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="26" cy="26" rx="15" ry="18" {...S}/>
    <path d="M17 17 Q21 12 26 14 Q31 12 35 17" {...SL}/>
    <ellipse cx="26" cy="26" rx="6" ry="7" fill="#22c55e" opacity={0.35}/>
    <path d="M19 33 Q22 38 26 36 Q30 38 33 33" {...SL}/>
    <circle cx="22" cy="22" r="1.5" fill="#86efac" opacity={0.7}/>
    <circle cx="30" cy="22" r="1.5" fill="#86efac" opacity={0.7}/>
    <circle cx="26" cy="30" r="1.5" fill="#86efac" opacity={0.7}/>
  </svg>
);

export const PulmonaryIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26 10 Q15 14 13 23 Q11 32 17 38 Q21 43 26 41 Q31 43 35 38 Q41 32 39 23 Q37 14 26 10Z" {...S}/>
    <path d="M15 23 Q19 21 21 25 Q23 21 26 25 Q29 21 31 25 Q33 21 37 23" {...SL}/>
    <line x1="26" y1="10" x2="26" y2="6" {...SL}/>
    <circle cx="26" cy="6" r="2" fill="#22c55e"/>
  </svg>
);

export const CardiologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26 40 Q10 30 10 21 Q10 12 19 12 Q23 12 26 17 Q29 12 33 12 Q42 12 42 21 Q42 30 26 40Z" {...S}/>
    <polyline points="12,26 17,26 20,19 24,33 27,23 30,28 33,26 40,26" {...SL}/>
  </svg>
);

export const ClinicalOncologyIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="13" {...S}/>
    <circle cx="26" cy="26" r="5" fill="#22c55e" opacity={0.35}/>
    <line x1="26" y1="8"  x2="26" y2="13" {...SL}/>
    <line x1="26" y1="39" x2="26" y2="44" {...SL}/>
    <line x1="8"  y1="26" x2="13" y2="26" {...SL}/>
    <line x1="39" y1="26" x2="44" y2="26" {...SL}/>
    <line x1="12" y1="12" x2="16" y2="16" {...SL}/>
    <line x1="36" y1="36" x2="40" y2="40" {...SL}/>
    <line x1="40" y1="12" x2="36" y2="16" {...SL}/>
    <line x1="12" y1="40" x2="16" y2="36" {...SL}/>
    <circle cx="26" cy="8"  r="2" fill="#22c55e"/>
    <circle cx="26" cy="44" r="2" fill="#22c55e"/>
    <circle cx="8"  cy="26" r="2" fill="#22c55e"/>
    <circle cx="44" cy="26" r="2" fill="#22c55e"/>
  </svg>
);

export const GastroSurgeryIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M19 9 L19 21 L14 28 L14 43 L38 43 L38 28 L33 21 L33 9 Z" {...S}/>
    <line x1="19" y1="9" x2="33" y2="9" {...S}/>
    <rect x="19" y="30" width="14" height="11" rx="2" fill="#22c55e" opacity={0.35}/>
    <line x1="14" y1="28" x2="38" y2="28" {...SL}/>
    <line x1="26" y1="30" x2="26" y2="41" {...SL}/>
  </svg>
);

export const GeneralSurgeryIcon = (p) => (
  <svg {...d} {...p}>
    <line x1="12" y1="18" x2="40" y2="18" {...S}/>
    <line x1="12" y1="26" x2="40" y2="26" {...S}/>
    <path d="M12 18 Q8 22 12 26" {...S}/>
    <path d="M40 18 Q44 22 40 26" {...S}/>
    <line x1="26" y1="26" x2="26" y2="44" {...S}/>
    <path d="M20 34 Q23 30 26 32 Q29 30 32 34" {...SL}/>
    <circle cx="26" cy="44" r="3" fill="#22c55e" opacity={0.35}/>
    <rect x="22" y="8" width="8" height="10" rx="2" {...S}/>
    <line x1="26" y1="8" x2="26" y2="6" {...SL}/>
  </svg>
);

export const NeuroMedicineIcon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="26" cy="17" rx="11" ry="9" {...S}/>
    <path d="M17 24 Q12 30 14 37 Q16 42 21 42" {...S}/>
    <path d="M35 24 Q40 30 38 37 Q36 42 31 42" {...S}/>
    <path d="M21 42 Q23 46 26 44 Q29 46 31 42" {...SL}/>
    <circle cx="26" cy="17" r="4" fill="#22c55e" opacity={0.35}/>
    <line x1="22" y1="12" x2="30" y2="12" {...SL}/>
  </svg>
);

export const NeurosurgeryIcon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="26" cy="17" rx="11" ry="9" {...S}/>
    <path d="M17 24 Q12 30 14 37 Q16 42 21 42" {...S}/>
    <path d="M35 24 Q40 30 38 37 Q36 42 31 42" {...S}/>
    <path d="M21 42 Q23 46 26 44 Q29 46 31 42" {...SL}/>
    <line x1="20" y1="10" x2="32" y2="24" stroke="#22c55e" strokeWidth={2} strokeLinecap="round"/>
    <line x1="32" y1="10" x2="20" y2="24" stroke="#22c55e" strokeWidth={2} strokeLinecap="round"/>
  </svg>
);

export const NuclearMedicineIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="7" fill="#22c55e" opacity={0.35}/>
    <ellipse cx="26" cy="26" rx="18" ry="7" {...S}/>
    <ellipse cx="26" cy="26" rx="18" ry="7" {...S} transform="rotate(60 26 26)"/>
    <ellipse cx="26" cy="26" rx="18" ry="7" {...S} transform="rotate(120 26 26)"/>
    <circle cx="26" cy="26" r="3" fill="#22c55e"/>
  </svg>
);

export const PlasticSurgeryIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M22 9 Q17 14 17 21 Q17 30 26 37 Q35 30 35 21 Q35 14 30 9 Q26 7 22 9Z" {...S}/>
    <path d="M21 23 Q23 28 26 26 Q29 28 31 23" {...SL}/>
    <path d="M23 37 Q21 43 19 45" {...SL}/>
    <path d="M29 37 Q31 43 33 45" {...SL}/>
    <circle cx="19" cy="45" r="2" fill="#22c55e"/>
    <circle cx="33" cy="45" r="2" fill="#22c55e"/>
  </svg>
);

export const DiabetesIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="21" r="9" {...S}/>
    <path d="M19 38 Q14 40 14 45 L38 45 Q38 40 33 38" {...S}/>
    <line x1="26" y1="12" x2="26" y2="7"  {...SL}/>
    <line x1="33" y1="14" x2="37" y2="10" {...SL}/>
    <line x1="19" y1="14" x2="15" y2="10" {...SL}/>
    <circle cx="26" cy="7"  r="2" fill="#22c55e"/>
    <circle cx="37" cy="10" r="2" fill="#22c55e"/>
    <circle cx="15" cy="10" r="2" fill="#22c55e"/>
    <circle cx="26" cy="21" r="3" fill="#22c55e" opacity={0.35}/>
  </svg>
);

export const NephrologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M19 10 Q12 15 12 24 Q12 35 21 39 Q26 42 31 39 Q40 35 40 24 Q40 15 33 10 Q29 8 25 10 Z" {...S}/>
    <circle cx="26" cy="24" r="6" fill="#22c55e" opacity={0.35}/>
    <path d="M19 37 L17 45" {...SL}/>
    <path d="M33 37 L35 45" {...SL}/>
    <circle cx="17" cy="45" r="2" fill="#22c55e"/>
    <circle cx="35" cy="45" r="2" fill="#22c55e"/>
  </svg>
);

export const GeneticIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M20 8 Q26 4 32 8 L34 28 Q34 34 26 36 Q18 34 18 28 Z" {...S}/>
    <line x1="22" y1="28" x2="22" y2="22" {...SL}/>
    <line x1="22" y1="22" x2="30" y2="22" {...SL}/>
    <line x1="30" y1="22" x2="30" y2="28" {...SL}/>
    <line x1="21" y1="36" x2="17" y2="44" {...SL}/>
    <line x1="31" y1="36" x2="35" y2="44" {...SL}/>
    <line x1="22" y1="8"  x2="18" y2="4"  {...SL}/>
    <line x1="30" y1="8"  x2="34" y2="4"  {...SL}/>
    <circle cx="17" cy="44" r="2" fill="#22c55e"/>
    <circle cx="35" cy="44" r="2" fill="#22c55e"/>
  </svg>
);

export const UrologyIcon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="26" cy="30" rx="9" ry="11" {...S}/>
    <path d="M19 24 Q17 15 21 10 Q26 7 31 10 Q35 15 33 24" {...S}/>
    <line x1="26" y1="19" x2="26" y2="24" {...SL}/>
    <rect x="22" y="38" width="8" height="7" rx="2" fill="#22c55e" opacity={0.35}/>
    <line x1="22" y1="38" x2="30" y2="38" {...S}/>
  </svg>
);

export const HepatologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M14 22 Q13 13 26 10 Q39 13 38 22 Q38 35 26 42 Q14 35 14 22Z" {...S}/>
    <path d="M19 24 Q21 29 26 27 Q31 29 33 24" {...SL}/>
    <circle cx="26" cy="19" r="3" fill="#22c55e" opacity={0.35}/>
    <line x1="26" y1="42" x2="26" y2="47" {...SL}/>
    <circle cx="26" cy="47" r="2" fill="#22c55e"/>
  </svg>
);

export const PhysiotherapyIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="11" r="5" {...S}/>
    <line x1="26" y1="16" x2="26" y2="30" {...S}/>
    <line x1="14" y1="22" x2="38" y2="22" {...S}/>
    <line x1="26" y1="30" x2="18" y2="44" {...S}/>
    <line x1="26" y1="30" x2="34" y2="44" {...S}/>
    <circle cx="18" cy="44" r="3" fill="#22c55e" opacity={0.35}/>
    <circle cx="34" cy="44" r="3" fill="#22c55e" opacity={0.35}/>
    <path d="M14 22 Q18 17 26 18 Q34 17 38 22" {...SL}/>
  </svg>
);

export const CardiothoracicIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26 40 Q10 30 10 21 Q10 12 19 12 Q23 12 26 17 Q29 12 33 12 Q42 12 42 21 Q42 30 26 40Z" {...S}/>
    <line x1="17" y1="18" x2="17" y2="30" {...SL}/>
    <line x1="35" y1="18" x2="35" y2="30" {...SL}/>
    <line x1="17" y1="24" x2="35" y2="24" {...SL}/>
    <circle cx="17" cy="18" r="2" fill="#22c55e"/>
    <circle cx="35" cy="18" r="2" fill="#22c55e"/>
  </svg>
);

export const PsychiatricIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="18" r="10" {...S}/>
    <path d="M19 25 Q17 32 19 38 Q21 43 26 43 Q31 43 33 38 Q35 32 33 25" {...S}/>
    <path d="M21 18 Q23 23 26 21 Q29 23 31 18" {...SL}/>
    <line x1="22" y1="11" x2="22" y2="7" {...SL}/>
    <line x1="30" y1="11" x2="30" y2="7" {...SL}/>
    <circle cx="22" cy="7" r="2" fill="#22c55e"/>
    <circle cx="30" cy="7" r="2" fill="#22c55e"/>
  </svg>
);

export const GastroenterologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M17 13 L17 25 L12 32 L12 43 L40 43 L40 32 L35 25 L35 13 Z" {...S}/>
    <line x1="17" y1="13" x2="35" y2="13" {...S}/>
    <path d="M14 34 Q19 30 26 32 Q33 30 38 34" {...SL}/>
    <circle cx="26" cy="39" r="3" fill="#22c55e" opacity={0.35}/>
  </svg>
);

export const ENTIcon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="26" cy="30" rx="11" ry="9" {...S}/>
    <path d="M19 24 Q17 17 19 12 Q22 8 26 8 Q30 8 33 12 Q35 17 33 24" {...S}/>
    <circle cx="26" cy="28" r="3" fill="#22c55e" opacity={0.35}/>
    <line x1="19" y1="32" x2="12" y2="39" {...SL}/>
    <line x1="33" y1="32" x2="40" y2="39" {...SL}/>
    <circle cx="12" cy="39" r="2" fill="#22c55e"/>
    <circle cx="40" cy="39" r="2" fill="#22c55e"/>
  </svg>
);

export const DentalSurgeryIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M15 32 Q15 23 19 18 Q23 13 30 15 Q37 17 37 27 Q37 36 30 40 Q23 43 19 38 Z" {...S}/>
    <path d="M19 38 L14 45" {...SL}/>
    <path d="M21 25 Q23 30 27 28 Q32 25 30 20" {...SL}/>
    <line x1="25" y1="13" x2="27" y2="7"  {...SL}/>
    <line x1="31" y1="15" x2="36" y2="9"  {...SL}/>
    <circle cx="27" cy="7"  r="2" fill="#22c55e"/>
    <circle cx="36" cy="9"  r="2" fill="#22c55e"/>
  </svg>
);

export const OrthopedicIcon = (p) => (
  <svg {...d} {...p}>
    <line x1="26" y1="7"  x2="26" y2="45" {...S}/>
    <line x1="7"  y1="26" x2="45" y2="26" {...S}/>
    <line x1="13" y1="13" x2="39" y2="39" {...SL}/>
    <line x1="39" y1="13" x2="13" y2="39" {...SL}/>
    <circle cx="26" cy="26" r="8" {...S}/>
    <circle cx="26" cy="26" r="3" fill="#22c55e" opacity={0.35}/>
  </svg>
);

export const ARTIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="22" r="11" {...S}/>
    <path d="M19 31 Q17 38 19 43" {...S}/>
    <path d="M33 31 Q35 38 33 43" {...S}/>
    <line x1="19" y1="43" x2="33" y2="43" {...S}/>
    <circle cx="22" cy="20" r="2.5" fill="#22c55e" opacity={0.35}/>
    <circle cx="30" cy="20" r="2.5" fill="#22c55e" opacity={0.35}/>
    <path d="M22 26 Q24 29 26 28 Q28 29 30 26" {...SL}/>
  </svg>
);

export const AnaesthesiologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M15 15 Q15 10 19 10 L33 10 Q37 10 37 15 L37 30 Q37 42 26 44 Q15 42 15 30 Z" {...S}/>
    <rect x="21" y="21" width="10" height="12" rx="1" fill="#22c55e" opacity={0.35}/>
    <line x1="23" y1="10" x2="23" y2="21" {...SL}/>
    <line x1="29" y1="10" x2="29" y2="21" {...SL}/>
    <line x1="9"  y1="19" x2="15" y2="19" {...SL}/>
    <line x1="37" y1="19" x2="43" y2="19" {...SL}/>
    <circle cx="9"  cy="19" r="2" fill="#22c55e"/>
    <circle cx="43" cy="19" r="2" fill="#22c55e"/>
  </svg>
);

export const RadiologyIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="9" y="9" width="34" height="34" rx="5" {...S}/>
    <circle cx="26" cy="26" r="9" {...S}/>
    <circle cx="26" cy="26" r="3" fill="#22c55e" opacity={0.35}/>
    <line x1="26" y1="9"  x2="26" y2="17" {...SL}/>
    <line x1="26" y1="35" x2="26" y2="43" {...SL}/>
    <line x1="9"  y1="26" x2="17" y2="26" {...SL}/>
    <line x1="35" y1="26" x2="43" y2="26" {...SL}/>
  </svg>
);

export const EmergencyMedicineIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="11" y="11" width="30" height="30" rx="5" {...S}/>
    <rect x="20" y="16" width="12" height="20" rx="1" fill="#22c55e" opacity={0.35}/>
    <rect x="16" y="20" width="20" height="12" rx="1" fill="#22c55e" opacity={0.35}/>
    <line x1="26" y1="7"  x2="26" y2="11" {...SL}/>
    <line x1="26" y1="41" x2="26" y2="45" {...SL}/>
    <line x1="7"  y1="26" x2="11" y2="26" {...SL}/>
    <line x1="41" y1="26" x2="45" y2="26" {...SL}/>
    <circle cx="26" cy="7"  r="2" fill="#22c55e"/>
    <circle cx="26" cy="45" r="2" fill="#22c55e"/>
    <circle cx="7"  cy="26" r="2" fill="#22c55e"/>
    <circle cx="45" cy="26" r="2" fill="#22c55e"/>
  </svg>
);

export const MedicalRecordIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="10" y="13" width="32" height="30" rx="3" {...S}/>
    <rect x="19" y="8"  width="14" height="7" rx="2" {...S}/>
    <line x1="17" y1="22" x2="35" y2="22" {...SL}/>
    <line x1="17" y1="28" x2="30" y2="28" {...SL}/>
    <line x1="17" y1="34" x2="32" y2="34" {...SL}/>
    <line x1="17" y1="22" x2="17" y2="34" {...SL}/>
  </svg>
);

export const LiverIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M13 23 Q12 13 26 10 Q40 13 40 23 Q40 37 26 44 Q13 37 13 23Z" {...S}/>
    <path d="M18 25 Q21 31 26 29 Q31 31 34 25" {...SL}/>
    <circle cx="26" cy="19" r="4" fill="#22c55e" opacity={0.35}/>
    <path d="M21 42 Q19 46 17 47" {...SL}/>
    <path d="M31 42 Q33 46 35 47" {...SL}/>
    <circle cx="17" cy="47" r="2" fill="#22c55e"/>
    <circle cx="35" cy="47" r="2" fill="#22c55e"/>
  </svg>
);

export const PathologyIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="12" y="9" width="28" height="34" rx="3" {...S}/>
    <circle cx="26" cy="22" r="7" {...S}/>
    <circle cx="26" cy="22" r="3" fill="#22c55e" opacity={0.35}/>
    <line x1="16" y1="34" x2="36" y2="34" {...SL}/>
    <line x1="16" y1="39" x2="28" y2="39" {...SL}/>
    <line x1="24" y1="15" x2="24" y2="9"  {...SL}/>
    <line x1="28" y1="15" x2="28" y2="9"  {...SL}/>
  </svg>
);

export const GynaecologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26 42 Q11 33 11 23 Q11 13 18 11 Q23 9 26 14 Q29 9 34 11 Q41 13 41 23 Q41 33 26 42Z" {...S}/>
    <circle cx="20" cy="21" r="3.5" fill="#22c55e" opacity={0.35}/>
    <circle cx="32" cy="21" r="3.5" fill="#22c55e" opacity={0.35}/>
    <path d="M18 30 Q21 35 26 33 Q31 35 34 30" {...SL}/>
  </svg>
);

export const EyeIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M5 26 Q14 12 26 12 Q38 12 47 26 Q38 40 26 40 Q14 40 5 26Z" {...S}/>
    <circle cx="26" cy="26" r="8" {...S}/>
    <circle cx="26" cy="26" r="4" fill="#22c55e" opacity={0.35}/>
    <circle cx="23" cy="23" r="1.5" fill="#86efac"/>
  </svg>
);

export const GeriatricsIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="15" r="7" {...S}/>
    <path d="M15 44 L15 33 Q15 26 26 26 Q37 26 37 33 L37 44" {...S}/>
    <line x1="10" y1="37" x2="15" y2="37" {...SL}/>
    <line x1="37" y1="37" x2="42" y2="37" {...SL}/>
    <line x1="10" y1="44" x2="42" y2="44" {...S}/>
    <circle cx="10" cy="37" r="2" fill="#22c55e"/>
    <circle cx="42" cy="37" r="2" fill="#22c55e"/>
  </svg>
);

export const CovidIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="11" {...S}/>
    <circle cx="26" cy="26" r="5" fill="#22c55e" opacity={0.35}/>
    <line x1="26" y1="7"  x2="26" y2="15" {...SL}/>
    <line x1="26" y1="37" x2="26" y2="45" {...SL}/>
    <line x1="7"  y1="26" x2="15" y2="26" {...SL}/>
    <line x1="37" y1="26" x2="45" y2="26" {...SL}/>
    <line x1="12" y1="12" x2="18" y2="18" {...SL}/>
    <line x1="34" y1="34" x2="40" y2="40" {...SL}/>
    <line x1="40" y1="12" x2="34" y2="18" {...SL}/>
    <line x1="12" y1="40" x2="18" y2="34" {...SL}/>
    <circle cx="26" cy="7"  r="3" fill="#22c55e"/>
    <circle cx="26" cy="45" r="3" fill="#22c55e"/>
    <circle cx="7"  cy="26" r="3" fill="#22c55e"/>
    <circle cx="45" cy="26" r="3" fill="#22c55e"/>
    <circle cx="11" cy="11" r="3" fill="#22c55e"/>
    <circle cx="41" cy="41" r="3" fill="#22c55e"/>
    <circle cx="41" cy="11" r="3" fill="#22c55e"/>
    <circle cx="11" cy="41" r="3" fill="#22c55e"/>
  </svg>
);

export const LibraryIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="9"  y="13" width="34" height="26" rx="3" {...S}/>
    <line x1="26" y1="13" x2="26" y2="39" {...SL}/>
    <line x1="15" y1="20" x2="23" y2="20" {...SL}/>
    <line x1="15" y1="26" x2="23" y2="26" {...SL}/>
    <line x1="15" y1="32" x2="21" y2="32" {...SL}/>
    <line x1="29" y1="20" x2="37" y2="20" {...SL}/>
    <line x1="29" y1="26" x2="37" y2="26" {...SL}/>
    <line x1="29" y1="32" x2="35" y2="32" {...SL}/>
    <line x1="9"  y1="29" x2="5"  y2="34" {...SL}/>
    <line x1="43" y1="29" x2="47" y2="34" {...SL}/>
    <circle cx="5"  cy="34" r="2" fill="#22c55e"/>
    <circle cx="47" cy="34" r="2" fill="#22c55e"/>
  </svg>
);

// ─────────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────────
export const DEPARTMENT_ICON_MAP = {
  "General Medicine":       GeneralMedicineIcon,
  "Dermatology":            DermatologyIcon,
  "Pulmonary":              PulmonaryIcon,
  "Cardiology":             CardiologyIcon,
  "Clinical Oncology":      ClinicalOncologyIcon,
  "Gastro Surgery":         GastroSurgeryIcon,
  "General Surgery":        GeneralSurgeryIcon,
  "Neuro Medicine":         NeuroMedicineIcon,
  "Neurosurgery":           NeurosurgeryIcon,
  "Nuclear Medicine":       NuclearMedicineIcon,
  "Plastic Surgery":        PlasticSurgeryIcon,
  "Diabetes & Endocrine":   DiabetesIcon,
  "Nephrology":             NephrologyIcon,
  "Genetic":                GeneticIcon,
  "Urology":                UrologyIcon,
  "Hepatology":             HepatologyIcon,
  "Physiotherapy":          PhysiotherapyIcon,
  "Cardiothoracic Surgery": CardiothoracicIcon,
  "Psychiatric":            PsychiatricIcon,
  "Gastroenterology":       GastroenterologyIcon,
  "ENT":                    ENTIcon,
  "Dental Surgery":         DentalSurgeryIcon,
  "Orthopedic":             OrthopedicIcon,
  "ART":                    ARTIcon,
  "Anaesthesiology":        AnaesthesiologyIcon,
  "Radiology":              RadiologyIcon,
  "Emergency Medicine":     EmergencyMedicineIcon,
  "Medical Record":         MedicalRecordIcon,
  "Liver":                  LiverIcon,
  "Pathology":              PathologyIcon,
  "Gynaecology":            GynaecologyIcon,
  "Eye":                    EyeIcon,
  "Geriatrics":             GeriatricsIcon,
  "Covid-19":               CovidIcon,
  "Library":                LibraryIcon,
};

export const EmergencyIcon = (p) => (
  <svg {...d} {...p}>
    <polygon points="26,12 18,30 24,30 20,44 32,26 26,26 30,12" fill="#2ecc8a"/>
  </svg>
);

export const OPDIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="20" r="10" {...S}/>
    <line x1="26" y1="30" x2="26" y2="42" {...S}/>
    <line x1="26" y1="35" x2="19" y2="31" {...S}/>
    <line x1="26" y1="35" x2="33" y2="31" {...S}/>
    <line x1="26" y1="42" x2="21" y2="49" {...S}/>
    <line x1="26" y1="42" x2="31" y2="49" {...S}/>
  </svg>
);

export const IPDIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="14" y="32" width="24" height="10" rx="2" {...S}/>
    <rect x="14" y="24" width="8" height="8" rx="1" {...S}/>
    <line x1="14" y1="42" x2="10" y2="48" {...S}/>
    <line x1="38" y1="42" x2="38" y2="48" {...S}/>
    <rect x="22" y="14" width="8" height="10" rx="1" {...S}/>
    <line x1="26" y1="24" x2="26" y2="28" {...S}/>
    <line x1="22" y1="14" x2="22" y2="11" {...S}/>
    <line x1="30" y1="14" x2="30" y2="11" {...S}/>
    <line x1="22" y1="11" x2="30" y2="11" {...S}/>
  </svg>
);

export const PediatricsIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="22" r="9" {...S}/>
    <line x1="26" y1="31" x2="26" y2="42" {...S}/>
    <line x1="26" y1="35" x2="19" y2="31" {...S}/>
    <line x1="26" y1="35" x2="33" y2="31" {...S}/>
    <line x1="26" y1="42" x2="21" y2="49" {...S}/>
    <line x1="26" y1="42" x2="31" y2="49" {...S}/>
  </svg>
);

export const NeurologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M16 22 Q12 18 12 25 Q10 28 13 32 Q10 36 14 40 Q18 43 23 40 Q26 43 30 40 Q35 43 38 40 Q42 36 39 32 Q42 28 40 22 Q38 18 32 20 Q28 18 26 20 Q22 18 16 22 Z" {...S}/>
    <line x1="26" y1="20" x2="26" y2="40" {...S} style={{strokeWidth: 1}}/>
    <line x1="15" y1="25" x2="20" y2="27" {...S} style={{strokeWidth: 1}}/>
    <line x1="37" y1="25" x2="32" y2="27" {...S} style={{strokeWidth: 1}}/>
  </svg>
);

export const OphthalmologyIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M10 26 Q26 10 42 26 Q26 42 10 26 Z" {...S}/>
    <circle cx="26" cy="26" r="8" {...S}/>
    <circle cx="26" cy="26" r="4" fill="#2ecc8a"/>
  </svg>
);

export const OncologyIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="22" r="10" {...S}/>
    <path d="M26 32 Q20,38 15,44" {...S} style={{strokeWidth: 2.5}}/>
    <path d="M26 32 Q32,38 37,44" {...S} style={{strokeWidth: 2.5}}/>
  </svg>
);

export const PharmacyIcon = (p) => (
  <svg {...d} {...p}>
    <text x="26" y="38" style={{fontSize: "36px", fontWeight: "700", fill: "#2ecc8a", fontFamily: "serif", textAnchor: "middle"}}>℞</text>
  </svg>
);

export const Emergency24Icon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="22" {...S}/>
    <line x1="26" y1="12" x2="26" y2="26" {...S} style={{strokeWidth: 2.5}}/>
    <line x1="26" y1="26" x2="36" y2="26" {...S} style={{strokeWidth: 2.5}}/>
  </svg>
);

export const AmbulanceIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="10" y="22" width="32" height="18" rx="3" {...S}/>
    <rect x="24" y="26" width="8" height="10" rx="2" {...S}/>
    <circle cx="16" cy="40" r="6" {...S}/>
    <circle cx="16" cy="40" r="2" fill="#2ecc8a"/>
    <circle cx="36" cy="40" r="6" {...S}/>
    <circle cx="36" cy="40" r="2" fill="#2ecc8a"/>
  </svg>
);

export const ICUIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="8" y="14" width="36" height="26" rx="3" {...S}/>
    <polyline points="12,24 16,24 18,18 20,30 22,20 24,28 26,24 40,24" {...S} style={{strokeWidth: 1.5}}/>
  </svg>
);

export const DiagnosticIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M14,18 L14,36 Q14,40 18,40 Q22,40 22,36 L22,18 Z" {...S}/>
    <line x1="12" y1="20" x2="24" y2="20" {...S}/>
    <circle cx="32" cy="24" r="10" {...S}/>
    <line x1="38" y1="30" x2="44" y2="36" {...S} style={{strokeWidth: 3}}/>
  </svg>
);

export const Pharmacy24Icon = (p) => (
  <svg {...d} {...p}>
    <ellipse cx="20" cy="30" rx="14" ry="8" transform="rotate(-35,20,30)" {...S}/>
    <line x1="12" y1="26" x2="28" y2="34" {...S} style={{strokeWidth: 2.5}}/>
    <circle cx="36" cy="36" r="8" {...S}/>
    <line x1="36" y1="32" x2="36" y2="36" {...S} style={{strokeWidth: 2}}/>
    <line x1="36" y1="36" x2="40" y2="36" {...S} style={{strokeWidth: 2}}/>
  </svg>
);

export const BloodBankIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26,18 Q16,28 16,34 Q16,44 26,44 Q36,44 36,34 Q36,28 26,18 Z" {...S}/>
    <line x1="26" y1="26" x2="26" y2="36" style={{stroke: "#2ecc8a", strokeWidth: 2, strokeLinecap: "round"}}/>
    <line x1="22" y1="34" x2="30" y2="34" style={{stroke: "#2ecc8a", strokeWidth: 2, strokeLinecap: "round"}}/>
  </svg>
);

export const TelemedicineIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="10" y="14" width="26" height="20" rx="3" {...S}/>
    <polygon points="36,18 44,14 44,34 36,30" {...S}/>
    <circle cx="18" cy="20" r="4" {...S}/>
    <path d="M14,32 Q14,26 18,26 Q22,26 22,32" {...S}/>
  </svg>
);

export const HealthCheckupIcon = (p) => (
  <svg {...d} {...p}>
    <rect x="8" y="14" width="36" height="32" rx="3" {...S}/>
    <rect x="14" y="10" width="24" height="8" rx="3" {...S}/>
    <polyline points="12,28 18,34 32,22" {...S} style={{strokeWidth: 2.5}}/>
    <path d="M26,36 Q22,32 20,36 Q18,40 26,44 Q34,40 32,36 Q30,32 26,36 Z" {...S} style={{strokeWidth: 1.5}}/>
  </svg>
);

export const HomeCareIcon = (p) => (
  <svg {...d} {...p}>
    <polygon points="26,10 10,24 14,24 14,42 38,42 38,24 42,24" {...S}/>
    <line x1="26" y1="26" x2="26" y2="36" style={{stroke: "#2ecc8a", strokeWidth: 2.5, strokeLinecap: "round"}}/>
    <line x1="22" y1="31" x2="30" y2="31" style={{stroke: "#2ecc8a", strokeWidth: 2.5, strokeLinecap: "round"}}/>
  </svg>
);

export const VaccinationIcon = (p) => (
  <svg {...d} {...p}>
    <line x1="14" y1="14" x2="38" y2="38" {...S} style={{strokeWidth: 2.5}}/>
    <rect x="20" y="24" width="14" height="8" rx="2" {...S} transform="rotate(45,27,28)"/>
    <line x1="36" y1="36" x2="42" y2="42" {...S} style={{strokeWidth: 3}}/>
    <path d="M12,10 Q8,8 8,14 Q8,20 12,22 Q16,20 16,14 Q16,8 12,10 Z" {...S} style={{strokeWidth: 1.5}}/>
    <polyline points="8,16 12,18 16,14" {...S} style={{strokeWidth: 1.5}}/>
  </svg>
);

export const PhysiotherapyIconNew = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="14" r="8" {...S}/>
    <line x1="26" y1="22" x2="26" y2="36" {...S}/>
    <line x1="26" y1="28" x2="14" y2="22" {...S}/>
    <line x1="26" y1="28" x2="38" y2="18" {...S}/>
    <line x1="26" y1="36" x2="16" y2="44" {...S}/>
    <line x1="26" y1="36" x2="36" y2="44" {...S}/>
  </svg>
);

export const MaternityIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="14" r="8" {...S}/>
    <line x1="26" y1="22" x2="26" y2="36" {...S}/>
    <ellipse cx="30" cy="30" rx="10" ry="12" {...S}/>
    <line x1="26" y1="36" x2="18" y2="44" {...S}/>
    <line x1="26" y1="36" x2="34" y2="44" {...S}/>
  </svg>
);

export const DialysisIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M14,24 Q8,20 8,30 Q8,42 18,44 Q24,44 24,36 Q24,30 18,28 Q22,26 22,22 Q22,18 14,24 Z" {...S}/>
    <path d="M38,24 Q44,20 44,30 Q44,42 34,44 Q28,44 28,36 Q28,30 34,28 Q30,26 30,22 Q30,18 38,24 Z" {...S}/>
    <line x1="24" y1="32" x2="28" y2="32" {...S} style={{strokeDasharray: "3,3"}}/>
    <rect x="24" y="28" width="4" height="8" rx="1" {...S} style={{strokeWidth: 1.5}}/>
  </svg>
);

export const CancerIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="12" {...S}/>
    <circle cx="26" cy="26" r="5" fill="#2ecc8a"/>
    <path d="M26,14 L22,6 Q26,4 30,6 Z" fill="#2ecc8a"/>
    <path d="M35,20 L44,16 Q45,20 43,24 Z" fill="#2ecc8a"/>
    <path d="M17,20 L8,16 Q7,20 9,24 Z" fill="#2ecc8a"/>
  </svg>
);

export const CardiacCareIcon = (p) => (
  <svg {...d} {...p}>
    <path d="M26,14 Q16,8 10,18 Q4,28 26,42 Q48,28 42,18 Q36,8 26,14 Z" {...S} style={{strokeWidth: 2}}/>
    <polyline points="10,24 14,24 17,18 20,30 23,22 26,22 29,26 32,22 38,22" style={{fill: "none", stroke: "#fff", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", opacity: 0.7}}/>
  </svg>
);

export const MentalHealthIcon = (p) => (
  <svg {...d} {...p}>
    <circle cx="26" cy="26" r="18" {...S}/>
    <path d="M18,32 Q26,38 34,32" {...S} style={{strokeWidth: 2}}/>
    <circle cx="20" cy="24" r="2" fill="#2ecc8a"/>
    <circle cx="32" cy="24" r="2" fill="#2ecc8a"/>
    <circle cx="40" cy="16" r="1.5" fill="#2ecc8a"/>
    <circle cx="44" cy="14" r="2" fill="#2ecc8a"/>
    <circle cx="48" cy="12" r="3" fill="#2ecc8a" opacity={0.5}/>
  </svg>
);

export const SERVICE_ICON_MAP = {
  "stethoscope": GeneralMedicineIcon,
  "heart": CardiologyIcon,
  "flask": PathologyIcon,
  "scan": RadiologyIcon,
  "baby": GynaecologyIcon,
  "bone": OrthopedicIcon,
  "sparkles": DermatologyIcon,
  "ear": ENTIcon,
  "emergency": EmergencyIcon,
  "opd": OPDIcon,
  "ipd": IPDIcon,
  "pediatrics": PediatricsIcon,
  "neurology": NeurologyIcon,
  "ophthalmology": OphthalmologyIcon,
  "oncology": OncologyIcon,
  "pharmacy": PharmacyIcon,
  "surgery": GeneralSurgeryIcon,
  "emergency24": Emergency24Icon,
  "ambulance": AmbulanceIcon,
  "icu": ICUIcon,
  "diagnostic": DiagnosticIcon,
  "pharmacy24": Pharmacy24Icon,
   "bloodbank": BloodBankIcon,
   "telemedicine": TelemedicineIcon,
  "healthcheckup": HealthCheckupIcon,
  "homecare": HomeCareIcon,
  "vaccination": VaccinationIcon,
  "physiotherapy": PhysiotherapyIconNew,
  "maternity": MaternityIcon,
  "dialysis": DialysisIcon,
  "cancer": CancerIcon,
  "cardiaccare": CardiacCareIcon,
  "mentalhealth": MentalHealthIcon,
};
