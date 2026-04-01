"use client";
import { useState } from "react";

const clinicianModules = [
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
    icon: "🛡️",
    name: "Clawback Guard AI",
    desc: "AI audit layer that scans your SOAP notes before you sign them. Flags documentation gaps, CPT code mismatches, and missing medical necessity statements — the same patterns that trigger insurance clawbacks.",
    details: ["Pre-signature audit scan", "CPT ↔ SOAP mismatch detection", "Medical necessity gap flagging", "Reduces clawback risk proactively"],
  },
  {
    icon: "🧵",
    name: "Golden Thread AI",
    desc: "Verifies that your treatment plan goals, session notes, and billing codes form a coherent 'golden thread' — the clinical continuity auditors look for. Automatically identifies broken links across the care record.",
    details: ["Goal ↔ note ↔ billing alignment", "Cross-session continuity check", "CARF-ready audit trail", "Auto-flagged inconsistencies"],
  },
  {
    icon: "🔍",
    name: "Find a Therapist Directory",
    desc: "Clinicians listed in the MindBridge directory appear on our public patient-facing search. New patients searching for behavioral health providers see your name, specialties, and availability — we send you referrals.",
    details: ["Public directory listing", "Specialty + availability filters", "Telehealth badge display", "Accepts new patients toggle"],
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
    details: ["JWT auth (7-day tokens)", "Magic-link patient portal", "Full audit log", "HIPAA architecture"],
  },
];

const patientModules = [
  {
    icon: "📝",
    name: "Self Check-In & PHQ-9",
    desc: "Patients complete digital check-ins and PHQ-9 depression screening from any device — no app download required. Results flow directly into the clinician's risk dashboard before the session starts.",
    details: ["PHQ-9 digital screening", "Session check-in from any device", "Results visible to care team immediately", "No account creation required"],
  },
  {
    icon: "🚨",
    name: "Crisis Support",
    desc: "When PHQ-9 scores reach clinical thresholds, patients receive immediate on-screen support resources and the care team is alerted in real time. No one waits hours for a callback.",
    details: ["Immediate on-screen crisis resources", "Auto-alert to care team", "Severity-matched response", "Safe messaging guidelines built in"],
  },
  {
    icon: "📅",
    name: "Appointment Visibility",
    desc: "Patients see their upcoming appointments and receive automated reminder emails at 24 hours and 1 hour before their session — reducing no-shows without staff intervention.",
    details: ["Upcoming appointment view", "24hr + 1hr email reminders", "Telehealth join link in email", "No login required for reminders"],
  },
  {
    icon: "💬",
    name: "Secure Messaging",
    desc: "HIPAA-compliant message thread between patient and care team. Patients can send questions, updates, or concerns between sessions — routed directly to their assigned clinician.",
    details: ["HIPAA-compliant channel", "Assigned clinician routing", "Message history preserved", "No third-party apps needed"],
  },
  {
    icon: "📋",
    name: "Care Plan Access",
    desc: "Patients can view their active treatment goals and care plan milestones. Transparency into the plan increases engagement and keeps patients accountable between sessions.",
    details: ["Active treatment goal visibility", "Milestone tracking", "Clinician-controlled sharing", "Read-only patient view"],
  },
  {
    icon: "📈",
    name: "PHQ-9 Progress Tracking",
    desc: "Patients and clinicians can both see PHQ-9 score history over time. Visualized trend data makes it easier to have productive conversations about progress in sessions.",
    details: ["PHQ-9 score history", "Color-coded severity trend", "Shared view with clinician", "Updated after every check-in"],
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<"clinicians" | "patients">("clinicians");
  const modules = activeTab === "clinicians" ? clinicianModules : patientModules;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Platform Features
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Every module in MindBridge is built for behavioral health — not adapted from a general EHR.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center mb-12">
        <div className="flex rounded-lg overflow-hidden border border-slate-200">
          <button
            onClick={() => setActiveTab("clinicians")}
            className="px-8 py-3 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: activeTab === "clinicians" ? "#0d9488" : "#fff",
              color: activeTab === "clinicians" ? "#fff" : "#475569",
            }}
          >
            For Clinicians
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            className="px-8 py-3 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: activeTab === "patients" ? "#0d9488" : "#fff",
              color: activeTab === "patients" ? "#fff" : "#475569",
              borderLeft: "1px solid #e2e8f0",
            }}
          >
            For Patients
          </button>
        </div>
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

      {/* Comparison table */}
      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#0f172a" }}>
          How MindBridge Compares
        </h2>
        <p className="text-slate-500 text-center mb-10 text-sm">
          MindBridge is the only behavioral-health EHR with AI documentation, clawback protection, and patient acquisition built in at no extra cost.
        </p>
        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#0f172a" }}>
                <th className="text-left px-6 py-4 text-white font-semibold">Feature</th>
                <th className="px-6 py-4 font-semibold" style={{ color: "#0d9488" }}>MindBridge</th>
                <th className="px-6 py-4 text-slate-300 font-semibold">TherapyNotes</th>
                <th className="px-6 py-4 text-slate-300 font-semibold">SimplePractice</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AI SOAP Notes", "✓ Included free", "✗ Not available", "✓ $17.50/mo extra"],
                ["Clawback Guard AI", "✓ Included", "✗ Not available", "✗ Not available"],
                ["Golden Thread AI", "✓ Included", "✗ Not available", "✗ Not available"],
                ["PHQ-9 Crisis Triage", "✓ Auto-triage", "Manual only", "Manual only"],
                ["837P Billing", "✓ Included", "✓ Included", "✓ Included"],
                ["FHIR R4 Interoperability", "✓ Included", "✗ Limited", "✗ Limited"],
                ["Patient Directory (referrals)", "✓ Included", "✗ Not available", "✓ Add-on"],
                ["Telehealth Video", "✓ Included", "✓ Add-on", "✓ Add-on"],
                ["Starting Price", "$49/mo", "$59/mo", "$29/mo + add-ons"],
              ].map(([feature, mb, tn, sp], i) => (
                <tr key={feature} style={{ backgroundColor: i % 2 === 0 ? "#f8fafc" : "#ffffff", borderTop: "1px solid #e2e8f0" }}>
                  <td className="px-6 py-4 font-medium text-slate-700">{feature}</td>
                  <td className="px-6 py-4 text-center font-semibold" style={{ color: mb.startsWith("✓") ? "#0d9488" : "#64748b" }}>{mb}</td>
                  <td className="px-6 py-4 text-center text-slate-500">{tn}</td>
                  <td className="px-6 py-4 text-center text-slate-500">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-16">
        {activeTab === "clinicians" ? (
          <>
            <p className="text-slate-600 mb-6">Ready to see it running?</p>
            <a
              href="/demo"
              className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#0d9488" }}
            >
              Request a Demo →
            </a>
          </>
        ) : (
          <>
            <p className="text-slate-600 mb-4">Looking for mental health support?</p>
            <a
              href="https://mind-bridge-health-ai.vercel.app/find-a-therapist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#0d9488" }}
            >
              Find a Therapist Near You →
            </a>
            <p className="text-slate-400 text-sm mt-4">Ask your provider if they use MindBridge Health AI</p>
          </>
        )}
      </div>
    </div>
  );
}
