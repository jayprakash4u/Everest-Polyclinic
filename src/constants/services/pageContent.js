/** Per-service page content — conditions, symptoms, highlights, FAQs, optional extras. */

export const DEFAULT_CONSULTATION_STEPS = [
  "Book Appointment",
  "Meet Specialist",
  "Diagnosis",
  "Treatment Plan",
  "Follow-up Care",
];

const faq = (question, answer) => ({ question, answer });

export const SERVICE_PAGE_CONTENT = {
  "general-medicine": {
    hero: {
      title: "General Medicine",
      headline:"Complete Care for your Everyday Health",
      description:
        "Our General Medicine experts provive comprehensive care for a wide range of medical conditions with accurate diagnosis and personalized treatment.",
      image: "/images/services/General Medicine/general medicine.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "General Medicine",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Physicians" },
        { icon: "shieldCheck", iconSet: "lucide", label: "Accurate Diagnosis" },
        { icon: "heartPulse", iconSet: "lucide", label: "Preventive Care" },
        { icon: "heartHandshake", iconSet: "lucide", label: "Compassionate Support" },
      ],
      highlights: [
        "Experienced Physicians",
        "Same-Day Appointments",
        "Modern Diagnostics",
      ],
    },
    about:
    "General Medicine is the Foundation of Primary Healthcare. We  focused on preventing, diagnosing, and treating common illnesses and chronic conditions in adults. \n\nOur team is dedicated to helping patients of all ages maintain optimal health and improve their quality of life .",
    aboutBenefits: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Comprehensive Care",
        description:
          "Complete care for acute illnesses, injuries, preventive care, and chronic conditions.",
      },
      {
        icon: "shieldCheck",
        iconSet: "lucide",
        title: "Accurate Diagnosis",
        description:
          "Complete care for acute illnesses, injuries, preventive care, and chronic conditions.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "preventive Focus",
        description:
          "Regular check-ups, screenings, and lifestyle guidance to prevent disease and detect issues early.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Patient-Centered",
        description:
          "We listen, care, and create personalized treatment plans for each patient.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About General Medicine",
        title: "Your Partner in Lifelong Health & Wellness",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "General Medicine Services We Offer",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about general medicine at our clinic.",
        image: "/images/services/General Medicine/have a questions.jpg",
      },
    },

    serviceOfferings: [
      {
        icon: "stethoscope",
        iconSet: "lucide",
        title: "General Consultation",
        description:
          "Thorough evaluation of symptoms with a clear diagnosis and treatment plan.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Health Checkups",
        description:
          "Preventive screenings and wellness assessments to catch issues early.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Chronic Disease Management",
        description:
          "Ongoing care for diabetes, hypertension, and other long-term conditions.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Diagnostic Services",
        description:
          "Coordinated lab work and imaging to support accurate clinical decisions.",
      },
      {
        icon: "syringe",
        iconSet: "health",
        title: "Preventive Care",
        description:
          "Vaccination guidance, lifestyle counseling, and risk-factor monitoring.",
      },
      {
        icon: "stethoscope",
        iconSet: "lucide",
        title: "Follow-up Care",
        description:
          "Regular reviews to track progress and adjust treatment as needed.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Doctors",
        description:
          "Skilled and experienced doctors who provide comprehensive care for a wide range of medical conditions.",
      },
      {
        icon: "shieldCheck",
        iconSet: "lucide",
        title: "Modern Facilities",
        description:
          "State-of-the-art equipment and facilities to ensure accurate diagnosis and treatment.",
      },
      {
        icon: "scan",
        iconSet: "lucide",
        title: "Modern Diagnostics",
        description:
          "State-of-the-art equipment for accurate diagnosis and treatment.",
      },
      {
        icon: "heartPulse",
        iconSet: "lucide",
        title: "Preventive Care",
        description:
          "Regular screenings and preventive measures to maintain health.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Compassionate Support",
        description:
          "We listen, care, and create personalized treatment plans for each patient.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Same-Day Appointments",
        description: "Convenient scheduling with minimal waiting time for your visit.",
      },
    ],
    conditions: [
      "Fever and infections",
      "Diabetes",
      "Hypertension",
      "Respiratory conditions",
      "Digestive issues",
      "Chronic disease management",
    ],
    symptoms: [
      "Persistent fever",
      "Fatigue",
      "Cough and cold",
      "Stomach pain",
      "High blood pressure",
      "General weakness",
    ],
    highlights: [
      "Experienced Physicians",
      "Same-Day Appointments",
      "Modern Diagnostics",
    ],
    faqs: [
      faq(
        "When should I visit a general physician?",
        "Visit for persistent fever, unexplained symptoms, chronic condition follow-ups, routine checkups, or when you need guidance on whether specialist care is required.",
      ),
      faq(
        "Do I need an appointment?",
        "Walk-ins are welcome, but booking ahead reduces waiting time and ensures a physician is available for your concern.",
      ),
      faq(
        "What should I bring to my visit?",
        "Bring a valid ID, previous medical records, a list of current medications, and insurance details if applicable.",
      ),
      faq(
        "Do you accept insurance?",
        "We work with several insurance providers. Contact our front desk to confirm coverage for your plan before your visit.",
      ),
    ],

    cta: {
      title: "Need Medical Consultation?",
      subtitle:
        "Book an appointment with our experienced doctors today.",
      image: "/images/services/General Medicine/general medicine2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  "family-medicine": {
    hero: {
      title: "Family Medicine",
      headline: "Complete Care for Every Member of Your Family",
      description:
        "From preventive care to chronic disease management, our family medicine experts provide comprehensive, compassionate care for all ages.",
      image: "/images/services/family medicine/family medicine.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Family Medicine",
      features: [
        { icon: "users", iconSet: "lucide", label: "Care for All Ages" },
        { icon: "virusShield", iconSet: "health", label: "Preventive & Wellness Care" },
        { icon: "heart", iconSet: "lucide", label: "Chronic Disease Management" },
        { icon: "childCare", iconSet: "health", label: "Long-Term Relationship" },
      ],
    },
    about:
      "Family medicine focuses on building lasting relationships with patients and their families. We provide continuous, coordinated care to help you achieve better health at every stage of life.\n\nOne doctor. Whole family. Our family physicians deliver personalized care for infants, children, adults, and seniors — understanding your history, lifestyle, and goals so every visit feels familiar, thoughtful, and effective.",
    aboutBenefits: [
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Comprehensive Care",
        description:
          "Complete care for acute illnesses, injuries, preventive care, and chronic conditions.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Continuity of Care",
        description:
          "Long-term relationships with you and your family to better understand your health needs.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Preventive Focus",
        description:
          "Regular check-ups, screenings, and lifestyle guidance to prevent disease and detect issues early.",
      },
      {
        icon: "heartOrgan",
        iconSet: "health",
        title: "Coordinated Care",
        description:
          "We coordinate with specialists and hospitals to ensure you get the best possible care.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Family Medicine",
        title: "Your Partner in Lifelong Health & Wellness",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Family Medicine Services We Offer",
        subtitle:
          "Primary care services designed to keep every member of your family healthy.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Families Trust Our Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about family medicine at our clinic.",
        image: "/images/services/family medicine/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "stethoscope",
        iconSet: "lucide",
        title: "Routine Check-ups",
        description:
          "Regular health check-ups for all age groups to stay healthy and worry-free.",
      },
      {
        icon: "boy",
        iconSet: "health",
        title: "Child & Adolescent Care",
        description:
          "Growth monitoring, vaccinations, and care for common childhood illnesses.",
      },
      {
        icon: "body",
        iconSet: "health",
        title: "Adult Health Care",
        description:
          "Management of lifestyle diseases like diabetes, hypertension, and thyroid disorders.",
      },
      {
        icon: "elderly",
        iconSet: "health",
        title: "Senior Care",
        description:
          "Specialized care for age-related conditions and overall wellness of seniors.",
      },
      {
        icon: "syringeVaccine",
        iconSet: "health",
        title: "Immunizations",
        description:
          "Vaccinations for all age groups to protect against preventable diseases.",
      },
      {
        icon: "heartbeat",
        iconSet: "health",
        title: "Health Counseling",
        description:
          "Lifestyle, nutrition, and mental wellness counseling for a healthier you.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Doctors",
        description: "Skilled and compassionate family medicine specialists.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Personalized Care",
        description: "Care plans tailored to your unique health needs.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Family-Centered",
        description: "We treat every member of your family with care.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Easy Access",
        description: "Convenient appointments and shorter waiting time.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Comprehensive Care",
        description: "All-in-one care for a healthier, happier family.",
      },
      {
        icon: "heartOrgan",
        iconSet: "health",
        title: "Trusted by Families",
        description: "Building lasting trust in our community.",
      },
    ],
    faqs: [
      faq(
        "What age groups do you treat?",
        "Our family medicine team cares for patients of all ages — from infants and children to adults and seniors — under one coordinated practice.",
      ),
      faq(
        "Do I need to book an appointment for a routine check-up?",
        "We recommend booking ahead for routine check-ups so you can choose a convenient time. Same-day visits may be available for urgent concerns.",
      ),
      faq(
        "Can you manage chronic conditions like diabetes or hypertension?",
        "Yes. We provide ongoing monitoring, medication management, lifestyle guidance, and specialist referrals when needed for chronic conditions.",
      ),
      faq(
        "Do you provide vaccinations for children and adults?",
        "Yes. We offer childhood and adult immunizations, maintain digital records, and guide you on recommended schedules and boosters.",
      ),
    ],
    cta: {
      title: "Healthy Families. Happy Lives.",
      subtitle:
        "Book an appointment today and experience complete care for your whole family.",
      image: "/images/services/family medicine/familymediicne2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  pediatrics: {
    hero: {
      title: "Pediatrics",
      headline: "Healthy Kids. Happy Families.",
      description:
        "Compassionate pediatric care for infants, children, and teens — with expert doctors, child-friendly visits, and support for every stage of growth.",
      image: "/images/services/Pediatric Care/pediatriccare1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Pediatric Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Pediatricians" },
        { icon: "childCare", iconSet: "health", label: "Child-Friendly Care" },
        { icon: "boy", iconSet: "health", label: "Growth Monitoring" },
        { icon: "syringe", iconSet: "health", label: "Vaccination Support" },
      ],
    },
    about:
      "Pediatrics focuses on the unique health needs of infants, children, and adolescents. Our pediatricians provide preventive care, treat childhood illnesses, and guide parents through every stage of development.\n\nWe create a calm, reassuring environment where children feel comfortable and parents feel supported — combining thorough clinical assessment with practical advice on nutrition, vaccination, and healthy growth.",
    aboutBenefits: [
      {
        icon: "boy",
        iconSet: "health",
        title: "Growth Monitoring",
        description: "Regular tracking of height, weight, and developmental milestones.",
      },
      {
        icon: "syringe",
        iconSet: "health",
        title: "Vaccination Care",
        description: "Safe immunizations following national schedules with digital records.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Child-Friendly Environment",
        description: "A welcoming clinic designed to reduce anxiety for young patients.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Parent Support",
        description: "Clear guidance and counseling to help you care for your child with confidence.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Pediatrics",
        title: "Expert Care for Growing Children",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Pediatric Services We Offer",
        subtitle:
          "Complete healthcare for children from newborn through adolescence.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Parents Trust Our Pediatric Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about pediatric care at our clinic.",
        image: "/images/services/Pediatric Care/have a questions.webp",
      },
    },
    serviceOfferings: [
      {
        icon: "baby",
        iconSet: "health",
        title: "Well-Child Checkups",
        description:
          "Routine health exams to monitor growth, development, and overall wellness.",
      },
      {
        icon: "syringe",
        iconSet: "health",
        title: "Immunization",
        description:
          "Childhood vaccines administered safely with proper storage and record keeping.",
      },
      {
        icon: "boy",
        iconSet: "health",
        title: "Growth & Development",
        description:
          "Assessment of physical and developmental milestones with early intervention when needed.",
      },
      {
        icon: "bandaged",
        iconSet: "health",
        title: "Childhood Infections",
        description:
          "Diagnosis and treatment for fever, cough, ear infections, and common illnesses.",
      },
      {
        icon: "nutrition",
        iconSet: "health",
        title: "Nutrition Counseling",
        description:
          "Feeding guidance and dietary advice for healthy growth at every age.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Newborn Care",
        description:
          "Early checkups, feeding support, and monitoring for your baby's first months.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Pediatricians",
        description: "Specialists trained in the unique needs of children and adolescents.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Child-Friendly Environment",
        description: "Gentle, reassuring visits designed to put children at ease.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Modern Facilities",
        description: "Up-to-date equipment for accurate diagnosis and safe treatment.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Parent Guidance",
        description: "Practical advice on feeding, sleep, behavior, and preventive care.",
      },
      {
        icon: "baby",
        iconSet: "health",
        title: "Trusted Child Care",
        description: "A clinic families return to for consistent, compassionate pediatric support.",
      },
    ],
    faqs: [
      faq(
        "At what age should I start pediatric visits?",
        "Newborn checkups should begin within the first week of life, followed by regular well-child visits per national guidelines.",
      ),
      faq(
        "Are vaccinations available at the clinic?",
        "Yes. We provide childhood immunizations with proper cold-chain storage and digital record keeping.",
      ),
      faq(
        "What if my child needs urgent care?",
        "We coordinate with emergency services for urgent cases and guide parents on when immediate care is required.",
      ),
      faq(
        "How often should my child have a checkup?",
        "Infants need frequent visits in the first year. After that, annual checkups are recommended, or more often if your pediatrician advises.",
      ),
    ],
    cta: {
      title: "Give Your Child the Best Start",
      subtitle:
        "Book an appointment with our pediatric experts and give your child the care they deserve.",
      image: "/images/services/Pediatric Care/pediatriccare2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  gynecology: {
    hero: {
      title: "Gynecology",
      headline: "Women's Health. Expert Care.",
      description:
        "Confidential, comprehensive women's health services — from routine exams and family planning to prenatal care and gynecological treatment.",
      image: "/images/services/Gynecology/Gynecology1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Women's Health",
      features: [
        { icon: "heart", iconSet: "lucide", label: "Confidential Care" },
        { icon: "microscope", iconSet: "health", label: "Expert OB-GYNs" },
        { icon: "activity", iconSet: "lucide", label: "Advanced Screening" },
        { icon: "baby", iconSet: "health", label: "Prenatal Support" },
      ],
    },
    about:
      "Our gynecology department provides confidential, comprehensive care for women at every stage of life. From routine examinations and family planning to management of gynecological conditions, we ensure privacy, respect, and clinical excellence.\n\nWhether you need preventive screening, prenatal support, or treatment for menstrual and hormonal concerns, our specialists combine medical expertise with compassionate communication.",
    aboutBenefits: [
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Confidential Consultations",
        description: "Private, respectful care in a comfortable, supportive environment.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Diagnostics",
        description: "Modern screening tools for early detection and accurate diagnosis.",
      },
      {
        icon: "baby",
        iconSet: "health",
        title: "Prenatal & Antenatal Care",
        description: "Comprehensive monitoring and guidance throughout pregnancy.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Holistic Women's Health",
        description: "Care spanning reproductive health, menopause, and chronic gynecological conditions.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Gynecology",
        title: "Comprehensive Women's Health Care",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Gynecology Services We Offer",
        subtitle:
          "Complete care for women's health, screening, and well-being at every life stage.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Gynecology Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about gynecology at our clinic.",
        image: "/images/services/Gynecology/Have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Routine Gynecological Exams",
        description:
          "Regular checkups and preventive screening for early detection and peace of mind.",
      },
      {
        icon: "baby",
        iconSet: "health",
        title: "Prenatal & Antenatal Care",
        description:
          "Comprehensive monitoring, ultrasound coordination, and delivery planning support.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Family Planning Counseling",
        description:
          "Guidance on contraceptive options, fertility concerns, and preconception health.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Menstrual Disorder Management",
        description:
          "Diagnosis and treatment for irregular cycles, pain, and hormonal imbalances.",
      },
      {
        icon: "scan",
        iconSet: "lucide",
        title: "Pap Smear & Breast Screening",
        description:
          "Early detection screening for cervical and breast health with expert follow-up.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced OB-GYNs",
        description: "Specialists trained in comprehensive women's health and gynecological care.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Compassionate Approach",
        description: "Care delivered with empathy, respect, and complete patient confidentiality.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Modern Facilities",
        description: "Advanced diagnostic and treatment equipment for accurate care.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Personalized Treatment",
        description: "Care plans tailored to your age, health goals, and life stage.",
      },
    ],
    conditions: [
      "Prenatal care",
      "Menstrual disorders",
      "Family planning",
      "Cervical screening",
      "Menopause care",
      "Pelvic pain",
    ],
    symptoms: [
      "Irregular periods",
      "Pelvic pain",
      "Unusual discharge",
      "Pregnancy concerns",
      "Breast changes",
      "Hot flashes",
    ],
    highlights: [
      "Confidential women's care",
      "Prenatal & antenatal support",
      "Screening & prevention",
      "Experienced OB-GYN team",
    ],
    faqs: [
      faq(
        "How often should I have a gynecological checkup?",
        "Most women benefit from an annual exam, or more frequently if you are pregnant or managing a specific condition.",
      ),
      faq(
        "Do you provide prenatal care?",
        "Yes. We offer comprehensive antenatal monitoring, ultrasound coordination, and delivery planning support.",
      ),
      faq(
        "Is family planning counseling available?",
        "Yes. We discuss contraceptive options, fertility concerns, and preconception health in confidential consultations.",
      ),
    ],
    cta: {
      title: "Your Health Matters. Book a Consultation Today.",
      subtitle:
        "Take the first step toward better women's health with our expert gynecology team.",
      image: "/images/services/Gynecology/Gynecology2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  orthopedics: {
    hero: {
      title: "Orthopedics",
      headline: "Stronger Bones. Better Life.",
      description:
        "Comprehensive orthopedic care for bones, joints, and muscles — combining expert diagnosis, advanced treatment, and personalized recovery plans.",
      image: "/images/services/Orthopedic/orthopedic1.webp",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Orthopedic Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Orthopedists" },
        { icon: "microscope", iconSet: "health", label: "Advanced Technology" },
        { icon: "heart", iconSet: "lucide", label: "Personalized Treatment" },
        { icon: "running", iconSet: "health", label: "Faster Recovery" },
      ],
    },
    about:
      "Orthopedics focuses on diagnosing and treating conditions affecting bones, joints, muscles, ligaments, and tendons. Our specialists help you move with less pain and greater confidence.\n\nFrom sports injuries and fractures to arthritis and spine problems, we use modern imaging, evidence-based treatment, and coordinated rehabilitation to restore mobility and improve quality of life.",
    aboutBenefits: [
      {
        icon: "joints",
        iconSet: "health",
        title: "Pain Relief",
        description: "Targeted treatment to reduce joint and musculoskeletal pain effectively.",
      },
      {
        icon: "walking",
        iconSet: "health",
        title: "Improved Mobility",
        description: "Restore movement, flexibility, and everyday function safely.",
      },
      {
        icon: "spine",
        iconSet: "health",
        title: "Advanced Treatment",
        description: "Modern orthopedic care backed by accurate diagnosis and imaging.",
      },
      {
        icon: "exercise",
        iconSet: "health",
        title: "Faster Recovery",
        description: "Structured rehab plans to help you return to activity sooner.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Orthopedics",
        title: "Restoring Movement, Relieving Pain",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Orthopedic Treatments We Offer",
        subtitle:
          "Expert care for joints, spine, fractures, and sports-related injuries.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Your Health, Our Priority",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about orthopedic care at our clinic.",
        image: "/images/services/Orthopedic/haveaquestionsimage.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "joints",
        iconSet: "health",
        title: "Joint Pain Treatment",
        description:
          "Comprehensive care for knee, hip, shoulder, and other joint conditions.",
      },
      {
        icon: "cast",
        iconSet: "health",
        title: "Fracture Care",
        description:
          "Expert management of bone fractures with proper alignment and healing support.",
      },
      {
        icon: "spine",
        iconSet: "health",
        title: "Spine Care",
        description:
          "Diagnosis and treatment for back pain, disc problems, and spinal disorders.",
      },
      {
        icon: "running",
        iconSet: "health",
        title: "Sports Injury Rehab",
        description:
          "Specialized recovery for ligament sprains, muscle tears, and athletic injuries.",
      },
      {
        icon: "leg",
        iconSet: "health",
        title: "Arthritis Treatment",
        description:
          "Long-term management of osteoarthritis and inflammatory joint conditions.",
      },
      {
        icon: "physicalTherapy",
        iconSet: "health",
        title: "Post-Surgery Rehab",
        description:
          "Coordinated rehabilitation after orthopedic procedures for optimal recovery.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Orthopedists",
        description: "Specialists skilled in trauma, sports medicine, and joint care.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Technology",
        description: "Modern imaging and diagnostic tools for precise evaluation.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Personalized Care",
        description: "Treatment plans tailored to your injury, age, and activity level.",
      },
      {
        icon: "running",
        iconSet: "health",
        title: "Faster Recovery",
        description: "Integrated rehab pathways to restore strength and mobility.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Patient Centered",
        description: "Compassionate care focused on your comfort and long-term outcomes.",
      },
    ],
    faqs: [
      faq(
        "What conditions do orthopedic doctors treat?",
        "We treat joint pain, fractures, sports injuries, arthritis, back and spine problems, sprains, strains, and post-surgical recovery needs.",
      ),
      faq(
        "Do I need surgery for joint pain?",
        "Not always. Many conditions improve with medication, physiotherapy, injections, or lifestyle changes. Surgery is recommended only when necessary.",
      ),
      faq(
        "How long does recovery take?",
        "Recovery varies by condition and treatment. Your orthopedic specialist will give you a realistic timeline after assessment.",
      ),
      faq(
        "Is orthopedic treatment painful?",
        "Some procedures may cause mild discomfort, but we prioritize patient comfort and use appropriate pain management throughout your care.",
      ),
    ],
    cta: {
      title: "Ready to Move Pain-Free?",
      subtitle:
        "Book an appointment with our orthopedic experts and take the first step toward a stronger, healthier you.",
      image: "/images/services/Orthopedic/orthopedic2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  cardiology: {
    hero: {
      title: "Cardiology",
      headline: "Healthy Heart. Healthier Tomorrow.",
      description:
        "Comprehensive heart care with expert cardiologists, advanced diagnostics, and personalized treatment for lasting cardiovascular health.",
      image: "/images/services/Cardiology/cardiology1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Cardiology Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Cardiologists" },
        { icon: "microscope", iconSet: "health", label: "Advanced Technology" },
        { icon: "heart", iconSet: "lucide", label: "Personalized Treatment" },
        { icon: "heartCardiogram", iconSet: "health", label: "Better Heart Health" },
      ],
    },
    about:
      "Cardiology at Everest Polyclinic delivers expert care for the full range of heart and vascular conditions — from prevention and early diagnosis to long-term management of chronic cardiac disease.\n\nOur cardiologists use modern diagnostics including ECG, echocardiography, and stress testing to build a clear picture of your heart health and create a treatment plan tailored to your needs.",
    aboutBenefits: [
      {
        icon: "heartCardiogram",
        iconSet: "health",
        title: "Accurate Diagnosis",
        description: "Advanced cardiac testing for precise evaluation of heart function.",
      },
      {
        icon: "heartbeat",
        iconSet: "health",
        title: "Preventive Heart Care",
        description: "Early screening and lifestyle guidance to protect long-term heart health.",
      },
      {
        icon: "heartOrgan",
        iconSet: "health",
        title: "Effective Treatment",
        description: "Evidence-based therapies for hypertension, arrhythmia, and heart failure.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Comprehensive Support",
        description: "Continuous monitoring and coordinated care throughout your heart health journey.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Cardiology",
        title: "Expert Care for Every Heartbeat",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Cardiology Services We Offer",
        subtitle:
          "Complete diagnostic and treatment services for your cardiovascular health.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Heart Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about cardiology care at our clinic.",
        image: "/images/services/Cardiology/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "heartCardiogram",
        iconSet: "health",
        title: "ECG & Heart Checkup",
        description:
          "Routine and diagnostic ECG with comprehensive cardiac health assessment.",
      },
      {
        icon: "ultrasound",
        iconSet: "health",
        title: "Echocardiography",
        description:
          "Ultrasound imaging to evaluate heart structure, valves, and pumping function.",
      },
      {
        icon: "stent",
        iconSet: "health",
        title: "Angiography",
        description:
          "Advanced imaging to assess coronary arteries and guide interventional care.",
      },
      {
        icon: "heartOrgan",
        iconSet: "health",
        title: "Heart Failure Care",
        description:
          "Long-term management plans for heart failure with medication and lifestyle support.",
      },
      {
        icon: "bloodPressure",
        iconSet: "health",
        title: "Hypertension Care",
        description:
          "Blood pressure monitoring, medication review, and cardiovascular risk reduction.",
      },
      {
        icon: "cardiogram",
        iconSet: "health",
        title: "Heart Rhythm Care",
        description:
          "Evaluation and treatment of palpitations, arrhythmia, and irregular heartbeat.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Cardiologists",
        description: "Highly qualified heart specialists with years of clinical expertise.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Modern Infrastructure",
        description: "State-of-the-art cardiac diagnostics and treatment facilities.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Patient-Centered Approach",
        description: "Care plans designed around your lifestyle, goals, and comfort.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "24/7 Emergency Support",
        description: "Coordinated emergency cardiac care when every minute matters.",
      },
      {
        icon: "heartbeat",
        iconSet: "health",
        title: "Trusted by Thousands",
        description: "A clinic families rely on for compassionate, expert heart care.",
      },
    ],
    faqs: [
      faq(
        "What are the common signs of heart disease?",
        "Watch for chest pain, shortness of breath, fatigue, palpitations, dizziness, or swelling in the legs. Seek evaluation promptly if symptoms persist.",
      ),
      faq(
        "How often should I have a heart checkup?",
        "Adults over 40 or those with risk factors like diabetes, hypertension, or family history should have annual cardiac screening.",
      ),
      faq(
        "Is angiography necessary for chest pain?",
        "Not always. Your cardiologist may start with ECG, Echo, or stress testing. Angiography is recommended when coronary artery disease needs detailed evaluation.",
      ),
      faq(
        "Can heart problems be prevented?",
        "Yes. Regular checkups, blood pressure control, healthy diet, exercise, and avoiding smoking significantly reduce cardiovascular risk.",
      ),
    ],
    cta: {
      title: "Take Care of Your Heart Today",
      subtitle:
        "Book an appointment with our cardiology experts and take the first step towards a healthier, longer life.",
      image: "/images/services/Cardiology/cardiology2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  dermatology: {
    hero: {
      title: "Dermatology",
      headline: "Healthy Skin. Healthy You.",
      description:
        "Expert dermatology care for skin, hair, and nail conditions — combining advanced treatment with safe, personalized solutions.",
      image: "/images/services/Dermatology/Dermatology1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Dermatology Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Dermatologists" },
        { icon: "microscope", iconSet: "health", label: "Advanced Treatment" },
        { icon: "bandaged", iconSet: "health", label: "Safe & Effective Care" },
        { icon: "sparkles", iconSet: "lucide", label: "Personalized Solutions" },
      ],
    },
    about:
      "Dermatology at Everest Polyclinic covers the full spectrum of skin, hair, and nail health — from common concerns like acne and allergies to complex conditions requiring specialist diagnosis.\n\nOur dermatologists use modern assessment tools and evidence-based treatments to deliver accurate diagnosis, effective care, and long-term skin wellness tailored to your skin type and lifestyle.",
    aboutBenefits: [
      {
        icon: "body",
        iconSet: "health",
        title: "Healthy Skin",
        description: "Restore and maintain radiant, healthy skin you can feel confident in.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Accurate Diagnosis",
        description: "Thorough evaluation to identify the root cause of your skin concern.",
      },
      {
        icon: "bandaged",
        iconSet: "health",
        title: "Advanced Treatment",
        description: "Modern therapies for effective, lasting results with minimal downtime.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Complete Care",
        description: "Holistic support for skin, hair, and nail health under one roof.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Dermatology",
        title: "Expert Care for Every Skin Concern",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Dermatology Treatments We Offer",
        subtitle:
          "Comprehensive skin, hair, and nail care delivered with clinical precision.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Dermatology Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about dermatology care at our clinic.",
        image: "/images/services/Dermatology/havequestionbelow image.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "bandaged",
        iconSet: "health",
        title: "Acne Treatment",
        description:
          "Medical and cosmetic solutions to clear breakouts and prevent scarring.",
      },
      {
        icon: "allergies",
        iconSet: "health",
        title: "Skin Allergy",
        description:
          "Diagnosis and management of allergic rashes, eczema, and contact dermatitis.",
      },
      {
        icon: "head",
        iconSet: "health",
        title: "Hair & Scalp Care",
        description:
          "Evaluation and treatment for hair loss, dandruff, and scalp conditions.",
      },
      {
        icon: "body",
        iconSet: "health",
        title: "Pigmentation",
        description:
          "Targeted care for dark spots, melasma, and uneven skin tone.",
      },
      {
        icon: "biopsy",
        iconSet: "health",
        title: "Wart Removal",
        description:
          "Safe removal of warts and benign skin growths with minimal discomfort.",
      },
      {
        icon: "tooth",
        iconSet: "health",
        title: "Nail Disorders",
        description:
          "Treatment for fungal infections, brittle nails, and nail bed conditions.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Dermatologists",
        description: "Specialists skilled in medical and cosmetic dermatology.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Modern Technology",
        description: "Advanced tools for accurate diagnosis and effective treatment.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Personalized Treatment",
        description: "Care plans tailored to your skin type, goals, and lifestyle.",
      },
      {
        icon: "bandaged",
        iconSet: "health",
        title: "Safe & Hygienic Environment",
        description: "Sterile, professional settings for every procedure and visit.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "Patient Satisfaction",
        description: "Trusted by patients for compassionate, results-driven skin care.",
      },
    ],
    faqs: [
      faq(
        "What skin problems do you treat?",
        "We treat acne, eczema, psoriasis, allergies, infections, pigmentation, hair loss, nail disorders, and perform mole and lesion assessments.",
      ),
      faq(
        "How long will the treatment take?",
        "Treatment duration varies by condition. Some concerns improve within weeks, while chronic conditions may need ongoing care — your dermatologist will explain during consultation.",
      ),
      faq(
        "Are the treatments safe?",
        "Yes. All treatments follow evidence-based protocols. Your dermatologist discusses benefits, risks, and expected outcomes before starting any therapy.",
      ),
      faq(
        "Do I need a dermatologist for hair loss?",
        "If hair loss is persistent or worsening, a dermatologist can identify the cause — hormonal, nutritional, or scalp-related — and recommend targeted treatment.",
      ),
    ],
    cta: {
      title: "Ready for Healthy, Glowing Skin?",
      subtitle:
        "Book an appointment with our dermatology experts and take the first step toward beautiful, healthy skin.",
      image: "/images/services/Dermatology/Dermatology2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  ent: {
    hero: {
      title: "ENT",
      headline: "Clear Hearing. Easy Breathing. Better Living.",
      description:
        "Expert ear, nose, and throat care for hearing, sinus, and voice-related conditions — delivered by experienced ENT specialists.",
      image: "/images/services/ENT/Ent1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "ENT Care",
      features: [
        { icon: "ear", iconSet: "lucide", label: "ENT Specialists" },
        { icon: "microscope", iconSet: "health", label: "Modern Diagnostics" },
        { icon: "activity", iconSet: "lucide", label: "Hearing Assessments" },
        { icon: "heart", iconSet: "lucide", label: "Minor Procedures" },
      ],
    },
    about:
      "The ENT department addresses conditions affecting the ear, nose, throat, and related structures. Our specialists provide medical and minor procedural care for both acute and chronic ENT problems.\n\nFrom sinusitis and hearing loss to tonsillitis and voice disorders, we combine accurate diagnosis with targeted treatment so you can breathe easier, hear clearly, and live comfortably.",
    aboutBenefits: [
      {
        icon: "ear",
        iconSet: "lucide",
        title: "Hearing & Ear Care",
        description: "Assessment and treatment for infections, hearing loss, and ear disorders.",
      },
      {
        icon: "head",
        iconSet: "health",
        title: "Sinus & Allergy Relief",
        description: "Targeted care for chronic sinusitis, allergies, and nasal breathing issues.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Diagnostics",
        description: "Modern equipment for accurate ENT evaluation and treatment planning.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Specialists",
        description: "ENT consultants with expertise in medical and minor procedural care.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About ENT",
        title: "Expert Care for Ear, Nose & Throat",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "ENT Services We Offer",
        subtitle:
          "Comprehensive ear, nose, and throat care for all ages.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our ENT Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about ENT care at our clinic.",
        image: "/images/services/ENT/have a question.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "ear",
        iconSet: "lucide",
        title: "Ear Infection Treatment",
        description:
          "Diagnosis and treatment for acute and chronic ear infections with pain relief.",
      },
      {
        icon: "head",
        iconSet: "health",
        title: "Sinusitis & Allergy Care",
        description:
          "Medical and minimally invasive management of sinus and nasal allergy conditions.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Hearing Assessments",
        description:
          "Professional hearing tests with clear results and next-step recommendations.",
      },
      {
        icon: "scan",
        iconSet: "lucide",
        title: "Tonsillitis Management",
        description:
          "Medical and procedural care for recurring tonsil and throat infections.",
      },
      {
        icon: "video",
        iconSet: "lucide",
        title: "Voice & Throat Disorders",
        description:
          "Evaluation and treatment for hoarseness, reflux, and throat discomfort.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced ENT Specialists",
        description: "Consultants skilled in ear, nose, throat, and related conditions.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Equipment",
        description: "Modern diagnostic tools for accurate ENT evaluation.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Patient-Centered Care",
        description: "Comfortable, respectful treatment focused on your symptoms and goals.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Quick Relief",
        description: "Efficient diagnosis and treatment to help you recover sooner.",
      },
    ],
    conditions: [
      "Sinusitis",
      "Ear infections",
      "Hearing loss",
      "Tonsillitis",
      "Voice disorders",
      "Nasal allergies",
    ],
    symptoms: [
      "Ear pain",
      "Hearing difficulty",
      "Sore throat",
      "Nasal congestion",
      "Hoarse voice",
      "Dizziness",
    ],
    highlights: [
      "Ear, nose & throat specialists",
      "Hearing assessments",
      "Allergy management",
      "Minor ENT procedures",
    ],
    faqs: [
      faq(
        "Do you perform hearing tests?",
        "Yes. Hearing assessments are available and results are explained clearly with next-step recommendations.",
      ),
      faq(
        "Can chronic sinus problems be treated?",
        "Yes. We evaluate allergies, infections, and structural factors to create an effective management plan.",
      ),
      faq(
        "Do I need a referral to visit ENT?",
        "No referral is required. You may book directly for ENT consultation.",
      ),
    ],
    cta: {
      title: "Ready to Breathe and Hear Better?",
      subtitle:
        "Book an appointment with our ENT specialists and find relief today.",
      image: "/images/services/ENT/ent2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  "dental-care": {
    hero: {
      title: "Dental Care",
      headline: "Healthy Smile. Confident You.",
      description:
        "Complete dental care for the whole family — from preventive checkups to advanced treatment, delivered with gentle, expert care.",
      image: "/images/services/DentalCare/DentalCare1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Dental Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Dentists" },
        { icon: "microscope", iconSet: "health", label: "Advanced Technology" },
        { icon: "bandaged", iconSet: "health", label: "Painless Treatment" },
        { icon: "tooth", iconSet: "health", label: "Complete Oral Care" },
      ],
    },
    about:
      "Dental care at Everest Polyclinic covers everything from routine prevention to restorative and cosmetic treatment. Our dentists focus on long-term oral health with a gentle, patient-first approach.\n\nWhether you need a regular checkup, treatment for tooth pain, or cosmetic improvements, we provide clear explanations, comfortable care, and practical advice to keep your smile healthy every day.",
    aboutBenefits: [
      {
        icon: "dentalHygiene",
        iconSet: "health",
        title: "Preventive Care",
        description: "Regular checkups and cleanings to stop problems before they start.",
      },
      {
        icon: "odontology",
        iconSet: "health",
        title: "Advanced Treatment",
        description: "Modern techniques for fillings, restorations, and complex dental needs.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "Cosmetic Dentistry",
        description: "Whitening and aesthetic treatments for a brighter, confident smile.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Patient Comfort",
        description: "Gentle, reassuring care designed to reduce anxiety at every visit.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Dental Care",
        title: "Caring for Your Smile, Every Day",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Dental Services We Offer",
        subtitle:
          "Comprehensive oral care for prevention, treatment, and a healthier smile.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Choose Our Dental Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about dental care at our clinic.",
        image: "/images/services/DentalCare/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "tooth",
        iconSet: "health",
        title: "Dental Checkup",
        description:
          "Comprehensive oral examination to detect issues early and maintain health.",
      },
      {
        icon: "dentalHygiene",
        iconSet: "health",
        title: "Teeth Cleaning",
        description:
          "Professional cleaning to remove plaque, tartar, and keep gums healthy.",
      },
      {
        icon: "odontology",
        iconSet: "health",
        title: "Cavity Treatment",
        description:
          "Effective fillings and restorations to repair decay and restore function.",
      },
      {
        icon: "odontologyImplant",
        iconSet: "health",
        title: "Dental Implants",
        description:
          "Durable tooth replacement solutions for missing teeth and improved bite.",
      },
      {
        icon: "orthotics",
        iconSet: "health",
        title: "Orthodontics",
        description:
          "Alignment and bite correction for straighter teeth and better oral function.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "Teeth Whitening",
        description:
          "Safe cosmetic whitening for a brighter, more confident smile.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Dentists",
        description: "Skilled dental professionals with a gentle, patient-first approach.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Modern Technology",
        description: "Up-to-date equipment for accurate diagnosis and effective treatment.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Personalized Care",
        description: "Treatment plans tailored to your oral health goals and comfort.",
      },
      {
        icon: "dentalHygiene",
        iconSet: "health",
        title: "Safe & Hygienic Environment",
        description: "Strict sterilization and clean clinical standards at every visit.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Flexible Appointments",
        description: "Convenient scheduling to fit your family's busy routine.",
      },
      {
        icon: "tooth",
        iconSet: "health",
        title: "Patient Satisfaction",
        description: "Trusted by families for compassionate, quality dental care.",
      },
    ],
    faqs: [
      faq(
        "How often should I visit the dentist?",
        "Most patients benefit from a checkup and cleaning every six months, or as advised by your dentist based on your oral health.",
      ),
      faq(
        "Is dental treatment painful?",
        "Modern dentistry focuses on comfort. We use gentle techniques and appropriate anesthesia to minimize discomfort during procedures.",
      ),
      faq(
        "What is the cost of dental treatment?",
        "Costs vary by procedure. After examination, we provide a clear estimate and discuss affordable options before treatment begins.",
      ),
      faq(
        "Can children get dental treatments?",
        "Yes. We provide gentle pediatric dental visits, preventive care, and treatment for children of all ages.",
      ),
    ],
    cta: {
      title: "Ready for a Healthy Smile?",
      subtitle:
        "Book an appointment with our dental experts and take the first step toward a brighter, healthier smile.",
      image: "/images/services/DentalCare/dentalcare2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  physiotherapy: {
    hero: {
      title: "Physiotherapy",
      headline: "Move Better. Live Better.",
      description:
        "Expert physiotherapy care to reduce pain, restore mobility, and help you recover faster with personalized treatment plans.",
      image: "/images/services/Physiotherapy/Physiotherapy.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Physiotherapy Care",
      features: [
        { icon: "users", iconSet: "lucide", label: "Expert Therapists" },
        { icon: "heart", iconSet: "lucide", label: "Personalized Care" },
        { icon: "physicalTherapy", iconSet: "health", label: "Advanced Treatment" },
        { icon: "running", iconSet: "health", label: "Faster Recovery" },
      ],
    },
    about:
      "Physiotherapy focuses on restoring movement, reducing pain, and improving physical function through evidence-based techniques. Our certified therapists assess your condition and design a recovery plan built around your goals.\n\nWhether you're recovering from surgery, managing chronic pain, or rehabilitating a sports injury, we combine manual therapy, exercise programs, and modern modalities to help you regain strength and confidence.",
    aboutBenefits: [
      {
        icon: "backPain",
        iconSet: "health",
        title: "Pain Relief",
        description: "Targeted therapy to reduce pain and inflammation effectively.",
      },
      {
        icon: "walking",
        iconSet: "health",
        title: "Improved Mobility",
        description: "Restore range of motion and functional movement patterns.",
      },
      {
        icon: "weights",
        iconSet: "health",
        title: "Stronger Body",
        description: "Build strength and stability for long-term physical health.",
      },
      {
        icon: "exercise",
        iconSet: "health",
        title: "Faster Recovery",
        description: "Accelerate healing after injury, surgery, or chronic conditions.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Physiotherapy",
        title: "Restoring Movement, Improving Lives",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Physiotherapy Treatments We Offer",
        subtitle:
          "Comprehensive rehabilitation services tailored to your recovery goals.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Your Recovery is Our Priority",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle: "Find answers to common questions about physiotherapy at our clinic.",
        image: "/images/services/Physiotherapy/frinendlydoctor.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "physicalTherapy",
        iconSet: "health",
        title: "Manual Therapy",
        description:
          "Hands-on techniques to relieve pain, improve joint mobility, and reduce muscle tension.",
      },
      {
        icon: "exercise",
        iconSet: "health",
        title: "Exercise Therapy",
        description:
          "Custom exercise programs to rebuild strength, flexibility, and endurance safely.",
      },
      {
        icon: "spine",
        iconSet: "health",
        title: "Posture Correction",
        description:
          "Assessment and correction of posture to prevent pain and improve daily function.",
      },
      {
        icon: "running",
        iconSet: "health",
        title: "Sports Injury Rehab",
        description:
          "Specialized recovery programs for athletes and active individuals after injury.",
      },
      {
        icon: "cardiogram",
        iconSet: "health",
        title: "Electrotherapy",
        description:
          "Modern modalities including ultrasound and TENS to support pain relief and healing.",
      },
      {
        icon: "elderly",
        iconSet: "health",
        title: "Geriatric Physiotherapy",
        description:
          "Gentle, effective therapy to improve balance, mobility, and independence in seniors.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Therapists",
        description: "Certified physiotherapists with years of clinical expertise.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Personalized Care",
        description: "Every treatment plan is tailored to your body and recovery goals.",
      },
      {
        icon: "ultrasound",
        iconSet: "health",
        title: "Advanced Equipment",
        description: "Modern therapy tools for accurate assessment and effective treatment.",
      },
      {
        icon: "exerciseYoga",
        iconSet: "health",
        title: "Holistic Approach",
        description: "We treat the whole person — not just the symptoms.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Patient Satisfaction",
        description: "Trusted by patients for compassionate, results-driven rehabilitation.",
      },
    ],
    faqs: [
      faq(
        "Do I need a doctor's referral for physiotherapy?",
        "A referral is helpful but not always required. Bring any prior imaging, surgical reports, or medical notes to help your therapist plan the best treatment.",
      ),
      faq(
        "How many sessions will I need?",
        "This depends on your condition and goals. After your initial assessment, your therapist will recommend a realistic treatment plan and timeline.",
      ),
      faq(
        "Does physiotherapy treatment hurt?",
        "Some techniques may cause mild discomfort, but treatment should never be unbearable. Your therapist adjusts techniques to keep you comfortable and safe.",
      ),
      faq(
        "What conditions can physiotherapy treat?",
        "We treat sports injuries, post-surgical recovery, back and neck pain, arthritis, stroke rehabilitation, balance disorders, and many musculoskeletal conditions.",
      ),
    ],
    cta: {
      title: "Ready to Move Better?",
      subtitle:
        "Book an appointment with our physiotherapy experts and start your recovery journey today.",
      image: "/images/services/Physiotherapy/Physiotherapy2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  laboratory: {
    hero: {
      title: "Laboratory",
      headline: "Accurate Results. Better Decisions. Stronger Health.",
      description:
        "Our advanced laboratory services deliver precise and reliable results to support accurate diagnosis, effective treatment, and better health outcomes.",
      image: "/images/services/laboratory/laboratory1.jpg",
      secondaryCtaLabel: "Call the Lab",
      eyebrow: "Laboratory Services",
      features: [
        { icon: "microscope", iconSet: "health", label: "Advanced Technology" },
        { icon: "virusShield", iconSet: "health", label: "Accurate & Reliable Results" },
        { icon: "activity", iconSet: "lucide", label: "Quick Turnaround" },
        { icon: "heart", iconSet: "lucide", label: "Patient-Centered Care" },
      ],
    },
    about:
      "We offer a comprehensive range of pathology and clinical laboratory tests with state-of-the-art technology and a team of experienced professionals committed to delivering high-quality results.\n\nExpert team. Advanced equipment. Reliable results. From routine blood work to specialized diagnostic panels, your health is our priority — with strict quality control at every step.",
    aboutBenefits: [
      {
        icon: "bloodbank",
        iconSet: "lucide",
        title: "Wide Range of Tests",
        description:
          "From routine blood tests to specialized diagnostic panels, we offer it all under one roof.",
      },
      {
        icon: "virusShield",
        iconSet: "health",
        title: "Accurate & Reliable",
        description:
          "Strict quality control and advanced technology ensure precise and reliable test results.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Fast & Efficient",
        description:
          "Quick sample processing and timely reporting to support faster diagnosis.",
      },
      {
        icon: "coldChain",
        iconSet: "health",
        title: "Safe & Hygienic",
        description:
          "We follow strict safety protocols and maintain a clean, hygienic environment.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Our Laboratory",
        title: "Precision Testing for Better Care",
      },
      offerings: {
        eyebrow: "Our Test Services",
        title: "Laboratory Tests We Offer",
        subtitle:
          "Comprehensive pathology and clinical testing for accurate diagnosis.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Laboratory",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about laboratory testing at our clinic.",
        image: "/images/services/laboratory/have a qeuestions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "bloodbank",
        iconSet: "lucide",
        title: "Hematology",
        description:
          "Complete blood count, ESR, peripheral smear, and related blood studies.",
      },
      {
        icon: "bloodPressure",
        iconSet: "health",
        title: "Biochemistry",
        description:
          "Blood sugar, lipid profile, liver and kidney function tests, and more.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Immunology",
        description:
          "Allergy testing, autoimmune panels, and infection markers.",
      },
      {
        icon: "allergies",
        iconSet: "health",
        title: "Microbiology",
        description:
          "Culture and sensitivity, serology, and other infection tests.",
      },
      {
        icon: "cardiogram",
        iconSet: "health",
        title: "Hormone Assays",
        description:
          "Thyroid profile, hormone levels, and endocrine testing.",
      },
      {
        icon: "body",
        iconSet: "health",
        title: "Urine & Stool Analysis",
        description:
          "Routine and microscopic analysis for accurate diagnosis.",
      },
    ],
    whyChooseUs: [
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "NABL Accredited",
        description: "Quality you can trust, standards you can rely on.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Professionals",
        description: "Skilled pathologists and trained lab technologists.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Technology",
        description: "Latest machines for precise and accurate testing.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Timely Reports",
        description: "Quick turnaround time with digital reports.",
      },
      {
        icon: "virusShield",
        iconSet: "health",
        title: "Confidential & Safe",
        description: "Your data and privacy are always protected.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "Affordable Pricing",
        description: "High-quality tests at reasonable prices.",
      },
    ],
    faqs: [
      faq(
        "Do I need to fast before a blood test?",
        "Some tests require fasting for 8–12 hours. You will be informed when booking or at sample collection so your results are accurate.",
      ),
      faq(
        "How will I get my test reports?",
        "Reports are shared digitally and can be collected in person. Your referring physician also receives results when applicable.",
      ),
      faq(
        "How long does it take to get results?",
        "Most routine tests are available within 24 hours. Specialized panels may take longer depending on the test.",
      ),
      faq(
        "Are home sample collection services available?",
        "Yes. We offer home collection for selected tests — contact our front desk to check availability in your area.",
      ),
      faq(
        "Do you offer specialized or advanced tests?",
        "Yes. We provide a wide range of routine and specialized tests. Rare panels can often be arranged on request.",
      ),
    ],
    cta: {
      title: "Accurate Results. Better Health.",
      subtitle:
        "Book your lab test today and take a proactive step towards a healthier tomorrow.",
      image: "/images/services/laboratory/laboratory 2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  "diagnostic-imaging": {
    hero: {
      title: "Diagnostic Imaging",
      headline: "Advanced Imaging. Accurate Diagnosis. Better Care.",
      description:
        "State-of-the-art imaging technology and expert radiologists to provide precise results for early detection and better treatment outcomes.",
      image: "/images/services/Diagnostic imaging/Diagnostic imaging1.jpg",
      secondaryCtaLabel: "Call to Inquire",
      eyebrow: "Diagnostic Imaging",
      features: [
        { icon: "microscope", iconSet: "health", label: "Advanced Technology" },
        { icon: "users", iconSet: "lucide", label: "Expert Radiologists" },
        { icon: "activity", iconSet: "lucide", label: "Quick & Accurate Results" },
        { icon: "virusShield", iconSet: "health", label: "Patient Safety First" },
      ],
    },
    about:
      "Diagnostic imaging helps doctors see inside the body to detect, diagnose, and monitor conditions with clarity and confidence. At Everest Polyclinic, every study is performed using modern equipment and reviewed by qualified specialists.\n\nFrom routine X-rays to advanced scans, we focus on accuracy, safety, and comfort — so you and your physician get reliable results that support timely, effective treatment decisions.",
    aboutBenefits: [
      {
        icon: "scan",
        iconSet: "lucide",
        title: "Accurate Diagnosis",
        description:
          "High-quality images that help physicians identify conditions early and plan treatment.",
      },
      {
        icon: "ultrasound",
        iconSet: "health",
        title: "Advanced Equipment",
        description:
          "Modern digital imaging systems for clearer results and safer procedures.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Expert Radiologists",
        description:
          "Studies interpreted by experienced radiology professionals you can trust.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Safe & Comfortable",
        description:
          "Patient-first protocols with attention to safety, privacy, and comfort.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Diagnostic Imaging",
        title: "See Clearly. Treat Accurately.",
      },
      offerings: {
        eyebrow: "Our Imaging Services",
        title: "Diagnostic Imaging Services We Offer",
        subtitle:
          "Comprehensive imaging services to support diagnosis and ongoing care.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Choose Our Imaging Services",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about diagnostic imaging at our clinic.",
        image: "/images/services/Diagnostic imaging/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "body",
        iconSet: "health",
        title: "X-Ray",
        description:
          "Digital X-ray imaging for bones, chest, and other routine diagnostic needs.",
      },
      {
        icon: "scan",
        iconSet: "lucide",
        title: "CT Scan",
        description:
          "Detailed cross-sectional imaging for precise evaluation of internal structures.",
      },
      {
        icon: "head",
        iconSet: "health",
        title: "MRI Scan",
        description:
          "High-resolution soft-tissue imaging for brain, spine, and joint evaluation.",
      },
      {
        icon: "ultrasound",
        iconSet: "health",
        title: "Ultrasound",
        description:
          "Safe, radiation-free imaging for pregnancy, abdomen, and soft tissues.",
      },
      {
        icon: "biopsy",
        iconSet: "health",
        title: "Mammography",
        description:
          "Breast screening and diagnostic imaging for early detection and follow-up.",
      },
      {
        icon: "joints",
        iconSet: "health",
        title: "Bone Density Scan",
        description:
          "Assessment of bone strength to detect osteoporosis and fracture risk.",
      },
    ],
    whyChooseUs: [
      {
        icon: "virusShield",
        iconSet: "health",
        title: "High Quality Images",
        description: "Clear, detailed studies for confident clinical decisions.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Fast Turnaround",
        description: "Efficient scheduling and timely report delivery.",
      },
      {
        icon: "coldChain",
        iconSet: "health",
        title: "Safe & Secure",
        description: "Strict safety protocols and secure handling of your records.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Patient-Centered Care",
        description: "Compassionate staff focused on your comfort throughout the visit.",
      },
      {
        icon: "stethoscope",
        iconSet: "lucide",
        title: "All Under One Roof",
        description: "Imaging, consultation, and follow-up care in one trusted clinic.",
      },
    ],
    faqs: [
      faq(
        "Is diagnostic imaging safe?",
        "Yes. Our imaging services follow established safety guidelines. Each procedure is performed only when clinically appropriate, with protocols designed to minimize risk.",
      ),
      faq(
        "Will I be exposed to radiation?",
        "Some modalities such as X-ray and CT use low levels of radiation. Ultrasound and MRI do not use ionizing radiation. Your doctor will recommend the safest option for your needs.",
      ),
      faq(
        "How do I prepare for my scan?",
        "Preparation depends on the type of scan. You may need fasting, hydration, or to avoid certain medications. Our team will guide you when you book your appointment.",
      ),
      faq(
        "How long does the procedure take?",
        "Most studies take 15–45 minutes. Complex scans may take longer. We will give you an estimated duration when scheduling.",
      ),
      faq(
        "When will I get my report?",
        "Most reports are available within 24 hours and shared with your referring physician. Urgent cases may be prioritized.",
      ),
    ],
    cta: {
      title: "Accurate Imaging. Better Decisions.",
      subtitle:
        "Book your diagnostic imaging appointment today and take a step towards better health.",
      image: "/images/services/Diagnostic imaging/Diagnostic imaging2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  vaccination: {
    hero: {
      title: "Vaccination",
      headline: "Protect Today. A Healthier Tomorrow.",
      description:
        "Safe, effective, and doctor-recommended vaccines for you and your family — build strong immunity and stay protected from preventable diseases.",
      image: "/images/services/vaccination/vaccination1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Vaccination Care",
      features: [
        { icon: "virusShield", iconSet: "health", label: "Safe & Approved Vaccines" },
        { icon: "users", iconSet: "lucide", label: "Expert Medical Team" },
        { icon: "microscope", iconSet: "health", label: "International Standards" },
        { icon: "heart", iconSet: "lucide", label: "Care for All Ages" },
      ],
    },
    about:
      "Vaccination is one of the most effective ways to prevent serious illness and protect public health. At Everest Polyclinic, we follow national and international immunization guidelines with strict cold-chain storage and trained clinical staff.\n\nWhether your child needs routine childhood vaccines, you require travel immunizations, or your family needs seasonal flu protection, we provide personalized guidance, digital records, and timely reminders for every dose.",
    aboutBenefits: [
      {
        icon: "virusShield",
        iconSet: "health",
        title: "Safe & Trusted Vaccines",
        description: "WHO-approved vaccines stored and handled under strict safety standards.",
      },
      {
        icon: "boy",
        iconSet: "health",
        title: "For All Age Groups",
        description: "Immunizations for infants, children, adults, seniors, and booster doses.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Personalized Guidance",
        description: "Recommendations based on your age, health history, and travel plans.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Reminders & Follow-up",
        description: "Timely reminders so you never miss an important vaccination dose.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Vaccination",
        title: "Stronger Immunity, Stronger Life",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Vaccination Services We Offer",
        subtitle:
          "Complete immunization services for individuals, families, and organizations.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Vaccination Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about vaccination at our clinic.",
        image: "/images/services/vaccination/have a questions.webp",
      },
    },
    serviceOfferings: [
      {
        icon: "baby",
        iconSet: "health",
        title: "Childhood Vaccination",
        description:
          "Routine immunizations following national schedules for infants and children.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Adult Vaccination",
        description:
          "Boosters and preventive vaccines for adults to maintain lifelong immunity.",
      },
      {
        icon: "travel",
        iconSet: "health",
        title: "Travel Vaccination",
        description:
          "Required and recommended vaccines before international travel.",
      },
      {
        icon: "syringeVaccine",
        iconSet: "health",
        title: "Flu & Seasonal Vaccines",
        description:
          "Annual flu shots and seasonal immunizations for added protection.",
      },
      {
        icon: "homecare",
        iconSet: "lucide",
        title: "Corporate Vaccination",
        description:
          "On-site vaccination drives for workplaces, schools, and organizations.",
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Doctors",
        description: "Qualified clinicians overseeing safe vaccine administration.",
      },
      {
        icon: "virusShield",
        iconSet: "health",
        title: "High Safety Standards",
        description: "Strict cold-chain storage and sterile injection protocols.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Quality Assured",
        description: "Genuine vaccines from approved sources with full traceability.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Convenient & Quick",
        description: "Efficient visits with minimal waiting and clear documentation.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Patient-Centered Care",
        description: "Gentle administration with counseling before and after vaccination.",
      },
    ],
    faqs: [
      faq(
        "Are vaccines safe?",
        "Yes. Vaccines used at our clinic follow national guidelines and are stored under strict cold-chain conditions. Serious side effects are extremely rare.",
      ),
      faq(
        "Do I need a booster dose?",
        "Some vaccines require boosters to maintain immunity. Your doctor will advise based on your age, vaccine history, and current health guidelines.",
      ),
      faq(
        "What are the common side effects?",
        "Mild soreness, low fever, or fatigue may occur briefly. These usually resolve within a day or two and indicate your immune system is responding.",
      ),
      faq(
        "How do I know which vaccine I need?",
        "During consultation, we review your age, medical history, travel plans, and previous records to recommend the right vaccines for you.",
      ),
    ],
    cta: {
      title: "Protect Your Family. Book Your Vaccination Today!",
      subtitle:
        "Take the first step toward a healthier, safer life. Our experts are here to care for you.",
      image: "/images/services/vaccination/image2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  "health-checkup": {
    hero: {
      title: "Health Checkup",
      headline: "Prevent Today. Protect Tomorrow.",
      description:
        "Regular health checkups help detect potential health issues early and keep you and your family on the path to a healthier life.",
      image: "/images/services/Health checkup/Healthcheckup.jpg",
      secondaryCtaLabel: "Talk to Our Expert",
      eyebrow: "Health Checkup",
      features: [
        { icon: "virusShield", iconSet: "health", label: "Early Detection of Diseases" },
        { icon: "heartbeat", iconSet: "health", label: "Preventive & Proactive Care" },
        { icon: "clipboardcheck", iconSet: "lucide", label: "Comprehensive Health Reports" },
        { icon: "users", iconSet: "lucide", label: "Care for All Age Groups" },
      ],
    },
    about:
      "Our health checkup packages are designed to evaluate your overall well-being, detect hidden health risks, and provide personalized recommendations for a better tomorrow.\n\nGood health starts with regular checkups. We combine advanced diagnostics, expert physician review, and clear reporting — so you understand your health status and can take confident steps toward prevention and wellness.",
    aboutBenefits: [
      {
        icon: "stethoscope",
        iconSet: "lucide",
        title: "Comprehensive Assessment",
        description:
          "In-depth analysis of your health with a wide range of tests and evaluations.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Technology",
        description:
          "State-of-the-art equipment and accurate testing for reliable results.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Expert Consultation",
        description:
          "Consult with experienced doctors who guide you with the right advice and care.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Detailed Reports",
        description:
          "Easy-to-understand reports with actionable insights and health recommendations.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Health Checkups",
        title: "Empowering You with Complete Health Insights",
      },
      offerings: {
        eyebrow: "Our Packages",
        title: "Health Checkup Packages for Every Need",
        subtitle:
          "All packages are customizable. Talk to our experts to choose the right checkup for you.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Choose Our Health Checkups",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about health checkup packages at our clinic.",
        image: "/images/services/Health checkup/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Basic Checkup",
        price: "NPR 1,999",
        features: [
          "CBC, RBS, Urine Routine",
          "Lipid Profile",
          "Doctor Consultation",
        ],
      },
      {
        icon: "virusShield",
        iconSet: "health",
        title: "Wellness Checkup",
        price: "NPR 3,499",
        features: [
          "Thyroid Profile",
          "Liver & Kidney Function",
          "ECG, Chest X-Ray",
          "Doctor Consultation",
        ],
      },
      {
        icon: "heartOrgan",
        iconSet: "health",
        title: "Executive Checkup",
        price: "NPR 6,999",
        badge: "Most Popular",
        features: [
          "All Basic Tests",
          "Advanced Cardiac Risk Markers",
          "Ultrasound Abdomen",
          "Doctor Consultation",
        ],
      },
      {
        icon: "elderly",
        iconSet: "health",
        title: "Senior Citizen Checkup",
        price: "NPR 5,999",
        features: [
          "Diabetes Screening",
          "Bone Profile",
          "ECG, Echo",
          "Doctor Consultation",
        ],
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Family Checkup",
        price: "NPR 8,999",
        features: [
          "All Essential Tests",
          "Family Health Assessment",
          "Priority Consultation",
          "Discount for Family",
        ],
      },
    ],
    whyChooseUs: [
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Doctors",
        description: "Physicians who interpret results with clinical clarity.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Advanced Facilities",
        description: "Modern lab and diagnostic support under one roof.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Quick & Easy",
        description: "Streamlined checkups with minimal waiting time.",
      },
      {
        icon: "virusShield",
        iconSet: "health",
        title: "Safe & Confidential",
        description: "Your health data is handled with complete privacy.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "Affordable Pricing",
        description: "Comprehensive packages at competitive rates.",
      },
    ],
    faqs: [
      faq(
        "How often should I get a health checkup?",
        "Most adults benefit from an annual checkup. Your doctor may recommend more frequent visits based on age, risk factors, or existing conditions.",
      ),
      faq(
        "Do I need to fast before the tests?",
        "Some tests require fasting for 8–12 hours. We will inform you when booking so your results are accurate.",
      ),
      faq(
        "How long does it take to get the results?",
        "Most routine package results are available within 24–48 hours, followed by a physician consultation to review your report.",
      ),
      faq(
        "Can I customize my health checkup package?",
        "Yes. Packages can be tailored with additional tests based on your age, gender, medical history, and concerns.",
      ),
      faq(
        "Are home sample collection services available?",
        "Yes. Home collection is available for selected tests — contact our team to confirm availability for your package.",
      ),
    ],
    cta: {
      title: "Your Health is Your Greatest Wealth. Book Your Health Checkup Today!",
      subtitle:
        "Take charge of your health and live a better, happier life.",
      image: "/images/services/Health checkup/healthcheckup2.jpg",
      buttonLabel: "Book Appointment Now",
    },
  },
  pharmacy: {
    hero: {
      title: "Pharmacy",
      headline: "Your Health, Our Priority.",
      description:
        "We provide safe, genuine medicines and expert pharmaceutical care you can trust. Your wellness is our commitment.",
      image: "/images/services/pharmacy/pharmacy1.jpg",
      primaryCtaLabel: "Order Medicines",
      secondaryCtaLabel: "Talk to Pharmacist",
      eyebrow: "Pharmacy Services",
      features: [
        { icon: "virusShield", iconSet: "health", label: "Genuine Medicines" },
        { icon: "pill", iconSet: "lucide", label: "Expert Pharmacists" },
        { icon: "homecare", iconSet: "lucide", label: "Fast & Reliable Service" },
        { icon: "heart", iconSet: "lucide", label: "Patient-Centered Care" },
      ],
    },
    about:
      "Our pharmacy is more than just medicines. We are your partner in health, offering personalized advice, medication support, and convenient services for you and your family.\n\nFrom prescription dispensing to chronic care refills and wellness guidance, our licensed pharmacists ensure every medicine is authentic, stored safely, and explained clearly — so you leave with confidence in your treatment.",
    aboutBenefits: [
      {
        icon: "pill",
        iconSet: "lucide",
        title: "Wide Range of Medicines",
        description:
          "We stock a comprehensive range of prescription, OTC, and wellness products.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Prescription Support",
        description:
          "Our pharmacists ensure the right medication, dose, and usage for your safety.",
      },
      {
        icon: "homecare",
        iconSet: "lucide",
        title: "Home Delivery",
        description:
          "Get your medicines delivered safely and on time at your doorstep.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Health & Wellness Advice",
        description:
          "Expert guidance on medications, supplements, and healthier living from our pharmacists.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Our Pharmacy",
        title: "Care Beyond Prescriptions",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Pharmacy Services We Offer",
        subtitle:
          "Complete pharmaceutical services for everyday health and ongoing care.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Trust Our Pharmacy",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about our pharmacy services.",
        image: "/images/services/pharmacy/have a questions.webp",
      },
    },
    serviceOfferings: [
      {
        icon: "pill",
        iconSet: "lucide",
        title: "Prescription Medicines",
        description:
          "Accurate and safe dispensation of prescription medicines.",
      },
      {
        icon: "sparkles",
        iconSet: "lucide",
        title: "OTC Products",
        description:
          "A wide selection of over-the-counter medicines and health essentials.",
      },
      {
        icon: "icu",
        iconSet: "lucide",
        title: "Chronic Care Support",
        description:
          "Continuous supply and support for chronic conditions like diabetes, BP, and asthma.",
      },
      {
        icon: "nutrition",
        iconSet: "health",
        title: "Health Supplements",
        description:
          "Vitamins, minerals, and supplements to support your health and immunity.",
      },
      {
        icon: "baby",
        iconSet: "health",
        title: "Baby & Mother Care",
        description:
          "Trusted products for baby care, nutrition, and mother wellness.",
      },
      {
        icon: "bandaged",
        iconSet: "health",
        title: "Medical Accessories",
        description:
          "From bandages to devices, we provide quality medical accessories.",
      },
    ],
    whyChooseUs: [
      {
        icon: "virusShield",
        iconSet: "health",
        title: "100% Genuine Medicines",
        description: "We guarantee authentic and quality medicines.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Experienced Pharmacists",
        description: "Our team is always here to guide you.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Fast & Convenient Service",
        description: "Quick billing, easy ordering, and timely delivery.",
      },
      {
        icon: "coldChain",
        iconSet: "health",
        title: "Safe & Secure Handling",
        description: "Strict storage and handling standards for your safety.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Affordable Prices",
        description: "Competitive prices and regular discounts.",
      },
      {
        icon: "childCare",
        iconSet: "health",
        title: "Patient-First Approach",
        description: "Your health, comfort, and satisfaction come first.",
      },
    ],
    faqs: [
      faq(
        "Do I need a prescription for all medicines?",
        "Prescription medicines require a valid doctor's prescription. Over-the-counter products can be purchased directly with pharmacist guidance.",
      ),
      faq(
        "Can you deliver medicines to my home?",
        "Yes. We offer home delivery for prescriptions and regular refills within our service area. Contact us to arrange delivery.",
      ),
      faq(
        "How can I reorder my regular medicines?",
        "Share your previous prescription or patient details with our pharmacy team. We can prepare refills in advance for chronic medications.",
      ),
      faq(
        "What payment methods do you accept?",
        "We accept cash, card, and mobile payment options. Ask our staff about current payment methods at the counter.",
      ),
    ],
    cta: {
      title: "Need Medicines?",
      subtitle:
        "Order quickly and get them delivered to your doorstep. Your health is just a call or click away.",
      image: "/images/services/pharmacy/pharmacy2.jpg",
      buttonLabel: "Order Medicines Now",
    },
  },
  "home-care": {
    hero: {
      title: "Home Care",
      headline: "Healing at Home. Comfortable Recovery.",
      description:
        "Skilled nursing and medical support delivered at your home for post-surgery recovery, elder care, and ongoing medical needs.",
      image: "/images/services/Home care/home care1.jpg",
      secondaryCtaLabel: "Call to Inquire",
      eyebrow: "Home Care Services",
      features: [
        { icon: "home", iconSet: "lucide", label: "At-Home Convenience" },
        { icon: "heart", iconSet: "lucide", label: "Skilled Nursing" },
        { icon: "activity", iconSet: "lucide", label: "Post-Surgery Support" },
        { icon: "users", iconSet: "lucide", label: "Elder Care" },
      ],
    },
    about:
      "Home care brings professional healthcare to patients who need assistance recovering at home. Our skilled nursing and support services help patients heal in the comfort of their own environment.\n\nWhether recovering from surgery, managing chronic illness, or needing elderly care support, our team provides medication management, wound care, vital monitoring, and emotional reassurance for patients and families.",
    aboutBenefits: [
      {
        icon: "home",
        iconSet: "lucide",
        title: "Comfort of Home",
        description: "Recover in a familiar, comfortable environment with professional support.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Skilled Nursing Care",
        description: "Licensed nurses providing wound care, medication management, and monitoring.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Post-Discharge Support",
        description: "Seamless transition from hospital to home with coordinated follow-up care.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Family Peace of Mind",
        description: "Regular updates and professional care that gives families confidence and reassurance.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Home Care",
        title: "Professional Care Where You Live",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Home Care Services We Offer",
        subtitle:
          "Comprehensive medical and nursing support delivered directly to your doorstep.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Families Trust Our Home Care",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about our home care services.",
        image: "/images/services/Home care/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Skilled Nursing Visits",
        description:
          "Professional nursing care for wound management, injections, and health monitoring.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Post-Surgery Home Care",
        description:
          "Recovery support after hospitalization with dressing changes and mobility assistance.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Elder Care Support",
        description:
          "Daily assistance, medication reminders, and social companionship for seniors.",
      },
      {
        icon: "pill",
        iconSet: "lucide",
        title: "Medication Administration",
        description:
          "Timely medication support with compliance tracking and side-effect monitoring.",
      },
      {
        icon: "heartPulse",
        iconSet: "lucide",
        title: "Vital Monitoring at Home",
        description:
          "Regular blood pressure, sugar, and vital checks with doctor coordination.",
      },
    ],
    whyChooseUs: [
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Compassionate Caregivers",
        description: "Trained professionals who treat every patient with dignity and respect.",
      },
      {
        icon: "microscope",
        iconSet: "health",
        title: "Clinical Excellence",
        description: "Evidence-based home care protocols monitored by qualified clinicians.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Flexible Scheduling",
        description: "Visits arranged around your routine and recovery needs.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Family Communication",
        description: "Regular updates and coordination with family members and doctors.",
      },
    ],
    conditions: [
      "Post-surgery recovery",
      "Elder care",
      "Chronic illness support",
      "Wound care",
      "Medication management",
      "Mobility assistance",
    ],
    symptoms: [
      "Difficulty leaving home",
      "Post-hospitalization weakness",
      "Need for nursing support",
      "Wound dressing required",
      "Medication supervision",
      "Fall risk at home",
    ],
    highlights: [
      "Skilled home nursing",
      "Personalized care plans",
      "Post-discharge support",
      "Family peace of mind",
    ],
    faqs: [
      faq(
        "What home care services do you offer?",
        "Skilled nursing visits, wound care, medication administration, vitals monitoring, and elder support.",
      ),
      faq(
        "How do I arrange a home visit?",
        "Contact our home care coordinator to assess needs and schedule the first visit.",
      ),
      faq(
        "Is home care available after hospital discharge?",
        "Yes. Post-surgical and post-hospitalization packages are among our most requested services.",
      ),
    ],
    cta: {
      title: "Heal Comfortably at Home",
      subtitle:
        "Book a home care assessment and let our team support your recovery where you live.",
      image: "/images/services/Home care/homecare2.jpg",
      buttonLabel: "Book Home Care",
    },
  },
  telemedicine: {
    hero: {
      title: "Telemedicine",
      headline: "Consult from Anywhere. Anytime.",
      description:
        "Connect with Everest Polyclinic doctors through secure video consultations — ideal for follow-ups, minor ailments, and second opinions.",
      image: "/images/services/TeleMedicine/Telemedicine1.jpg",
      secondaryCtaLabel: "Talk to Expert",
      eyebrow: "Online Consultation",
      features: [
        { icon: "video", iconSet: "lucide", label: "Secure Video Consults" },
        { icon: "home", iconSet: "lucide", label: "Consult from Home" },
        { icon: "activity", iconSet: "lucide", label: "Reduced Waiting Time" },
        { icon: "pill", iconSet: "lucide", label: "Digital Prescriptions" },
      ],
    },
    about:
      "Telemedicine connects you with Everest Polyclinic doctors through secure video consultations. It is ideal for follow-ups, minor ailments, and second opinions when an in-person visit is not required.\n\nFrom prescription renewals and report reviews to specialist referrals, our online consultations deliver the same clinical quality as physical visits — with added convenience, privacy, and reduced travel time.",
    aboutBenefits: [
      {
        icon: "video",
        iconSet: "lucide",
        title: "Secure Video Platform",
        description: "Private, encrypted consultations from the comfort of your home.",
      },
      {
        icon: "clock",
        iconSet: "lucide",
        title: "Flexible Scheduling",
        description: "Book convenient time slots that fit your day without travel delays.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Prescription & Reports",
        description: "Digital prescriptions, report reviews, and follow-up plans online.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Specialist Access",
        description: "Connect with the right specialist without geographic limitations.",
      },
    ],
    sections: {
      about: {
        eyebrow: "About Telemedicine",
        title: "Modern Healthcare, Anytime, Anywhere",
      },
      offerings: {
        eyebrow: "Our Services",
        title: "Telemedicine Services We Offer",
        subtitle:
          "Convenient online consultations for follow-ups, minor illnesses, and report reviews.",
      },
      whyChooseUs: {
        eyebrow: "Why Choose Us",
        title: "Why Patients Choose Our Telemedicine",
      },
      faq: {
        eyebrow: "Frequently Asked Questions",
        title: "Have Questions?",
        subtitle:
          "Find answers to common questions about telemedicine at our clinic.",
        image: "/images/services/TeleMedicine/have a questions.jpg",
      },
    },
    serviceOfferings: [
      {
        icon: "video",
        iconSet: "lucide",
        title: "Video Consultations",
        description:
          "One-on-one secure video sessions with qualified doctors for diagnosis and advice.",
      },
      {
        icon: "pill",
        iconSet: "lucide",
        title: "Prescription Renewals",
        description:
          "Refill existing prescriptions after a short online review with your doctor.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Follow-up Appointments",
        description:
          "Continue your care plan with virtual check-ins between in-person visits.",
      },
      {
        icon: "scan",
        iconSet: "lucide",
        title: "Report Review Online",
        description:
          "Share lab reports and imaging for online interpretation and guidance.",
      },
      {
        icon: "users",
        iconSet: "lucide",
        title: "Specialist E-Referrals",
        description:
          "Get referred to the right specialist without multiple in-person visits.",
      },
    ],
    whyChooseUs: [
      {
        icon: "video",
        iconSet: "lucide",
        title: "Consult from Anywhere",
        description: "Access quality care from home, work, or while traveling.",
      },
      {
        icon: "activity",
        iconSet: "lucide",
        title: "Reduced Travel & Waiting",
        description: "Save time and avoid crowded waiting rooms.",
      },
      {
        icon: "heart",
        iconSet: "lucide",
        title: "Secure, Private Sessions",
        description: "Your health data and consultations remain fully confidential.",
      },
      {
        icon: "clipboardcheck",
        iconSet: "lucide",
        title: "Digital Prescriptions",
        description: "Receive prescriptions electronically when clinically appropriate.",
      },
    ],
    conditions: [
      "Follow-up consultations",
      "Minor ailments",
      "Report review",
      "Prescription renewal",
      "Second opinions",
      "Remote monitoring",
    ],
    symptoms: [
      "Mild fever",
      "Follow-up needed",
      "Medication questions",
      "Unable to travel",
      "Chronic condition review",
      "Post-treatment check-in",
    ],
    highlights: [
      "Consult from anywhere",
      "Secure video platform",
      "Reduced waiting time",
      "Digital prescriptions",
    ],
    faqs: [
      faq(
        "What can be treated via telemedicine?",
        "Follow-ups, minor illnesses, report reviews, and prescription renewals are commonly handled online.",
      ),
      faq(
        "Do I need special software?",
        "No. You receive a secure link for your video consultation — accessible on phone or computer.",
      ),
      faq(
        "Can I get a prescription online?",
        "When clinically appropriate, your doctor may issue a digital prescription after teleconsultation.",
      ),
    ],
    cta: {
      title: "Need a Consultation from Home?",
      subtitle:
        "Book a telemedicine appointment and connect with our doctors online.",
      image: "/images/services/TeleMedicine/telemedicine2.jpg",
      buttonLabel: "Book Telemedicine",
    },
  },
};

export function enrichServicesWithPageContent(services) {
  return services.map((service) => {
    const page = SERVICE_PAGE_CONTENT[service.slug] ?? {};
    const about =
      page.about ??
      page.overview ??
      page.overviewExtra ??
      "";

    return {
      ...service,
      about,
      overview: about,
      hero: page.hero ?? null,
      aboutBenefits: page.aboutBenefits ?? [],
      conditions: page.conditions ?? [],
      serviceOfferings: page.serviceOfferings ?? page.services ?? null,
      treatments: page.treatments ?? [],
      whyChooseUs: page.whyChooseUs ?? null,
      benefits: page.benefits ?? page.whyChooseUs ?? [],
      highlights: page.hero?.highlights ?? page.highlights ?? null,
      faqs: page.faqs ?? [],
      cta: page.cta ?? null,
      sections: page.sections ?? null,
      heroSideImage: page.heroSideImage ?? page.hero?.image ?? null,
    };
  });
}
