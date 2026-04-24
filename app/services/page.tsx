import type { Metadata } from "next";
import ServicesContent from "../components/ServicesContent";

export const metadata: Metadata = {
  title: "IT Services & Solutions | Hardware Rental, Security, Cloud & More",
  description:
    "Complete IT solutions from Great Ocean Comptech: laptop & server rentals (Dell, HP, Lenovo, MacBook, ASUS, Acer), cybersecurity (firewalls, SIEM, antivirus), NAS/SAN storage, cloud (AWS/Azure/GCP), Microsoft 365, Google Workspace & AMC. Pan-India same-day delivery.",
  keywords: [
    "IT services India",
    "laptop rental India",
    "server rental India",
    "cybersecurity solutions",
    "antivirus solutions India",
    "firewall SIEM India",
    "cloud services AWS Azure GCP",
    "managed IT services AMC",
    "NAS SAN storage India",
    "Microsoft 365 India",
    "Google Workspace India",
    "backup disaster recovery India",
    "remote monitoring IT",
    "IT hardware rental same day delivery",
  ],
  alternates: {
    canonical: "https://www.gocpl.co.in/services",
  },
  openGraph: {
    url: "https://www.gocpl.co.in/services",
    title: "IT Services & Solutions | Great Ocean Comptech",
    description:
      "Laptop & server rentals, cybersecurity, NAS/SAN storage, cloud, M365, Google Workspace & managed IT. Pan-India delivery. Get a free quote today.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
