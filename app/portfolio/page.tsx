import Link from "next/link";

const techStack1 = [
  "Next.js", "FastAPI", "Claude API", "PostgreSQL", "Railway", "Vercel", "Tailwind CSS", "asyncpg",
];
const techStack2 = ["Claude API", "FastAPI", "SOAP Notes", "ICD-10", "PostgreSQL"];
const techStack3 = ["FastAPI", "PostgreSQL", "APScheduler", "FHIR R4", "asyncpg"];
const techStack4 = ["Claude API", "FastAPI", "PostgreSQL", "FHIR R4", "APScheduler", "asyncpg"];
const techStack5 = ["Claude API", "FastAPI", "PostgreSQL", "FHIR R4", "APScheduler", "asyncpg"];

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full text-sm text-slate-700"
          style={{ backgroundColor: "#f1f5f9" }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

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

      {/* Case Study 01 — MindBridge */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "#0f172a" }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#0d9488" }}>
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
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Problem</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Behavioral health clinicians had no unified system to track patient risk levels,
                medication adherence, and crisis patterns in real time. High-risk patients were
                falling through the cracks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Solution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A full-stack AI platform with patient risk scoring, Claude-powered natural
                language database queries, real-time dashboards, and an admission workflow —
                all connected to PostgreSQL on Railway.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Outcome</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Production-deployed system handling patient records, risk stratification
                (CRITICAL / HIGH / MEDIUM / LOW), SOAP note generation via ClinicalScribe AI,
                and a Database Agent for natural language queries.
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold mb-3" style={{ color: "#0f172a" }}>Tech Stack</h3>
            <TechTags tags={techStack1} />
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

      {/* Case Study 02 — ClinicalScribe */}
      <div className="rounded-xl p-8 mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#0d9488" }}>
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
        <TechTags tags={techStack2} />
      </div>

      {/* Case Study 03 — Appointment Scheduling */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "#0f172a" }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#0d9488" }}>
            Case Study 03
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">Appointment Scheduling System</h2>
          <p className="text-slate-300 mt-2">
            Production scheduling module for behavioral health clinics — Week 6
          </p>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Problem</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Behavioral health clinics lack integrated scheduling tools — appointments tracked
                in spreadsheets, no-show rates unmonitored, reminders manual, and no link between
                scheduling and clinical documentation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Solution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Production scheduling API with conflict detection, automated 24hr and 1hr reminder
                emails via APScheduler, FHIR R4 Appointment resource, and auto-trigger of
                ClinicalScribe on appointment completion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Outcome</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                6-endpoint REST API deployed to Railway with full CRUD, no-show rate tracking,
                FHIR interoperability, and seamless integration into the MindBridge platform.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ color: "#0f172a" }}>Tech Stack</h3>
            <TechTags tags={techStack3} />
          </div>
          <Link
            href="https://mind-bridge-health-ai.vercel.app/appointments"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            View Module →
          </Link>
        </div>
      </div>

      {/* Case Study 04 — Medication Management */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "#0f172a" }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#0d9488" }}>
            Case Study 04
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">AI-Powered Medication Management</h2>
          <p className="text-slate-300 mt-2">
            Drug interaction AI + refill tracking agent — Week 7
          </p>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Problem</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Behavioral health prescribers lack real-time drug interaction checks. Refill
                management is manual and error-prone. Prescription changes in SOAP notes are
                not automatically applied to the medication record.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Solution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Claude Sonnet-powered drug interaction checker blocks CRITICAL combinations
                (MAOI+SSRI, etc.) before save. Refill tracking agent runs daily at 7am UTC.
                ClinicalScribe auto-extracts medication changes from SOAP notes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Outcome</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                7-endpoint REST API with FHIR R4 MedicationRequest resource, 24/24 tests passing,
                HIPAA-compliant refill email alerts via Resend, and full audit logging —
                deployed to Railway.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ color: "#0f172a" }}>Tech Stack</h3>
            <TechTags tags={techStack4} />
          </div>
          <Link
            href="https://mind-bridge-health-ai.vercel.app/medications"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            View Module →
          </Link>
        </div>
      </div>

      {/* Case Study 05 — Treatment Plan Builder */}
      <div className="rounded-xl overflow-hidden mb-10" style={{ border: "1px solid #e2e8f0" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "#0f172a" }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#0d9488" }}>
            Case Study 05
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">AI Treatment Plan Builder</h2>
          <p className="text-slate-300 mt-2">
            Automated care planning with goal tracking — Week 8
          </p>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Problem</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Behavioral health clinicians spend 45–60 minutes manually writing treatment plans
                for each new patient. Plans go un-reviewed for months, violating Joint Commission
                and Medicaid 90-day review requirements. Goal progress is never tracked between
                sessions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Solution</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AI-generated treatment plans from patient diagnoses, PHQ-9 scores, and SOAP notes
                via Claude Sonnet API. Single-shot HIPAA-safe prompt returns presenting problem,
                SMART goals, interventions, and barriers. Goal progress tracked 1–5 per session
                with automatic goal achievement detection. APScheduler daily 7am review alert
                fires 14 days before deadline.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>The Outcome</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                11 FastAPI routes, FHIR R4 CarePlan endpoint, 3 database tables
                (treatment_plans, treatment_goals, goal_progress), 84 progress entries seeded.
                Rating=5 auto-promotes goal to &ldquo;achieved&rdquo;; all goals achieved auto-completes
                the plan in a single asyncpg transaction. 9 tests passing. Deployed to Railway.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ color: "#0f172a" }}>Tech Stack</h3>
            <TechTags tags={techStack5} />
          </div>
          <Link
            href="https://mind-bridge-health-ai.vercel.app/treatment-plans"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            View Module →
          </Link>
        </div>
      </div>
    </div>
  );
}
