# DontDieFishing Docs

Standalone Fumadocs documentation site for [DontDieFishing](https://dontdiefishing.com),
served at [docs.dontdiefishing.com](https://docs.dontdiefishing.com).

- **Canonical content:** flat MDX in `dontdiefishing/` + `docs.json` (navigation).
- **Generated output:** `content/docs/` via `node _migration/tools/run-migration.mjs`
  (deterministic; unmapped Card icons fail generation).
- **Clean URLs:** `/` and `/getting-started` … `/faq` rewrite onto the
  `dontdiefishing/*` routes (`next.config.mjs`).
- **Automation:** the `MenuMakeover` repo drafts doc PRs into this repository
  via the docs-agent pipeline (`pipeline/docs-agent.yml`).
- **Gates:** `npm run test:links`, `npm run links:check`, `npm run types:check`,
  `npm run build`, `npm run memory:check`.

## Development

```bash
npm ci
npm run dev
```

## Docs PRs from product changes

See `pipeline/README.md` for the docs-agent driver and the workflow template
installed in the product repo.
