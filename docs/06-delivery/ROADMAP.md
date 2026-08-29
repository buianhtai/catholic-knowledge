# Roadmap

## Delivery Strategy

Build one polished vertical slice first, then expand page families using the same domain and visualization primitives.

Do not attempt all planned experiences at once.

## Phase 0 — Product Foundation

Goal: remove ambiguity before feature implementation.

Deliverables:

- PRD
- Design system
- System architecture
- Ontology
- Source/licensing policy
- Codex/agent instructions
- MVP backlog

Exit criteria:

- Product principles are explicit.
- First vertical slice is defined.
- Entity/relationship/source models are agreed.

## Phase 1 — Visual Foundation

Goal: establish the real product identity.

Build:

- Next.js + TypeScript application
- Global shell and responsive navigation
- Design tokens and typography
- Home / Discover page
- Reusable cards, sections, badges, source components
- Seed typed content model

Exit criteria:

- Product does not look like a generic dashboard.
- Desktop and mobile shells are usable.
- Content components consume typed data.

## Phase 2 — Augustine Vertical Slice

Goal: prove that connected Catholic knowledge is compelling.

Build:

- St. Augustine entity explorer
- Hero / identity block
- At-a-glance infographics
- Life timeline
- Related works
- Key concepts/themes
- Source presentation
- 8–12 canonical relationships

Seed graph:

- Monica
- Ambrose
- Tagaste
- Milan
- Hippo
- Confessions
- City of God
- Grace

Exit criteria:

- Augustine page is visually polished.
- All major facts/relationships can carry provenance.
- Components are reusable for other entities.

## Phase 3 — Interactive Knowledge Graph

Goal: make connected exploration the product's signature interaction.

Build:

- Interactive graph canvas
- Typed nodes/edges
- Semantic lenses
- Search/focus
- Selected-node details
- Relationship path highlighting
- Story Mode prototype
- Mobile focus mode

Exit criteria:

- Users can understand and navigate the Augustine subgraph.
- Graph is generated from canonical data, not page constants.

## Phase 4 — History + Learning

Build:

- Church history timeline
- Learning journey framework
- Journey: From Jesus to Nicaea
- Story synchronization between graph and timeline
- Progress/checkpoint model

## Phase 5 — Grounded Ask

Build:

- Ask shell
- Entity/context retrieval
- Source-backed prompt context
- AI explanation UI
- Related Explore / Timeline / Learn actions

Initially support a narrow curated knowledge set rather than open-domain theological chat.

## Phase 6 — Bilingual Depth

Build:

- EN/VI locale routing
- Vietnamese labels/summaries
- Catholic terminology glossary
- Vietnamese Martyrs content
- Our Lady of La Vang
- Vietnamese Catholic history and places

## Phase 7 — Broader Page Families

Expand using the established visual engine:

- Scripture Explorer
- Doctrine Visual Explainer
- Council Explorer
- Places & Pilgrimage
- Daily Liturgy
- Kids Mode
- Quiz / Study mode

## Phase 8 — Data Platform

Only after UX/model validation:

- D1/SQLite persistence
- Automated ingestion
- Editorial review workflow
- Search indexing
- Provenance auditing
- Build-time AI enrichment

Evaluate Neo4j or another graph database only when real query requirements demonstrate a need.

## Long-Term Opportunity

The underlying architecture can evolve into a reusable **Visual Knowledge Engine**:

```text
Sources
  ↓
Knowledge Graph + Provenance
  ↓
Graph / Timeline / Map / Infographic / Story
  ↓
Learning + Grounded AI
```

Catholicism is the first vertical and should remain the product focus until the experience is validated.
