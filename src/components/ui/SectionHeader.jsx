import { cn } from "@/lib/utils";
import Badge from "./Badge";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  badgeVariant = "primary",
  className,
}) {
  return (
    <div className={cn(centered && "text-center", "max-w-2xl", centered && "mx-auto", "mb-12", className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl font-bold leading-tight mb-4",
          light ? "text-white" : "text-slate-800"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light ? "text-slate-300" : "text-slate-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
