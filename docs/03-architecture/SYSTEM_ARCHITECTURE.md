# System Architecture

## Architecture Goals

- Ship a polished visual MVP quickly.
- Keep hosting and AI costs near zero initially.
- Keep factual knowledge separate from AI-generated explanation.
- Support bilingual EN/VI content.
- Make graph, timeline, map, and story views data-driven.
- Allow the storage layer to evolve without rewriting the UI model.

## MVP Architecture

```text
Sources
  ↓
Ingestion / Curation
  ↓
Canonical Knowledge Model
  ├── Entities
  ├── Relationships
  ├── Facts
  ├── Sources
  ├── Media
  ├── Timeline Events
  └── Learning Journeys
  ↓
Local typed data / SQLite initially
  ↓
Next.js application
  ├── Discover
  ├── Entity Explorer
  ├── Knowledge Graph
  ├── Timeline
  ├── Learning
  └── Ask
  ↓
Optional AI explanation layer
```

## Recommended Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Flow (`@xyflow/react`) for interactive graph views where appropriate
- SVG / D3 for custom infographics and timelines
- Mermaid for documentation and simple deterministic diagrams

### Hosting

- Cloudflare Pages for frontend deployment
- Cloudflare Workers for lightweight APIs or AI proxying
- Cloudflare D1 / SQLite when persistence is needed

### Content/Data

Phase 1: checked-in typed JSON/TypeScript fixtures.

Phase 2: SQLite/D1 canonical store populated through ingestion scripts.

Phase 3: add a graph database only if graph traversal/query requirements justify the operational cost and complexity.

Neo4j is explicitly **not required for the MVP**.

## Application Structure

Suggested repository structure:

```text
app/
  page.tsx
  saints/[slug]/
  explore/
  timeline/
  learn/[slug]/
  ask/
components/
  knowledge/
  diagrams/
  infographics/
  timeline/
  sources/
  ui/
data/
  entities/
  relationships/
  journeys/
  sources/
lib/
  ontology/
  graph/
  i18n/
  provenance/
docs/
```

## Domain Separation

Presentation must not own domain truth.

Bad:

```tsx
<Card title="Monica" relation="Mother of Augustine" />
```

Preferred:

```ts
entity = getEntity("person.monica")
relations = getRelations("person.monica")
```

Components then render the canonical model.

## Visualization Engine

The product should expose a reusable visualization layer that transforms typed knowledge into multiple views:

```text
Canonical Graph
   ├── Entity page
   ├── Relationship map
   ├── Timeline
   ├── Story Mode
   ├── Infographic
   ├── Learning journey
   └── AI context
```

A visualization definition may resemble:

```ts
interface KnowledgeView {
  id: string;
  title: LocalizedText;
  nodeIds: string[];
  edgeIds: string[];
  lenses?: KnowledgeType[];
  storySteps?: StoryStep[];
}
```

The renderer decides layout and interaction; the view definition remains structured data.

## AI Architecture

### Principle

**Sources create facts. AI creates explanations.**

AI must not write directly into canonical knowledge without an explicit review/validation workflow.

### Initial uses

Prefer build-time or authoring-time AI for:

- Draft summaries
- Vietnamese translation assistance
- Quiz generation
- Suggested relationships for review
- Timeline narration
- Illustration prompts

Cache reviewed outputs where possible.

Runtime AI should initially be limited to the Ask experience and contextual explanations.

### Grounded Ask flow

```text
Question
  ↓
Resolve relevant entities / concepts
  ↓
Retrieve canonical facts + relationships + sources
  ↓
Construct grounded context
  ↓
LLM explanation
  ↓
Answer + source references + Explore actions
```

## Provenance Architecture

Every canonical fact or relationship should be capable of linking to one or more sources.

Minimum source metadata:

```ts
interface SourceReference {
  sourceId: string;
  locator?: string;
  retrievedAt?: string;
  license?: string;
  confidence?: number;
  status?: "verified" | "reviewed" | "unreviewed";
}
```

## Localization Architecture

Entity identity is language-neutral.

```ts
interface LocalizedText {
  en: string;
  vi?: string;
}
```

Do not create separate Vietnamese and English entity IDs.

## Performance Principles

- Prefer static/server-rendered content for primary pages.
- Lazy-load graph-heavy client components.
- Keep AI images optimized and cached.
- Do not ship huge graph payloads when a focused subgraph is sufficient.
- Mobile graph views should use focused exploration rather than a full desktop canvas.

## Security / Trust

- Never present AI-generated explanation as an authoritative Church statement.
- Store source/license metadata with imported content.
- Sanitize externally sourced rich text.
- Avoid importing copyrighted texts unless permitted.
- Clearly separate canonical facts, sourced quotations, interpretation, and AI explanation.

## Evolution Path

### Phase 1
Local typed data + high-quality UI primitives.

### Phase 2
D1/SQLite + automated source ingestion + search.

### Phase 3
Grounded AI + richer provenance and editorial workflows.

### Phase 4
Optional graph database, public API, user collections, and broader visual knowledge engine capabilities.
