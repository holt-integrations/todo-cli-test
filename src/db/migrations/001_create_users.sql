-- Migration: 001_create_users
-- Creates the migrations tracking table and the users table.

-- Tracking table: records which migrations have been applied.
CREATE TABLE IF NOT EXISTS migrations (
  id          SERIAL PRIMARY KEY,
  filename    TEXT UNIQUE NOT NULL,
  applied_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Users table.
CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL,
  password_hash TEXT        NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
