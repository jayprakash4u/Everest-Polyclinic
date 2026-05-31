import Image from "next/image";

export default function PharmacyBanner() {
  return (
    <div className="relative h-[200px] w-full bg-cover bg-center rounded-2xl overflow-hidden">
      <Image
        src="/pharmacy-banner.png"
        alt="Pharmacy Banner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Pharmacy 24/7</h3>
        <p className="text-sm text-white/90">
          Everest International Polyclinic&apos;s pharmacy operates 24 hours a day, 7 days a week to ensure patients have access to essential medicines at any time. Our well-stocked pharmacy offers all types of medications at government-fixed rates, making healthcare affordable for everyone.
        </p>
      </div>
    </div>
  );
}