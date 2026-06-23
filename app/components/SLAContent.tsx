"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/* ── Editable inline field ────────────────────────── */
function Field({
  value,
  onChange,
  placeholder,
  multiline = false,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  className?: string;
}) {
  const base =
    "bg-transparent border-b-2 border-dashed border-purple-400 focus:border-purple-600 outline-none text-gray-800 placeholder-purple-300 w-full transition-colors";
  return multiline ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className={`${base} resize-none text-sm leading-relaxed ${className}`}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${base} text-sm ${className}`}
    />
  );
}

/* ── Section header ───────────────────────────────── */
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="print-section-header flex items-center gap-3 bg-purple-700 text-white px-4 py-2.5 rounded-t-xl">
      <span className="text-purple-200 font-mono font-bold text-xs tracking-widest">// {num}</span>
      <span className="font-extrabold text-sm sm:text-base tracking-wide uppercase">{title}</span>
    </div>
  );
}

/* ── Section wrapper ──────────────────────────────── */
function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="print-no-break mb-6 rounded-xl overflow-hidden border border-purple-100 shadow-sm">
      <SectionHeader num={num} title={title} />
      <div className="bg-white p-4 sm:p-6">{children}</div>
    </div>
  );
}

/* ── Sub-heading inside a section ─────────────────── */
function SubHead({ children }: { children: React.ReactNode }) {
  return <p className="text-purple-700 font-extrabold text-sm mb-2 mt-4 first:mt-0">{children}</p>;
}

/* ── Bullet list ──────────────────────────────────── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-1.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Table (static rows) ──────────────────────────── */
function Table({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-purple-100 mt-1">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([term, detail], i) => (
            <tr key={String(term)} className={i % 2 === 0 ? "bg-white" : "print-purple-bg bg-purple-50"}>
              <td className="px-4 py-2.5 font-bold text-gray-800 border-r border-purple-100 w-1/3">{term}</td>
              <td className="px-4 py-2.5 text-gray-700">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function SLAContent() {
  const docRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  /* ── Editable fields state ── */
  const [clientName, setClientName] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [rentalAmount, setRentalAmount] = useState("");

  const [clientSigName, setClientSigName] = useState("");
  const [clientSigDesig, setClientSigDesig] = useState("");
  const [clientSigDate, setClientSigDate] = useState("");
  const [clientSigPlace, setClientSigPlace] = useState("");

  const [gocplSigName, setGocplSigName] = useState("");
  const [gocplSigDate, setGocplSigDate] = useState("");

  /* ── PDF download ── */
  const handleDownload = async () => {
    if (!docRef.current) return;
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(docRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableW = pageW - margin * 2;
      const imgH = (canvas.height * usableW) / canvas.width;

      let yPos = margin;
      let remainingH = imgH;

      while (remainingH > 0) {
        const sliceH = Math.min(remainingH, pageH - margin * 2);
        const srcY = ((imgH - remainingH) / imgH) * canvas.height;
        const srcH = (sliceH / imgH) * canvas.height;

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = srcH;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

        pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", margin, yPos, usableW, sliceH);
        remainingH -= sliceH;
        if (remainingH > 0) { pdf.addPage(); yPos = margin; }
      }

      pdf.save("GOCPL_SLA_Rental_Agreement.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Printable document content ── */}
      <div ref={docRef}>

        {/* ── Document Header ── */}
        <div className="bg-white border-b border-purple-100 pt-6 pb-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Image
              src="/logo-transparent.png"
              alt="Great Ocean Comptech Pvt Ltd"
              width={160}
              height={48}
              className="h-12 w-auto object-contain mx-auto mb-4"
            />
            <p className="text-purple-700 font-bold text-sm">Oxford Avenue, Ground Floor, Pirangut 412115, Pune</p>
            <p className="text-gray-500 text-sm mt-0.5">
              +91 98342 20116 &nbsp;|&nbsp; asked@gocpl.co.in &nbsp;|&nbsp; www.gocpl.co.in
            </p>
            <p className="text-gray-500 text-sm">Mon – Sat: 9 AM – 7 PM</p>

            <div className="mt-6 inline-block bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-extrabold tracking-widest uppercase shadow print-section-header">
              IT Hardware Rental &amp; SLA Agreement
            </div>

            {/* Download button — hidden on print */}
            <div className="print-hide mt-5">
              <button
                onClick={handleDownload}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating PDF…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Parties Table ── */}
          <div className="print-no-break mb-6 rounded-xl overflow-hidden border border-purple-100 shadow-sm">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-purple-100">
              <div className="print-purple-bg bg-purple-50 p-4 sm:p-6">
                <p className="text-purple-600 font-extrabold text-xs uppercase tracking-widest mb-3">Client (Lessee)</p>
                <Field
                  value={clientName}
                  onChange={setClientName}
                  placeholder="Enter Client Name & Address"
                  multiline
                />
              </div>
              <div className="print-purple-bg bg-purple-50 p-4 sm:p-6">
                <p className="text-purple-600 font-extrabold text-xs uppercase tracking-widest mb-2">Service Provider (Lessor)</p>
                <p className="text-gray-800 font-bold text-sm">Great Ocean Comptech Pvt. Ltd. (GOCPL)</p>
                <p className="text-gray-600 text-sm">Oxford Avenue, Ground Floor, Pirangut, Pune – 412115</p>
                <p className="text-gray-600 text-sm">+91 98342 20116 · asked@gocpl.co.in · www.gocpl.co.in</p>
              </div>
            </div>
          </div>

          {/* 01 */}
          <Section num="01" title="Effective Date & Duration">
            <Table rows={[
              ["Agreement Effective From",
                <Field key="date" value={effectiveDate} onChange={setEffectiveDate} placeholder="Enter date (e.g. 01 June 2025)" />
              ],
              ["Minimum Rental Period", "2 Years (subject to extension or termination as per terms)"],
              ["SLA Contract Period", "1 Year, renewable annually"],
            ]} />
          </Section>

          {/* 02 */}
          <Section num="02" title="Mission & Vision">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="print-purple-bg bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="text-purple-700 font-extrabold text-sm mb-2 uppercase tracking-wide">Mission</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Provide reliable, customised hardware and IT solutions backed by professional support,
                  transparent pricing, and seamless networking — building trust through every engagement.
                </p>
              </div>
              <div className="print-purple-bg bg-violet-50 rounded-xl p-4 border border-violet-100">
                <p className="text-violet-700 font-extrabold text-sm mb-2 uppercase tracking-wide">Vision</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Become a leading independent IT solutions provider in India — recognised for innovation,
                  customer-centric service, and deep technical expertise across hardware, cloud, and security.
                </p>
              </div>
            </div>
          </Section>

          {/* 03 */}
          <Section num="03" title="Scope of Services">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              GOCPL agrees to provide end-to-end IT Hardware Renting &amp; Solutions including laptops, desktops,
              servers, networking equipment, and peripherals on short-term and long-term rental models.
            </p>
            <SubHead>Services Include:</SubHead>
            <BulletList items={[
              "Delivery, installation, and configuration",
              "Preventive maintenance",
              "Replacement of faulty equipment",
              "24×7 technical support",
            ]} />
          </Section>

          {/* 04 */}
          <Section num="04" title="Rental Terms">
            <Table rows={[
              ["Purchase Order (PO)", "Client to issue PO for required equipment"],
              ["Rental Fee",
                <span key="rental" className="flex items-center gap-1 text-sm">
                  Rs.&nbsp;
                  <Field value={rentalAmount} onChange={setRentalAmount} placeholder="Amount" className="w-28" />
                  &nbsp;/- per laptop per month
                </span>
              ],
              ["Security Deposit", "Rs. 1,00,000/- (refundable subject to equipment condition)"],
              ["Payment Terms", "Monthly advance"],
              ["Late Payment Penalty", "5% per day on outstanding amount"],
              ["Equipment Ownership", "All equipment remains sole property of GOCPL at all times"],
            ]} />
          </Section>

          {/* 05 */}
          <Section num="05" title="Service Performance Guarantees">
            <SubHead>Hardware Availability</SubHead>
            <BulletList items={[
              "100% on-time delivery after PO & deposit confirmation",
              "Backup provision: 1 device per 15 users to ensure smooth operations",
            ]} />
            <SubHead>Infrastructure &amp; Support</SubHead>
            <BulletList items={[
              "Preventive maintenance scheduled with 12 hours prior notice",
              "Faulty equipment replacement within 12 hours of complaint logging",
            ]} />
            <SubHead>Customer Care</SubHead>
            <BulletList items={[
              "Helpdesk Support: 24×7",
              "Initial response within 30 minutes of ticket creation",
              "Critical issues resolved within 4 working hours",
              "Escalation matrix provided at service acceptance",
            ]} />
          </Section>

          {/* 06 */}
          <Section num="06" title="Responsibilities of Lessee">
            <BulletList items={[
              "Use equipment only for lawful purposes",
              "Maintain equipment in good condition; no unauthorized repairs or modifications",
              "Report damage or loss to GOCPL immediately upon occurrence",
              "Liable for repair/replacement costs beyond normal wear and tear",
            ]} />
          </Section>

          {/* 07 */}
          <Section num="07" title="Inventory & Asset Management">
            <BulletList items={[
              "Monthly physical inventory conducted by GOCPL CRM team",
              "Jointly signed inventory record submitted alongside invoice",
              "Missing assets at termination compensated at prevailing market rates",
            ]} />
          </Section>

          {/* 08 */}
          <Section num="08" title="Compliance">
            <BulletList items={[
              "GOCPL complies with Anti-Bribery & Anti-Corruption Laws",
              "Both parties comply with Data Protection Laws — IT Act 2000 & DPDP Act 2023",
            ]} />
          </Section>

          {/* 09 */}
          <Section num="09" title="Liability & Indemnity">
            <BulletList items={[
              "GOCPL not liable for misuse, illegal software use, or data loss caused by the Lessee",
              "Lessee indemnifies GOCPL against all third-party claims arising from misuse of equipment",
            ]} />
          </Section>

          {/* 10 */}
          <Section num="10" title="Dispute Resolution">
            <BulletList items={[
              "Disputes to be resolved amicably through negotiation in the first instance",
              "If unresolved, arbitration under Arbitration & Conciliation Act, 1996 — sole arbitrator mutually appointed",
              "Jurisdiction: Courts in Pune, Maharashtra",
            ]} />
          </Section>

          {/* 11 */}
          <Section num="11" title="Termination">
            <BulletList items={[
              "Lessor may terminate immediately for breach of agreement terms",
              "Lessee must return all equipment within 24 hours of termination notice",
              "Either party may terminate for poor performance or non-compliance with SLA",
              "Immediate termination triggered by violation of compliance clauses",
            ]} />
          </Section>

          {/* 12 */}
          <Section num="12" title="Authorised Signatures">
            <div className="grid sm:grid-cols-2 gap-6">

              {/* Client */}
              <div className="border border-purple-100 rounded-xl p-5">
                <p className="text-purple-700 font-extrabold text-sm uppercase tracking-wide mb-5">For Client (Lessee)</p>
                {[
                  { label: "Name", value: clientSigName, set: setClientSigName },
                  { label: "Designation", value: clientSigDesig, set: setClientSigDesig },
                  { label: "Date", value: clientSigDate, set: setClientSigDate },
                  { label: "Place", value: clientSigPlace, set: setClientSigPlace },
                ].map(({ label, value, set }) => (
                  <div key={label} className="mb-4">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{label}:</p>
                    <Field value={value} onChange={set} placeholder={`Enter ${label}`} />
                  </div>
                ))}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Signature:</p>
                  <div className="border-b border-gray-300 h-8" />
                </div>
              </div>

              {/* GOCPL */}
              <div className="border border-purple-100 rounded-xl p-5">
                <p className="text-purple-700 font-extrabold text-sm uppercase tracking-wide mb-5">For GOCPL (Lessor)</p>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Name:</p>
                  <Field value={gocplSigName} onChange={setGocplSigName} placeholder="Enter Name" />
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Designation:</p>
                  <p className="text-gray-800 text-sm font-medium border-b border-gray-300 pb-1">Authorised Signatory</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Date:</p>
                  <Field value={gocplSigDate} onChange={setGocplSigDate} placeholder="Enter Date" />
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Place:</p>
                  <p className="text-gray-800 text-sm font-medium border-b border-gray-300 pb-1">Pune, Maharashtra</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Signature:</p>
                  <div className="border-b border-gray-300 h-8" />
                </div>
              </div>

            </div>
          </Section>

          {/* ── Document Footer ── */}
          <div className="mt-8 text-center border-t border-purple-100 pt-6">
            <Image
              src="/logo-transparent.png"
              alt="Great Ocean Comptech"
              width={120}
              height={36}
              className="h-9 w-auto object-contain mx-auto mb-3"
            />
            <p className="text-gray-600 text-xs leading-relaxed">
              Great Ocean Comptech Pvt. Ltd. · Oxford Avenue, Ground Floor, Pirangut, Pune – 412115
              · +91 98342 20116 · asked@gocpl.co.in · www.gocpl.co.in
            </p>
            <p className="text-gray-500 text-xs mt-1">
              India&apos;s Trusted IT Hardware Rental &amp; Procurement Partner · 12+ Years · 200+ Clients
              · Same-day Delivery Across India · Mon–Sat: 9 AM – 7 PM
            </p>
            <p className="text-gray-400 text-xs mt-2 italic">
              This document is confidential and intended solely for the named parties. Jurisdiction: Pune, Maharashtra, India.
            </p>
          </div>

        </div>

      </div>{/* end docRef wrapper */}
    </main>
  );
}
