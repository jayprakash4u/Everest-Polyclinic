const BASE = "/images/services/servicies page services image";

/** Offering card images — keyed by service slug, then offering title */
export const SERVICE_OFFERING_IMAGES = {
  "general-medicine": {
    "General Consultation": `${BASE}/general medicine/General consulation.jpg`,
    "Health Checkups": `${BASE}/general medicine/Health checkup.jpg`,
    "Chronic Disease Management": `${BASE}/general medicine/Chronic Disease Management.jpg`,
    "Diagnostic Services": `${BASE}/general medicine/Diagnostic Services.jpg`,
    "Preventive Care": `${BASE}/general medicine/Preventive Care.jpg`,
    "Follow-up Care": `${BASE}/general medicine/Follow-up Care.jpg`,
  },
  "family-medicine": {
    "Routine Check-ups": `${BASE}/Family medicine/Routine Check-ups.jpg`,
    "Child & Adolescent Care": `${BASE}/Family medicine/Child & Adolescent Care.jpg`,
    "Adult Health Care": `${BASE}/Family medicine/Adult Health Care.jpg`,
    "Senior Care": `${BASE}/Family medicine/Senior Care.jpg`,
    Immunizations: `${BASE}/Family medicine/Immunizations.jpg`,
    "Health Counseling": `${BASE}/Family medicine/Health Counseling.jpg`,
  },
  pediatrics: {
    "Well-Child Checkups": `${BASE}/pediatric/Well-Child Checkups.jpg`,
    Immunization: `${BASE}/pediatric/Immunization.jpg`,
    "Growth & Development": `${BASE}/pediatric/Growth & Development.jpg`,
    "Childhood Infections": `${BASE}/pediatric/Childhood Infections.jpg`,
    "Nutrition Counseling": `${BASE}/pediatric/Nutrition Counseling.jpg`,
    "Newborn Care": `${BASE}/pediatric/Newborn Care.webp`,
  },
  gynecology: {
    "Routine Gynecological Checkups": `${BASE}/Gynecology/Routine Gynecological Checkups.jpg`,
    "Menstrual Disorder Treatment": `${BASE}/Gynecology/Menstrual Disorder Treatment.jpg`,
    "Preconception & Pregnancy Care": `${BASE}/Gynecology/Preconception & Pregnancy Care.jpg`,
    "Family Planning & Contraception": `${BASE}/Gynecology/Family Planning & Contraception.webp`,
    "Menopause Management": `${BASE}/Gynecology/Menopause Management.jpg`,
    "Cervical Cancer Screening": `${BASE}/Gynecology/Cervical Cancer Screening.jpg`,
  },
  orthopedics: {
    "Joint Pain Treatment": `${BASE}/Orthopedics/joint pain treaetment.jpg`,
    "Fracture Care": `${BASE}/Orthopedics/Fracture Care.jpg`,
    "Spine Care": `${BASE}/Orthopedics/Spine Care.jpg`,
    "Sports Injury Rehab": `${BASE}/Orthopedics/Sports Injury Rehab.jpg`,
    "Arthritis Treatment": `${BASE}/Orthopedics/Arthritis Treatment.jpg`,
    "Post-Surgery Rehab": `${BASE}/Orthopedics/Post-Surgery Rehab.jpg`,
  },
  cardiology: {
    "ECG & Heart Checkup": `${BASE}/Cardiology/ECG & Heart Checkup.jpg`,
    Echocardiography: `${BASE}/Cardiology/Echocardiography.jpg`,
    Angiography: `${BASE}/Cardiology/Angiography.jpg`,
    "Heart Failure Care": `${BASE}/Cardiology/Heart Failure Care.jpg`,
    "Hypertension Care": `${BASE}/Cardiology/Hypertension Care.jpg`,
    "Heart Rhythm Care": `${BASE}/Cardiology/Heart Rhythm Care.jpg`,
  },
  dermatology: {
    "Acne Treatment": `${BASE}/Dermatology Care/Acne Treatment.jpg`,
    "Skin Allergy": `${BASE}/Dermatology Care/Skin Allergy.jpg`,
    "Hair & Scalp Care": `${BASE}/Dermatology Care/Hair & Scalp Care.jpg`,
    Pigmentation: `${BASE}/Dermatology Care/Pigmentation.jpg`,
    "Wart Removal": `${BASE}/Dermatology Care/Wart Removal.jpg`,
    "Nail Disorders": `${BASE}/Dermatology Care/Nail Disorders.jpg`,
  },
  ent: {
    "Ear Care": `${BASE}/Ent/Ear Care.jpg`,
    "Nasal Care": `${BASE}/Ent/Nasal Care.jpg`,
    "Throat Care": `${BASE}/Ent/Throat Care.jpg`,
    "Hearing Care": `${BASE}/Ent/Hearing Care.jpg`,
    "Head & Neck": `${BASE}/Ent/Head & Neck.jpg`,
    "Pediatric ENT": `${BASE}/Ent/Pediatric ENT.jpg`,
    "ENT Surgeries": `${BASE}/Ent/ENT Surgeries.jpg`,
  },
  "dental-care": {
    "Dental Checkup": `${BASE}/Dental care/Dental Checkup.jpg`,
    "Teeth Cleaning": `${BASE}/Dental care/Teeth Cleaning.jpg`,
    "Cavity Treatment": `${BASE}/Dental care/cavity care.jpg`,
    "Dental Implants": `${BASE}/Dental care/Dental Implants.jpg`,
    Orthodontics: `${BASE}/Dental care/Orthodontics.jpg`,
    "Teeth Whitening": `${BASE}/Dental care/Teeth Whitening.jpg`,
  },
  physiotherapy: {
    "Manual Therapy": `${BASE}/Physiotherapy/Manual Therapy.jpg`,
    "Exercise Therapy": `${BASE}/Physiotherapy/Exercise Therapy.jpg`,
    "Posture Correction": `${BASE}/Physiotherapy/Posture Correction.jpg`,
    "Sports Injury Rehab": `${BASE}/Physiotherapy/Sports Injury Rehab.jpg`,
    Electrotherapy: `${BASE}/Physiotherapy/Electrotherapy.jpg`,
    "Geriatric Physiotherapy": `${BASE}/Physiotherapy/Geriatric Physiotherapy.jpg`,
  },
  laboratory: {
    Hematology: `${BASE}/Laboratory/Hematology.jpg`,
    Biochemistry: `${BASE}/Laboratory/Biochemistry.webp`,
    Immunology: `${BASE}/Laboratory/Immunology.jpg`,
    Microbiology: `${BASE}/Laboratory/Microbiology.jpg`,
    "Hormone Assays": `${BASE}/Laboratory/Hormone Assays.jpg`,
    "Urine & Stool Analysis": `${BASE}/Laboratory/Urine & Stool Analysis.jpg`,
  },
  "diagnostic-imaging": {
    "X-Ray": `${BASE}/Diagnostic Imaging/X-Ray.jpg`,
    "CT Scan": `${BASE}/Diagnostic Imaging/CT Scan.jpg`,
    "MRI Scan": `${BASE}/Diagnostic Imaging/MRI Scan.jpg`,
    Ultrasound: `${BASE}/Diagnostic Imaging/Ultrasound.jpg`,
    Mammography: `${BASE}/Diagnostic Imaging/Mammography.jpg`,
    "Bone Density Scan": `${BASE}/Diagnostic Imaging/Bone Density Scan.jpg`,
  },
  vaccination: {
    "Childhood Vaccination": `${BASE}/Vaccinastion services images/child hood injection.jpg`,
    "Adult Vaccination": `${BASE}/Vaccinastion services images/adult vaccination.jpg`,
    "Travel Vaccination": `${BASE}/Vaccinastion services images/Travel vaccination.jpg`,
    "Flu & Seasonal Vaccines": `${BASE}/Vaccinastion services images/Flu and sessional injection.jpg`,
    "Corporate Vaccination": `${BASE}/Vaccinastion services images/Corporate Vaccination.jpg`,
  },
  pharmacy: {
    "Prescription Medicines": `${BASE}/Pharmacy/Prescription Medicines.jpg`,
    "OTC Products": `${BASE}/Pharmacy/OTC Products.jpg`,
    "Chronic Care Support": `${BASE}/Pharmacy/Chronic Care Support.jpg`,
    "Health Supplements": `${BASE}/Pharmacy/Health Supplements.jpg`,
    "Baby & Mother Care": `${BASE}/Pharmacy/Baby & Mother Care.jpg`,
    "Medical Accessories": `${BASE}/Pharmacy/Medical Accessories.jpg`,
  },
  "home-care": {
    "Skilled Nursing Care": `${BASE}/Home care/Skilled Nursing Care.jpg`,
    "Post-Surgery Recovery": `${BASE}/Home care/Post-Surgery Recovery.jpg`,
    "Elder Care Services": `${BASE}/Home care/Elder Care Services.jpg`,
    "Chronic Disease Support": `${BASE}/Home care/Chronic Disease Support.jpg`,
    "Physiotherapy at Home": `${BASE}/Home care/Physiotherapy at Home.jpg`,
    "Palliative Care": `${BASE}/Home care/Palliative Care.jpg`,
  },
  telemedicine: {
    "Video Consultations": `${BASE}/Telemedicine/Video Consultations.jpg`,
    "Prescription Renewals": `${BASE}/Telemedicine/Prescription Renewals.jpg`,
    "Follow-up Appointments": `${BASE}/Telemedicine/Follow-up Appointments.jpg`,
    "Report Review Online": `${BASE}/Telemedicine/Report Review Online.jpg`,
    "Specialist E-Referrals": `${BASE}/Telemedicine/Specialist E-Referrals.jpg`,
  },
};

export function getOfferingImage(slug, title) {
  return SERVICE_OFFERING_IMAGES[slug]?.[title] ?? null;
}

export function getOfferingImageCoverage() {
  const slugs = Object.keys(SERVICE_OFFERING_IMAGES);
  const counts = slugs.map((slug) => ({
    slug,
    mapped: Object.keys(SERVICE_OFFERING_IMAGES[slug]).length,
  }));
  return { services: slugs.length, counts };
}
