# Design System

## Experience Direction

Catholic Knowledge should feel like a **modern digital museum, premium encyclopedia, and interactive knowledge atlas**.

Avoid generic SaaS-dashboard patterns. The product should be editorial, visual, calm, trustworthy, and exploratory.

## Visual Character

- Warm cream / parchment-inspired surfaces
- Deep navy for authority and contrast
- Restrained gold accents
- Generous whitespace
- Strong editorial typography
- Illustrated entity portraits and meaningful iconography
- Rich diagrams, maps, timelines, and infographic cards
- Subtle depth and layering rather than excessive glassmorphism

## Core UI Principles

### 1. Knowledge is visual
Prefer visual structures when relationships or progression matter:

- Knowledge graphs
- Timelines
- Maps
- Process/story flows
- Comparison diagrams
- Infographics

### 2. Every visual has meaning
Icons, shapes, line styles, and motion should encode semantics, not decorate randomly.

### 3. Exploration is progressive
Start with a clear overview, then let users expand details, sources, neighboring entities, and story paths.

### 4. Motion is finite and purposeful
Use animation for:

- Story Mode progression
- Highlighting a selected path
- Revealing temporal progression
- Focusing upstream/downstream relationships

Avoid permanent decorative motion.

## Primary Navigation

- Discover
- Explore
- Learn
- Timeline
- Scripture
- Ask

Future navigation may include Places, Daily Liturgy, Kids, Study, and Vietnamese Catholicism.

## Core Page Families

1. Home / Discover
2. Entity Explorer
3. Knowledge Graph
4. Church History Timeline
5. Learning Journey
6. Scripture Explorer
7. Doctrine Visual Explainer
8. Council Explorer
9. Daily Liturgy
10. Places & Pilgrimage
11. Ask Catholic Knowledge
12. Kids Mode

## Entity Explorer Pattern

An entity page should support:

- Hero identity: name, image/illustration, dates, roles
- Key facts / at-a-glance infographic
- Overview
- Timeline
- Connections
- Works / related documents
- Places
- Sources
- Ask about this entity

The page must not become a long article with decorative cards. Visual relationships are central.

## Knowledge Graph Pattern

The graph should follow an Archify-like interaction philosophy while remaining original in implementation and branding:

- Typed nodes
- Typed edges
- Semantic filtering/lenses
- Search
- Selected-node detail panel
- Upstream/downstream tracing
- Exact relationship/path exploration
- Story Mode
- Source-aware facts/edges
- Synchronized graph + timeline where useful

Suggested lenses:

- People
- Places
- Writings
- Doctrine
- Events
- Councils

## Infographics

Reusable infographic components should include:

- Metric cards
- Donut / distribution charts
- Milestone strips
- Influence / legacy summaries
- Era comparison cards
- Relationship summaries

Keep them accessible and backed by structured data.

## Iconography

Use icons to distinguish semantic types, for example:

- Person / Saint
- Pope / Bishop
- Place / Church
- Book / Document
- Council / Event
- Doctrine / Concept
- Scripture
- Sacrament

Do not use icons as substitutes for labels.

## Typography

Use a strong editorial hierarchy:

- Display serif or similarly expressive type for major entity/page titles
- Highly readable sans-serif for UI, captions, metadata, controls, and long text
- Clear distinction between factual metadata, narrative explanation, source labels, and AI-generated explanation

Exact font selection can be made during implementation based on performance and licensing.

## Responsive Behavior

Desktop can use multi-column museum/atlas layouts. Mobile should preserve the same conceptual hierarchy while collapsing into:

1. Identity
2. At-a-glance
3. Primary story/overview
4. Visualizations
5. Related entities
6. Sources

Graph exploration on mobile should support focus mode rather than simply shrinking a desktop canvas.

## Accessibility

- Keyboard-operable graph controls where practical
- Text equivalents for visual relationships
- Sufficient contrast
- Reduced-motion support
- Semantic headings and landmarks
- Do not encode meaning by color alone

## AI Presentation

AI is a guide, not the main product surface.

AI answers should:

- Explain concisely
- Point to related entities
- Offer Explore / Timeline / Story actions
- Show evidence/sources
- Clearly distinguish explanation from canonical structured facts

## Implementation Guidance

Use reusable primitives such as:

- `EntityHero`
- `KnowledgeNode`
- `KnowledgeEdge`
- `KnowledgeGraph`
- `StoryPlayer`
- `Timeline`
- `TimelineEvent`
- `SourceCitation`
- `InfographicCard`
- `MetricCard`
- `SemanticLens`
- `RelatedEntityCard`

Visualizations should consume typed structured data rather than page-specific JSX constants.
