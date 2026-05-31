"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-[340px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/Gemini_Generated_Image_ycr4xvycr4xvycr4.png"
          alt="Everest Polyclinic"
          fill
          className="object-top"
          priority
        />
      </div>
    </div>
  );
}
