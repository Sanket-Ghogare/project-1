"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const CONTACT_INFO = [
  {
    icon: "📍",
    title: "Our Location",
    value: "Oxford Avenue, Ground Floor, Pirangut 412115, Pune",
    sub: "Serving businesses across India",
  },
  {
    icon: "📞",
    title: "Phone",
    value: "+91 98342 20116",
    sub: "Mon – Sat: 9 AM – 7 PM",
    href: "tel:+919834220116",
  },
  {
    icon: "✉️",
    title: "Email",
    value: "asked@gocpl.co.in",
    sub: "We reply within 24 hours",
    href: "mailto:asked@gocpl.co.in",
  },
  {
    icon: "⏰",
    title: "Business Hours",
    value: "Mon – Sat: 9 AM – 7 PM",
    sub: "Emergency support: 24/7",
  },
];

export default function ContactContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-16 pt-24 sm:py-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-2 mb-3 sm:mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to rent IT hardware or need a custom quote? We&apos;d love to
              hear from you — our team typically responds within a few hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
            {/* Info cards */}
            <div className="space-y-5">
              {CONTACT_INFO.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex gap-4"
                >
                  <div className="text-2xl sm:text-3xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">
                      {info.title}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-sm"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="font-bold text-gray-900 text-sm">{info.value}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{info.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/919834220116"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 sm:p-6 transition-colors shadow-md group"
              >
                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">💬</span>
                <div>
                  <div className="font-extrabold text-base sm:text-lg">Chat on WhatsApp</div>
                  <div className="text-green-100 text-xs sm:text-sm">Fastest response guaranteed</div>
                </div>
              </motion.a>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
