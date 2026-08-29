# MVP Backlog

## Epic 1 — Application Foundation

### CK-001 Initialize Next.js application
Acceptance criteria:
- Next.js + TypeScript project boots successfully.
- Tailwind is configured.
- Strict TypeScript enabled.
- Basic linting/build scripts exist.

### CK-002 Create global application shell
Acceptance criteria:
- Desktop and mobile navigation.
- Routes reserved for Discover, Explore, Learn, Timeline, Scripture, Ask.
- Shared max-width/layout primitives.

### CK-003 Establish design tokens
Acceptance criteria:
- Cream/parchment, navy, gold, neutral surfaces represented as tokens.
- Typography scale and spacing tokens defined.
- Reduced-motion and contrast considerations included.

## Epic 2 — Canonical Knowledge Model

### CK-010 Define TypeScript domain types
Create types for:
- Entity
- Relationship
- Fact
- Source
- SourceReference
- TimelineEvent
- StoryStep
- LearningJourney
- LocalizedText

### CK-011 Add seed Augustine dataset
Include at minimum:
- Augustine
- Monica
- Ambrose
- Tagaste
- Milan
- Hippo
- Confessions
- City of God
- Grace

Acceptance criteria:
- Stable canonical IDs.
- EN labels present.
- VI fields structurally supported.
- Relationships have source-reference capability.

### CK-012 Create local data access helpers
Acceptance criteria:
- `getEntity(id)`
- `getEntityBySlug(slug)`
- `getRelations(entityId)`
- `getSourcesForEntity(entityId)` or equivalent selectors.

## Epic 3 — Home / Discover

### CK-020 Build Home hero
Acceptance criteria:
- Clear product positioning within first viewport.
- Search/Explore primary action.
- Premium editorial visual language.

### CK-021 Build Discover sections
Suggested modules:
- Featured story
- Today in the Church
- Explore connections
- Learning journeys
- Featured people/places/writings

### CK-022 Add responsive navigation
Acceptance criteria:
- Functional mobile navigation.
- EN/VI locale control placeholder.

## Epic 4 — Augustine Entity Explorer

### CK-030 Build reusable EntityHero
Support:
- name
- dates
- roles
- illustration/image
- short summary

### CK-031 Build At-a-Glance infographics
Potential metrics:
- major works
- feast day
- episcopal role
- life span / historical era

### CK-032 Build Augustine timeline
Acceptance criteria:
- Data-driven timeline events.
- Selected event can focus related entity where applicable.

### CK-033 Build related works and concepts
Acceptance criteria:
- Confessions
- City of God
- Grace
- reusable entity cards.

### CK-034 Build sources panel
Acceptance criteria:
- Source title/publisher.
- Locator/reference support.
- License/attribution metadata when applicable.

## Epic 5 — Knowledge Graph

### CK-040 Build graph data adapter
Convert canonical entities + relationships to renderer nodes/edges.

### CK-041 Implement interactive graph canvas
Acceptance criteria:
- Pan/zoom.
- Node selection.
- Semantic icons/types.
- Relationship labels.

### CK-042 Add semantic lenses
Initial filters:
- People
- Places
- Writings
- Concepts
- Events

### CK-043 Add selected-node panel
Show:
- title
- type
- summary
- why it matters / context
- related sources
- explore action

### CK-044 Add Story Mode prototype
Initial Augustine story:
1. Birth in Tagaste
2. Search and education
3. Milan and Ambrose
4. Baptism
5. Bishop of Hippo
6. Major writings and legacy

Acceptance criteria:
- Story steps focus graph nodes/edges.
- Motion is finite and supports reduced-motion mode.

### CK-045 Add mobile graph focus mode
Avoid shrinking the desktop canvas unchanged.

## Epic 6 — Timeline + Learning

### CK-050 Build reusable ChurchHistoryTimeline

### CK-051 Seed Church history milestones
Initial milestones:
- Early Church
- Pentecost
- Persecution periods
- Constantine
- Council of Nicaea
- Later eras as placeholders

### CK-052 Build LearningJourney framework
Acceptance criteria:
- Ordered steps.
- Progress state.
- Related canonical entities.
- Source references.

### CK-053 Build `From Jesus to Nicaea` journey
Suggested steps:
1. Jesus and the Apostles
2. Pentecost
3. Peter, Paul, and mission
4. Persecution and growth
5. Constantine
6. Nicaea

## Epic 7 — Grounded Ask Shell

### CK-060 Build Ask UI
Acceptance criteria:
- Question input.
- Answer area.
- Source list.
- Related Explore / Timeline / Learn actions.

### CK-061 Implement mocked grounded answers
Use canonical local data before connecting an LLM.

### CK-062 Design runtime AI adapter
Keep provider implementation behind an interface so Workers AI, Gemini, or another provider can be evaluated later.

## Epic 8 — Localization

### CK-070 Add locale model
Acceptance criteria:
- EN default.
- VI route/content support.
- Entity IDs remain unchanged by locale.

### CK-071 Translate initial UI chrome to Vietnamese

### CK-072 Add Vietnamese Catholic terminology glossary seed

## Epic 9 — Quality

### CK-080 Accessibility baseline
- keyboard navigation
- semantic headings
- graph text alternatives
- contrast
- reduced motion

### CK-081 Responsive QA
Test representative mobile, tablet, and desktop sizes.

### CK-082 Performance baseline
- lazy-load graph-heavy UI
- optimize images
- avoid oversized initial graph payloads

## Definition of First Milestone

The first implementation milestone is complete when:

- Home / Discover is visually polished.
- Augustine entity page is complete enough to demonstrate the product concept.
- Explore Graph renders the Augustine subgraph interactively.
- Sources/provenance are visible.
- Data is canonical and reusable rather than embedded in page JSX.
- EN/VI architecture is in place.
- Build/lint pass.
