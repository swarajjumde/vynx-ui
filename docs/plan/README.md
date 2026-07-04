# Vynx UI — Framework Build Plan

> Vynx UI is a **token-driven Vue Lynx UI framework** — "PrimeVue for mobile."
> This document is the single source of truth for *what* we build, *how* we build
> it, and *who* (which model/agent) builds each part. It is written to be executed
> incrementally without losing coherence.

## 1. Vision

1. **Framework** (`@vynx/ui` + `@vynx/themes`): a complete, accessible,
   token-driven Vue Lynx component library that a JavaScript consumer can adopt
   with `v-model` and design tokens — the way PrimeVue serves Vue-on-DOM.
2. **Template** (`apps/starter`): an original mobile admin/dashboard built
   entirely *with* Vynx UI — our analog of PrimeVue's Sakai, proving the
   framework end-to-end. Original design only; usability-inspired, never copied.

## 2. Principles (non-negotiable)

- **Lynx, not DOM.** Render only Lynx elements (`view`, `text`, `input`,
  `textarea`, `scroll-view`, `image`, …). No `window`, `document`, DOM selectors,
  `HTMLElement`, or CSSOM/browser event types. Input values come from
  `event.detail.value` via `readInputValue`.
- **Token-driven.** Zero hardcoded colours/spacing/radii in components. Every
  visual value resolves from the active `Theme` through a pure `resolve*Style`
  function that is unit-tested against token roles.
- **JavaScript-first public API.** Authored in TypeScript, consumed from plain
  JS with `v-model`. No TS-only requirements leak into the contract. Docs
  examples are JavaScript SFCs.
- **Small, stable contracts.** Prefer `variant` / `tone` / `size` / `disabled` /
  `invalid` props over style escape hatches. `V`-prefixed PascalCase names.
- **Every unit is self-contained.** A component ships as: render module +
  co-located style resolver + doc + test. This is what lets many builders (and
  agents) work in parallel without stepping on each other.
- **Green or it didn't happen.** `npm run build` + `npm test` (which includes the
  docs-integrity gate) must pass before any unit is considered done.

## 3. Architecture

Monorepo (npm workspaces). Current + planned shape:

```
packages/
  themes/          @vynx/themes — design tokens & theme presets
    src/primitives.ts   raw scales (palette, spacing, radius, typography, shadow)
    src/themes.ts       semantic themes (light, dark, violet light/dark)
    src/types.ts        token + Theme types
  ui/              @vynx/ui — components
    src/components/     one render module per component
    src/styles/         shared style KIT + one resolver file per component
    src/theme.ts        provideTheme / useTheme
    src/index.ts        public barrel
apps/
  showcase/        live Vue Lynx / Rspeedy demo of every component
  starter/         (planned) original admin/dashboard template
docs/
  plan/            this plan
  standards/       engineering standards incl. component-authoring.md
  components/      one doc per component (props/events/slots/tokens)
  decisions/       accepted architecture decisions
scripts/
  check-docs.mjs   docs-integrity gate (auto-discovers components)
```

### 3.1 Token layers (the theming lever)

We formalize three layers so brand **presets** are swappable and the starter can
re-theme at runtime — the same idea behind PrimeVue v4 presets:

1. **Primitive tokens** — raw scales (`primitives.ts`). The only place raw
   colours live.
2. **Semantic tokens** — role-based (`primary`, `surface`, `text`, `danger`, …)
   per scheme. This is today's `Theme.colors`.
3. **Component tokens** *(incremental)* — per-component knobs layered on top, so
   a preset can restyle a component without editing component code.

A **preset** = a matched light/dark pair of semantic themes (e.g. `violet`).
`violet` is our default "signature" preset. Adding a preset must never require
touching component source.

## 4. Component roadmap

Mobile-Lynx-filtered (not a blind desktop port). Build order is top-to-bottom;
within a tier, items are independent and parallelizable.

