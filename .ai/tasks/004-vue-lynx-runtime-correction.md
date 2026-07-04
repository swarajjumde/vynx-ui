# Task 004: Correct Vue Lynx Runtime and Showcase

## Context

Codex previously missed the official Vue Lynx site and recorded an incorrect open runtime decision. The user pointed to <https://vue.lynxjs.org/>. Correct the repository.

Verified current sources:

- Vue Lynx homepage: <https://vue.lynxjs.org/>
- Vue Lynx quick start: <https://vue.lynxjs.org/guide/quick-start>
- Vue Lynx introduction: <https://vue.lynxjs.org/guide/introduction>
- Official scaffold command: `npm create vue-lynx@latest`
- Current npm versions checked by Codex:
  - `vue-lynx@0.4.0`
  - `create-vue-lynx@0.1.3`
  - `@lynx-js/rspeedy@0.15.1`
  - `@lynx-js/qrcode-rsbuild-plugin@0.5.0`
  - `@rsbuild/plugin-vue@2.0.1`

Codex also inspected `create-vue-lynx@0.1.3` JavaScript template. Key files:

```js
// src/index.js
import { createApp } from 'vue-lynx'
import App from './App.vue'
const app = createApp(App)
app.mount()
```

```js
// lynx.config.js
import { defineConfig } from '@lynx-js/rspeedy'
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginVueLynx } from 'vue-lynx/plugin'

export default defineConfig({
  environments: { lynx: {}, web: {} },
  source: { entry: './src/index.js' },
  plugins: [
    pluginQRCode({
      schema(url) {
        return `${url}?fullscreen=true`
      },
    }),
    pluginVueLynx({
      optionsApi: false,
      enableCSSInlineVariables: true,
      enableCSSInheritance: true,
    }),
  ],
})
```

## Goal

Make `apps/showcase` a real Vue Lynx/Rspeedy app and correct docs/examples/runtime decision accordingly.

## Required Work

1. Update `apps/showcase`:
   - Add `lynx.config.js` based on the official `create-vue-lynx` JavaScript template.
   - Add/rename entry to match the scaffold (`src/index.js`) and mount with `createApp` from `vue-lynx`.
   - Keep JavaScript-first SFC usage.
   - Import Vue APIs in the showcase from `vue-lynx` where appropriate.
   - Add workspace scripts: `build`, `dev`, and `preview` using `rspeedy`.
   - Add required showcase dependencies/devDependencies for Vue Lynx/Rspeedy.
   - Keep `src/tokens-usage.js` as the plain Node/package consumer check.

2. Update root scripts:
   - Keep package build/test working.
   - Add a root script to build the showcase, e.g. `build:showcase`, without making the existing `npm run build` unexpectedly heavier unless clearly appropriate.

3. Correct docs:
   - Rewrite `docs/decisions/lynx-runtime.md` from open/unknown to accepted: Vue Lynx is the selected runtime for showcase.
   - Mention official scaffold `npm create vue-lynx@latest`, `vue-lynx`, Rspeedy, Lynx Explorer, and Web Preview.
   - Remove claims that no official Vue Lynx runtime/scaffold exists.
   - Update `apps/showcase/README.md` to explain how to run/build the real Vue Lynx showcase.
   - Update component docs/examples to use `vue-lynx` imports for Vue APIs (`ref`, etc.) where they are meant to be Vue Lynx examples.
   - Keep docs JavaScript-first.

4. Package/runtime compatibility:
   - Ensure the package and showcase can build together.
   - If `@vynx/ui` needs peer dependency or import changes for Vue Lynx compatibility, make the smallest coherent change and update tests accordingly.
   - Do not break plain JavaScript package output imports used by `apps/showcase/src/tokens-usage.js`.

5. Hygiene:
   - Remove any temporary scaffold tarballs/extracted files under `.ai` if present, or ensure they are ignored and not tracked.
   - Do not copy scaffold assets/branding into this repository.
   - Do not publish npm packages.
   - Do not run git push.
   - Do not read secrets or `.env` files.

## Verification

Run:

```powershell
npm install
npm run build
npm test
node apps/showcase/src/tokens-usage.js
npm run build:showcase
```

All should pass. If `npm run build:showcase` cannot pass because of a documented upstream/pre-alpha limitation, document the blocker precisely, but first try to make it pass.