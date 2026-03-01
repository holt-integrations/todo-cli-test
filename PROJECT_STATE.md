# Project State

## Last Updated
2026-02-28T00:00:00Z

## Last Issue Processed
#9 - Implement auth router with register and login endpoints

## Completed Issues
- #9

## Decisions
- Auth router (`src/routes/auth.js`) uses inline validation (no external validation library) per MVP constraints.
- Error handling supports both thrown Error objects and thrown strings from AuthService for `'Email already registered'` and `'Invalid credentials'`.
- All data access is delegated to `AuthService`; no direct repository or DB pool imports in the route layer.

## Constraints
- Import only `express` and `src/services/authService.js` in auth routes.
- Input validation must be inline in route handlers (no additional validation library for MVP).
