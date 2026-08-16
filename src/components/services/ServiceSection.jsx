import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  white: "bg-white",
  muted: "border-y border-slate-100 bg-slate-50/70",
  soft: "bg-gradient-to-b from-primary-50/30 via-white to-white",
};

export default function ServiceSection({
  children,
  tone = "white",
  className,
  containerClassName,
  id,
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-10 sm:py-14 md:py-20 lg:py-24",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <div
        className={cn(
          "container mx-auto max-w-6xl px-4 sm:px-6",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
