import type { Metadata } from "next";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";

export const metadata: Metadata = {
  title: "IT Hardware Rental & IT Solutions — Pan India | Great Ocean Comptech",
  description:
    "Rent or buy laptops, desktops & servers from Dell, HP, Lenovo, MacBook, ASUS, Acer, Microsoft Surface & 50+ more models. Cybersecurity, cloud (AWS/Azure/GCP), managed IT & AMC services. 12+ years · 200+ clients · Same-day delivery across India.",
  alternates: {
    canonical: "https://www.gocpl.co.in",
  },
  openGraph: {
    url: "https://www.gocpl.co.in",
    title: "IT Hardware Rental & IT Solutions — Pan India | Great Ocean Comptech",
    description:
      "India's trusted IT hardware rental provider. Dell, HP, Lenovo, MacBook, ASUS & more. Cybersecurity, Cloud, Managed IT. Same-day delivery Pan India.",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Clients />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
