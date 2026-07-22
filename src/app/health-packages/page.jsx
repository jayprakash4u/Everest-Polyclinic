import HealthPackagesClientView from "./HealthPackagesClientView";
import { getHealthPackages } from "@/lib/data/healthPackages";

export default async function HealthPackagesPage() {
  const packages = await getHealthPackages();

  return <HealthPackagesClientView packages={packages} />;
}
