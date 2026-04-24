"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Non-home pages always show solid navbar
  const solid = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-extrabold text-base sm:text-lg">G</span>
            </div>
            <div>
              <span className={`font-extrabold text-lg sm:text-xl transition-colors ${solid ? "text-gray-900" : "text-white"}`}>
                Great Ocean
              </span>
              <span className="hidden sm:block text-xs text-blue-500 font-bold -mt-0.5 tracking-wide">
                COMPTECH PVT LTD
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold text-sm transition-colors relative ${
                    solid
                      ? active
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                      : active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${solid ? "bg-blue-600" : "bg-white"}`} />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-blue-200 hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              solid ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 text-sm font-semibold rounded-xl transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-1 pb-1">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-blue-600 text-white text-center py-3 rounded-xl text-sm font-extrabold hover:bg-blue-700 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
