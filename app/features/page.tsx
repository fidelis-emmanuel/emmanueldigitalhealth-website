const modules = [
  {
    icon: "🩺",
    name: "Patient Risk Dashboard",
    desc: "AI-powered risk stratification across your entire patient population. CRITICAL / HIGH / MEDIUM / LOW flags update in real time. At-risk patients surface to the top — no one falls through the cracks.",
    details: ["Clickable risk filter cards", "Crisis call tracking (30-day)", "Medication adherence scoring", "Direct link to patient record"],
  },
  {
    icon: "📋",
    name: "ClinicalScribe AI",
    desc: "Generate structured SOAP notes from voice or text in under 3 seconds. Claude AI extracts presenting problem, subjective/objective findings, assessment, plan, ICD-10 codes, and medication changes.",
    details: ["Sub-3-second generation", "ICD-10 code extraction", "Medication change detection", "Auto-trigger on appointment completion"],
  },
  {
    icon: "🚨",
    name: "Crisis Protocol",
    desc: "PHQ-9 auto-triage creates crisis events when scores exceed clinical thresholds. Severity automatically classified (low / medium / high / critical). Care team alert sent immediately.",
    details: ["PHQ-9 boundary at score 15", "Auto-severity classification", "Crisis event audit trail", "CARF-ready documentation"],
  },
  {
    icon: "📅",
    name: "Appointment Scheduling",
    desc: "Conflict detection, automated 24hr and 1hr reminder emails, FHIR R4 Appointment resource, no-show tracking. Appointments auto-trigger ClinicalScribe on completion.",
    details: ["Conflict detection", "APScheduler reminders", "No-show rate tracking", "FHIR R4 Appointment resource"],
  },
  {
    icon: "💊",
    name: "Medication Management",
    desc: "Drug interaction checker blocks critical combinations (MAOI+SSRI, etc.) before save. Daily refill tracking agent. SOAP note auto-extraction of prescription changes.",
    details: ["Real-time drug interaction check", "Daily refill alert agent", "SOAP → prescription sync", "FHIR R4 MedicationRequest"],
  },
  {
    icon: "📱",
    name: "Telehealth",
    desc: "Browser-based video sessions via Daily.co. Session tokens, meeting rooms, SOAP note auto-generation on session end. No app download required.",
    details: ["Daily.co WebRTC", "Auto-SOAP on session end", "Session recording metadata", "HIPAA-compliant video"],
  },
  {
    icon: "💰",
    name: "837P Billing",
    desc: "Generate ANSI X12 837P claim files. Insurance eligibility verification. CPT code suggestions from SOAP notes. Superbill export. Revenue analytics by month.",
    details: ["837P claim generation", "Insurance verification", "CPT code suggestions", "Revenue analytics dashboard"],
  },
  {
    icon: "📊",
    name: "Analytics",
    desc: "Three dashboards: PHQ-9 outcomes trend (LineChart), monthly revenue (BarChart + CPT breakdown), and clinician performance metrics (sessions, SOAP rate, billing efficiency).",
    details: ["PHQ-9 outcomes trend", "Revenue by month + CPT", "Per-clinician KPIs", "Configurable time ranges"],
  },
  {
    icon: "🔐",
    name: "Security & Compliance",
    desc: "JWT clinician authentication. Patient portal magic-link auth. Encrypted transit. Full audit log with IP tracking. HIPAA-compliant architecture. CARF-ready crisis documentation.",
    details: ["JWT auth (8hr tokens)", "Magic-link patient portal", "Full audit log", "HIPAA architecture"],
  },
];

export default function Features() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Platform Features
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Every module in MindBridge is built for behavioral health — not adapted from a general EHR.
        </p>
      </div>

      <div className="space-y-8">
        {modules.map((mod, i) => (
          <div
            key={mod.name}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <div
              className="px-8 py-5 flex items-center gap-4"
              style={{ backgroundColor: i % 2 === 0 ? "#0f172a" : "#0d9488" }}
            >
              <span className="text-3xl">{mod.icon}</span>
              <h2 className="text-xl font-bold text-white">{mod.name}</h2>
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-slate-600 leading-relaxed">{mod.desc}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Highlights</p>
                <ul className="space-y-2">
                  {mod.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                      <span style={{ color: "#0d9488" }} className="flex-shrink-0">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-slate-600 mb-6">Ready to see it running?</p>
        <a
          href="/demo"
          className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
          style={{ backgroundColor: "#0d9488" }}
        >
          Request a Demo →
        </a>
      </div>
    </div>
  );
}
