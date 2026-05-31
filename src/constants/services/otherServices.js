export const bloodBankService = {
  id: 7,
  title: "Blood Bank",
  description:
    "Everest International Polyclinic maintains a well-equipped blood bank with all blood groups available for emergencies and scheduled transfusions. Our blood bank follows strict safety protocols and ensures proper screening of all donated blood. We provide blood transfusion services for surgical procedures, accident victims, anemia patients, and other medical conditions requiring blood products. Our 24/7 availability ensures that critical patients receive life-saving blood whenever needed. We also conduct regular blood donation camps and provide donor recognition certificates. Our experienced team ensures safe collection, testing, processing, and storage of blood components including RBC, plasma, and platelets for optimal patient care.",
  timing: { main: "24/7 Blood Bank", sub: "All blood groups available" },
  headerImage: "/images/services/bloodbank-header.png",
};

export const telemedicineService = {
  id: 9,
  title: "Telemedicine",
  description:
    "Consult with our specialists from the comfort of your home through our telemedicine services. Our virtual consultation platform allows you to receive expert medical advice without visiting the hospital. Share your symptoms, upload medical reports, and get personalized treatment plans from our experienced doctors. Telemedicine makes healthcare accessible to everyone, especially those in remote areas or with mobility constraints.",
  timing: { main: "24/7 Telemedicine", sub: "Consult from home" },
  headerImage: "/images/services/telemedicine-header.png",
};

