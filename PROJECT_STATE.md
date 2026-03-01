# Project State

## Last Updated
2026-03-01T00:00:00Z

## Last Issue Processed
#4 — Write database migration for users table and migration runner

## Completed Issues
- #1
- #4

## Decisions
- Using ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Node.js 20 only — no polyfills for features available natively in Node 20.
- No ORM (Sequelize, Prisma, TypeORM, etc.) — raw `pg` for database access.
- Migration runner uses `gen_random_uuid()` (PostgreSQL 13+); no `uuid-ossp` extension.
- Each migration runs in a single transaction; failures roll back and are not recorded.

## Constraints
- Node.js 20 engine required.
- ES Modules only.
- No ORM.
