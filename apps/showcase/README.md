# @vynx/showcase

Temporary JavaScript consumer demo for the foundation package output. It is not yet a full runnable Vue Lynx showcase app.

## Files

- `src/App.vue` - a JavaScript SFC using `VButton`, `VCard`, `VBadge`, and the
  form foundation components (`VFormField`, `VInputText`, `VTextarea`,
  `VCheckbox`, `VSwitch`) with the violet dark brand theme applied via
  `provideTheme`. Text inputs bind with `v-model`; boolean controls bind with
  `v-model:checked`.
- `src/main.js` - placeholder JavaScript entry for a future Vue Lynx runtime.
- `src/tokens-usage.js` - a plain-JS example that imports the compiled package
  output and resolves component styles from design tokens.

## Usage (JavaScript)

```js
import { VCard, VFormField, VInputText, VCheckbox, provideTheme } from '@vynx/ui';
import { ref } from 'vue';
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

Build the packages first (`npm run build` at the repo root) so the `dist`
output the app imports exists.

## Status

This app is a **temporary JavaScript consumer demo**, not yet a runnable Vue
Lynx host. `src/App.vue` documents ordinary Vue usage and `src/tokens-usage.js`
is a runnable plain-JS example (`node apps/showcase/src/tokens-usage.js`), but
nothing is mounted on a Lynx runtime yet.

Making this app truly runnable depends on an open decision: choose or build a
Vue-compatible Lynx runtime/adapter. The official Lynx tooling to track is
**Rspeedy** (build tool / scaffold) and **Lynx Explorer** (preview app);
**ReactLynx** is official for React but this repository is not switching to
React. See [../../docs/decisions/lynx-runtime.md](../../docs/decisions/lynx-runtime.md).

## Next steps

- Decide on a Vue-compatible Lynx renderer/adapter (see the decision doc).
- Until then, keep examples JavaScript-first and framework-contract focused.
- Component usage docs live in
  [../../docs/components/](../../docs/components/README.md).
