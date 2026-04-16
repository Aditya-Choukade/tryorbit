-- Run this in your Supabase SQL Editor at:
-- https://supabase.com/dashboard/project/gnkqzpfdjipulzkytmdk/sql

CREATE TABLE IF NOT EXISTS problems (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem     TEXT NOT NULL,
  summary     TEXT,
  industry    TEXT,
  tags        JSONB DEFAULT '[]',
  complaints  JSONB DEFAULT '[]',
  root_cause  TEXT,
  opportunity TEXT,
  orbit_score INTEGER DEFAULT 0,
  score_label TEXT DEFAULT 'Low',
  source      TEXT DEFAULT 'Reddit',
  subreddit   TEXT,
  upvotes     INTEGER DEFAULT 0,
  comments    INTEGER DEFAULT 0,
  url         TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster sorting on the dashboard feed
CREATE INDEX IF NOT EXISTS problems_created_at_idx ON problems (created_at DESC);
CREATE INDEX IF NOT EXISTS problems_orbit_score_idx ON problems (orbit_score DESC);
CREATE INDEX IF NOT EXISTS problems_url_idx ON problems (url);
CREATE INDEX IF NOT EXISTS problems_industry_idx ON problems (industry);

-- Prevent exact duplicate problems being inserted
CREATE UNIQUE INDEX IF NOT EXISTS problems_problem_unique_idx ON problems (problem);
