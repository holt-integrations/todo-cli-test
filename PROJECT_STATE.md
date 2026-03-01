# Project State: my-new-app

## Phase
planning

## Last Updated
2026-02-28T19:50:00Z

## Last Issue Processed
#4 — Write database migration for users table and migration runner

## Decisions

- Issue #4: `migrate.js` uses ES module imports and runs each SQL file inside an explicit `BEGIN`/`COMMIT` transaction, rolling back on any error. The migrations tracking table is bootstrapped with `CREATE TABLE IF NOT EXISTS` before querying it so the runner is idempotent on first use.

## Constraints

- Runtime: Node.js 20 (LTS) — no polyfills for natively available features.
- Module system: ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Database: PostgreSQL 15+ — use `gen_random_uuid()` (no `uuid-ossp` extension needed).
- No ORM: All SQL is written explicitly; `pg` pool is the only database abstraction.
- Authentication: Stateless JWT only; no server-side session store in MVP scope.
- Password storage: `bcrypt` with configurable rounds (default 12).
- Scope: REST API backend only; no frontend, no caching layer, no message broker in MVP.

## Completed Issues

- #4 — Write database migration for users table and migration runner
