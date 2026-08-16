import Image from "next/image";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

const bgVariants = {
  dark: "bg-slate-950",
  brand: "bg-primary-600",
  light: "bg-primary-50",
  white: "bg-white",
};

const roundedVariants = {
  full: "rounded-full",
  "2xl": "rounded-2xl",
  xl: "rounded-xl",
  lg: "rounded-lg",
  none: "",
};

/**
 * Square brand icon tile.
 *
 * These source PNGs are 1.2–1.5 MB each. They previously rendered `unoptimized`
 * at 2x intrinsic size, so a 44px tile downloaded the full-resolution file —
 * roughly 20 MB across the homepage. Letting next/image resize them is the fix;
 * `sizes` tells it how small they actually are.
 */
export default function BrandIconImage({
  src,
  alt = "",
  size = 72,
  rounded = "xl",
  variant = "dark",
  className,
  imageClassName,
}) {
  const renderSize = Math.round(size);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden",
        bgVariants[variant] ?? bgVariants.dark,
        roundedVariants[rounded] ?? "",
        className,
      )}
      style={{ width: renderSize, height: renderSize }}
    >
      <Image
        src={encodePublicPath(src)}
        alt={alt}
        width={renderSize}
        height={renderSize}
        sizes={`${renderSize}px`}
        className={cn("h-[90%] w-[90%] object-contain", imageClassName)}
      />
    </div>
  );
}
