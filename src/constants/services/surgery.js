export const surgeryService = {
  id: 4,
  title: "Surgery",
  description:
    "Everest International Polyclinic offers comprehensive surgical services with a team of highly skilled surgeons and state-of-the-art operating theaters. We provide general surgery, laparoscopic (minimally invasive) procedures, orthopedic surgery, and emergency surgical operations. Our advanced laparoscopic surgery techniques ensure smaller incisions, less pain, and faster recovery times for patients. We follow international standards of sterilization and safety protocols to ensure the best outcomes for every procedure. From pre-operative assessment to post-operative care, our surgical team provides complete support throughout your surgical journey.",
  headerImage: "/images/services/surgery-header.png",
  color: "blue",
  doctors: [
    {
      name: "Dr. Ramesh Adhikari",
      spec: "General Surgeon",
      img: "/images/doctors/doctor-5.jpg",
    },
    {
      name: "Dr. Sunita Shrestha",
      spec: "Laparoscopic Surgeon",
      img: "/images/doctors/doctor-6.jpg",
    },
    {
      name: "Dr. Bijay Shrestha",
      spec: "Orthopedic Surgeon",
      img: "/images/doctors/doctor-7.jpg",
    },
    {
      name: "Dr. Manoj K. Sharma",
      spec: "Plastic Surgeon",
      img: "/images/doctors/doctor-8.jpg",
    },
  ],
  surgeries: [
    {
      category: "Minor General Surgeries",
      procedures: [
        "Removal of cysts, lipomas (fat lumps), and small tumors",
        "Abscess drainage",
        "Wound stitching and minor injury repair",
        "Ingrown toenail surgery",
      ],
    },
    {
      category: "Dermatological Procedures",
      procedures: [
        "Mole and wart removal",
        "Skin biopsies",
        "Scar revision",
        "Treatment of skin infections or lesions",
      ],
    },
    {
      category: "ENT (Ear, Nose, Throat) Procedures",
      procedures: [
        "Ear wax removal (microsuction)",
        "Nasal polyp removal (minor cases)",
        "Tonsil-related minor procedures",
        "Foreign body removal (ear/nose)",
      ],
    },
    {
      category: "Gynecological Procedures",
      procedures: [
        "Pap smear and cervical biopsy",
        "Minor procedures like IUD insertion/removal",
        "Treatment of minor infections or cysts",
      ],
    },
    {
      category: "Dental Surgeries",
      procedures: [
        "Tooth extraction",
        "Root canal treatment",
        "Gum surgery (minor)",
        "Dental implants (in some advanced polyclinics)",
      ],
    },
    {
      category: "Orthopedic Minor Procedures",
      procedures: [
        "Joint injections",
        "Minor fracture management (casting/splinting)",
        "Tendon or ligament injections",
      ],
    },
    {
      category: "Ophthalmic (Eye) Procedures",
      procedures: [
        "Removal of foreign bodies from the eye",
        "Minor eyelid surgeries",
        "Eye injections (e.g., for certain conditions)",
      ],
    },
    {
      category: "Cosmetic / Aesthetic Procedures",
      procedures: [
        "Botox and fillers",
        "Laser treatments (hair removal, skin resurfacing)",
        "Chemical peels",
      ],
    },
  ],
};
