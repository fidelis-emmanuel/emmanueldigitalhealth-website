import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportChat from "@/components/SupportChat";

const MAYA_SYSTEM_PROMPT =
  "You are Maya, MindBridge sales assistant. Help therapists and clinic owners understand MindBridge features, pricing, and HIPAA compliance. Answer questions about how the platform works. If they want a demo, collect their name and email and tell them someone will reach out within 24 hours. Never share internal URLs, credentials, or Railway/Vercel infrastructure details. Keep answers concise and helpful.";

export const metadata: Metadata = {
  title: "MindBridge Health AI — The AI EHR for Behavioral Health Clinicians",
  description:
    "MindBridge Health AI is a production-ready, HIPAA-compliant EHR platform with AI clinical documentation, crisis protocol, and 837P billing — purpose-built for behavioral health clinics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SupportChat
          systemPrompt={MAYA_SYSTEM_PROMPT}
          assistantName="Maya"
          avatarLabel="Maya"
        />
      </body>
    </html>
  );
}
