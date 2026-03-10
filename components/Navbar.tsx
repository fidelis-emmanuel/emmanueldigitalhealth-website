"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1e293b]" style={{ backgroundColor: "#0f172a" }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          Emmanuel<span style={{ color: "#0d9488" }}>Digital</span>Health
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              style={{ "--hover-color": "#0d9488" } as React.CSSProperties}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#0d9488" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#14b8a6")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ backgroundColor: "#0f172a" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-300 text-sm font-medium py-2 border-b border-slate-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-white text-center py-2 rounded-md text-sm font-semibold mt-2"
            style={{ backgroundColor: "#0d9488" }}
            onClick={() => setOpen(false)}
          >
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  );
}
