# @vynx/showcase

Temporary JavaScript consumer demo for the foundation package output. It is not yet a full runnable Vue Lynx showcase app.

## Files

- `src/App.vue` — a JavaScript SFC using `VButton`, `VCard`, and `VBadge` with
  the violet dark brand theme applied via `provideTheme`.
- `src/main.js` — placeholder JavaScript entry for a future Vue Lynx runtime.
- `src/tokens-usage.js` — a plain-JS example that imports the compiled package
  output and resolves component styles from design tokens.

## Usage (JavaScript)

```js
import { VButton, VCard, VBadge, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VButton, VCard, VBadge },
  setup() {
    provideTheme(violetDark);
    return { onTap: () => console.log('tapped') };
  }
};
```

Build the packages first (`npm run build` at the repo root) so the `dist`
output the app imports exists.
