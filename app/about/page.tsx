import Link from "next/link";

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
          Founder, Emmanuel Digital Health LLC · Healthcare AI Engineer
        </p>
        <p className="text-slate-300 leading-relaxed">
          10 years in behavioral health. I built MindBridge because I lived the problem —
          watching clinicians spend more time on documentation than with patients, watching
          high-risk individuals fall through the cracks because there was no unified system
          to track them. MindBridge is what I wish existed when I worked in the field.
        </p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            The Problem I Saw
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Behavioral health clinicians are drowning in paperwork. The average therapist spends
            30–45 minutes per session on documentation. Crisis patients are identified too late.
            Billing errors cost clinics thousands per month. And every EHR on the market was
            built for primary care — not behavioral health workflows.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            Why I Built MindBridge
          </h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            After a decade in behavioral health technology, I transitioned into AI engineering
            with one goal: build the EHR that behavioral health clinics actually need. MindBridge
            is a production HIPAA-compliant platform with AI clinical documentation, PHQ-9 crisis
            auto-triage, 837P billing, telehealth, and a patient portal — purpose-built for the
            behavioral health workflow.
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}
          >
            <span>✓</span>
            <span>184 tests passing · 21 API routes · Live in production</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0f172a" }}>
            Emmanuel Digital Health LLC
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Emmanuel Digital Health LLC is the company behind MindBridge. We provide Healthcare AI
            consulting, EHR implementation, and clinical workflow automation for behavioral health
            organizations. If you are running a behavioral health clinic and want to see what
            AI-powered documentation and risk management looks like in practice — book a demo.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/demo"
            className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            Request a Demo
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
            style={{ border: "1px solid #0d9488", color: "#0d9488" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
