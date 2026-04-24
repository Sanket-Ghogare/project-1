"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ──────────────────────────────────────────────────
   Category cards shown on the HOME page.
   Each card = one product/service category.
─────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    icon: "🖥️",
    color: "blue",
    title: "Hardware Infrastructure",
    tagline: "Sales & Rental",
    description: "Scalable IT hardware — buy or rent laptops, desktops, and enterprise-grade servers from all leading OEM brands.",
    items: ["Laptops — Sales & Rental", "Desktops — Sales & Rental", "Servers (Rack & Tower)"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    icon: "🔒",
    color: "red",
    title: "Security Solutions",
    tagline: "Enterprise Protection",
    description: "Protect your business with next-gen firewalls, endpoint antivirus, IDS/IPS, SIEM, and end-to-end cybersecurity strategies.",
    items: ["Antivirus & Endpoint Protection", "Firewalls & IDS/IPS", "SIEM & Risk Management"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    icon: "📦",
    color: "purple",
    title: "Storage Solutions",
    tagline: "Data Management",
    description: "Reliable data storage from NAS and SAN to RAID arrays, backup systems, and full disaster recovery architectures.",
    items: ["NAS & SAN Solutions", "RAID-configured Arrays", "Backup & Disaster Recovery"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    icon: "🔧",
    color: "green",
    title: "Managed Services",
    tagline: "AMC & Remote Monitoring",
    description: "Keep your IT estate healthy with Annual Maintenance Contracts, proactive remote monitoring, and 24/7 engineer support.",
    items: ["AMC (Annual Maintenance Contracts)", "Remote Monitoring & Management (RMM)", "On-site Breakfix Support"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    icon: "☁️",
    color: "sky",
    title: "Cloud Solutions",
    tagline: "AWS · Azure · GCP",
    description: "Migrate to or build on public, private, or hybrid cloud. We architect, deploy, and manage your cloud infrastructure end-to-end.",
    items: ["Public Cloud (AWS, Azure, GCP)", "Private & Hybrid Cloud", "Cloud Cost Optimisation"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    icon: "📧",
    color: "amber",
    title: "Mail Solutions",
    tagline: "Microsoft 365 · Google Workspace",
    description: "Deploy and manage enterprise email with full security, compliance, and user support on Microsoft 365 or Google Workspace.",
    items: ["Microsoft 365 (Exchange, Teams)", "Google Workspace (Gmail, Drive)", "Email Migration & Security"],
    accentIcon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const COLOR: Record<string, { icon: string; border: string; hover: string; tag: string; dot: string }> = {
  blue:   { icon: "bg-blue-600 text-white",   border: "border-blue-100",   hover: "hover:border-blue-400 hover:shadow-blue-100",   tag: "bg-blue-50 text-blue-600",   dot: "bg-blue-500"   },
  red:    { icon: "bg-red-600 text-white",     border: "border-red-100",    hover: "hover:border-red-400 hover:shadow-red-100",     tag: "bg-red-50 text-red-600",     dot: "bg-red-500"    },
  purple: { icon: "bg-purple-600 text-white",  border: "border-purple-100", hover: "hover:border-purple-400 hover:shadow-purple-100",tag: "bg-purple-50 text-purple-600",dot: "bg-purple-500" },
  green:  { icon: "bg-green-600 text-white",   border: "border-green-100",  hover: "hover:border-green-400 hover:shadow-green-100", tag: "bg-green-50 text-green-600", dot: "bg-green-500"  },
  sky:    { icon: "bg-sky-600 text-white",     border: "border-sky-100",    hover: "hover:border-sky-400 hover:shadow-sky-100",     tag: "bg-sky-50 text-sky-600",     dot: "bg-sky-500"    },
  amber:  { icon: "bg-amber-500 text-white",   border: "border-amber-100",  hover: "hover:border-amber-400 hover:shadow-amber-100", tag: "bg-amber-50 text-amber-600", dot: "bg-amber-500"  },
};

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" ref={ref} className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
            Products &amp; Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            Everything IT, Under One Roof
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            From hardware infrastructure and cybersecurity to cloud deployments and managed services —
            Great Ocean Comptech delivers complete IT solutions for businesses across India.
          </p>
        </motion.div>

        {/* Category cards — 2 columns on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12">
          {CATEGORIES.map((cat, i) => {
            const c = COLOR[cat.color];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`bg-white border-2 ${c.border} ${c.hover} rounded-2xl p-5 sm:p-7 group cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 ${c.icon} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    {cat.accentIcon}
                  </div>
                  <span className={`${c.tag} text-xs font-bold px-2.5 py-1 rounded-full ml-3 flex-shrink-0 self-start`}>
                    {cat.tagline}
                  </span>
                </div>

                {/* Title & desc */}
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 mb-2 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Sub-items */}
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Arrow CTA */}
                <div className="mt-5 flex items-center gap-1 text-blue-600 font-bold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
                  <Link href="/services" className="hover:underline">View Solutions</Link>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Explore all" CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
          >
            Explore All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
