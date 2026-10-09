---
title: Durable ledger
category: current-state
updated: 2026-10-09
summary: Dated durable facts and their source anchors
nav_order: 130
sources: [".codex/harness-memory.json", "README.md", "package.json", "next.config.mjs", "docs.json", "_migration/tools/lib/shared.mjs", "components/brand/products.ts", "public/logo.svg", "dontdiefishing/index.mdx", "dontdiefishing/getting-started.mdx", "dontdiefishing/finding-spots.mdx", "dontdiefishing/safety-conditions.mdx", "dontdiefishing/mobile-app.mdx", "dontdiefishing/fishable-days.mdx", "dontdiefishing/how-scoring-works.mdx", "dontdiefishing/account-billing.mdx", "dontdiefishing/regulations.mdx", "dontdiefishing/alerts.mdx", "dontdiefishing/trips-and-safety.mdx", "dontdiefishing/logbook.mdx", "dontdiefishing/tracks.mdx"]
---

# Durable ledger

## 2026-10-09 — Source-backed product and safety coverage

Audited the product default at
[`d9f5ca05ed42eae25d1d94cfd5ea10f4b0d12d9f`](https://github.com/smynkr/dontdiefishing/tree/d9f5ca05ed42eae25d1d94cfd5ea10f4b0d12d9f)
against the existing canonical product guides. The updated guides document real
planning inputs and degradation, vessel-specific scoring, curated/private sites,
Fishable Days, regulations and authority checks, alerts and capability-link float
plans, account/billing, logbook, and track recording/replay/export.

The old generic sensor/river-safety pipeline claims were not the source contract.
Native-app code and notification transports are not evidence of a public store
release, working native sign-in, device delivery, or rescue response. GPS denial
does not prevent ordinary map browsing; foreground location is required to record
a track. Forecast and regulation source gaps remain explicit, not fabricated.

The guides carry immutable source links and consumer-visible limitations.
This records the audit candidate's content, not a new product deployment.

Re-establish with:

```bash
node _migration/tools/run-migration.mjs
npm run types:check
npm run build
npm run memory:generate
npm run memory:check
```


## 2026-08-15 — Clean route topology

The clean `/mobile-app` and `/fishable-days` routes rewrite to
`/dontdiefishing/mobile-app` and `/dontdiefishing/fishable-days` in
`next.config.mjs`; both routes are listed in `docs.json` navigation and covered
by the repository's link-contract checks.

Re-establish with:

```bash
npm run test:links
npm run links:check
```

## 2026-08-11 — Harness-memory conformance (audit FAIL → PASS)

- Added `docs/wiki/_schema.md` (schema + routing + capture contract; group_id
  boundary, content-boundary section, memory gates, Hindsight/Mem Palace
  fully-archived marker). The wiki previously had only index/current-state/
  ledger and failed the harness-memory audit on the missing schema and the
  missing archived-memory marker.
- AGENTS.md: added the Hindsight and Mem Palace fully-archived marker to
  Memory routing.
- Regenerated `docs/AGENT_SOT.md` + `docs/wiki/_sources.json`
  (`npm run memory:generate`); `npm run memory:check` passes and
  `audit-repo.mjs` reports PASS.

Re-establish with:

```bash
npm run memory:check
node ~/.codex/skills/harness-memory/scripts/audit-repo.mjs --repo .
```
## 2026-08-11 — Review-lane fixes: identity regeneration and a11y

- content/docs regenerated: meta.json title is now DontDieFishing (llms.txt and
  search breadcrumbs were still "Axiomancer Labs"). Infolitico's generated
  tree also carried unprefixed links the migration rewrites — now in sync.
- FocusDeadEndHeading span -> div (valid HTML); 404 heading focus.
- docs.json identity themed (was entirely Axiomancer); @theme token prefix ddf-.
- Billing copy: 50 monthly credits is a Crossplay Pro entitlement (tiletactician).

Re-establish with:

```bash
npm run memory:check
```


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
- Clean URLs: `/`, `/getting-started`, `/finding-spots`, `/safety-conditions`,
  `/mobile-app`, `/fishable-days`, `/faq`, and `/changelog` rewrite onto the
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
