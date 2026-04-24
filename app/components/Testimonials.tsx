"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Gopal Bodade",
    role: "Manager",
    company: "Plan-a Digital Marketing Agency",
    text: "Running a digital marketing agency means our team needs reliable laptops without locking up capital. Great Ocean Comptech has been our IT partner for 2 years now — deliveries are always on time and their support team resolves issues the same day. Highly dependable!",
    avatar: "GK",
    rating: 5,
  },
  {
    name: "Rajesh Patil",
    role: "IT Manager",
    company: "Eschjay Industries Pvt Ltd, Pune",
    text: "We needed 50 laptops for a corporate training program on very short notice. Great Ocean Comptech delivered everything same-day, fully configured and ready to use. Exceptional service — they are now our go-to for every IT requirement.",
    avatar: "RP",
    rating: 5,
  },
  {
    name: "Anil Deshmukh",
    role: "Founder",
    company: "Altrr Software Services Limited",
    text: "Their monthly rental plans are flexible and very cost-effective for a growing software team like ours. No upfront CapEx, top-quality hardware, and transparent billing. We've scaled our team 3x with their support — highly recommend!",
    avatar: "AD",
    rating: 5,
  },
  {
    name: "Sneha Shinde",
    role: "HR Director",
    company: "EnerTech UPS Private Limited",
    text: "We scaled from 5 to 40 workstations in just one week with Great Ocean Comptech's help. Hardware quality is top-notch, pricing is competitive, and the team was incredibly professional throughout the onboarding.",
    avatar: "SS",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Trusted by 200+ businesses across India for reliable IT hardware solutions.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <svg key={idx} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-md flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-gray-400 text-sm">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-800 font-bold">5.0 Average Rating</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-sm">200+ satisfied customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
