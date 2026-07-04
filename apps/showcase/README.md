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
