"""
SiteMonitor — checks site health every 5 minutes.
- Logs incidents to PostgreSQL on downtime
- Sends Resend email alert on first failure
- Triggers Vercel redeploy webhook after 3 consecutive failures
- Sends recovery email when site comes back up
"""
import os
from datetime import datetime, timezone

import httpx
import resend
import asyncpg

SITE_URL = os.environ.get("SITE_URL", "https://emmanueldigitalhealth.vercel.app")
VERCEL_DEPLOY_HOOK = os.environ.get("VERCEL_DEPLOY_HOOK_URL", "")
ALERT_EMAIL = "fidejo2k@yahoo.com"

resend.api_key = os.environ.get("RESEND_API_KEY", "")

# In-memory state (persists across scheduler ticks within one process)
_state: dict = {
    "consecutive_failures": 0,
    "is_down": False,
    "incident_id": None,
    "redeploy_triggered": False,
}


async def check_site_health(pool: asyncpg.Pool) -> None:
    is_down, status_code, notes = await _ping_site()

    if is_down:
        _state["consecutive_failures"] += 1
        await _handle_failure(pool, status_code, notes)
    else:
        await _handle_recovery(pool)


async def _ping_site() -> tuple[bool, int | None, str | None]:
    try:
        async with httpx.AsyncClient(timeout=10, follow_redirects=True) as client:
            r = await client.get(SITE_URL)
            if r.status_code >= 400:
                return True, r.status_code, f"HTTP {r.status_code}"
            return False, r.status_code, None
    except httpx.TimeoutException:
        return True, None, "Request timed out"
    except Exception as exc:
        return True, None, str(exc)


async def _handle_failure(pool: asyncpg.Pool, status_code: int | None, notes: str | None) -> None:
    failures = _state["consecutive_failures"]

    # Log new incident on first failure
    if not _state["is_down"]:
        _state["is_down"] = True
        _state["redeploy_triggered"] = False
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                "INSERT INTO site_incidents (http_status, notes) VALUES ($1, $2) RETURNING id",
                status_code,
                notes,
            )
        _state["incident_id"] = row["id"]

        resend.Emails.send({
            "from": "alerts@emmanueldigitalhealth.com",
            "to": ALERT_EMAIL,
            "subject": "[ALERT] Emmanuel Digital Health site is DOWN",
            "html": (
                f"<h2 style='color:#dc2626'>Site Down</h2>"
                f"<p><strong>Time:</strong> {datetime.now(timezone.utc).isoformat()}</p>"
                f"<p><strong>URL:</strong> {SITE_URL}</p>"
                f"<p><strong>Status:</strong> {status_code or 'N/A'}</p>"
                f"<p><strong>Details:</strong> {notes or 'N/A'}</p>"
            ),
        })
        print(f"[SiteMonitor] DOWN — incident #{_state['incident_id']} opened")

    # Trigger redeploy after 3 consecutive failures
    if failures >= 3 and not _state["redeploy_triggered"] and VERCEL_DEPLOY_HOOK:
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                r = await client.post(VERCEL_DEPLOY_HOOK)
                if r.status_code < 400:
                    _state["redeploy_triggered"] = True
                    print(f"[SiteMonitor] Redeploy triggered after {failures} failures")
        except Exception as exc:
            print(f"[SiteMonitor] Redeploy webhook failed: {exc}")


async def _handle_recovery(pool: asyncpg.Pool) -> None:
    if not _state["is_down"]:
        return  # Was already up — nothing to do

    # Close incident
    incident_id = _state["incident_id"]
    async with pool.acquire() as conn:
        await conn.execute(
            "UPDATE site_incidents SET resolved_at = NOW() WHERE id = $1",
            incident_id,
        )

    resend.Emails.send({
        "from": "alerts@emmanueldigitalhealth.com",
        "to": ALERT_EMAIL,
        "subject": "[RESOLVED] Emmanuel Digital Health site is back up",
        "html": (
            f"<h2 style='color:#16a34a'>Site Restored</h2>"
            f"<p><strong>Time:</strong> {datetime.now(timezone.utc).isoformat()}</p>"
            f"<p>Incident #{incident_id} closed.</p>"
        ),
    })

    print(f"[SiteMonitor] RECOVERED — incident #{incident_id} closed")

    # Reset state
    _state["consecutive_failures"] = 0
    _state["is_down"] = False
    _state["incident_id"] = None
    _state["redeploy_triggered"] = False
