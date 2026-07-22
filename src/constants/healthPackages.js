export const HEALTH_PACKAGE_FEATURES = [
  { label: "NABL Accredited Lab", icon: "shield" },
  { label: "Same-Day Reports", icon: "clock" },
  { label: "Home Collection", icon: "home" },
  { label: "Doctor Consultation", icon: "stethoscope" },
];

export const HEALTH_PACKAGES = [
  {
    section: "General Wellness",
    icon: "activity",
    items: [
      {
        id: 1,
        name: "Basic Wellness Profile",
        price: 1800,
        originalPrice: 3200,
        badge: null,
        tests: [
          "CBC (Complete Blood Count)",
          "Fasting Blood Sugar",
          "Urine Routine Analysis",
          "Serum Creatinine",
          "Serum Uric Acid",
        ],
      },
      {
        id: 2,
        name: "Comprehensive Executive",
        price: 4500,
        originalPrice: 9800,
        badge: "Best Seller",
        tests: [
          "CBC",
          "Fasting Blood Sugar / HbA1c",
          {
            label: "Lipid Profile",
            items: [
              "Total Cholesterol",
              "Triglycerides",
              "HDL Cholesterol",
              "LDL Cholesterol",
              "VLDL Cholesterol",
            ],
          },
          {
            label: "Liver Function Test",
            items: ["SGOT", "SGPT", "Bilirubin Total", "Alkaline Phosphatase"],
          },
          "Vitamin D",
          "Thyroid Profile (T3, T4, TSH)",
        ],
      },
      {
        id: 9,
        name: "Full Body Master",
        price: 12500,
        originalPrice: 22000,
        badge: "Premium",
        tests: [
          "80+ Clinical Parameters",
          {
            label: "Liver & Kidney Panel",
            items: ["Full LFT", "Full KFT", "Electrolytes"],
          },
          "Cancer Markers Screening",
          "Cardiac Risk Markers",
          "USG Whole Abdomen",
          "Chest X-Ray",
          "ECG",
          "Physician Consultation",
        ],
      },
    ],
  },
  {
    section: "Life Stage Care",
    icon: "user",
    items: [
      {
        id: 5,
        name: "Women's Essential",
        price: 3800,
        originalPrice: 6500,
        badge: null,
        tests: [
          "CBC",
          "Thyroid Profile",
          "Serum Calcium",
          {
            label: "Iron Studies",
            items: ["Serum Iron", "TIBC", "Transferrin Saturation"],
          },
          "Vitamin B12",
          "Pelvic Ultrasound",
        ],
      },
      {
        id: 6,
        name: "Senior Citizen (Male)",
        price: 6200,
        originalPrice: 11000,
        badge: "Popular",
        tests: [
          "CBC",
          "PSA (Prostate Screening)",
          {
            label: "Bone Health Profile",
            items: ["Serum Calcium", "Phosphorus", "Vitamin D"],
          },
          {
            label: "Kidney Function Test",
            items: ["Urea", "BUN", "Creatinine", "Uric Acid"],
          },
          "Chest X-Ray",
          "USG Abdomen",
          "ECG",
        ],
      },
      {
        id: 7,
        name: "Senior Citizen (Female)",
        price: 6200,
        originalPrice: 11000,
        badge: "Popular",
        tests: [
          "CBC",
          "CA-125 Screening",
          "Vitamin D3",
          "Mammography",
          "Electrolytes Panel",
          "Thyroid Profile",
          "USG Pelvis",
        ],
      },
    ],
  },
  {
    section: "Specialized Screening",
    icon: "heart",
    items: [
      {
        id: 4,
        name: "Advanced Cardiac Care",
        price: 8500,
        originalPrice: 14500,
        badge: "Best Seller",
        tests: [
          "ECG",
          "2D Echocardiogram",
          "TMT / Stress Test",
          {
            label: "Lipid Profile",
            items: [
              "Total Cholesterol",
              "Triglycerides",
              "HDL / LDL",
              "ApoB / ApoA1 Ratio",
            ],
          },
          "HS-CRP",
          "Cardiologist Consultation",
        ],
      },
      {
        id: 8,
        name: "Diabetes Management",
        price: 2900,
        originalPrice: 5200,
        badge: null,
        tests: [
          "Fasting Blood Sugar",
          "HbA1c",
          "Average Blood Glucose",
          "Microalbuminuria",
          {
            label: "Lipid Profile",
            items: ["Total Cholesterol", "Triglycerides", "HDL", "LDL"],
          },
        ],
      },
      {
        id: 10,
        name: "Liver & Kidney Vital",
        price: 2400,
        originalPrice: 4100,
        badge: null,
        tests: [
          "CBC",
          {
            label: "Liver Function Test",
            items: [
              "Bilirubin Total",
              "SGOT / SGPT",
              "Alkaline Phosphatase",
              "Albumin",
            ],
          },
          {
            label: "Kidney Function Test",
            items: ["Urea", "BUN", "Creatinine", "Uric Acid"],
          },
        ],
      },
      {
        id: 3,
        name: "Healthy Heart Basic",
        price: 3200,
        originalPrice: 5800,
        badge: null,
        tests: [
          "ECG",
          {
            label: "Lipid Profile",
            items: ["Total Cholesterol", "Triglycerides", "HDL", "LDL"],
          },
          "Fasting Blood Sugar",
          "Blood Pressure Monitoring",
        ],
      },
    ],
  },
];

export const HOMEPAGE_HEALTH_PACKAGES = (() => {
  const all = HEALTH_PACKAGES.flatMap((group) => group.items);
  const featured = all.filter((pkg) => pkg.badge);
  const rest = all.filter((pkg) => !pkg.badge);
  return [...featured, ...rest].slice(0, 6);
})();
