# Task 001 Fix: JavaScript Package Export Resolution

## Context

Task 001 has been implemented, but Codex verification found a blocker in the compiled JavaScript package output.

After running `npm run build`, this JavaScript consumer command fails:

```powershell
node C:\Projects\vynx-ui\apps\showcase\src\tokens-usage.js
```

Failure:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Projects\vynx-ui\packages\themes\dist\types' imported from C:\Projects\vynx-ui\packages\themes\dist\index.js
```

The package output must be usable by JavaScript consumers without TypeScript, private imports, path aliases, or custom loader settings.

## Required Fix

- Fix package source/build configuration so emitted ESM JavaScript resolves correctly in Node/package consumers.
- Ensure `@vynx/themes` and `@vynx/ui` package exports are usable from JavaScript after `npm run build`.
- Keep the existing workspace structure and component/theme scope intact.
- Keep changes narrowly scoped to this issue.
- Do not publish packages, push Git branches, create remotes, or run destructive commands.
- Do not read `.env`, credentials, browser data, or secret files.

## Verification

Run:

```powershell
npm run build
npm test
node C:\Projects\vynx-ui\apps\showcase\src\tokens-usage.js
```

All must pass.
