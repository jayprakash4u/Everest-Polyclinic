import Image from "next/image";
import {
  ArrowRight,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { encodePublicPath } from "@/lib/encode-public-path";

const HERO_IMAGE = "/images/about us/hero_healthcare_photo.png";

const PROOF_POINTS = [
  { icon: Users, label: "Expert\nSpecialists" },
  { icon: ShieldCheck, label: "NABL\nAccredited Lab" },
  { icon: Clock, label: "Same-Day\nReports" },
  { icon: HeartHandshake, label: "Patient-First\nApproach" },
];

export default function AboutUsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50/70 via-white to-white">
      {/*
        Two layouts from one element, the same arrangement the homepage hero
        uses: below lg the photograph is an ordinary block at the top with the
        copy beneath it; from lg it lifts out of flow and holds the right of
        the section full height.
      */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[46%]">
        <Image
          src={encodePublicPath(HERO_IMAGE)}
          alt="A doctor greeting a mother and her daughter in the clinic waiting area"
          fill
          // This is the LCP on /about.
          preload
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover object-center"
        />

        {/* The source is a photograph with a hard rectangular edge. Feathering
            the inner edge into the page background stops it reading as a
            pasted-in block and is what makes the split look designed. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white via-white/60 to-transparent lg:block xl:w-32"
        />
      </div>

      <Container className="relative">
        <div className="py-10 sm:py-14 lg:w-[52%] lg:py-24 xl:py-28">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary-600">
            <span className="h-px w-6 bg-secondary-400" />
            About us
          </p>

          <h1 className="mt-5 font-heading text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-900 sm:text-5xl lg:text-[3.25rem]">
            Better healthcare,
            <br />
            <span className="text-secondary-600">closer to home.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
            We bring trusted medical expertise, modern diagnostics, and
            compassionate care together in one place for families in Nepalgunj
            and beyond.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* twMerge resolves the background against the variant's own, so
                the navy override lands regardless of class order. */}
            <Button
              href="/doctors"
              size="lg"
              className="group w-full bg-primary-900 hover:bg-primary-800 focus-visible:ring-primary-900 sm:w-auto"
            >
              Meet Our Team
              <span className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white/50 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Button>

            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="w-full border-secondary-500 text-secondary-700 hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-800 focus-visible:ring-secondary-600 sm:w-auto"
            >
              Explore Our Services
              <ArrowRight size={18} strokeWidth={2} />
            </Button>
          </div>

          {/*
            Four claims in a row divided by hairlines rather than four separate
            cards — one object reads as a credential strip, four read as a
            second grid competing with the headline above it.
          */}
          <dl className="mt-10 grid grid-cols-2 divide-x divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-e1 sm:mt-12 sm:grid-cols-4 sm:divide-y-0">
            {PROOF_POINTS.map(({ icon: Icon, label }) => {
              const [first, second] = label.split("\n");

              return (
                <div
                  key={label}
                  className="flex flex-col items-center px-2 py-5 text-center sm:px-3 sm:py-6"
                >
                  <dt className="sr-only">{`${first} ${second}`}</dt>
                  <dd className="flex flex-col items-center">
                    <Icon
                      className="h-6 w-6 text-secondary-600 sm:h-7 sm:w-7"
                      strokeWidth={1.5}
                    />
                    <span className="mt-3 text-xs font-medium leading-snug text-slate-700 sm:text-sm">
                      {first}
                      <br />
                      {second}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
