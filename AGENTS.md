# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build & Development Commands

```bash
bun dev          # Start dev server (Vite)
bun run build    # TypeScript check + production build
bun run lint     # Run Biome linter + Knip (unused exports)
bun run format   # Format with Biome
```

## Environment Setup

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to your TableCRM API endpoint.

## Code Style

Biome handles formatting and linting. Key rules:
- 4-space indentation
- Single quotes, semicolons required
- Arrow parens only when needed
- `noExplicitAny` disabled

## Architecture Overview

**Entry Point**: `src/main.tsx` - Sets up QueryClient (5min stale time), BrowserRouter, and Sonner toasts.

**Routing** (`src/app/router/`):
- All pages lazy-loaded with Suspense
- `PrivateRoute` guards `/order` route via `useAuth()` hook
- Auth redirects handled in `App.tsx`

**API Layer** (`src/services/api/`):
- `client.ts`: Axios wrapper that injects token as query param
- `tableCrm.service.ts`: Typed API methods for CRM entities (contragents, warehouses, orders, etc.)
- `queryKeys.ts`: TanStack Query key factories

**State Management**:
- `useAuth()` (`src/shared/hooks/useAuthReturn.ts`): Token stored in sessionStorage, validated against API
- `useTableCrmApi()`: Aggregates all dictionary queries and order mutations with TanStack Query
- `useOrderForm()`: Form state and submission logic using react-hook-form + valibot

**UI Components**:
- Shadcn primitives in `src/components/ui/`
- `BaseSelectDialog`: Generic modal for selecting from lists with search
- `FIELD_CONFIG` (`src/shared/constants/dialogs.constant.tsx`): Configuration-driven field rendering for order form

**Types**: All CRM domain types (Order, Contragent, Warehouse, etc.) in `src/shared/types/types.ts`.

## Key Patterns

- **Path alias**: `@/` maps to `src/` (configured in vite.config.ts)
- **React Compiler**: Enabled via babel-plugin-react-compiler for automatic memoization
- **Dialog-based selection**: Form fields use modal dialogs for entity selection, configured declaratively in `FIELD_CONFIG`
- **API token**: Passed as query param `?token=...` to all API requests

## Language

The UI is in Russian. Error messages and labels should maintain Russian text.
