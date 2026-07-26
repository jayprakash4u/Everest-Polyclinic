import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "h-11 w-11 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
  xl: "h-[4.5rem] w-[4.5rem] rounded-2xl md:h-20 md:w-20",
  round: "h-16 w-16 rounded-2xl md:h-[4.5rem] md:w-[4.5rem]",
};

export default function ServiceIconFrame({
  size = "md",
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        "bg-white text-primary-600",
        "ring-1 ring-slate-200/90",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        className,
      )}
    >
      {children}
    </div>
  );
}
