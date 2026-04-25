"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const STATS: Stat[] = [
  { value: 1,   suffix: "",  label: "Location in Pune",  icon: "📍" },
  { value: 12,  suffix: "+", label: "Years Experience",  icon: "🏆" },
  { value: 50,  suffix: "+", label: "Projects Completed",icon: "📋" },
  { value: 200, suffix: "+", label: "Happy Customers",   icon: "😊" },
  { value: 15,  suffix: "+", label: "Team Members",      icon: "👥" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = 80;
    const timer = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 2);
      setCount(Math.round(progress * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-10 sm:py-16 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          5 stats — to avoid orphaned items on narrow screens we use:
          - 360–639px : grid-cols-2 with the 5th item spanning both cols (centered)
          - ≥640px    : 3-up
          - ≥1024px   : 5-up
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`text-center text-white group ${
                i === STATS.length - 1
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <div className="text-2xl sm:text-4xl mb-1.5 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1 tabular-nums">
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <div className="text-blue-200 text-[11px] sm:text-sm font-semibold uppercase tracking-wide leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
