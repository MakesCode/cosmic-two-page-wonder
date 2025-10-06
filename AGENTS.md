# Repository Guidelines

## Project Structure & Module Organization
- `apps/lovable`: Production Vite + React app using TanStack Router and shadcn UI primitives.
- `apps/admin` / `apps/pro`: Experimental surfaces; keep feature flags off in `lovable` until hardened.
- `packages/ui`, `packages/features`, `packages/utils`: Shared UI primitives, feature slices, and cross-app helpers; export typed APIs and avoid app-specific logic here.
- `packages/config` and `components.json`: Centralize design tokens and shadcn component configuration so updates stay consistent.
- `public/` hosts static assets; `dist/` is build output and should remain untracked in commits.

## Build, Test, and Development Commands
- `bun install`: Install workspace dependencies across `apps/*` and `packages/*`.
- `bun run dev`: Serve the Lovable app locally via Vite (`http://localhost:5173`).
- `bun run start`: Run `turbo run dev --parallel` when you need multiple apps live.
- `bun run build`: Production build for `apps/lovable`; ensure it succeeds before merging UI work.
- `bun run build:all`: Turbo build across every workspace to catch shared-package regressions.
- `bun run lint`, `bun run format:check`: Enforce ESLint and Prettier rules; fix with `bun run format` when possible.
- `bun run preview`: Smoke-test the Vite build output locally.

## Coding Style & Naming Conventions
- Prettier is authoritative (two-space indent, single quotes, trailing commas where valid).
- Use TypeScript everywhere; prefer explicit types for exports in `packages/*` to preserve DX across apps.
- Components live in PascalCase files (`HeroBanner.tsx`), hooks in camelCase (`useFeatureFlag.ts`), and route files follow TanStack Router naming under `apps/lovable/routes`.
- Co-locate Tailwind styles with components; rely on `mila-theme.css` for global tokens instead of ad-hoc overrides.

## Testing Guidelines
- Automated tests are not yet configured; add Vitest + React Testing Library when introducing critical logic or complex UI.
- Place specs alongside source (`Component.test.tsx`) or in `__tests__` folders to keep ownership obvious.
- When adding tests, wire them into `package.json` (e.g., `bun run test`) and document fixtures under `packages/mock`.
- Until a test runner is added, always execute `bun run lint` and a full `bun run preview` before opening a PR.

## Commit & Pull Request Guidelines
- Keep commit subjects short, present-tense, and descriptive (`add hero animation`). Conventional Commit prefixes (`feat(scope):`, `fix:`) are welcome when they add clarity.
- Group related changes; avoid sweeping refactors mixed with feature work without coordination.
- Pull requests should include: summary of changes, manual test notes (commands/results), linked issues or tickets, and screenshots/gifs for UI updates.
- Request review from owners of affected packages and highlight any required follow-up tasks in the PR description.
