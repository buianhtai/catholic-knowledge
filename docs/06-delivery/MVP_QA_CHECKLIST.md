# MVP Integration QA Checklist

## Automated gates

Every PR and push to `main` must pass:

- `npm run lint`
- `npm test` — canonical knowledge validation
- `npm run typecheck`
- `npm run build`

The knowledge validation checks duplicate IDs, EN/VI labels, relationship endpoints, source references and source integrity.

## Required product routes

- `/`
- `/explore`
- `/saints/augustine-of-hippo`
- `/timeline`
- `/learn/jesus-to-nicaea`
- `/scripture`
- `/doctrine`
- `/councils/nicaea`
- `/liturgy`
- `/places`
- `/kids`
- `/ask`

## Visual QA

Verify at approximately 360px, 768px, 1440px, 1920px and 2560px widths:

- no horizontal page overflow
- readable typography and card density
- mobile navigation opens/closes and all links are reachable
- diagrams switch to their mobile fallback without losing meaning
- high-resolution layouts use available width without uncontrolled line lengths
- keyboard focus is visible
- reduced-motion preference disables nonessential motion

## Content/provenance QA

- factual entities and relationships have source references
- source IDs resolve to known sources
- factual diagrams come from typed structured data
- AI/editorial imagery is never the only carrier of a factual relationship
- Vietnamese labels are present for canonical seed entities
- generated explanations remain visually separated from evidence/source UI

## Deployment smoke test

Once the Vercel project is linked, verify the production URL returns 200 for the required routes above and test navigation on desktop and mobile. Inspect Vercel build/runtime logs for errors before closing delivery issue #8.
