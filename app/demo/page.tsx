import Link from "next/link";

export default function Demo() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Request a Demo
        </h1>
        <p className="text-slate-600 text-lg">
          See MindBridge Health AI running a real behavioral health workflow.
          20 minutes. No commitment.
        </p>
      </div>

      <div className="rounded-xl p-8 mb-8" style={{ border: "1px solid #e2e8f0" }}>
        <h2 className="text-lg font-semibold mb-6" style={{ color: "#0f172a" }}>
          What you&apos;ll see in the demo:
        </h2>
        <ul className="space-y-3 mb-8">
          {[
            "Patient admission and AI risk screening",
            "ClinicalScribe AI — SOAP note generation in 3 seconds",
            "PHQ-9 crisis protocol with auto-triage",
            "837P billing claim generation",
            "Analytics dashboard (outcomes, revenue, clinician metrics)",
            "Patient portal — check-in and telehealth",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-700">
              <span style={{ color: "#0d9488" }} className="mt-0.5 flex-shrink-0">✓</span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p className="text-slate-700 font-medium mb-4">Schedule via email</p>
          <a
            href="mailto:fidejo2k@yahoo.com?subject=MindBridge Demo Request&body=Hi Fidelis,%0A%0AI'd like to schedule a demo of MindBridge Health AI.%0A%0AClinic name:%0ANumber of clinicians:%0ABest time to meet:%0A%0AThanks"
            className="inline-block text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
            style={{ backgroundColor: "#0d9488" }}
          >
            Email to Schedule →
          </a>
          <p className="text-slate-500 text-xs mt-3">
            Or email directly: fidejo2k@yahoo.com
          </p>
        </div>
      </div>

      <div className="text-center text-slate-500 text-sm">
        <p>Already seen the demo?{" "}
          <Link href="/pricing" style={{ color: "#0d9488" }}>View pricing →</Link>
        </p>
      </div>
    </div>
  );
}
