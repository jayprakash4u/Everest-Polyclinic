import { cn } from "@/lib/utils";

const variants = {
  primary:   "bg-primary-100 text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
  accent:    "bg-accent-100 text-accent-700",
  success:   "bg-green-100 text-green-700",
  neutral:   "bg-slate-100 text-slate-600",
};

export default function Badge({ children, variant = "primary", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
