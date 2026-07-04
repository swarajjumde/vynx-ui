# @vynx/showcase

A real **Vue Lynx** (Rspeedy) showcase app for Vynx UI, scaffolded from the
official command `npm create vue-lynx@latest` (see <https://vue.lynxjs.org/>).
It renders the Vynx UI foundation components on a Lynx surface, JavaScript-first.

## Files

- `lynx.config.js` - Rspeedy config (from the official `create-vue-lynx`
  JavaScript template): registers `pluginVueLynx` and `pluginQRCode`, and builds
  the `lynx` and `web` environments from `src/index.js`.
- `src/index.js` - Vue Lynx entry. Mounts the app with `createApp` from
  `vue-lynx` (`app.mount()`).
- `src/App.vue` - a JavaScript SFC catalog that demonstrates the shipped Vynx UI
  components grouped by tier (foundation, primitives & display, forms, overlays &
  feedback). It is itself built with Vynx UI (`VScrollView` layout via `VStack`,
  `VCard` sections, `VHeading`/`VText` chrome) with the violet dark brand theme
  applied via `provideTheme`. Vue APIs (`ref`) are imported from `vue-lynx`.
  Inputs bind with `v-model`, boolean controls with `v-model:checked`, and
  overlays (`VBottomSheet`, `VDialog`, `VActionSheet`, `VDrawer`, `VConfirmDialog`,
  `VToast`) with `v-model:visible`.
- `src/tokens-usage.js` - a plain-JS example that imports the compiled package
  output and resolves component styles from design tokens. Runs under plain
  Node: `node apps/showcase/src/tokens-usage.js`.

## Prerequisites

Build the workspace packages first so the `dist` output the app imports exists:

```powershell
npm install
npm run build
```

## Run and build (Vue Lynx / Rspeedy)

From the repo root:

```powershell
# Build the packages + the showcase bundle
npm run build:showcase
```

Or from `apps/showcase` directly:

```powershell
npm run dev      # rspeedy dev server (prints a QR code)
npm run build    # rspeedy production build
npm run preview  # preview the built bundle
```

## Previewing

- **Lynx Explorer** - scan the QR code printed by `npm run dev` (produced by
  `@lynx-js/qrcode-rsbuild-plugin`) to run the bundle on a device or simulator.
- **Web Preview** - the `web` environment in `lynx.config.js` renders the same
  bundle in a browser for quick iteration.

## Usage (JavaScript)

```js
import { VCard, VFormField, VInputText, VCheckbox, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VCard, VFormField, VInputText, VCheckbox },
  setup() {
    provideTheme(violetDark);
    const name = ref('');
    const agree = ref(false);
    return { name, agree };
  }
};
```

Text inputs use `v-model`; boolean controls use `v-model:checked`.

See the runtime decision in
[../../docs/decisions/lynx-runtime.md](../../docs/decisions/lynx-runtime.md) and
component usage docs in
[../../docs/components/](../../docs/components/README.md).
