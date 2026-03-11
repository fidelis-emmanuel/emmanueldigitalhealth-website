import Link from "next/link";

const program = [
  { label: "Weeks 1–3", desc: "MindBridge Health AI" },
  { label: "Weeks 4–9", desc: "ClinicalScribe AI" },
  { label: "Weeks 7–10", desc: "Agent Systems" },
  { label: "Weeks 10–13", desc: "FHIR & Compliance" },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8" style={{ color: "#0f172a" }}>
        About
      </h1>

      {/* Bio card */}
      <div className="rounded-xl p-8 mb-10 text-white" style={{ backgroundColor: "#0f172a" }}>
        <h2 className="text-2xl font-bold mb-1">Fidelis Emmanuel</h2>
        <p className="font-medium mb-4" style={{ color: "#0d9488" }}>
          Healthcare AI Engineer &amp; Consultant
        </p>
        <p className="text-slate-300 leading-relaxed">
          I spent 10 years working in behavioral health — as a clinician and technology advocate —
          before transitioning into AI engineering. I&apos;ve seen firsthand the documentation burden
          clinicians carry, the gaps in risk management systems, and the missed opportunities for AI
          to make care better and safer.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            Background
          </h3>
          <p className="text-slate-600 leading-relaxed">
            With a decade in behavioral health technology, I understand both the clinical workflows
            and the infrastructure challenges that healthcare organizations face. I translate that
            domain expertise into AI systems that are safe, compliant, and actually useful to
            clinicians — not just demos that look good in board meetings.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            The 90-Day Healthcare AI Engineering Program
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            In 2025, I committed to a rigorous 90-day intensive to become a production-ready
            Healthcare AI Engineer — covering full-stack development (Next.js + FastAPI), Claude
            API integration, FHIR standards, multi-agent systems, and production deployment on
            Railway and Vercel.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {program.map((item) => (
              <div
                key={item.label}
                className="rounded-lg p-4 text-center"
                style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <p className="font-semibold text-sm" style={{ color: "#0d9488" }}>
                  {item.label}
                </p>
                <p className="text-slate-700 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            Why Healthcare AI
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Healthcare documentation, risk stratification, and care coordination are three areas
            where AI can reduce clinician burden and improve patient outcomes — today, with existing
            technology. I build the systems that make that real.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
          style={{ backgroundColor: "#0d9488" }}
        >
          Work With Me
        </Link>
      </div>
    </div>
  );
}
