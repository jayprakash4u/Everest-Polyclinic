const BASE = "/images/Center of excellence";

/**
 * Icons are matched to departments by what each glyph actually depicts, not by
 * the number in its filename — `six.png` is the manual-therapy figure and
 * belongs to Physiotherapy, which leaves `five.png` for Anaesthesia. Renaming
 * the files to their department would be the better fix if they're ever
 * re-exported.
 */
export const CENTERS_OF_EXCELLENCE = [
  {
    title: "Orthopaedics",
    description: "Expert diagnosis and treatment for bone, joint, and mobility conditions.",
    image: `${BASE}/one.png`, // knee joint
    slug: "orthopedics",
  },
  {
    title: "Oncology",
    description: "Comprehensive care and advanced treatment for cancer patients.",
    image: `${BASE}/two.png`, // awareness ribbon held in a hand
    slug: null,
  },
  {
    title: "Pediatrics",
    description: "Dedicated care for infants, children, and adolescents at every stage.",
    image: `${BASE}/three.png`, // mother and child
    slug: "pediatrics",
  },
  {
    title: "Dermatology",
    description: "Medical and aesthetic skin care with precise, patient-focused treatment.",
    image: `${BASE}/four.png`, // face in profile with a leaf
    slug: "dermatology",
  },
  {
    title: "Physiotherapy",
    description: "Rehabilitation and movement therapy to restore strength and function.",
    image: `${BASE}/six.png`, // therapist working on a patient's spine
    slug: "physiotherapy",
  },
  {
    title: "Anaesthesia",
    description: "Expert pain management and surgical anaesthesia services.",
    image: `${BASE}/five.png`, // NOTE: blurred source, and 3:2 where the rest are square
    slug: null,
  },
];
