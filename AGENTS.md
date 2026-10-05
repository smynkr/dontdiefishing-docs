# DontDieFishing Docs agent guide

## Memory routing

1. Read `.codex/harness-memory.json`; the project is `dontdiefishing-docs` and
   the only permitted Graphiti group is `group_id=dontdiefishing-docs`.
2. Read generated `docs/AGENT_SOT.md`.
3. Follow it into canonical `docs/wiki/` before broad repository searches.

Precedence: live systems > dated wiki ledger > session checkpoint > wiki
synthesis > Graphiti episodic context > scratch files. `docs/wiki/` is the
canonical durable memory.
Hindsight and Mem Palace are fully archived. Do not query them, write them, use them
for orientation/resume, or accept them as gate satisfaction. Historical exports are
inert evidence only.


## Content invariant

Flat MDX in `dontdiefishing/` plus `docs.json` are canonical; `content/docs/` is
generated output — never edit it directly. After canonical-content edits, run:

```bash
node _migration/tools/run-migration.mjs
npm run test:links
npm run types:check
npm run build
```

The site serves clean URLs via `next.config.mjs` rewrites; keep the
`dontdiefishing/**` route prefix in canonical content and the rewrite list in
sync.

## Memory verification

```bash
python3 scripts/sot_wiki/wiki_lint.py docs/wiki
python3 scripts/sot_wiki/wiki_reindex.py --check docs/wiki
python3 scripts/sot_wiki/wiki_index.py --check docs/wiki/_sources.json docs/wiki
python3 scripts/sot_wiki/wiki_to_agent_sot.py --check docs/AGENT_SOT.md docs/wiki
python3 scripts/sot_wiki/audit_harness_memory.py --repo .
python3 -m unittest discover -s scripts/sot_wiki -p 'test_*.py'
```

The combined repository gate is `npm run memory:check`. Regenerate derived
memory surfaces with `npm run memory:generate`; never hand-edit
`docs/AGENT_SOT.md`.

## Linux CI runner

Existing Linux GitHub Actions jobs use the runner selector
`[self-hosted, axiom-cloudflare-ubuntu-2404]`. They require an isolated, ephemeral
one-job Cloudflare microVM running Ubuntu 24.04 amd64, with the Docker daemon
inside the VM and Actions runner 2.337.0. Register it with both labels and keep
it online; do not use a persistent/shared runner.

The image must provide `git`, `gh`, and Python 3.12. `node pipeline/recap.mjs`
calls `gh api search/issues` using the workflow's existing `DOCS_AGENT_PAT` as
`GH_TOKEN` for app-repository reads, then runs
`node _migration/tools/run-migration.mjs` and `npm run memory:generate`
(which invokes `python3`; recap does not set up Python). Both jobs install
Node 22/npm with `actions/setup-node@v4` (this package requires Node >=22.18);
`harness-memory` installs Python 3.12 with `actions/setup-python@v5`. The
recap job's conditional `npm ci` needs npm-registry access. GitHub Actions
downloads, GitHub API/repository access, and the existing token-backed
checkout/write path must work. These workflows do not provision the runner or
credentials.

