import Link from "next/link";

const benefits = [
  {
    icon: "📋",
    title: "Auto-SOAP Notes in 3 Seconds",
    desc: "ClinicalScribe AI generates structured SOAP notes from voice or text. Cut documentation time by 60%.",
  },
  {
    icon: "🚨",
    title: "PHQ-9 Crisis Auto-Triage",
    desc: "Automatic risk stratification. Critical patients flagged instantly. Crisis alerts sent to your care team.",
  },
  {
    icon: "💰",
    title: "837P Billing + Insurance Verification",
    desc: "Generate claim-ready 837P files. Insurance eligibility checks. CPT code suggestions built in.",
  },
];

const features = [
  "Patient risk dashboard (CRITICAL / HIGH / MEDIUM / LOW)",
  "AI clinical documentation (SOAP notes, ICD-10 codes)",
  "PHQ-9 crisis protocol with auto-triage",
  "Appointment scheduling with automated reminders",
  "Medication management + drug interaction checking",
  "Telehealth video sessions (Daily.co)",
  "837P billing + insurance verification",
  "FHIR R4 interoperability",
  "HIPAA-compliant audit logging",
  "JWT clinician authentication",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="text-white py-28 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#0d9488" }}>
            Built for Behavioral Health Clinicians
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            The AI EHR Built for
            <br />
            <span style={{ color: "#0d9488" }}>Behavioral Health</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10">
            MindBridge Health AI is a production-ready, HIPAA-compliant EHR platform with
            AI clinical documentation, crisis protocol, and 837P billing — purpose-built for
            behavioral health clinics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="text-white px-8 py-3 rounded-md font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: "#0d9488" }}
            >
              Request a Demo →
            </Link>
            <Link
              href="/features"
              className="px-8 py-3 rounded-md font-semibold transition-colors"
              style={{ border: "1px solid #0d9488", color: "#0d9488" }}
            >
              See All Features
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Key Benefits */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#0f172a" }}>
            Everything Your Clinic Needs
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
            One platform. AI-powered. HIPAA-compliant. Built by a clinician who lived the problem.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
              >
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#0f172a" }}>
                  {b.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 text-white" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            From onboarding to billing — MindBridge handles the entire clinical workflow.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-3" style={{ color: "#0d9488" }}>01</div>
              <h3 className="font-semibold text-lg mb-2">Admit &amp; Screen</h3>
              <p className="text-slate-400 text-sm">
                Admit patients, run AI risk screening, assign care teams. PHQ-9 auto-triage flags
                crisis patients immediately.
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-3" style={{ color: "#0d9488" }}>02</div>
              <h3 className="font-semibold text-lg mb-2">Document &amp; Treat</h3>
              <p className="text-slate-400 text-sm">
                Auto-generate SOAP notes. Manage medications with AI drug interaction checking.
                Run telehealth sessions with auto-notes.
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-3" style={{ color: "#0d9488" }}>03</div>
              <h3 className="font-semibold text-lg mb-2">Bill &amp; Report</h3>
              <p className="text-slate-400 text-sm">
                Generate 837P claims. Verify insurance. Track outcomes with PHQ-9 trends and
                revenue analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature checklist */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#0f172a" }}>
            Built for the Full Behavioral Health Workflow
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 rounded-lg bg-white" style={{ border: "1px solid #e2e8f0" }}>
                <span style={{ color: "#0d9488" }} className="mt-0.5 flex-shrink-0">✓</span>
                <span className="text-slate-700 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-8">Beta access available now. Limited spots.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Beta", price: "$299", desc: "1–3 clinicians · Full platform · Priority support" },
              { name: "Standard", price: "$499", desc: "Up to 10 clinicians · Everything in Beta + analytics", featured: true },
              { name: "Clinic", price: "$999", desc: "Unlimited clinicians · Custom integrations · SLA" },
            ].map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: tier.featured ? "#0d9488" : "#1e293b",
                  border: tier.featured ? "2px solid #14b8a6" : "1px solid #334155",
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-white mb-2 opacity-70">{tier.name}</p>
                <p className="text-4xl font-bold text-white mb-1">{tier.price}<span className="text-lg font-normal">/mo</span></p>
                <p className="text-slate-300 text-sm mt-3">{tier.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            See Full Pricing →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#0f172a" }}>
            Ready to See It Live?
          </h2>
          <p className="text-slate-600 mb-8">
            Schedule a 20-minute demo. No commitment. See MindBridge running with real workflows.
          </p>
          <Link
            href="/demo"
            className="inline-block text-white px-10 py-4 rounded-md font-semibold text-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            Request Demo →
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-6 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
          <span>HIPAA <span style={{ color: "#0d9488" }}>Compliant Architecture</span></span>
          <span>Deployed on <span style={{ color: "#0d9488" }}>Vercel + Railway</span></span>
          <span>Powered by <span style={{ color: "#0d9488" }}>Claude AI</span></span>
          <span>Database: <span style={{ color: "#0d9488" }}>PostgreSQL</span></span>
          <span><span style={{ color: "#0d9488" }}>136 tests</span> passing</span>
        </div>
      </section>
    </>
  );
}
