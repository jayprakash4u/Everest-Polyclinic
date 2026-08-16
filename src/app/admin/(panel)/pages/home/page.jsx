import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminShell";

/**
 * Sections of the homepage, in the order a visitor meets them.
 *
 * An `href` means the section has its own editor under this page. Anything
 * without one is not editable yet — its content still lives in code — and gets
 * an editor here as each is brought across.
 */
const SECTIONS = [
  {
    name: "Hero carousel",
    description: "Rotating images, captions and alt text at the top of the page.",
    href: "/admin/pages/home/hero",
  },
  {
    name: "Centres of Excellence",
    description: "The six specialty cards below the hero.",
  },
  {
    name: "Diagnostic care",
    description: "Lab photography, opening hours and the test list.",
  },
  {
    name: "Health packages",
    description:
      "Priced checkup packages, and which of them appear on the homepage.",
    href: "/admin/pages/home/health-packages",
  },
  {
    name: "Meet your care team",
    description: "Section photograph, beside the care-team copy.",
    href: "/admin/pages/home/care-team",
  },
  {
    name: "Contact & booking",
    description: "Address, phone, hours and the inline booking form.",
  },
  {
    name: "Our medical services",
    description: "The eight service cards and their icons.",
  },
  {
    name: "Why Everest",
    description: "Six reasons, with the side photograph.",
  },
  {
    name: "Patient voices",
    description: "Patient reviews shown in the testimonials carousel.",
    href: "/admin/pages/home/testimonials",
  },
  {
    name: "FAQs",
    description: "Accordion of common questions.",
  },
];

export default function AdminHomePage() {
  return (
    <>
      <AdminPageHeader
        title="Home page"
        subtitle="Every section a visitor sees, in the order they meet it."
        action={
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View page
            <ExternalLink size={15} />
          </Link>
        }
      />

      <AdminCard className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-100">
          {SECTIONS.map((section, index) => {
            const target = section.href;

            const row = (
              <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1a3a5c]">{section.name}</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {section.description}
                  </p>
                </div>

                {section.href ? (
                  <span className="hidden shrink-0 rounded-full bg-secondary-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary-700 sm:inline">
                    Edit
                  </span>
                ) : (
                  <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 sm:inline">
                    Not editable yet
                  </span>
                )}

                {target ? (
                  <ChevronRight size={18} className="shrink-0 text-slate-300" />
                ) : (
                  <span className="w-[18px] shrink-0" />
                )}
              </div>
            );

            return (
              <li key={section.name}>
                {target ? (
                  <Link
                    href={target}
                    className="block transition-colors hover:bg-primary-50/50"
                  >
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
      </AdminCard>
    </>
  );
}
