import DepartmentsClientView from "./DepartmentsClientView";

export const metadata = {
  title: "Our Departments - Everest International Polyclinic",
  description: "Explore our specialized medical departments.",
};

export default function Page() {
  // We just call the Client component here
  return <DepartmentsClientView />;
}