import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, budget, message } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Notify Fidelis
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fidejo2k@yahoo.com",
      subject: `New Contact: ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <h2 style="color:#0f172a">New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f8fafc"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${company || "—"}</td></tr>
          <tr style="background:#f8fafc"><td style="padding:8px;font-weight:bold">Budget</td><td style="padding:8px">${budget || "—"}</td></tr>
        </table>
        <p style="margin-top:16px;font-weight:bold">Message:</p>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:6px">${message}</p>
      `,
    });

    // Confirmation to submitter
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Thanks for reaching out — Emmanuel Digital Health",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
        <p style="margin-top:24px">— Fidelis Emmanuel<br/>
        <strong>Emmanuel Digital Health LLC</strong><br/>
        Healthcare AI Engineering &amp; Consulting</p>
      `,
    });

    // Forward lead to Railway agent backend (non-fatal if unavailable)
    const agentUrl = process.env.AGENT_BACKEND_URL;
    const agentSecret = process.env.AGENT_BACKEND_SECRET;
    if (agentUrl && agentSecret) {
      try {
        await fetch(`${agentUrl}/leads/ingest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Agent-Secret": agentSecret,
          },
          body: JSON.stringify({ name, email, company, budget, message }),
        });
      } catch {
        // Non-fatal — emails already sent
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
