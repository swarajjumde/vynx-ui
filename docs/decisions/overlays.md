# Decision: Overlay & Layering Strategy on Lynx

Status: **Accepted**
Date: 2026-07-04

## Context

Tier 4 (dialogs, bottom sheets, action sheets, toasts, drawers) and the deferred
`VSelect` all need to render content **above** the page, escaping their parent's
layout. On the web this is done with a portal/teleport into `document.body` — but
Lynx has no DOM and no `document`.

## What Lynx actually provides

Verified against the official Lynx docs:

- **`position: fixed`** — supported. A `fixed` element "will be treated as a
  direct child of the root node with `position: absolute`." This means a fixed
  element **automatically escapes its parent's layout and is positioned relative
  to the screen** — exactly the portal behaviour we need, with no teleport.
  (<https://lynxjs.org/api/css/properties/position.html>)
- **`position: absolute`** and **`z-index`** — supported. When using `z-index`
  with an absolutely-positioned child, also set `z-index: 0` on the parent for
  correct stacking.
- **`<overlay>` element** — a detached rendering layer for modals. The docs say
  it is intended for **embedding Lynx inside native pages**; for **full-Lynx
  applications the recommendation is to use `position: fixed` instead**.
  (<https://lynxjs.org/api/elements/built-in/overlay.html>)

## Decision

**Use a `position: fixed` full-screen backdrop `view` + a panel `view`, gated by
a `visible` prop.** No portal, no `<overlay>` element (our showcase and starter
are full-Lynx apps, not embedded).

- A shared resolver `resolveOverlayStyle(theme, options)` (in
  `packages/ui/src/styles/overlay.js`) returns:
  - `backdrop` — `position: 'fixed'`, `left/top/right/bottom: 0`, the
    `theme.colors.overlay` scrim, and flex alignment to place the panel.
  - `panel` — surface container (background, radius, padding, shadow).
- Overlay components render **nothing** when not `visible`, and the
  backdrop+panel when `visible`. Tapping the backdrop emits a close intent;
  tapping the panel does not (tap is stopped from bubbling by handling it on the
  panel).
- The scrim colour is the new **`overlay`** semantic token (raw
  `palette.scrim.{light,dark}` rgba values), so no overlay colour is hardcoded.

## Consequences

- Overlays are ordinary components — testable DOM-free (assert "renders null when
  hidden" and "renders a fixed backdrop when visible"), no special mount host.
- Positioning variants come from the backdrop's flex alignment:
  - **Dialog** → centered (`alignItems/justifyContent: center`).
  - **BottomSheet / ActionSheet** → bottom (`alignItems: stretch`,
    `justifyContent: flex-end`).
  - **Drawer** → side (`justifyContent: flex-start/flex-end`, panel full height).
  - **Toast** → top or bottom, non-blocking (transparent backdrop,
    `pointer-events`-free — we simply omit the scrim colour).
- Open/close **animation** is deferred (see the animation spike in the plan);
  overlays appear/disappear immediately for now.

## Links

- Lynx `position`: <https://lynxjs.org/api/css/properties/position.html>
- Lynx `<overlay>`: <https://lynxjs.org/api/elements/built-in/overlay.html>
- Lynx `<view>`: <https://lynxjs.org/api/elements/built-in/view.html>
