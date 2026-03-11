import os

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel, EmailStr

from app.agents.lead_manager import process_lead

router = APIRouter(prefix="/leads", tags=["leads"])
_SECRET = os.environ.get("AGENT_BACKEND_SECRET", "")


class LeadPayload(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str
    budget: str = ""


@router.post("/ingest")
async def ingest_lead(
    body: LeadPayload,
    request: Request,
    x_agent_secret: str = Header(default=""),
):
    if _SECRET and x_agent_secret != _SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    pool = request.app.state.pool
    score = await process_lead(
        pool,
        name=body.name,
        email=body.email,
        company=body.company,
        message=body.message,
        budget=body.budget,
    )
    return {"success": True, "score": score}
