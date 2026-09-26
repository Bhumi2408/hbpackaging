import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { JsonLd } from "@/components/Sections";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import siteSchema from "@/data/schema.json";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HB Packaging - Top Blister Packaging Manufacturer and Supplier in India",
  },
  description:
    "HB Packaging is a trusted Blister Packaging Manufacturer and Supplier in India, offering durable, affordable, and customized packaging solutions. Contact us today!",
    keywords: [
    "HB Packaging",
    "Blister Packaging Manufacturer",
    "Blister Packaging Supplier",
   ],
  icons: {
    icon: "/logo.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className="antialiased">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingChat />
        {siteSchema.map((s, i) => (
          <JsonLd key={i} data={s} />
        ))}
      </body>
    </html>
  );
}
