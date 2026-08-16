/**
 * Fallback slides for the homepage hero.
 *
 * These were hard-coded inside Hero.jsx. They now live here so the same list
 * can serve three jobs: what renders when the database is unreachable, what the
 * admin editor is seeded from on first open, and the single place to change the
 * shipped default.
 *
 * Three of these five photographs carry headline text painted on the left-hand
 * wall, which is why the hero scrims that side to near-opaque rather than
 * washing the whole frame — see Hero.jsx.
 */
export const HOME_HERO_SLIDES = [
  {
    src: "/images/hero/firstimage.png",
    label: "Reception",
    alt: "Reception area at Everest International Polyclinic",
  },
  {
    src: "/images/hero/second image.png",
    label: "Consultation",
    alt: "A doctor consulting with a patient",
  },
  {
    src: "/images/hero/third imge.png",
    label: "Laboratory",
    alt: "A technician analysing samples in the laboratory",
  },
  {
    src: "/images/hero/fourth image.png",
    label: "Operating theatre",
    alt: "Surgical team at work in the operating theatre",
  },
  {
    src: "/images/hero/fiftth image.png",
    label: "Imaging suite",
    alt: "CT scanner in the imaging suite",
  },
];
