import { headers } from "next/headers";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { getSiteSettings } from "@/lib/data/site";

// Both are variable fonts — no `weight` array needed, and the CSS variable is the
// only stable handle next/font exposes (the family name it generates is hashed).
// tailwind.config.js reads these same variables for `font-sans` / `font-heading`.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export async function generateMetadata() {
  const site = await getSiteSettings();

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [
      "polyclinic",
      "hospital",
      "Nepal",
      "Nepalgunj",
      "Nepalganj",
      "healthcare",
      "doctors",
      "lab tests",
    ],
    openGraph: {
      title: site.name,
      description: site.description,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }) {
  const pathname = (await headers()).get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-800">
        {isAdmin ? (
          children
        ) : (
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
