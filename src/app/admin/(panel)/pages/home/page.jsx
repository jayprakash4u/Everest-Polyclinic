"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Images, MessageSquareQuote, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminShell";

/**
 * Overview for the home page.
 *
 * The editable parts are listed in the order a visitor scrolls past them, so
 * an admin who knows what the page looks like can find the right screen
 * without reading any labels.
 */
const SECTIONS = [
  {
    href: "/admin/pages/home/hero",
    icon: Images,
    title: "Hero Slider",
    description:
      "The full-width carousel at the top. Add, replace, reorder or remove slides and edit their captions.",
  },
  {
    href: "/admin/pages/home/care-team",
    icon: Users,
    title: "Meet Our Care Team",
    description:
      "The photograph beside the doctors block, and the alt text that describes it.",
  },
  {
    href: "/admin/pages/home/patient-voices",
    icon: MessageSquareQuote,
    title: "Patient Voices",
    description:
      "The review carousel. Add new reviews, edit or delete existing ones, and attach patient photos.",
  },
];

export default function HomePageOverview() {
  return (
    <>
      <AdminPageHeader
        title="Home Page"
        subtitle="Everything on the public home page you can change, in the order a visitor meets it."
        action={
          <Button href="/" target="_blank" variant="outline" size="sm">
            View home page
            <ExternalLink size={14} />
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ href, icon: Icon, title, description }) => (
          <Link key={href} href={href} className="group">
            <AdminCard className="h-full transition-all group-hover:border-primary-300 group-hover:shadow-md">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Icon size={20} strokeWidth={1.9} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1.5 font-heading text-base font-bold text-primary-900">
                    {title}
                    <ArrowRight
                      size={15}
                      className="text-primary-400 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            </AdminCard>
          </Link>
        ))}
      </div>
    </>
  );
}
