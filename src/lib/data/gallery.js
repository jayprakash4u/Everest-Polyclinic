import { CACHE_TAGS, cachedRead } from "@/lib/cache";
import { prisma } from "@/lib/db";

const FALLBACK_GALLERY = [
  {
    id: 1,
    src: "/images/gallery/patient-trauma-care.jpg",
    alt: "Trauma patient receiving emergency care",
    caption: "Trauma Care - Road Accident Victim",
  },
  {
    id: 2,
    src: "/images/gallery/icu-monitors.jpg",
    alt: "Patient in ICU with vital monitors",
    caption: "ICU Intensive Monitoring",
  },
  {
    id: 3,
    src: "/images/gallery/emergency-surgery.jpg",
    alt: "Emergency surgery in progress",
    caption: "Emergency Surgery",
  },
  {
    id: 4,
    src: "/images/gallery/cardiac-care.jpg",
    alt: "Cardiac patient on monitoring",
    caption: "Cardiac Emergency Care",
  },
  {
    id: 5,
    src: "/images/gallery/ambulance-emergency.jpg",
    alt: "Ambulance bringing emergency patient",
    caption: "24/7 Ambulance Service",
  },
  {
    id: 6,
    src: "/images/gallery/oxygen-therapy.jpg",
    alt: "Patient receiving oxygen therapy",
    caption: "Oxygen Therapy",
  },
  {
    id: 7,
    src: "/images/gallery/iv-treatment.jpg",
    alt: "Patient receiving IV treatment",
    caption: "IV Fluid Therapy",
  },
  {
    id: 8,
    src: "/images/gallery/emergency-resuscitation.jpg",
    alt: "Emergency resuscitation in progress",
    caption: "Emergency Resuscitation",
  },
  {
    id: 9,
    src: "/images/gallery/pediatric-emergency.jpg",
    alt: "Child receiving emergency care",
    caption: "Pediatric Emergency Care",
  },
  {
    id: 10,
    src: "/images/gallery/wound-care.jpg",
    alt: "Emergency wound treatment",
    caption: "Wound Care & Suturing",
  },
  {
    id: 11,
    src: "/images/gallery/xray-diagnostics.jpg",
    alt: "Emergency X-ray diagnostics",
    caption: "Emergency Diagnostics",
  },
  {
    id: 12,
    src: "/images/gallery/recovery-room.jpg",
    alt: "Patient in recovery room",
    caption: "Post-Treatment Recovery",
  },
];

async function getGalleryImagesUncached() {
  try {
    const items = await prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    if (items.length) {
      return items.map(({ id, src, alt, caption }) => ({
        id,
        src,
        alt,
        caption: caption ?? alt,
      }));
    }
  } catch (error) {
    console.warn("[db] Gallery fallback:", error.message);
  }

  return FALLBACK_GALLERY;
}

/* Cached across requests; the admin write routes invalidate these tags. */
export const getGalleryImages = cachedRead(
  getGalleryImagesUncached,
  ["getGalleryImages"],
  CACHE_TAGS.gallery,
);
