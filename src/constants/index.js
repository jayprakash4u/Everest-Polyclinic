export const SITE = {
  name: "Everest International Polyclinic",
  shortName: "Everest Polyclinic",
  tagline: "World-Class Healthcare at the Foot of the Himalayas",
  description:
    "Nepal's most trusted international polyclinic offering comprehensive medical services with cutting-edge technology and compassionate care.",
  phone: "+977 986-1848382",
  email: "info@everestpolyclinic.com",
  address: "Mid-Baneshwor, Kathmandu, Nepal",
  workingHours: "Sun – Fri: 8:00 AM – 8:00 PM",
  emergencyHotline: "+977 01-4567890",
};

export const NAV_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Services",      href: "/services" },
  { label: "Departments",   href: "/departments" },
  { label: "Doctors",       href: "/doctors" },
  { label: "Health Package",href: "/health-packages" },
  { label: "Blog",          href: "/blog" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/contact" },
];

export const SERVICES = [
  { id: 1, title: "Emergency (ER)", description: "24/7 emergency services with rapid response teams.", icon: "emergency", color: "secondary" },
  { id: 2, title: "Outpatient (OPD)", description: "Comprehensive outpatient services.", icon: "opd", color: "primary" },
  { id: 3, title: "Inpatient (IPD)", description: "Quality inpatient care.", icon: "ipd", color: "accent" },
  { id: 4, title: "General Medicine", description: "Comprehensive primary care.", icon: "stethoscope", color: "primary" },
  { id: 5, title: "General Surgery", description: "Advanced surgical procedures.", icon: "surgery", color: "secondary" },
  { id: 6, title: "Cardiology", description: "Advanced heart care.", icon: "heart", color: "secondary" },
  { id: 7, title: "Orthopedics", description: "Bone, joint and muscle care.", icon: "bone", color: "accent" },
  { id: 8, title: "Gynecology", description: "Complete women's health services.", icon: "baby", color: "secondary" },
  { id: 9, title: "Pediatrics", description: "Expert pediatric care.", icon: "pediatrics", color: "primary" },
  { id: 10, title: "Neurology", description: "Comprehensive neurological services.", icon: "neurology", color: "accent" },
  { id: 11, title: "Dermatology", description: "Skin, hair and nail treatments.", icon: "sparkles", color: "primary" },
  { id: 12, title: "ENT", description: "Ear, Nose and Throat specialist.", icon: "ear", color: "secondary" },
  { id: 13, title: "Ophthalmology", description: "Complete eye care services.", icon: "ophthalmology", color: "primary" },
  { id: 14, title: "Oncology (Cancer)", description: "Comprehensive cancer care.", icon: "oncology", color: "accent" },
  { id: 15, title: "Radiology", description: "Digital imaging services.", icon: "scan", color: "primary" },
  { id: 16, title: "Pathology & Lab", description: "NABL-accredited laboratory.", icon: "flask", color: "accent" },
  { id: 17, title: "Pharmacy", description: "24/7 pharmacy services.", icon: "pharmacy", color: "secondary" },
];

export const STATS = [
  { value: "25,000+", label: "Patients Treated" },
  { value: "50+",     label: "Specialist Doctors" },
  { value: "15+",     label: "Years of Excellence" },
  { value: "500+",    label: "Lab Tests Available" },
];

export const WHY_CHOOSE_US = [
  {
    title: "International Standards",
    description: "JCI-aligned protocols and internationally trained medical professionals.",
    icon: "globe",
  },
  {
    title: "24/7 Emergency Care",
    description: "Round-the-clock emergency services with rapid response teams.",
    icon: "alarm",
  },
  {
    title: "NABL Accredited Lab",
    description: "ISO 15189:2012 certified laboratory ensuring accurate diagnostics.",
    icon: "shield",
  },
  {
    title: "Home Sample Collection",
    description: "Convenient doorstep blood and sample collection across Kathmandu.",
    icon: "home",
  },
  {
    title: "Online Reports",
    description: "Secure digital reports delivered within 24 hours via WhatsApp and email.",
    icon: "document",
  },
  {
    title: "Expert Specialists",
    description: "50+ specialists across 20+ departments with decades of experience.",
    icon: "users",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sita Sharma",
    location: "Kathmandu",
    rating: 5,
    review:
      "Everest Polyclinic gave me world-class treatment at affordable prices. The doctors are extremely knowledgeable and caring.",
    avatar: "/avatars/sita.jpg",
  },
  {
    id: 2,
    name: "Ramesh Karki",
    location: "Pokhara",
    rating: 5,
    review:
      "I flew in from Pokhara specifically for their cardiac evaluation. Outstanding facility and professional staff.",
    avatar: "/avatars/ramesh.jpg",
  },
  {
    id: 3,
    name: "Priya Thapa",
    location: "Lalitpur",
    rating: 5,
    review:
      "The lab reports came on WhatsApp within hours. So convenient and the results were very accurate.",
    avatar: "/avatars/priya.jpg",
  },
];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Anand Shrestha",
    specialty: "Cardiologist",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: "18 Years",
    image: "/doctors/doctor1.jpg",
  },
  {
    id: 2,
    name: "Dr. Sunita Rai",
    specialty: "Gynecologist",
    qualification: "MBBS, MS (OBG)",
    experience: "14 Years",
    image: "/doctors/doctor2.jpg",
  },
  {
    id: 3,
    name: "Dr. Bikram Poudel",
    specialty: "Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho)",
    experience: "12 Years",
    image: "/doctors/doctor3.jpg",
  },
  {
    id: 4,
    name: "Dr. Priya Maharjan",
    specialty: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    experience: "10 Years",
    image: "/doctors/doctor4.jpg",
  },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About Us",     href: "/about" },
    { label: "Services",     href: "/services" },
    { label: "Our Doctors",  href: "/doctors" },
    { label: "Lab Tests",    href: "/services#lab" },
    { label: "Contact Us",   href: "/contact" },
  ],
  services: [
    { id: "gen-med", label: "General Medicine",  href: "/services" },
    { id: "cardio", label: "Cardiology",        href: "/services" },
    { id: "path-lab", label: "Pathology & Lab",   href: "/services" },
    { id: "radio", label: "Radiology",         href: "/services" },
    { id: "gyno", label: "Gynecology",        href: "/services" },
  ],
};
