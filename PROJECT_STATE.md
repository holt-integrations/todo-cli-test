# Project State

## Last Updated
2026-03-01T00:00:00Z

## Last Issue Processed
#9 — Implement auth router with register and login endpoints

## Completed Issues
- #1
- #4
- #9

## Decisions
- Using ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Node.js 20 only — no polyfills for features available natively in Node 20.
- No ORM (Sequelize, Prisma, TypeORM, etc.) — raw `pg` for database access.
- Migration runner uses `gen_random_uuid()` (PostgreSQL 13+); no `uuid-ossp` extension.
- Each migration runs in a single transaction; failures roll back and are not recorded.
- Auth router (#9): input validation is inline in route handlers (no external validation library); service errors are matched by message string to map to appropriate HTTP status codes.

## Constraints
- Node.js 20 engine required.
- ES Modules only.
- No ORM.
