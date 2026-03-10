export default function Footer() {
  return (
    <footer className="text-slate-400 py-10 mt-20" style={{ backgroundColor: "#0f172a" }}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="text-white font-semibold text-lg">Emmanuel Digital Health LLC</p>
          <p className="text-sm mt-1">Healthcare AI Engineering &amp; Consulting</p>
          <p className="text-sm mt-1">
            <a href="mailto:fidejo2k@yahoo.com" style={{ color: "#0d9488" }}>
              fidejo2k@yahoo.com
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-white font-medium mb-2">Quick Links</p>
          {[
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="text-sm">
          <p className="text-white font-medium mb-2">Built With</p>
          <p>
            Railway &nbsp;·&nbsp;
            <span style={{ color: "#0d9488" }}>Vercel</span>
            &nbsp;·&nbsp; Claude API
          </p>
          <p className="mt-4 text-xs">
            &copy; {new Date().getFullYear()} Emmanuel Digital Health LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
