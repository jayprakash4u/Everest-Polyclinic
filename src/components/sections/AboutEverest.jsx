import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { encodePublicPath } from "@/lib/encode-public-path";

const MAIN_IMAGE = "/images/services/laboratory/laboratory1.jpg";
const INSET_IMAGE = "/images/services/laboratory/laboratory 2.jpg";

const CREDENTIALS = [
  {
    icon: Microscope,
    title: "Advanced Technology",
    description:
      "Modern equipment and digital workflows for precise, reliable results.",
  },
  {
    icon: Users,
    title: "Expert Professionals",
    description:
      "Board-certified specialists and technicians with years of experience.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Strict quality control and accreditation to maintain testing standards.",
  },
  {
    icon: Clock,
    title: "Timely & Reliable",
    description:
      "Quick turnaround without compromising accuracy, because every result matters.",
  },
];

export default function AboutEverest() {
  return (
    <section className="relative overflow-hidden bg-primary-50/40 py-14 sm:py-20 lg:py-24">
      <Container className="relative">
        {/*
          45/55 across the full content width. The old arrangement put a narrow
          image beside a narrow column inside the same container, leaving a wide
          empty margin on both sides and making the whole section feel pinched.
        */}
        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] lg:gap-14 xl:gap-16">
          {/* ── Left: image composition ── */}
          <div className="relative pb-16 pr-10 sm:pb-20 sm:pr-16 lg:pb-24">
            {/* Decorative shapes, behind the photography. Brand blue and green
                rather than the reference's blue and red. */}
            <span
              aria-hidden="true"
              className="absolute -left-6 top-6 -z-10 h-40 w-40 rounded-[2.5rem] bg-primary-600/15 sm:h-52 sm:w-52"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-8 right-0 -z-10 h-32 w-32 rounded-full bg-secondary-500/20 sm:h-40 sm:w-40"
            />

            {/* Organic corner rounding — one corner square, three soft — is what
                keeps this from reading as a plain rectangle. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] bg-slate-100 shadow-e2 sm:aspect-[1200/1291]">
              <Image
                src={encodePublicPath(MAIN_IMAGE)}
                alt="A laboratory technician examining a sample under a microscope"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>

            {/* Floating inset, overlapping the lower-right corner. */}
            <div className="absolute bottom-4 right-0 w-[52%] max-w-[260px] overflow-hidden rounded-3xl bg-white p-1.5 shadow-e2 sm:bottom-6">
              <div className="relative aspect-[612/409] w-full overflow-hidden rounded-[1.35rem] bg-slate-100">
                <Image
                  src={encodePublicPath(INSET_IMAGE)}
                  alt="Blood sample tubes beside a microscope"
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── Right: copy, credentials, CTA ── */}
          <div>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-primary-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white sm:text-sm">
              <Users className="h-4 w-4 text-secondary-300" strokeWidth={2} />
              About Everest
            </span>

            <h2 className="mt-5 font-heading text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-primary-900 sm:text-[2.5rem] lg:text-[2.875rem]">
              Advanced Technology.
              <br />
              <span className="text-secondary-600">Trusted Professionals.</span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-5 block h-1 w-14 rounded-full bg-secondary-500"
            />

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-[17px]">
              At Everest International Polyclinic we combine modern diagnostic
              technology with a team of dedicated specialists to deliver
              accurate, reliable and timely results. Your health is our
              priority, and excellence is our commitment.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {CREDENTIALS.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="group flex gap-3.5 rounded-2xl border border-slate-200/70 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-e2 sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-100">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-[15px] font-semibold leading-snug tracking-[-0.01em] text-primary-900">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                      {description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary-900 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 sm:text-base"
            >
              Learn More About Us
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-900 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
