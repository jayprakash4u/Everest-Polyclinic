import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * The one section header for the site.
 *
 * The eyebrow is a quiet uppercase label with a short rule rather than a filled
 * pill: with eight sections stacked down the homepage, a pill on each one reads
 * as a wall of badges. Pills are reserved for genuine status ("Best Seller").
 *
 * `action` holds the right-hand slot — a "View all" link, carousel arrows —
 * so each section stops re-inventing that row.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  align = "left",
  light = false,
  as: Heading = "h2",
  className,
  titleClassName,
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "mb-10 sm:mb-12",
        centered
          ? "flex flex-col items-center text-center"
          : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("min-w-0", centered ? "max-w-2xl" : "max-w-2xl")}>
        {eyebrow ? (
          <p
            className={cn(
              "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em]",
              centered && "justify-center",
              light ? "text-secondary-300" : "text-primary-600",
            )}
          >
            <span
              className={cn(
                "h-px w-6",
                light ? "bg-secondary-300/50" : "bg-primary-300",
              )}
            />
            {eyebrow}
          </p>
        ) : null}

        <Heading
          className={cn(
            "font-heading text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[2.125rem] lg:text-[2.625rem]",
            eyebrow && "mt-4",
            light ? "text-white" : "text-slate-900",
            titleClassName,
          )}
        >
          {title}
        </Heading>

        {subtitle ? (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed lg:text-lg",
              light ? "text-slate-300" : "text-slate-600",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className={cn("shrink-0", centered ? "mt-6" : "md:pb-1")}>{action}</div>
      ) : null}
    </Reveal>
  );
}
