"use client";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: "#f0fdfa", border: "1px solid #0d9488" }}
      >
        <p className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
          Message sent!
        </p>
        <p className="text-slate-600">I&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md px-4 py-2 text-sm focus:outline-none transition-colors";
  const inputStyle = { border: "1px solid #cbd5e1" };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Company / Organization
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range</label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
            style={inputStyle}
          >
            <option value="">Select range</option>
            <option value="under-10k">Under $10k</option>
            <option value="10k-50k">$10k – $50k</option>
            <option value="50k-100k">$50k – $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full text-white py-3 rounded-md font-semibold transition-colors disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor: "#0d9488" }}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
