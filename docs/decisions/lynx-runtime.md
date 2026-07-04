# Runtime Decision: Lynx Host for Vynx UI

Status: **Open** - recorded honestly, not yet resolved.
Date: 2026-07-04

## Context

Vynx UI is a Vue-oriented, token-driven component package that targets Vue Lynx
(`view` / `text` / `input` / `textarea` Lynx elements, no browser DOM). To *see*
these components running on a real Lynx surface we need a Lynx host application
and a Lynx renderer that understands Vue components.

Research into the official Lynx documentation found:

- **Rspeedy** is the officially recommended Lynx build tool and project scaffold
  (`npm create rspeedy@latest`).
- **Lynx Explorer** is the official app for previewing Lynx bundles on device /
  simulator.
- **ReactLynx** is the official framework for authoring Lynx UIs - in **React**.
- No official **Vue** Lynx runtime / scaffold appears in the Lynx quick-start.

## Decision

For this slice we do **not** make `apps/showcase` a truly runnable Lynx app.

- `apps/showcase` remains a **temporary JavaScript consumer demo** that proves
  the compiled package output is consumable from plain JavaScript (see
  `apps/showcase/src/tokens-usage.js`). Its `App.vue` documents ordinary Vue
  usage but is not yet mounted on a Lynx runtime.
- We are **not** switching this repository to React / ReactLynx. Although
  ReactLynx is the official React framework for Lynx, Vynx UI stays a
  Vue-oriented package (`@vynx/ui`) for now.
- We are **not** adding a runtime dependency or scaffolding a host app until a
  Vue-compatible Lynx renderer/adapter is chosen or built.

## Open question

**Choose or build a Vue-compatible Lynx runtime/adapter before making
`apps/showcase` truly runnable.** Options to evaluate later:

1. Adopt an official or community Vue-on-Lynx renderer if/when one exists.
2. Build a small Vue custom renderer that maps Vynx UI's `view`/`text`/`input`/
   `textarea` output onto Lynx element APIs.
3. Reassess the framework contract if no viable Vue path emerges.

Until then, keep package examples **JavaScript-first and framework-contract
focused** (ordinary Vue component usage + token resolution), and use official
Lynx/Rspeedy tooling only for separate host-app experiments.

## Tooling to track

- **Rspeedy** - official Lynx build tool / scaffold (`npm create rspeedy@latest`).
- **Lynx Explorer** - official preview app for Lynx bundles.
- **ReactLynx** - official React framework for Lynx (not adopted here).

## Links

- Lynx homepage: <https://lynxjs.org>
- Lynx quick-start: <https://lynxjs.org/guide/start/quick-start.html>
