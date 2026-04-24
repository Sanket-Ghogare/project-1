import type { Metadata } from "next";
import ContactContent from "../components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free IT Quote — Call +91 98342 20116",
  description:
    "Contact Great Ocean Comptech Pvt Ltd for IT hardware rentals, cybersecurity, cloud & managed IT solutions. Call or WhatsApp +91 98342 20116 · Email: asked@gocpl.co.in · Oxford Avenue, Pirangut, Pune. Same-day delivery across India. Free consultation available.",
  keywords: [
    "contact Great Ocean Comptech",
    "GOCPL contact",
    "IT hardware rental quote India",
    "laptop rental enquiry",
    "IT solutions free quote",
    "IT company Pune contact",
    "WhatsApp IT support",
    "+91 98342 20116",
  ],
  alternates: {
    canonical: "https://www.gocpl.co.in/contact",
  },
  openGraph: {
    url: "https://www.gocpl.co.in/contact",
    title: "Contact Great Ocean Comptech | Free IT Quote",
    description:
      "Get in touch for IT hardware rentals, cybersecurity & cloud solutions. Call +91 98342 20116 or WhatsApp us. Same-day delivery across India.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
