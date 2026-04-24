"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   DATA — real company info
══════════════════════════════════════════════════ */

const MILESTONES = [
  { year: "2012", event: "Founded in Pune with a clear vision to make reliable IT solutions accessible to every business." },
  { year: "2014", event: "Expanded into networking and security solutions, serving our first corporate clients." },
  { year: "2016", event: "Launched Hardware Rental division — flexible, zero-CapEx IT for SMEs and events." },
  { year: "2018", event: "Onboarded 50+ corporate clients across Pune, from startups to enterprise accounts." },
  { year: "2020", event: "Introduced Cloud & Managed Services, helping businesses through remote work transitions." },
  { year: "2022", event: "Added Microsoft 365, Google Workspace, and Cloud Migration to our portfolio." },
  { year: "2024", event: "200+ satisfied customers, 15+ person team, and growing as Pune's end-to-end IT partner." },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Customer-Centric",
    desc: "Every solution is tailored to the client's specific needs — not off-the-shelf. We listen first, then deliver.",
  },
  {
    icon: "🛡️",
    title: "Reliability",
    desc: "Consistent quality, on-time delivery, and hardware that works — every time, without excuses.",
  },
  {
    icon: "💡",
    title: "Technical Expertise",
    desc: "Enterprise-grade knowledge applied to businesses of every size. Deep domain expertise across hardware, security, and cloud.",
  },
  {
    icon: "🤝",
    title: "Long-term Partnerships",
    desc: "We don't disappear after the sale. We build lasting relationships and stay invested in your growth.",
  },
];

const PROBLEMS = [
  "Inconsistent and unreliable IT support",
  "Difficulty sourcing the right hardware at fair prices",
  "One-size-fits-all solutions that don't fit your business",
  "Vendors who disappear after the initial purchase",
  "Unplanned IT downtime affecting operations",
];

const SOLUTIONS = [
  "End-to-end services — hardware to cloud integration",
  "Transparent, competitive pricing with no hidden costs",
  "Customised solutions tailored to your industry and scale",
  "Long-term account management and relationship building",
  "Proactive monitoring and AMC to prevent downtime",
];

const USP_POINTS = [
  {
    icon: "🏆",
    title: "Enterprise Expertise",
    desc: "Our directors bring 12+ years each in enterprise IT sales, hardware management, and technical services — applied to every client, big or small.",
  },
  {
    icon: "🗣️",
    title: "Multilingual Communication",
    desc: "We communicate clearly in Marathi, Hindi, and English — ensuring no confusion, no misunderstandings, and full transparency.",
  },
  {
    icon: "🔄",
    title: "Beyond the Initial Sale",
    desc: "We maintain active, long-term relationships with every client — providing support, upgrades, and strategic IT guidance as your business grows.",
  },
];

