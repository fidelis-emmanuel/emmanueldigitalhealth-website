import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    badge: "Early Access — Lock in forever",
    badgeTeal: true,
    price: "$49",
    period: "/mo",
    clinicians: "1 clinician",
    desc: "Everything you need to go paperless and document faster on day one.",
    features: [
      "1 clinician account",
      "Full MindBridge platform access",
      "AI SOAP Notes (free — competitors charge $17.50/mo)",
      "Clawback Guard AI",
      "PHQ-9 crisis protocol",
      "Appointment scheduling + reminders",
      "Medication management",
      "837P billing",
      "Priority support",
    ],
    cta: "Get Early Access",
    featured: false,
  },
  {
    name: "Growth",
    badge: "Most Popular",
    badgeTeal: false,
    price: "$149",
    period: "/mo",
    clinicians: "Up to 5 clinicians",
    desc: "For growing practices ready to add analytics, telehealth, and new patient acquisition.",
    features: [
      "Up to 5 clinician accounts",
      "Everything in Starter",
      "Analytics dashboard (outcomes, revenue, clinician)",
      "Telehealth video sessions",
      "Golden Thread AI",
      "Find a Therapist directory listing",
      "Custom intake workflows",
      "Dedicated onboarding",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Clinic",
    badge: null,
    badgeTeal: false,
    price: "$299",
    period: "/mo",
    clinicians: "Up to 15 clinicians",
    desc: "For multi-provider clinics that need FHIR interoperability and a white-label patient experience.",
    features: [
      "Up to 15 clinician accounts",
      "Everything in Growth",
      "FHIR R4 interoperability",
      "White-label patient portal",
      "Waitlist SMS Auto-Fill",
      "Priority support",
    ],
    cta: "Contact Us",
    featured: false,
  },
  {
    name: "Enterprise",
    badge: null,
    badgeTeal: false,
    price: "Contact Us",
    period: "",
    clinicians: "15+ clinicians",
    desc: "For large group practices and health systems requiring SLAs and custom integrations.",
    features: [
      "15+ clinician accounts",
      "Everything in Clinic",
      "SLA with uptime guarantee",
      "Custom EHR integrations",
      "Dedicated account manager",
      "CARF documentation support",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

const faqs = [
  {
    q: "Is MindBridge HIPAA-compliant?",
    a: "Yes. MindBridge uses encrypted transit (HTTPS), encrypted storage, JWT authentication, and full audit logging. BAA available for Growth and above.",
  },
  {
    q: "Can I migrate from my current EHR?",
    a: "Yes. MindBridge supports FHIR R4 for data import/export and includes a PDF/CSV data importer for TherapyNotes and SimplePractice exports.",
  },
  {
    q: "What does Early Access pricing mean?",
    a: "Early Access customers get full platform access at the lowest rate we will ever offer. That price is locked in for the life of your account.",
  },
  {
    q: "Do you offer a free trial?",
    a: "We offer a guided 20-minute demo. Contact us to schedule one.",
  },
  {
    q: "What billing codes are supported?",
    a: "MindBridge supports CPT code suggestions, 837P claim generation, and insurance verification for standard behavioral health billing codes.",
  },
];

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Pricing
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Simple monthly pricing. No setup fees. No per-patient charges. Cancel anytime.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-xl overflow-hidden flex flex-col"
            style={{
              border: tier.featured ? "2px solid #0d9488" : "1px solid #e2e8f0",
            }}
          >
            {tier.badge && (
              <div
                className="py-2 text-center text-xs font-semibold text-white"
                style={{ backgroundColor: "#0d9488" }}
              >
                {tier.badge}
              </div>
            )}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#0d9488" }}>
                {tier.name}
              </p>
              <p className="text-3xl font-bold mb-0.5" style={{ color: "#0f172a" }}>
                {tier.price}
                {tier.period && <span className="text-base font-normal text-slate-500">{tier.period}</span>}
              </p>
              <p className="text-xs text-slate-500 mb-1">{tier.clinicians}</p>
              <p className="text-slate-600 text-xs mb-5">{tier.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                    <span style={{ color: "#0d9488" }} className="mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="block text-center py-2.5 rounded-md font-semibold transition-colors hover:opacity-90 text-sm mt-auto"
                style={{
                  backgroundColor: tier.featured ? "#0d9488" : "transparent",
                  color: tier.featured ? "white" : "#0d9488",
                  border: tier.featured ? "none" : "1px solid #0d9488",
                }}
              >
                {tier.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* AI callout */}
      <div
        className="rounded-xl p-5 mb-20 flex items-start gap-3"
        style={{ backgroundColor: "#f0fdfa", border: "1px solid #99f6e4" }}
      >
        <span className="text-xl flex-shrink-0">💡</span>
        <p className="text-sm leading-relaxed" style={{ color: "#134e4a" }}>
          <span className="font-semibold">AI included free</span> — SimplePractice charges $17.50/month extra for AI notes.
          At MindBridge, AI SOAP notes, Clawback Guard, and Golden Thread are included in every plan.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "#0f172a" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl p-6" style={{ border: "1px solid #e2e8f0" }}>
              <h3 className="font-semibold mb-2" style={{ color: "#0f172a" }}>{faq.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
