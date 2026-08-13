import { cn } from "@/lib/utils";

/**
 * The single content-width rule for the site. Matches the Navbar so every
 * section's left edge lands on the same vertical line as the logo.
 */
export default function Container({ children, className, as: Tag = "div", ...props }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
