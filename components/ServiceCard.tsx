interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-6 transition-all hover:shadow-lg"
      style={{ border: "1px solid #e2e8f0" }}
      onMouseOver={(e) => (e.currentTarget.style.borderColor = "#0d9488")}
      onMouseOut={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2" style={{ color: "#0f172a" }}>
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
