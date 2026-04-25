"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */

const CATEGORIES = [
  { id: "All",              label: "All",                icon: "🔍" },
  { id: "Hardware",         label: "Hardware",            icon: "🖥️" },
  { id: "Security",         label: "Security",            icon: "🔒" },
  { id: "Storage",          label: "Storage",             icon: "📦" },
  { id: "Managed Services", label: "Managed Services",    icon: "🔧" },
  { id: "Cloud & Mail",     label: "Cloud & Mail",        icon: "☁️" },
];

const SERVICES = [
  /* ── Hardware Infrastructure ────────────────── */
  {
    id: 1,
    category: "Hardware",
    color: "blue",
    icon: "💻",
    badge: "Sales & Rental",
    badgeColor: "bg-blue-600",
    title: "Laptops",
    tagline: "Sales & Rental — latest models, zero hassle",
    description:
      "Buy or rent premium laptops from Dell, HP, Lenovo, and Apple. Perfect for corporates, events, training sessions, and project-based workloads.",
    features: [
      "Dell Latitude, HP EliteBook, Lenovo ThinkPad",
      "MacBook Pro & MacBook Air",
      "i5 / i7 / i9 & M-series configurations",
      "Pre-loaded software on request",
      "Flexible daily, weekly & monthly rental",
    ],
  },
  {
    id: 2,
    category: "Hardware",
    color: "indigo",
    icon: "🖥️",
    badge: "Sales & Rental",
    badgeColor: "bg-indigo-600",
    title: "Desktops",
    tagline: "High-performance workstations on demand",
    description:
      "Buy or rent desktop computers configured to your specs — from basic office setups to high-performance engineering workstations.",
    features: [
      "Intel Core i5 / i7 / i9 processors",
      "8 GB to 64 GB RAM configurations",
      "SSD + HDD combo storage",
      "Windows 10/11 Pro pre-installed",
      "Keyboard, mouse & monitor available",
    ],
  },
  {
    id: 3,
    category: "Hardware",
    color: "violet",
    icon: "🗄️",
    badge: "Sales & Rental",
    badgeColor: "bg-violet-600",
    title: "Servers",
    tagline: "Rack & Tower — enterprise-grade reliability",
    description:
      "Deploy rack or tower servers for your data centre or office. We supply, configure, and maintain servers from all leading OEMs.",
    features: [
      "Dell PowerEdge, HP ProLiant, Lenovo ThinkSystem",
      "Rack (1U–4U) & Tower form factors",
      "Windows Server / Linux / VMware",
      "On-site installation & configuration",
      "Rental available for short-term projects",
    ],
  },

  /* ── Security Solutions ──────────────────────── */
  {
    id: 4,
    category: "Security",
    color: "red",
    icon: "🛡️",
    badge: "Enterprise",
    badgeColor: "bg-red-600",
    title: "Antivirus Solutions",
    tagline: "Enterprise endpoint protection, managed centrally",
    description:
      "Deploy centrally-managed antivirus and endpoint detection solutions that protect every device in your network — on-premise or remote.",
    features: [
      "Kaspersky, Symantec, ESET, Sophos",
      "Centralised management console",
      "Real-time threat detection & response",
      "Scheduled scans & policy enforcement",
      "Annual licence procurement & renewal",
    ],
  },
  {
    id: 5,
    category: "Security",
    color: "rose",
    icon: "🔒",
    badge: "Advanced",
    badgeColor: "bg-rose-600",
    title: "Cybersecurity Solutions",
    tagline: "Firewalls, IDS/IPS, SIEM & risk management",
    description:
      "Comprehensive cybersecurity infrastructure — from next-gen firewalls and intrusion prevention to SIEM and full risk assessments.",
    features: [
      "Next-Gen Firewalls (Fortinet, Cisco, Palo Alto)",
      "Intrusion Detection & Prevention (IDS/IPS)",
      "SIEM implementation & log management",
      "Vulnerability assessments & risk reports",
      "Security policy design & compliance",
    ],
  },

  /* ── Storage Solutions ───────────────────────── */
  {
    id: 6,
    category: "Storage",
    color: "purple",
    icon: "💾",
    badge: "NAS",
    badgeColor: "bg-purple-600",
    title: "NAS Drives",
    tagline: "Network Attached Storage for teams",
    description:
      "Centralise your organisation's data with scalable NAS solutions — easy access, high availability, and built-in redundancy.",
    features: [
      "Synology, QNAP, Western Digital brands",
      "2-bay to 24-bay configurations",
      "RAID 0/1/5/6/10 support",
      "Remote access & cloud sync",
      "Incremental backup scheduling",
    ],
  },
  {
    id: 7,
    category: "Storage",
    color: "fuchsia",
    icon: "🗃️",
    badge: "Enterprise",
    badgeColor: "bg-fuchsia-600",
    title: "SAN Solutions",
    tagline: "Storage Area Networks for high I/O workloads",
    description:
      "Design and deploy fibre-channel or iSCSI SANs for databases, virtualisation, and mission-critical applications.",
    features: [
      "Dell EMC, NetApp, HPE SAN arrays",
      "Fibre Channel & iSCSI protocols",
      "High-performance all-flash options",
      "LUN provisioning & zoning",
      "Disaster recovery integration",
    ],
  },
  {
    id: 8,
    category: "Storage",
    color: "orange",
    icon: "🔄",
    badge: "DR Ready",
    badgeColor: "bg-orange-500",
    title: "Backup & Disaster Recovery",
    tagline: "RAID arrays, backup systems & DR planning",
    description:
      "Protect your business data with RAID-configured arrays, automated backup systems, and a comprehensive disaster recovery strategy.",
    features: [
      "RAID-configured storage arrays",
      "Automated backup & archival systems",
      "Off-site & cloud backup integration",
      "RPO / RTO-based DR planning",
      "Recovery drills & documentation",
    ],
  },

  /* ── Managed Services ────────────────────────── */
  {
    id: 9,
    category: "Managed Services",
    color: "green",
    icon: "🔧",
    badge: "Contract",
    badgeColor: "bg-green-600",
    title: "AMC",
    tagline: "Annual Maintenance Contracts — worry-free IT",
    description:
      "Comprehensive AMC covering all your IT hardware — planned preventive maintenance, breakfix support, and spare-parts management.",
    features: [
      "Scheduled preventive maintenance visits",
      "Priority on-site breakfix support",
      "Spare-parts inventory management",
      "Quarterly health-check reports",
      "Dedicated support engineer",
    ],
  },
  {
    id: 10,
    category: "Managed Services",
    color: "teal",
    icon: "📡",
    badge: "24/7",
    badgeColor: "bg-teal-600",
    title: "Remote Monitoring & Management",
    tagline: "RMM — proactive IT management from anywhere",
    description:
      "Our RMM platform monitors your entire IT estate 24/7 — catching issues before they cause downtime and keeping systems secure.",
    features: [
      "Real-time device health monitoring",
      "Automated patch management",
      "Remote troubleshooting & resolution",
      "Performance analytics dashboard",
      "Security alerting & incident response",
    ],
  },

  /* ── Cloud & Mail Solutions ──────────────────── */
  {
    id: 11,
    category: "Cloud & Mail",
    color: "sky",
    icon: "☁️",
    badge: "AWS · Azure · GCP",
    badgeColor: "bg-sky-600",
    title: "Public Cloud Deployments",
    tagline: "AWS, Azure & GCP — architected and managed",
    description:
      "Migrate to or build on AWS, Microsoft Azure, or Google Cloud. We handle architecture, deployment, cost optimisation, and ongoing management.",
    features: [
      "Cloud readiness assessment",
      "Migration planning & execution",
      "Infrastructure-as-Code (Terraform)",
      "Cost optimisation & FinOps",
      "24/7 cloud monitoring & support",
    ],
  },
  {
    id: 12,
    category: "Cloud & Mail",
    color: "cyan",
    icon: "🏗️",
    badge: "Hybrid",
    badgeColor: "bg-cyan-600",
    title: "Private & Hybrid Cloud",
    tagline: "On-prem control with cloud-scale flexibility",
    description:
      "Deploy a private cloud in your data centre or combine on-prem and public cloud in a hybrid architecture tailored to your compliance needs.",
    features: [
      "VMware vSphere / Hyper-V virtualisation",
      "OpenStack private cloud deployments",
      "Hybrid connectivity (VPN / ExpressRoute)",
      "Data sovereignty & compliance alignment",
      "Ongoing monitoring & capacity planning",
    ],
  },
  {
    id: 13,
    category: "Cloud & Mail",
    color: "amber",
    icon: "📧",
    badge: "M365 · Google",
    badgeColor: "bg-amber-500",
    title: "Enterprise Email Hosting",
    tagline: "Microsoft 365 & Google Workspace — fully managed",
    description:
      "Migrate, deploy, and manage enterprise email on Microsoft 365 or Google Workspace — with security policies, archiving, and user support.",
    features: [
      "Microsoft 365 (Exchange, Teams, SharePoint)",
      "Google Workspace (Gmail, Drive, Meet)",
      "Mailbox migration with zero downtime",
      "Spam filtering & email security",
      "User provisioning & licence management",
    ],
  },
];

