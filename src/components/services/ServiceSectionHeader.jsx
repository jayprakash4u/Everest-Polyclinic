import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function ServiceSectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {badge ? (
        <Badge variant={light ? "neutral" : "primary"} className="mb-4">
          {badge}
        </Badge>
      ) : null}
      <h2
        className={cn(
          "font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl",
          light ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/85" : "text-slate-600",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
