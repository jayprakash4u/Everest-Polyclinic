/**
 * Defaults for the image slots the admin panel exposes under Pages → Home Page.
 *
 * These are the images the site shipped with. They are the fallback rendering
 * path, not dead code: every reader below falls back to them when the database
 * is unreachable or an admin has emptied a section, so the homepage never
 * renders a hole. Admin uploads live in the PageSectionImage table and win.
 */

/** Slot addresses. Kept here so the reader, the writer and the seed agree. */
export const HOME_PAGE = "home";
export const HERO_SECTION = "hero";
export const CARE_TEAM_SECTION = "care-team";

export const HOME_HERO_SLIDES = [
  {
    image: "/images/hero/firstimage.png",
    label: "Reception",
    alt: "Reception area at Everest International Polyclinic",
  },
  {
    image: "/images/hero/second image.png",
    label: "Consultation",
    alt: "A doctor consulting with a patient",
  },
  {
    image: "/images/hero/third imge.png",
    label: "Laboratory",
    alt: "A technician analysing samples in the laboratory",
  },
  {
    image: "/images/hero/fourth image.png",
    label: "Operating theatre",
    alt: "Surgical team at work in the operating theatre",
  },
  {
    image: "/images/hero/fiftth image.png",
    label: "Imaging suite",
    alt: "CT scanner in the imaging suite",
  },
];

export const HOME_CARE_TEAM_IMAGE = {
  image: "/images/sidedoctor.png",
  alt: "A clinician at Everest International Polyclinic",
};
