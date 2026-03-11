import Link from "next/link";

const techStack1 = [
  "Next.js", "FastAPI", "Claude API", "PostgreSQL", "Railway", "Vercel", "Tailwind CSS", "asyncpg",
];
const techStack2 = ["Claude API", "FastAPI", "SOAP Notes", "ICD-10", "PostgreSQL"];

export default function Portfolio() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Portfolio
        </h1>
        <p className="text-slate-600 text-lg">
          Production healthcare AI systems — live in the wild.
        </p>
      </div>

      {/* MindBridge case study */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "#0f172a" }}>
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#0d9488" }}
          >
            Case Study 01
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">MindBridge Health AI</h2>
          <p className="text-slate-300 mt-2">
            AI-powered patient risk management for behavioral health
          </p>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>
                The Problem
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Behavioral health clinicians had no unified system to track patient risk levels,
                medication adherence, and crisis patterns in real time. High-risk patients were
                falling through the cracks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>
                The Solution
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A full-stack AI platform with patient risk scoring, Claude-powered natural
                language database queries, real-time dashboards, and an admission workflow —
                all connected to PostgreSQL on Railway.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>
                The Outcome
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Production-deployed system handling patient records, risk stratification
                (CRITICAL / HIGH / MEDIUM / LOW), SOAP note generation via ClinicalScribe AI,
                and a Database Agent for natural language queries.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-3" style={{ color: "#0f172a" }}>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack1.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-sm text-slate-700"
                  style={{ backgroundColor: "#f1f5f9" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="https://mind-bridge-health-ai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            View Live App →
          </Link>
        </div>
      </div>

      {/* ClinicalScribe */}
      <div className="rounded-xl p-8" style={{ border: "1px solid #e2e8f0" }}>
        <span
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#0d9488" }}
        >
          Case Study 02
        </span>
        <h2 className="text-2xl font-bold mt-2 mb-3" style={{ color: "#0f172a" }}>
          ClinicalScribe AI
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          AI clinical documentation assistant built into MindBridge. Clinicians provide raw
          voice/text input and receive structured SOAP notes with ICD-10 codes, medication
          lists, and risk flags — in under 3 seconds. Built on the Claude API with a single-shot
          structured JSON extraction pattern.
        </p>
        <div className="flex flex-wrap gap-2">
          {techStack2.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-sm text-slate-700"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
