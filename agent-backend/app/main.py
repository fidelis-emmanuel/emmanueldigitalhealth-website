"""
Emmanuel Digital Health — Agent Backend
One FastAPI service + APScheduler running 4 agents:
  - SiteMonitor  : every 5 minutes
  - LeadManager  : on POST /leads/ingest
  - ContentAgent : on POST /content/publish
  - SEOAgent     : every Monday at 08:00
"""
import os
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv
from fastapi import FastAPI

from app.db.models import create_pool, create_tables
from app.agents.site_monitor import check_site_health
from app.agents.seo_agent import run_seo_scan
from app.routers import leads, content

load_dotenv()

scheduler = AsyncIOScheduler(timezone="UTC")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Database ──────────────────────────────────────────────────────────────
    pool = await create_pool()
    await create_tables(pool)
    app.state.pool = pool
    print("[OK] Database pool ready")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler.add_job(
        check_site_health,
        trigger="interval",
        minutes=5,
        args=[pool],
        id="site_monitor",
        replace_existing=True,
    )
    scheduler.add_job(
        run_seo_scan,
        trigger="cron",
        day_of_week="mon",
        hour=8,
        minute=0,
        args=[pool],
        id="seo_agent",
        replace_existing=True,
    )
    scheduler.start()
    print("[OK] Scheduler started — SiteMonitor (5 min) + SEOAgent (Mon 08:00 UTC)")

    yield

    # ── Teardown ──────────────────────────────────────────────────────────────
    scheduler.shutdown(wait=False)
    await pool.close()
    print("[OK] Shutdown complete")


app = FastAPI(
    title="Emmanuel Digital Health — Agent Backend",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(leads.router)
app.include_router(content.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "edh-agent-backend", "version": "1.0.0"}
