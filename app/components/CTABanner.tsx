"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-10 sm:py-14 lg:py-16 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 leading-tight [text-wrap:balance]">
            Ready to Rent IT Hardware for Your Business?
          </h2>
          <p className="text-purple-100 text-sm sm:text-base lg:text-base mb-5 sm:mb-7 max-w-2xl mx-auto leading-relaxed">
            Get a free quote today. Same-day delivery available across India.
            Trusted by 200+ businesses for 12+ years.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="bg-white text-purple-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:bg-purple-50 transition-all shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:+919834220116"
              className="border-2 border-white/50 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:bg-white/10 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
            >
              📞 Call Us Now
            </a>
          </div>

          <div className="mt-7 sm:mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-6 text-purple-200 text-xs sm:text-sm font-semibold">
            {["✓ No upfront CapEx", "✓ Same-day delivery Pan India", "✓ 24/7 support", "✓ On-time guaranteed"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
