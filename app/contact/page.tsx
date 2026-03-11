import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#0f172a" }}>
          Get In Touch
        </h1>
        <p className="text-slate-600 text-lg">
          Healthcare AI project? FHIR integration? Let&apos;s talk about what you&apos;re building.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
