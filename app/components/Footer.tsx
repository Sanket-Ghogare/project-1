import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "Laptops & Desktops" },
  { href: "/services", label: "Servers (Rack & Tower)" },
  { href: "/services", label: "Antivirus & Cybersecurity" },
  { href: "/services", label: "NAS / SAN Storage" },
  { href: "/services", label: "Backup & Disaster Recovery" },
  { href: "/services", label: "AMC & Remote Monitoring" },
  { href: "/services", label: "Cloud (AWS · Azure · GCP)" },
  { href: "/services", label: "Microsoft 365 & Google Workspace" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/logo-transparent.png"
                alt="Great Ocean Comptech Pvt Ltd"
                width={180}
                height={55}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-500 leading-relaxed mb-6 text-sm max-w-xs">
              India&apos;s trusted IT hardware rental and procurement partner.
              12+ years · 200+ clients · Same-day delivery across India.
            </p>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">📍</span>
                <span>Oxford Avenue, Ground Floor, Pirangut 412115, Pune</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0">📞</span>
                <a href="tel:+919834220116" className="hover:text-blue-400 transition-colors">
                  +91 98342 20116
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0">✉️</span>
                <a href="mailto:asked@gocpl.co.in" className="hover:text-blue-400 transition-colors break-all">
                  asked@gocpl.co.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0">🕐</span>
                <span>Mon – Sat: 9 AM – 7 PM</span>
              </div>
            </div>

            {/* WhatsApp badge */}
            <a
              href="https://wa.me/919834220116"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-blue-500 text-xs">▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-blue-500 text-xs">▶</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>© {new Date().getFullYear()} Great Ocean Comptech Pvt Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
