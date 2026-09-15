# Asiora

Southeast Asia FSI multi-vertical transformation portfolio OS (OpenAPI-first DDD monorepo).

Product specs: [PRODUCT.md](./PRODUCT.md), [USER_STORIES.md](./USER_STORIES.md), [WEBAPP.md](./WEBAPP.md).

Package scope: **`@asiora/*`**.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → generated feature scaffolds + handwritten Asiora UI
```

## Domains

`identity` plus product domains: `initiatives`, `scenarios`, `diligence`, `alliances`, `gates`, `decisions`, `intakes`, `packs`, `dataplay`, `overlaps`.

## Quick start

```bash
# If .codegen/ is missing (gitignored), copy from the scaffold:
# rsync -a --exclude '__pycache__' /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build

# API (default PORT 4010 in scripts if 4000 is busy)
PORT=4010 pnpm dev:api
# Health: curl http://127.0.0.1:4010/health
# Demo key: X-API-Key: asiora_demo_local_dev_key

# Web console (proxies /v0 /v1 to :4010)
pnpm dev:web
# http://127.0.0.1:3010
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — local tool only; restore from scaffold if missing.

See `.cursor/skills/` and `docs/CODEGEN.md`.
