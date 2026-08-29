# Product Requirements Document

## Product

**Catholic Knowledge** is a visual, source-backed Catholic knowledge platform that helps people understand how Scripture, history, saints, places, doctrine, councils, writings, and ideas connect.

## Product Thesis

Most Catholic digital products are optimized for reading articles, prayer, Bible study, or chat. Catholic Knowledge is optimized for **understanding connections**.

> **Core differentiation:** Knowledge Graph + Visual Storytelling + Trusted Sources + Grounded AI.

The product should feel like an interactive Catholic knowledge atlas rather than a traditional encyclopedia.

## Problem

Catholic knowledge is broad and deeply interconnected, but existing experiences are fragmented across articles, books, websites, apps, and documents. Users often struggle to answer questions such as:

- How does a saint connect to a council, doctrine, place, and historical period?
- How did an idea develop through Scripture, Church Fathers, councils, and later theology?
- Why did an event matter, and what did it influence?
- Which claims are sourced, which are interpretation, and where can I verify them?

## Goals

1. Make Catholic knowledge visually explorable.
2. Represent key concepts as structured entities and relationships.
3. Make sources and provenance visible and trustworthy.
4. Support bilingual English/Vietnamese experiences from one canonical model.
5. Use AI to explain, summarize, translate, and guide exploration without treating AI output as canonical truth.
6. Build a reusable visual knowledge engine that can power multiple page types.

## Non-Goals for MVP

- Complete Catholic encyclopedia coverage.
- Replacing authoritative Church documents.
- Full theological question answering without source grounding.
- Neo4j-scale graph infrastructure before graph-query requirements justify it.
- Real-time AI generation for every page.

## Target Users

### Curious learners
People who want to understand Catholic history, saints, doctrine, Scripture, and traditions without navigating many disconnected sources.

### Students and catechists
Users who need structured learning paths, timelines, diagrams, references, and teaching aids.

### Vietnamese Catholics
Users who need high-quality EN/VI terminology and stronger coverage of Vietnamese Catholic history, martyrs, dioceses, pilgrimage places, and local context.

### Researchers and advanced learners
Users who value provenance, primary references, cross-links, and historical context.

## Core Experience Modes

- **Discover** — curated entry points and daily/featured knowledge.
- **Explore** — graph-first exploration of entities and relationships.
- **Learn** — guided visual journeys.
- **Timeline** — chronological exploration of Church history.
- **Ask** — grounded AI explanations linked to evidence and related concepts.

Later modes may include Kids, Study, Pray, Maps, and Quizzes.

## MVP Scope

### Pages

1. Home / Discover
2. Saint Entity Explorer — St. Augustine
3. Knowledge Graph Explorer
4. Church History Timeline
5. Learning Journey — From Jesus to Nicaea
6. Grounded Ask shell

### Core capabilities

- Shared visual design system
- Responsive shell and navigation
- Canonical typed entities and relationships
- Source/provenance metadata
- Interactive graph visualization
- Timeline visualization
- Reusable infographic cards
- EN/VI-ready localization model
- Local typed data before backend integration

## Initial Content Scope

Start with a small, rich graph rather than a large shallow dataset. Initial entities should include:

- Jesus
- Mary
- Peter
- Paul
- Monica
- Ambrose
- Augustine
- Tagaste
- Milan
- Hippo
- Confessions
- City of God
- Grace
- Pentecost
- Council of Nicaea
- Nicene Creed

Expand toward 500–1,000 connected entities after the model and experience are validated.

## Product Principles

### Visual-first knowledge
Diagrams, timelines, maps, infographics, and relationships are first-class content.

### Source-backed
Important facts should support source, source identifier, retrieved date, license, status, and confidence where relevant.

### Connected
The ontology and relationship model are central to the product, not an implementation detail.

### AI-assisted, not AI-authored truth
**Sources create facts. AI creates explanations.**

### Bilingual by design
Canonical entity IDs are language-neutral. Labels and descriptive content attach by locale.

## Key Differentiators

### One graph, many views
The same structured knowledge should render as an article, graph, timeline, map, story, quiz, Kids view, or AI explanation.

### Story Mode
Users can play guided narratives through a graph or timeline, for example:

Jerusalem → Pentecost → Apostles → Paul → Antioch → Rome → Persecution → Constantine → Nicaea.

### Evidence as interface
Sources should be visible at the fact and relationship level where possible, not hidden behind generic citation lists.

### Vietnam-first depth
Coverage should include Vietnamese Martyrs, Our Lady of La Vang, missionary history, dioceses, churches, pilgrimage sites, and Vietnamese Catholic terminology.

## Success Criteria for First Vertical Slice

The first release is successful if:

- A new user can understand what the product is within seconds.
- The Augustine page feels visually distinctive and professional.
- A user can explore at least 8–12 meaningful Augustine relationships interactively.
- Graph, timeline, and source components are reusable across future entity types.
- EN/VI content can be added without changing entity identity.
- No important factual UI depends on unsourced AI output.

## Product Positioning

> **Catholic Knowledge transforms trusted information into an interactive visual world—letting people see how Scripture, history, saints, places, doctrine and ideas connect, while AI helps them explore and understand the evidence.**
