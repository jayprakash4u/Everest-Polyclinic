import TreatmentGallery from "@/components/sections/TreatmentGallery";

export const metadata = {
  title: "Gallery - Everest International Polyclinic",
  description:
    "View photos from Everest International Polyclinic — our facilities, emergency care, and patient services.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-100 bg-primary-900 py-14 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary-400">
            Our Facility
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-100/90">
            A glimpse into our clinical environment, emergency response, and the
            care we provide every day at Everest Polyclinic.
          </p>
        </div>
      </section>
      <TreatmentGallery />
    </main>
  );
}
