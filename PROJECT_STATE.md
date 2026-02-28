# Project State: my-new-app

## Phase
planning

## Last Updated
2026-02-28T16:30:00Z

## Last Issue Processed
#7 — Implement AuthService for password hashing and JWT operations

## Decisions

- Issue #7: `authService.js` uses named ES module exports; user objects strip `password_hash` via destructuring before returning to callers.

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

## Next Recommended Issue

**Issue 0** — "Initialize project scaffold with package.json and directory structure"

This is the foundational prerequisite for all other issues. Start here by creating
`package.json`, `.env.example`, `.gitignore`, and the `src/` directory tree as described
in `ISSUES.json` index 0.
