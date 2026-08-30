# Entity-specific visuals

For explanation and presentation surfaces, named entities should be visually identifiable whenever suitable sourced artwork exists, but visual identity must not create image overload.

## Rule

- Named historical people should prefer a sourced portrait, icon, or historical artwork when they are the current visual focus.
- Named places should prefer a sourced photograph, map, archaeological-site image, or architectural image when they are the current visual focus.
- Works and documents should prefer manuscript/book/document imagery when they are the current visual focus.
- Named events should prefer relevant historical artwork or a place/document image tied to that event.
- Concepts may use structured diagrams instead of decorative images.
- Never use a generic artwork as if it depicts a specific person or event.
- Do not use generic sparkle/star glyphs such as `✦`, `✧`, `★`, or `☆` as visual identity, emphasis, placeholders, infographic centers, or decorative navigation markers.
- When no trustworthy image exists, use a neutral structural treatment (text, geometry, line, or data-driven diagram) rather than an unrelated decorative icon.
- Artwork provides editorial context, not historical proof; factual claims remain source-backed separately.

## Visual hierarchy and image budget

**Having an image is not the same as needing to show it.**

Dense surfaces must preserve a clear focal point:

1. Prefer one dominant image per card, cluster, or explanatory moment.
2. Secondary related entities should usually render as lightweight text/relationship nodes until selected, focused, expanded, or shown in a dedicated detail surface.
3. Do not display a portrait/photo/manuscript for every named node simultaneously simply because verified assets exist.
4. In a knowledge graph or constellation, imagery belongs to the active/focused entity. Surrounding nodes remain lightweight by default.
5. A small number of secondary images may appear only when they materially improve recognition and do not compete with the focal entity.
6. Repeated images of the same entity on the same page should be avoided unless the repetition serves a distinct task.
7. Prefer progressive disclosure: overview first, richer imagery on focus or drill-down.
8. If adding another image weakens hierarchy rather than improving recognition or understanding, do not add it.

A text-only secondary node is **not** a regression when the surface intentionally reserves imagery for the focal entity. A regression occurs when the current focus has an appropriate verified asset but is represented by an unrelated icon, generic decoration, or misleading image.

## Visual resolution order

When an entity becomes a visual focus, resolve visuals in this order:

1. exact entity-specific verified asset;
2. verified asset for the exact work/event/place represented;
3. neutral structured treatment if no exact visual exists.

Do not jump from a missing exact asset to unrelated decorative artwork.

## Surface guidance

- **Homepage / discovery cards:** normally one dominant image per card or story cluster. Do not repeat a hero image again in a nearby explanatory card merely to decorate it.
- **Dense knowledge graph:** only the selected/focused entity should normally carry imagery; surrounding nodes stay lightweight until focused.
- **Entity explorer:** hero/focus entity uses strong imagery. Relationship overviews should stay mostly structural; related entity images appear when opened or explicitly emphasized.
- **Timeline / map:** use imagery selectively for major milestones or the active location, not every point.
- **Story / Journey mode:** one dominant historical visual per scene; secondary entities support the narrative without competing for attention.

## Interaction principle

Use this sequence for visual density:

**Recognize → focus → reveal → explore.**

Do not reveal every available image at the overview level. The interface should become richer as the user focuses, not noisier before they have chosen where to look.

Initial person coverage: St. Monica, Mary/Theotokos, St. Ambrose, St. Peter, St. Paul, St. Athanasius, Constantine, and St. Augustine.
Initial place/work coverage includes Hippo Regius and the Confessions manuscript.
