import Image from "next/image";

/** Banner asset is 2048×512 (4:1) — container must match or the image letterboxes or crops. */
const HERO_WIDTH = 2048;
const HERO_HEIGHT = 512;

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative aspect-[4/1] w-full">
        <Image
          src="/images/hero/Gemini_Generated_Image_ycr4xvycr4xvycr4.png"
          alt="Everest International Polyclinic — We care for you like family"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
