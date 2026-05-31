import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:   "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300",
  secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-300",
  accent:    "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-300",
  outline:   "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-300",
  outlineWhite: "border-2 border-white text-white hover:bg-white hover:text-primary-700 focus:ring-white",
  ghost:     "text-primary-600 hover:bg-primary-50 focus:ring-primary-300",
};

const sizes = {
  xs:  "px-2 py-1 text-xs",
  sm:  "px-4 py-2 text-sm",
  md:  "px-6 py-3 text-base",
  lg:  "px-8 py-4 text-lg",
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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant] || variants.primary,
    sizes[size]    || sizes.md,
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
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
