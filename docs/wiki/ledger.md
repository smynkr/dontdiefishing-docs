---
title: Durable ledger
category: current-state
updated: 2026-08-10
summary: Dated durable facts and their source anchors
nav_order: 130
sources: [".codex/harness-memory.json", "README.md", "package.json", "next.config.mjs", "docs.json", "_migration/tools/lib/shared.mjs", "components/brand/products.ts", "public/logo.svg"]
---

# Durable ledger

## 2026-08-11 — docs.json asset-path fix

- `favicon` and `logo` in docs.json pointed at `/images/favicon.svg` and
  `/images/logo-{light,dark}.svg`, which do not exist in `public/` (the nav
  renders `/logo.svg` via NavTitle, so nothing was visibly broken).
  Corrected to the real paths (`/favicon.svg`, `/logo.svg`), matching the
  TileTactician reference.

Re-establish with:

```bash
npm run memory:check
npm run test:links
npm run links:check
npm run types:check
npm run build
```


## 2026-08-11 — Dark-first DontDieFishing brand theme pass

- fd theme tokens replaced the template cyan with the ocean palette: navy
  `#1A3A5C` on paper, amber `#F59E0B` (status color) on the `#0A0A0F` void,
  ring/accent/glow aligned, `.ax-glow` and constellation recolored to amber,
  dead Axiom CSS utilities removed.
- Dark is now the presentation default (`RootProvider theme={{ defaultTheme: 'dark' }}`).
- app/icon.svg: replaced the Infolitico flame mark (template leak) with the
  lifebuoy mark.
- docs.json identity: name DontDieFishing, brand colors, logo href to
  dontdiefishing.com; the stale Axiom "Sign in" primary was dropped (no app
  host evidence).
- Support mailtos in page-feedback and search dialog corrected from
  support@menuwright.com to support@dontdiefishing.com.
- OG card and 404 rebranded to the lifebuoy and the water-at-night voice;
  per-page siteName fixed to DontDieFishing Docs.
- Verified: gates green, dark default + toggle; deployed via PR #4.

Re-establish with:

```bash
npm run test:links
npm run links:check
npm run types:check
npm run build
npm run memory:check
```

## 2026-08-10 — Standalone DontDieFishing docs site established

- Scoped from the axiom-docs Fumadocs stack as a single-product site:
  canonical flat MDX under `dontdiefishing/`, generated `content/docs/`, contract
  tests, related-guide wayfinding, and the docs-agent pipeline. All Axiom
  product content, hub components, changelog, Notion mirror, and weekly-recap
  machinery were removed.
- Brand: DontDieFishing accent `#1A3A5C` (from the live landing capture), custom
  lifebuoy mark (`public/logo.svg`), favicon tile
  (`public/favicon.svg`); no Axiom identity anywhere in the chrome.
- Clean URLs: `/` and `/getting-started` … `/faq` rewrite onto the
  `dontdiefishing/*` canonical routes (`next.config.mjs`).
- DNS `docs.dontdiefishing.com` already pointed at Vercel anycast
  (76.76.21.21); domain attached to the Vercel project during launch.
- Automation: `pipeline/docs-agent.yml` template adapted for
  `smynkr/dontdiefishing-docs`; the `infolitico` repo receives the workflow with
  `DOCS_AGENT_PRODUCT: infolitico`.

Re-establish with:

```bash
node _migration/tools/run-migration.mjs
npm run test:links
npm run links:check
npm run types:check
npm run build
npm run memory:check
```

## Related

- [[current-state]] — current repository-owned topology
