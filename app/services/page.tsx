import Link from "next/link";

const services = [
  {
    icon: "🩺",
    title: "ClinicalScribe AI SaaS",
    description:
      "AI-powered SOAP note generation trained on behavioral health documentation standards. Clinicians speak or type raw input — ClinicalScribe returns structured, billable notes in seconds. Built on Claude API with DSM-5 alignment and ICD-10 code suggestions.",
    bullets: [
      "SOAP note generation",
      "ICD-10 & DSM-5 alignment",
      "Risk flag detection",
      "PostgreSQL audit trail",
    ],
  },
  {
    icon: "🔗",
    title: "FHIR Integration Consulting",
    description:
      "HL7 FHIR R4 integration for EHR systems, payer platforms, and health data exchanges. I design and build FHIR-compliant APIs that make your systems interoperable without the typical 18-month timeline.",
    bullets: [
      "FHIR R4 API design",
      "EHR integration (Epic, Cerner)",
      "CDS Hooks implementation",
      "Data mapping & transformation",
    ],
  },
  {
    icon: "🤖",
    title: "AI Agent Development",
    description:
      "Custom Claude-powered agents for healthcare workflows. From clinical documentation assistants to autonomous monitoring systems — I build agents that actually work in production, not just demos.",
    bullets: [
      "Multi-agent orchestration",
      "Tool use & function calling",
      "APScheduler + cron automation",
      "Slack / email / SMS alerting",
    ],
  },
  {
    icon: "📊",
    title: "Healthcare AI Strategy",
    description:
      "Strategic consulting for healthcare organizations evaluating AI adoption. I bring both clinical domain expertise (10 years in behavioral health) and engineering depth to help you identify where AI delivers real ROI.",
    bullets: [
      "AI readiness assessment",
      "Use case prioritization",
      "Build vs. buy analysis",
      "Implementation roadmap",
    ],
  },
];

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Services
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Healthcare AI engineering and consulting — from strategy through production deployment.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl p-8 transition-colors"
            style={{ border: "1px solid #e2e8f0" }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#0d9488")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          >
            <div className="text-4xl mb-4">{s.icon}</div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "#0f172a" }}>
              {s.title}
            </h2>
            <p className="text-slate-600 mb-5 leading-relaxed">{s.description}</p>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                  <span
                    className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: "#0d9488" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#0d9488" }}
            >
              Let&apos;s Talk
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
