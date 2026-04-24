import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gocpl.co.in"),
  title: {
    default: "Great Ocean Comptech Pvt Ltd | IT Hardware Rental & IT Solutions — Pan India",
    template: "%s | Great Ocean Comptech",
  },
  description:
    "India's trusted IT hardware rental & end-to-end IT solutions provider. Rent or buy laptops (Dell, HP, Lenovo, MacBook, ASUS, Acer), desktops & servers. Cybersecurity, Cloud (AWS/Azure/GCP), Managed IT & AMC. 12+ years · 200+ clients · Same-day delivery.",
  keywords: [
    "laptop rental India",
    "laptop rental Pune",
    "laptop on rent",
    "IT hardware rental India",
    "desktop rental India",
    "server rental India",
    "bulk laptop rental India",
    "corporate laptop rental",
    "laptop hire India",
    "event laptop rental",
    "MacBook rental India",
    "Dell laptop rental",
    "HP EliteBook rental",
    "Lenovo ThinkPad rental",
    "ASUS laptop rental",
    "Acer laptop rental",
    "Microsoft Surface rental",
    "same day laptop delivery India",
    "cybersecurity solutions India",
    "cloud services AWS Azure GCP",
    "managed IT services India",
    "NAS SAN storage solutions",
    "AMC IT services",
    "antivirus endpoint protection",
    "IT solutions provider India",
    "Great Ocean Comptech",
    "Great Ocean Comptech Pvt Ltd",
    "GOCPL",
    "IT hardware Pune",
    "laptop rental Pirangut",
    "Microsoft 365 India",
    "Google Workspace India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.gocpl.co.in",
    siteName: "Great Ocean Comptech Pvt Ltd",
    title: "Great Ocean Comptech Pvt Ltd | IT Hardware Rental & IT Solutions — Pan India",
    description:
      "India's trusted IT hardware rental & IT solutions provider. Laptops, desktops, servers, cybersecurity, cloud & managed IT. 12+ years · 200+ clients · Same-day delivery Pan India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Great Ocean Comptech — IT Hardware Rental Pan India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Ocean Comptech | IT Hardware Rental & IT Solutions",
    description:
      "India's trusted IT hardware rental & end-to-end IT solutions. Dell, HP, Lenovo, MacBook, ASUS & more. Same-day delivery Pan India. 12+ years · 200+ clients.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.gocpl.co.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.gocpl.co.in/#organization",
      name: "Great Ocean Comptech Pvt Ltd",
      alternateName: ["GOCPL", "Great Ocean Comptech"],
      url: "https://www.gocpl.co.in",
      logo: "https://www.gocpl.co.in/logo.png",
      description:
        "India's trusted IT hardware rental & end-to-end IT solutions provider — laptops, desktops, servers, cybersecurity, cloud and managed IT services.",
      foundingDate: "2012",
      telephone: "+919834220116",
      email: "asked@gocpl.co.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Oxford Avenue, Ground Floor",
        addressLocality: "Pirangut",
        addressRegion: "Maharashtra",
        postalCode: "412115",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919834220116",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      ],
      sameAs: ["https://wa.me/919834220116"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.gocpl.co.in/#localbusiness",
      name: "Great Ocean Comptech Pvt Ltd",
      description:
        "IT hardware rental and end-to-end IT solutions provider. Serving businesses across India.",
      url: "https://www.gocpl.co.in",
      telephone: "+919834220116",
      email: "asked@gocpl.co.in",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Oxford Avenue, Ground Floor",
        addressLocality: "Pirangut",
        addressRegion: "Maharashtra",
        postalCode: "412115",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday",
          "Thursday", "Friday", "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      areaServed: { "@type": "Country", name: "India" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IT Hardware & Solutions",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laptop Rental — Dell, HP, Lenovo, MacBook, ASUS, Acer, Microsoft Surface" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desktop Rental & Sales" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Server Rental & Procurement" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Antivirus & Cybersecurity Solutions" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "NAS & SAN Storage Solutions" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Services — AWS, Azure, GCP" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed IT Services & AMC" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Microsoft 365 & Google Workspace" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gocpl.co.in/#website",
      url: "https://www.gocpl.co.in",
      name: "Great Ocean Comptech Pvt Ltd",
      publisher: { "@id": "https://www.gocpl.co.in/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.gocpl.co.in/services?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
