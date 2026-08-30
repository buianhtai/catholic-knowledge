# Entity-specific visuals

For explanation and presentation surfaces, named entities should be visually identifiable whenever suitable sourced artwork exists, but visual identity must not create image overload or unnecessary download cost.

## Rule

- Named historical people should prefer a sourced portrait, icon, or historical artwork when imagery materially helps recognition.
- Named places should prefer a sourced photograph, map, archaeological-site image, or architectural image.
- Works and documents should prefer manuscript/book/document imagery.
- Named events should prefer relevant historical artwork or a place/document image tied to that event.
- Concepts may use structured diagrams instead of decorative images.
- Never use a generic artwork as if it depicts a specific person, place, work, or event.
- Do not use generic sparkle/star glyphs such as `✦`, `✧`, `★`, or `☆` as visual identity, emphasis, placeholders, infographic centers, or decorative navigation markers.
- When no trustworthy image exists, use a neutral structural treatment rather than unrelated artwork.
- Artwork provides editorial context, not historical proof; factual claims remain source-backed separately.

## Visual hierarchy and image budget

**Having an image is not the same as needing a large image.**

Dense surfaces must preserve a clear focal point while still allowing compact visual recognition:

1. Prefer one dominant image per explanatory card, cluster, or moment.
2. Secondary items may use small identity thumbnails when they materially improve recognition.
3. Small thumbnails should normally be about 56–96 px, not full-width card images.
4. Place/collection cards may use roughly 96–160 px imagery when the place itself is the item being browsed.
5. In a knowledge graph or constellation, imagery belongs primarily to the active/focused entity; surrounding nodes remain lightweight by default.
6. Repeated large images of the same entity on the same page should be avoided unless the repetition serves a distinct task.
7. Prefer progressive disclosure: overview first, richer imagery on focus or drill-down.
8. If adding or enlarging an image weakens hierarchy rather than improving recognition or understanding, reduce it.

A text-only secondary node is **not** a regression when the surface intentionally reserves imagery for the focal entity. A compact thumbnail is preferred when visual recognition adds value without creating a gallery effect.

## Responsive rendering

Image layout must be designed for desktop and mobile together.

- Use `next/image` for editorial imagery rather than raw `<img>` tags.
- Every image surface must declare a realistic `sizes` value so a small visual does not download a large source-sized file.
- Hero/focal imagery should normally declare approximately `100vw` on narrow screens and around `40–50vw` on desktop.
- Compact thumbnails should declare their actual rendered width, for example `60px`, `72px`, `76px`, or `104px`.
- Use per-asset focal points / `object-position` so portraits preserve faces, architectural images preserve the building, and manuscript crops preserve meaningful text/artwork.
- Focal crop and scale must be checked on both mobile and desktop; mobile is not the only responsive target.
- Prefer AVIF/WebP delivery where supported.

The browser should download an image close to the size it actually renders. A 76 px thumbnail must not require a 1200–1400 px transfer.

## Local media policy

The long-term preferred source is a curated local master copy served by Catholic Knowledge, while provenance continues to point to the original source.

Recommended layout:

`public/media/editorial/<asset-id>.<ext>`

Rules:

1. Do not commit giant archival originals just because Wikimedia provides them.
2. Keep a sensible master copy, usually around 1200–1600 px on the long edge for large artwork and smaller where the source is only ever a thumbnail.
3. Preserve `sourceUrl`, creator, license, and attribution metadata even when the displayed file is local.
4. Let Next/Vercel generate and cache responsive AVIF/WebP variants from that master instead of committing many manually resized copies.
5. Local serving is preferred for stability and crop control; remote Wikimedia URLs remain an acceptable migration fallback.
6. Never alter an image in a way that changes its historical meaning; cropping for composition is acceptable when attribution and subject identity remain clear.

With remote sources, Next/Vercel image optimization should still proxy and cache appropriately sized variants through the application. Vendoring the curated master locally removes the runtime dependency on the external host and is the preferred final state.

## Image reliability

Editorial imagery must never fail silently.

- Render the exact verified asset when available.
- Provide meaningful localized alt text.
- If an image fails to load, preserve layout and show an explicit neutral fallback with the subject description.
- Do not replace a failed exact image with unrelated artwork.
- A broken/blank image slot is a UI regression.

## Visual resolution order

When an entity becomes a visual focus, resolve visuals in this order:

1. exact entity-specific verified asset;
2. verified asset for the exact work/event/place represented;
3. neutral structured treatment if no exact visual exists.

Do not jump from a missing exact asset to unrelated decorative artwork.

## Surface guidance

- **Homepage / discovery:** one dominant image per story cluster; small supporting thumbnails are allowed when they improve recognition.
- **Dense knowledge graph:** selected/focused entity may carry imagery; surrounding nodes stay lightweight.
- **Entity explorer:** hero/focus entity uses strong imagery; relationship overviews may use compact identity thumbnails but not a wall of large images.
- **Timeline / map:** use imagery selectively for major milestones or the active location.
- **Story / Journey mode:** one dominant historical visual per scene.
- **Scripture / Doctrine / Liturgy:** one strong contextual image near the top; lower cards may use 56–96 px contextual thumbnails rather than full-width art.
- **Council participant overview:** hero/event artwork may be strong; known participants may use compact portraits.
- **Kids:** one inviting focal image plus small story thumbnails; avoid repeating the same large generic artwork across the shelf.
- **Places collection:** each place may use one exact compact image because visual recognition is part of the browsing task; avoid duplicate gallery strips around the same collection.

## Interaction principle

Use this sequence for visual density:

**Recognize → focus → reveal → explore.**

The interface should become richer as the user focuses. Recognition can begin with a small image; focus earns the larger one.

Initial person coverage: St. Monica, Mary/Theotokos, St. Ambrose, St. Peter, St. Paul, St. Athanasius, Constantine, and St. Augustine.
Initial place/work coverage includes Hippo Regius and the Confessions manuscript.
