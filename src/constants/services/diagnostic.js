export const diagnosticService = {
  id: 5,
  title: "Diagnostic Services",
  description:
    "Everest International Polyclinic offers comprehensive diagnostic services with advanced imaging and laboratory technology for accurate medical diagnosis. Our facility includes X-Ray, MRI, CT Scan, Ultrasound, ECG, and complete laboratory testing services under one roof. Our team of experienced radiologists and lab technicians ensure precise results with quick turnaround times. We understand that early and accurate diagnosis is crucial for effective treatment, which is why we invest in the latest diagnostic equipment and technology. All diagnostic reports are reviewed by qualified specialists to ensure accuracy and reliability for proper medical treatment.",
  priceTable: [
    { label: "X-Ray", value: "NPR 300-500" },
    { label: "MRI", value: "NPR 5,000-15,000" },
    { label: "CT Scan", value: "NPR 3,000-8,000" },
    { label: "Ultrasound", value: "NPR 500-1,500" },
    { label: "ECG", value: "NPR 300" },
    { label: "Lab Tests", value: "NPR 100-5,000" },
  ],
  process: [
    { num: "01", label: "Appointment" },
    { num: "02", label: "Registration" },
    { num: "03", label: "Test/Imaging" },
    { num: "04", label: "Analysis" },
    { num: "05", label: "Report" },
    { num: "06", label: "Follow-up" },
  ],
  timing: { main: "Sun-Fri 7AM-7PM", sub: "" },
  headerImage: "/images/services/diagnostic-header.png",
  color: "green",
};
