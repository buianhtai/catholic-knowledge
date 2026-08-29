# Ontology

## Purpose

The ontology is the backbone of Catholic Knowledge. It defines the canonical types and relationships that power entity pages, diagrams, timelines, search, learning journeys, and AI grounding.

The ontology should remain small and understandable at first. Add types only when they create meaningful product behavior.

## Canonical Entity

```ts
interface KnowledgeEntity {
  id: string;
  type: EntityType;
  slug: string;
  labels: LocalizedText;
  summary?: LocalizedText;
  dates?: DateRange;
  attributes?: Record<string, unknown>;
  sourceRefs: SourceReference[];
}
```

Canonical IDs must be stable and language-neutral, for example:

- `person.augustine-of-hippo`
- `person.monica`
- `place.hippo-regius`
- `work.confessions`
- `concept.grace`
- `event.council-of-nicaea-325`

## Initial Entity Types

### Person

Subtypes may include:

- Saint
- Pope
- Bishop
- Theologian
- BiblicalPerson
- Martyr
- Missionary

### Place

Subtypes may include:

- City
- Region
- Church
- Diocese
- Monastery
- PilgrimageSite

### Work

Subtypes may include:

- Scripture
- ChurchDocument
- Book
- Letter
- Creed
- Prayer

### Event

Subtypes may include:

- Council
- Martyrdom
- Apparition
- HistoricalEvent
- Canonization

### Concept

Subtypes may include:

- Doctrine
- Sacrament
- Virtue
- TheologyConcept
- Heresy
- LiturgicalConcept

### Organization

Future examples:

- ReligiousOrder
- Diocese
- Community
- Movement

## Initial Relationship Types

Use explicit semantic relationships where possible.

### Authorship and documents

- `WROTE`
- `AUTHORED_BY`
- `MENTIONED_IN`
- `DEFINED_AT`
- `PROMULGATED_BY`

### People and influence

- `INFLUENCED`
- `TEACHER_OF`
- `STUDENT_OF`
- `BAPTIZED_BY`
- `MOTHER_OF`
- `FATHER_OF`
- `CONTEMPORARY_OF`

### Events and participation

- `PARTICIPATED_IN`
- `PRESENT_AT`
- `CONDEMNED_BY`
- `CANONIZED_BY`

### Geography

- `BORN_IN`
- `DIED_IN`
- `LIVED_IN`
- `BISHOP_OF`
- `LOCATED_IN`
- `PILGRIMAGE_SITE_FOR`

### Organizations

- `FOUNDED`
- `MEMBER_OF`
- `LED`

### Concepts

- `RELATED_TO`
- `DEVELOPS`
- `SUPPORTS`
- `OPPOSES`
- `CLARIFIED_AT`

Do not overuse `RELATED_TO`; prefer a specific relationship when it is stable and useful.

## Relationship Model

```ts
interface KnowledgeRelationship {
  id: string;
  type: RelationshipType;
  from: string;
  to: string;
  labels?: LocalizedText;
  startDate?: string;
  endDate?: string;
  sourceRefs: SourceReference[];
  attributes?: Record<string, unknown>;
}
```

## Fact Model

Some information is better represented as a sourced fact rather than an edge.

```ts
interface KnowledgeFact {
  id: string;
  entityId: string;
  predicate: string;
  value: unknown;
  sourceRefs: SourceReference[];
  classification?: "historical-fact" | "doctrine" | "tradition" | "interpretation" | "disputed";
}
```

This classification is important because not every Catholic knowledge claim has the same epistemic status.

## Augustine Seed Graph

```text
Monica ──MOTHER_OF────────▶ Augustine
Ambrose ──BAPTIZED_BY─────▶ Augustine
Augustine ──WROTE─────────▶ Confessions
Augustine ──WROTE─────────▶ City of God
Augustine ──BISHOP_OF─────▶ Hippo
Augustine ──BORN_IN───────▶ Tagaste
Augustine ──LIVED_IN──────▶ Milan
Augustine ──RELATED_TO────▶ Grace
```

The first implementation should enrich this to roughly 8–12 meaningful relationships.

## Timeline Events

```ts
interface TimelineEvent {
  id: string;
  title: LocalizedText;
  date: string | DateRange;
  entityIds: string[];
  placeIds?: string[];
  sourceRefs: SourceReference[];
  summary?: LocalizedText;
}
```

Timeline events should reference canonical entities rather than duplicate them.

## Story Steps

```ts
interface StoryStep {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  focusEntityIds: string[];
  focusRelationshipIds?: string[];
  timelineEventId?: string;
  sourceRefs?: SourceReference[];
}
```

Story Mode uses the same graph rather than maintaining an unrelated narrative model.

## Localization

```ts
interface LocalizedText {
  en: string;
  vi?: string;
}
```

Content may begin English-first, but every entity must remain ready for Vietnamese labels and summaries.

## Provenance Rule

Canonical facts and relationships should have at least one source reference before being treated as verified production data.

AI-suggested facts or relationships must remain `unreviewed` until verified.

## Ontology Change Rule

Before adding a new entity or relationship type, answer:

1. Can an existing type model it accurately?
2. Will the new type improve search, visualization, filtering, or learning behavior?
3. Can editors and developers clearly understand its semantics?
4. Is it backed by real content examples?

If not, do not add it yet.
