import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: "🩺",
    title: "ClinicalScribe AI",
    description:
      "AI-powered SOAP note generation for behavioral health clinicians. Cut documentation time by 60%.",
  },
  {
    icon: "🔗",
    title: "FHIR Integration",
    description:
      "Connect your systems with HL7 FHIR standards. Interoperability built for modern healthcare.",
  },
  {
    icon: "🤖",
    title: "AI Agent Development",
    description:
      "Custom Claude-powered agents for healthcare workflows — monitoring, triage, documentation.",
  },
  {
    icon: "📊",
    title: "Healthcare AI Strategy",
    description:
      "Strategic consulting to identify where AI delivers the most value in your care delivery.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="text-white py-28 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#0d9488" }}>
            Healthcare AI Engineering &amp; Consulting
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Healthcare AI Engineer
            <br />
            &amp; Consultant
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10">
            10 years in behavioral health. Now building production AI systems that solve real
            clinical problems — with Claude API, FHIR, and modern cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="text-white px-8 py-3 rounded-md font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: "#0d9488" }}
            >
              View Services
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-md font-semibold transition-colors hover:bg-teal-brand hover:text-white"
              style={{ border: "1px solid #0d9488", color: "#0d9488" }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20 px-4" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#0f172a" }}>
            What I Build
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
            Production healthcare AI systems — from clinical documentation to FHIR integrations
            to autonomous agent teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-colors"
              style={{ backgroundColor: "#0d9488" }}
            >
              See All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-6 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
          <span>Built on <span style={{ color: "#0d9488" }}>Railway</span></span>
          <span>Deployed on <span style={{ color: "#0d9488" }}>Vercel</span></span>
          <span>Powered by <span style={{ color: "#0d9488" }}>Claude API</span></span>
          <span>Database: <span style={{ color: "#0d9488" }}>PostgreSQL</span></span>
        </div>
      </section>
    </>
  );
}
