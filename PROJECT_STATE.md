# Project State: my-new-app

## Phase
planning

## Last Updated
2026-02-28T19:56:00Z

## Last Issue Processed
#3 — Implement health check router

## Decisions

- Issue #7: `authService.js` uses named ES module exports; user objects strip `password_hash` via destructuring before returning to callers.
- Issue #5: `errorHandler.js` uses `process.env.NODE_ENV` directly rather than importing `src/config.js`, since config does not expose a `nodeEnv` field; `err.status ?? err.statusCode ?? 500` handles both naming conventions.
- Issue #3: `health.js` uses a default export for the Router; `new Date().toISOString()` provides the ISO 8601 timestamp at request time; no auth middleware applied.

## Constraints

- Runtime: Node.js 20 (LTS) — no polyfills for natively available features.
- Module system: ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Database: PostgreSQL 15+ — use `gen_random_uuid()` (no `uuid-ossp` extension needed).
- No ORM: All SQL is written explicitly; `pg` pool is the only database abstraction.
- Authentication: Stateless JWT only; no server-side session store in MVP scope.
- Password storage: `bcrypt` with configurable rounds (default 12).
- Scope: REST API backend only; no frontend, no caching layer, no message broker in MVP.

## Completed Issues

- #7 — Implement AuthService for password hashing and JWT operations
- #5 — Implement centralized error handler middleware
- #3 — Implement health check router

## Next Recommended Issue

**Issue 0** — "Initialize project scaffold with package.json and directory structure"

This is the foundational prerequisite for all other issues. Start here by creating
`package.json`, `.env.example`, `.gitignore`, and the `src/` directory tree as described
in `ISSUES.json` index 0.
