# Project State

## Last Updated
2026-03-01T00:00:00Z

## Last Issue Processed
#9 — Implement auth router with register and login endpoints

## Completed Issues
- #1
- #4
- #5 — Implement centralized error handler middleware
- #7 — Implement AuthService for password hashing and JWT operations
- #8 — Implement JWT authentication middleware
- #9 — Implement auth router with register and login endpoints

## Decisions
- Using ES Modules (`"type": "module"`) throughout; no CommonJS `require()`.
- Node.js 20 only — no polyfills for features available natively in Node 20.
- No ORM (Sequelize, Prisma, TypeORM, etc.) — raw `pg` for database access.
- Migration runner uses `gen_random_uuid()` (PostgreSQL 13+); no `uuid-ossp` extension.
- Each migration runs in a single transaction; failures roll back and are not recorded.
- Auth router (#9): input validation is inline in route handlers (no external validation library); service errors are matched by message string to map to appropriate HTTP status codes.
- Issue #8: `authenticate.js` imports `AuthService` as a namespace (`* as AuthService`) to call `AuthService.verifyToken`; `TokenExpiredError` is detected by `err.name` to avoid a direct `jsonwebtoken` import in the middleware layer.
- Issue #7: `authService.js` uses named ES module exports; user objects strip `password_hash` via destructuring before returning to callers.
- Issue #5: `errorHandler.js` uses `process.env.NODE_ENV` directly rather than importing `src/config.js`, since config does not expose a `nodeEnv` field; `err.status ?? err.statusCode ?? 500` handles both naming conventions.
- Conflict resolution (#8 PR onto main): merged base branch state (through #9) with PR branch decisions for issues #5, #7, #8; preserved all decisions and augmented completed issues list.

## Constraints
- Node.js 20 engine required.
- ES Modules only.
- No ORM.
- Authentication: Stateless JWT only; no server-side session store in MVP scope.
- Password storage: `bcrypt` with configurable rounds (default 12).
- Scope: REST API backend only; no frontend, no caching layer, no message broker in MVP.
