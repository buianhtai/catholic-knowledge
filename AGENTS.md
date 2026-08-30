# AGENTS.md

## Purpose

This repository builds **Catholic Knowledge**, a visual, source-backed Catholic knowledge platform combining an encyclopedia, interactive knowledge graph, historical atlas, learning system, and grounded AI tutor.

## Read Before Implementing

Before making meaningful product or architecture changes, read:

1. `docs/01-product/PRD.md`
2. `docs/02-design/DESIGN_SYSTEM.md`
3. `docs/02-design/VIETNAMESE_EDITORIAL_STYLE.md`
4. `docs/03-architecture/SYSTEM_ARCHITECTURE.md`
5. `docs/04-data/ONTOLOGY.md`
6. `docs/04-data/SOURCES_AND_LICENSING.md`
7. Relevant ADRs when present

## Product Principles

- **Sources create facts. AI creates explanations.**
- Prefer visual understanding over long-form text when a diagram, timeline, map, graph, or infographic communicates better.
- Important factual claims must be capable of carrying provenance.
- AI output must never silently become canonical knowledge.
- The knowledge model must be reusable across pages and visualizations.
- EN/VI support is structural, not an afterthought.
- Vietnamese user-facing copy must be written as natural Vietnamese, not as a word-for-word translation of English. Translate meaning rather than English sentence structure, and follow `docs/02-design/VIETNAMESE_EDITORIAL_STYLE.md`.
- Do not build a generic SaaS dashboard. The product should feel like a modern digital museum, encyclopedia, and interactive knowledge atlas.

## Engineering Rules

- Use TypeScript strictly.
- Prefer reusable components over page-specific implementations.
- Keep domain data separate from presentation.
- Diagrams must be deterministic and data-driven.
- Do not use generated raster images to encode factual relationships.
- Keep mobile and accessibility in scope from the first implementation.
- Avoid introducing a new framework, database, entity type, relationship type, or major pattern without updating the relevant documentation.

## Pre-PR Validation Gate

Validation is part of the implementation, not a post-PR cleanup step.

Before opening or updating a pull request with implementation changes:

1. Run `npm run lint` and resolve errors and actionable warnings introduced by the change.
2. Run `npm run test`.
3. Run `npm run typecheck`.
4. Run `npm run build`.
5. Prefer `npm run check` when the environment supports the full combined validation.
6. Review the changed files for obvious UI regressions, stale raw `<img>` usage, decorative glyph regressions, broken links, and responsive issues.
7. Only describe the PR as ready after the applicable local checks pass. If a check cannot be executed in the current environment, state that limitation explicitly instead of assuming CI will catch it later.
8. After pushing the final implementation commit, verify the associated CI run and address failures before recommending merge.

Do not open a PR simply to discover lint, test, typecheck, or build failures that could have been detected before submission.

## Initial Vertical Slice

Prioritize in this order:

1. Home / Discover
2. St. Augustine entity explorer
3. Interactive knowledge graph
4. Sources / provenance display
5. EN/VI-ready content model

Do not expand to all planned screens until these primitives are polished and reusable.
