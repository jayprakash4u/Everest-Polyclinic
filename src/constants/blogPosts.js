export const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Heart Health: Prevention is Key",
    excerpt:
      "Learn about the importance of regular cardiac checkups and lifestyle changes that can prevent heart diseases.",
    image: "/images/blog/heart-health.jpg",
    category: "Cardiology",
    date: "April 10, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Mental Health Matters: Breaking the Stigma",
    excerpt:
      "Mental health is just as important as physical health. Discover how to prioritize your psychological well-being.",
    image: "/images/blog/mental-health.jpg",
    category: "Mental Health",
    date: "April 8, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Nutrition Tips for a Healthy Lifestyle",
    excerpt:
      "Balanced diet is the foundation of good health. Expert tips on eating right and maintaining optimal weight.",
    image: "/images/blog/nutrition.jpg",
    category: "Nutrition",
    date: "April 5, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Diabetes Management: Living a Healthy Life",
    excerpt:
      "Tips and strategies for managing diabetes effectively and maintaining quality of life.",
    image: "/images/blog/diabetes.jpg",
    category: "Diabetes Care",
    date: "April 2, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Women's Health: Regular Checkups Save Lives",
    excerpt:
      "Why women should prioritize regular health screenings and preventive care.",
    image: "/images/blog/womens-health.jpg",
    category: "Women's Health",
    date: "March 28, 2026",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Child Vaccination: A Parent's Guide",
    excerpt:
      "Everything you need to know about childhood vaccinations and their importance.",
    image: "/images/blog/vaccination.jpg",
    category: "Pediatrics",
    date: "March 25, 2026",
    readTime: "7 min read",
  },
  {
    id: 7,
    title: "How to Prepare for a Fasting Blood Test",
    excerpt:
      "Step-by-step guide on proper fasting procedures to ensure accurate blood test results every time.",
    image: "/images/blog/fasting-blood-test.jpg",
    category: "Lab Tests",
    date: "March 22, 2026",
    readTime: "3 min read",
  },
  {
    id: 8,
    title: "Managing High Blood Pressure Naturally",
    excerpt:
      "Effective lifestyle changes and natural remedies to keep your blood pressure under control.",
    image: "/images/blog/blood-pressure.jpg",
    category: "Cardiovascular",
    date: "March 18, 2026",
    readTime: "5 min read",
  },
  {
    id: 9,
    title: "Importance of Regular Health Checkups",
    excerpt:
      "Why annual health screenings are crucial for early detection and prevention of diseases.",
    image: "/images/blog/checkup.jpg",
    category: "Preventive Care",
    date: "March 15, 2026",
    readTime: "4 min read",
  },
  {
    id: 10,
    title: "Understanding Common Lab Tests",
    excerpt:
      "A comprehensive guide to understanding your blood work and what each test means for your health.",
    image: "/images/blog/lab-tests.jpg",
    category: "Lab Tests",
    date: "March 12, 2026",
    readTime: "6 min read",
  },
  {
    id: 11,
    title: "Healthy Sleep Habits for Better Life",
    excerpt:
      "Tips and strategies to improve your sleep quality and overall well-being through better rest.",
    image: "/images/blog/sleep.jpg",
    category: "Wellness",
    date: "March 10, 2026",
    readTime: "5 min read",
  },
  {
    id: 12,
    title: "Home Care Services: When to Consider",
    excerpt:
      "Learn when home healthcare services are beneficial and how they can support recovery and daily living.",
    image: "/images/blog/home-care.jpg",
    category: "Home Care",
    date: "March 5, 2026",
    readTime: "4 min read",
  },
];

export const STATIC_FAQS = [
  {
    question: "What are your laboratory operating hours?",
    answer:
      "Our main laboratory is open Monday through Friday from 7:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. Emergency services are available 24/7.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book through our online form, call our hotline, or visit the facility directly. Home sample collection is also available across the city.",
  },
  {
    question: "How long does it take to get test results?",
    answer:
      "Most routine results are ready within 24–48 hours. Specialized tests may take 3–7 days. Results are shared via email, WhatsApp, or in-person pickup.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we work with major insurance providers. Contact our billing desk for coverage details and claim assistance.",
  },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function toBlogSlug(title) {
  return slugify(title);
}

export function parseReadTimeMinutes(readTime) {
  const match = String(readTime).match(/(\d+)/);
  return match ? Number(match[1]) : 5;
}

export function formatBlogDate(date) {
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return date;
}

export function formatReadTime(minutes) {
  return `${minutes} min read`;
}