const DIRECTORS = [
  {
    name: "Balaji Chimegaave",
    role: "Director",
    avatar: "BC",
    exp: "12+ Years of Experience",
    gradient: "from-blue-600 to-blue-800",
    specialties: [
      { label: "Hardware Sales", color: "bg-blue-100 text-blue-700" },
      { label: "Security Solutions", color: "bg-red-100 text-red-700" },
      { label: "Software Sales", color: "bg-indigo-100 text-indigo-700" },
      { label: "Networking Solutions", color: "bg-cyan-100 text-cyan-700" },
    ],
    bio: "With 12+ years of deep expertise across hardware sales, cybersecurity, software, and networking, Balaji has built and managed IT infrastructure for corporate and SME clients across Pune. He specialises in delivering customised, end-to-end IT solutions that align with each client's operational needs.",
    focus: "Corporate & SME IT Infrastructure",
  },
  {
    name: "Mahendra Sonwane",
    role: "Director",
    avatar: "MS",
    gradient: "from-indigo-600 to-blue-700",
    exp: "12+ Years of Experience",
    specialties: [
      { label: "Corporate Sales", color: "bg-green-100 text-green-700" },
      { label: "Enterprise B2B", color: "bg-emerald-100 text-emerald-700" },
      { label: "Cloud Services", color: "bg-sky-100 text-sky-700" },
      { label: "Mail Solutions", color: "bg-amber-100 text-amber-700" },
    ],
    bio: "Mahendra brings 12+ years of proven success in corporate and enterprise B2B sales, IT hardware management, cloud services, and mail solutions. He has a strong track record of building long-term client relationships and architecting scalable business strategies that drive growth for his clients.",
    focus: "Enterprise B2B & Corporate IT Solutions",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function AboutContent() {
  const missionRef   = useRef(null);
  const problemRef   = useRef(null);
  const uspRef       = useRef(null);
  const valuesRef    = useRef(null);
  const timelineRef  = useRef(null);
  const teamRef      = useRef(null);

  const missionInView  = useInView(missionRef,  { once: true, margin: "-60px" });
  const problemInView  = useInView(problemRef,  { once: true, margin: "-60px" });
  const uspInView      = useInView(uspRef,      { once: true, margin: "-60px" });
  const valuesInView   = useInView(valuesRef,   { once: true, margin: "-60px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });
  const teamInView     = useInView(teamRef,     { once: true, margin: "-60px" });

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 pt-28 sm:pt-32 relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
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
              "radial-gradient(circle at 80% 30%, rgba(56,189,248,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-widest">
                About Great Ocean Comptech
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mt-3 mb-5 leading-tight">
                12 Years of Reliable IT Excellence in Pune
              </h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                We are a trusted provider of hardware infrastructure, cybersecurity, cloud, storage,
                and managed IT services — delivering customised, end-to-end solutions to businesses
                across Pune with transparency, technical depth, and long-term partnership.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:bg-blue-50 transition-colors shadow-lg hover:-translate-y-0.5 text-center"
                >
                  Work With Us
                </Link>
                <Link
                  href="/services"
                  className="border border-white/30 text-white px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:bg-white/10 transition-colors text-center"
                >
                  Our Services →
                </Link>
              </div>
            </motion.div>

            {/* Right — stat grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { n: "1",    l: "Location",  sub: "Pune, Maharashtra" },
                { n: "12+",  l: "Years",     sub: "In Business" },
                { n: "50+",  l: "Projects",  sub: "Delivered" },
                { n: "200+", l: "Customers", sub: "Satisfied Clients" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center text-white border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold">{s.n}</div>
                  <div className="font-bold mt-1 text-sm sm:text-base">{s.l}</div>
                  <div className="text-blue-200 text-xs sm:text-sm mt-0.5">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══════════════════════════ */}
      <section ref={missionRef} className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Mission &amp; Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-7 sm:p-10 border border-blue-100"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-md shadow-blue-200">
                🎯
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                To provide <strong>reliable, efficient, and customized hardware and IT solutions</strong> to
                businesses and individuals. We serve customers by delivering high-quality products,
                seamless networking services, and professional support that ensures smooth operations
                and long-term trust.
              </p>
              <ul className="space-y-2">
                {["Quality hardware, every time", "Seamless networking services", "Professional support & long-term trust"].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-blue-700 font-semibold">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-3xl p-7 sm:p-10 border border-indigo-100"
            >
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-md shadow-indigo-200">
                👁️
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                To become a <strong>leading independent provider of hardware and IT solutions in India</strong>,
                recognized for innovation, customer-centric service, and strong technical expertise.
                We aim to expand regionally and nationally, building a brand that symbolizes
                reliability and modern technology.
              </p>
              <ul className="space-y-2">
                {["Leading IT provider across India", "Recognized for innovation & expertise", "Regional & national expansion"].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-indigo-700 font-semibold">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM WE SOLVE ══════════════════════════ */}
      <section ref={problemRef} className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Why We Exist
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              The Problem We Solve
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Many businesses struggle with fragmented IT support and unreliable vendors.
              We built Great Ocean Comptech to fix exactly that.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">

            {/* Pain points */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-red-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl">⚠️</div>
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">What Businesses Struggle With</h3>
              </div>
              <ul className="space-y-3.5">
                {PROBLEMS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-gray-600 text-sm sm:text-base">
                    <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-xs flex-shrink-0 mt-0.5">✕</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={problemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-green-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">✅</div>
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">How Great Ocean Comptech Solves It</h3>
              </div>
              <ul className="space-y-3.5">
                {SOLUTIONS.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-gray-600 text-sm sm:text-base">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Value prop summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-10 bg-blue-600 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto text-white"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-4xl flex-shrink-0">💡</div>
              <div>
                <h4 className="font-extrabold text-lg sm:text-xl mb-1">Our Value Proposition</h4>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  We deliver <strong className="text-white">peace of mind</strong> through quality hardware, expert networking,
                  and personalised IT services. Our customers benefit from <strong className="text-white">reduced downtime</strong>,
                  transparent pricing, and professional support that adapts to their specific business needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ USP ═══════════════════════════════════════ */}
      <section ref={uspRef} className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={uspInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Our Differentiators
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              What Makes Us Different
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Unlike generic resellers, we combine enterprise sales expertise with advanced technical
              service management — and we go beyond the initial sale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {USP_POINTS.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 30 }}
                animate={uspInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 text-white overflow-hidden group hover:-translate-y-1 transition-all shadow-lg shadow-blue-200"
              >
                {/* Decorative circle */}
                <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {u.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold mb-3">{u.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ═══════════════════════════════ */}
      <section ref={valuesRef} className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">What We Stand For</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{v.icon}</div>
                <h4 className="font-extrabold text-gray-900 mb-2 text-sm sm:text-base">{v.title}</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════ */}
      <section ref={timelineRef} className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              12 Years, One Goal
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 w-0.5 bg-blue-100" />

            <div className="space-y-5 sm:space-y-6">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 sm:gap-6"
                >
                  {/* Dot column */}
                  <div className="flex flex-col items-center flex-shrink-0 w-14 sm:w-16">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-2 border-white shadow-md z-10 mt-4" />
                  </div>
                  {/* Card */}
                  <div className="bg-gray-50 hover:bg-blue-50 rounded-2xl p-4 sm:p-5 flex-1 transition-colors border border-gray-100 cursor-default">
                    <div className="text-blue-600 font-extrabold text-sm mb-1">{m.year}</div>
                    <div className="text-gray-700 text-xs sm:text-sm leading-relaxed">{m.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LEADERSHIP TEAM ═══════════════════════════ */}
      <section ref={teamRef} className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">The Founders</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
              Meet Our Leadership
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Two decades of combined enterprise IT expertise, driving Great Ocean Comptech&apos;s mission every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {DIRECTORS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Top gradient header */}
                <div className={`bg-gradient-to-r ${d.gradient} p-6 sm:p-8 flex items-start gap-4 sm:gap-6`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-extrabold flex-shrink-0 backdrop-blur-sm border border-white/30">
                    {d.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-blue-100 font-semibold text-sm mt-0.5">{d.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {d.exp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Focus Area</span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{d.focus}</span>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">{d.bio}</p>

                  {/* Specialty tags */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {d.specialties.map((s) => (
                        <span
                          key={s.label}
                          className={`${s.color} text-xs font-bold px-3 py-1.5 rounded-xl`}
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Let&apos;s Build Your IT Infrastructure Together
          </h2>
          <p className="text-blue-100 text-sm sm:text-lg mb-8 max-w-2xl mx-auto">
            Join 200+ businesses across India who trust Great Ocean Comptech for reliable,
            customised IT solutions — from hardware to cloud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-700 px-8 sm:px-10 py-4 rounded-xl font-extrabold text-sm sm:text-lg hover:bg-blue-50 transition-colors shadow-xl hover:-translate-y-0.5 text-center"
            >
              Contact Us Today
            </Link>
            <Link
              href="/services"
              className="border-2 border-white/40 text-white px-8 sm:px-10 py-4 rounded-xl font-extrabold text-sm sm:text-lg hover:bg-white/10 transition-colors hover:-translate-y-0.5 text-center"
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