const STEPS = [
  { n: "01", icon: "📋", title: "Enquire",       desc: "Share your requirements via our contact form, phone, or WhatsApp." },
  { n: "02", icon: "💬", title: "Get Quote",      desc: "Receive a tailored proposal within 2 business hours from our team." },
  { n: "03", icon: "⚙️", title: "Implement",      desc: "Our engineers deploy, configure, and test everything on-site or remotely." },
  { n: "04", icon: "🛡️", title: "Ongoing Support", desc: "Enjoy SLA-backed support and proactive monitoring for the long term." },
];

const ENGAGEMENTS = [
  {
    name: "Buy / Procure",
    icon: "🛒",
    highlight: false,
    tagline: "Outright hardware & software purchase",
    points: [
      "Competitive pricing, all major brands",
      "Delivered, racked & configured",
      "Warranty management included",
      "Bulk purchase discounts",
    ],
    cta: "Get a Quote",
  },
  {
    name: "Rent / Lease",
    icon: "🔄",
    highlight: true,
    tagline: "Flexible rentals with zero CapEx",
    points: [
      "Daily, weekly & monthly terms",
      "Same-day delivery, Pan India",
      "Replacement SLA within 4 hours",
      "5 to 500+ units available",
    ],
    cta: "Explore Rentals",
  },
  {
    name: "Subscribe",
    icon: "📅",
    highlight: false,
    tagline: "Managed services & cloud on contract",
    points: [
      "AMC & RMM monthly contracts",
      "Cloud & email per-user billing",
      "Security licence management",
      "Dedicated account manager",
    ],
    cta: "Learn More",
  },
];

