# Sources and Licensing

## Goal

Catholic Knowledge must be useful, trustworthy, and legally sustainable. We should know where canonical knowledge came from and whether we are allowed to store, transform, display, or redistribute it.

## Core Rule

> **Sources create facts. AI creates explanations.**

AI output is not a source. It may help summarize, translate, classify, or suggest candidate facts, but canonical knowledge must trace to reviewable evidence.

## Preferred Source Categories

### Structured open data

Use where possible for identity, dates, places, relationships, and identifiers:

- Wikidata — CC0 structured data
- OpenStreetMap — geographic/open map data subject to ODbL requirements
- OpenAlex / Crossref — scholarly metadata where relevant

### Open/licensable reference content

- Wikipedia — CC BY-SA; preserve attribution/share-alike obligations where reuse triggers them
- Wikimedia Commons — license varies per asset; record license and attribution per file
- Project Gutenberg — useful for public-domain historical works, verify jurisdiction/status
- Internet Archive — availability does not imply unrestricted reuse; verify item rights

### Catholic/open APIs

Potential early sources include:

- Catholic Readings API for liturgical calendar/readings metadata
- Parish Companion Ordo for liturgical calendar metadata

Do not assume every Catholic API or dataset is redistributable merely because it is publicly reachable. Record repository/API license.

### Authoritative Church sources

Official Church and episcopal-conference websites are important references, but much of their text is copyrighted.

Use them primarily for:

- Verification
- Metadata
- References/links
- Short permitted quotations where appropriate
- Original summaries written from the source

Do not bulk-copy protected texts without permission.

## Important Copyright Constraints

### Bible translations

Many modern Bible translations are copyrighted. Do not ingest full copyrighted Bible text by default.

For MVP:

- Store book/chapter/verse references
- Link to approved external sources
- Use public-domain translations only when rights are clear
- Track translation and copyright status explicitly

### Catechism and Church documents

Do not bulk-copy the Catechism of the Catholic Church or protected Church documents unless reuse rights explicitly permit it.

Prefer:

- Paragraph/document references
- Metadata
- Links
- Original summaries
- Short quotations within applicable permission/fair-use/fair-dealing constraints

## Source Model

Suggested canonical source metadata:

```ts
interface Source {
  id: string;
  title: string;
  publisher?: string;
  url?: string;
  sourceType: "primary" | "secondary" | "dataset" | "api" | "media";
  license?: string;
  licenseUrl?: string;
  attribution?: string;
  retrievedAt?: string;
  language?: string;
  notes?: string;
}
```

References from facts/edges should add a locator when useful:

```ts
interface SourceReference {
  sourceId: string;
  locator?: string;
  retrievedAt?: string;
  confidence?: number;
  status?: "verified" | "reviewed" | "unreviewed";
}
```

## Media Policy

For every reusable image/audio/media asset, record:

- Creator
- Original source URL
- License
- Attribution text
- Modifications if any
- Retrieval date

Prefer public-domain or permissively licensed assets for initial content.

AI-generated illustrations must be labeled internally as generated assets and must not be used as factual evidence.

## Ingestion Checklist

Before automating ingestion from a new source:

1. What is the license/terms of use?
2. Are we storing raw content or only derived metadata/facts?
3. Is attribution required?
4. Is share-alike triggered?
5. Are images/media licensed separately?
6. Can we redistribute the resulting data?
7. Does the source allow automated access?
8. What provenance metadata will we retain?

If rights are unclear, do not bulk ingest the content.

## Content Trust Classification

Where useful, distinguish:

- `primary-source`
- `authoritative-church-source`
- `scholarly-secondary-source`
- `general-reference`
- `community-contributed`
- `ai-suggested-unreviewed`

This classification may later influence ranking, UI labels, and AI grounding.

## Initial MVP Approach

Keep the first Augustine dataset intentionally small and manually reviewed. The goal is to validate the ontology, provenance UX, and visual product before building broad ingestion pipelines.
