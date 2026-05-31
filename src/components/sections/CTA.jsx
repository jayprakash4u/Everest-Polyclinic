import Button from "@/components/ui/Button";
import { SITE } from "@/constants";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-700 relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <div className="relative container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Book Your Appointment?
        </h2>
        <p className="text-slate-200 text-lg mb-8 max-w-xl mx-auto">
          Get expert medical care today. Call us, walk in, or book online — we're here for you.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button href="/contact" variant="accent" size="lg">
            Book Appointment
          </Button>
          <Button href={`tel:${SITE.phone}`} variant="outlineWhite" size="lg">
            Call: {SITE.phone}
          </Button>
        </div>

        {/* Features row */}
        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          {[
            "No Long Waits",
            "Expert Specialists",
            "Home Sample Collection",
            "Online Reports",
          ].map((f) => (
            <span key={f} className="font-medium">{f}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
