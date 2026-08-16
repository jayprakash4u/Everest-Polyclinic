import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { DOCTOR_PAGE_STATS } from "@/constants/doctorsPage";
import { encodePublicPath } from "@/lib/encode-public-path";

const HERO_IMAGE = "/images/doctors/doctors_hero_side_image.png";

/* Stats come from the database (or the static fallback), so they carry no icon
   of their own. Matching by position keeps the data layer free of presentation
   concerns; `STAT_ICONS[i] ?? Users` covers a list of a different length. */
const STAT_ICONS = [Users, ShieldCheck, HeartHandshake, Clock];

export default function DoctorsHero({ stats = DOCTOR_PAGE_STATS }) {
  const items = stats?.length ? stats : DOCTOR_PAGE_STATS;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50/70 via-white to-white">
      {/* Below lg the photograph is a block at the top with the copy beneath
          it; from lg it lifts out of flow and holds the right of the section
          full height — the same arrangement as the homepage and about heroes. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
        <Image
          src={encodePublicPath(HERO_IMAGE)}
          alt="The Everest Healthcare clinical team"
          fill
          // This is the LCP on /doctors.
          preload
          sizes="(min-width: 1024px) 52vw, 100vw"
          /* The source is square, so a tall desktop column crops top and
             bottom — biasing upward keeps the crop off the faces. */
          className="object-cover object-[center_28%] lg:object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white via-white/55 to-transparent lg:block xl:w-32"
        />
      </div>

      <Container className="relative">
        <div className="py-8 sm:py-12 lg:w-[48%] lg:py-20 xl:py-24">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-primary-700">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="font-medium text-primary-900">Doctors</span>
          </nav>

          <p className="mt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary-600">
            <span className="h-px w-6 bg-secondary-400" />
            Our doctors
          </p>

          <h1 className="mt-5 font-heading text-[2.125rem] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-900 sm:text-5xl lg:text-[3.25rem]">
            Meet the people
            <br />
            behind your <span className="text-secondary-600">care.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Experienced specialists, physicians, and healthcare professionals
            committed to providing trusted care with compassion and excellence.
          </p>

          {/* One card divided by hairlines rather than four separate tiles —
              four cards would read as a grid competing with the headline. */}
          <dl className="mt-8 grid grid-cols-2 divide-x divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-e1 sm:mt-10 sm:grid-cols-4 sm:divide-y-0">
            {items.map((stat, index) => {
              const Icon = STAT_ICONS[index] ?? Users;

              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-2 py-5 text-center sm:px-3 sm:py-6"
                >
                  <Icon
                    className="h-6 w-6 text-secondary-600 sm:h-7 sm:w-7"
                    strokeWidth={1.5}
                  />
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="mt-3">
                    <span className="block font-heading text-lg font-semibold tracking-[-0.01em] text-primary-900 sm:text-xl">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-slate-600 sm:text-sm">
                      {stat.label}
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
