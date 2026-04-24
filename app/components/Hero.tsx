"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1628]">
      {/* Animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950 animate-gradient" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glowing blobs */}
      <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/15 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-500/15 rounded-full blur-3xl animate-float-delay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 xl:gap-16 items-center w-full">

        {/* ── Left ── */}
        <div>
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 sm:mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            India&apos;s Trusted IT Hardware Rental Provider
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-5 sm:mb-6"
          >
            Smart IT Hardware{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Rentals &amp; Solutions
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-sm sm:text-base lg:text-lg text-blue-100/90 mb-7 sm:mb-8 leading-relaxed max-w-lg"
          >
            Reliable, efficient &amp; customized IT solutions for businesses across India —
            hardware infrastructure, cybersecurity, storage, cloud &amp; managed services.
            Trusted by 200+ clients for 12+ years.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 text-center"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all hover:bg-white/10 text-center"
            >
              Our Services →
            </Link>
          </motion.div>

          {/* Mini stats row */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-10 sm:mt-12 flex flex-wrap gap-6 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8"
          >
            {[
              { label: "12+", sub: "Years Experience" },
              { label: "200+", sub: "Happy Customers" },
              { label: "50+", sub: "Projects Done" },
            ].map((s) => (
              <div key={s.sub}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.label}</div>
                <div className="text-blue-300 text-xs sm:text-sm font-medium">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right – floating card (hidden on mobile) ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 xl:p-8 shadow-2xl animate-float">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 xl:w-14 xl:h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-base xl:text-lg">Laptop Rentals</div>
                <div className="text-blue-300 text-xs xl:text-sm">Flexible terms available</div>
              </div>
            </div>

            <div className="space-y-2">
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
                <div key={item} className="flex items-center gap-3 text-blue-100">
                  <div className="w-4 h-4 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
              <span>📍 Pan-India Delivery</span>
              <span className="bg-blue-500/30 px-3 py-1 rounded-full font-semibold">Available Now</span>
            </div>
          </div>

          {/* Badge cards */}
          <div className="absolute -top-5 -right-5 bg-orange-500 text-white px-3 py-2 rounded-2xl font-bold text-xs shadow-xl animate-float-delay">
            ⚡ Same Day · On-Time Delivery
          </div>
          <div className="absolute -bottom-5 -left-5 bg-green-500 text-white px-3 py-2 rounded-2xl font-bold text-xs shadow-xl animate-float">
            🔧 24/7 Support
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
