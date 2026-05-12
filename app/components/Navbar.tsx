"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
        solid ? "bg-white shadow-lg py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-transparent.png"
              alt="Great Ocean Comptech Pvt Ltd"
              width={160}
              height={48}
              className="h-9 sm:h-11 w-auto object-contain"
              priority
            />
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
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                      : active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${solid ? "bg-purple-600" : "bg-white"}`} />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-purple-200 hover:-translate-y-0.5"
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
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
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
                  className="block bg-purple-600 text-white text-center py-3 rounded-xl text-sm font-extrabold hover:bg-purple-700 transition-colors"
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
