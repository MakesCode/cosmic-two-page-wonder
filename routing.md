TanStack Router Documentation Guide
This document serves as a comprehensive reference for using TanStack React Router in our project. It is designed to be used as a "Master Control Prompt" (MCP) – a standardized guide passed into every AI or development prompt for code generation, refactoring, or feature implementation. When using this MCP, ensure all routing follows the specified file nomenclature and conventions to maintain consistency across categories (e.g., "sinistres" for claims-related routes). This ensures type-safety, nested layouts, dynamic parameters, and proper organization without deviating from TanStack Router's best practices.
The documentation is based on the official TanStack Router docs (version 1.x/latest), focusing on React integration. Key features include 100% inferred TypeScript support, type-safe navigation, nested/layout routes, built-in loaders with SWR caching, and file-based routing. Always prioritize file-based routing for scalability and automatic code-splitting.
Key Principles and Conventions

File-Based Routing: Routes are defined via filesystem structure. Use the Vite plugin (@tanstack/router-vite-plugin) or CLI (@tanstack/router-cli) to generate the route tree (e.g., in src/routeTree.gen.ts). This auto-generates type-safe route configs.
Root Setup: The root route is in \_\_root.tsx (created with createRootRoute or createRootRouteWithContext for context like QueryClient). It wraps all routes and handles global not-found (404) via notFoundComponent.
Type Safety Registration: In a global types file, declare:
tsxdeclare module '@tanstack/react-router' {
interface Register {
router: typeof router; // Replace with your router instance
}
}

Router Initialization: In router.tsx:
tsximport { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({
routeTree,
// Optional: defaultStaleTime, defaultGcTime, context, etc.
});
Provide to app via <RouterProvider router={router} />.
Special Characters in File Names:

. (Dot): Separates path segments for flat nesting (e.g., sinistres.new.tsx → /sinistres/new).
$ (Dollar): Denotes dynamic parameters (e.g., sinistres.$claimId.tsx → /sinistres/:claimId).
_ (Underscore Prefix): Ignores the file as a route (e.g., sinistres_.test.tsx is not a route but can be imported as a component, e.g., for tests or private UI like sidebars).
() (Parentheses): Groups routes without adding to the path (e.g., (sinistres)/ groups all sinistres files without prefixing /sinistres to child paths – but in our convention, use it for category grouping like (sinistres)).
index: For exact index routes (e.g., sinistres.index.tsx → /sinistres/ exact match).
route.tsx: Used for layout routes in groups/directories (e.g., sinistres.route.tsx defines the layout wrapping all child routes under /sinistres).

Ignored Files: Use _ prefix for non-route files (e.g., components, utils). This prevents them from generating routes but allows imports. Example: sinistres_.test.tsx can contain a sidebar JSX component imported into sinistres.route.tsx without rendering as a separate route.
Project Nomenclature: Group routes by category using parentheses (e.g., (sinistres) for claims). This organizes files without impacting URLs. Use flat files with dots for nesting. Avoid deep directories unless needed for complex nesting.
Layouts and Nesting: Layouts use <Outlet /> to render children. Parent routes (e.g., sinistres.route.tsx) act as layouts.
Dynamic and Splat Routes: Use $ for params; $ alone for splat (catch-all).
Pathless Routes: Prefix with \_ for organization without path consumption (e.g., \_auth/login.tsx).
Caching and Staleness: Default to SWR caching in loaders. Use staleTime: Infinity to disable if needed.

Example: Sinistres Category Structure
Follow this exact structure for categories like "sinistres" (claims). Files are flat under (sinistres)/ for grouping.
File Tree:
textpro/
(sinistres)/
sinistres\_.test.tsx // Ignored route: Private component (e.g., sidebar JSX, not displayed as route)
sinistres.$claimId.tsx // Dynamic route: /sinistres/:claimId (specific claim view)
sinistres.index.tsx // Index route: /sinistres/ (list or dashboard)
sinistres.new.tsx // Static child: /sinistres/new (create new claim)
sinistres.route.tsx // Layout: Wraps all /sinistres/\* children (e.g., with sidebar)
How This Maps to Routes

/sinistres: Matches sinistres.route.tsx (layout) + sinistres.index.tsx (content). Renders: <SinistresLayout><SinistresIndex />.
/sinistres/new: Matches sinistres.route.tsx (layout) + sinistres.new.tsx. Renders: <SinistresLayout><NewSinistre />.
/sinistres/:claimId: Matches sinistres.route.tsx (layout) + sinistres.$claimId.tsx. Renders: <SinistresLayout><ClaimDetails />.

Code Examples for Sinistres Files
sinistres.route.tsx (Layout)

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sinistres")({
  component: SinistresLayout,
});

function SinistresLayout() {
  return (
    <div>
      <Sidebar /> {/* Sidebar from ignored file */}
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}
```

sinistres.index.tsx (Index Route)

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sinistres/")({
  // Trailing / for index
  component: SinistresIndex,
});

function SinistresIndex() {
  return <div>Sinistres List</div>;
}
```

sinistres.new.tsx (Static Child)

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sinistres/new")({
  component: NewSinistre,
});

function NewSinistre() {
  return <div>Create New Sinistre Form</div>;
}
```

sinistres.$claimId.tsx (Dynamic Route)

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sinistres/$claimId")({
  component: SinistreDetails,
});

function SinistreDetails() {
  return <div>Details for Claim {claimId}</div>;
}
```

Loaders and Actions

Loaders: Fetch data before rendering. Define in route config. Use for parallel loading, caching.

Parameters: context, params, search (via loaderDeps), abortController.
Example: See above in index and dynamic routes.
Caching: Use loaderDeps for search param keys (e.g., pagination). Set staleTime for freshness.
Consuming: Route.useLoaderData() or getRouteApi('/path').useLoaderData().

Actions: Not built-in like loaders; use mutations (e.g., with TanStack Query). For forms, use action in route config if needed (similar to Remix).
Error Handling: Use errorComponent, onError. Pending states via pendingComponent.
Validation: validateSearch for search params (e.g., with Zod).

Routing Concepts

Nested Routes: Children render in parent's <Outlet />. Use dots for flat nesting.
Layout Routes: Parents like sinistres.route.tsx wrap children.
Pathless Routes: Use \_ prefix for grouping without path (e.g., \_protected/dashboard.tsx).
Dynamic Segments: $ for params; accessible via useParams().
Splat Routes: $.tsx for catch-all.
Search Params: Validate with validateSearch; use in loaders via loaderDeps.
Not Found: Handle via root's notFoundComponent.
