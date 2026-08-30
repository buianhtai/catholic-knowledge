# Entity-specific visuals

For explanation and presentation surfaces, named entities should be visually identifiable whenever suitable sourced artwork exists.

## Rule

- Named historical people should prefer a sourced portrait, icon, or historical artwork thumbnail in infographic nodes.
- Named places should prefer a sourced photograph, map, archaeological-site image, or architectural image.
- Works and documents should prefer manuscript/book/document imagery when available.
- Named events should prefer relevant historical artwork or a place/document image tied to that event.
- Concepts may use structured diagrams instead of decorative images.
- If a verified asset already exists for a named entity, rendering that entity as a text-only node is a visual regression unless the surface is intentionally text-only.
- Never use a generic artwork as if it depicts a specific person or event.
- Do not use generic sparkle/star glyphs such as `✦`, `✧`, `★`, or `☆` as visual identity, emphasis, placeholders, infographic centers, or decorative navigation markers.
- When a visual focal point represents a known person, place, work, event, or doctrine, prefer meaningful sourced imagery appropriate to that subject.
- When no trustworthy image exists, use a neutral structural treatment (text, geometry, line, or data-driven diagram) rather than an unrelated decorative icon.
- Artwork provides editorial context, not historical proof; factual claims remain source-backed separately.
- If no trustworthy/licensable image is available, fall back to a structured node rather than inventing a portrait.

## Visual resolution order

When rendering a named entity, resolve visuals in this order:

1. exact entity-specific verified asset;
2. verified asset for the exact work/event/place represented;
3. neutral structured treatment if no exact visual exists.

Do not jump from a missing exact asset to unrelated decorative artwork.

Initial person coverage: St. Monica, Mary/Theotokos, St. Ambrose, St. Peter, St. Paul, St. Athanasius, Constantine, and St. Augustine.
Initial place/work coverage includes Hippo Regius and the Confessions manuscript.
