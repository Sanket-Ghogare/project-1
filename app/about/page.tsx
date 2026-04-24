import type { Metadata } from "next";
import AboutContent from "../components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | 12+ Years of IT Hardware & Solutions Excellence",
  description:
    "Since 2012, Great Ocean Comptech Pvt Ltd has delivered reliable IT hardware rentals & end-to-end IT solutions for 200+ businesses across India. Meet our founders — Balaji Chimegaave & Mahendra Sonwane — and learn our mission to make enterprise IT accessible to every business.",
  keywords: [
    "Great Ocean Comptech about",
    "GOCPL IT solutions",
    "IT hardware rental company India",
    "IT solutions provider Pune",
    "Balaji Chimegaave",
    "Mahendra Sonwane",
    "IT company 12 years experience",
    "200+ IT clients India",
  ],
  alternates: {
    canonical: "https://www.gocpl.co.in/about",
  },
  openGraph: {
    url: "https://www.gocpl.co.in/about",
    title: "About Great Ocean Comptech | 12+ Years of IT Excellence",
    description:
      "Founded in 2012, Great Ocean Comptech has served 200+ businesses across India with IT hardware rentals, cybersecurity, cloud & managed IT solutions.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
