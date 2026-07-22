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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export { SERVICES } from "@/constants/services/catalog";

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
    description: "50+ specialists across medical specialties with decades of experience.",
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

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
};
