export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f172a" }}>
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex flex-col md:flex-row justify-between gap-6 text-slate-400">
        <div>
          <p className="text-white font-semibold text-lg">Emmanuel Digital Health LLC</p>
          <p className="text-sm mt-1">MindBridge Health AI</p>
          <p className="text-sm mt-1">
            <a href="mailto:fidejo2k@yahoo.com" style={{ color: "#0d9488" }}>
              fidejo2k@yahoo.com
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className="text-white font-medium mb-2">Quick Links</p>
          {[
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/demo", label: "Request Demo" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto px-4 pb-8 text-center text-xs text-slate-500"
        style={{ borderTop: "1px solid #1e293b", paddingTop: "1.5rem" }}
      >
        &copy; 2026 Emmanuel Digital Health LLC &nbsp;&middot;&nbsp; HIPAA Compliant &nbsp;&middot;&nbsp; Louisville, KY
      </div>
    </footer>
  );
}
