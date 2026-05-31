export const emergencyService = {
  id: 1,
  title: "24/7 Emergency",
  description:
    "Everest International Polyclinic's Emergency Department is equipped to handle all types of medical emergencies 24 hours a day, 7 days a week. Our team of highly trained emergency physicians, nurses, and support staff are always ready to provide immediate medical care for critical accident victims, heart attack patients, stroke cases, severe injuries, breathing difficulties, poisoning, severe allergies, and other life-threatening conditions. We understand that emergencies can happen at any time, which is why our emergency department operates round-the-clock with state-of-the-art medical equipment and advanced life-support systems to ensure the best possible outcomes for every patient. Our dedicated emergency team works seamlessly with other departments including ICU, surgery, and diagnostics to provide comprehensive care under one roof.",
  price: "Consultation: NPR 500-1000 | Treatment costs vary based on severity",
  priceTable: [
    { label: "Emergency Consultation", value: "NPR 500 - 1,000" },
    { label: "Treatment (ICU/Day)", value: "NPR 8,000 - 15,000" },
    { label: "Minor Procedures", value: "NPR 3,000 - 10,000" },
  ],
  process: [
    { num: "01", label: "Triage" },
    { num: "02", label: "Registration" },
    { num: "03", label: "Stabilization" },
    { num: "04", label: "Diagnosis" },
    { num: "05", label: "Treatment" },
    { num: "06", label: "Discharge" },
  ],
    doctors: [
     {
       name: "Dr. Rajesh Kumar",
       spec: "Emergency Medicine",
       img: "/images/doctors/e1.jpg",
     },
     {
       name: "Dr. Anil Sharma",
       spec: "General Physician",
       img: "/images/doctors/e2.jpg",
     },
     {
       name: "Dr. Priya Singh",
       spec: "Pediatric Emergency",
       img: "/images/doctors/e3.jpg",
     },
     {
       name: "Dr. Abinash Bhatta",
       spec: "Critical Care",
       img: "/images/doctors/e4.jpg",
     },
   ],
  timing: [
    { label: "Emergency", value: "24/7", icon: "pulse" },
    { label: "Consultation", value: "24/7", icon: "clock" },
    { label: "Ambulance", value: "24/7", icon: "ambulance" },
  ],
  patientTypes: [
    {
      condition: "Acute Chest Pain or Cardiac Events",
      description:
        "Patients experiencing chest pain, shortness of breath, or suspected heart attack symptoms require immediate emergency care.",
    },
    {
      condition: "Severe Accidents or Trauma",
      description:
        "Victims of road accidents, falls, or traumatic injuries with multiple injuries or severe bleeding.",
    },
    {
      condition: "Neurological Emergencies",
      description:
        "Patients with stroke symptoms, sudden loss of consciousness, seizures, or severe headaches with vision changes.",
    },
    {
      condition: "Severe Respiratory Distress",
      description:
        "Patients unable to breathe, gasping for air, or experiencing acute asthma attacks or pneumonia complications.",
    },
    {
      condition: "Severe Allergic Reactions",
      description:
        "Anaphylaxis or severe allergic reactions with swelling, difficulty breathing, or shock symptoms.",
    },
    {
      condition: "Poisoning or Drug Overdose",
      description:
        "Accidental or intentional consumption of toxic substances requiring immediate stomach pumping and supportive care.",
    },
    {
      condition: "Severe Abdominal Pain",
      description:
        "Acute abdomen pain suggesting appendicitis, peritonitis, or internal bleeding requiring surgical evaluation.",
    },
    {
      condition: "Uncontrolled Bleeding",
      description:
        "Severe external or internal bleeding that cannot be stopped and requires blood transfusion and emergency intervention.",
    },
  ],
  patientReviews: [
    {
      name: "Ramesh Sharma",
      location: "Kathmandu",
      review:
        "My father had a heart attack and the emergency team responded within minutes. They saved his life! Excellent care and professionalism.",
      rating: 5,
    },
    {
      name: "Priya Devi",
      location: "Bhaktapur",
      review:
        "When my child had severe breathing difficulty at night, the emergency doctors handled it with care and expertise. Very thankful!",
      rating: 5,
    },
    {
      name: "Rohan Poudel",
      location: "Lalitpur",
      review:
        "After a serious accident, the emergency team managed everything perfectly. The doctors were calm and the equipment was state-of-the-art.",
      rating: 5,
    },
    {
      name: "Sunita Gurung",
      location: "Panauti",
      review:
        "The 24/7 emergency service is a lifesaver. When I had a severe allergic reaction, they provided immediate treatment without any delay.",
      rating: 5,
    },
  ],
  headerImage: "/images/services/emergency-header.jpg",
  color: "primary",
};
