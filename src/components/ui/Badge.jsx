import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary-50 text-primary-700 ring-primary-100",
  secondary: "bg-secondary-50 text-secondary-700 ring-secondary-100",
  accent: "bg-accent-50 text-accent-700 ring-accent-100",
  // Brand green, not stock Tailwind green — `success` used to sit outside the palette.
  success: "bg-secondary-50 text-secondary-700 ring-secondary-100",
  neutral: "bg-slate-50 text-slate-600 ring-slate-200",
  solid: "bg-primary-600 text-white ring-primary-600",
};

/**
 * Reserved for genuine status ("Best Seller"), not for section eyebrows —
 * SectionHeader renders a quiet label rule instead, so pills stay meaningful.
 */
export default function Badge({
  children,
  variant = "primary",
  uppercase = true,
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        uppercase && "uppercase tracking-[0.08em]",
        variants[variant] ?? variants.primary,
        className,
      )}
    >
      {children}
    </span>
  );
}
