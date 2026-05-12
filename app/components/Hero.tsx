"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
   - Full-bleed background: server room / cybersecurity photo
   - Multi-layered overlay for readable text
   - Two-column layout on lg+, single column on smaller screens
   - Right-side feature card hidden on mobile/tablet (lg+ only)

   To use your own image:
   1. Drop a high-res JPG (≥ 1920×1080) into  /public/hero/bg.jpg
   2. Change HERO_BG below to "/hero/bg.jpg"
───────────────────────────────────────────────────────────── */
const HERO_BG = "/hero/bg.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-[88svh] sm:min-h-[92svh] flex items-center overflow-hidden bg-[#0a1628]">
      {/* ── Layer 1 · Background photo ── */}
      <Image
        src={HERO_BG}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />

      {/* ── Layer 2 · Dark gradient overlay — STRONGER on mobile for text legibility ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#0a1628]/90 to-[#0a1628]/75 lg:to-[#0a1628]/55"
      />

      {/* ── Layer 3 · Brand-tinted second pass ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-purple-950/70 via-purple-950/30 to-violet-950/40"
      />

      {/* ── Layer 4 · Grid lines ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ── Layer 5 · Glowing accent blobs ── */}
      <div className="absolute top-1/4 right-1/4 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-purple-500/15 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-44 sm:w-72 lg:w-80 h-44 sm:h-72 lg:h-80 bg-violet-500/15 rounded-full blur-3xl animate-float-delay pointer-events-none" />

      {/* ── Layer 6 · Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 grid lg:grid-cols-2 gap-8 xl:gap-12 items-center w-full">
        {/* ─── LEFT COLUMN — copy, CTAs, mini stats ─── */}
        <div className="text-center lg:text-left">
          {/* Pill */}
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-200 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold mb-4 sm:mb-5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            India&apos;s Trusted IT Hardware Rental Provider
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-2xl leading-[1.15] sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-4 sm:mb-5 [text-wrap:balance]"
          >
            Smart IT Hardware{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              Rentals &amp; Solutions
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-sm sm:text-sm lg:text-base text-purple-100/90 mb-5 sm:mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Reliable, efficient &amp; customised IT solutions for businesses across India —
            hardware infrastructure, cybersecurity, storage, cloud &amp; managed services.
            Trusted by 200+ clients for 12+ years.
          </motion.p>

          {/* CTAs — full-width on mobile so they stack cleanly and are easy to tap */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row sm:justify-center lg:justify-start flex-wrap gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="bg-purple-500 hover:bg-purple-400 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-sm lg:text-base transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 text-center w-full sm:w-auto"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-sm lg:text-base transition-all hover:bg-white/10 hover:border-white/60 text-center backdrop-blur-sm w-full sm:w-auto"
            >
              Our Services →
            </Link>
          </motion.div>

          {/* Mini stats — 3-up grid on mobile (avoids awkward wrap on 360-380px screens) */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 pt-4 sm:pt-6 max-w-md mx-auto lg:mx-0 lg:max-w-none lg:flex lg:flex-wrap lg:justify-start"
          >
            {[
              { label: "12+", sub: "Years Experience" },
              { label: "200+", sub: "Happy Customers" },
              { label: "50+", sub: "Projects Done" },
            ].map((s) => (
              <div key={s.sub} className="text-center lg:text-left">
                <div className="text-lg sm:text-2xl font-extrabold text-white">{s.label}</div>
                <div className="text-purple-300 text-[9px] sm:text-xs font-medium leading-tight mt-0.5">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN — feature card (lg+ only) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 xl:p-6 shadow-2xl animate-float">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 xl:w-12 xl:h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm xl:text-base">Laptop Rentals</div>
                <div className="text-purple-300 text-[11px] xl:text-xs">Flexible terms available</div>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                "Dell Latitude / XPS / Inspiron",
                "HP EliteBook / ProBook / Spectre",
                "Lenovo ThinkPad / IdeaPad / Yoga",
                "MacBook Pro / Air (M2, M3 chip)",
                "ASUS VivoBook / ZenBook / TUF",
                "Acer Aspire / Swift / Nitro",
                "Microsoft Surface Pro / Laptop",
                "+ 50 more models on request",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-purple-100">
                  <div className="w-4 h-4 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-purple-200">
              <span>📍 Pan-India Delivery</span>
              <span className="bg-purple-500/30 px-3 py-1 rounded-full font-semibold">Available Now</span>
            </div>
          </div>

          {/* Floating badge cards */}
          <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-2.5 py-1.5 rounded-2xl font-bold text-[11px] shadow-xl animate-float-delay">
            ⚡ Same Day · On-Time Delivery
          </div>
          <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-2.5 py-1.5 rounded-2xl font-bold text-[11px] shadow-xl animate-float">
            🔧 24/7 Support
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/40 z-10"
        aria-hidden="true"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
