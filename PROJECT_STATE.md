# Project State

## Last Updated
2026-02-28T00:00:00Z

## Last Issue Processed
#1 — Initialize project scaffold with package.json and directory structure

## Completed Issues
- #1

## Decisions
- Using ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Node.js 20 only — no polyfills for features available natively in Node 20.
- No ORM (Sequelize, Prisma, TypeORM, etc.) — raw `pg` for database access.

## Constraints
- Node.js 20 engine required.
- ES Modules only.
- No ORM.
