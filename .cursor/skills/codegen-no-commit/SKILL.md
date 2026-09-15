---
name: codegen-no-commit
description: >-
  Never commit or push .codegen (zero-codegen tool). Use when staging files,
  committing, pushing, or restoring the local codegen toolchain for Asiora.
---

# Never commit `.codegen`

## Rule

Do **not** `git add`, commit, or push:

- `.codegen/`
- `codegen/`
- `**/zero_codegen/`
- generated Postman under `platform/tests/postman/generated/`

These paths are in `.gitignore`.

## Restore the tool locally

If `.codegen/` is missing:

```bash
rsync -a --exclude '__pycache__' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/
pnpm codegen:paths
```

Then run generate with `PYTHONPATH=.codegen/codegen/src`.
