"""
ContentAgent — pushes content updates to GitHub and monitors deploy health.
- Accepts slug + file path + new content via POST /content/publish
- Pushes to GitHub repo via API
- Waits 3 minutes then health-checks Vercel
- Auto-reverts to last good commit if health check fails
- Logs all deploys to content_deploys table
"""
import asyncio
import base64
import os

import httpx
import resend
import asyncpg

resend.api_key = os.environ.get("RESEND_API_KEY", "")
ALERT_EMAIL = "fidejo2k@yahoo.com"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_REPO = os.environ.get("GITHUB_REPO", "")  # e.g. fidelis-emmanuel/emmanueldigitalhealth-website
SITE_URL = os.environ.get("SITE_URL", "https://emmanueldigitalhealth.vercel.app")

_GH_HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json",
}


async def _get_file_meta(path: str) -> tuple[str, str]:
    """Returns (file_sha, current_commit_sha_on_main)."""
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.get(
            f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}",
            headers=_GH_HEADERS,
        )
        r.raise_for_status()
        file_sha = r.json()["sha"]

        r2 = await client.get(
            f"https://api.github.com/repos/{GITHUB_REPO}/commits/main",
            headers=_GH_HEADERS,
        )
        r2.raise_for_status()
        commit_sha = r2.json()["sha"]

    return file_sha, commit_sha


async def _push_file(path: str, content: str, message: str, file_sha: str) -> str:
    """Push new file content to GitHub. Returns new commit SHA."""
    encoded = base64.b64encode(content.encode()).decode()
    payload = {
        "message": message,
        "content": encoded,
        "sha": file_sha,
        "branch": "main",
    }
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.put(
            f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}",
            headers=_GH_HEADERS,
            json=payload,
        )
        r.raise_for_status()
        return r.json()["commit"]["sha"]


async def _revert_to_sha(sha: str) -> None:
    """Force-reset main branch to a previous commit SHA."""
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.patch(
            f"https://api.github.com/repos/{GITHUB_REPO}/git/refs/heads/main",
            headers=_GH_HEADERS,
            json={"sha": sha, "force": True},
        )
        r.raise_for_status()


async def _health_check_passes() -> bool:
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
            r = await client.get(SITE_URL)
            return r.status_code < 400
    except Exception:
        return False


async def deploy_content(
    pool: asyncpg.Pool,
    slug: str,
    path: str,
    content: str,
    reason: str,
) -> None:
    """Full deploy pipeline: push → wait → health check → rollback if needed."""
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("[ContentAgent] GITHUB_TOKEN or GITHUB_REPO not set — skipping deploy")
        return

    try:
        file_sha, last_good_sha = await _get_file_meta(path)
        new_sha = await _push_file(path, content, f"content: {reason}", file_sha)
        print(f"[ContentAgent] Pushed {path} → {new_sha[:7]}")
    except Exception as exc:
        print(f"[ContentAgent] Push failed: {exc}")
        return

    # Wait for Vercel to build and deploy (~3 min)
    await asyncio.sleep(180)

    if await _health_check_passes():
        async with pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO content_deploys (slug, commit_sha) VALUES ($1, $2)",
                slug,
                new_sha,
            )
        print(f"[ContentAgent] Deploy of '{slug}' verified healthy")
    else:
        # Auto-revert
        try:
            await _revert_to_sha(last_good_sha)
            print(f"[ContentAgent] Reverted to {last_good_sha[:7]}")
        except Exception as exc:
            print(f"[ContentAgent] Revert failed: {exc}")

        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO content_deploys (slug, commit_sha, reverted, revert_reason)
                VALUES ($1, $2, TRUE, $3)
                """,
                slug,
                new_sha,
                "Health check failed post-deploy",
            )

        resend.Emails.send({
            "from": "alerts@emmanueldigitalhealth.com",
            "to": ALERT_EMAIL,
            "subject": f"[REVERT] Content deploy for '{slug}' was auto-reverted",
            "html": (
                f"<h2 style='color:#dc2626'>Content Deploy Reverted</h2>"
                f"<p><strong>Slug:</strong> {slug}</p>"
                f"<p><strong>Failed commit:</strong> {new_sha[:7]}</p>"
                f"<p><strong>Reverted to:</strong> {last_good_sha[:7]}</p>"
                f"<p>Health check failed after 3-minute wait. Manual review recommended.</p>"
            ),
        })
        print(f"[ContentAgent] Revert alert sent for '{slug}'")
