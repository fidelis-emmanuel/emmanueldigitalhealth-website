import os
import asyncpg


async def create_pool() -> asyncpg.Pool:
    return await asyncpg.create_pool(
        os.environ["DATABASE_URL"],
        min_size=2,
        max_size=10,
        ssl="require",
    )


async def create_tables(pool: asyncpg.Pool) -> None:
    async with pool.acquire() as conn:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS site_incidents (
                id          SERIAL      PRIMARY KEY,
                started_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                resolved_at TIMESTAMPTZ,
                http_status INT,
                notes       TEXT
            )
        """)
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS leads (
                id            SERIAL      PRIMARY KEY,
                name          TEXT        NOT NULL,
                email         TEXT        NOT NULL,
                company       TEXT,
                message       TEXT        NOT NULL,
                budget        TEXT,
                score         INT         NOT NULL,
                score_reasons JSONB,
                created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        """)
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS content_deploys (
                id             SERIAL      PRIMARY KEY,
                slug           TEXT        NOT NULL,
                commit_sha     TEXT        NOT NULL,
                reverted       BOOLEAN     NOT NULL DEFAULT FALSE,
                revert_reason  TEXT,
                deployed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        """)
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS seo_snapshots (
                id            SERIAL      PRIMARY KEY,
                domain        TEXT        NOT NULL,
                page_url      TEXT        NOT NULL,
                title         TEXT,
                first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                flagged       BOOLEAN     NOT NULL DEFAULT FALSE,
                UNIQUE (domain, page_url)
            )
        """)
    print("[MIGRATION] All agent tables ensured")