export const healthCheckupService = {
  id: 10,
  title: "Health Checkup",
  description:
    "Comprehensive health checkup packages designed to detect potential health issues before they become serious. Our packages cover complete body examination, blood tests, imaging, and specialist consultations. Regular health checkups are essential for early detection and prevention of diseases.\n\nChoose from our range of tailored packages for men, women, and seniors to maintain optimal health. Each package includes detailed health assessments, lifestyle counseling, and personalized health recommendations.\n\nOur state-of-the-art laboratory facilities ensure accurate and timely results for all diagnostic tests. We provide complete body profiling including heart health, diabetes screening, kidney function, liver function, and thyroid assessments.\n\nExperienced physicians review your reports and provide comprehensive consultations to explain your health status. Follow-up care plans are designed to address any health concerns and guide you towards a healthier lifestyle.\n\nBook your health checkup today and take the first step towards proactive healthcare management. Early detection saves lives, and our affordable packages make preventive healthcare accessible to everyone.",
  timing: { main: "Daily 7AM-5PM", sub: "By appointment" },
  headerImage: "/images/services/health_checkup_banner.jpg",
  packages: [
    {
      id: 1,
      name: "Basic Health Checkup",
      price: "Rs. 2,500",
      tests: ["Complete Blood Count", "Blood Sugar (Fasting)", "Urine Routine", "Chest X-Ray", "Physician Consultation"],
    },
    {
      id: 2,
      name: "Standard Health Checkup",
      price: "Rs. 5,000",
      tests: ["Complete Blood Count", "Blood Sugar (Fasting & PP)", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "ECG", "Chest X-Ray", "Physician Consultation"],
    },
    {
      id: 3,
      name: "Comprehensive Health Checkup",
      price: "Rs. 8,500",
      tests: ["Complete Blood Count", "Blood Sugar (Fasting & PP)", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Thyroid Profile", "ECG", "2D Echo", "Chest X-Ray", "Ultrasound Abdomen", "Physician Consultation", "Dietary Counseling"],
    },
    {
      id: 4,
      name: "Executive Health Checkup",
      price: "Rs. 12,000",
      tests: ["Complete Blood Count", "Blood Sugar (Fasting & PP)", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Thyroid Profile", "Vitamin D & B12", "ECG", "2D Echo", "Chest X-Ray", "Ultrasound Abdomen", "Pulmonary Function Test", "Eye Checkup", "Dental Checkup", "Physician Consultation", "Specialist Consultations", "Dietary Counseling"],
    },
  ],
};

export const homeCareService = {
  id: 11,
  title: "Home Care",
  description:
    "Professional home care services for patients who need medical assistance at home. Our trained nurses and healthcare providers offer wound care, medication administration, post-surgical care, and elder care services. We bring quality healthcare to your doorstep, ensuring comfort and convenience for patients recovering at home. Customized care plans are developed based on individual patient needs. Our team provides compassionate care that maintains dignity and promotes faster recovery in familiar surroundings. We also offer specialized services for chronic disease management and post-hospitalization care. Regular health monitoring and emergency support are available 24/7 to ensure complete peace of mind for families.",
  timing: { main: "24/7 Home Care", sub: "By appointment" },
  headerImage: "/images/services/homecare-header.png",
};

export const vaccinationService = {
  id: 12,
  title: "Vaccination",
  description:
    "Complete immunization services for children and adults following national vaccination schedules. We provide all routine vaccinations, travel vaccines, and COVID-19 vaccines. Our trained staff ensures safe and comfortable vaccination experiences for patients of all ages. Keep your family protected with our comprehensive vaccination services and maintain accurate immunization records. We also offer specialized vaccination camps and corporate vaccination drives at your location. Our modern cold chain management ensures vaccine potency and effectiveness at all times. We provide detailed vaccination certificates and digital records for easy tracking. Our pediatric vaccination services include painless injections and distraction techniques for children.",
  headerImage: "/images/services/vaccination-header.png",
};

export const physiotherapyService = {
  id: 13,
  title: "Physiotherapy",
  description:
    "Expert physiotherapy services for rehabilitation and recovery from injuries, surgeries, and chronic conditions. Our certified physiotherapists provide personalized treatment plans including exercise therapy, manual therapy, and modern modalities. We treat sports injuries, orthopedic conditions, neurological disorders, and more. Regain mobility and strength with our comprehensive physiotherapy programs.\n\nOur state-of-the-art equipment and evidence-based techniques ensure effective rehabilitation. Each patient receives individualized attention with custom exercise regimes and progress tracking. We focus on long-term recovery and preventive care to help you maintain optimal physical health beyond treatment sessions.",
  timing: { main: "Daily 8AM-6PM", sub: "By appointment" },
  headerImage: "/images/services/physiotherapy-header.png",
  packages: [
    {
      name: "Orthopedic Rehabilitation",
      duration: "4-6 Weeks Program",
      services: ["Post-surgery recovery", "Joint mobility exercises", "Pain management", "Strengthening routines"],
      price: "Rs. 3,000/week"
    },
    {
      name: "Sports Injury Recovery",
      duration: "6-8 Weeks Program",
      services: ["Sports-specific rehab", "Performance training", "Injury prevention", "Flexibility improvement"],
      price: "Rs. 3,500/week"
    },
    {
      name: "Chronic Pain Management",
      duration: "Ongoing Sessions",
      services: ["Pain assessment", "Manual therapy", "Ultrasound therapy", "Home exercise plan"],
      price: "Rs. 800/session"
    },
    {
      name: "Neurological Rehabilitation",
      duration: "12+ Weeks Program",
      services: ["Stroke recovery", "Balance training", "Neuro-mobilization", "Functional independence"],
      price: "Rs. 3,500/week"
    }
  ],
};

export const maternityService = {
  id: 14,
  title: "Maternity Care",
  description:
    "Complete maternity care services from prenatal to postnatal for a safe and healthy pregnancy journey. Our experienced obstetricians and gynecologists provide regular checkups, ultrasound scans, delivery services, and postnatal care.\n\nWe offer comfortable labor and delivery rooms with modern facilities, ensuring a safe and dignified birth experience. Our team closely monitors both maternal and fetal health throughout pregnancy, with specialized care for high-risk cases.\n\nTrust our team to support you through every step of your pregnancy, from early antenatal visits to postpartum recovery. We prioritize personalized attention, emotional support, and evidence-based medical care for the best outcomes for you and your baby.",
  timing: { main: "24/7 Maternity Services", sub: "Prenatal daily" },
  headerImage: "/images/services/maternity-header.png",
};

export const dialysisService = {
  id: 15,
  title: "Dialysis",
  description:
    "Our dialysis center provides high-quality kidney care with state-of-the-art equipment and experienced specialists. We ensure safe, comfortable, and effective treatment sessions tailored to each patient's needs. Our facility features modern hemodialysis machines, strict infection control protocols, and a compassionate team dedicated to delivering the highest standard of renal care. We focus on patient comfort, safety, and clinical excellence in every dialysis session we provide.",
  timing: { main: "Daily 6AM-10PM", sub: "By appointment" },
  headerImage: "/images/dialysis_banner.jpg",
  stats: [
    { value: "2000+", label: "Patients Treated" },
    { value: "20+", label: "Years Experience" },
    { value: "100%", label: "Safe Procedures" }
  ],
  features: [
    { title: "Hemodialysis", description: "Advanced blood purification with modern equipment" },
    { title: "Expert Specialists", description: "Certified nephrologists overseeing every session" },
    { title: "Personalized Care", description: "Treatment plans designed for each patient" }
  ],
  ctaButtonText: "Learn More"
};

export const cardiacCareService = {
  id: 16,
  title: "Cardiac Care",
  description:
    "Expert cardiac care services for heart conditions including angioplasty, bypass surgery, and cardiac rehabilitation. Our cardiologists use advanced technology for accurate diagnosis and effective treatment of heart diseases. We provide emergency cardiac care, regular heart checkups, and post-treatment follow-up. Maintain heart health with our comprehensive cardiac services.",
  timing: { main: "24/7 Cardiac Emergency", sub: "Daily consultation" },
  headerImage: "/images/services/cardiac-banner2.jpg",
};

export const mentalHealthService = {
  id: 17,
  title: "Mental Health",
  description:
    "Professional mental health services including psychiatric consultations, counseling, and therapy for various psychological conditions. Our experienced psychiatrists and psychologists provide confidential care for depression, anxiety, stress, and other mental health issues. We offer both in-person and telemedicine consultations to make mental health support accessible. Your mental well-being is our priority.",
  timing: { main: "Daily 9AM-5PM", sub: "By appointment" },
  headerImage: "/images/mental_health_banner2.jpg",
};
