import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-card shadow-card p-4",
        hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
