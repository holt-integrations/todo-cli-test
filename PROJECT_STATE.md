# Project State: my-new-app

## Phase
planning

## Last Updated
2026-03-01T00:00:00Z

## Last Issue Processed
#7 — Implement AuthService for password hashing and JWT operations

## Decisions

- Using ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Node.js 20 only — no polyfills for features available natively in Node 20.
- No ORM (Sequelize, Prisma, TypeORM, etc.) — raw `pg` for database access.
- Issue #2: `config.js` uses `dotenv/config` import at module top; config object is frozen via `Object.freeze` to prevent accidental mutation at runtime.
- Issue #2: `pool.js` imports config and constructs `pg.Pool` lazily (no active connection at import time); default export used so repositories can import with a single statement.
- Issue #4: `migrate.js` uses ES module imports and runs each SQL file inside an explicit `BEGIN`/`COMMIT` transaction, rolling back on any error. The migrations tracking table is bootstrapped with `CREATE TABLE IF NOT EXISTS` before querying it so the runner is idempotent on first use.
- Issue #7: `authService.js` centralises bcrypt and JWT operations; HTTP concerns are intentionally excluded from the service layer. `password_hash` is stripped from all returned user objects via a local helper. `login` uses a single `'Invalid credentials'` error message for both unknown email and wrong password to avoid user enumeration.

## Constraints

- Runtime: Node.js 20 (LTS) — no polyfills for natively available features.
- Module system: ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Database: PostgreSQL 15+ — use `gen_random_uuid()` (no `uuid-ossp` extension needed).
- No ORM: All SQL is written explicitly; `pg` pool is the only database abstraction.
- Authentication: Stateless JWT only; no server-side session store in MVP scope.
- Password storage: `bcrypt` with configurable rounds (default 12).
- Scope: REST API backend only; no frontend, no caching layer, no message broker in MVP.

## Completed Issues

- #1 — Initialize project scaffold with package.json and directory structure
- #2 — Implement database connection pool and environment config module
- #4 — Write database migration for users table and migration runner
- #7 — Implement AuthService for password hashing and JWT operations
