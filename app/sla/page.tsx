import type { Metadata } from "next";
import SLAContent from "../components/SLAContent";

export const metadata: Metadata = {
  title: "SLA & Rental Agreement | Great Ocean Comptech",
  description: "Service Level Agreement and IT Hardware Rental Agreement — Great Ocean Comptech Pvt. Ltd.",
  robots: { index: false, follow: false },
};

export default function SLAPage() {
  return <SLAContent />;
}
