export const DOCTOR_SPECIALISTS = [
  {
    category: "General Physician",
    slug: "general-physician",
    doctors: [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        education: "MBBS, MD (Medicine)",
        experience: "15+ Years",
        image: "/images/doctors/doctor-1.jpg",
      },
      {
        id: 2,
        name: "Dr. Anil Sharma",
        education: "MBBS, MD (General Medicine)",
        experience: "12+ Years",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Pediatrician",
    slug: "pediatrician",
    doctors: [
      {
        id: 3,
        name: "Dr. Priya Singh",
        education: "MBBS, MD (Pediatrics)",
        experience: "10+ Years",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Gynecologist",
    slug: "gynecologist",
    doctors: [
      {
        id: 4,
        name: "Dr. Sunita Sharma",
        education: "MBBS, MD (Gynecology)",
        experience: "14+ Years",
        image: "/images/doctors/doctor-4.jpg",
      },
      {
        id: 5,
        name: "Dr. Meera Acharya",
        education: "MBBS, MS (Obstetrics)",
        experience: "11+ Years",
        image: "/images/doctors/doctor-1.jpg",
      },
    ],
  },
  {
    category: "Cardiologist",
    slug: "cardiologist",
    doctors: [
      {
        id: 6,
        name: "Dr. Amit Patel",
        education: "MBBS, MD (Cardiology)",
        experience: "18+ Years",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Dermatologist",
    slug: "dermatologist",
    doctors: [
      {
        id: 7,
        name: "Dr. Sanjay Joshi",
        education: "MBBS, MD (Dermatology)",
        experience: "9+ Years",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Orthopedic",
    slug: "orthopedic",
    doctors: [
      {
        id: 8,
        name: "Dr. Binod Shah",
        education: "MBBS, MS (Orthopedics)",
        experience: "16+ Years",
        image: "/images/doctors/doctor-4.jpg",
      },
    ],
  },
  {
    category: "ENT Specialist",
    slug: "ent",
    doctors: [
      {
        id: 9,
        name: "Dr. Ramesh Thapa",
        education: "MBBS, MS (ENT)",
        experience: "13+ Years",
        image: "/images/doctors/doctor-1.jpg",
      },
    ],
  },
  {
    category: "Dentist",
    slug: "dentist",
    doctors: [
      {
        id: 10,
        name: "Dr. Kamala Rai",
        education: "BDS, MDS (Dental Surgery)",
        experience: "8+ Years",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Physiotherapist",
    slug: "physiotherapist",
    doctors: [
      {
        id: 11,
        name: "Dr. Deepak Bhatta",
        education: "BPT, MPT (Physiotherapy)",
        experience: "7+ Years",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Psychologist",
    slug: "psychologist",
    doctors: [
      {
        id: 12,
        name: "Dr. Asha Karki",
        education: "MA, PhD (Psychology)",
        experience: "10+ Years",
        image: "/images/doctors/doctor-4.jpg",
      },
    ],
  },
];

export const DOCTOR_PAGE_STATS = [
  { value: "50+", label: "Specialist Doctors" },
  { value: "15+", label: "Medical Services" },
  { value: "25,000+", label: "Patients Treated" },
  { value: "24/7", label: "Emergency Care" },
];

export const HOMEPAGE_SPECIALISTS = DOCTOR_SPECIALISTS.flatMap((group) =>
  group.doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    degree: doctor.education,
    experience: doctor.experience,
    specialist: group.category,
    timing: "10:00 AM - 04:00 PM",
    phone: "+977 9800000000",
    image: doctor.image,
  })),
).slice(0, 10);
