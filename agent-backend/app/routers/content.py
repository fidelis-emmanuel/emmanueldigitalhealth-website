import asyncio
import os

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel

from app.agents.content_agent import deploy_content

router = APIRouter(prefix="/content", tags=["content"])
_SECRET = os.environ.get("AGENT_BACKEND_SECRET", "")


class ContentPayload(BaseModel):
    slug: str
    path: str    # e.g. "app/portfolio/page.tsx"
    content: str
    reason: str


@router.post("/publish")
async def publish_content(
    body: ContentPayload,
    request: Request,
    x_agent_secret: str = Header(default=""),
):
    if _SECRET and x_agent_secret != _SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    pool = request.app.state.pool
    # Fire-and-forget — deploy runs in background (takes ~3 min with health check wait)
    asyncio.create_task(
        deploy_content(pool, body.slug, body.path, body.content, body.reason)
    )
    return {"success": True, "message": f"Deploy of '{body.slug}' queued"}
