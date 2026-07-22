import DoctorsClientView from "./DoctorsClientView";
import { getDoctorsPageData } from "@/lib/data/doctors";

export const metadata = {
  title: "Our Doctors - Everest International Polyclinic",
  description:
    "Meet our team of board-certified specialists across cardiology, pediatrics, gynecology, orthopedics, and more at Everest International Polyclinic.",
};

export default async function DoctorsPage() {
  const { specialists, stats } = await getDoctorsPageData();

  return <DoctorsClientView specialists={specialists} stats={stats} />;
}
