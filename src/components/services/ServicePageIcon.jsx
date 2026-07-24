import { getHealthIcon } from "@/lib/health-icons";
import { getServiceIcon } from "@/lib/service-icons";
import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServicePageIcon({
  icon,
  iconSet = "lucide",
  size = 28,
  className = "",
}) {
  if (iconSet === "image") {
    return (
      <Image
        src={icon}
        alt="Service icon"
        fill
        className="h-full w-full object-contain"
      />
    );
  }

  if (iconSet === "health") {
    const HealthIcon = getHealthIcon(icon);
    if (HealthIcon) {
      const healthSize = Math.round(size * 1.2);
      return (
        <HealthIcon
          width={healthSize}
          height={healthSize}
          className={className}
          color="currentColor"
        />
      );
    }
  }

  const LucideIcon = getServiceIcon(icon) || Stethoscope;
  return <LucideIcon size={size} strokeWidth={1.75} className={className} />;
}
