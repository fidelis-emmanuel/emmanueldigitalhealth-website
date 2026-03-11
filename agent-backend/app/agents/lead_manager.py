"""
LeadManager — scores and persists inbound contact form leads.
- Scores 1–10 based on budget signals, company mention, urgency, domain keywords
- Score >= 7: sends priority email to fidejo2k@yahoo.com
- All leads persisted to PostgreSQL leads table
"""
import json
import os

import resend
import asyncpg

resend.api_key = os.environ.get("RESEND_API_KEY", "")
ALERT_EMAIL = "fidejo2k@yahoo.com"
HIGH_SCORE_THRESHOLD = 7

_BUDGET_SIGNALS = ["budget", "$", "investment", "cost", "spend", "pricing", "fee", "rate"]
_URGENCY_SIGNALS = ["urgent", "asap", "immediately", "this week", "right away", "as soon as", "emergency"]
_HEALTHCARE_KEYWORDS = [
    "ehr", "fhir", "clinical", "hospital", "patient", "hipaa", "emr",
    "health system", "epic", "cerner", "telehealth", "behavioral health",
    "mental health", "provider", "clinician",
]
_FREE_DOMAINS = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"}


def score_lead(
    email: str,
    company: str,
    message: str,
    budget: str,
) -> tuple[int, list[str]]:
    score = 0
    reasons: list[str] = []
    msg_lower = message.lower()

    if company and company.strip():
        score += 2
        reasons.append("Company mentioned (+2)")

    if budget and budget not in ("", "under-10k"):
        score += 2
        reasons.append(f"Budget signal: {budget} (+2)")
    elif any(s in msg_lower for s in _BUDGET_SIGNALS):
        score += 1
        reasons.append("Budget keyword in message (+1)")

    if any(s in msg_lower for s in _URGENCY_SIGNALS):
        score += 2
        reasons.append("Urgency language (+2)")

    if any(s in msg_lower for s in _HEALTHCARE_KEYWORDS):
        score += 2
        reasons.append("Healthcare domain keywords (+2)")

    if len(message.split()) > 100:
        score += 1
        reasons.append("Detailed message >100 words (+1)")

    email_domain = email.split("@")[-1].lower() if "@" in email else ""
    if email_domain and email_domain not in _FREE_DOMAINS:
        score += 1
        reasons.append(f"Company email domain ({email_domain}) (+1)")

    return min(score, 10), reasons


async def process_lead(
    pool: asyncpg.Pool,
    name: str,
    email: str,
    company: str,
    message: str,
    budget: str,
) -> int:
    """Score, persist, and alert on a new lead. Returns the score."""
    score, reasons = score_lead(email, company, message, budget)

    async with pool.acquire() as conn:
        await conn.execute(
            """
            INSERT INTO leads (name, email, company, message, budget, score, score_reasons)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            """,
            name,
            email,
            company or "",
            message,
            budget or "",
            score,
            json.dumps(reasons),
        )

    print(f"[LeadManager] Lead from {name} <{email}> scored {score}/10")

    if score >= HIGH_SCORE_THRESHOLD:
        resend.Emails.send({
            "from": "leads@emmanueldigitalhealth.com",
            "to": ALERT_EMAIL,
            "subject": f"[HIGH PRIORITY LEAD — {score}/10] {name}{f' — {company}' if company else ''}",
            "html": (
                f"<h2 style='color:#0d9488'>High Priority Lead — Score {score}/10</h2>"
                f"<table style='border-collapse:collapse;width:100%;max-width:500px'>"
                f"<tr><td style='padding:8px;font-weight:bold'>Name</td><td style='padding:8px'>{name}</td></tr>"
                f"<tr style='background:#f8fafc'><td style='padding:8px;font-weight:bold'>Email</td><td style='padding:8px'>{email}</td></tr>"
                f"<tr><td style='padding:8px;font-weight:bold'>Company</td><td style='padding:8px'>{company or '—'}</td></tr>"
                f"<tr style='background:#f8fafc'><td style='padding:8px;font-weight:bold'>Budget</td><td style='padding:8px'>{budget or '—'}</td></tr>"
                f"</table>"
                f"<p style='margin-top:16px;font-weight:bold'>Message:</p>"
                f"<p style='background:#f8fafc;padding:12px;border-radius:6px;white-space:pre-wrap'>{message}</p>"
                f"<hr/>"
                f"<p style='color:#64748b;font-size:13px'><strong>Score reasons:</strong> {', '.join(reasons)}</p>"
            ),
        })
        print(f"[LeadManager] Priority alert sent for score {score}")

    return score
