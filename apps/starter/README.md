# @vynx/starter — Vynx Admin

An **original** Vue Lynx admin/dashboard starter, built entirely with Vynx UI —
the framework's analog of a "Sakai"-style template. Original design and content;
usability-inspired only, with no copied source, assets, or branding.

## What it demonstrates

- **App shell** — `VAppBar` (title + menu/avatar slots), a bottom `VTabBar`, and
  a `VDrawer` navigation menu.
- **Live theming** — the Settings screen switches **color scheme** (light/dark)
  and **brand preset** (Violet / Neutral) at runtime. A single reactive theme
  `computed` is passed to `provideTheme`, so mutating it re-themes every
  component in the tree.
- **Dashboard** — stat `VCard`s with `VProgressBar`, and a `VTimeline` of recent
  activity.
- **List → detail CRUD** — a searchable team list (`VSearchInput` + `VDataView`)
  where tapping a row opens a `VDialog` with an editable form (`VFormField` +
  `VInputText`), plus a `VPaginator`.
- **Feedback** — a shared `VToast`, invoked from screens via a small provided app
  context (`inject('vynxApp')`).

## Structure

- `src/index.js` — Vue Lynx entry (`createApp` from `vue-lynx`).
- `src/App.vue` — the shell: app bar, tab bar, drawer, toast, and the active
  screen via `<component :is>`. Owns the reactive theme and the app context.
- `src/screens/DashboardScreen.vue`, `ItemsScreen.vue`, `SettingsScreen.vue`.

## Run and build

Build the workspace packages first, then the starter:

```powershell
npm install
npm run build:starter     # from the repo root (packages + starter bundle)
```

Or from `apps/starter` directly:

```powershell
npm run dev      # rspeedy dev server (prints a QR code for Lynx Explorer)
npm run build    # rspeedy production build (lynx + web bundles)
npm run preview  # preview the built bundle
```

Scan the QR from `npm run dev` with **Lynx Explorer**, or open the **web
preview** URL for a quick browser look. See the runtime decision in
[../../docs/decisions/lynx-runtime.md](../../docs/decisions/lynx-runtime.md).
