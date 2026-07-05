# Vynx UI

**A token-driven UI framework for [Vue Lynx](https://vue.lynxjs.org/) — PrimeVue, for mobile apps.**

Vynx UI brings a PrimeVue-style component library to the Lynx runtime: 43 ready
components, a three-layer design-token theming system, and an original admin
starter template — all authored the Lynx way (no DOM, no browser APIs) and
consumable from plain JavaScript.

> **Status:** v0.1 — all 6 component tiers shipped and tested. Open source on
> GitHub; npm packages are planned for a later release (install from source for
> now).

---

## Why Vynx UI

- **Built for Lynx, not the web.** Components render Lynx elements (`view`,
  `text`, `scroll-view`, `image`, …) via `h()` — never `div`/`window`/`document`.
  They work on a real Lynx surface, not just a browser preview.
- **Token-driven theming.** Every colour, space, radius, and type scale comes
  from design tokens (primitive → semantic → component). Switch scheme
  (light/dark) or brand preset at runtime and the whole tree re-themes.
- **JavaScript-first.** Written in TypeScript, but the public API and every
  documentation example is plain JavaScript. `v-model` works as you'd expect.
- **DOM-free and tested.** 152 targeted tests drive components without a DOM,
  asserting rendered vnodes and emitted events.

## Component catalog (43)

| Tier | Focus | Components |
|------|-------|------------|
| **1** | Foundation | `VButton` `VCard` `VInputText` `VTextarea` `VCheckbox` `VSwitch` `VFormField` `VBadge` |
| **2** | Primitives & display | `VText` `VHeading` `VDivider` `VAvatar` `VTag` `VProgressBar` `VSkeleton` `VIcon` `VList` `VListItem` `VStack` `VScrollView` |
| **3** | Forms | `VRadioGroup` `VSelectButton` `VToggleButton` `VInputNumber` `VRating` `VSearchInput` |
| **4** | Overlays & feedback | `VBottomSheet` `VDialog` `VActionSheet` `VDrawer` `VToast` `VConfirmDialog` |
| **5** | Navigation | `VAppBar` `VTabs` `VAccordion` `VSelect` `VTabBar` |
| **6** | Data | `VDataView` `VTimeline` `VCarousel` `VTable` `VPaginator` `VEmptyState` |

Per-component docs live in [`docs/components/`](docs/components/).

## Quick start

```js
// A Vue Lynx SFC using Vynx UI — JavaScript, no DOM.
import { VButton, VCard, VStack, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VButton, VCard, VStack, VText },
  setup() {
    provideTheme(violetDark); // theme the whole subtree
  }
};
```

```html
<template>
  <VCard elevated>
    <VStack gap="md">
      <VText value="Hello from Vynx UI" weight="medium" />
      <VButton label="Get started" tone="primary" @tap="onTap" />
    </VStack>
  </VCard>
</template>
```

Switch themes at runtime by passing a `computed`/`ref` theme to `provideTheme` —
see [`apps/starter`](apps/starter/) for a live scheme + preset switcher.

## Repository layout

```
packages/
  themes/     @vynx/themes  — design tokens + prebuilt themes
  ui/         @vynx/ui      — the 43 components + style resolvers
apps/
  showcase/   a tiered catalog that dogfoods every component
  starter/    Vynx Admin — an original admin/dashboard template
docs/
  plan/       the master roadmap
  standards/  the component-authoring recipe
  decisions/  architecture decision records (e.g. overlays, runtime)
```

## Build & run from source

```bash
npm install            # install the workspace
npm run build          # build @vynx/themes then @vynx/ui
npm test               # docs gate + theme + component tests (152)

npm run build:showcase # build the component catalog (Lynx + web bundles)
npm run build:starter  # build the admin starter template
```

To run an app on a device, use its Rspeedy dev server and scan the QR with
**Lynx Explorer**, or open the web-preview URL:

```bash
cd apps/showcase   # or apps/starter
npm run dev        # prints a QR code for Lynx Explorer + a web URL
```

## Contributing

Vynx UI is authored to a strict recipe so 43 components stay consistent. See
[`CONTRIBUTING.md`](CONTRIBUTING.md) and the authoring standard in
[`docs/standards/component-authoring.md`](docs/standards/component-authoring.md).
The non-negotiables: Lynx elements only (no DOM/browser APIs), design tokens
instead of hardcoded colours, JavaScript-first public API, and a targeted test
for every public behaviour.

## License

[MIT](LICENSE) © 2026 Swaraj Jumde and Vynx UI contributors.
