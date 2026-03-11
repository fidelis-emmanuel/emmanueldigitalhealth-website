"""
SEOAgent — weekly competitor content monitoring.
- Fetches sitemaps from configured competitor domains
- Diffs against previously seen URLs in seo_snapshots table
- Flags new pages and sends weekly email report
- Runs every Monday at 08:00 via APScheduler
"""
import os
from xml.etree import ElementTree

import httpx
import resend
import asyncpg

resend.api_key = os.environ.get("RESEND_API_KEY", "")
ALERT_EMAIL = "fidejo2k@yahoo.com"
COMPETITOR_DOMAINS = [
    d.strip()
    for d in os.environ.get("COMPETITOR_DOMAINS", "").split(",")
    if d.strip()
]

_SITEMAP_PATHS = ["/sitemap.xml", "/sitemap_index.xml", "/sitemap/sitemap.xml"]
_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


async def _fetch_sitemap_urls(domain: str) -> list[str]:
    """Try common sitemap paths and return all <loc> URLs found."""
    urls: list[str] = []
    async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
        for path in _SITEMAP_PATHS:
            try:
                r = await client.get(f"https://{domain}{path}")
                if r.status_code != 200:
                    continue
                root = ElementTree.fromstring(r.text)
                found = [loc.text for loc in root.findall(".//sm:loc", _NS) if loc.text]
                if found:
                    urls.extend(found)
                    break
            except Exception:
                continue
    return urls


async def run_seo_scan(pool: asyncpg.Pool) -> None:
    if not COMPETITOR_DOMAINS:
        print("[SEOAgent] No COMPETITOR_DOMAINS configured — skipping scan")
        return

    new_pages: list[dict] = []

    for domain in COMPETITOR_DOMAINS:
        urls = await _fetch_sitemap_urls(domain)
        print(f"[SEOAgent] {domain}: found {len(urls)} URLs in sitemap")

        async with pool.acquire() as conn:
            for url in urls:
                exists = await conn.fetchval(
                    "SELECT 1 FROM seo_snapshots WHERE domain = $1 AND page_url = $2",
                    domain,
                    url,
                )
                if not exists:
                    await conn.execute(
                        """
                        INSERT INTO seo_snapshots (domain, page_url, flagged)
                        VALUES ($1, $2, TRUE)
                        ON CONFLICT (domain, page_url) DO NOTHING
                        """,
                        domain,
                        url,
                    )
                    new_pages.append({"domain": domain, "url": url})

    print(f"[SEOAgent] Scan complete — {len(new_pages)} new pages detected")
    await _send_report(new_pages)


async def _send_report(new_pages: list[dict]) -> None:
    if new_pages:
        rows_html = "".join(
            f"<tr style='background:{'#f8fafc' if i % 2 else '#fff'}'>"
            f"<td style='padding:8px;font-weight:bold'>{p['domain']}</td>"
            f"<td style='padding:8px'><a href='{p['url']}'>{p['url']}</a></td>"
            f"</tr>"
            for i, p in enumerate(new_pages)
        )
        body = (
            f"<h2 style='color:#0d9488'>Weekly SEO Report</h2>"
            f"<p><strong>{len(new_pages)} new competitor page(s)</strong> detected this week.</p>"
            f"<table style='border-collapse:collapse;width:100%'>"
            f"<tr style='background:#0f172a;color:#fff'>"
            f"<th style='padding:8px;text-align:left'>Domain</th>"
            f"<th style='padding:8px;text-align:left'>New Page</th>"
            f"</tr>"
            f"{rows_html}"
            f"</table>"
            f"<p style='margin-top:16px;color:#64748b'>Consider responding with fresh content via ContentAgent.</p>"
        )
        subject = f"[SEO] {len(new_pages)} new competitor page(s) detected"
    else:
        body = (
            "<h2 style='color:#0d9488'>Weekly SEO Report</h2>"
            "<p>No new competitor pages detected this week. Your content coverage is current.</p>"
        )
        subject = "[SEO] Weekly report — no new competitor content"

    resend.Emails.send({
        "from": "seo@emmanueldigitalhealth.com",
        "to": ALERT_EMAIL,
        "subject": subject,
        "html": body,
    })
    print(f"[SEOAgent] Weekly report sent")
