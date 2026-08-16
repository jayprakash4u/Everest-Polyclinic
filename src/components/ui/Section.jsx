import { cn } from "@/lib/utils";
import Container from "./Container";

const tones = {
  white: "bg-white",
  /*
    Was `bg-slate-50/60`, which resolves to about #FBFCFD — a ~1% step off
    white. Every "tinted" band on the page was therefore invisible and the
    whole scroll read as one flat white sheet. primary-50 is a real tint, tied
    to the brand blue rather than to neutral grey, so the alternation actually
    registers while staying calm enough to sit behind white cards.
  */
  muted: "border-y border-primary-100/70 bg-primary-50",
  // One dark band mid-page acts as an anchor and stops the white/tint
  // alternation from reading as an undifferentiated scroll.
  dark: "bg-primary-900",
};

const sizes = {
  default: "py-16 sm:py-20 lg:py-24",
  compact: "py-12 sm:py-16",
};

/**
 * One vertical rhythm and one content width for every section on the page.
 * Tones alternate white/muted down the page so neighbouring blocks separate
 * without needing decorative dividers.
 */
export default function Section({
  children,
  tone = "white",
  size = "default",
  className,
  containerClassName,
  ...props
}) {
  return (
    <section
      className={cn(tones[tone] ?? tones.white, sizes[size] ?? sizes.default, className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