const FAQS = [
  {
    q: "Do you offer both sales and rentals for hardware?",
    a: "Yes — for laptops, desktops, and servers we offer both outright purchase/procurement and flexible rental (daily, weekly, monthly). You choose what fits your budget and project timeline.",
  },
  {
    q: "Which cloud platforms do you support?",
    a: "We work with all three major public clouds — AWS, Microsoft Azure, and Google Cloud Platform (GCP). We also specialise in private and hybrid cloud deployments using VMware and OpenStack.",
  },
  {
    q: "What cybersecurity solutions do you implement?",
    a: "We cover the full stack: next-gen firewalls (Fortinet, Cisco, Palo Alto), IDS/IPS, SIEM platforms, endpoint protection, and comprehensive risk assessments — tailored to your compliance requirements.",
  },
  {
    q: "How does your AMC service work?",
    a: "Our Annual Maintenance Contracts include scheduled preventive maintenance visits, priority on-site breakfix response, spare-parts management, and quarterly health reports. Contact us for a tailored quote based on your device count and requirements.",
  },
  {
    q: "Can you migrate our team to Microsoft 365 or Google Workspace?",
    a: "Absolutely. We handle the full migration — from existing mail servers or PST files — with zero downtime. This includes DNS changes, mailbox migration, user provisioning, and post-migration support.",
  },
  {
    q: "Do you provide Disaster Recovery planning?",
    a: "Yes. We design RPO/RTO-aligned DR strategies covering RAID storage, off-site backup, cloud failover, and regular recovery drills. We also provide complete documentation and compliance reporting.",
  },
  {
    q: "What is the minimum rental duration for hardware?",
    a: "The minimum rental period is 1 day for laptops and desktops. Server rentals are typically for a minimum of 1 week. We also offer short-term event rentals for 50–500+ units.",
  },
  {
    q: "How quickly can you deliver rented hardware across India?",
    a: "We offer same-day delivery in Pune and major metros — order before 2 PM and receive fully tested, configured hardware by evening. For other cities across India, we ensure on-time, tracked delivery within 24–48 hours. We serve businesses Pan India.",
  },
];

