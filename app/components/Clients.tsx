"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   CLIENTS SECTION
   Three ways to display a client's logo (tries in order):

   1. Explicit logo file:
        logo: "/clients/altrr.png"
        (drop the file into /public/clients/ first)

   2. Auto-fetch from company domain via Clearbit Logo API:
        domain: "altrr.com"
        (https://logo.clearbit.com/<domain> — free, no API key)

   3. Fallback: styled branded tile with the company's initials.
        (what you see if neither logo nor domain is set)

   If a domain-fetched logo 404s, the card quietly falls back to the
   initial tile — no broken images.
───────────────────────────────────────────────────────────── */

interface Client {
  name: string;
  /** Short display name (≤ 25 chars ideal) */
  short: string;
  /** Optional: /public file path, e.g. "/clients/altrr.png" */
  logo?: string;
  /** Optional: company domain for Clearbit auto-fetch, e.g. "altrr.com" */
  domain?: string;
}

const CLIENTS: Client[] = [
  { name: "Altrr Software Services Limited",                   short: "Altrr Software",          logo: "/clients/alter_logo.jpg" },
  { name: "Gabril Industries Pvt Ltd",                         short: "Gabril Industries",       logo: "/clients/gabril.png" },
  { name: "Orbittal Electromech Engineering Projects Pvt Ltd", short: "Orbittal Electromech",    logo: "/clients/orbittal.png" },
  { name: "Indic Worldview Consulting Pvt Ltd",                short: "Indic Worldview",         logo: "/clients/indic.png" },
  { name: "Plan-a Digital Marketing Agency",                   short: "Plan-a Digital",          logo: "/clients/plan-a.png" },
  { name: "Eschjay Industries Pvt Ltd",                        short: "Eschjay Industries",      logo: "/clients/eschjay.png" },
  { name: "EnerTech UPS Private Limited",                      short: "EnerTech UPS",            logo: "/clients/enertech.png" },
  { name: "Sankalp Group",                                     short: "Sankalp Group",           logo: "/clients/sankalp.png" },
  { name: "DIP Packaging Pvt Ltd",                             short: "DIP Packaging",           logo: "/clients/dip.png" },
  { name: "GreenVision Life Sciences Pvt Ltd",                 short: "GreenVision Life Sciences", logo: "/clients/greenvision.png" },
];

/* Small palette of gradients — cycled by client index. Keeps brand consistent. */
const GRADIENTS = [
  "from-purple-600 to-violet-600",
  "from-indigo-600 to-purple-700",
  "from-violet-600 to-teal-600",
  "from-purple-700 to-indigo-800",
  "from-violet-600 to-purple-700",
];

/** Pull 1–2 uppercase initials from the short name. */
function initials(name: string): string {
  const words = name
    .replace(/[|.,&-]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(pvt|ltd|limited|private|the)$/i.test(w));
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/* ─────────────────────────────────────────────────────────────
   Single logo card — handles image loading + fallback to initials.
───────────────────────────────────────────────────────────── */
function LogoCard({ client, gradient }: { client: Client; gradient: string }) {
  const [broken, setBroken] = useState(false);

  // Priority: explicit logo > domain-fetch via Clearbit > no-image-fall-to-initials
  const src = !broken ? (client.logo ?? (client.domain ? `https://logo.clearbit.com/${client.domain}` : null)) : null;

  return (
    <div
      title={client.name}
      className="h-20 sm:h-24 flex items-center justify-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={client.name}
          className="max-h-full max-w-full object-contain transition duration-300"
          loading="lazy"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-md`}
          >
            {initials(client.short)}
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-700 text-center leading-tight px-1">
            {client.short}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-10 sm:py-14 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-purple-600 mb-3">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Our Valued Customers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            From manufacturing to IT services, 200+ companies across India trust
            Great Ocean Comptech for their hardware rental and managed IT needs.
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="group"
            >
              <LogoCard client={client} gradient={GRADIENTS[i % GRADIENTS.length]} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
