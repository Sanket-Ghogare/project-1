"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ───────────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot — hidden field, real users leave empty. Bots fill it. */
  website: string;
}

type Status = "idle" | "loading" | "success" | "error";

/* ── Service options ─────────────────────────────────────── */
const SERVICE_OPTIONS = [
  { group: "Hardware",
    items: [
      "Laptop — Sales",
      "Laptop — Rental",
      "Desktop — Sales",
      "Desktop — Rental",
      "Server (Rack / Tower) — Sales",
      "Server — Rental",
    ],
  },
  { group: "Security",
    items: [
      "Antivirus / Endpoint Protection",
      "Cybersecurity (Firewall, IDS/IPS, SIEM)",
    ],
  },
  { group: "Storage",
    items: [
      "NAS / SAN Storage Solutions",
      "Backup & Disaster Recovery",
    ],
  },
  { group: "Managed Services",
    items: [
      "AMC (Annual Maintenance Contract)",
      "Remote Monitoring & Management (RMM)",
    ],
  },
  { group: "Cloud & Mail",
    items: [
      "Cloud Deployment (AWS / Azure / GCP)",
      "Private or Hybrid Cloud",
      "Microsoft 365",
      "Google Workspace",
    ],
  },
  { group: "Other",
    items: ["General Enquiry / Other"],
  },
];

/* ── Shared input class ─────────────────────────────────────
   • text-base on mobile (16px) prevents iOS Safari from zooming
     in when an input is focused; text-sm (14px) on ≥sm matches
     the original visual density on desktop.
   • py-3.5 on mobile gives a comfortable 44px+ tap target.
─────────────────────────────────────────────────────────── */
const INPUT =
  "w-full px-4 py-3.5 sm:py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-400 text-base sm:text-sm bg-gray-50 focus:bg-white";

/* ── Default form ───────────────────────────────────────── */
const EMPTY: FormState = { name: "", email: "", phone: "", service: "", message: "", website: "" };

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function ContactForm() {
  const [form, setForm]       = useState<FormState>(EMPTY);
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error banner as user corrects their input
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    /* ── Basic client-side check ── */
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      setStatus("error");
      return;
    }

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json() as { success?: boolean; message?: string; error?: string };

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setSuccessMsg(data.message ?? "Your enquiry has been received!");
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setErrorMsg(
        "Network error — please check your connection, then try again. You can also WhatsApp us directly."
      );
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100">
      <div className="mb-5 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight">Send Us a Message</h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          We reply within 24 hours — usually much sooner. 🚀
        </p>
      </div>

      {/* ── Success ── */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-2xl sm:text-3xl flex-shrink-0">✅</div>
              <div className="min-w-0">
                <h4 className="text-green-700 font-extrabold text-sm sm:text-base mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-green-600 text-xs sm:text-sm leading-relaxed">
                  {successMsg}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="https://wa.me/919834220116?text=Hi%2C%20I%20just%20submitted%20the%20contact%20form%20on%20your%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💬 Chat on WhatsApp for faster reply
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-1 text-green-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-300 hover:bg-green-100 transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Error ── */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-3.5 sm:p-4 mb-5 sm:mb-6 flex items-start gap-3"
          >
            <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5">⚠️</span>
            <div className="min-w-0">
              <p className="text-red-700 font-semibold text-xs sm:text-sm leading-relaxed">{errorMsg}</p>
              <a
                href="https://wa.me/919834220116"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-500 underline mt-1 inline-block hover:text-red-700"
              >
                Or contact us via WhatsApp →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form ── */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — invisible to real users, bots fill it. Do NOT remove. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label>
              Website (leave blank)
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={loading}
                className={INPUT}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                disabled={loading}
                className={INPUT}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                disabled={loading}
                className={INPUT}
              />
            </div>

            {/* Service — native <select> styled to match the rest of the form
                across iOS Safari, Android Chrome, and desktop. */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                Service Required
              </label>
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${INPUT} appearance-none pr-10 cursor-pointer ${
                    form.service === "" ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  <option value="" className="text-gray-400">Select a service…</option>
                  {SERVICE_OPTIONS.map((grp) => (
                    <optgroup key={grp.group} label={grp.group} className="text-gray-900 font-semibold">
                      {grp.items.map((item) => (
                        <option key={item} value={item} className="text-gray-900">
                          {item}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {/* Custom chevron — sits on top of the native select.
                    pointer-events-none lets clicks pass through to the select. */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              placeholder="Tell us your requirements — quantity, duration, location, specific models, etc."
              className={`${INPUT} resize-none`}
            />
            <p className="text-right text-xs text-gray-300 mt-1">
              {form.message.length}/5000
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-extrabold text-base sm:text-lg transition-all hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending your message…
              </>
            ) : (
              <>Send Message →</>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
            🔒 Your data is safe with us — never shared with third parties.
            <br className="hidden sm:block" />
            Our team will respond within 24 hours.
          </p>
        </form>
      )}
    </div>
  );
}
