import Image from "next/image";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

/**
 * Renders teal-on-black brand PNG icons sharply (no downscale blur).
 * Uses 2× intrinsic pixels + unoptimized for crisp edges on retina displays.
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
  const intrinsic = Math.max(renderSize * 2, renderSize >= 100 ? 280 : 160);

  const bgVariants = {
    dark: "bg-[#050505]",
    brand: "bg-gradient-to-br from-primary-600 to-primary-800",
    light: "bg-primary-50",
  };

  const roundedClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "2xl"
        ? "rounded-2xl"
        : rounded === "xl"
          ? "rounded-xl"
          : rounded === "lg"
            ? "rounded-lg"
            : rounded === "none"
              ? ""
              : "";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden",
        bgVariants[variant] ?? bgVariants.dark,
        roundedClass,
        className,
      )}
      style={{ width: renderSize, height: renderSize }}
    >
      <Image
        src={encodePublicPath(src)}
        alt={alt}
        width={intrinsic}
        height={intrinsic}
        unoptimized
        className={cn("h-[90%] w-[90%] object-contain", imageClassName)}
      />
    </div>
  );
}
