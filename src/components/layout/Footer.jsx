import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">E</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white text-base">Everest International</p>
                <p className="text-xs text-primary-400">Polyclinic</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {SITE.description}
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 {SITE.address}</p>
              <p>📞 {SITE.phone}</p>
              <p>✉️ {SITE.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Working Hours</h4>
            <div className="space-y-2 text-sm">
              <p>{SITE.workingHours}</p>
              <p className="text-primary-400">Emergency: {SITE.emergencyHotline}</p>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold text-white text-sm mb-2">Follow Us</h5>
              <div className="flex gap-3">
                {["FB", "Twitter", "Insta"].map((social) => (
                  <span key={social} className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs hover:bg-primary-600 hover:text-white transition-colors cursor-pointer">
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
