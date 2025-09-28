# 📘 Project Best Practices

## 1. Project Purpose
A modern, accessibility-first two-wheeler marketplace built with React, TypeScript, and Tailwind CSS. The app enables users to browse, compare, and explore detailed information about bikes and scooters, including upcoming models and eco-impact insights. It emphasizes inclusive design (keyboard navigation, high contrast, large text) and a polished UI using shadcn/ui and Radix primitives.

## 2. Project Structure
- Root
  - index.html – Vite HTML entry
  - vite.config.ts – Vite configuration (port 8080, @ alias to src, dev-only component tagging)
  - tailwind.config.ts, postcss.config.js – Tailwind setup
  - eslint.config.js – Linting rules (TS + React Hooks + React Refresh)
  - tsconfig*.json – TypeScript configs
  - public/ – Static assets served at root (e.g., /images/*)
- src/
  - main.tsx – React root; renders <App />
  - App.tsx – App shell: global providers, router, layout, accessibility widget, toaster(s)
  - components/
    - ui/ – shadcn/ui-based primitives (Radix + Tailwind)
    - Chatbot/ – modular chatbot (FAQ + optional AI integration)
    - Navigation, ThemeToggle, LanguageSwitcher, ... – app-specific components
  - pages/ – Route components (Home, Browse, BikeDetail, UsedBikes, Upcoming, Community, DealerDashboard, Mechanics, CustomerCare, login, registration, NotFound)
  - contexts/
    - LanguageContext.tsx – Simple i18n with localStorage persistence
  - hooks/
    - use-auth.tsx – Demo auth state, localStorage session
    - use-compare.tsx – Bike comparison state (max 4), localStorage persistence
    - use-theme.tsx – Light/Dark/System with document class sync & localStorage
  - data/
    - bikes.ts, usedBikes.ts, mechanics.ts – Sample data and selectors
  - lib/
    - utils.ts – cn() helper using clsx + tailwind-merge
  - utils/ – Animations and misc utilities

Guidelines
- Use the @ path alias for imports (e.g., import X from "@/components/X").
- Add new routes in App.tsx ABOVE the catch-all "*" route as noted in the code comment.
- Keep page-level logic in src/pages; extract reusable UI into src/components.
- Static images should live in public/images and be referenced with absolute paths (e.g., /images/foo.jpg).

## 3. Test Strategy
Current state
- No tests or test tooling are present in the repo.

Recommended approach
- Unit and component tests: Vitest + @testing-library/react + @testing-library/user-event
- Integration tests: Expand with React Router + React Query behaviors using msw (Mock Service Worker)
- E2E tests: Cypress or Playwright (optional)

Structure & naming
- Co-locate tests with components using .test.ts(x) suffix, or place in __tests__ directories alongside source.
- Name files to mirror the component/module being tested (e.g., Button.test.tsx).

Mocking & stubs
- Use msw to simulate network calls when adding real APIs.
- Mock localStorage access through a small wrapper or jest/vi spies.

Coverage & philosophy
- Aim for strong coverage of critical flows: navigation, search/filter, comparison, accessibility toggles, i18n switching.
- Prefer integration-style tests for pages and complex components; unit tests for small utilities and hooks.

## 4. Code Style
TypeScript
- The app TypeScript config is not strict (tsconfig.app.json strict: false). Prefer explicit types, avoid any, and return typed values from hooks and utilities.
- Keep domain models (e.g., Bike, Dealer) stable and reused across components.

React & hooks
- Use functional components and React hooks exclusively.
- Follow React Hooks rules and ESLint guidance; keep hook calls deterministic and unconditional.
- Lift state thoughtfully; prefer local component state, then Context/Hooks when shared.
- Use React Query for server state when APIs are introduced (queries/mutations with proper keys and cache lifetimes).

Routing
- React Router v6 is used. Keep route components in src/pages and lazy-load when routes grow large.
- Add new routes before the catch-all NotFound route.

Styling
- Tailwind CSS is the styling system; prefer utility classes.
- Use the cn() helper (lib/utils.ts) to compose className strings safely.
- For component variants, follow the cva pattern (see components/ui/button.tsx) to keep variant logic declarative.

Naming conventions
- Components: PascalCase (e.g., BikeCard.tsx, Home.tsx)
- Hooks: use-*.tsx (e.g., use-auth.tsx)
- Contexts/Providers: PascalCase files exporting hooks (e.g., useLanguage)
- Variables/functions: camelCase; types/interfaces: PascalCase

Comments & documentation
- Keep components self-documenting; add brief comments for complex logic or design rationale.
- Co-locate README.md for complex modules (e.g., components/Chatbot/README.md) when helpful.

Error handling
- Wrap JSON parsing and localStorage access in try/catch (pattern already used).
- For async flows, handle loading and error states explicitly; surface user feedback via toasts.
- Do not swallow errors silently; log with context or show non-intrusive UI feedback.

Accessibility (a11y)
- Continue to prioritize ARIA attributes, focus management, keyboard navigation, and contrast.
- Keep high-contrast and large-text toggles functional and discoverable.
- Favor Radix primitives via shadcn/ui for accessible building blocks.

Internationalization (i18n)
- Use the LanguageContext and useLanguage() hook. Add new translation keys consistently across languages.
- Default to the key string if translation missing; avoid hardcoding user-visible strings in components.

## 5. Common Patterns
- Provider composition in App.tsx: ThemeProvider, AuthProvider, CompareProvider, TooltipProvider, QueryClientProvider, LanguageProvider, Router.
- Local persistence via localStorage for small, user-centric state (auth session, compare list, theme, language).
- UI primitives with shadcn/ui + Radix; variant-based styling with cva.
- Path alias @ for imports to avoid brittle relative paths.
- Domain-first data modeling in src/data with typed selectors (e.g., getBikeById, getUpcomingBikes).

## 6. Do's and Don'ts
✅ Do
- Use @ alias for imports from src.
- Extract reusable UI into components and colocate related logic.
- Keep components focused; prefer small, testable units.
- Use cn() for className composition; follow cva for variants.
- Maintain a11y: labels, roles, keyboard navigation, and color contrast.
- Add new routes before the NotFound catch-all.
- Keep localStorage interactions safe (guards + try/catch).
- Centralize shared state in hooks/contexts; keep server state in React Query (when applicable).

❌ Don’t
- Hardcode user-visible strings; use LanguageContext for translatable text.
- Introduce non-accessible UI patterns that break keyboard or screen reader usage.
- Bypass providers to implement ad-hoc global state.
- Mix absolute and relative asset paths inconsistently; keep assets in public/images.
- Leave unused code/vars; even if lint rule is relaxed, remove dead code.

## 7. Tools & Dependencies
Key libraries
- React 18 + React Router v6 – UI + routing
- TypeScript – Types and interfaces for safer code
- Vite – Fast dev/build tooling (dev server on port 8080)
- Tailwind CSS – Utility-first styling; tailwind-merge + clsx via cn()
- shadcn/ui + Radix – Accessible, composable UI primitives
- Lucide – Icon set
- TanStack Query – Async/server state (provider configured; adopt as backend integrates)

Scripts
- npm run dev – Start dev server
- npm run build – Production build
- npm run build:dev – Development-mode build
- npm run preview – Preview built app
- npm run lint – Lint codebase

Suggested testing deps (not yet installed)
- vitest, @testing-library/react, @testing-library/user-event, jsdom, msw

## 8. Other Notes
- Images: Reference as /images/... and store under public/images to benefit from Vite’s static asset serving.
- Catch-all route: Keep NotFound last; place new routes above it.
- i18n: When adding new pages/components, define keys in all languages in contexts/LanguageContext.tsx.
- The README mentions strict TypeScript; current app tsconfig has strict: false. Prefer enabling strict progressively (per file or module) and add types accordingly.
- When connecting a backend, move demo state (auth, compare) to rely on APIs + React Query while keeping optimistic UI behavior where appropriate.
