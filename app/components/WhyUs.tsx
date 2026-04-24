"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  { icon: "🎯", title: "Customised Solutions",   description: "Every engagement is tailored to your specific business requirements — no off-the-shelf fixes." },
  { icon: "🛡️", title: "Quality Guaranteed",     description: "High-quality hardware, certified security solutions, and cloud deployments built to enterprise standards." },
  { icon: "💰", title: "Transparent Pricing",    description: "No hidden costs. Clear, competitive quotes whether you're buying, renting, or subscribing." },
  { icon: "🔧", title: "24/7 Technical Support", description: "Round-the-clock IT support with on-site engineers and remote monitoring across India." },
  { icon: "🤝", title: "Long-term Partnership",  description: "We stay invested beyond the initial sale — AMC, upgrades, and strategic IT guidance as you grow." },
  { icon: "🌱", title: "12+ Years of Trust",     description: "Est. 2012. 200+ satisfied clients trust us for consistent, professional IT service delivery." },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── Left info card ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-700 to-blue-950 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/10 rounded-full" />
              <div className="relative">
                <div className="text-5xl sm:text-6xl mb-5 sm:mb-6">🖥️</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4">Why Great Ocean Comptech?</h3>
                <p className="text-blue-100 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  Unlike generic resellers, we combine enterprise sales expertise with advanced
                  technical service management — delivering customised IT solutions with
                  multilingual support (Marathi, Hindi, English) and long-term commitment.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { n: "200+", l: "Happy Clients" },
                    { n: "50+",  l: "Projects Done" },
                    { n: "15+",  l: "Team Members" },
                    { n: "12+",  l: "Years in Business" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/10 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm">
                      <div className="text-xl sm:text-2xl font-extrabold">{s.n}</div>
                      <div className="text-blue-200 text-xs sm:text-sm font-medium mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-2xl px-4 py-2 sm:px-5 sm:py-3 font-bold shadow-xl text-xs sm:text-sm animate-float">
              ✓ ISO Certified Quality
            </div>
          </motion.div>

          {/* ── Right features ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-10"
            >
              <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gray-900 mt-2 mb-3 sm:mb-4">
                Your Trusted IT Partner in Pune
              </h2>
              <p className="text-gray-500 text-sm sm:text-lg">
                We deliver peace of mind through quality hardware, expert networking, and
                personalised IT services — reducing downtime and adapting to your unique
                business needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-blue-50 transition-colors group cursor-default"
                >
                  <div className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm">
                      {f.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
