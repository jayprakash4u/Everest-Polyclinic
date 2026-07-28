import { headers } from "next/headers";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { getSiteSettings } from "@/lib/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-800">
        {isAdmin ? (
          children
        ) : (
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