/* ═══════════════════════════════════════════════════
   COLOR MAP
══════════════════════════════════════════════════ */
type ColorKey = "blue" | "indigo" | "violet" | "red" | "rose" | "purple" | "fuchsia" | "orange" | "green" | "teal" | "sky" | "cyan" | "amber";

const COLOR_MAP: Record<ColorKey, { icon: string; border: string; glow: string }> = {
  blue:    { icon: "bg-blue-600",    border: "border-blue-100",    glow: "hover:shadow-blue-100"    },
  indigo:  { icon: "bg-indigo-600",  border: "border-indigo-100",  glow: "hover:shadow-indigo-100"  },
  violet:  { icon: "bg-violet-600",  border: "border-violet-100",  glow: "hover:shadow-violet-100"  },
  red:     { icon: "bg-red-600",     border: "border-red-100",     glow: "hover:shadow-red-100"     },
  rose:    { icon: "bg-rose-600",    border: "border-rose-100",    glow: "hover:shadow-rose-100"    },
  purple:  { icon: "bg-purple-600",  border: "border-purple-100",  glow: "hover:shadow-purple-100"  },
  fuchsia: { icon: "bg-fuchsia-600", border: "border-fuchsia-100", glow: "hover:shadow-fuchsia-100" },
  orange:  { icon: "bg-orange-500",  border: "border-orange-100",  glow: "hover:shadow-orange-100"  },
  green:   { icon: "bg-green-600",   border: "border-green-100",   glow: "hover:shadow-green-100"   },
  teal:    { icon: "bg-teal-600",    border: "border-teal-100",    glow: "hover:shadow-teal-100"    },
  sky:     { icon: "bg-sky-600",     border: "border-sky-100",     glow: "hover:shadow-sky-100"     },
  cyan:    { icon: "bg-cyan-600",    border: "border-cyan-100",    glow: "hover:shadow-cyan-100"    },
  amber:   { icon: "bg-amber-500",   border: "border-amber-100",   glow: "hover:shadow-amber-100"   },
};

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════ */

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const c = COLOR_MAP[svc.color as ColorKey];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      layout
      className={`bg-white rounded-2xl border-2 ${c.border} hover:shadow-xl ${c.glow} hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group`}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 pb-3">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-13 h-13 sm:w-14 sm:h-14 ${c.icon} rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            {svc.icon}
          </div>
          {svc.badge && (
            <span className={`${svc.badgeColor} text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ml-2`}>
              {svc.badge}
            </span>
          )}
        </div>
        <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 mb-1 leading-snug">{svc.title}</h3>
        <p className="text-xs sm:text-sm font-semibold text-blue-500 mb-2 sm:mb-3">{svc.tagline}</p>
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{svc.description}</p>
      </div>

      {/* Features */}
      <div className="px-5 sm:px-6 pb-4 flex-1">
        <div className="border-t border-gray-100 pt-3 sm:pt-4">
          <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
            What&apos;s included
          </p>
          <ul className="space-y-1.5 sm:space-y-2">
            {svc.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
        <Link
          href="/contact"
          className={`${c.icon} text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity`}
        >
          Get Quote →
        </Link>
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800 text-sm sm:text-base pr-4 leading-snug">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-blue-600 text-xl flex-shrink-0 font-bold leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-6 py-4 text-gray-600 text-sm leading-relaxed bg-blue-50 border-t border-blue-100">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const stepsRef      = useRef(null);
  const engageRef     = useRef(null);
  const faqRef        = useRef(null);
  const stepsInView   = useInView(stepsRef,  { once: true, margin: "-60px" });
  const engageInView  = useInView(engageRef, { once: true, margin: "-60px" });
  const faqInView     = useInView(faqRef,    { once: true, margin: "-60px" });

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <main>
      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-24 sm:pt-28 pb-14 sm:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 40%, rgba(56,189,248,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Our Products &amp; Solutions
            </span>
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-3 mb-4 sm:mb-5 leading-tight [text-wrap:balance]">
              Complete IT Infrastructure <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Under One Roof
              </span>
            </h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-10">
              From hardware rentals and cybersecurity to cloud deployments and managed services —
              Great Ocean Comptech is India&apos;s end-to-end IT partner for businesses of every size.
            </p>

            {/* Quick-nav pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                { label: "🖥️ Hardware",          cat: "Hardware"         },
                { label: "🔒 Security",           cat: "Security"         },
                { label: "📦 Storage",            cat: "Storage"          },
                { label: "🔧 Managed Services",   cat: "Managed Services" },
                { label: "☁️ Cloud & Mail",       cat: "Cloud & Mail"     },
              ].map((p) => (
                <button
                  key={p.cat}
                  onClick={() => {
                    setActiveCategory(p.cat);
                    document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white/10 border border-white/20 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/20 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ SERVICES GRID ════════════════════════════ */}
      <section id="services-grid" className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {activeCategory === cat.id && cat.id !== "All" && (
                  <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                    {SERVICES.filter((s) => s.category === cat.id).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Count label */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-xs sm:text-sm mb-8"
          >
            Showing <strong className="text-gray-700">{filtered.length}</strong> solution{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : " across all categories"}
          </motion.p>

          {/* Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.id} svc={svc} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════ */}
      <section ref={stepsRef} className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">How We Work</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Simple, transparent, and fast — from first contact to live deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connector (desktop) */}
            <div className="hidden lg:block absolute top-[38px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center relative"
              >
                <div className="relative inline-flex items-center justify-center mb-4 sm:mb-5">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-200 relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-extrabold z-20 border-2 border-white">
                    {step.n}
                  </div>
                </div>
                <h4 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{step.title}</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENGAGEMENT MODELS ══════════════════════════ */}
      <section ref={engageRef} className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={engageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">Engagement</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              How You Can Work With Us
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Whether you want to buy, rent, or subscribe — we have a model that fits your budget and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {ENGAGEMENTS.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 30 }}
                animate={engageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all hover:-translate-y-1 ${
                  e.highlight
                    ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 sm:scale-105"
                    : "bg-white border border-gray-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {e.highlight && (
                  <div className="absolute top-0 right-0 bg-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                    Most Popular
                  </div>
                )}
                <div className="text-4xl mb-4">{e.icon}</div>
                <h3 className={`text-xl font-extrabold mb-1 ${e.highlight ? "text-white" : "text-gray-900"}`}>
                  {e.name}
                </h3>
                <p className={`text-sm mb-5 ${e.highlight ? "text-blue-100" : "text-gray-400"}`}>
                  {e.tagline}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {e.points.map((p) => (
                    <li key={p} className={`flex items-start gap-2 text-sm ${e.highlight ? "text-blue-50" : "text-gray-600"}`}>
                      <span className={e.highlight ? "text-blue-200 mt-0.5" : "text-green-500 mt-0.5"}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-xl font-extrabold text-sm transition-all ${
                    e.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {e.cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════ */}
      <section ref={faqRef} className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Everything you need to know about our products and services.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, x: -20 }}
                animate={faqInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="text-blue-100 text-sm sm:text-lg mb-8 max-w-2xl mx-auto">
            Talk to our team for a free consultation and custom quote. From hardware to cloud — we handle everything.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5 text-center"
            >
              Get Free Consultation
            </Link>
            <a
              href="tel:+919834220116"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg hover:bg-white/10 transition-all hover:-translate-y-0.5 text-center"
            >
              📞 Call Us Now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-blue-200 text-xs sm:text-sm font-semibold">
            {["✓ Hardware · Security · Storage", "✓ Managed Services", "✓ Cloud & Mail", "✓ Free Consultation"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
