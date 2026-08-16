import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Green acts, blue structures.
 *
 * `primary` is the green action — the one thing on a view you most want clicked.
 * It uses secondary-600 (#1F843C) rather than the lighter logo green, which
 * fails WCAG AA against white at button text sizes.
 */
const variants = {
  primary:
    "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600",
  secondary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600",
  accent:
    "bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-600",
  outline:
    "border border-slate-300 text-slate-800 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-primary-600",
  outlineWhite:
    "border border-white/70 text-white hover:bg-white hover:text-primary-700 focus-visible:ring-white",
  ghost:
    "text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-600",
};

const sizes = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  fullWidth,
  ...props
}) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
    "transition-colors duration-200",
    // focus-visible, not focus — a plain `focus` ring also fires on mouse click.
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth && "w-full",
    className,
  );

  if (href) {
    // `props` must be forwarded here too — dropping it silently discarded
    // onClick / target / aria-* on every link-button.
    return (
      <Link href={href} className={base} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
