# Visual Asset Pipeline

Catholic Knowledge separates factual visualization from editorial illustration.

## Asset classes

1. **Factual diagrams** — knowledge graphs, timelines, doctrine flows, maps and relationship diagrams. These must be rendered from typed structured data with SVG/CSS/React components. Canonical facts must never exist only inside a raster image.
2. **Editorial illustration** — portraits, atmospheric scenes, historical reconstructions and hero art. These may be licensed, public-domain or generated assets and must not silently introduce factual claims.
3. **Decorative motifs** — borders, seals, textures, ornaments and non-semantic visual accents.

## Manifest

Register production assets in `lib/media/assets.ts`. Each entry records its role, localized alt text, creator/source, license/attribution, generation status and whether it is factual.

## Naming

Use stable IDs such as `portrait.augustine`, `place.la-vang.hero`, `motif.catholic-knowledge-seal`, and `diagram.nicaea.relationships`.

## Licensing

- Verify license per asset before committing it.
- Preserve creator, source URL and attribution text when required.
- Wikimedia Commons licenses are per asset, not global.
- Public-domain status must be verified for the exact work/reproduction.
- Generated imagery must be marked `generated: true`.

## Web delivery

Prefer SVG for deterministic diagrams/icons. For raster editorial assets, keep an original master outside the runtime bundle and publish responsive AVIF/WebP derivatives. Always provide meaningful localized alt text unless an asset is purely decorative.

## Product rule

**Sources create facts. AI creates explanations and editorial illustration.**