| Tier | Components | Status |
| --- | --- | --- |
| **1 — foundation** | Button, Card, Badge, FormField, InputText, Textarea, Checkbox, Switch | ✅ shipped |
| **2 — primitives & display** | Text, Heading, Divider, Avatar, Tag, ProgressBar, Skeleton, Icon, ScrollView, List/ListItem, Stack | ✅ shipped |
| **3 — forms** | RadioGroup, InputNumber, ToggleButton, SelectButton, Rating, SearchInput | 🔨 in progress · Select→overlay spike, Slider→gesture spike |
| **4 — overlays & feedback** | BottomSheet, Dialog, Drawer, ActionSheet, Toast, ConfirmDialog | ⏳ (needs overlay spike) |
| **5 — navigation** | TabBar (bottom nav), AppBar, Tabs, Steps, Breadcrumb, Menu, Accordion | ⏳ |
| **6 — data** | DataView, Timeline, Carousel, Paginator, EmptyState, Table (constrained) | ⏳ |

**Research spikes (do before their tier):**
- **Icons** — ✅ resolved: `VIcon` renders a Lynx `image` asset (no font-icons on
  Lynx); colour is baked into the asset.
- **Overlays/portals** — how Lynx layers content above the tree. Blocks Tier 4
  and `VSelect`. Prefer mobile-native patterns (bottom sheet, action sheet).
- **Gestures** — drag/pan handling on Lynx. Blocks `VSlider` (and later
  swipeable rows / carousel). Deferred until the overlay spike lands.
- **Animation** — Lynx animation support for a `VSpinner`; deferred until needed.

## 5. Model & agent workflow

We split work by cognitive load, matching the user's directive:

- **Opus 4.8 (architect / lead)** — planning, token/preset architecture,
  research spikes, the shared style kit, tooling/infra, reference components that
  set a pattern, and review/merge of delegated work.
- **Sonnet 5 (builder)** — mechanical, well-specified component builds that
  follow an existing template and the authoring standard. One clearly-scoped
  batch per agent to avoid barrel conflicts.

**Coordination rule:** the only shared files are `src/index.ts` and
`src/styles/index.ts` (barrels). Everything else a component needs lives in its
own files. Delegated builders touch the barrels only by appending their exports,
and run against a committed, green base so they never race the architect's edits.

See `docs/standards/component-authoring.md` for the exact recipe every builder
(human or agent) follows, and `.ai/agents/component-builder.md` for the ready-to-
paste builder brief.

## 6. Execution phases

- **P0 — Runtime correct & green (prereq).** Land task 004 so `apps/showcase`
  builds on the real Vue Lynx runtime. Baseline build/test green.
- **P1 — Scale the pipeline (Opus).** Split styles into a `styles/` kit,
  auto-discover docs, write the authoring standard + builder brief. Ship 2–3
  reference Tier-2 components to validate the pipeline.
- **P2 — Tier 2 fan-out (Sonnet).** Delegate the remaining display/layout
  primitives in batches; Opus reviews and merges.
- **P3 — Icon + overlay spikes (Opus), then Tier 3 forms (Sonnet).**
- **P4 — Tier 4 overlays + Tier 5 navigation.**
- **P5 — `apps/starter` (Opus scaffolds shell + navigation; Sonnet fills pages).**
- **P6 — Tier 6 data + polish + accessibility pass.**

Each phase ends with: build green, tests green, docs gate green, showcase updated.

## 7. Definition of done (per component)

A component is done only when **all** are true:

1. `src/styles/<name>.ts` — pure `resolve<Name>Style(theme, options)` using only
   token roles; no hardcoded visual values.
2. `src/components/V<Name>.ts` — `defineComponent` render module using `h(...)`
   Lynx elements, `useTheme`, and the resolver; small stable props/emits.
3. Exported from `src/index.ts` (component + any new public style types).
4. `docs/components/V<Name>.md` — JS SFC example + Props/Events/Slots/Tokens
   tables (mirrors `VButton.md`).
5. `packages/ui/test/…` — resolver token assertions + contract (name/props/emits)
   + behaviour (event→emit) + disabled no-op, using the DOM-free `render()` helper.
6. `npm run build` and `npm test` pass.
7. Added to the showcase when it materially demonstrates the component.

## 8. Guardrails

- Never `git push`, `npm publish`, run destructive/remote commands.
- Never read `.env*`, secrets, credentials, or auth/browser storage.
- No copied source, assets, or branding from PrimeVue/Sakai or any product.
- Keep each change scoped to its unit; do not alter unrelated public APIs.
