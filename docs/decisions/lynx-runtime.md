# Runtime Decision: Vue Lynx Host for Vynx UI

Status: **Accepted**
Date: 2026-07-04

## Context

Vynx UI is a Vue-oriented, token-driven component package that targets Vue Lynx
(`view` / `text` / `input` / `textarea` Lynx elements, no browser DOM). To *see*
these components running on a real Lynx surface we need a Lynx host application
and a Lynx renderer that understands Vue components.

There **is** an official Vue framework for Lynx: **Vue Lynx**
(<https://vue.lynxjs.org/>). It provides the `vue-lynx` runtime and an official
project scaffold, and builds on the same official Lynx tooling used by ReactLynx.

The relevant, verified sources are:

- Vue Lynx homepage: <https://vue.lynxjs.org/>
- Vue Lynx quick start: <https://vue.lynxjs.org/guide/quick-start>
- Vue Lynx introduction: <https://vue.lynxjs.org/guide/introduction>

Current published versions used for the showcase:

- `vue-lynx@0.4.0`
- `create-vue-lynx@0.1.3`
- `@lynx-js/rspeedy@0.13.6`
- `@lynx-js/qrcode-rsbuild-plugin@0.4.7`
- `@rsbuild/plugin-vue@1.2.9`

## Decision

**Vue Lynx is the selected runtime for `apps/showcase`.**

- `apps/showcase` is a real Vue Lynx / **Rspeedy** app, scaffolded from the
  official command `npm create vue-lynx@latest`. It mounts with `createApp`
  from `vue-lynx` in `src/index.js` and is built with `rspeedy` (`dev`,
  `build`, `preview`).
- The showcase imports Vue APIs (such as `ref`) from `vue-lynx`, and Vynx UI
  components from `@vynx/ui`. SFC usage stays **JavaScript-first** (no
  `lang="ts"`, no browser/DOM APIs).
- We are **not** switching this repository to React / **ReactLynx**. ReactLynx
  is the official *React* framework for Lynx; Vynx UI stays a Vue-oriented
  package (`@vynx/ui`) authored against Vue Lynx.

The earlier claim that "no official Vue Lynx runtime / scaffold exists" was
incorrect and is retracted: Vue Lynx (`vue-lynx`) is that official runtime.

## Previewing the showcase

- **Rspeedy** is the official Lynx build tool that Vue Lynx uses
  (`rspeedy dev` / `rspeedy build` / `rspeedy preview`).
- **Lynx Explorer** is the official app for previewing Lynx bundles on a device
  or simulator by scanning the QR code produced by
  `@lynx-js/qrcode-rsbuild-plugin`.
- **Web Preview** renders the same bundle in a browser via the `web`
  environment configured in `lynx.config.js`, useful for quick iteration
  without a device.

## Tooling

- **Vue Lynx** (`vue-lynx`) - official Vue framework/runtime for Lynx
  (<https://vue.lynxjs.org/>). Scaffold: `npm create vue-lynx@latest`.
- **Rspeedy** - official Lynx build tool used by Vue Lynx.
- **Lynx Explorer** - official preview app for Lynx bundles on device/simulator.
- **Web Preview** - browser preview of the Lynx bundle (`web` environment).
- **ReactLynx** - official React framework for Lynx (not adopted here).

## Links

- Vue Lynx: <https://vue.lynxjs.org/>
- Vue Lynx quick start: <https://vue.lynxjs.org/guide/quick-start>
- Lynx homepage: <https://lynxjs.org>
- Lynx quick-start: <https://lynxjs.org/guide/start/quick-start.html>
