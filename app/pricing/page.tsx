import Link from "next/link";

const tiers = [
  {
    name: "Beta",
    price: "$299",
    period: "/mo",
    desc: "For solo practitioners and small practices ready to modernize.",
    features: [
      "1–3 clinician accounts",
      "Full MindBridge platform access",
      "AI clinical documentation (SOAP notes)",
      "PHQ-9 crisis protocol",
      "Appointment scheduling + reminders",
      "Medication management",
      "837P billing",
      "Priority support",
    ],
    cta: "Request Beta Access",
    featured: false,
  },
  {
    name: "Standard",
    price: "$499",
    period: "/mo",
    desc: "For growing behavioral health practices.",
    features: [
      "Up to 10 clinician accounts",
      "Everything in Beta",
      "Analytics dashboard (outcomes, revenue, clinician)",
      "Telehealth video sessions",
      "FHIR R4 interoperability",
      "Custom intake workflows",
      "Dedicated onboarding",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Clinic",
    price: "$999",
    period: "/mo",
    desc: "For multi-provider clinics and group practices.",
    features: [
      "Unlimited clinician accounts",
      "Everything in Standard",
      "Custom EHR integrations",
      "CARF/Joint Commission documentation support",
      "White-label patient portal",
      "SLA with uptime guarantee",
      "Quarterly clinical workflow review",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

const faqs = [
  {
    q: "Is MindBridge HIPAA-compliant?",
    a: "Yes. MindBridge uses encrypted transit (HTTPS), encrypted storage, JWT authentication, and full audit logging. BAA available for Standard and Clinic tiers.",
  },
  {
    q: "Can I migrate from my current EHR?",
    a: "Yes. MindBridge supports FHIR R4 for data import/export. We assist with migration during onboarding.",
  },
  {
    q: "What does 'Beta' access mean?",
    a: "Beta customers get full platform access at a reduced rate in exchange for product feedback. Beta pricing is locked in for 12 months.",
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
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Pricing
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Simple monthly pricing. No setup fees. No per-patient charges. Cancel anytime.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-xl overflow-hidden"
            style={{
              border: tier.featured ? "2px solid #0d9488" : "1px solid #e2e8f0",
            }}
          >
            {tier.featured && (
              <div className="py-2 text-center text-sm font-semibold text-white" style={{ backgroundColor: "#0d9488" }}>
                Most Popular
              </div>
            )}
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#0d9488" }}>
                {tier.name}
              </p>
              <p className="text-4xl font-bold mb-1" style={{ color: "#0f172a" }}>
                {tier.price}<span className="text-lg font-normal text-slate-500">{tier.period}</span>
              </p>
              <p className="text-slate-600 text-sm mb-6">{tier.desc}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <span style={{ color: "#0d9488" }} className="mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="block text-center py-3 rounded-md font-semibold transition-colors hover:opacity-90"
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
