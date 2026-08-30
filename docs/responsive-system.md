# Responsive system

This document defines the shared responsive rules for Catholic Knowledge. New pages should use these primitives instead of inventing page-specific breakpoints.

## Breakpoints

- Small: up to 640px
- Medium: 641–768px
- Large: 769–1024px
- Extra large: 1025–1280px
- Wide layouts: above 1280px

Viewport breakpoints are for application-level layout. Prefer component/container-driven sizing inside complex widgets when the component needs to adapt to the space it receives.

## Shared layout primitives

`styles/responsive.css` exposes:

- `ck-page`: page gutter and width safety
- `ck-container`: application content container
- `ck-content`: narrower reading/content container
- `ck-stack`: vertical responsive stack
- `ck-grid`: responsive card/content grid
- `ck-split`: content + side panel layout, collapsed at 1024px
- `ck-toolbar`: search/actions layout, two-column mobile actions at 640px
- `ck-cluster`: wrapping inline controls
- `ck-touch-target`: minimum 44px interactive target
- `ck-fluid-title` / `ck-fluid-subtitle`: fluid type scales
- `ck-safe-wrap`: defensive text wrapping
- `ck-scroll-x`: explicit horizontal scrolling for content that genuinely needs it

React wrappers live in `components/layout/ResponsiveLayout.tsx`.

## Rules

1. Every grid/flex child that can contain long or interactive content must be able to shrink. Use `min-width: 0` or a shared primitive that provides it.
2. Avoid page-level horizontal scrolling. Horizontal scrolling is allowed only for intentionally scrollable content such as timelines or data tables.
3. Do not use fixed desktop widths for mobile layouts. Prefer `minmax(0, 1fr)`, `%`, `clamp()`, and shared containers.
4. Use CSS for visual reflow. Use React/media-query logic only when behavior changes, such as opening a drawer instead of a side panel.
5. Interactive targets should be at least 44px on touch layouts.
6. Complex components should prefer container queries when their behavior depends on component width rather than viewport width.
7. Preserve desktop information density while simplifying mobile presentation; do not merely shrink desktop UI.

## Required validation

Migrated pages should be checked at:

- 320 × 568
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1440 × 900

Acceptance criteria:

- no document-level horizontal overflow
- no clipped primary controls or content
- readable fluid headings
- touch targets remain usable
- side-by-side layouts stack intentionally on narrow screens
- scrolling regions are explicit and do not trap the page

## Migration order

1. Shared application shell/navigation
2. Graph and visualization pages (`/kham-pha`, `/explore`)
3. Search/list/detail pages
4. Forms and interactive workflows
5. Static/editorial pages
6. Add automated viewport regression coverage after the first representative migrations
